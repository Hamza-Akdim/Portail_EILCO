package ma.leader.backend.controllers;


import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import ma.leader.backend.exceptions.UserAlreadyExists;
import ma.leader.backend.repositories.UserRepository;
import ma.leader.backend.requests.AuthRequest;
import ma.leader.backend.requests.SignupRequest;
import ma.leader.backend.responses.AuthResponse;
import ma.leader.backend.security.JwtUtils;
import ma.leader.backend.security.UserDetailsImpl;
import ma.leader.backend.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

/**
 * @author akdim
 */

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final AuthService authService;

    @Value("${cookie.client.path}")
    private String PATH_COOKIE;


    @PostMapping("/signup")
    public ResponseEntity<String> registerUser(@RequestBody SignupRequest signupRequest, HttpServletResponse response) {
        try{
            String token = authService.registreUser(signupRequest);

            Cookie jwtCookie = new Cookie("token", token);
            jwtCookie.setHttpOnly(false);
            jwtCookie.setSecure(false);
            jwtCookie.setPath("/");
            jwtCookie.setAttribute("SameSite", "Lax");
            jwtCookie.setMaxAge(24 * 60 * 60);
            response.addCookie(jwtCookie);

            return ResponseEntity.ok("Registration is successed");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Error: This email already exists");
        }
    }


    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody AuthRequest authRequest, HttpServletResponse response) {
        try{
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        String token = jwtUtils.generateToken(userDetails.getUsername(), userDetails.getUser().getFirstname(), userDetails.getUser().getLastname(), userDetails.getUser().getRole());

        Cookie jwtCookie = new Cookie("token", token);
        jwtCookie.setHttpOnly(false);
        jwtCookie.setSecure(false);
        jwtCookie.setPath("/");
        jwtCookie.setAttribute("SameSite", "Lax");
        jwtCookie.setMaxAge(24 * 60 * 60);
            response.addCookie(jwtCookie);

        System.out.println("This is the role : "+userDetails.getAuthorities());
        return ResponseEntity.ok("Login successful");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error: Incorrect email or password");
        }
    }


    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        Cookie jwtCookie = new Cookie("token", null);
        jwtCookie.setHttpOnly(false);
        jwtCookie.setSecure(false);
        jwtCookie.setPath("/");
        jwtCookie.setAttribute("SameSite", "Lax");
        jwtCookie.setMaxAge(0);
        response.addCookie(jwtCookie);

        return ResponseEntity.ok("Logged out successfully");
    }

    @GetMapping("/me")
    public ResponseEntity<?> getUserDetails(@CookieValue(name = "token", required = false) String token) {
        if (token == null || token.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error: No token found");
        }

        try {
            String email = jwtUtils.extractUsername(token);
            String role = jwtUtils.extractRole(token);
            String firstname = jwtUtils.extractFirstname(token);
            String lastname = jwtUtils.extractLastname(token);

            return ResponseEntity.ok(new AuthResponse(email, firstname, lastname, role));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error: Invalid token");
        }
    }


}
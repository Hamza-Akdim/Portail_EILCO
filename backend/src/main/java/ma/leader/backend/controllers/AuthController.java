package ma.leader.backend.controllers;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import ma.leader.backend.exceptions.UserAlreadyExists;
import ma.leader.backend.requests.AuthRequest;
import ma.leader.backend.requests.SignupRequest;
import ma.leader.backend.responses.AuthResponse;
import ma.leader.backend.security.JwtUtils;
import ma.leader.backend.security.UserDetailsImpl;
import ma.leader.backend.services.AuthService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

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
        try {
            String message = authService.registreUser(signupRequest);

            // Créer un cookie pour la session
            Cookie jwtCookie = new Cookie("token", null);
            jwtCookie.setHttpOnly(false);
            jwtCookie.setSecure(false);
            jwtCookie.setPath("/");
            jwtCookie.setAttribute("SameSite", "Lax");
            jwtCookie.setMaxAge(24 * 60 * 60);
            response.addCookie(jwtCookie);

            return ResponseEntity.ok(message);
        } catch (UserAlreadyExists e) {
            return ResponseEntity.status(404).body("Error: This email already exists");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody AuthRequest authRequest, HttpServletResponse response) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword())
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

            if (!userDetails.getUser().isEnabled()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("Veuillez vérifier votre email avant de vous connecter.");
            }

            String token = jwtUtils.generateToken(
                    userDetails.getUser().getId(),
                    userDetails.getUser().getEmail(),
                    userDetails.getUser().getFirstname(),
                    userDetails.getUser().getLastname(),
                    userDetails.getUser().getRole()
            );

            Cookie jwtCookie = new Cookie("token", token);
            jwtCookie.setHttpOnly(false);
            jwtCookie.setSecure(false);
            jwtCookie.setPath("/");
            jwtCookie.setAttribute("SameSite", "Lax");
            jwtCookie.setMaxAge(24 * 60 * 60);
            response.addCookie(jwtCookie);

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
            Long userId = jwtUtils.extractUserId(token);
            String email = jwtUtils.extractEmail(token);
            String role = jwtUtils.extractRole(token);
            String firstname = jwtUtils.extractFirstname(token);
            String lastname = jwtUtils.extractLastname(token);

            return ResponseEntity.ok(new AuthResponse(userId, email, firstname, lastname, role));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error: Invalid token");
        }
    }


    @PostMapping("/signup/excel")
    public ResponseEntity<?> registerUsersFromExcel(@RequestParam("file") MultipartFile file) {
        try {
            List<String> result = authService.registerUsersFromExcel(file);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }


}

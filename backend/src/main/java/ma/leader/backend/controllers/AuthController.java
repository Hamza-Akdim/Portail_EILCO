package ma.leader.backend.controllers;


import lombok.RequiredArgsConstructor;
import ma.leader.backend.repositories.UserRepository;
import ma.leader.backend.requests.AuthRequest;
import ma.leader.backend.requests.SignupRequest;
import ma.leader.backend.responses.AuthResponse;
import ma.leader.backend.security.JwtUtils;
import ma.leader.backend.security.UserDetailsImpl;
import ma.leader.backend.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

/**
 * @author akdim
 */

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> registerUser(@RequestBody SignupRequest signupRequest) {
        String token = authService.registreUser(signupRequest);
        return ResponseEntity.ok(new AuthResponse(token));
    }


    @PostMapping("/login")
    public AuthResponse authenticateUser(@RequestBody AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        String jwt = jwtUtils.generateToken(userDetails.getUsername());

        return new AuthResponse(jwt);
    }
}
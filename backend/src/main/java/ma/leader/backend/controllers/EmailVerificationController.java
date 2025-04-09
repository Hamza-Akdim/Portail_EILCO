package ma.leader.backend.controllers;

import ma.leader.backend.services.EmailVerificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class EmailVerificationController {

    @Autowired
    private EmailVerificationService emailVerificationService;

    @GetMapping("/verify-email")
    public ResponseEntity<String> verifyEmail(@RequestParam("token") String token) {
        boolean verified = emailVerificationService.verifyToken(token);
        if (verified) {
            return ResponseEntity.ok("Email vérifié avec succès !");
        } else {
            return ResponseEntity.badRequest().body("Le lien de vérification est invalide ou a expiré.");
        }
    }
} 
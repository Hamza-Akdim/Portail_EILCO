package ma.leader.backend.services;

import lombok.extern.slf4j.Slf4j;
import ma.leader.backend.entities.EmailVerificationToken;
import ma.leader.backend.entities.User;
import ma.leader.backend.repositories.EmailVerificationTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@Slf4j
public class EmailVerificationService {

    @Autowired
    private EmailVerificationTokenRepository tokenRepository;

    @Autowired
    private EmailService emailService;

    public void createVerificationToken(User user) {
        String token = UUID.randomUUID().toString();
        EmailVerificationToken verificationToken = new EmailVerificationToken(token, user);
        tokenRepository.save(verificationToken);
        log.info("Token de vérification créé pour l'utilisateur : {}", user.getEmail());
        emailService.sendVerificationEmail(user.getEmail(), token);
        log.info("Email de vérification envoyé à : {}", user.getEmail());
    }

    public boolean verifyToken(String token) {
        log.info("Tentative de vérification du token : {}", token);
        EmailVerificationToken verificationToken = tokenRepository.findByToken(token)
                .orElse(null);

        if (verificationToken == null) {
            log.warn("Token non trouvé : {}", token);
            return false;
        }

        if (verificationToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            log.warn("Token expiré pour l'utilisateur : {}", verificationToken.getUser().getEmail());
            tokenRepository.delete(verificationToken);
            return false;
        }

        User user = verificationToken.getUser();
        user.setEnabled(true);
        tokenRepository.delete(verificationToken);
        log.info("Email vérifié avec succès pour l'utilisateur : {}", user.getEmail());
        return true;
    }
} 
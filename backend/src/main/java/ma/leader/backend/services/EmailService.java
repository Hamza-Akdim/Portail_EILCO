package ma.leader.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendVerificationEmail(String to, String verificationToken) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Vérification de votre email - Portail Enseignant EILCO");
        message.setText("Bonjour,\n\n"
                + "Merci de vous être inscrit sur le Portail Enseignant EILCO.\n\n"
                + "Pour vérifier votre email et activer votre compte, veuillez cliquer sur le lien suivant :\n"
                + "http://localhost:8081/api/auth/verify-email?token=" + verificationToken + "\n\n"
                + "Ce lien est valable pendant 24 heures.\n\n"
                + "Si vous n'avez pas demandé cette inscription, vous pouvez ignorer cet email.\n\n"
                + "Cordialement,\n"
                + "L'équipe du portail enseignant EILCO");

        mailSender.send(message);
    }
} 
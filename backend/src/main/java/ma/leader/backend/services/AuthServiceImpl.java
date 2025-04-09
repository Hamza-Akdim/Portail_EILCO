package ma.leader.backend.services;

import ma.leader.backend.entities.User;
import ma.leader.backend.enums.UserRole;
import ma.leader.backend.exceptions.UserAlreadyExists;
import ma.leader.backend.repositories.UserRepository;
import ma.leader.backend.requests.SignupRequest;
import ma.leader.backend.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailVerificationService emailVerificationService;

    @Override
    public String registreUser(SignupRequest request) throws UserAlreadyExists {
        Optional<User> existingUser = userRepository.findByEmail(request.getEmail());

        if (existingUser.isPresent()) {
            throw new UserAlreadyExists("Error: This email already exists.");
        }

        UserRole userRole = mapRoleFromRequest(request.getRole());

        User newUser = new User();
        newUser.setFirstname(request.getFirstname());
        newUser.setLastname(request.getLastname());
        newUser.setEmail(request.getEmail());
        newUser.setEncryptedPassword(passwordEncoder.encode(request.getPassword()));
        newUser.setRole(userRole);
        newUser.setEnabled(false); // L'utilisateur est désactivé jusqu'à la vérification de l'email

        userRepository.save(newUser);

        // Envoyer l'email de vérification
        emailVerificationService.createVerificationToken(newUser);

        return "Un email de vérification a été envoyé à votre adresse email.";
    }

    /**
     * Maps role code from request to UserRole enum.
     */
    private UserRole mapRoleFromRequest(String role) {
        if (role == null || role.isEmpty()) {
            return UserRole.ETUDIANT; // Rôle par défaut
        }
        return UserRole.valueOf(role.toUpperCase());
    }
}

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

        userRepository.save(newUser);

        return jwtUtils.generateToken(
                newUser.getId(), // userId as subject
                newUser.getEmail(),
                newUser.getFirstname(),
                newUser.getLastname(),
                userRole
        );
    }

    /**
     * Maps role code from request to UserRole enum.
     */
    private UserRole mapRoleFromRequest(String role) {
        switch (role) {
            case "ETUD":
                return UserRole.ETUDIANT;
            case "PROF":
                return UserRole.PROFESSEUR;
            case "EDIT":
                return UserRole.EDITEUR;
            case "ADM":
                return UserRole.ADMIN;
            default:
                throw new IllegalArgumentException("Invalid role provided: " + role);
        }
    }
}

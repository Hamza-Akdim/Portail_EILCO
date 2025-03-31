package ma.leader.backend.services;

import ma.leader.backend.entities.User;
import ma.leader.backend.enums.UserRole;
import ma.leader.backend.exceptions.UserAlreadyExists;
import ma.leader.backend.repositories.UserRepository;
import ma.leader.backend.requests.SignupRequest;
import ma.leader.backend.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * @author akdim
 */

@Service
public class AuthServiceImpl implements AuthService{
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public String registreUser(SignupRequest request) throws UserAlreadyExists{
        Optional<User> existingUser = userRepository.findByEmail(request.getEmail());

        if (existingUser.isPresent()) {
            new UserAlreadyExists("Error: This email already exists");
        }

        String email = request.getEmail();
        UserRole userRole = affectRole(request.getRole());

        User newUser = new User();
        newUser.setFirstname(request.getFirstname());
        newUser.setLastname(request.getLastname());
        newUser.setEmail(request.getEmail());
        newUser.setEncryptedPassword(passwordEncoder.encode(request.getPassword()));
        newUser.setRole(userRole);

        userRepository.save(newUser);

        return jwtUtils.generateToken(newUser.getEmail(), newUser.getFirstname(), newUser.getLastname(),userRole);
    }

    private UserRole determineRoleByEmail(String email) {
        if (email.contains("@etu")) {
            return UserRole.ETUDIANT;
        } else if (email.contains("@prof")) {
            return UserRole.PROFESSEUR;
        } else if (email.contains("@admin")){
            return UserRole.ADMIN;
        }else{
            return null;
        }
    }

    private UserRole affectRole(String role) {
        if (role.equals("ETUD")){
            return UserRole.ETUDIANT;
        } else if (role.equals("PROF")) {
            return UserRole.PROFESSEUR;
        } else if (role.equals("EDIT")){
            return UserRole.EDITEUR;
        }else if (role.equals("ADM")){
            return UserRole.ADMIN;
        } else{
            return null;
        }
    }
}

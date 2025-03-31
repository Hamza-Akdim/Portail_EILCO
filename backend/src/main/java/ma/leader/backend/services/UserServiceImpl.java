package ma.leader.backend.services;

import ma.leader.backend.entities.User;
import ma.leader.backend.enums.UserRole;
import ma.leader.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * @author akdim
 */

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Page<User> getAllUsers(int page, int size) {
        return userRepository.findAll(PageRequest.of(page, size));
    }

    @Override
    public User updateUser(Long id, String firstName, String lastName, UserRole role, String newPassword) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();

            if (firstName != null && !firstName.isEmpty()) {
                user.setFirstname(firstName);
            }
            if (lastName != null && !lastName.isEmpty()) {
                user.setLastname(lastName);
            }
            if (role != null) {
                user.setRole(role);
            }
            if (newPassword != null && !newPassword.isEmpty()) {
                user.setEncryptedPassword(passwordEncoder.encode(newPassword));
            }

            return userRepository.save(user);
        } else {
            throw new RuntimeException("Cet utilisateur n'existe pas");
        }
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("Cet utilisateur n'existe pas"));
    }

    public void deleteUser(Long userId) {
        if (userRepository.existsById(userId)) {
            userRepository.deleteById(userId);
        } else {
            throw new RuntimeException("Cet utilisateur n'existe pas");
        }
    }
}

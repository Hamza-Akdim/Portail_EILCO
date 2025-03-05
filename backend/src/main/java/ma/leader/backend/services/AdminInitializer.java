package ma.leader.backend.services;

import lombok.RequiredArgsConstructor;
import ma.leader.backend.entities.User;
import ma.leader.backend.repositories.UserRepository;
import ma.leader.backend.requests.SignupRequest;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Optional;

/**
 * @author akdim
 */

@Component
@RequiredArgsConstructor
public class AdminInitializer implements CommandLineRunner {

    private final AuthService authService;
    private final UserRepository userRepository;

    @Override
    public void run(String... args) {
        String adminEmail = "equipe.dev@admin.univ-eilco.littoral.fr";
        String adminPassword = "Admin@2025";

        Optional<User> existingAdmin = userRepository.findByEmail(adminEmail);

        if (existingAdmin.isEmpty()) {
            SignupRequest adminRequest = new SignupRequest(
                    "admin",
                    "equipe dev",
                    adminEmail,
                    adminPassword
            );

            authService.registreUser(adminRequest);
            System.out.println("Admin user created: " + adminEmail +" | "+ adminPassword);
        }
    }
}

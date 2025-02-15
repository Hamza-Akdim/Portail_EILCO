package ma.leader.backend.services;

import ma.leader.backend.entities.User;
import ma.leader.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author akdim
 */

@Service
public class AuthServiceImpl implements AuthService{
    @Autowired
    private UserRepository userRepository;

    @Override
    public User getUser(String email, String password) {
        return userRepository.getUserByEmail(email);
    }
}

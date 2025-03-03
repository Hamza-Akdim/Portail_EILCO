package ma.leader.backend.services;

import ma.leader.backend.requests.SignupRequest;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface AuthService {
    String registreUser(SignupRequest request);
}

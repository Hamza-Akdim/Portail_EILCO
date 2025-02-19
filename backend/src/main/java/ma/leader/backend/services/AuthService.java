package ma.leader.backend.services;

import ma.leader.backend.entities.User;
import ma.leader.backend.requests.SignupRequest;

public interface AuthService {
    String registreUser(SignupRequest request);
}

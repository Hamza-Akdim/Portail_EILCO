package ma.leader.backend.services;

import ma.leader.backend.entities.User;

public interface AuthService {
    User getUser(String email, String password);
}

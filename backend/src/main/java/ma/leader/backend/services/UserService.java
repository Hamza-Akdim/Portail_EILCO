package ma.leader.backend.services;

import ma.leader.backend.entities.User;
import ma.leader.backend.enums.UserRole;
import org.springframework.data.domain.Page;

public interface UserService {
    Page<User> getAllUsers(int page, int size);
    User updateUser(Long id, String firstName, String lastName, UserRole role, String newPassword);
    User getUserByEmail(String email);
    void deleteUser(Long userId);
}

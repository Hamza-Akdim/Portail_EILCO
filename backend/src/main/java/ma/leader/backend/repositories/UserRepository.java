package ma.leader.backend.repositories;

import ma.leader.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    //User getUserByEmail(String email);
    Optional<User> findByEmail(String email);

}

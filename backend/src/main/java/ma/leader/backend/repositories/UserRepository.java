package ma.leader.backend.repositories;

import ma.leader.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    @Query(value = "SELECT * FROM Users u WHERE u.email REGEXP :regex", nativeQuery = true)
    Optional<List<User>> getUserByEmailRegex(@Param("regex") String email);
}

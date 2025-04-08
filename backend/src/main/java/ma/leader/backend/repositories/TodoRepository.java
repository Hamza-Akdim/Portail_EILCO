package ma.leader.backend.repositories;

import ma.leader.backend.entities.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TodoRepository extends JpaRepository<Todo,Long> {
    List<Todo> findByUserId(Long userId);
    Optional<Todo> findByIdAndUserId(Long id, Long userId);
}

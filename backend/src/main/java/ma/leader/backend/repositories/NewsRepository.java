package ma.leader.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ma.leader.backend.entities.News;
import java.util.List;

public interface NewsRepository extends JpaRepository<News, Long> {
    List<News> findByCategory(String category);
}

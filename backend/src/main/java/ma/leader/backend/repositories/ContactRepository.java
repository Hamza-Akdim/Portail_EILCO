package ma.leader.backend.repositories;

import ma.leader.backend.entities.ContactEntry;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ContactRepository extends JpaRepository<ContactEntry, Long> {
    Optional<ContactEntry> findByCityAndAcademicLevel(String city, String academicLevel);
    List<ContactEntry> findByCity(String city);
}

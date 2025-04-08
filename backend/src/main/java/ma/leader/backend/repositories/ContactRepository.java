package ma.leader.backend.repositories;

import ma.leader.backend.entities.ContactEntry;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContactRepository extends JpaRepository<ContactEntry, Long> {
    List<ContactEntry> findByCityAndAcademicLevel(String city, String academicLevel);
    List<ContactEntry> findByCity(String city);
}

package ma.leader.backend.services;

import lombok.RequiredArgsConstructor;
import ma.leader.backend.entities.ContactEntry;
import ma.leader.backend.repositories.ContactRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ContactService {
    private final ContactRepository contactRepository;

    public List<String> getAllCities() {
        return contactRepository.findAll().stream()
                .map(ContactEntry::getCity)
                .distinct()
                .collect(Collectors.toList());
    }

    public List<String> getLevelsByCity(String city) {
        return contactRepository.findByCity(city).stream()
                .map(ContactEntry::getAcademicLevel)
                .distinct()
                .collect(Collectors.toList());
    }

    public ContactEntry getContactDetails(String city, String level) {
        return contactRepository.findByCityAndAcademicLevel(city, level)
                .orElseThrow(() -> new RuntimeException("Contact not found"));
    }

    public ContactEntry createContact(ContactEntry contactEntry) {
        return contactRepository.save(contactEntry);
    }
}
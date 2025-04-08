package ma.leader.backend.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ma.leader.backend.entities.ContactEntry;
import ma.leader.backend.entities.Person;
import ma.leader.backend.repositories.ContactRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
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
        List<ContactEntry> contacts = contactRepository.findByCityAndAcademicLevel(city, level);
        if (contacts.isEmpty()) {
            throw new RuntimeException("Contact not found");
        }
        if (contacts.size() > 1) {
            log.warn("Multiple contacts found for city: {} and level: {}. Using the first one.", city, level);
        }
        return contacts.get(0);
    }

    public ContactEntry createContact(ContactEntry contactEntry) {
        return contactRepository.save(contactEntry);
    }

    @Transactional
    public ContactEntry updateContact(String city, String level, ContactEntry updatedContact) {
        List<ContactEntry> contacts = contactRepository.findByCityAndAcademicLevel(city, level);
        if (contacts.isEmpty()) {
            throw new RuntimeException("Contact not found");
        }
        if (contacts.size() > 1) {
            log.warn("Multiple contacts found for city: {} and level: {}. Using the first one.", city, level);
        }
        ContactEntry existingContact = contacts.get(0);
        
        // Clear the existing contacts list
        existingContact.getContacts().clear();
        
        // Add all new contacts
        for (Person person : updatedContact.getContacts()) {
            existingContact.getContacts().add(person);
        }
        
        return contactRepository.save(existingContact);
    }
}
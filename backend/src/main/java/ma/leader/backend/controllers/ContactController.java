package ma.leader.backend.controllers;

import lombok.RequiredArgsConstructor;
import ma.leader.backend.dtos.ContactEntryDTO;
import ma.leader.backend.entities.ContactEntry;
import ma.leader.backend.services.ContactService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contacts")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequiredArgsConstructor
public class ContactController {
    private final ContactService contactService;

    @GetMapping("/cities")
    public List<String> getAllCities() {
        return contactService.getAllCities();
    }

    @GetMapping("/{city}/levels")
    public List<String> getLevelsByCity(@PathVariable String city) {
        return contactService.getLevelsByCity(city);
    }

    @GetMapping("/{city}/{level}")
    public ContactEntry getContactDetails(
            @PathVariable String city,
            @PathVariable String level) {
        return contactService.getContactDetails(city, level);
    }

    @PostMapping
    public ContactEntry createContact(@RequestBody ContactEntry contactEntry) {
        return contactService.createContact(contactEntry);
    }
}

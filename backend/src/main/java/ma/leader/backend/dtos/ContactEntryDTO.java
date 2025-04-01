package ma.leader.backend.dtos;

import lombok.Builder;
import lombok.Data;
import ma.leader.backend.entities.Person;

import java.util.List;

@Data
@Builder
public class ContactEntryDTO {
    private String city;
    private String academicLevel;
    private List<PersonDTO> contacts;

    @Data
    @Builder
    public static class PersonDTO {
        private String name;
        private String email;
        private Person.Role role;
    }
}
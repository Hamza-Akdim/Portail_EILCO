package ma.leader.backend.entities;

import jakarta.persistence.*;
import lombok.*;

/**
 * @author akdim
 */
@Entity
@Setter
@Getter
@AllArgsConstructor @NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstname;

    private String lastname;

    @Column(unique = true)
    private String email;

    private String encryptedPassword;

    private String role;
}

package ma.leader.backend.entities;

import jakarta.persistence.*;
import lombok.*;
import ma.leader.backend.enums.UserRole;
import java.util.List;

@Entity
@Table(name = "users")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor

public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstname;

    private String lastname;

    @Column(unique = true)
    private String email;

    private String encryptedPassword;

    @Enumerated(EnumType.STRING)
    private UserRole role;

    private boolean enabled = false; // Par défaut, l'utilisateur n'est pas activé

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Todo> todos;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private EmailVerificationToken verificationToken;

}

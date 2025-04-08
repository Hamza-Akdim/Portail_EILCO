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

    private UserRole role;

    // New bi-directional mapping: One user has many todos.
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Todo> todos;
}

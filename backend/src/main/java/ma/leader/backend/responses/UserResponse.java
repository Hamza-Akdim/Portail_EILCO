package ma.leader.backend.responses;

import lombok.*;

/**
 * @author akdim
 */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private String firstname;
    private String lastname;
    private String email;
    private String encryptedPassword;
    private String role;
}

package ma.leader.backend.requests;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @author akdim
 */

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserRequest {

    private String firstname;

    private String lastname;

    private String email;

    private String role;

    private String newPassword;
}

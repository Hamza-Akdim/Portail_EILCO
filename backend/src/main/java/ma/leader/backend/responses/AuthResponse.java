package ma.leader.backend.responses;


import lombok.AllArgsConstructor;
import lombok.*;

/**
 * @author akdim
 */

@Getter
@Setter
@AllArgsConstructor
public class AuthResponse {
    private String token;
}

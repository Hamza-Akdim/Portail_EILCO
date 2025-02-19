package ma.leader.backend.requests;


import lombok.Data;

/**
 * @author akdim
 */

@Data
public class AuthRequest {
    private String email;
    private String password;
}
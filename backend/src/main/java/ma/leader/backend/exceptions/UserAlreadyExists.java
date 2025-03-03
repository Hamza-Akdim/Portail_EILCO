package ma.leader.backend.exceptions;

/**
 * @author akdim
 */

public class UserAlreadyExists extends RuntimeException{
    public UserAlreadyExists(String message) {
                super(message);    }
}

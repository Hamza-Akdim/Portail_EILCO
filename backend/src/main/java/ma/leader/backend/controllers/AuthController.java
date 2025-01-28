package ma.leader.backend.controllers;

import ma.leader.backend.entities.User;
import ma.leader.backend.responses.UserResponse;
import ma.leader.backend.services.AuthService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * @author akdim
 */
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AuthService authService;

    @GetMapping("/get-user")
    public ResponseEntity<?> getUser(@RequestParam("email") String email, @RequestParam("encryptedPassword") String password) {
        User user = authService.getUser(email, password);


        if(user!=null){
            if(user.getEncryptedPassword().equals(password)){
                UserResponse response = new UserResponse();
                BeanUtils.copyProperties(user, response);
                return ResponseEntity.ok(response);

            }
            else
                return ResponseEntity.status(404).body("Password is incorrect");
        }

        return ResponseEntity.status(404).body("User doesn't exist");
    }
}

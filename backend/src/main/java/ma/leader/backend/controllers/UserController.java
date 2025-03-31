package ma.leader.backend.controllers;

import ma.leader.backend.entities.User;
import ma.leader.backend.enums.UserRole;
import ma.leader.backend.requests.UserRequest;
import ma.leader.backend.responses.UserResponse;
import ma.leader.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author akdim
 */

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllUsers(@RequestParam(defaultValue = "0") int page,
                                                          @RequestParam(defaultValue = "10") int size) {

        Page<User> userPage =  userService.getAllUsers(page, size);
        List<UserResponse> users = userPage.getContent().stream().map(user -> {
            return new UserResponse(
                    user.getId(),
                    user.getFirstname(),
                    user.getLastname(),
                    user.getEmail(),
                    user.getRole()
            );
        }).toList();

        Map<String, Object> response = new HashMap<>();
        response.put("data", users);
        response.put("total", userPage.getTotalElements());

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> updateUser(@PathVariable Long id, @RequestBody UserRequest userRequest){

        UserRole userRole = affectRole(userRequest.getRole());
        User updatedUser = userService.updateUser(id, userRequest.getFirstname(), userRequest.getLastname(), userRole, userRequest.getNewPassword());
        UserResponse userResponse = new UserResponse(
                updatedUser.getId(),
                updatedUser.getFirstname(),
                updatedUser.getLastname(),
                updatedUser.getEmail(),
                updatedUser.getRole()
        );

        return ResponseEntity.ok(userResponse);
    }

    @GetMapping("/search")
    public ResponseEntity<UserResponse> getUserByEmail(@RequestParam String email) {
        User user = userService.getUserByEmail(email);
        UserResponse userResponse = new UserResponse(user.getId(), user.getFirstname(), user.getLastname(), user.getEmail(), user.getRole());

        return ResponseEntity.ok(userResponse);
    }

    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return "L'utilisateur a été supprimé avec succès!";
    }


    private UserRole affectRole(String role) {
        if (role.equals("ETUD")){
            return UserRole.ETUDIANT;
        } else if (role.equals("PROF")) {
            return UserRole.PROFESSEUR;
        } else if (role.equals("EDIT")){
            return UserRole.EDITEUR;
        }else if (role.equals("ADM")){
            return UserRole.ADMIN;
        } else{
            return null;
        }
    }

}

package ma.leader.backend.services;

import ma.leader.backend.requests.SignupRequest;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface AuthService {
    String registreUser(SignupRequest request);
    List<String> registerUsersFromExcel(MultipartFile file) throws Exception;

}

package ma.leader.backend.services;

import ma.leader.backend.requests.SignupRequest;
import ma.leader.backend.responses.FileResponse;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface AuthService {
    String registreUser(SignupRequest request);
    List<FileResponse> registerUsersFromExcel(MultipartFile file) throws Exception;

}

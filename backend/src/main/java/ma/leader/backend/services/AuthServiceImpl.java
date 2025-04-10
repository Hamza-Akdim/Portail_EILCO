package ma.leader.backend.services;

import ma.leader.backend.entities.User;
import ma.leader.backend.enums.UserRole;
import ma.leader.backend.exceptions.UserAlreadyExists;
import ma.leader.backend.repositories.UserRepository;
import ma.leader.backend.requests.SignupRequest;
import ma.leader.backend.responses.FileResponse;
import ma.leader.backend.security.JwtUtils;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.*;



import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailVerificationService emailVerificationService;

    @Override
    public String registreUser(SignupRequest request) throws UserAlreadyExists {
        Optional<User> existingUser = userRepository.findByEmail(request.getEmail());

        if (existingUser.isPresent()) {
            throw new UserAlreadyExists("Error: This email already exists.");
        }

        UserRole userRole = mapRoleFromRequest(request.getRole());

        User newUser = new User();
        newUser.setFirstname(request.getFirstname());
        newUser.setLastname(request.getLastname());
        newUser.setEmail(request.getEmail());
        newUser.setEncryptedPassword(passwordEncoder.encode(request.getPassword()));
        newUser.setRole(userRole);
        newUser.setEnabled(userRole == UserRole.ADMIN);

        userRepository.save(newUser);

        // Envoyer l'email de vérification
        emailVerificationService.createVerificationToken(newUser);

        return "Un email de vérification a été envoyé à votre adresse email.";
    }

    @Override
    public List<FileResponse> registerUsersFromExcel(MultipartFile file) throws Exception {
        List<FileResponse> result = new ArrayList<>();
        InputStream inputStream = file.getInputStream();
        Workbook workbook = new XSSFWorkbook(inputStream);
        Sheet sheet = workbook.getSheetAt(0);

        for (int i = 1; i <= sheet.getLastRowNum(); i++) {
            Row row = sheet.getRow(i);
            if (row == null) continue;
            String email = "";
            try {
                String firstname = row.getCell(0).getStringCellValue();
                String lastname = row.getCell(1).getStringCellValue();
                email = row.getCell(2).getStringCellValue();
                String password = row.getCell(3).getStringCellValue();
                String role = row.getCell(4).getStringCellValue();

                SignupRequest request = new SignupRequest(firstname, lastname, email, password, role);
                registreUser(request);

                FileResponse fileResponse = new FileResponse(email,"Succès", "");
                result.add(fileResponse);

            } catch (UserAlreadyExists e) {
                FileResponse fileResponse = new FileResponse(email,"Existe déjà", e.getMessage());
                result.add(fileResponse);
            } catch (Exception e) {
                FileResponse fileResponse = new FileResponse(email,"Echec", e.getMessage());
                result.add(fileResponse);
            }
        }

        workbook.close();
        return result;
    }

    /**
     * Maps role code from request to UserRole enum.
     */

    private UserRole mapRoleFromRequest(String role) {

        if (role.equals("ETUD")) {
            return UserRole.ETUDIANT;
        } else if (role.equals("PROF")) {
            return UserRole.PROFESSEUR;
        } else if (role.equals("EDIT")) {
            return UserRole.EDITEUR;
        } else if (role.equals("ADM")) {
            return UserRole.ADMIN;
        } else {
            return UserRole.ETUDIANT;
        }
    }
}



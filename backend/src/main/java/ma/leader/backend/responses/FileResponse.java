package ma.leader.backend.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author akdim
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FileResponse {
    private String email;
    private String status;
    private String error;
}

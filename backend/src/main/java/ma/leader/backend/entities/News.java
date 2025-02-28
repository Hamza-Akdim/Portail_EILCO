package ma.leader.backend.entities;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class News {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String content;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String fullContent;
    private String category;
    private String imageUrl;
    private LocalDateTime publishedAt;
    private LocalDateTime expiryDate;
}

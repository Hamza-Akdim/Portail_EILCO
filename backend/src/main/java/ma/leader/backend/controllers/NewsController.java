package ma.leader.backend.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ma.leader.backend.entities.News;
import ma.leader.backend.services.NewsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/news")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@Slf4j
public class NewsController {

    private final NewsService newsService;

    @GetMapping
    public ResponseEntity<List<News>> getAllNews() {
        return ResponseEntity.ok(newsService.getAllNews());
    }

    @GetMapping("/{id}")
    public ResponseEntity<News> getNewsById(@PathVariable Long id) {
        return newsService.getNewsById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<News>> getNewsByCategory(@PathVariable String category) {
        return ResponseEntity.ok(newsService.getNewsByCategory(category));
    }

    @PostMapping("/add")
    public ResponseEntity<?> addNews(@RequestPart News news, @RequestPart MultipartFile image) {
        long MAX_SIZE = 1048576; // 1 Mo en octets
        if (image.getSize() > MAX_SIZE) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("La taille de l'image dépasse la limite autorisée de 1 Mo.");
        }
        try {
            News savedNews = newsService.addNews(news, image);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedNews);
        } catch (IOException e) {
            log.error("Erreur lors de l'ajout de la news", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur lors de l'ajout de la news");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateNews(
            @PathVariable Long id,
            @RequestPart News updatedNews,
            @RequestPart(required = false) MultipartFile image) {
        try {
            News savedNews = newsService.updateNews(id, updatedNews, image);
            return ResponseEntity.ok(savedNews);
        } catch (RuntimeException e) {
            log.error("News non trouvée", e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("News not found");
        } catch (IOException e) {
            log.error("Erreur lors de la mise à jour de la news", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur lors de la mise à jour de la news");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNews(@PathVariable Long id) {
        try {
            newsService.deleteNews(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            log.error("News non trouvée", e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("News not found");
        }
    }
}

package ma.leader.backend.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ma.leader.backend.entities.News;
import ma.leader.backend.services.NewsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/news")
@CrossOrigin(origins = "http://localhost:5173")
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
        Optional<News> news = newsService.getNewsById(id);
        return news.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<News>> getNewsByCategory(@PathVariable String category) {
        return ResponseEntity.ok(newsService.getNewsByCategory(category));
    }

    @PostMapping("/add")
    public ResponseEntity<?> addNews(
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam("fullContent") String fullContent,
            @RequestParam("category") String category,
            @RequestParam(value = "expiryDate", required = false) String expiryDate,
            @RequestParam(value = "image", required = false) MultipartFile image) {

        try {
            News news = new News();
            news.setTitle(title);
            news.setContent(content);
            news.setFullContent(fullContent);
            news.setCategory(category);
            if (expiryDate != null) {
                news.setExpiryDate(java.time.LocalDateTime.parse(expiryDate));
            }

            News savedNews = newsService.addNews(news, image);
            return ResponseEntity.ok(savedNews);
        } catch (IOException e) {
            log.error("Erreur lors de l'ajout de la news", e);
            return ResponseEntity.internalServerError().body("Erreur lors de l'ajout de la news");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateNews(
            @PathVariable Long id,
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam("fullContent") String fullContent,
            @RequestParam("category") String category,
            @RequestParam(value = "expiryDate", required = false) String expiryDate,
            @RequestParam(value = "image", required = false) MultipartFile image) {

        try {
            News updatedNews = new News();
            updatedNews.setTitle(title);
            updatedNews.setContent(content);
            updatedNews.setFullContent(fullContent);
            updatedNews.setCategory(category);
            if (expiryDate != null) {
                updatedNews.setExpiryDate(java.time.LocalDateTime.parse(expiryDate));
            }

            News savedNews = newsService.updateNews(id, updatedNews, image);
            return ResponseEntity.ok(savedNews);
        } catch (RuntimeException | IOException e) {
            log.error("Erreur lors de la mise à jour de la news", e);
            return ResponseEntity.status(404).body("News not found");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNews(@PathVariable Long id) {
        newsService.deleteNews(id);
        return ResponseEntity.noContent().build();
    }
}

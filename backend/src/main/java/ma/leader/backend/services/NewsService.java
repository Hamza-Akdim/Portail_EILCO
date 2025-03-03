package ma.leader.backend.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ma.leader.backend.entities.News;
import ma.leader.backend.repositories.NewsRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class NewsService {

    private final NewsRepository newsRepository;


    public List<News> getAllNews() {
        return newsRepository.findAll();
    }

    public Optional<News> getNewsById(Long id) {
        return newsRepository.findById(id);
    }

    public List<News> getNewsByCategory(String category) {
        return newsRepository.findByCategory(category);
    }
    private static final String UPLOAD_DIR = "./backend/uploads/";
    public News addNews(News news, MultipartFile image) throws IOException {
        if (image != null && !image.isEmpty()) {
            String imageUrl = saveImage(image);
            news.setImageUrl(imageUrl);
        }

        news.setPublishedAt(LocalDateTime.now());
        return newsRepository.save(news);
    }

    public News updateNews(Long id, News updatedNews, MultipartFile image) throws IOException {
        return newsRepository.findById(id)
                .map(existingNews -> {
                    existingNews.setTitle(updatedNews.getTitle());
                    existingNews.setContent(updatedNews.getContent());
                    existingNews.setFullContent(updatedNews.getFullContent());
                    existingNews.setCategory(updatedNews.getCategory());
                    existingNews.setExpiryDate(updatedNews.getExpiryDate());

                    if (image != null && !image.isEmpty()) {
                        try {
                            existingNews.setImageUrl(saveImage(image));
                        } catch (IOException e) {
                            log.error("Erreur lors de l'enregistrement de l'image", e);
                        }
                    }

                    return newsRepository.save(existingNews);
                })
                .orElseThrow(() -> new RuntimeException("News not found"));
    }

    public void deleteNews(Long id) {
        newsRepository.deleteById(id);
    }

    private String saveImage(MultipartFile image) throws IOException {
        String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
        Path filePath = Paths.get(UPLOAD_DIR, fileName);

        Files.createDirectories(filePath.getParent());
        Files.write(filePath, image.getBytes());

        return "http://localhost:8081/uploads/" + fileName;
    }
}

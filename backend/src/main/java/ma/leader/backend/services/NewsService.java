package ma.leader.backend.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ma.leader.backend.entities.News;
import ma.leader.backend.repositories.NewsRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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

    public News addNews(News news, MultipartFile image) throws IOException {
        news.setImageName(image.getOriginalFilename());
        news.setImageType(image.getContentType());
        news.setImageData(image.getBytes());
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
                            existingNews.setImageName(image.getOriginalFilename());
                            existingNews.setImageType(image.getContentType());
                            existingNews.setImageData(image.getBytes());
                        } catch (IOException e) {
                            log.error("Erreur lors de l'enregistrement de l'image", e);
                        }
                    }

                    return newsRepository.save(existingNews);
                })
                .orElseThrow(() -> new RuntimeException("News not found"));
    }

    public void deleteNews(Long id) {
        if (!newsRepository.existsById(id)) {
            throw new RuntimeException("News not found");
        }
        newsRepository.deleteById(id);
    }
}

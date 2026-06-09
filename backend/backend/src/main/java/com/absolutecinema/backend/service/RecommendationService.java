package com.absolutecinema.backend.service;

import com.absolutecinema.backend.Repository.RecommendationHistoryRepo;
import com.absolutecinema.backend.dto.MovieRecommendation;
import com.absolutecinema.backend.dto.RecommendationRequest;
import com.absolutecinema.backend.dto.RecommendationResponse;
import com.absolutecinema.backend.model.RecommendationHistory;
import org.jspecify.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class RecommendationService {
    @Autowired
    private RecommendationHistoryRepo recommendationHistoryRepo;

    public RecommendationService(RecommendationHistoryRepo recommendationHistoryRepo) {
        this.recommendationHistoryRepo = recommendationHistoryRepo;
    }

    public RecommendationHistory createRecommendation(RecommendationHistory recommendationHistory) {
        return recommendationHistoryRepo.save(recommendationHistory);
    }

    public List<RecommendationHistory> getAllRecommendation() {
        List<RecommendationHistory> history = recommendationHistoryRepo.findAll();
        return history;
    }

    public boolean deleteRecommendation(Long id) {
        RecommendationHistory history = recommendationHistoryRepo.findById(id).orElseThrow(()-> new RuntimeException("Recommendations Not found"));

        recommendationHistoryRepo.deleteById(id);
        return true;
    }

    public RecommendationHistory getRecommendationsById(Long id) {
        return recommendationHistoryRepo.findById(id).orElseThrow(()->new RuntimeException("recommendation Not found"));
    }


    public List<RecommendationHistory> getRecommendationsByUserId(Long userId) {
        List<RecommendationHistory> history =
                recommendationHistoryRepo.findByUserId(userId);

        if (history.isEmpty()) {
            throw new RuntimeException("No recommendations found");
        }

        return history;
    }

    public RecommendationResponse getRecommendations(Long userId, String genre) {
        RecommendationRequest request =
                new RecommendationRequest(userId, genre);

        String flaskUrl = "http://localhost:5000/recommend";

        RestTemplate restTemplate = new RestTemplate();

        RecommendationResponse response =
                restTemplate.postForObject(
                        flaskUrl,
                        request,
                        RecommendationResponse.class
                );
        if (response != null && response.isSuccess()) {

            for (MovieRecommendation movie : response.getRecs()) {

                RecommendationHistory history = new RecommendationHistory();

                history.setUserId(userId);
                history.setMovieId(movie.getMovieId());
                history.setMovieTitle(movie.getTitle());
                history.setGenres(movie.getGenre());
                history.setRecommendedAt(LocalDateTime.now());

                recommendationHistoryRepo.save(history);
            }
        }

        return response;
    }
}

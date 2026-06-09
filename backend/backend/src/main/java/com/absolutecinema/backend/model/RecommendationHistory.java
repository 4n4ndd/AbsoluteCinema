package com.absolutecinema.backend.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name="RecommendationHistory")
public class RecommendationHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId;
    private Long movieId;
    private String movieTitle;
    private String genres;
    private LocalDateTime recommendedAt;

    public RecommendationHistory() {
    }

    public RecommendationHistory(LocalDateTime recommendedAt, String genres, String movieTitle, Long movieId, Long userId) {
        this.recommendedAt = recommendedAt;
        this.genres = genres;
        this.movieTitle = movieTitle;
        this.movieId = movieId;
        this.userId = userId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getMovieId() {
        return movieId;
    }

    public void setMovieId(Long movieId) {
        this.movieId = movieId;
    }

    public String getMovieTitle() {
        return movieTitle;
    }

    public void setMovieTitle(String movieTitle) {
        this.movieTitle = movieTitle;
    }

    public String getGenres() {
        return genres;
    }

    public void setGenres(String genres) {
        this.genres = genres;
    }

    public LocalDateTime getRecommendedAt() {
        return recommendedAt;
    }

    public void setRecommendedAt(LocalDateTime recommendedAt) {
        this.recommendedAt = recommendedAt;
    }

    @Override
    public String toString() {
        return "RecommendationHistory{" +
                "id=" + id +
                ", userId=" + userId +
                ", movieId=" + movieId +
                ", movieTitle='" + movieTitle + '\'' +
                ", genres='" + genres + '\'' +
                ", recommendedAt=" + recommendedAt +
                '}';
    }
}

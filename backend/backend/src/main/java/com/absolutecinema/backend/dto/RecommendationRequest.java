package com.absolutecinema.backend.dto;

public class RecommendationRequest {
    private Long userId;
    private String genre;

    public RecommendationRequest(Long userId, String genre) {
        this.userId = userId;
        this.genre = genre;
    }

    public Long getUserId() {
        return userId;
    }

    public RecommendationRequest() {
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    @Override
    public String toString() {
        return "RecommendationRequest{" +
                "userId=" + userId +
                ", genre='" + genre + '\'' +
                '}';
    }
}

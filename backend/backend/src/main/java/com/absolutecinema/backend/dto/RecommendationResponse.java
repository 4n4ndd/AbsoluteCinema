package com.absolutecinema.backend.dto;

import java.util.List;

public class RecommendationResponse {
    private boolean success;
    private List<MovieRecommendation> recs;

    public RecommendationResponse() {
    }

    public RecommendationResponse(boolean success, List<MovieRecommendation> recs) {
        this.success = success;
        this.recs = recs;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public List<MovieRecommendation> getRecs() {
        return recs;
    }

    public void setRecs(List<MovieRecommendation> recs) {
        this.recs = recs;
    }

    @Override
    public String toString() {
        return "RecommendationResponse{" +
                "success=" + success +
                ", recs=" + recs +
                '}';
    }
}

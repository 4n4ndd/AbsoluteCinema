package com.absolutecinema.backend.Repository;

import com.absolutecinema.backend.model.RecommendationHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecommendationHistoryRepo extends JpaRepository<RecommendationHistory,Long> {
    List<RecommendationHistory> findByUserId(Long userId);
}

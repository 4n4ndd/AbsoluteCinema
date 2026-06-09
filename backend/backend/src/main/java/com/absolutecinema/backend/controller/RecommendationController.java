package com.absolutecinema.backend.controller;

import com.absolutecinema.backend.model.RecommendationHistory;
import com.absolutecinema.backend.service.RecommendationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("api/recommendationHistory")
public class RecommendationController {
    @Autowired
    private RecommendationService recommendationService;

    public RecommendationController(RecommendationService recommendationService) {
        this.recommendationService = recommendationService;
    }

    @PostMapping
    public ResponseEntity<RecommendationHistory> createRecommendations(@RequestBody RecommendationHistory recommendationHistory){
        RecommendationHistory createdRecommendations = recommendationService.createRecommendation(recommendationHistory);
        return ResponseEntity.ok(createdRecommendations);
    }
    @GetMapping
    public List<RecommendationHistory> getAllRecommendations(){
        return recommendationService.getAllRecommendation();
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<RecommendationHistory> deleteRecommendations(@PathVariable Long id){
        boolean isDeleted = recommendationService.deleteRecommendation(id);
        if(!isDeleted){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<RecommendationHistory> findRecommendationsById(@PathVariable Long id){
        RecommendationHistory history = recommendationService.getRecommendationsById(id);
        if(history == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.status(HttpStatus.OK).body(history);
    }
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<RecommendationHistory>> findRecommendationsByuserId(@PathVariable Long userId){
        List<RecommendationHistory> history = recommendationService.getRecommendationsByUserId(userId);
//        if(history == null){
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
//        }
        return ResponseEntity.ok(history);
    }
    @GetMapping("/recommend")
    public ResponseEntity<?> getRecommendations(@RequestParam Long userId, @RequestParam String genre){
        return ResponseEntity.ok(recommendationService.getRecommendations(userId,genre));
    }
}

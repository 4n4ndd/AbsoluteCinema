package com.absolutecinema.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler({UserNotFoundException.class})
    public ResponseEntity<Map<String,Object>> handleIllegalArgument(Exception exception){
        Map<String, Object> errorResponse = new HashMap<>();
        errorResponse.put("message",exception.getMessage());
        errorResponse.put("timestamp", LocalDateTime.now());
        errorResponse.put("error","Bad request");
        errorResponse.put("status", HttpStatus.BAD_REQUEST.value());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }
}

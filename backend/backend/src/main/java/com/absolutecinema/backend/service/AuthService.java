package com.absolutecinema.backend.service;


import com.absolutecinema.backend.Repository.UserRepo;
import com.absolutecinema.backend.dto.LoginRequest;
import com.absolutecinema.backend.dto.SignupRequest;
import com.absolutecinema.backend.model.User;
import org.jspecify.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
@Service
public class AuthService {
    @Autowired
    private UserRepo userRepo;

    public  String register(SignupRequest request) {
        if (userRepo.findByEmail(request.getEmail()).isPresent()) {
            return "Email already exists";
        }

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());

        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());

        userRepo.save(user);

        return "User registered successfully";
    }

    public  String login(LoginRequest loginRequest) {
        User user = (User) userRepo.findByEmail(loginRequest.getEmail())
                .orElse(null);

        if (user == null) {
            return "User not found";
        }

        if (!user.getPassword().equals(loginRequest.getPassword())) {
            return "Invalid password";
        }

        return "Login successful";
    }
}

package com.absolutecinema.backend.service;

import com.absolutecinema.backend.Repository.UserRepo;
import com.absolutecinema.backend.exception.UserNotFoundException;
import com.absolutecinema.backend.model.User;
import org.jspecify.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;

    public UserService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    public User createUser(User user) {
        return userRepo.save(user);
    }

    public  User updateUser(Long id, User user) {
        User users = userRepo.findById(id).orElseThrow(()->new RuntimeException("user not found"));
        user.setName(user.getName());
        user.setEmail(user.getEmail());
        user.setPassword(user.getPassword());
        return userRepo.save(user);
    }

    public boolean deleteUser(Long id) {
        if(!userRepo.existsById(id)){
            throw new RuntimeException("User not found");
        }
        userRepo.deleteById(id);
        return true;
    }

    public List<User> getAllUsers() {
        List<User> users = userRepo.findAll();
        return users;
    }

    public  User getById(Long id) {
        return userRepo.findById(id).orElseThrow(()->new UserNotFoundException("user not found"));
    }
}

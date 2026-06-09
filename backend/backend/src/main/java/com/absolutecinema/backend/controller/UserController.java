package com.absolutecinema.backend.controller;

import com.absolutecinema.backend.model.User;
import com.absolutecinema.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<User> createUsers(@RequestBody User user){
        User createdUser = userService.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUsers(@PathVariable Long id, @RequestBody User user){
        User updatedUser = userService.updateUser(id,user);
        return ResponseEntity.ok(
                userService.updateUser(id,updatedUser)
        );
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<User> deleteUsers(@PathVariable Long id){
        boolean isDeleted = userService.deleteUser(id);
        if(!isDeleted){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        return  ResponseEntity.status(HttpStatus.OK).build();
    }
    @GetMapping
    public List<User> getAllUser(){
        return userService.getAllUsers();
    }
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id){
        User user = userService.getById(id);
        if(user==null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(userService.getById(id));
    }
    }


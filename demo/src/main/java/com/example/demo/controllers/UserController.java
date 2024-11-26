package com.example.demo.controllers;

import com.example.demo.models.User;
import com.example.demo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    // Create or Update User
    @PostMapping("/save")
    public ResponseEntity<User> saveUser(@RequestBody User user) {
        User savedUser = userService.saveUser(user);
        return ResponseEntity.ok(savedUser);
    }

    // Get all users
    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    // Get single user by ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        Optional<User> user = userService.getUserById(id);
        return user.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Delete user
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody User loginDetails) {
        System.out.println("Attempting login for: " + loginDetails.getEmail());
        Optional<User> user = userService.getUserByEmail(loginDetails.getEmail());

        if (user.isPresent()) {
            System.out.println("User found: " + user.get().getEmail());
            System.out.println("Entered password: " + loginDetails.getPassword());
            System.out.println("Stored password: " + user.get().getPassword());
            if (user.get().getPassword().equals(loginDetails.getPassword())) {
                return ResponseEntity.ok(user.get());
            } else {
                System.out.println("Passwords do not match");
                return ResponseEntity.status(401).body(null);
            }
        } else {
            System.out.println("User not found with email: " + loginDetails.getEmail());
            return ResponseEntity.status(401).body(null);
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<User> getUserProfile(@RequestParam Long userId) {
        Optional<User> user = userService.getUserById(userId);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        }
        return ResponseEntity.notFound().build();
    }

}

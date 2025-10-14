package com.example.demo.controllers;

import com.example.demo.models.User;
import com.example.demo.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserService userService,
                          PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    // Create or Update User (pretpostavka: heširanje radi u UserService.saveUser)
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

    // LOGIN (isti potpis kao ranije, ali bezbedna provera lozinke)
    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody User loginDetails) {
        Optional<User> userOpt = userService.getUserByEmail(loginDetails.getEmail());
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401).body(null);
        }
        User user = userOpt.get();

        // poredi raw lozinku iz zahteva sa BCRYPT hash-om iz baze
        boolean ok = passwordEncoder.matches(loginDetails.getPassword(), user.getPassword());
        if (!ok) {
            return ResponseEntity.status(401).body(null);
        }
        return ResponseEntity.ok(user);
    }

    @GetMapping("/profile")
    public ResponseEntity<User> getUserProfile(@RequestParam Long userId) {
        Optional<User> user = userService.getUserById(userId);
        return user.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}

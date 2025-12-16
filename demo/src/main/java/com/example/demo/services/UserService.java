package com.example.demo.services;

import com.example.demo.models.User;
import com.example.demo.repositories.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User saveUser(User user) {
        if (user.getId() == null) {
            if (!isBCrypt(user.getPassword())) {
                user.setPassword(passwordEncoder.encode(user.getPassword()));
            }
            return userRepository.save(user);
        }

        User existing = userRepository.findById(user.getId())
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + user.getId()));

        String newPass = user.getPassword();

        if (newPass == null || newPass.isBlank()) {
            user.setPassword(existing.getPassword());
        } else if (!isBCrypt(newPass)) {
            user.setPassword(passwordEncoder.encode(newPass));
        }
        return userRepository.save(user);
    }

    private boolean isBCrypt(String value) {
        return value != null && value.startsWith("$2") && value.length() >= 56;
    }

    public List<User> getAllUsers() { return userRepository.findAll(); }

    public Optional<User> getUserById(Long id) { return userRepository.findById(id); }

    public void deleteUser(Long id) { userRepository.deleteById(id); }

    public Optional<User> getUserByEmail(String email) { return userRepository.findByEmail(email); }
}
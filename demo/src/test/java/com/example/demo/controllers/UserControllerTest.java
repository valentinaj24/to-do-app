package com.example.demo.controllers;

import com.example.demo.models.User;
import com.example.demo.services.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Timeout;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserControllerTest {

    @Mock
    private UserService userService;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserController userController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @ParameterizedTest
    @ValueSource(strings = {"test@example.com"})
    @DisplayName("Prijava uporabnikov - uspešno")
    void testLoginUser_Success(String email) {
        // "Hash" u bazi (može biti bilo šta ovde, jer matches se mokuje)
        User stored = new User(1L, email, "$2b$12$SOME_HASH_VALUE");
        when(userService.getUserByEmail(email)).thenReturn(Optional.of(stored));

        // Kažemo da je kombinacija raw "password" + "hash" ispravna
        when(passwordEncoder.matches("password", stored.getPassword())).thenReturn(true);

        // Poziv kontrolera
        ResponseEntity<User> response =
                userController.loginUser(new User(null, email, "password"));

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(email, response.getBody().getEmail());

        verify(userService).getUserByEmail(email);
        verify(passwordEncoder).matches("password", stored.getPassword());
    }

    @Test
    @Timeout(1)
    void testLoginUser_InvalidPassword() {
        String email = "test@example.com";
        User stored = new User(1L, email, "$2b$12$SOME_HASH_VALUE");
        when(userService.getUserByEmail(email)).thenReturn(Optional.of(stored));

        // Sad matches vraća false
        when(passwordEncoder.matches("wrongpassword", stored.getPassword())).thenReturn(false);

        ResponseEntity<User> response =
                userController.loginUser(new User(null, email, "wrongpassword"));

        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        assertNull(response.getBody());

        verify(userService).getUserByEmail(email);
        verify(passwordEncoder).matches("wrongpassword", stored.getPassword());
    }
}

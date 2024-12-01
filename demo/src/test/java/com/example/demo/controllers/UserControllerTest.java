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

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserControllerTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this); // Inicializacija mockov
    }

    @ParameterizedTest
    @ValueSource(strings = {"test@example.com"})
    @DisplayName("Prijava uporabnikov - uspešno")
    void testLoginUser_Success(String email) {
        // Simulacija obstoječega uporabnika
        User user = new User(1L, email, "password");
        when(userService.getUserByEmail(email)).thenReturn(Optional.of(user));

        // Klic metode v kontrolerju
        ResponseEntity<User> response = userController.loginUser(new User(null, email, "password"));

        // Preverjanje rezultatov
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(email, response.getBody().getEmail());
    }

    @Test
    @Timeout(1)
    void testLoginUser_InvalidPassword() {
        // Simulacija obstoječega uporabnika
        User user = new User(1L, "test@example.com", "password");
        when(userService.getUserByEmail("test@example.com")).thenReturn(Optional.of(user));

        // Klic metode z napačnim geslom
        ResponseEntity<User> response = userController.loginUser(new User(null, "test@example.com", "wrongpassword"));

        // Preverjanje rezultatov
        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        assertNull(response.getBody());
}
}

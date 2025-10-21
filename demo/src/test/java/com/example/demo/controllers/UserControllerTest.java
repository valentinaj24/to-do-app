package com.example.demo.controllers;

import com.example.demo.models.User;
import com.example.demo.services.UserService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserControllerTest {

    @Mock private UserService userService;
    @Mock private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserController userController;

    @Test
    void testLoginUser_Success() {
        String email = "test@example.com";
        String raw = "password";
        User stored = new User(1L, email, "$2b$hash");

        when(userService.getUserByEmail(email)).thenReturn(Optional.of(stored));
        when(passwordEncoder.matches(raw, stored.getPassword())).thenReturn(true);

        System.out.println("[TEST] Login input: email="+email+", raw="+raw);

        ResponseEntity<User> resp = userController.loginUser(new User(null, email, raw));

        System.out.println("[TEST] Expected=200, Actual="+resp.getStatusCode().value()
                + ", BodyEmail="+(resp.getBody()!=null?resp.getBody().getEmail():"null"));

        assertEquals(200, resp.getStatusCode().value(), "Login treba da vrati 200");
    }


    @Test
    @DisplayName("Login – pogrešna lozinka → 401")
    void testLoginUser_InvalidPassword() {
        String email = "test@example.com";
        User stored = new User(1L, email, "$2b$12$FAKE_HASH");

        when(userService.getUserByEmail(email)).thenReturn(Optional.of(stored));
        when(passwordEncoder.matches("wrong", stored.getPassword())).thenReturn(false);

        ResponseEntity<User> resp = userController.loginUser(new User(null, email, "wrong"));

        assertEquals(HttpStatus.UNAUTHORIZED, resp.getStatusCode());
        assertNull(resp.getBody());

        verify(userService).getUserByEmail(email);
        verify(passwordEncoder).matches("wrong", stored.getPassword());
    }
}

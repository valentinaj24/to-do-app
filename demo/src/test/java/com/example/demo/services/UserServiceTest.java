package com.example.demo.services;

import com.example.demo.models.User;
import com.example.demo.repositories.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock private UserRepository userRepository;
    @Mock private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    @Test
    void saveUser_hashesPassword_andPersists() {

        User input = new User(null, "ana@example.com", "lozinka123");
        System.out.println("[TEST] INPUT  -> email=" + input.getEmail() + ", rawPassword=" + input.getPassword());

        when(passwordEncoder.encode("lozinka123")).thenReturn("$2b$hash");
        when(userRepository.save(any(User.class))).thenAnswer(inv -> inv.getArgument(0));

        User saved = userService.saveUser(input);

        String expectedHash = "$2b$hash";
        String actualHash   = saved.getPassword();
        System.out.println("[TEST] EXPECT -> passwordHash=" + expectedHash);
        System.out.println("[TEST] ACTUAL -> passwordHash=" + actualHash);

        assertNotNull(saved, "User nakon snimanja ne sme biti null");
        assertEquals(expectedHash, actualHash, "Lozinka mora biti zamenjena hash-om");

        verify(passwordEncoder).encode("lozinka123");
        verify(userRepository).save(any(User.class));
        verifyNoMoreInteractions(userRepository, passwordEncoder);

        // PASS HINT
        System.out.println("RESULT: (hash ispravno postavljen i user sačuvan)");
    }

    @Test
    @DisplayName("saveUser – null password → ne zove encode; snimi trenutni objekat (dokumentovano trenutno ponašanje)")
    void saveUser_nullPassword_noEncode_stillPersists_CurrentBehavior() {
        // Arrange
        User input = new User(null, "ana@example.com", null);

        when(userRepository.save(any(User.class))).thenAnswer(inv -> inv.getArgument(0));

        // Act
        User saved = userService.saveUser(input);

        // Assert
        System.out.println("[TEST] saveUser EDGE: null password -> no encode, saved.password=" + saved.getPassword());
        verify(passwordEncoder, never()).encode(anyString());
        verify(userRepository).save(any(User.class));
        assertNull(saved.getPassword());
    }

}

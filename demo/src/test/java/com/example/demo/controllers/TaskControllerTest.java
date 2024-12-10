package com.example.demo.controllers;

import com.example.demo.models.Task;
import com.example.demo.models.User;
import com.example.demo.services.TaskService;
import com.example.demo.services.UserService;
import org.junit.jupiter.api.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TaskControllerTest {

    private TaskController taskController;
    private TaskService taskService;
    private UserService userService;

    @BeforeEach
    void setUp() {
        // Mockanje odvisnosti
        taskService = mock(TaskService.class);
        userService = mock(UserService.class);
        taskController = new TaskController(taskService, userService, null);
    }

    @Test
    void testSaveTask_Success() {
        // Pozitiven testni scenarij
        User user = new User(7L, "lazarcvorovic2003@gmail.com", "lazar");
        Task task = new Task(
                "Test Task",
                LocalDate.now(),
                false,
                null,
                null,
                LocalDateTime.now()
        );

        when(userService.getUserById(7L)).thenReturn(Optional.of(user));
        when(taskService.saveTask(any(Task.class))).thenReturn(task);

        ResponseEntity<Task> response = taskController.saveTask(task, 7L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Test Task", response.getBody().getText());
    }

    @DisplayName("Dodajanje naloge - negativni primer")
    @Test
    void testSaveTask_UserNotFound() {
        // Negativen testni scenarij
        Task task = new Task(
                "Test Task",
                LocalDate.now(),
                true,
                null,
                null,
                LocalDateTime.now()
        );

        when(userService.getUserById(7L)).thenReturn(Optional.empty());

        ResponseEntity<Task> response = taskController.saveTask(task, 7L);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertNull(response.getBody());
    }



    @RepeatedTest(3)
    @DisplayName("Ažuriranje naloge - uspešno")
    void testUpdateTask_Success() {
        // Simulacija obstoječe naloge
        Task existingTask = new Task(
                "Old Task",
                LocalDate.now(), // LocalDate za due
                false,
                null,
                null,
                LocalDateTime.now() // LocalDateTime za reminderTime
        );

        Task updatedTask = new Task(
                "Updated Task",
                LocalDate.now().plusDays(1), // LocalDate za due
                true,
                null,
                null,
                LocalDateTime.now().plusDays(1) // LocalDateTime za reminderTime
        );

        when(taskService.getTaskById(1L)).thenReturn(Optional.of(existingTask));
        when(taskService.saveTask(any(Task.class))).thenReturn(updatedTask);

        // Klic metode v kontrolerju
        ResponseEntity<Task> response = taskController.updateTask(1L, updatedTask);

        // Preverjanje rezultatov
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("Updated Task", response.getBody().getText());
    }

    @Test
    @Disabled("Funkcionalnost trenutno ni na voljo")
    void testAddReminder_TaskNotFound() {
        // Simulacija neobstoječe naloge
        when(taskService.getTaskById(1L)).thenReturn(Optional.empty());

        // Klic metode v kontrolerju
        ResponseEntity<Task> response = taskController.addReminder(1L, "email", LocalDateTime.now().plusDays(1));

        // Preverjanje rezultatov
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertNull(response.getBody());
    }

    @AfterEach
    void tearDown() {
        Task testTask = null;
        System.out.println("Test končan, stanje očiščeno.");

    }
}

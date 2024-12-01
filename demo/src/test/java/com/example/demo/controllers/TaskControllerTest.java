package com.example.demo.controllers;

import com.example.demo.models.Task;
import com.example.demo.models.User;
import com.example.demo.services.TaskService;
import com.example.demo.services.UserService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
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
        Task task = new Task("Test Task", LocalDate.now(), false, null, null);

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
        Task task = new Task("Test Task", LocalDate.now(), false, null, null);

        when(userService.getUserById(7L)).thenReturn(Optional.empty());

        ResponseEntity<Task> response = taskController.saveTask(task, 7L);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertNull(response.getBody());
    }

    @AfterEach
    void tearDown() {
        Task testTask = null; // Ponastavi testne objekte
        System.out.println("Test končan, stanje očiščeno.");

    }
}

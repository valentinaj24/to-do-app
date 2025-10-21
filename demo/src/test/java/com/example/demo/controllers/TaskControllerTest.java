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
        taskService = mock(TaskService.class);
        userService = mock(UserService.class);
        taskController = new TaskController(taskService, userService, null);
    }

    @Test
    @DisplayName("saveTask – uspešno")
    void testSaveTask_Success() {
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

        System.out.println("[TEST] saveTask input: userId=7, text=" + task.getText());
        ResponseEntity<Task> response = taskController.saveTask(task, 7L);
        System.out.println("[TEST] saveTask expected=200, actual=" + response.getStatusCode().value());

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("Test Task", response.getBody().getText());

        verify(userService).getUserById(7L);
        verify(taskService).saveTask(any(Task.class));
        verifyNoMoreInteractions(taskService, userService);
    }

    @Test
    @DisplayName("saveTask – user ne postoji → 400")
    void testSaveTask_UserNotFound() {
        Task task = new Task(
                "Test Task",
                LocalDate.now(),
                true,
                null,
                null,
                LocalDateTime.now()
        );

        when(userService.getUserById(7L)).thenReturn(Optional.empty());

        System.out.println("[TEST] saveTask (user not found) input: userId=7");
        ResponseEntity<Task> response = taskController.saveTask(task, 7L);
        System.out.println("[TEST] expected=400, actual=" + response.getStatusCode().value());

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertNull(response.getBody());

        verify(userService).getUserById(7L);
        verify(taskService, never()).saveTask(any(Task.class));
        verifyNoMoreInteractions(taskService, userService);
    }

    @RepeatedTest(3)
    @DisplayName("updateTask – uspešno")
    void testUpdateTask_Success() {
        Task existingTask = new Task(
                "Old Task",
                LocalDate.now(),
                false,
                null,
                null,
                LocalDateTime.now()
        );

        Task updatedTask = new Task(
                "Updated Task",
                LocalDate.now().plusDays(1),
                true,
                null,
                null,
                LocalDateTime.now().plusDays(1)
        );

        when(taskService.getTaskById(1L)).thenReturn(Optional.of(existingTask));
        when(taskService.saveTask(any(Task.class))).thenReturn(updatedTask);

        System.out.println("[TEST] updateTask input: taskId=1, newText=" + updatedTask.getText());
        ResponseEntity<Task> response = taskController.updateTask(1L, updatedTask);
        System.out.println("[TEST] updateTask expected=200, actual=" + response.getStatusCode().value());

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("Updated Task", response.getBody().getText());

        verify(taskService).getTaskById(1L);
        verify(taskService).saveTask(any(Task.class));
        verifyNoMoreInteractions(taskService);
        verifyNoInteractions(userService);
    }

    @Test
    @DisplayName("updateTask – task ne postoji → 404")
    void testUpdateTask_NotFound() {
        when(taskService.getTaskById(999L)).thenReturn(Optional.empty());

        System.out.println("[TEST] updateTask (not found) input: taskId=999");
        ResponseEntity<Task> response = taskController.updateTask(999L, new Task());
        System.out.println("[TEST] expected=404, actual=" + response.getStatusCode().value());

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertNull(response.getBody());

        verify(taskService).getTaskById(999L);
        verify(taskService, never()).saveTask(any(Task.class));
        verifyNoMoreInteractions(taskService);
        verifyNoInteractions(userService);
    }

    @Test
    @DisplayName("addReminder – task postoji → postavlja reminder i čuva izmene")
    void testAddReminder_Success() {
        // Arrange
        Task existing = new Task(
                "Zadatak sa reminderom",
                LocalDate.now().plusDays(3),
                false,
                null,
                null,
                LocalDateTime.now()
        );

        when(taskService.getTaskById(1L)).thenReturn(Optional.of(existing));
        when(taskService.saveTask(any(Task.class))).thenAnswer(inv -> inv.getArgument(0));

        LocalDateTime at = LocalDateTime.now().plusDays(1);

        System.out.println("[TEST] addReminder (success) input: taskId=1, type=email, time=" + at);
        ResponseEntity<Task> response = taskController.addReminder(1L, "email", at);
        System.out.println("[TEST] expected=200 , actual=" + response.getStatusCode().value());


        assertEquals(HttpStatus.OK, response.getStatusCode(), "Očekivan uspešan status za addReminder");
        assertNotNull(response.getBody(), "Očekujemo vraćen ažuriran Task");

        Task updated = response.getBody();
        assertEquals("email", updated.getNotificationType(), "Treba postaviti notificationType=email");
        assertNotNull(updated.getReminderTime(), "Treba postaviti reminderTime");

        verify(taskService).getTaskById(1L);
        verify(taskService).saveTask(any(Task.class));
        verifyNoMoreInteractions(taskService);
        verifyNoInteractions(userService);
    }


    @Test
    @DisplayName("addReminder – task ne postoji → 404")
    void testAddReminder_TaskNotFound() {
        when(taskService.getTaskById(1L)).thenReturn(Optional.empty());

        System.out.println("[TEST] addReminder input: taskId=1, type=email, time=+1d");
        ResponseEntity<Task> response =
                taskController.addReminder(1L, "email", LocalDateTime.now().plusDays(1));
        System.out.println("[TEST] expected=404, actual=" + response.getStatusCode().value());

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertNull(response.getBody());

        verify(taskService).getTaskById(1L);
        verifyNoMoreInteractions(taskService);
        verifyNoInteractions(userService);
    }

    @AfterEach
    void tearDown() {
        System.out.println("Test končan, stanje očiščeno.");
    }
}

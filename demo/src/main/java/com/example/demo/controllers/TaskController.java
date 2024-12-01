package com.example.demo.controllers;

import com.example.demo.models.Category;
import com.example.demo.models.Task;
import com.example.demo.models.User;
import com.example.demo.services.CategoryService;
import com.example.demo.services.TaskService;
import com.example.demo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @Autowired
    private UserService userService;  // Injektuj UserService

    @Autowired
    private CategoryService categoryService;

    public TaskController(TaskService taskService, UserService userService, CategoryService categoryService) {
        this.taskService = taskService;
        this.userService = userService;
        this.categoryService = categoryService;
    }


    @GetMapping
    public ResponseEntity<List<Task>> getTasksByUserId(@RequestParam Long userId) {
        List<Task> tasks = taskService.getTasksByUserId(userId);
        return ResponseEntity.ok(tasks);
    }

    @PostMapping("/save")
    public ResponseEntity<Task> saveTask(@RequestBody Task task, @RequestParam Long userId) {
        // Logovanje
        System.out.println("Received userId: " + userId);
        System.out.println("Received task: " + task);

        Optional<User> user = userService.getUserById(userId);
        if (user.isPresent()) {
            task.setUser(user.get());

            // Proveri da li je kategorija prosleđena ispravno
            if (task.getCategory() != null && task.getCategory().getId() != null) {
                System.out.println("Received category ID: " + task.getCategory().getId());

                Optional<Category> category = categoryService.getCategoryById(task.getCategory().getId());
                if (category.isPresent()) {
                    task.setCategory(category.get());
                } else {
                    System.out.println("Category not found");
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);  // Kategorija nije pronađena
                }
            }

            Task savedTask = taskService.saveTask(task);
            return ResponseEntity.ok(savedTask);
        } else {
            System.out.println("User not found");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);  // Korisnik nije pronađen
        }
    }



    // Get all tasks
    @GetMapping("/all")
    public ResponseEntity<List<Task>> getAllTasks() {
        List<Task> tasks = taskService.getAllTasks();
        return ResponseEntity.ok(tasks);
    }

    // Get single task by ID
    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        Optional<Task> task = taskService.getTaskById(id);
        return task.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Obrisi task po ID-u
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task updatedTask) {
        Optional<Task> taskOpt = taskService.getTaskById(id);
        if (taskOpt.isPresent()) {
            Task existingTask = taskOpt.get();

            // Ručno učitavanje kategorije pre nego što je postavimo na task
            if (updatedTask.getCategory() != null && updatedTask.getCategory().getId() != null) {
                Category category = categoryService.findById(updatedTask.getCategory().getId())
                        .orElseThrow(() -> new RuntimeException("Category not found"));
                existingTask.setCategory(category); // Ažuriraj kategoriju
            }

            // Ažuriraj ostala polja taska
            existingTask.setText(updatedTask.getText());
            existingTask.setDue(updatedTask.getDue());
            existingTask.setCompleted(updatedTask.isCompleted());

            taskService.saveTask(existingTask); // Sačuvaj izmene
            return ResponseEntity.ok(existingTask);
        } else {
            return ResponseEntity.notFound().build(); // Task nije pronađen
        }
    }

    @PostMapping("/add-reminder")
    public ResponseEntity<Task> addReminder(@RequestParam Long taskId,
                                            @RequestParam String notificationType,
                                            @RequestParam LocalDateTime reminderTime) {
        Optional<Task> taskOpt = taskService.getTaskById(taskId);
        if (taskOpt.isPresent()) {
            Task task = taskOpt.get();
            task.setNotificationType(notificationType);
            task.setReminderTime(reminderTime);
            Task updatedTask = taskService.saveTask(task);
            return ResponseEntity.ok(updatedTask);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}

package com.example.demo.controllers;

import com.example.demo.dto.AttachmentDTO;
import com.example.demo.models.Attachment;
import com.example.demo.models.Category;
import com.example.demo.models.Task;
import com.example.demo.models.User;
import com.example.demo.repositories.AttachmentRepository;
import com.example.demo.services.CategoryService;
import com.example.demo.services.TaskService;
import com.example.demo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;

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

    @Autowired
    private AttachmentRepository attachmentRepository;


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

    @PostMapping("/{taskId}/attachments")
    public ResponseEntity<String> uploadAttachment(
            @PathVariable Long taskId,
            @RequestParam("file") MultipartFile file) {

        try {
            System.out.println("Received file for task ID: " + taskId);
            System.out.println("File name: " + file.getOriginalFilename());
            System.out.println("File size: " + file.getSize());

            // Validacija tipa fajla
            String fileType = file.getContentType();
            System.out.println("File type: " + fileType);

            // Lista dozvoljenih tipova fajlova
            List<String> allowedFileTypes = List.of(
                    "image/png",
                    "image/jpeg",
                    "image/jpg",
                    "application/pdf",
                    "application/msword", // .doc
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
                    "application/rtf" // .rtf
            );

            if (!allowedFileTypes.contains(fileType)) {
                System.out.println("Unsupported file type");
                return ResponseEntity.badRequest().body("Unsupported file type: " + fileType);
            }

            // Logika za čuvanje fajla u bazi
            Task task = taskService.getTaskById(taskId).orElseThrow(() ->
                    new RuntimeException("Task not found"));

            Attachment attachment = new Attachment();
            attachment.setTask(task);
            attachment.setFileName(file.getOriginalFilename());
            attachmentRepository.save(attachment);

            System.out.println("Attachment saved to database");

            return ResponseEntity.ok("File uploaded successfully!");
        } catch (Exception e) {
            System.out.println("Error uploading file: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error uploading file: " + e.getMessage());
        }
    }



    @GetMapping("/{taskId}/attachments")
    public ResponseEntity<List<AttachmentDTO>> getAttachmentsByTaskId(@PathVariable Long taskId) {
        List<Attachment> attachments = attachmentRepository.findByTaskId(taskId);

        // Mapirajte Attachment na AttachmentDTO
        List<AttachmentDTO> attachmentDTOs = attachments.stream()
                .map(attachment -> new AttachmentDTO(attachment.getId(), attachment.getFileName()))
                .toList();

        return ResponseEntity.ok(attachmentDTOs);
    }




}

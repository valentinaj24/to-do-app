package com.example.demo.services;

import com.example.demo.models.Task;
import com.example.demo.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;
    public List<Task> getTasksByUserId(Long userId) {
        return taskRepository.findByUserId(userId);
    }



    // Create or Update Task
    public Task saveTask(Task task) {
        return taskRepository.save(task);
    }

    // Read all tasks
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    // Read single task by ID
    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    // Delete Task
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
}

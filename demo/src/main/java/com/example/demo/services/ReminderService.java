package com.example.demo.services;

import com.example.demo.models.Task;
import com.example.demo.repositories.TaskRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class ReminderService {

    private static final Logger logger = LoggerFactory.getLogger(ReminderService.class);

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private MessageService messageService;

    @Transactional
    public void sendReminders() {
        if (logger.isInfoEnabled()) {
            logger.info("sendReminders() invoked");
        }

        List<Task> tasks = taskRepository.findAll();
        LocalDate today = LocalDate.now();

        for (Task task : tasks) {
            if (logger.isInfoEnabled()) {
                logger.info("Checking task: {}", task.getText());
            }

            if (task.getDue() != null
                    && !Boolean.TRUE.equals(task.getNotificationSent())
                    && task.getDue().minusDays(1).equals(today)) {

                if (logger.isInfoEnabled()) {
                    logger.info("Sending reminder for task: {}", task.getText());
                }

                if ("email".equalsIgnoreCase(task.getNotificationType())) {
                    if (logger.isInfoEnabled()) {
                        logger.info("Sending email to: {}", task.getUser().getEmail());
                    }
                    emailService.sendEmail(
                            task.getUser().getEmail(),
                            "Task Reminder",
                            "Reminder: The deadline for your task \"" + task.getText() + "\" is tomorrow!"
                    );
                } else if ("profile".equalsIgnoreCase(task.getNotificationType())) {
                    String messageContent =
                            "Reminder: The deadline for your task \"" + task.getText() + "\" is tomorrow!";

                    if (logger.isInfoEnabled()) {
                        logger.info("Creating message for user: {}, message: {}",
                                task.getUser().getEmail(), messageContent);
                    }

                    messageService.createMessage(task.getUser().getId(), messageContent);
                }

                task.setNotificationSent(true);
                taskRepository.save(task);
            }
        }
    }

}

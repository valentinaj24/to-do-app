package com.example.demo.services;

import com.example.demo.models.Message;
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
    private MessageService messageService; // Novi servis za poruke

    @Transactional
    public void sendReminders() {
        logger.info("sendReminders() invoked");

        List<Task> tasks = taskRepository.findAll(); // Učitaj sve zadatke iz baze
        LocalDate today = LocalDate.now(); // Današnji datum

        for (Task task : tasks) {
            logger.info("Checking task: " + task.getText());

            // Proveri da li je rok zadatka sutradan
            if (task.getDue() != null &&
                    !Boolean.TRUE.equals(task.getNotificationSent()) && // Proveri da li je poslato
                    task.getDue().minusDays(1).equals(today)) {

                logger.info("Sending reminder for task: " + task.getText());

                if ("email".equalsIgnoreCase(task.getNotificationType())) {
                    logger.info("Sending email to: " + task.getUser().getEmail());
                    emailService.sendEmail(
                            task.getUser().getEmail(),
                            "Task Reminder",
                            "Reminder: The deadline for your task \"" + task.getText() + "\" is tomorrow!"
                    );
                } else if ("profile".equalsIgnoreCase(task.getNotificationType())) {
                    String messageContent = "Reminder: The deadline for your task \"" + task.getText() + "\" is tomorrow!";
                    logger.info("Creating message for user: " + task.getUser().getEmail() + ", message: " + messageContent);

                    // Kreiranje nove poruke za korisnika
                    messageService.createMessage(task.getUser().getId(), messageContent);
                }

                task.setNotificationSent(true);
                taskRepository.save(task); // Sačuvaj izmene u bazi
            }
        }
    }
}

package com.example.demo.components;

import com.example.demo.services.ReminderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ReminderScheduler {

    private static final Logger logger = LoggerFactory.getLogger(ReminderScheduler.class);

    @Autowired
    private ReminderService reminderService;

    @Scheduled(fixedRate = 6000000) // Poziva se svakih 60 sekundi
    public void checkReminders() {
        logger.info("Scheduler triggered every minute");
        reminderService.sendReminders();
    }
}


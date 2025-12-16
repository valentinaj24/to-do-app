package com.example.demo.controllers;

import com.example.demo.models.Message;
import com.example.demo.services.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @PostMapping
    public ResponseEntity<Void> createMessage(@RequestParam Long userId, @RequestBody String content) {
        messageService.createMessage(userId, content);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<Message>> getMessagesForUser(@RequestParam Long userId) {
        return ResponseEntity.ok(messageService.getMessagesForUser(userId));
    }
}

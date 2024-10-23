package com.example.demo.controllers;


import com.example.demo.models.Note;
import com.example.demo.services.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/notes")
public class NoteController {

    @Autowired
    private NoteService noteService;

    // Get all notes for a user
    @GetMapping
    public List<Note> getNotes(@RequestParam Long userId) {
        return noteService.getNotesByUserId(userId);
    }

    // Save a new note
    @PostMapping("/save")
    public Note saveNote(@RequestBody Note note, @RequestParam Long userId) {
        return noteService.saveNote(note, userId);
    }

    // Delete a note by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable Long id) {
        noteService.deleteNoteById(id);
        return ResponseEntity.noContent().build();
    }
}

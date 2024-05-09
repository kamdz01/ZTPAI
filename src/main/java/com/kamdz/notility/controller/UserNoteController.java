package com.kamdz.notility.controller;

import com.kamdz.notility.model.Note;
import com.kamdz.notility.model.User;
import com.kamdz.notility.model.NoteRole;
import com.kamdz.notility.model.UserNote;
import com.kamdz.notility.model.UserNoteRequest;
import com.kamdz.notility.service.NoteService;
import com.kamdz.notility.service.UserNoteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user-notes")
public class UserNoteController {

    private final UserNoteService userNoteService;
    private final NoteService noteService;

    public UserNoteController(UserNoteService userNoteService, NoteService noteService) {
        this.userNoteService = userNoteService;
        this.noteService = noteService;
    }

    @GetMapping
    public ResponseEntity<List<UserNote>> getAllUserNotes() {
        List<UserNote> userNotes = userNoteService.getAllUserNotes();
        return ResponseEntity.ok(userNotes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserNote> getUserNoteById(@PathVariable Long id) {
        Optional<UserNote> userNote = userNoteService.getUserNoteById(id);
        return userNote.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<UserNote> addUserNote(@RequestBody UserNoteRequest userNoteRequest) {
        // Extract note, role, and user from the request
        Note note = userNoteRequest.getNote();
        NoteRole note_role = userNoteRequest.getNoteRole();
        User user = userNoteRequest.getUser();
    
        // Create or update the note
        Note savedNote = noteService.createOrUpdateNote(note);
    
        // Create a new UserNote object
        UserNote userNote = new UserNote();
        userNote.setNote(savedNote);
        userNote.setNoteRole(note_role);
        userNote.setUser(user);
    
        // Save the user note
        UserNote savedUserNote = userNoteService.addUserNote(userNote);
    
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUserNote);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserNote> updateUserNote(@PathVariable Long id, @RequestBody UserNote userNote) {
        UserNote updatedUserNote = userNoteService.updateUserNote(id, userNote);
        return updatedUserNote != null ?
                ResponseEntity.ok(updatedUserNote) :
                ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserNoteById(@PathVariable Long id) {
        userNoteService.deleteUserNoteById(id);
        return ResponseEntity.noContent().build();
    }
}

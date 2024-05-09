// package com.kamdz.notility.controller;

// import com.kamdz.notility.model.Note;
// import com.kamdz.notility.service.NoteService;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// @RestController
// @RequestMapping("/api/notes")
// public class NoteController {

//     private final NoteService noteService;

//     public NoteController(NoteService noteService) {
//         this.noteService = noteService;
//     }

//     @PostMapping
//     public ResponseEntity<Note> addNote(@RequestBody Note note) {
//         Note savedNote = noteService.addNoteWithUserNoteAssociation(note);
//         return new ResponseEntity<>(savedNote, HttpStatus.CREATED);
//     }

//     @PutMapping("/{id}")
//     public ResponseEntity<Note> updateNote(@PathVariable Long id, @RequestBody Note note) {
//         Note updatedNote = noteService.updateNoteWithUserNoteAssociation(id, note);
//         return new ResponseEntity<>(updatedNote, HttpStatus.OK);
//     }

//     @DeleteMapping("/{id}")
//     public ResponseEntity<Void> deleteNote(@PathVariable Long id) {
//         noteService.deleteNoteWithUserNoteAssociation(id);
//         return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//     }
// }

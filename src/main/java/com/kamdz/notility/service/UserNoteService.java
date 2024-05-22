package com.kamdz.notility.service;

import com.kamdz.notility.model.Note;
import com.kamdz.notility.model.User;
import com.kamdz.notility.model.UserNote;
import com.kamdz.notility.model.NoteRole;
import com.kamdz.notility.repository.NoteRepository;
import com.kamdz.notility.repository.NoteRoleRepository;
import com.kamdz.notility.repository.UserRepository;
import com.kamdz.notility.repository.UserNoteRepository;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UserNoteService {

    private final UserNoteRepository userNoteRepository;
    private final NoteRepository noteRepository;
    private final NoteRoleRepository noteRoleRepository;
    private final UserRepository userRepository;

    public UserNoteService(UserNoteRepository userNoteRepository, NoteRepository noteRepository, UserRepository userRepository, NoteRoleRepository noteRoleRepository) {
        this.userNoteRepository = userNoteRepository;
        this.noteRepository = noteRepository;
        this.userRepository = userRepository;
        this.noteRoleRepository = noteRoleRepository;
    }

    public List<UserNote> getAllUserNotes() {
        return userNoteRepository.findAll();
    }

    public Optional<UserNote> getUserNoteById(Long id) {
        return userNoteRepository.findById(id);
    }

    public UserNote addUserNote(UserNote userNote) {
        return userNoteRepository.save(userNote);
    }

    public UserNote updateUserNote(Long id, UserNote userNote) {
        if (userNoteRepository.existsById(id)) {
            UserNote existingUserNote = userNoteRepository.findById(id).orElseThrow();
            existingUserNote.getNote().setNote_title(userNote.getNote().getNote_title());
            existingUserNote.getNote().setNote_content(userNote.getNote().getNote_content());
            existingUserNote.setNoteRole(userNote.getNoteRole());

            return userNoteRepository.save(existingUserNote);
        } else {
            return null;
        }
    }

    public UserNote updateUserNoteRole(Long user_id, Long note_id, Long note_role_id) {
        User user = userRepository.findById(user_id).orElseThrow();
        Note note = noteRepository.findById(note_id).orElseThrow();
        UserNote userNote = userNoteRepository.findByUserAndNote(user, note);
        if (userNote != null) {
            NoteRole noteRole = noteRoleRepository.findById(note_role_id).orElseThrow();
            userNote.setNoteRole(noteRole);
            return userNoteRepository.save(userNote);
        } else {
            UserNote newUserNote = new UserNote(); // Initialize noteRole
            newUserNote.setUser(user);
            newUserNote.setNoteRole(noteRoleRepository.findById(note_role_id).orElseThrow());
            newUserNote.setNote(note);
            return userNoteRepository.save(newUserNote);
        }
    }

    public Note updateNote(Long id, Note Note) {
        if (noteRepository.existsById(id)) {
            Note existingNote = noteRepository.findById(id).orElseThrow();
            existingNote.setNote_title(Note.getNote_title());
            existingNote.setNote_content(Note.getNote_content());

            return noteRepository.save(existingNote);
        } else {
            return null;
        }
    }


    public void deleteUserNoteById(Long id) {
        Optional<UserNote> userNoteOptional = userNoteRepository.findById(id);
        userNoteOptional.ifPresent(userNote -> {
            Note note = userNote.getNote();
            NoteRole noteRole = userNote.getNoteRole();
    
            if (noteRole.getId() == 1) {
                // If the noteRoleId is 1, delete the Note and all associated UserNotes
                List<UserNote> associatedUserNotes = userNoteRepository.findByNote(note);
                userNoteRepository.deleteAll(associatedUserNotes); // Delete all associated UserNotes
                noteRepository.delete(note); // Delete the Note
            } else {
                // Otherwise, just delete the UserNote
                userNoteRepository.delete(userNote);
            }
        });
    }    
    

    public List<UserNote> getUserNotesByNoteId(Long noteId) {
        Note note = noteRepository.findById(noteId).orElseThrow(() -> new EntityNotFoundException("Note not found"));
        return userNoteRepository.findByNote(note);
    }
}

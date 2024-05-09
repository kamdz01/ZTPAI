package com.kamdz.notility.service;

import com.kamdz.notility.model.Note;
import com.kamdz.notility.model.UserNote;
import com.kamdz.notility.repository.NoteRepository;
import com.kamdz.notility.repository.UserNoteRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UserNoteService {

    private final UserNoteRepository userNoteRepository;
    private final NoteRepository noteRepository;

    public UserNoteService(UserNoteRepository userNoteRepository, NoteRepository noteRepository) {
        this.userNoteRepository = userNoteRepository;
        this.noteRepository = noteRepository;
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
            userNote.setId(id);
            return userNoteRepository.save(userNote);
        } else {
            return null;
        }
    }

    public void deleteUserNoteById(Long id) {
        
        Optional<UserNote> userNoteOptional = userNoteRepository.findById(id);
        userNoteOptional.ifPresent(userNote -> {
            Note note = userNote.getNote();
            if (note != null) {
                userNoteRepository.delete(userNote);
                noteRepository.delete(note);
            }
        });
    }
}

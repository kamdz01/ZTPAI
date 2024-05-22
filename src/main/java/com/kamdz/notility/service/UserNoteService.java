package com.kamdz.notility.service;

import com.kamdz.notility.kafka.KafkaProducer;
import com.kamdz.notility.model.Note;
import com.kamdz.notility.model.User;
import com.kamdz.notility.model.UserNote;
import com.kamdz.notility.model.NoteRole;
import com.kamdz.notility.repository.NoteRepository;
import com.kamdz.notility.repository.NoteRoleRepository;
import com.kamdz.notility.repository.UserRepository;
import com.kamdz.notility.repository.UserNoteRepository;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UserNoteService {

    private final UserNoteRepository userNoteRepository;
    private final NoteRepository noteRepository;
    private final NoteRoleRepository noteRoleRepository;
    private final UserRepository userRepository;

    @Autowired
    private KafkaProducer kafkaProducer;

    public UserNoteService(UserNoteRepository userNoteRepository, NoteRepository noteRepository, UserRepository userRepository, NoteRoleRepository noteRoleRepository, KafkaProducer kafkaProducer) {
        this.userNoteRepository = userNoteRepository;
        this.noteRepository = noteRepository;
        this.userRepository = userRepository;
        this.noteRoleRepository = noteRoleRepository;
        this.kafkaProducer = kafkaProducer;
    }

    public List<UserNote> getAllUserNotes() {
        return userNoteRepository.findAll();
    }

    public Optional<UserNote> getUserNoteById(Long id) {
        return userNoteRepository.findById(id);
    }

    public UserNote addUserNote(UserNote userNote) {
        UserNote status = userNoteRepository.save(userNote);
        kafkaProducer.sendMessage("note_shared", userNote.getUser()+":added note");
        return status;
    }

    public UserNote updateUserNote(Long id, UserNote userNote) {
        if (userNoteRepository.existsById(id)) {
            UserNote existingUserNote = userNoteRepository.findById(id).orElseThrow();
            existingUserNote.getNote().setNote_title(userNote.getNote().getNote_title());
            existingUserNote.getNote().setNote_content(userNote.getNote().getNote_content());
            existingUserNote.setNoteRole(userNote.getNoteRole());
            kafkaProducer.sendMessage("note_shared", userNote.getUser()+":added note");
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
            UserNote status = userNoteRepository.save(userNote);
            kafkaProducer.sendMessage("note_shared", user_id+":added note");
            return status;
        } else {
            UserNote newUserNote = new UserNote(); // Initialize noteRole
            newUserNote.setUser(user);
            newUserNote.setNoteRole(noteRoleRepository.findById(note_role_id).orElseThrow());
            newUserNote.setNote(note);
            UserNote status = userNoteRepository.save(newUserNote);
            kafkaProducer.sendMessage("note_shared", user_id+":added note");
            return status;
        }
    }

    public Note updateNote(Long id, Note Note) {
        if (noteRepository.existsById(id)) {
            Note existingNote = noteRepository.findById(id).orElseThrow();
            existingNote.setNote_title(Note.getNote_title());
            existingNote.setNote_content(Note.getNote_content());

            Note status = noteRepository.save(existingNote);

            List<UserNote> userNotes = userNoteRepository.findByNote(existingNote);
            for (UserNote userNote : userNotes) {
                kafkaProducer.sendMessage("note_shared", userNote.getUser() + ":updated note");
            }

            return status;
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
                for (UserNote userNoteToNot : associatedUserNotes) {
                    kafkaProducer.sendMessage("note_shared", userNoteToNot.getUser() + ":deleted note");
                }
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

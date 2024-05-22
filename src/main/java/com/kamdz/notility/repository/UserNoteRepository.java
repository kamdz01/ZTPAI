package com.kamdz.notility.repository;

import com.kamdz.notility.model.Note;
import com.kamdz.notility.model.User;
import com.kamdz.notility.model.UserNote;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserNoteRepository extends JpaRepository<UserNote, Long> {
    void deleteByNote(Note note);
    UserNote findByUserAndNote(User user, Note note);
    List<UserNote> findByNote(Note note);
}

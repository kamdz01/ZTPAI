package com.kamdz.notility.repository;

import com.kamdz.notility.model.Note;
import com.kamdz.notility.model.UserNote;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserNoteRepository extends JpaRepository<UserNote, Long> {
    void deleteByNote(Note note);
}

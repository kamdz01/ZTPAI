package com.kamdz.notility.model;

import jakarta.persistence.*;

@Entity
@Table(name = "user_notes")
public class UserNote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "note_id")
    private Note note;

    @ManyToOne
    @JoinColumn(name = "note_role_id")
    private NoteRole note_role;

    // Constructors
    public UserNote() {
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

        public String getUser() {
        return user.getLogin();
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Note getNote() {
        return note;
    }

    public void setNote(Note note) {
        this.note = note;
    }

    public NoteRole getNoteRole() {
        return note_role;
    }

    public void setNoteRole(NoteRole note_role) {
        this.note_role = note_role;
    }
}

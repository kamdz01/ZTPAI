package com.kamdz.notility.model;

import jakarta.persistence.*;

@Entity
@Table(name = "note_roles")
public class NoteRole {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "note_id")
    private Note note;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "role_id")
    private Role role;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    Note getNote() {
        return note;
    }

    void setNote(Note note) {
        this.note = note;
    }

    Role getRole() {
        return role;
    }

    void setRole(Role role) {
        this.role = role;
    }
}

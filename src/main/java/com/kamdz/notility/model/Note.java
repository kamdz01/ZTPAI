package com.kamdz.notility.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "notes")
public class Note {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long note_id;

    private String note_title;
    private String note_content;

    @OneToMany(mappedBy = "note")
    @JsonManagedReference
    private Set<NoteRole> noteRoles;

    // Standard getters and setters
    public Long getId() { return note_id; }
    public void setId(Long note_id) { this.note_id = note_id; }
    public String getTitle() { return note_title; }
    public void setTitle(String note_title) { this.note_title = note_title; }
    public String getContent() { return note_content; }
    void setContent(String note_content) { this.note_content = note_content; }
    public Set<NoteRole> getNoteRoles() { return noteRoles; }
    void setNoteRoles(Set<NoteRole> noteRoles) { this.noteRoles = noteRoles; }
}

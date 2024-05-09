package com.kamdz.notility.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "note_roles")
public class NoteRole {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long note_role_id;
    private String note_role_name;

    @ManyToOne
    @JoinColumn(name = "note_id")
    @JsonBackReference
    private Note note;


    // Standard getters and setters
    public Long getId() { return note_role_id; }
    public void setId(Long note_role_id) { this.note_role_id = note_role_id; }
    public String getName() { return note_role_name; }
    public Note getNote() { return note; }
    public void setNote(Note note) { this.note = note; }
}

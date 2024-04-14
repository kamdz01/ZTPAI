package com.kamdz.notility.model;

import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(mappedBy = "role")
    private Set<NoteRole> noteRoles;

    // Standard getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    void setName(String name) { this.name = name; }
    public Set<NoteRole> getNoteRoles() { return noteRoles; }
    void setNoteRoles(Set<NoteRole> noteRoles) { this.noteRoles = noteRoles; }
}

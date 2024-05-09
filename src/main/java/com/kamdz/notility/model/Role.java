package com.kamdz.notility.model;
import jakarta.persistence.*;

@Entity
@Table(name = "note_roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long note_role_id;

    private String note_role_name;

    // Constructors
    public Role() {
    }

    // Getters and setters
    public Long getNote_role_id() {
        return note_role_id;
    }

    public void setNote_role_id(Long note_role_id) {
        this.note_role_id = note_role_id;
    }

    public String getNote_role_name() {
        return note_role_name;
    }

    public void setNote_role_name(String note_role_name) {
        this.note_role_name = note_role_name;
    }
}

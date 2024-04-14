package com.kamdz.notility.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_id;
    private String login;
    private String email;

    @OneToMany(mappedBy = "user")
    @JsonManagedReference
    private Set<UserNote> userNotes;

    // Standard getters and setters...
    public Long getId() { return user_id; }
    public void setId(Long user_id) { this.user_id = user_id; }
    public String getUsername() { return login; }
    public void setUsername(String login) { this.login = login; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public Set<UserNote> getUserNotes() { return userNotes; }
    public void setUserNotes(Set<UserNote> userNotes) { this.userNotes = userNotes; }
}

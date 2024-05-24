package com.kamdz.notility.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "users")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_id;

    private String login;
    private String email;
    private String password;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

    @Column(name = "add_date")
    private Date add_date;

    @OneToMany(mappedBy = "user")
    @OrderBy("id DESC") 
    private Set<UserNote> userNotes;

    // Standardowe gettery i settery
    public Long getId() { return user_id; }
    public void setId(Long user_id) { this.user_id = user_id; }
    public String getLogin() { return login; }
    public void setLogin(String login) { this.login = login; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public Date getAddDate() { return add_date; }
    public void setAddDate(Date add_date) { this.add_date = add_date; }
    public Set<UserNote> getUserNotes() { return userNotes; }
    public void setUserNotes(Set<UserNote> userNotes) { this.userNotes = userNotes; }
    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }
}
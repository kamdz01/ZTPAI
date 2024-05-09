package com.kamdz.notility.model;

public class UserNoteRequest {
    private Note note;
    private NoteRole note_role;
    private User user;

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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}

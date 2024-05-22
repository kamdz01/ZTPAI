package com.kamdz.notility.model;

public class UpdateNoteRoleRequest {
    private Long userId;
    private Long noteId;
    private Long noteRoleId;

    // Getters and setters
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getNoteId() {
        return noteId;
    }

    public void setNoteId(Long noteId) {
        this.noteId = noteId;
    }

    public Long getNoteRoleId() {
        return noteRoleId;
    }

    public void setNoteRoleId(Long noteRoleId) {
        this.noteRoleId = noteRoleId;
    }
}

package com.kamdz.notility.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.kamdz.notility.model.NoteRole;
import com.kamdz.notility.service.NoteRoleService;


@RestController
@RequestMapping("/api/note-roles")
public class NoteRoleController {
        
    @Autowired
    private NoteRoleService noteRoleService;

    @GetMapping
    public ResponseEntity<List<NoteRole>> getAllNoteRoles() {
        List<NoteRole> noteRoles = noteRoleService.getAllNoteRoles();
        return ResponseEntity.ok(noteRoles);
    }
}

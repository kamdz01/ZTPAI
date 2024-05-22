package com.kamdz.notility.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kamdz.notility.model.NoteRole;
import com.kamdz.notility.repository.NoteRoleRepository;

@Service
public class NoteRoleService {
    private final NoteRoleRepository noteRoleRepository;

    public NoteRoleService(NoteRoleRepository noteRoleRepository) {
        this.noteRoleRepository = noteRoleRepository;
    }

    public List<NoteRole> getAllNoteRoles() {
        return noteRoleRepository.findAll();
    }
}

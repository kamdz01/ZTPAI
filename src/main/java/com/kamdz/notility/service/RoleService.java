package com.kamdz.notility.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kamdz.notility.model.Role;
import com.kamdz.notility.repository.RoleRepository;

@Service
public class RoleService {
    private final RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }
}

package com.kamdz.notility.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.kamdz.notility.model.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
}
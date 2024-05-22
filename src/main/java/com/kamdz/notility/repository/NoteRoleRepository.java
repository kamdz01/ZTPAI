package com.kamdz.notility.repository;

import com.kamdz.notility.model.NoteRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoteRoleRepository extends JpaRepository<NoteRole, Long> {
}

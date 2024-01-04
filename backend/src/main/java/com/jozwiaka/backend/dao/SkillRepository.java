package com.jozwiaka.backend.dao;

import com.jozwiaka.backend.entity.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin("http://localhost:4200")
public interface SkillRepository extends JpaRepository<Skill, Long> {
    List<Skill> findByTreeId(@Param("id") Long treeId);
}

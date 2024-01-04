package com.jozwiaka.backend.dao;

import com.jozwiaka.backend.entity.ChampionSkill;
import com.jozwiaka.backend.entity.ChampionSkillId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "championSkills", path = "champion-skills")
public interface ChampionSkillRepository extends JpaRepository<ChampionSkill, ChampionSkillId> {
    List<ChampionSkill> findByChampionId(@Param("id") Long championId);
}
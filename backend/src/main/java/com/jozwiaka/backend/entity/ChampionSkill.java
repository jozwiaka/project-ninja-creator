package com.jozwiaka.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "champion_skill")
@IdClass(ChampionSkillId.class)
public class ChampionSkill {
    @Id
    @Column(name = "champion_id")
    private Long championId;

    @Id
    @Column(name = "skill_id")
    private Long skillId;

    @Column(name = "points")
    private Integer points;
}


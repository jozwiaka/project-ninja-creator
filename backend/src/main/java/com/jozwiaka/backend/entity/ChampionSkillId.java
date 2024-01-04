package com.jozwiaka.backend.entity;

import lombok.Data;

import java.io.Serializable;

@Data
public class ChampionSkillId implements Serializable {
    private Long championId;
    private Long skillId;
}
package com.jozwiaka.backend.entity;

import lombok.Data;

import java.io.Serializable;

@Data
public class ChampionTreeId implements Serializable {
    private Long championId;
    private Long treeId;
}
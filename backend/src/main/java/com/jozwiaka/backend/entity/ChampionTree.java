package com.jozwiaka.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "champion_tree")
@IdClass(ChampionTreeId.class)
public class ChampionTree {
    @Id
    @Column(name = "champion_id")
    private Long championId;

    @Id
    @Column(name = "tree_id")
    private Long treeId;

    @Column(name = "points")
    private Integer points;
}


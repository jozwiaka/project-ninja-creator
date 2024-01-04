package com.jozwiaka.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "tree")
public class Tree {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    @OneToMany(mappedBy = "tree", cascade = CascadeType.ALL)
//    private List<Skill> skills;

    @Column(unique = true, nullable = false)
    private String name;
}

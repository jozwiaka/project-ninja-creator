package com.jozwiaka.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "champion")
public class Champion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "attributes_id")
    private Attributes attributes;

    @Column(unique = true, nullable = false)
    private String name;

    @Column(name = "attribute_points")
    private Integer attributePoints;

    @Column(name = "skill_points")
    private Integer skillPoints;
}

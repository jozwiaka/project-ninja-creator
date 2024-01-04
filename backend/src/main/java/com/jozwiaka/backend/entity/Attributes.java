package com.jozwiaka.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "attributes")
public class Attributes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @PrimaryKeyJoinColumn
    private Champion champion;

    private Integer vitality;
    private Integer concentration;
    private Integer taijutsu;
    private Integer ninjutsu;
    private Integer speed;
    private Integer movement;
    private Integer defense;
}

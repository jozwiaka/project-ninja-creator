package com.jozwiaka.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;

@Entity
@Data
@Table(name = "skill")
public class Skill implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "tree_id")
    private Tree tree;

    @Column(unique = true, nullable = false)
    private String name;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "tier")
    private Double tier;

    @Column(name = "target")
    private String target;

    @Column(name = "p_chakra_cost")
    private Double p_chakraCost;

    @Column(name = "p_chakra_cost_per_point")
    private Double p_chakraCostPerPoint;

    @Column(name = "p_cooldown")
    private Double p_cooldown;

    @Column(name = "p_cooldown_per_point")
    private Double p_cooldownPerPoint;

    @Column(name = "p_cast_time")
    private Double p_castTime;

    @Column(name = "p_cast_time_per_point")
    private Double p_castTimePerPoint;

    @Column(name = "range")
    private Double range;

    @Column(name = "dmg_type")
    private String dmgType;

    @Column(name = "p_dmg_base")
    private Double p_dmgBase;

    @Column(name = "p_dmg_base_per_point")
    private Double p_dmgBasePerPoint;

    @Column(name = "dmg_taijutsu_power_scale")
    private Double dmgTaijutsuPowerScale;

    @Column(name = "dmg_ninjutsu_power_scale")
    private Double dmgNinjutsuPowerScale;

    @Column(name = "dmg_max_health_scale")
    private Double dmgMaxHealthScale;

    @Column(name = "dmg_max_chakra_scale")
    private Double dmgMaxChakraScale;

    @Column(name = "dmg_increase_per_distance_covered_perc")
    private Double dmgIncreasePerDistanceCoveredPerc;

    @Column(name = "dmg_increase_per_missing_health_perc")
    private Double dmgIncreasePerMissingHealthPerc;

    @Column(name = "move")
    private boolean move;

    @Column(name = "clone")
    private boolean clone;

    @Column(name = "c_weak")
    private boolean c_weak;

    @Column(name = "c_swap")
    private boolean c_swap;

    @Column(name = "p_c_scale")
    private Double p_cScale;

    @Column(name = "p_c_scale_per_point")
    private Double p_cScalePerPoint;

    @Column(name = "p_c_number")
    private Double p_cNumber;

    @Column(name = "p_c_number_per_point")
    private Double p_cNumberPerPoint;

    @Column(name = "mirror")
    private boolean mirror;

    @Column(name = "p_m_max_health_base")
    private Double p_mMaxHealthBase;

    @Column(name = "p_m_max_health_base_per_point")
    private Double p_mMaxHealthBasePerPoint;

    @Column(name = "m_ninjutsu_scale")
    private Double m_ninjutsuScale;

    @Column(name = "invisibility")
    private boolean invisibility;

    @Column(name = "buff")
    private boolean buff;

    @Column(name = "p_b_max_health")
    private Double p_bMaxHealth;

    @Column(name = "p_b_max_chakra")
    private Double p_bMaxChakra;

    @Column(name = "p_b_taijutsu_power")
    private Double p_bTaijutsuPower;

    @Column(name = "p_b_ninjutsu_power")
    private Double p_bNinjutsuPower;

    @Column(name = "p_b_attack_speed")
    private Double p_bAttackSpeed;

    @Column(name = "p_b_movement_speed")
    private Double p_bMovementSpeed;

    @Column(name = "p_b_resistances")
    private Double p_bResistances;

    @Column(name = "b_side_effect")
    private boolean b_sideEffect;

    @Column(name = "p_b_side_effect_taijutsu_power")
    private Double p_bSideEffectTaijutsuPower;

    @Column(name = "p_b_side_effect_ninjutsu_power")
    private Double p_bSideEffectNinjutsuPower;

    @Column(name = "p_b_side_effect_attack_speed")
    private Double p_bSideEffectAttackSpeed;

    @Column(name = "p_b_side_effect_movement_speed")
    private Double p_bSideEffectMovementSpeed;

    @Column(name = "p_b_side_effect_resistances")
    private Double p_bSideEffectResistances;

    @Column(name = "p_b_max_health_per_point")
    private Double p_bMaxHealthPerPoint;

    @Column(name = "p_b_max_chakra_per_point")
    private Double p_bMaxChakraPerPoint;

    @Column(name = "p_b_taijutsu_power_per_point")
    private Double p_bTaijutsuPowerPerPoint;

    @Column(name = "p_b_ninjutsu_power_per_point")
    private Double p_bNinjutsuPowerPerPoint;

    @Column(name = "p_b_attack_speed_per_point")
    private Double p_bAttackSpeedPerPoint;

    @Column(name = "p_b_movement_speed_per_point")
    private Double p_bMovementSpeedPerPoint;

    @Column(name = "p_b_resistances_per_point")
    private Double p_bResistancesPerPoint;

    @Column(name = "p_b_side_effect_taijutsu_power_per_point")
    private Double p_bSideEffectTaijutsuPowerPerPoint;

    @Column(name = "p_b_side_effect_ninjutsu_power_per_point")
    private Double p_bSideEffectNinjutsuPowerPerPoint;

    @Column(name = "p_b_side_effect_attack_speed_per_point")
    private Double p_bSideEffectAttackSpeedPerPoint;

    @Column(name = "p_b_side_effect_movement_speed_per_point")
    private Double p_bSideEffectMovementSpeedPerPoint;

    @Column(name = "p_b_side_effect_resistances_per_point")
    private Double p_bSideEffectResistancesPerPoint;

    @Column(name = "kyuubi_chakra")
    private boolean kyuubiChakra;

    @Column(name = "requires_kyuubi_chakra")
    private boolean requiresKyuubiChakra;

    @Column(name = "throw_in_air")
    private boolean throwInAir;

    @Column(name = "requires_target_in_air")
    private boolean requiresTargetInAir;

    @Column(name = "debuff")
    private boolean debuff;

    @Column(name = "p_d_resistances")
    private Double p_dResistances;

    @Column(name = "p_d_resistances_per_point")
    private Double p_dResistancesPerPoint;

    @Column(name = "armor")
    private boolean armor;

    @Column(name = "p_a_armor_base")
    private Double p_aArmorBase;

    @Column(name = "p_a_armor_base_per_point")
    private Double p_aArmorBasePerPoint;

    @Column(name = "a_ninjutsu_scale")
    private Double a_ninjutsuScale;

    @Column(name = "passive")
    private boolean passive;

    @Column(name = "p_p_max_health")
    private Double p_pMaxHealth;

    @Column(name = "p_p_max_chakra")
    private Double p_pMaxChakra;

    @Column(name = "p_p_taijutsu_power")
    private Double p_pTaijutsuPower;

    @Column(name = "p_p_ninjutsu_power")
    private Double p_pNinjutsuPower;

    @Column(name = "p_p_attack_speed")
    private Double p_pAttackSpeed;

    @Column(name = "p_p_movement_speed")
    private Double p_pMovementSpeed;

    @Column(name = "p_p_resistances")
    private Double p_pResistances;

    @Column(name = "p_p_max_health_per_point")
    private Double p_pMaxHealthPerPoint;

    @Column(name = "p_p_max_chakra_per_point")
    private Double p_pMaxChakraPerPoint;

    @Column(name = "p_p_taijutsu_power_per_point")
    private Double p_pTaijutsuPowerPerPoint;

    @Column(name = "p_p_ninjutsu_power_per_point")
    private Double p_pNinjutsuPowerPerPoint;

    @Column(name = "p_p_attack_speed_per_point")
    private Double p_pAttackSpeedPerPoint;

    @Column(name = "p_p_movement_speed_per_point")
    private Double p_pMovementSpeedPerPoint;

    @Column(name = "p_p_resistances_per_point")
    private Double p_pResistancesPerPoint;

    @Column(name = "hyuuga_style")
    private boolean hyuugaStyle;

    @Column(name = "p_h_stacks_bonus")
    private Double p_hStacksBonus;

    @Column(name = "p_h_stacks_bonus_per_point")
    private Double p_hStacksBonusPerPoint;
}

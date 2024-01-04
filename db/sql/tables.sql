CREATE SCHEMA IF NOT EXISTS `game`;
USE `game`;

CREATE TABLE IF NOT EXISTS `game`.`attributes` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `vitality` INT DEFAULT 0,
  `concentration` INT DEFAULT 0,
  `taijutsu` INT DEFAULT 0,
  `ninjutsu` INT DEFAULT 0,
  `speed` INT DEFAULT 0,
  `movement` INT DEFAULT 0,
  `defense` INT DEFAULT 0,
  PRIMARY KEY (`id`)
)
ENGINE=InnoDB
AUTO_INCREMENT = 1;

CREATE TABLE IF NOT EXISTS `game`.`champion` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `attributes_id` BIGINT,
    `name` VARCHAR(255) UNIQUE NOT NULL,
    `attribute_points` INT DEFAULT 0,
    `skill_points` INT DEFAULT 0,
    PRIMARY KEY(`id`),
    CONSTRAINT `fk_champion_attributes` FOREIGN KEY (`attributes_id`) REFERENCES `attributes` (`id`)
)
ENGINE=InnoDB
AUTO_INCREMENT = 1;

CREATE TABLE IF NOT EXISTS `game`.`tree` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) UNIQUE NOT NULL,
  PRIMARY KEY (`id`)
)
ENGINE=InnoDB
AUTO_INCREMENT = 1;

CREATE TABLE IF NOT EXISTS `game`.`skill` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `tree_id` BIGINT DEFAULT NULL,
  `name` VARCHAR(255) UNIQUE NOT NULL,
  `image_url` VARCHAR(255) DEFAULT '',
  `tier` DOUBLE DEFAULT -1,
  `target` VARCHAR(255) DEFAULT 'none',
  `p_chakra_cost` DOUBLE DEFAULT 0,
  `p_chakra_cost_per_point` DOUBLE DEFAULT 0,
  `p_cooldown` DOUBLE DEFAULT 0,
  `p_cooldown_per_point` DOUBLE DEFAULT 0,
  `p_cast_time` DOUBLE DEFAULT 0,
  `p_cast_time_per_point` DOUBLE DEFAULT 0,
  `range` DOUBLE DEFAULT 0,
  `dmg_type` VARCHAR(255) DEFAULT '',
  `p_dmg_base` DOUBLE DEFAULT 0,
  `p_dmg_base_per_point` DOUBLE DEFAULT 0,
  `dmg_taijutsu_power_scale` DOUBLE DEFAULT 0,
  `dmg_ninjutsu_power_scale` DOUBLE DEFAULT 0,
  `dmg_max_health_scale` DOUBLE DEFAULT 0,
  `dmg_max_chakra_scale` DOUBLE DEFAULT 0,
  `dmg_increase_per_distance_covered_perc` DOUBLE DEFAULT 0,
  `dmg_increase_per_missing_health_perc` DOUBLE DEFAULT 0,
  `move` TINYINT(1) DEFAULT 0,
  `clone` TINYINT(1) DEFAULT 0,
  `c_weak` TINYINT(1) DEFAULT 0,
  `c_swap` TINYINT(1) DEFAULT 0,
  `p_c_scale` DOUBLE DEFAULT 0,
  `p_c_scale_per_point` DOUBLE DEFAULT 0,
  `p_c_number` DOUBLE DEFAULT 0,
  `p_c_number_per_point` DOUBLE DEFAULT 0,
  `mirror` TINYINT(1) DEFAULT 0,
  `p_m_max_health_base` DOUBLE DEFAULT 0,
  `p_m_max_health_base_per_point` DOUBLE DEFAULT 0,
  `m_ninjutsu_scale` DOUBLE DEFAULT 0,
  `invisibility` TINYINT(1) DEFAULT 0,
  `buff` TINYINT(1) DEFAULT 0,
  `p_b_max_health` DOUBLE DEFAULT 0,
  `p_b_max_chakra` DOUBLE DEFAULT 0,
  `p_b_taijutsu_power` DOUBLE DEFAULT 0,
  `p_b_ninjutsu_power` DOUBLE DEFAULT 0,
  `p_b_attack_speed` DOUBLE DEFAULT 0,
  `p_b_movement_speed` DOUBLE DEFAULT 0,
  `p_b_resistances` DOUBLE DEFAULT 0,
  `b_side_effect` TINYINT(1) DEFAULT 0,
  `p_b_side_effect_taijutsu_power` DOUBLE DEFAULT 0,
  `p_b_side_effect_ninjutsu_power` DOUBLE DEFAULT 0,
  `p_b_side_effect_attack_speed` DOUBLE DEFAULT 0,
  `p_b_side_effect_movement_speed` DOUBLE DEFAULT 0,
  `p_b_side_effect_resistances` DOUBLE DEFAULT 0,
  `p_b_max_health_per_point` DOUBLE DEFAULT 0,
  `p_b_max_chakra_per_point` DOUBLE DEFAULT 0,
  `p_b_taijutsu_power_per_point` DOUBLE DEFAULT 0,
  `p_b_ninjutsu_power_per_point` DOUBLE DEFAULT 0,
  `p_b_attack_speed_per_point` DOUBLE DEFAULT 0,
  `p_b_movement_speed_per_point` DOUBLE DEFAULT 0,
  `p_b_resistances_per_point` DOUBLE DEFAULT 0,
  `p_b_side_effect_taijutsu_power_per_point` DOUBLE DEFAULT 0,
  `p_b_side_effect_ninjutsu_power_per_point` DOUBLE DEFAULT 0,
  `p_b_side_effect_attack_speed_per_point` DOUBLE DEFAULT 0,
  `p_b_side_effect_movement_speed_per_point` DOUBLE DEFAULT 0,
  `p_b_side_effect_resistances_per_point` DOUBLE DEFAULT 0,
  `kyuubi_chakra` TINYINT(1) DEFAULT 0,
  `requires_kyuubi_chakra` TINYINT(1) DEFAULT 0,
  `throw_in_air` TINYINT(1) DEFAULT 0,
  `requires_target_in_air` TINYINT(1) DEFAULT 0,
  `debuff` TINYINT(1) DEFAULT 0,
  `p_d_resistances` DOUBLE DEFAULT 0,
  `p_d_resistances_per_point` DOUBLE DEFAULT 0,
  `armor` TINYINT(1) DEFAULT 0,
  `p_a_armor_base` DOUBLE DEFAULT 0,
  `p_a_armor_base_per_point` DOUBLE DEFAULT 0,
  `a_ninjutsu_scale` DOUBLE DEFAULT 0,
  `passive` TINYINT(1) DEFAULT 0,
  `p_p_max_health` DOUBLE DEFAULT 0,
  `p_p_max_chakra` DOUBLE DEFAULT 0,
  `p_p_taijutsu_power` DOUBLE DEFAULT 0,
  `p_p_ninjutsu_power` DOUBLE DEFAULT 0,
  `p_p_attack_speed` DOUBLE DEFAULT 0,
  `p_p_movement_speed` DOUBLE DEFAULT 0,
  `p_p_resistances` DOUBLE DEFAULT 0,
  `p_p_max_health_per_point` DOUBLE DEFAULT 0,
  `p_p_max_chakra_per_point` DOUBLE DEFAULT 0,
  `p_p_taijutsu_power_per_point` DOUBLE DEFAULT 0,
  `p_p_ninjutsu_power_per_point` DOUBLE DEFAULT 0,
  `p_p_attack_speed_per_point` DOUBLE DEFAULT 0,
  `p_p_movement_speed_per_point` DOUBLE DEFAULT 0,
  `p_p_resistances_per_point` DOUBLE DEFAULT 0,
  `hyuuga_style` TINYINT(1) DEFAULT 0,
  `p_h_stacks_bonus` DOUBLE DEFAULT 0,
  `p_h_stacks_bonus_per_point` DOUBLE DEFAULT 0,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_skill_tree` FOREIGN KEY (`tree_id`) REFERENCES `tree` (`id`)
)
ENGINE=InnoDB
AUTO_INCREMENT = 1;

CREATE TABLE IF NOT EXISTS `game`.`champion_tree` (
  `champion_id` BIGINT,
  `tree_id` BIGINT,
  `points` INT DEFAULT 0,
  CONSTRAINT `fk_champion_champion_tree` FOREIGN KEY (`champion_id`) REFERENCES `champion` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_tree_champion_tree` FOREIGN KEY (`tree_id`) REFERENCES `tree` (`id`)
);

CREATE TABLE IF NOT EXISTS `game`.`champion_skill` (
  `champion_id` BIGINT,
  `skill_id` BIGINT,
  `points` INT DEFAULT 0,
  CONSTRAINT `fk_champion_champion_skill` FOREIGN KEY (`champion_id`) REFERENCES `champion` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_skill_champion_skill` FOREIGN KEY (`skill_id`) REFERENCES `skill` (`id`)
);

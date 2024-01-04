import os
import sys
import paths
import json


def convert_string(string):
    words = string.split("_")
    words[0] = words[0].capitalize()
    return " ".join(words)


def convert_url_to_name(url):
    filename = os.path.basename(url)
    filename = filename.split(".")[0]
    return convert_string(filename)


class Base:
    id_counter = 1

    def __init__(self):
        self.id = self.__class__.id_counter
        self.__class__.id_counter += 1


class Tree(Base):
    def __init__(self, name):
        super().__init__()
        self.name = "'" + convert_string(name) + "'"
        self.prefix = "INSERT IGNORE INTO tree (id, name) VALUES ("

    def query(self):
        line = self.prefix
        line += str(self.id) + ", "
        line += self.name
        line += ");\n"
        return line


class Skill(Base):
    def __init__(self, tree_id, image_url, tier):
        super().__init__()
        if tree_id == None:
            tree_id = "NULL"
        if tier == None:
            tier = 0
        self.tree_id = tree_id
        self.image_url = "'" + image_url + "'"
        self.tier = int(str(tier).removeprefix("tier_"))
        self.name = "'" + convert_url_to_name(self.image_url) + "'"
        self.prefix = (
            "INSERT IGNORE INTO skill (id, tree_id, name, image_url, tier) VALUES ("
        )

    def query(self):
        line = self.prefix
        line += str(self.id) + ", "
        line += str(self.tree_id) + ", "
        line += self.name + ", "
        line += self.image_url + ", "
        line += str(self.tier)
        line += ");\n"
        return line


trees = []
skills = []
skills_json = []


def list_basic_skills():
    tree = Tree("basic_skills")
    trees.append(tree)
    for file in os.listdir(paths.skills_basic):
        file = str(os.path.join(paths.skills_basic, file)).replace("\\", "/")
        image_url = file
        skill = Skill(tree.id, image_url, 0)
        skills.append(skill)


def list_trees_and_skills():
    for tree_dir in os.listdir(paths.trees):
        tree = Tree(tree_dir)
        trees.append(tree)
        tree_dir = os.path.join(paths.trees, tree_dir)
        for root, dirs, files in os.walk(tree_dir):
            for file in files:
                file = str(os.path.join(root, file)).replace("\\", "/")
                assets_index = file.find("assets")
                if assets_index != -1:
                    file = file[assets_index:]
                image_url = file

                data = image_url.split("/")
                print(data)
                tier = data[-2]

                skill = Skill(tree.id, image_url, tier)
                skills.append(skill)


def run():
    list_basic_skills()
    list_trees_and_skills()

    with open(paths.out + "/data_trees.sql", "w") as f:
        for tree in trees:
            f.write(tree.query())

    with open(paths.json + "/SKILL_TEMPLATE.json", "r") as f:
        skill_json = json.load(f)

    with open(paths.out + "/_data_skills.sql", "w") as f:
        for skill in skills:
            f.write(skill.query())
            skill_json_copy = skill_json.copy()
            skill_json_copy["id"] = skill.id
            skill_json_copy["tree_id"] = skill.tree_id
            skill_json_copy["name"] = skill.name.replace("'", "")
            skill_json_copy["image_url"] = skill.image_url.replace("'", "")
            skill_json_copy["tier"] = skill.tier
            skills_json.append(skill_json_copy)

    with open(paths.out + "/_data_skills.json", "w") as f:
        json.dump(skills_json, f, indent=4)

    with open(paths.json + "/data_skills.json") as f:
        skill_data = json.load(f)

    insert_queries = []
    for skill in skill_data:
        insert_queries.append(
            """INSERT IGNORE INTO `skill` (
  `tree_id`,
  `name`,
  `image_url`,
  `tier`,
  `target`,
  `p_chakra_cost`,
  `p_chakra_cost_per_point`,
  `p_cooldown`,
  `p_cooldown_per_point`,
  `p_cast_time`,
  `p_cast_time_per_point`,
  `range`,
  `dmg_type`,
  `p_dmg_base`,
  `p_dmg_base_per_point`,
  `dmg_taijutsu_power_scale`,
  `dmg_ninjutsu_power_scale`,
  `dmg_max_health_scale`,
  `dmg_max_chakra_scale`,
  `dmg_increase_per_distance_covered_perc`,
  `dmg_increase_per_missing_health_perc`,
  `move`,
  `clone`,
  `c_weak`,
  `c_swap`,
  `p_c_scale`,
  `p_c_scale_per_point`,
  `p_c_number`,
  `p_c_number_per_point`,
  `mirror`,
  `p_m_max_health_base`,
  `p_m_max_health_base_per_point`,
  `m_ninjutsu_scale`,
  `invisibility`,
  `buff`,
  `p_b_max_health`,
  `p_b_max_chakra`,
  `p_b_taijutsu_power`,
  `p_b_ninjutsu_power`,
  `p_b_attack_speed`,
  `p_b_movement_speed`,
  `p_b_resistances`,
  `b_side_effect`,
  `p_b_side_effect_taijutsu_power`,
  `p_b_side_effect_ninjutsu_power`,
  `p_b_side_effect_attack_speed`,
  `p_b_side_effect_movement_speed`,
  `p_b_side_effect_resistances`,
  `p_b_max_health_per_point`,
  `p_b_max_chakra_per_point`,
  `p_b_taijutsu_power_per_point`,
  `p_b_ninjutsu_power_per_point`,
  `p_b_attack_speed_per_point`,
  `p_b_movement_speed_per_point`,
  `p_b_resistances_per_point`,
  `p_b_side_effect_taijutsu_power_per_point`,
  `p_b_side_effect_ninjutsu_power_per_point`,
  `p_b_side_effect_attack_speed_per_point`,
  `p_b_side_effect_movement_speed_per_point`,
  `p_b_side_effect_resistances_per_point`,
  `kyuubi_chakra`,
  `requires_kyuubi_chakra`,
  `throw_in_air`,
  `requires_target_in_air`,
  `debuff`,
  `p_d_resistances`,
  `p_d_resistances_per_point`,
  `armor`,
  `p_a_armor_base`,
  `p_a_armor_base_per_point`,
  `a_ninjutsu_scale`,
  `passive`,
  `p_p_max_health`,
  `p_p_max_chakra`,
  `p_p_taijutsu_power`,
  `p_p_ninjutsu_power`,
  `p_p_attack_speed`,
  `p_p_movement_speed`,
  `p_p_resistances`,
  `p_p_max_health_per_point`,
  `p_p_max_chakra_per_point`,
  `p_p_taijutsu_power_per_point`,
  `p_p_ninjutsu_power_per_point`,
  `p_p_attack_speed_per_point`,
  `p_p_movement_speed_per_point`,
  `p_p_resistances_per_point`,
  `hyuuga_style`,
  `p_h_stacks_bonus`,
  `p_h_stacks_bonus_per_point`
) VALUES (
  '{tree_id}',
  '{name}',
  '{image_url}',
  '{tier}',
  '{target}',
  '{p_chakra_cost}',
  '{p_chakra_cost_per_point}',
  '{p_cooldown}',
  '{p_cooldown_per_point}',
  '{p_cast_time}',
  '{p_cast_time_per_point}',
  '{range}',
  '{dmg_type}',
  '{p_dmg_base}',
  '{p_dmg_base_per_point}',
  '{dmg_taijutsu_power_scale}',
  '{dmg_ninjutsu_power_scale}',
  '{dmg_max_health_scale}',
  '{dmg_max_chakra_scale}',
  '{dmg_increase_per_distance_covered_perc}',
  '{dmg_increase_per_missing_health_perc}',
  '{move}',
  '{clone}',
  '{c_weak}',
  '{c_swap}',
  '{p_c_scale}',
  '{p_c_scale_per_point}',
  '{p_c_number}',
  '{p_c_number_per_point}',
  '{mirror}',
  '{p_m_max_health_base}',
  '{p_m_max_health_base_per_point}',
  '{m_ninjutsu_scale}',
  '{invisibility}',
  '{buff}',
  '{p_b_max_health}',
  '{p_b_max_chakra}',
  '{p_b_taijutsu_power}',
  '{p_b_ninjutsu_power}',
  '{p_b_attack_speed}',
  '{p_b_movement_speed}',
  '{p_b_resistances}',
  '{b_side_effect}',
  '{p_b_side_effect_taijutsu_power}',
  '{p_b_side_effect_ninjutsu_power}',
  '{p_b_side_effect_attack_speed}',
  '{p_b_side_effect_movement_speed}',
  '{p_b_side_effect_resistances}',
  '{p_b_max_health_per_point}',
  '{p_b_max_chakra_per_point}',
  '{p_b_taijutsu_power_per_point}',
  '{p_b_ninjutsu_power_per_point}',
  '{p_b_attack_speed_per_point}',
  '{p_b_movement_speed_per_point}',
  '{p_b_resistances_per_point}',
  '{p_b_side_effect_taijutsu_power_per_point}',
  '{p_b_side_effect_ninjutsu_power_per_point}',
  '{p_b_side_effect_attack_speed_per_point}',
  '{p_b_side_effect_movement_speed_per_point}',
  '{p_b_side_effect_resistances_per_point}',
  '{kyuubi_chakra}',
  '{requires_kyuubi_chakra}',
  '{throw_in_air}',
  '{requires_target_in_air}',
  '{debuff}',
  '{p_d_resistances}',
  '{p_d_resistances_per_point}',
  '{armor}',
  '{p_a_armor_base}',
  '{p_a_armor_base_per_point}',
  '{a_ninjutsu_scale}',
  '{passive}',
  '{p_p_max_health}',
  '{p_p_max_chakra}',
  '{p_p_taijutsu_power}',
  '{p_p_ninjutsu_power}',
  '{p_p_attack_speed}',
  '{p_p_movement_speed}',
  '{p_p_resistances}',
  '{p_p_max_health_per_point}',
  '{p_p_max_chakra_per_point}',
  '{p_p_taijutsu_power_per_point}',
  '{p_p_ninjutsu_power_per_point}',
  '{p_p_attack_speed_per_point}',
  '{p_p_movement_speed_per_point}',
  '{p_p_resistances_per_point}',
  '{hyuuga_style}',
  '{p_h_stacks_bonus}',
  '{p_h_stacks_bonus_per_point}'
);""".format(
                **skill
            )
        )

        with open(paths.out + "/data_skills.sql", "w") as f:
            f.write("\n".join(insert_queries))

        with open(paths.out + "/final.sql", "w") as f:
            with open(paths.sql + "/tables.sql", "r") as _f:
                f.write(_f.read())

            with open(paths.out + "/data_trees.sql", "r") as _f:
                f.write(_f.read())

            with open(paths.out + "/data_skills.sql", "r") as _f:
                f.write(_f.read())


run()

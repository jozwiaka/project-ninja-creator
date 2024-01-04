import os

assets = os.path.dirname(os.path.abspath(__file__))

tree_name = "test"
for tier_name in ["tier_1", "tier_2", "tier_3"]:
    os.makedirs(
        os.path.join(assets, "imgs-skills-original/trees", tree_name, tier_name)
    )

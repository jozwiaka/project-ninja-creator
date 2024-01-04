import os

root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

assets = os.path.join(root, "frontend", "src", "assets")
imgs_skills = os.path.join(assets, "imgs-skills")
trees = os.path.join(imgs_skills, "trees")
skills_basic = os.path.join(imgs_skills, "skills-basic")

db = os.path.join(root, "db")
sql = os.path.join(db, "sql")
json = os.path.join(db, "json")
out = os.path.join(db, "out")

from PIL import Image  # pip install pillow
import os
import shutil


def resize_save(input_dir, output_dir, size_resized):
    for filename in os.listdir(input_dir):
        if filename.endswith(".jpg") or filename.endswith(".png"):
            with Image.open(os.path.join(input_dir, filename)) as img:
                img.thumbnail(size_resized)
                center_x, center_y = img.size[0] / 2, img.size[1] / 2
                crop_size = min(img.size[0], img.size[1])
                left, upper = center_x - crop_size / 2, center_y - crop_size / 2
                right, lower = left + crop_size, upper + crop_size
                img_cropped = img.crop((left, upper, right, lower))
                img_resized = img_cropped.resize(size_resized)
                img_resized.save(os.path.join(output_dir, filename))


def crop_save(input_dir, output_dir):
    for filename in os.listdir(input_dir):
        if filename.endswith(".jpg") or filename.endswith(".png"):
            with Image.open(os.path.join(input_dir, filename)) as img:
                center_x, center_y = img.size[0] / 2, img.size[1] / 2
                crop_size = min(img.size[0], img.size[1])
                left, upper = center_x - crop_size / 2, center_y - crop_size / 2
                right, lower = left + crop_size, upper + crop_size
                img_cropped = img.crop((left, upper, right, lower))
                img_cropped.save(os.path.join(output_dir, filename))


def run():
    assets = os.path.dirname(os.path.abspath(__file__))
    imgs_skills_original = os.path.join(assets, "imgs-skills-original")
    imgs_skills = os.path.join(assets, "imgs-skills")

    if os.path.exists(imgs_skills):
        shutil.rmtree(imgs_skills)
    shutil.copytree(imgs_skills_original, imgs_skills)
    for root, dirs, files in os.walk(imgs_skills):
        for dir in dirs:
            dir = os.path.join(root, dir)
            print(dir)
            crop_save(dir, dir)


run()

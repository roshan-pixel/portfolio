import urllib.request
import os
import shutil
import json

dest_dir = r"C:\Users\sgarm\stephanie-perez-portfolio\assets"
os.makedirs(dest_dir, exist_ok=True)

temp_slides_dir = r"C:\Users\sgarm\AppData\Local\Temp\behance_slides"

# Copy already downloaded slides
copied = 0
if os.path.exists(temp_slides_dir):
    for fname in os.listdir(temp_slides_dir):
        if fname.endswith(".jpg"):
            src = os.path.join(temp_slides_dir, fname)
            dst = os.path.join(dest_dir, fname)
            shutil.copy2(src, dst)
            copied += 1
print(f"Copied {copied} existing slides from temp.")

# Read full list of 60 images
behance_res_path = r"C:\Users\sgarm\AppData\Local\Temp\behance-result.json"
with open(behance_res_path, "r", encoding="utf-16", errors="ignore") as f:
    res = json.load(f)

data = json.loads(res["data"]["value"])
imgs = [img["src"] for img in data.get("images", []) if "project_modules" in img.get("src", "")]
seen = set()
ordered_imgs = []
for url in imgs:
    base_id = url.split("/")[-1]
    if base_id not in seen:
        seen.add(base_id)
        # use 1400 high res
        ordered_imgs.append(url.replace("1400_webp", "1400"))

# Download all 60 slides so the website is 100% offline-ready
print(f"Total slides to ensure: {len(ordered_imgs)}")
downloaded = 0
for i, url in enumerate(ordered_imgs, 1):
    dst = os.path.join(dest_dir, f"slide_{i}.jpg")
    if not os.path.exists(dst):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=15) as resp, open(dst, "wb") as f:
                f.write(resp.read())
            downloaded += 1
            if i % 5 == 0 or i == len(ordered_imgs):
                print(f"Downloaded up to slide {i}/{len(ordered_imgs)}")
        except Exception as e:
            print(f"Failed slide {i}: {e}")

print(f"Done! {copied} copied, {downloaded} newly downloaded.")

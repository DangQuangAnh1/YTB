"""Make a 1080x1920 Shorts thumbnail: a blurred frame from the video, a big 2-3 line hook and one meme sticker.

The text sits in the upper-middle band, so the Shorts grid crop and the title overlay at the bottom never hide it.
A meme sticker (emoji or meme image) goes under the text.
Usage: make-thumbnail.py <render_dir_name> <spec.json>
spec = {"frame_at": 8.3, "lines": ["AI LÀ", "MINH HÀ?!"], "highlight": 1, "sticker": "library/memes/cat-shocked.png",
        "badge": "Pt.1"}
Writes artifacts/render/<render_dir>/thumbnail.jpg (under 2 MB).
"""
import json
import subprocess
import sys
from pathlib import Path

import imageio_ffmpeg
from PIL import Image, ImageDraw, ImageFilter, ImageFont

root = Path(__file__).resolve().parents[2]
out_dir = root / 'artifacts/render' / sys.argv[1]
spec = json.loads(Path(sys.argv[2]).read_text(encoding='utf-8'))
ff = imageio_ffmpeg.get_ffmpeg_exe()
tmp = out_dir / '_thumb_frame.png'
subprocess.run([ff, '-y', '-v', 'error', '-ss', str(spec.get('frame_at', 1.0)), '-i', str(out_dir / 'final.mp4'), '-frames:v', '1', str(tmp)], check=True)
base = Image.open(tmp).convert('RGB').resize((1080, 1920))
tmp.unlink()
img = base.filter(ImageFilter.GaussianBlur(6))
shade = Image.new('RGBA', (1080, 1920), (0, 0, 0, 0))
d = ImageDraw.Draw(shade)
for y in range(1920):   # darker top band behind the text, lighter middle
    a = 150 if y < 1000 else int(150 - (y - 1000) * 0.12)
    d.line([(0, y), (1080, y)], fill=(0, 0, 0, max(40, a)))
img = Image.alpha_composite(img.convert('RGBA'), shade)
draw = ImageDraw.Draw(img)
F = 'C:/Windows/Fonts/seguibl.ttf'
y = 260
for i, line in enumerate(spec['lines']):
    size = 190 if i == spec.get('highlight') else 140
    font = ImageFont.truetype(F, size)
    while draw.textlength(line, font=font) > 1000:
        size -= 8
        font = ImageFont.truetype(F, size)
    w = draw.textlength(line, font=font)
    color = (255, 214, 10) if i == spec.get('highlight') else (255, 255, 255)
    draw.text(((1080 - w) / 2, y), line, font=font, fill=color, stroke_width=14, stroke_fill=(0, 0, 0))
    y += int(size * 1.12)
if spec.get('badge'):
    bf = ImageFont.truetype(F, 96)
    bw = draw.textlength(spec['badge'], font=bf)
    bx, by = (1080 - bw) / 2 - 36, y + 10
    draw.rounded_rectangle((bx, by, bx + bw + 72, by + 140), radius=28, fill=(220, 20, 28), outline=(0, 0, 0), width=8)
    draw.text((bx + 36, by + 8), spec['badge'], font=bf, fill=(255, 255, 255))
    y = by + 160
if spec.get('sticker'):
    st = Image.open(root / 'media' / spec['sticker']).convert('RGBA')
    size = spec.get('sticker_size', 560)
    k = size / max(st.width, st.height)   # scale up or down to the target size (Fluent emoji are small)
    st = st.resize((int(st.width * k), int(st.height * k)), Image.LANCZOS)
    if spec['sticker'].startswith('library/memes/'):   # meme photos get a white sticker border like in the videos
        border = Image.new('RGBA', (st.width + 28, st.height + 28), (255, 255, 255, 255))
        border.paste(st, (14, 14), st)
        st = border.rotate(-4, expand=True, resample=Image.BICUBIC)
    sy = max(y + 20, 1020)
    img.alpha_composite(st, ((1080 - st.width) // 2, min(sy, 1880 - st.height)))
path = out_dir / 'thumbnail.jpg'
img.convert('RGB').save(path, quality=90)
print(path.name, path.stat().st_size)

"""Rebuild Threads-style cards from text, for comments we can read but cannot capture.

Two cases need it: a reference compilation whose source post cannot be found, and Chrome failing to capture.
The cards copy the look of captured cards: 1080px wide, dark background, blurred avatar, handle, date, text and
stats. Mark them `rebuilt` in provenance; they are retyped from a public source, not screenshots.

Usage: rebuild-cards.py <spec.json>
spec = {"media": "release-16", "source": "...", "note": "...",
        "cards": [{"name": "c1-handle", "handle": "handle", "date": "11/1/26", "text": "...", "likes": "9,3K",
                   "replies": "49", "hide_handle": false}]}
"""
import hashlib
import json
import random
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

spec = json.loads(Path(sys.argv[1]).read_text(encoding='utf-8'))
out = Path(__file__).resolve().parents[2] / 'media' / spec['media'] / 'cards'
out.mkdir(parents=True, exist_ok=True)
F = 'C:/Windows/Fonts/'
bold, reg, sym = ImageFont.truetype(F + 'segoeuib.ttf', 40), ImageFont.truetype(F + 'segoeui.ttf', 46), ImageFont.truetype(F + 'seguisym.ttf', 40)
emoji = ImageFont.truetype(F + 'seguiemj.ttf', 40)
small = ImageFont.truetype(F + 'segoeui.ttf', 36)
BG, WHITE, GREY = (16, 16, 16), (243, 245, 247), (119, 119, 119)
X, W = 115, 1080 - 115 - 40


def wrap(draw, text, font, width):
    lines = []
    for para in text.split('\n'):
        cur = ''
        for word in para.split(' '):
            trial = (cur + ' ' + word).strip()
            if draw.textlength(trial, font=font) <= width:
                cur = trial
            else:
                lines.append(cur)
                cur = word
        lines.append(cur)
    return lines


prov = {'source': spec.get('source', ''), 'note': spec.get('note', ''), 'method': 'rebuilt from text (rebuild-cards.py)', 'cards': {}}
for c in spec['cards']:
    probe = ImageDraw.Draw(Image.new('RGB', (10, 10)))
    lines = wrap(probe, c['text'], reg, W)
    h = 150 + 62 * len(lines) + 90
    im = Image.new('RGB', (1080, h), BG)
    d = ImageDraw.Draw(im)
    rnd = random.Random(c['handle'])
    av = Image.new('RGB', (84, 84), tuple(rnd.randint(60, 200) for _ in range(3)))
    ImageDraw.Draw(av).ellipse((10, 30, 60, 90), fill=tuple(rnd.randint(40, 220) for _ in range(3)))
    av = av.filter(ImageFilter.GaussianBlur(9))
    mask = Image.new('L', (84, 84), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, 83, 83), fill=255)
    im.paste(av, (0, 45), mask)
    handle = c['handle']
    d.text((X, 62), handle, font=bold, fill=WHITE)
    hw = d.textlength(handle, font=bold)
    if c.get('hide_handle'):
        region = im.crop((X - 4, 58, int(X + hw + 4), 110)).filter(ImageFilter.GaussianBlur(9))
        im.paste(region, (X - 4, 58))
    d.text((X + hw + 18, 64), c.get('date', ''), font=small, fill=GREY)
    y = 140
    for ln in lines:
        d.text((X, y), ln, font=reg, fill=WHITE, embedded_color=True)
        y += 62
    y += 28
    d.text((X, y - 6), '\u2661', font=sym, fill=WHITE)
    d.text((X + 52, y), c.get('likes', ''), font=small, fill=WHITE)
    cx = X + 52 + d.textlength(c.get('likes', ''), font=small) + 70
    d.ellipse((cx, y + 4, cx + 36, y + 38), outline=WHITE, width=3)
    d.text((cx + 50, y), c.get('replies', ''), font=small, fill=WHITE)
    p = out / f"{c['name']}.png"
    im.save(p)
    prov['cards'][c['name']] = {'size': [1080, h], 'sha256': hashlib.sha256(p.read_bytes()).hexdigest(), 'text': c['text'], 'handle': handle}
    print(c['name'], 1080, 'x', h)
(out / 'provenance.json').write_text(json.dumps(prov, indent=1, ensure_ascii=False), encoding='utf-8')

"""Stitch 800x780 tiles from capture-card-tiled.js into 1080-wide card images.

Usage: stitch-tiles.py <tiles_dir> <out_dir>
Tiles are named <card>-x<X>-y<Y>.png (X, Y = overlay offset in px). Output is
<out_dir>/mcp-claude-in-chrome-blob-<card>.png, so an assemble-cards.py spec can use blob_dir=<out_dir> and
"slices": ["<card>"] with the usual height/top/mask fields. A missing tile is left as the card background colour.
"""
import re
import sys
from pathlib import Path

from PIL import Image

tiles, out = Path(sys.argv[1]), Path(sys.argv[2])
out.mkdir(parents=True, exist_ok=True)
cards = {}
for p in sorted(tiles.glob('*.png')):
    m = re.match(r'^(.*)-x(\d+)-y(\d+)\.png$', p.name)
    if m:
        cards.setdefault(m.group(1), []).append((int(m.group(2)), int(m.group(3)), p))
for card, parts in cards.items():
    ims = [(x, y, Image.open(p).convert('RGB')) for x, y, p in parts]
    h = max(y + im.height for x, y, im in ims)
    canvas = Image.new('RGB', (1080, h), (16, 16, 16))
    for x, y, im in sorted(ims, key=lambda t: (t[1], t[0])):
        canvas.paste(im, (x, y))
    dest = out / f'mcp-claude-in-chrome-blob-{card}.png'
    canvas.save(dest)
    print(card, 1080, 'x', h, f'({len(ims)} tiles)')

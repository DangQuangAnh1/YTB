"""Crop captured Threads cards to their content width so short comments display larger.

The right-side "..." menu and the author-liked badge sit only in the header row, so that zone is
ignored there and nowhere else. Long text lines keep their full width.

Usage: fit-cards.py <media_dir>   (reads <media_dir>/cards, writes <media_dir>/cards-fit + sizes.json)
"""
import json
import sys
from pathlib import Path
import numpy as np
from PIL import Image

HEADER_ROWS, ICON_ZONE, PAD, MIN_W = 110, 220, 60, 1000
media = Path(sys.argv[1])
out = media / 'cards-fit'
out.mkdir(exist_ok=True)
sizes = {}
for f in sorted((media / 'cards').glob('*.png')):
    im = Image.open(f).convert('RGB')
    a = np.asarray(im).astype(int)
    content = np.abs(a - a[-2, -60]).sum(axis=2) > 60
    content[:HEADER_ROWS, -ICON_ZONE:] = False
    right = min(a.shape[1], max(np.where(content.any(axis=0))[0].max() + PAD, MIN_W))
    im.crop((0, 0, right, a.shape[0])).save(out / f.name)
    sizes[f.stem] = [int(right), int(a.shape[0])]
(out / 'sizes.json').write_text(json.dumps(sizes, indent=1))
print(json.dumps(sizes))

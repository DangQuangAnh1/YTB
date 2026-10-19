"""Assemble captured Threads card slices into card PNGs for an episode.

The capture step (Chrome clone at 360px x zoom 3 = 1080px, avatars blurred, profanity blurred) saves 1080x845 slices.
This stitches tall slices, crops each card to the overlay height, removes the top separator line and masks the reply
connector lines that would otherwise dangle at the card edge. It then records provenance.

Usage: assemble-cards.py <spec.json>
spec = {"media": "release-04", "blob_dir": "...", "source": "https://...", "observed": "...",
        "cards": {"name": {"slices": ["blob-a", "blob-b"], "shift": 407, "height": 1252,
                           "top": 22, "mask": "comment" | "reply" | null}}}
`slices` + `shift`: the second slice was captured with the overlay moved up by `shift` px.
"""
import hashlib
import json
import sys
from pathlib import Path

import numpy as np
from PIL import Image

spec = json.loads(Path(sys.argv[1]).read_text(encoding='utf-8'))
blob_dir = Path(spec['blob_dir'])
out = Path(__file__).resolve().parents[2] / 'media' / spec['media'] / 'cards'
out.mkdir(parents=True, exist_ok=True)
BG = np.array([16, 16, 16], dtype=np.uint8)


def load(name):
    return np.asarray(Image.open(blob_dir / f'mcp-claude-in-chrome-blob-{name}.png').convert('RGB')).copy()


prov = {'sources': spec['sources'], 'captured': spec.get('captured', ''), 'observed': spec.get('observed', ''), 'cards': {}}
for name, c in spec['cards'].items():
    parts = [load(s) for s in c['slices']]
    shifts = c.get('shifts') or ([0, c['shift']] if 'shift' in c else [0])
    # Each slice i was captured with the overlay moved up by shifts[i]; keep its rows until the next slice starts.
    a = np.vstack([p[:(shifts[i + 1] - shifts[i]) if i + 1 < len(parts) else None] for i, p in enumerate(parts)])
    a = a[:c['height']].copy()
    a = a[:, :1080].copy()   # a scaled screenshot frame can return a few px of page bleed past the 1080px overlay
    if c.get('keep_rows'):   # drop the middle of a tall photo so a chain group is not scaled down to unreadable size
        a = np.vstack([a[y0:y1] for y0, y1 in c['keep_rows']]).copy()
    for x0, y0, x1, y1 in c.get('pixelate', []):   # people's faces or private names inside screenshots
        region = Image.fromarray(a[y0:y1, x0:x1])
        small = region.resize((max(1, (x1 - x0) // 28), max(1, (y1 - y0) // 28)), Image.BILINEAR)
        a[y0:y1, x0:x1] = np.asarray(small.resize(region.size, Image.NEAREST))
    if c.get('mask') == 'comment':        # thread line under the avatar
        a[165:, :110] = BG
    elif c.get('mask') == 'reply':        # reply curl + thread line under the indented avatar
        a[30:128, :112] = BG
        a[165:, 110:205] = BG
    a = a[c.get('top', 0):]
    p = out / f'{name}.png'
    Image.fromarray(a).save(p)
    prov['cards'][name] = [[int(a.shape[1]), int(a.shape[0])], hashlib.sha256(p.read_bytes()).hexdigest()]
    print(name, a.shape[1], 'x', a.shape[0])
(out / 'provenance.json').write_text(json.dumps(prov, indent=1, ensure_ascii=False), encoding='utf-8')

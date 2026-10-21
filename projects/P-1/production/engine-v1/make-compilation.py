"""Join finished Shorts into one long vertical (9:16) video for the channel's main feed.

Each story keeps its own mastered audio. The brand outro is cut from every story except the last. An intro card and short
chapter cards (logo, "Chuyện N", the story's hook) with a whoosh sit between stories. The joined draft is then mastered
to -14 LUFS (master-audio.py) and gets a phone copy and an MP3 like any release. chapters.txt holds YouTube chapter
timestamps for the description.

Usage: make-compilation.py [--landscape] [--no-chapter-cards] [--plain-chapters] <out_render_dir> "<intro title>" <render_dir>::"<chapter title>" ...
  --landscape         1920x1080 for long-form: the 9:16 video sits in the middle over a blurred, darkened copy of itself.
  --no-chapter-cards  skip the chapter cards between stories (topic videos already open with their own title card).
  --plain-chapters    chapter names are the given titles, without "Chuyện N:".
Format v2 stories have no brand outro; their closing narrator line (z1, "Muốn nghe phần…") is cut from every story but the last.
"""
import json
import subprocess
import sys
from pathlib import Path

import imageio_ffmpeg
from PIL import Image, ImageDraw, ImageFont

here = Path(__file__).resolve().parent
root = here.parents[1]
renders = root / 'artifacts' / 'render'
ff = imageio_ffmpeg.get_ffmpeg_exe()
brand = json.loads((here / 'brand.json').read_text(encoding='utf-8'))
flags = {a for a in sys.argv[1:] if a.startswith('--')}
args = [a for a in sys.argv[1:] if not a.startswith('--')]
out = renders / args[0]
out.mkdir(parents=True, exist_ok=True)
work = out / '_parts'
work.mkdir(exist_ok=True)
intro_title = args[1]
stories = [a.split('::', 1) for a in args[2:]]
FONT = str(root / 'media/library/fonts/TikTokSans.ttf')
AVATAR = root / 'artifacts/brand/avatar-doccmtgium-800.png'
WHOOSH = root / 'media/library/sfx/whoosh.mp3'
ACCENT = brand.get('accent', '#FFD43B')


def font(size, weight='Black'):
    f = ImageFont.truetype(FONT, size)
    try:
        f.set_variation_by_name(weight)
    except Exception:
        pass
    return f


def wrap(draw, text, f, width):
    words, lines, cur = text.split(), [], ''
    for w in words:
        trial = (cur + ' ' + w).strip()
        if draw.textlength(trial, font=f) <= width:
            cur = trial
        else:
            lines.append(cur)
            cur = w
    lines.append(cur)
    return lines


def card(path, kicker, title, sub):
    im = Image.new('RGB', (1080, 1920), (14, 14, 16))
    d = ImageDraw.Draw(im)
    av = Image.open(AVATAR).convert('RGBA').resize((300, 300))
    mask = Image.new('L', (300, 300), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, 300, 300), fill=255)
    im.paste(av, (390, 520), mask)
    y = 880
    if kicker:
        f = font(64)
        d.text((540, y), kicker, font=f, fill=ACCENT, anchor='mm')
        y += 110
    f = font(76)
    for ln in wrap(d, title, f, 900):
        d.text((540, y), ln, font=f, fill='white', anchor='mm')
        y += 96
    if sub:
        d.text((540, y + 40), sub, font=font(44, 'Bold'), fill=(170, 170, 170), anchor='mm')
    im.save(path)


def seg_from_card(png, seconds, dst):
    subprocess.run([ff, '-y', '-v', 'error', '-loop', '1', '-framerate', '30', '-t', str(seconds), '-i', str(png), '-i', str(WHOOSH),
                    '-filter_complex', f'[1:a]aresample=48000,apad,atrim=0:{seconds},volume=0.5,afade=t=out:st={seconds - 0.1}:d=0.1[a]', '-map', '0:v', '-map', '[a]',
                    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-r', '30', '-crf', '18', '-c:a', 'aac', '-ar', '48000', '-ac', '2', '-b:a', '256k',
                    '-shortest', str(dst)], check=True)


parts, chapters, t = [], [], 0.0
intro = work / 'intro.png'
card(intro, None, intro_title, brand['handle'])
seg_from_card(intro, 2.4, work / 'p00.mp4')
parts.append(work / 'p00.mp4')
t += 2.4
for i, (rdir, title) in enumerate(stories, 1):
    props = json.loads((renders / rdir / 'props.json').read_text(encoding='utf-8'))
    last = i == len(stories)
    chapters.append((0.0 if i == 1 else t, title if '--plain-chapters' in flags else f'Chuyện {i}: {title}'))   # YouTube chapters: first at 0:00, each >= 10s
    if i > 1 and '--no-chapter-cards' not in flags:
        png = work / f'ch{i:02d}.png'
        card(png, f'Chuyện {i}', title, None)
        seg_from_card(png, 1.3, work / f'c{i:02d}.mp4')
        parts.append(work / f'c{i:02d}.mp4')
        t += 1.3
    keep = props['duration'] - (0 if last or not props.get('brand') else props['brand']['outro_s'])
    z1 = next((l for l in props.get('lines', []) if l.get('id') == 'z1' and l.get('kind') == 'bridge'), None)
    if z1 and not last:
        keep = min(keep, z1['start'] - 0.05)
    dst = work / f's{i:02d}.mp4'
    # Short audio fades at every cut avoid clicks (a hard cut of mastered audio overshoots after AAC re-encode).
    fades = f'afade=t=in:d=0.04,afade=t=out:st={keep - 0.12:.3f}:d=0.12'
    subprocess.run([ff, '-y', '-v', 'error', '-i', str(renders / rdir / 'final.mp4'), '-t', f'{keep:.3f}', '-af', fades, '-c:v', 'libx264', '-crf', '18',
                    '-pix_fmt', 'yuv420p', '-r', '30', '-c:a', 'aac', '-ar', '48000', '-ac', '2', '-b:a', '256k', str(dst)], check=True)
    parts.append(dst)
    t += keep
lst = work / 'list.txt'
lst.write_text(''.join(f"file '{p.as_posix()}'\n" for p in parts), encoding='utf-8')
land = ['-vf', 'split[a][b];[a]scale=480:270:force_original_aspect_ratio=increase,crop=480:270,boxblur=12:2,eq=brightness=-0.18,'
        'scale=1920:1080[bg];[b]scale=-2:1080[fg];[bg][fg]overlay=(W-w)/2:0'] if '--landscape' in flags else []
subprocess.run([ff, '-y', '-v', 'error', '-f', 'concat', '-safe', '0', '-i', str(lst), *land, '-c:v', 'libx264', '-crf', '19', '-pix_fmt', 'yuv420p',
                '-r', '30', '-af', 'alimiter=limit=0.84:level=false', '-c:a', 'aac', '-ar', '48000', '-b:a', '256k', '-movflags', '+faststart', str(out / 'draft.mp4')], check=True)
stamp = lambda s: f'{int(s // 60)}:{int(s % 60):02d}'
lines = [f'{stamp(s)} {name}' for s, name in chapters]
(out / 'chapters.txt').write_text('\n'.join(lines) + '\n', encoding='utf-8')
(out / 'compilation.json').write_text(json.dumps({'intro': intro_title, 'flags': sorted(flags), 'stories': [{'render': r, 'title': n} for r, n in stories],
                                                  'duration_s': round(t, 2), 'chapters': lines}, ensure_ascii=False, indent=1), encoding='utf-8')
print(json.dumps({'out': str(out), 'duration_s': round(t, 2), 'chapters': lines}, ensure_ascii=False))

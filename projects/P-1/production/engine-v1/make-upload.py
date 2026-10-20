"""Make upload-hevc.mp4: an HEVC two-pass copy of final.mp4 under 10 MB, because Chrome file uploads are capped at 10 MB.

Usage (venv python, it has imageio_ffmpeg): make-upload.py <render_dir_name> [target_mb=9.4]
Writes artifacts/render/<render_dir>/upload-hevc.mp4 and prints duration, video kbps and size.
"""
import json
import os
import subprocess
import sys
from pathlib import Path

import imageio_ffmpeg

d = Path(__file__).resolve().parents[2] / 'artifacts/render' / sys.argv[1]
target = float(sys.argv[2]) if len(sys.argv) > 2 else 9.4
ff = imageio_ffmpeg.get_ffmpeg_exe()
dur = json.loads((d / 'props.json').read_text(encoding='utf-8'))['duration']
vk = int(target * 8 * 1024 * 1024 / dur / 1000) - 128   # leave room for 128k AAC
log = 'x265-stats'   # relative and run inside the render dir: a 'C:\...' path breaks -x265-params, whose separator is ':'
base = [ff, '-y', '-v', 'error', '-i', str(d / 'final.mp4'), '-c:v', 'libx265', '-preset', 'medium', '-b:v', f'{vk}k', '-tag:v', 'hvc1']
subprocess.run(base + ['-x265-params', f'pass=1:stats={log}.log:log-level=error', '-an', '-f', 'mp4', os.devnull], check=True, cwd=d)
out = d / 'upload-hevc.mp4'
subprocess.run(base + ['-x265-params', f'pass=2:stats={log}.log:log-level=error', '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', str(out)], check=True, cwd=d)
for f in d.glob(f'{log}.log*'):
    f.unlink()
size = out.stat().st_size
print(sys.argv[1], round(dur, 1), f'{vk}k', size, 'OK' if size < 10 * 1024 * 1024 else 'TOO BIG')

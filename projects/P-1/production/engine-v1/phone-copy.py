"""Make a 1080p phone copy under the Remote Control 30 MB limit.

The copy is a two-pass H.264 encode whose bitrate is computed from the duration, so resolution
stays at 1080x1920 instead of dropping to 720p.

Usage: phone-copy.py <render_dir_name> [target_mb=28]
"""
import json
import subprocess
import sys
from pathlib import Path

here = Path(__file__).resolve().parent
out = here.parents[1] / 'artifacts/render' / sys.argv[1]
target_mb = float(sys.argv[2]) if len(sys.argv) > 2 else 28
tools = here / 'node_modules/@remotion/compositor-win32-x64-msvc'
src = out / 'final.mp4' if (out / 'final.mp4').exists() else out / 'draft.mp4'
dst = out / 'phone-1080p.mp4'
dur = float(json.loads(subprocess.run([str(tools / 'ffprobe.exe'), '-v', 'error', '-show_format', '-of', 'json', str(src)],
                                      capture_output=True, text=True, check=True).stdout)['format']['duration'])
video_kbps = int(target_mb * 8 * 1024 / dur - 160)
common = [str(tools / 'ffmpeg.exe'), '-y', '-v', 'error', '-i', str(src), '-c:v', 'libx264', '-preset', 'medium', '-b:v', f'{video_kbps}k',
          '-maxrate', f'{int(video_kbps * 1.5)}k', '-bufsize', f'{video_kbps * 2}k', '-pix_fmt', 'yuv420p']
log = str(out / 'x264pass')
subprocess.run(common + ['-pass', '1', '-passlogfile', log, '-an', '-f', 'mp4', 'NUL'], check=True)
subprocess.run(common + ['-pass', '2', '-passlogfile', log, '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart', str(dst)], check=True)
for f in out.glob('x264pass*'):
    f.unlink()
print(json.dumps({'file': str(dst.relative_to(here.parents[1])), 'video_kbps': video_kbps, 'mb': round(dst.stat().st_size / 1048576, 1)}))

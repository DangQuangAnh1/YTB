"""Loudness-master a render for phones and platforms.

Two-pass EBU R128 loudnorm targets -14 LUFS integrated and -1.5 dBTP true peak, the level TikTok and
YouTube play at. The video stream is copied untouched.

The output is written as final.mp4 next to draft.mp4, so the registered draft is never overwritten.

Usage: master-audio.py <render_dir_name>
"""
import json
import re
import subprocess
import sys
from pathlib import Path
import imageio_ffmpeg

out = Path(__file__).resolve().parents[2] / 'artifacts/render' / sys.argv[1]
ff = imageio_ffmpeg.get_ffmpeg_exe()  # full ffmpeg build (has loudnorm)
src, dst = out / 'draft.mp4', out / 'final.mp4'
TARGET = 'I=-14:TP=-1.5:LRA=11'
probe = subprocess.run([ff, '-hide_banner', '-i', str(src), '-af', f'loudnorm={TARGET}:print_format=json', '-f', 'null', '-'],
                       capture_output=True, text=True).stderr
m = json.loads(re.findall(r'\{[^{}]*"input_i"[^{}]*\}', probe)[-1])
filt = (f"loudnorm={TARGET}:measured_I={m['input_i']}:measured_TP={m['input_tp']}:measured_LRA={m['input_lra']}"
        f":measured_thresh={m['input_thresh']}:offset={m['target_offset']}:linear=true,aresample=48000")
subprocess.run([ff, '-y', '-v', 'error', '-i', str(src), '-c:v', 'copy', '-af', filt, '-c:a', 'aac', '-b:a', '256k',
                '-movflags', '+faststart', str(dst)], check=True)
after = subprocess.run([ff, '-hide_banner', '-i', str(dst), '-af', f'loudnorm={TARGET}:print_format=json', '-f', 'null', '-'],
                       capture_output=True, text=True).stderr
a = json.loads(re.findall(r'\{[^{}]*"input_i"[^{}]*\}', after)[-1])
report = {'file': str(dst.relative_to(out.parents[2])), 'before_lufs': float(m['input_i']), 'after_lufs': float(a['input_i']),
          'after_true_peak_db': float(a['input_tp']), 'target': TARGET}
(out / 'loudness.json').write_text(json.dumps(report, indent=1))
print(json.dumps(report))

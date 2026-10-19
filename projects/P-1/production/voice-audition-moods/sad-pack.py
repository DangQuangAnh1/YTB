"""Build a labelled listening pack so the user can choose the sad-mood voice by ear.

Each voice reads the same line from prototype-07. The output is one MP4 in which each segment
shows the sample number and voice name on screen.
"""
from pathlib import Path
import json, subprocess, wave, hashlib
from PIL import Image, ImageDraw, ImageFont
from vieneu import Vieneu

root = Path(__file__).resolve().parents[2]
out = root / 'media/voice-audition-moods/sad-pack'
out.mkdir(parents=True, exist_ok=True)
ffmpeg = str(root / 'production/prototype-03/node_modules/@remotion/compositor-win32-x64-msvc/ffmpeg.exe')
font = str(root / 'media/library/fonts/TikTokSans.ttf')
LINE = 'Chớp mắt một cái thôi, cũng đã qua nửa đời người. Hà cớ gì phải phí thời giờ, giận hờn một điều gì đó xa xôi.'
VOICES = [('Quỳnh Anh', 'Nữ · Bắc · đọc truyện'), ('Ngọc Linh', 'Nữ · Bắc · kể chuyện'), ('Đoan Trang', 'Nữ · Bắc · tự nhiên'),
          ('Ngọc Huyền', 'Nữ · Bắc · tự nhiên'), ('Thục Đoan', 'Nữ · Nam · kể chuyện'), ('Kim Thanh', 'Nữ · Nam · đọc truyện'),
          ('Mỹ Duyên', 'Nữ · Nam · đọc truyện (bản đã dùng)'), ('Trúc Ly', 'Nữ · Bắc · tự nhiên'),
          ('Thanh Bình', 'Nam · Bắc · kể chuyện'), ('Thiền Tâm Đức', 'Nam · Bắc · kể chuyện'),
          ('Thái Sơn', 'Nam · Nam · kể chuyện'), ('Đức Trí', 'Nam · Nam · đọc truyện')]
tts = Vieneu(mode='v3turbo', backend='onnx', device='cpu', precision='fp32', threads=4)
segments, records = [], []
for i, (voice, desc) in enumerate(VOICES, 1):
    wav = out / f'{i:02d}.wav'
    if not wav.exists():
        tts.save(tts.infer(LINE, voice=voice, temperature=0.7, max_new_frames=900), str(wav))
    with wave.open(str(wav)) as w:
        dur = w.getnframes() / w.getframerate()
    card = Image.new('RGB', (1080, 1920), '#111')
    d = ImageDraw.Draw(card)
    d.text((540, 760), f'Số {i}', font=ImageFont.truetype(font, 150), fill='#facc15', anchor='mm')
    d.text((540, 960), voice, font=ImageFont.truetype(font, 110), fill='white', anchor='mm')
    d.text((540, 1110), desc, font=ImageFont.truetype(font, 48), fill='#9ca3af', anchor='mm')
    png = out / f'{i:02d}.png'
    card.save(png)
    seg = out / f'seg{i:02d}.mp4'
    subprocess.run([ffmpeg, '-y', '-v', 'error', '-loop', '1', '-i', str(png), '-i', str(wav),
                    '-filter_complex', '[1:a]adelay=700|700,apad=pad_dur=0.9,aresample=48000[a]', '-map', '0:v', '-map', '[a]',
                    '-t', f'{dur + 1.6:.2f}', '-r', '30', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-c:a', 'aac', str(seg)], check=True)
    segments.append(seg)
    records.append({'n': i, 'voice': voice, 'desc': desc, 'duration': round(dur, 2), 'sha256': hashlib.sha256(wav.read_bytes()).hexdigest()})
lst = out / 'list.txt'
lst.write_text(''.join(f"file '{s.name}'\n" for s in segments), encoding='utf-8')
final = root / 'artifacts/render/voice-audition-sad-v1.mp4'
subprocess.run([ffmpeg, '-y', '-v', 'error', '-f', 'concat', '-safe', '0', '-i', str(lst), '-c', 'copy', str(final)], check=True, cwd=out)
(out / 'manifest.json').write_text(json.dumps({'line': LINE, 'temperature': 0.7, 'records': records, 'output': str(final.relative_to(root)),
    'human_listening': 'pending user choice'}, ensure_ascii=False, indent=1), encoding='utf-8')
print(json.dumps(records, ensure_ascii=False))

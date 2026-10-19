from pathlib import Path
import hashlib, json, subprocess, sys
import numpy as np
import imageio_ffmpeg
from PIL import Image, ImageDraw

project = Path(__file__).resolve().parents[2]
adapter = Path(__file__).resolve().parent
tools = adapter/'node_modules/@remotion/compositor-win32-x64-msvc'
ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
out = project/'artifacts/render'/ (sys.argv[1] if len(sys.argv)>1 else 'prototype-06-v3')
video = out/'draft.mp4'
probe = subprocess.run([str(tools/'ffprobe.exe'),'-v','error','-show_streams','-show_format','-of','json',str(video)],capture_output=True,text=True,check=True)
info = json.loads(probe.stdout)
decode = subprocess.run([ffmpeg,'-v','error','-i',str(video),'-f','null','-'],capture_output=True,text=True)
pcm = subprocess.run([ffmpeg,'-v','error','-i',str(video),'-vn','-ac','1','-ar','48000','-f','f32le','-'],capture_output=True,check=True)
audio = np.frombuffer(pcm.stdout,dtype='<f4')
frames = []
for num in ([int(x) for x in sys.argv[3].split(',')] if len(sys.argv)>3 else [20,150,260,330,420,560,700,800,900,1000,1150,1300]):
    dest = out/f'frame-{num}.png'
    subprocess.run([ffmpeg,'-y','-v','error','-i',str(video),'-vf',f'select=eq(n\\,{num})','-frames:v','1',str(dest)],check=True)
    im = Image.open(dest).convert('RGB'); im.thumbnail((270,480));frames.append((num,im))
sheet = Image.new('RGB',(270*4,520*((len(frames)+3)//4)),'#303030'); draw=ImageDraw.Draw(sheet)
for j,(num,im) in enumerate(frames):
    x=(j%4)*270; y=(j//4)*520
    sheet.paste(im,(x,y+40));draw.text((x+10,y+8),f'{num/30:.2f}s',fill='white')
sheet.save(out/'contact-sheet.png')
meta={'probe':info,'full_decode_exit':decode.returncode,'decode_error':decode.stderr,
      'audio_peak':float(abs(audio).max()),'audio_rms':float(np.sqrt(np.mean(audio*audio))),
      'sha256':hashlib.sha256(video.read_bytes()).hexdigest(),
      'frames_sampled':[n for n,_ in frames],'listening_review':'unverified'}
(out/'technical-qa.json').write_text(json.dumps(meta,indent=2),encoding='utf-8')
assert decode.returncode == 0
assert abs(float(info['format']['duration'])-float(sys.argv[2] if len(sys.argv)>2 else 46.0))<.2
vs = next(s for s in info['streams'] if s['codec_type']=='video')
assert (vs['width'],vs['height']) == (1080,1920)
assert any(s['codec_type']=='audio' for s in info['streams'])
print(json.dumps({k:v for k,v in meta.items() if k!='probe'},indent=2))

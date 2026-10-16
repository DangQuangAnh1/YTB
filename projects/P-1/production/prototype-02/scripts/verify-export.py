from pathlib import Path
import av,json,hashlib,subprocess
import numpy as np
from PIL import Image,ImageDraw
import imageio_ffmpeg
p=Path(__file__).resolve().parents[3]; out=p/'artifacts/render/prototype-02-v1'; v=out/'draft.mp4'
c=av.open(str(v)); vs=c.streams.video[0]; meta=dict(width=vs.width,height=vs.height,fps=float(vs.average_rate),duration=float(c.duration/av.time_base),codec=vs.codec_context.name)
frames=[]; targets=[30,200,240,315,359,360,390,450,539]
for i,fr in enumerate(c.decode(video=0)):
 if i in targets:
  im=fr.to_image(); im.save(out/f'frame-{i}.png'); im.thumbnail((270,480));frames.append((i,im))
meta['decoded_frames']=i+1;c.close()
strip=Image.new('RGB',(270*len(frames),520),'#303030');d=ImageDraw.Draw(strip)
for j,(num,im) in enumerate(frames):strip.paste(im,(270*j,40));d.text((270*j+10,8),f'{num/30:.2f}s',fill='white')
strip.save(out/'contact-sheet.png')
c=av.open(str(v));a=np.concatenate([fr.to_ndarray().astype(float).flatten() for fr in c.decode(audio=0)]); c.close()
meta['audio_peak']=float(abs(a).max()); meta['audio_rms']=float(np.sqrt(np.mean(a*a)));meta['audio_codec']='aac'
r=subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(),'-v','error','-i',str(v),'-f','null','-'],capture_output=True,text=True)
meta['ffmpeg_full_decode_exit']=r.returncode;meta['ffmpeg_error']=r.stderr
meta['sha256']=hashlib.sha256(v.read_bytes()).hexdigest()
(out/'technical-qa.json').write_text(json.dumps(meta,indent=2));print(json.dumps(meta,indent=2))

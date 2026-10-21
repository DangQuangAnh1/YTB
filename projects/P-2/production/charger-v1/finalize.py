from pathlib import Path
import subprocess,json,hashlib,wave
import numpy as np
import imageio_ffmpeg
from PIL import Image,ImageDraw

root=Path(__file__).resolve().parents[4]
p=root/'projects/P-2';out=p/'artifacts/render/charger-v1'
ff=imageio_ffmpeg.get_ffmpeg_exe()
probe=root/'projects/P-1/production/engine-v1/node_modules/@remotion/compositor-win32-x64-msvc/ffprobe.exe'
audio=p/'artifacts/audio/charger-sfx-v1.wav'
def run(args):return subprocess.run([ff,'-nostdin','-v','error',*map(str,args)],capture_output=True,check=True)
if (out/'draft.mp4').exists():raise RuntimeError('Refusing to overwrite existing draft')
run(['-i',out/'visual-silent.mp4','-i',audio,'-map','0:v:0','-map','1:a:0','-c:v','copy','-c:a','aac','-b:a','192k','-movflags','+faststart',out/'draft.mp4'])
run(['-i',out/'draft.mp4','-f','null','-'])
j=json.loads(subprocess.run([str(probe),'-v','error','-count_frames','-show_streams','-show_format','-of','json',str(out/'draft.mp4')],capture_output=True,text=True,check=True).stdout)
v=next(s for s in j['streams'] if s['codec_type']=='video')
assert (v['width'],v['height'],v['r_frame_rate'],int(v['nb_read_frames']))==(1080,1920,'30/1',570)
raw=run(['-i',out/'draft.mp4','-map','0:a:0','-f','f32le','-acodec','pcm_f32le','-']).stdout
samples=np.frombuffer(raw,dtype=np.float32)
assert float(np.max(np.abs(samples)))>0.01
sheet=Image.new('RGB',(810,1530),'#ffffff');draw=ImageDraw.Draw(sheet)
for n,f in enumerate([30,105,195,270,315,375,435,510,569]):
 dest=out/f'encoded-{f}.png'
 run(['-i',out/'draft.mp4','-vf',rf'select=eq(n\,{f}),scale=540:960','-frames:v','1',dest])
 sheet.paste(Image.open(dest).resize((270,480)),((n%3)*270,(n//3)*510+30))
 draw.text(((n%3)*270+10,(n//3)*510+8),f'{f/30:.2f}s',fill='#203c47')
sheet.save(out/'contact-sheet.jpg',quality=92)
sha=lambda f:hashlib.sha256(Path(f).read_bytes()).hexdigest()
manifest={'adapter':'p2-charger-svg-v1','video':'artifacts/render/charger-v1/draft.mp4','sha256':sha(out/'draft.mp4'),'width':1080,'height':1920,'fps':30,'frames':570,'duration_seconds':float(j['format']['duration']),'full_decode_exit':0,'audio':{'original_procedural_sfx':True,'source_sha256':sha(audio),'decoded_peak':float(np.max(np.abs(samples))),'decoded_rms':float(np.sqrt(np.mean(samples**2)))},'render':json.loads((out/'render-timing.json').read_text()),'source_sha256':sha(Path(__file__).parent/'Video.tsx'),'cast_sha256':sha(p/'production/characters-v3/cast.cjs'),'limitations':['No speech or word-level lip sync','Creative appeal awaits user reaction','Audio decode checked; no continuous listening claimed']}
(out/'manifest.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
print(json.dumps(manifest,indent=2))

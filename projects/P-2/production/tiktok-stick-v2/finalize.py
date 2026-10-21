import subprocess,hashlib,json,time
from pathlib import Path
import imageio_ffmpeg
from PIL import Image,ImageDraw
root=Path(__file__).resolve().parents[4]
p=root/'projects/P-2';out=p/'artifacts/render/tiktok-stick-v2';ff=imageio_ffmpeg.get_ffmpeg_exe()
audio=p/'artifacts/audio/reference-tiktok-7665223745438485768-original-v1.m4a'
def run(args):return subprocess.run([ff,'-v','error',*map(str,args)],capture_output=True,check=True)
run(['-y','-i',out/'visual-silent.mp4','-i',audio,'-map','0:v:0','-map','1:a:0','-c','copy','-movflags','+faststart',out/'draft.mp4'])
run(['-i',out/'draft.mp4','-f','null','-'])
def sha(f):return hashlib.sha256(Path(f).read_bytes()).hexdigest()
def pcm(f):return hashlib.sha256(run(['-i',f,'-map','0:a:0','-f','s16le','-acodec','pcm_s16le','-']).stdout).hexdigest()
frames=[15,90,180,225,285,315,360,453];sheet=Image.new('RGB',(1080,1040),'white');d=ImageDraw.Draw(sheet)
for i,f in enumerate(frames):
 sheet.paste(Image.open(out/f'frame-{f}.png').resize((270,480)),((i%4)*270,(i//4)*520+40));d.text(((i%4)*270+12,(i//4)*520+12),f'{f/30:.2f}s',fill='black')
sheet.save(out/'contact-sheet.jpg',quality=92)
integrity={'audio_original_sha256':sha(audio),'original_pcm_sha256':pcm(audio),'draft_pcm_sha256':pcm(out/'draft.mp4')}
integrity['pcm_equal']=integrity['original_pcm_sha256']==integrity['draft_pcm_sha256']
manifest={'adapter':'p2-tiktok-stick-svg-v2','video':'artifacts/render/tiktok-stick-v2/draft.mp4','video_sha256':sha(out/'draft.mp4'),'width':1080,'height':1920,'fps':30,'frames':454,'video_seconds':454/30,'audio_seconds':15.116009,'render_timing':json.loads((out/'render-timing.json').read_text()),'full_decode_exit':0,'source_sha256':sha(Path(__file__).parent/'Video.tsx'),'cast_sha256':sha(p/'production/characters-v3/cast.cjs'),'audio_integrity':integrity,'review_fix':'A final lying body moved70 output pixels lower with smooth interpolation to separate from B soles.','limitations':['No verified word-level transcript or lip synchronization','Audio human continuous listening not performed by this adapter','8 still samples inspected; full decode checks stream integrity only']}
(out/'manifest.json').write_text(json.dumps(manifest,indent=2),encoding='utf8');print(json.dumps(manifest,indent=2))

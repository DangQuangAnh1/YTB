from pathlib import Path
import subprocess,json,hashlib
from PIL import Image,ImageDraw
src=Path(__file__).resolve().parent;root=src.parents[3];out=src.parents[1]/'artifacts/render/final-counter-v1'
ff=str(Path.home()/'.cache/creator-agency/p1-runtime-bundled/lib/python3.12/site-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v7.0.2')
probe=str(root/'third_party/video/runtime/p2-remotion/node_modules/@remotion/compositor-linux-x64-gnu/ffprobe')
def run(a):return subprocess.run(a,check=True,capture_output=True)
run([ff,'-y','-v','error','-i',str(out/'visual-silent.mp4'),'-i',str(out/'original-audio.wav'),'-map','0:v:0','-map','1:a:0','-c:v','copy','-c:a','aac','-b:a','192k','-shortest','-movflags','+faststart',str(out/'final-counter.mp4')])
p=json.loads(run([probe,'-v','error','-count_frames','-show_streams','-show_format','-of','json',str(out/'final-counter.mp4')]).stdout)
dec=subprocess.run([ff,'-v','error','-i',str(out/'final-counter.mp4'),'-f','null','-'],capture_output=True)
v=[s for s in p['streams'] if s['codec_type']=='video'][0];a=[s for s in p['streams'] if s['codec_type']=='audio'][0]
assert int(v['nb_read_frames'])==900 and abs(float(p['format']['duration'])-15)<.05 and dec.returncode==0 and not dec.stderr
frames=[0,60,135,205,300,480,567,590,650,700,800,899]
fd=out/'frames';fd.mkdir(exist_ok=True);expr='+'.join(f'eq(n,{f})' for f in frames)
run([ff,'-y','-v','error','-i',str(out/'final-counter.mp4'),'-vf',f"select='{expr}'",'-fps_mode','vfr',str(fd/'s-%02d.png')])
cw,ch=270,480;sheet=Image.new('RGB',(6*cw,2*(ch+14)),'#111');d=ImageDraw.Draw(sheet)
for i,(f,file) in enumerate(zip(frames,sorted(fd.glob('s-*.png')))):
 im=Image.open(file).convert('RGB');im.thumbnail((cw,ch));x=i%6*cw;y=i//6*(ch+14);sheet.paste(im,(x,y));d.text((x+4,y+ch),f'frame {f} ({f/60:.2f}s)',fill='#ddd')
sheet.save(out/'contact-sheet.jpg',quality=90)
seq=list(range(0,900,20));ex='+'.join(f'eq(n,{f})' for f in seq);sd=out/'sequence';sd.mkdir(exist_ok=True)
run([ff,'-y','-v','error','-i',str(out/'final-counter.mp4'),'-vf',f"select='{ex}'",'-fps_mode','vfr',str(sd/'q-%02d.png')])
cols=9;tw,th=160,284;rows=(len(seq)+cols-1)//cols;sq=Image.new('RGB',(cols*tw,rows*(th+14)),'#111');d2=ImageDraw.Draw(sq)
for i,(f,file) in enumerate(zip(seq,sorted(sd.glob('q-*.png')))):
 im=Image.open(file).convert('RGB');im.thumbnail((tw,th));x=i%cols*tw;y=i//cols*(th+14);sq.paste(im,(x,y));d2.text((x+3,y+th),f'f{f} {f/60:.1f}s',fill='#ddd')
sq.save(out/'sequence-sheet.jpg',quality=88)
report={'width':v['width'],'height':v['height'],'frames':int(v['nb_read_frames']),'fps':v['avg_frame_rate'],'duration':p['format']['duration'],'video_codec':v['codec_name'],'audio_codec':a['codec_name'],'audio_sample_rate':a['sample_rate'],'audio':'original procedural SFX and music; levels checked numerically only','fullDecodePassed':True,'encodedFramesSampled':frames,'review':'self-review; user acceptance pending'}
(out/'technical-qa.json').write_text(json.dumps(report,indent=2))
files=[q for q in src.rglob('*') if q.is_file() and 'node_modules' not in q.parts and '.cache' not in q.parts]+[out/n for n in ('final-counter.mp4','original-audio.wav','audio-provenance.json','technical-qa.json','contact-sheet.jpg','sequence-sheet.jpg')]
(out/'manifest.json').write_text(json.dumps({'project':'P-2','scope':'15s 9:16 60fps stickman fight short The Final Counter','upstream':{'perfect-freehand':'176e00f2399f4969e1b0965c5921d96a3e50ce9f; MIT; original getStroke bundled locally','motion':'CMU Graphics Lab Motion Capture Database trials 09_01, 144_20, 144_14, 76_03, 135_07, 13_11, 02_01 via una-dinosauria/cmu-mocap BVH mirror; projection by original soft-line-motion-v2/mocap2d.cjs','renderer':'Remotion4.0.536','audio':'original procedural numpy synthesis, no external samples'},'referenceFootageUsed':False,'files':{str(q.relative_to(root)):hashlib.sha256(q.read_bytes()).hexdigest() for q in files}},indent=2))
print(json.dumps(report,indent=2))

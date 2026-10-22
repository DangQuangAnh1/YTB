from pathlib import Path
import subprocess,json,hashlib
from PIL import Image,ImageDraw
src=Path(__file__).resolve().parent;root=src.parents[3];out=src.parents[1]/'artifacts/render/soft-line-motion-v2'
ff=str(Path.home()/'.cache/creator-agency/p1-runtime-bundled/lib/python3.12/site-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v7.0.2')
probe=str(root/'third_party/video/runtime/p2-remotion/node_modules/@remotion/compositor-linux-x64-gnu/ffprobe')
def run(a):return subprocess.run(a,check=True,capture_output=True)
run([ff,'-y','-v','error','-i',str(out/'visual-silent.mp4'),'-c','copy','-movflags','+faststart',str(out/'draft.mp4')])
p=json.loads(run([probe,'-v','error','-count_frames','-show_streams','-show_format','-of','json',str(out/'draft.mp4')]).stdout)
run([ff,'-v','error','-i',str(out/'draft.mp4'),'-f','null','-'])
frames=[0,10,15,30,42,59,69,75,89];folder=out/'frames';folder.mkdir(exist_ok=True)
expr='+'.join(f'eq(n,{f})' for f in frames)
run([ff,'-y','-v','error','-i',str(out/'draft.mp4'),'-vf',f"select='{expr}'",'-fps_mode','vfr',str(folder/'sample-%02d.png')])
sheet=Image.new('RGB',(1152,714),'#e7e7e1');draw=ImageDraw.Draw(sheet)
for i,(f,file) in enumerate(zip(frames,sorted(folder.glob('sample-*.png')))):
 im=Image.open(file).convert('RGB');im.thumbnail((384,216));x=i%3*384;y=i//3*238;sheet.paste(im,(x,y));draw.text((x+8,y+220),f'{f/30:.2f}s / frame {f}',fill='#333333')
sheet.save(out/'contact-sheet.jpg',quality=92)
seq=sorted(range(0,90,2));ex='+'.join(f'eq(n,{f})' for f in seq);sd=out/'sequence';sd.mkdir(exist_ok=True)
run([ff,'-y','-v','error','-i',str(out/'draft.mp4'),'-vf',f"select='{ex}'",'-fps_mode','vfr',str(sd/'s-%02d.png')])
cols=8;tw,th=240,135;rows=(len(seq)+cols-1)//cols;sq=Image.new('RGB',(cols*tw,rows*(th+14)),'#e7e7e1');d2=ImageDraw.Draw(sq)
for i,(f,file) in enumerate(zip(seq,sorted(sd.glob('s-*.png')))):
 im=Image.open(file).convert('RGB');im.thumbnail((tw,th));x=i%cols*tw;y=i//cols*(th+14);sq.paste(im,(x,y));d2.text((x+4,y+th),f'f{f}',fill='#333')
sq.save(out/'sequence-sheet.jpg',quality=90)
v=p['streams'][0];assert int(v['nb_read_frames'])==90;assert abs(float(v['duration'])-3)<.01
report={'width':v['width'],'height':v['height'],'frames':int(v['nb_read_frames']),'fps':v['avg_frame_rate'],'duration':v['duration'],'audio':'intentionally silent','fullDecodePassed':True,'encodedFramesSampled':frames,'review':'self-review; user acceptance pending'}
(out/'technical-qa.json').write_text(json.dumps(report,indent=2))
files=[p for p in src.rglob('*') if p.is_file() and 'node_modules' not in p.parts and '.cache' not in p.parts]+[out/'draft.mp4',out/'curve-validation.json',out/'technical-qa.json',out/'contact-sheet.jpg',out/'sequence-sheet.jpg']
(out/'manifest.json').write_text(json.dumps({'project':'P-2','scope':'3s CMU mocap retarget curve proof','upstream':{'perfect-freehand':'176e00f2399f4969e1b0965c5921d96a3e50ce9f; MIT; original getStroke bundled locally','motion':'CMU Graphics Lab Motion Capture Database trials 144_20 and 144_26 via una-dinosauria/cmu-mocap BVH mirror; side-view projection by original mocap2d.cjs','baseline_run':'OpenMontage c8066452325cb57c8fc1ba8c2a71b6e8842e6b65 ink-theater/mocap/bvh2clip.mjs executed unmodified (AGPL-3.0, not copied into Git)','renderer':'Remotion4.0.536'},'referenceFootageUsed':False,'files':{str(p.relative_to(root)):hashlib.sha256(p.read_bytes()).hexdigest() for p in files}},indent=2))
print(json.dumps(report,indent=2))

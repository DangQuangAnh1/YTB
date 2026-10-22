"""Mux original Foley, inspect exact encoded output, create durable QA/manifest."""
from pathlib import Path
import subprocess,json,hashlib,sys
import numpy as np
from PIL import Image,ImageDraw
src=Path(__file__).resolve().parent;root=src.parents[3]
out=src.parents[1]/'artifacts/render/black-red-duel-v1'
deps=root/'third_party/video/runtime/p2-remotion/node_modules/@remotion/compositor-linux-x64-gnu'
full_ffmpeg=Path.home()/'.cache/creator-agency/p1-runtime-bundled/lib/python3.12/site-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v7.0.2'
ffmpeg=str(full_ffmpeg if full_ffmpeg.exists() else deps/'ffmpeg');ffprobe=str(deps/'ffprobe')
def run(args,**kw):return subprocess.run(args,check=True,capture_output=True,**kw)
run([ffmpeg,'-y','-v','error','-i',str(out/'visual-silent.mp4'),'-i',str(out/'original-sfx.wav'),'-map','0:v:0','-map','1:a:0','-c:v','copy','-c:a','aac','-b:a','192k','-t','15','-movflags','+faststart',str(out/'draft.mp4')])
probe=json.loads(run([ffprobe,'-v','error','-count_frames','-show_streams','-show_format','-of','json',str(out/'draft.mp4')]).stdout)
decode=run([ffmpeg,'-v','error','-i',str(out/'draft.mp4'),'-f','null','-'])
pcm=np.frombuffer(run([ffmpeg,'-v','error','-i',str(out/'draft.mp4'),'-map','0:a:0','-f','f32le','-ac','1','-ar','48000','-']).stdout,dtype='<f4')
frames=[0,38,66,74,91,105,120,133,148,168,192,220,244,263,286,320,351,380,415,449]
qa=out/'encoded-frames';qa.mkdir(exist_ok=True)
expr='+'.join(f'eq(n,{f})' for f in frames)
run([ffmpeg,'-y','-v','error','-i',str(out/'draft.mp4'),'-vf',f"select='{expr}'",'-fps_mode','vfr',str(qa/'sample-%02d.png')])
sheet=Image.new('RGB',(1280,5*262),'#deddd5');draw=ImageDraw.Draw(sheet)
for i,(f,p) in enumerate(zip(frames,sorted(qa.glob('sample-*.png')))):
 im=Image.open(p).convert('RGB');im.thumbnail((320,180));x=(i%4)*320;y=(i//4)*262
 # Extra vertical room gives frame labels ample separation.
 sheet.paste(im,(x,y+20));draw.text((x+10,y+210),f'frame {f} / {f/30:.2f}s',fill='#222222')
sheet.save(out/'contact-sheet.jpg',quality=92)
v=next(s for s in probe['streams'] if s['codec_type']=='video')
a=next(s for s in probe['streams'] if s['codec_type']=='audio')
report={'video':{'width':v['width'],'height':v['height'],'fps':v['avg_frame_rate'],'frames':int(v['nb_read_frames']),'duration':float(v['duration']),'codec':v['codec_name']},'audio':{'codec':a['codec_name'],'sample_rate':a['sample_rate'],'decoded_samples':len(pcm),'finite':bool(np.isfinite(pcm).all()),'peak':float(np.max(np.abs(pcm))),'rms':float(np.sqrt(np.mean(pcm**2)))},'full_decode_exit':decode.returncode,'decode_stderr':decode.stderr.decode(),'actual_encoded_frames_inspected':frames,'review_mode':'self_review','continuous_human_listening':'unverified','creative_user_acceptance':'pending'}
assert report['video']['frames']==450 and abs(report['video']['duration']-15)<.01
assert report['audio']['finite'] and report['audio']['rms']>.0001 and report['audio']['peak']<1
(out/'technical-qa.json').write_text(json.dumps(report,indent=2))
files={str(p.relative_to(root)):hashlib.sha256(p.read_bytes()).hexdigest() for p in [*src.glob('*.cjs'),src/'Video.tsx',src/'audio.py',src/'THIRD_PARTY_LICENSE.txt',out/'draft.mp4',out/'original-sfx.wav',out/'rig-validation.json',out/'technical-qa.json',out/'contact-sheet.jpg']}
manifest={'project':'P-2','title':'Black × Red — friendly sparring','frames':450,'fps':30,'resolution':[1280,720],'duration_seconds':15,'provenance':{'upstream_math':'https://github.com/cafermutluozkan/stick-motion/tree/6315c09c4e5051267806988defa28279b965fe29','reuse':'solveLegIK and chain2 executed for all limbs; authored combat poses/scene/timing; gait retained but unused','renderer':'Remotion 4.0.536 Linux Chrome; adapted prior P-2 render script','audio':'original synthesized Foley, no external samples','reference_footage_used':False},'files':files,'limits':['sampled encoded-frame self-review does not establish continuous-playback motion quality','continuous human listening unverified','user creative acceptance pending']}
(out/'manifest.json').write_text(json.dumps(manifest,indent=2))
print(json.dumps(report,indent=2))

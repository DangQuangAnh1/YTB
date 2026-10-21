import hashlib,json,subprocess
from pathlib import Path
from PIL import Image,ImageDraw
import imageio_ffmpeg
root=Path(__file__).resolve().parents[4];project=root/'projects/P-2';out=project/'artifacts/render/action-v1';src=Path(__file__).parent;ff=imageio_ffmpeg.get_ffmpeg_exe()
def run(args):return subprocess.run([ff,'-v','error',*map(str,args)],capture_output=True,check=True)
def sha(f):return hashlib.sha256(Path(f).read_bytes()).hexdigest()
run(['-y','-i',out/'visual-silent.mp4','-i',out/'original-sfx.wav','-map','0:v:0','-map','1:a:0','-c:v','copy','-c:a','aac','-b:a','160k','-movflags','+faststart',out/'draft.mp4'])
run(['-i',out/'draft.mp4','-f','null','-'])
md5=run(['-i',out/'draft.mp4','-map','0:v:0','-f','framemd5','-']).stdout.decode();lines=[x for x in md5.splitlines() if x and not x.startswith('#')];hashes=[x.split(',')[-1].strip() for x in lines]
(out/'decoded-frame-hashes.txt').write_text(md5,encoding='utf8')
frames=[0,80,96,154,215,348,483,545,585,675,719];cols=4;rows=3;sheet=Image.new('RGB',(1080,1560),'white');draw=ImageDraw.Draw(sheet)
for i,f in enumerate(frames):
 # Derive review pictures from the encoded final, not stale development stills.
 run(['-y','-i',out/'draft.mp4','-vf',f'select=eq(n\\,{f}),scale=540:960','-frames:v','1',out/f'frame-{f}.png'])
 sheet.paste(Image.open(out/f'frame-{f}.png').resize((270,480)),((i%cols)*270,(i//cols)*520+40));draw.text(((i%cols)*270+12,(i//cols)*520+12),f'{f/30:.2f}s',fill='black')
sheet.save(out/'contact-sheet.jpg',quality=92)
sources={str(f.relative_to(project)).replace('\\','/'):sha(f) for f in src.iterdir() if f.is_file()}
sources['production/characters-v3/cast.cjs']=sha(project/'production/characters-v3/cast.cjs')
manifest={'adapter':'p2-action-two-bone-ik-remotion-v1','video':'artifacts/render/action-v1/draft.mp4','video_sha256':sha(out/'draft.mp4'),'width':1080,'height':1920,'fps':30,'frames':len(lines),'durationSeconds':24,'uniqueDecodedFrames':len(set(hashes)),'fullDecodeExit':0,'renderTiming':json.loads((out/'render-timing.json').read_text()),'sourceHashes':sources,'audio':{'provenance':'original procedural sound effects; no external samples or dialogue','sourceSha256':sha(out/'original-sfx.wav'),'mux':'video stream copy; originalWAV encoded AAC160kbps','externalVoiceMusic':False},'rigValidation':json.loads((out/'rig-physics-validation.json').read_text()),'actuallyUsed':['Remotion4.0.536 export','Original analytic2boneIK','Matter.js0.20 deterministic loosecone simulation','Approved duo-v3 vector geometry'],'notUsedForVideo':['Motion Canvas','Fullik','OpenToonz','stick-motion code'],'limitations':['Stylized keyed character dynamics; Matter only loosecone, not physics-solved combat','No expert martial-arts validation','Audio continuous human listening must be checked separately','Review frames are selected samples; full decode is technical integrity, not proof of choreography quality']}
(out/'manifest.json').write_text(json.dumps(manifest,indent=2),encoding='utf8');print(json.dumps({k:v for k,v in manifest.items() if k not in ['sourceHashes','rigValidation']},indent=2))

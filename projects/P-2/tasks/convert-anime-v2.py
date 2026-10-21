"""Reproducible EbSynth CPU adapter. Does not generate AI keyframes.
Example: --input input.mp4 --style anime.png --reference-frame 50 --output-dir new-dir
Use --sample-frames 0,50,99 first. Every result needs visual review.
"""
import argparse,hashlib,json,subprocess,time
from pathlib import Path
import cv2,numpy as np,imageio_ffmpeg
ACTIVE_OUTPUT=None

def digest(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()
def main():
 global ACTIVE_OUTPUT
 p=argparse.ArgumentParser()
 p.add_argument('--input',required=True)
 p.add_argument('--style')
 p.add_argument('--reference-frame',type=int)
 p.add_argument('--keyframes',help='JSON list of {frame, style}; paths relative to kit root')
 p.add_argument('--output-dir',required=True)
 p.add_argument('--backend',default='projects/P-2/media/tools/ebsynth/serial-build/ebsynth.exe')
 p.add_argument('--width',type=int,default=320)
 p.add_argument('--sample-frames',default='')
 p.add_argument('--stride',type=int,default=1)
 p.add_argument('--position-weight',type=float,default=0.5)
 p.add_argument('--guide-mode',choices=['position','edges'],default='position')
 p.add_argument('--max-frames',type=int,default=300,help='Guard against loading a long untrimmed video')
 a=p.parse_args()
 if a.keyframes:
  if a.style or a.reference_frame is not None:p.error('Use keyframes OR single style/reference')
  specs=json.loads(Path(a.keyframes).read_text(encoding='utf-8'))
 else:
  if not a.style or a.reference_frame is None:p.error('Provide keyframes or style/reference-frame')
  specs=[{'frame':a.reference_frame,'style':a.style}]
 if not specs:p.error('Empty keyframes')
 for f in [a.input,a.backend]+[s['style'] for s in specs]:
  if not Path(f).is_file():p.error('Missing prerequisite: '+f)
 if a.width<64 or a.width%2 or a.stride<1:p.error('width must be even >=64; stride >=1')
 out=Path(a.output_dir).resolve();out.mkdir(parents=True,exist_ok=False);ACTIVE_OUTPUT=out
 (out/'status.json').write_text(json.dumps({'status':'running','stage':'decode'}),encoding='utf-8')
 framesdir=out/'frames';framesdir.mkdir()
 cap=cv2.VideoCapture(a.input);fps=cap.get(cv2.CAP_PROP_FPS);fs=[]
 if fps<=0 or a.max_frames<1:raise ValueError('Invalid fps/frame limit')
 if cap.get(cv2.CAP_PROP_FRAME_COUNT)>a.max_frames:raise ValueError('Trim input first: exceeds max-frames')
 while True:
  ok,f=cap.read()
  if not ok:break
  h=round(f.shape[0]*a.width/f.shape[1]/2)*2
  fs.append(cv2.resize(f,(a.width,h),interpolation=cv2.INTER_AREA))
  if len(fs)>a.max_frames:raise ValueError('Input exceeds max-frames')
 cap.release()
 if not fs or any(not 0<=s['frame']<len(fs) for s in specs):raise ValueError('Invalid reference frame or empty input')
 if len({s['frame'] for s in specs})!=len(specs):raise ValueError('Duplicate keyframe indexes')
 h,w=fs[0].shape[:2]
 refs={}
 for s in specs:
  idx=s['frame'];style=cv2.imread(s['style'])
  if style is None:raise ValueError('Cannot decode style')
  if abs(style.shape[1]/style.shape[0]-w/h)>0.03:raise ValueError('Style aspect ratio differs from video; align it first')
  style=cv2.resize(style,(w,h),interpolation=cv2.INTER_AREA)
  sp=out/f'style-{idx:06}.png';rp=out/f'reference-{idx:06}.png'
  cv2.imwrite(str(sp),style);cv2.imwrite(str(rp),fs[idx])
  refs[idx]={'style':sp,'reference':rp,'gray':cv2.cvtColor(fs[idx],cv2.COLOR_BGR2GRAY)}
 x,y=np.meshgrid(np.arange(w,dtype=np.float32),np.arange(h,dtype=np.float32))
 pos=np.stack([x/w*255,y/h*255,np.zeros_like(x)],axis=2).astype(np.uint8)
 cv2.imwrite(str(out/'position-source.png'),pos)
 e=cv2.DISOpticalFlow_create(cv2.DISOPTICAL_FLOW_PRESET_MEDIUM)
 selected=[int(i) for i in a.sample_frames.split(',')] if a.sample_frames else list(range(0,len(fs),a.stride))
 if not selected or min(selected)<0 or max(selected)>=len(fs):raise ValueError('Sample frame out of range')
 started=time.monotonic();timings=[];comparisons=[]
 exe=str(Path(a.backend).resolve())
 for i in selected:
  ri=min(refs,key=lambda n:abs(n-i));ref=refs[ri]['gray']
  target=fs[i];cv2.imwrite(str(out/'target.png'),target)
  flow=e.calc(cv2.cvtColor(target,cv2.COLOR_BGR2GRAY),ref,None)
  targetpos=np.stack([np.clip((x+flow[:,:,0])/w*255,0,255),np.clip((y+flow[:,:,1])/h*255,0,255),np.zeros_like(x)],axis=2).astype(np.uint8)
  cv2.imwrite(str(out/'position-target.png'),targetpos)
  if a.guide_mode=='edges':
   for name,gray in [('source',ref),('target',cv2.cvtColor(target,cv2.COLOR_BGR2GRAY))]:
    edge=cv2.Canny(gray,60,140)
    cv2.imwrite(str(out/f'position-{name}.png'),cv2.cvtColor(edge,cv2.COLOR_GRAY2BGR))
  dest=framesdir/f'{i:06}.png'
  cmd=[exe,'-style',str(refs[ri]['style']),'-guide',str(refs[ri]['reference']),str(out/'target.png'),'-weight','3','-guide',str(out/'position-source.png'),str(out/'position-target.png'),'-weight',str(a.position_weight),'-output',str(dest),'-backend','cpu','-searchvoteiters','4','-patchmatchiters','3']
  t=time.monotonic();r=subprocess.run(cmd,capture_output=True,text=True,timeout=180)
  (out/f'ebsynth-{i:06}.log').write_text(r.stdout+'\n'+r.stderr,encoding='utf-8')
  if r.returncode:raise RuntimeError('EbSynth failed; inspect logs')
  img=cv2.imread(str(dest))
  if img is None or img.shape!=target.shape:raise RuntimeError('Bad backend image')
  if float(img.std())<0.1 and float(target.std())>5:raise RuntimeError('Backend returned a flat image for a textured input; inspect channel configuration')
  timings.append({'frame':i,'reference_frame':ri,'seconds':round(time.monotonic()-t,3),'sha256':digest(dest)})
  if a.sample_frames or i in (0,len(fs)//4,len(fs)//2,3*len(fs)//4,len(fs)-1):comparisons.append(np.concatenate([target,img],axis=1))
  print(json.dumps(timings[-1]),flush=True)
  (out/'status.json').write_text(json.dumps({'status':'running','stage':'synthesis','last_frame':i}),encoding='utf-8')
 if comparisons:cv2.imwrite(str(out/'contact.jpg'),np.concatenate(comparisons,axis=0))
 results={}
 if not a.sample_frames:
  ff=imageio_ffmpeg.get_ffmpeg_exe()
  for name,compare in [('anime.mp4',False),('comparison.mp4',True)]:
   proc=subprocess.Popen([ff,'-y','-v','error','-f','rawvideo','-pix_fmt','bgr24','-s',f'{w*(2 if compare else 1)}x{h}','-r',str(fps/a.stride),'-i','-','-an','-c:v','libx264','-pix_fmt','yuv420p','-crf','18',str(out/name)],stdin=subprocess.PIPE)
   for i in selected:
    f=cv2.imread(str(framesdir/f'{i:06}.png'))
    proc.stdin.write((np.concatenate([fs[i],f],axis=1) if compare else f).tobytes())
   proc.stdin.close()
   if proc.wait():raise RuntimeError('Encoder failed')
   r=subprocess.run([ff,'-v','error','-i',str(out/name),'-f','null','-'],capture_output=True,text=True)
   results[name]={'decode_passed':r.returncode==0,'sha256':digest(out/name)}
   if r.returncode:raise RuntimeError('Decode failed')
 manifest={'adapter':'convert-anime-v2','backend':'official EbSynth sources with serial CPU compatibility build','input_sha256':digest(a.input),'keyframes':[{'frame':s['frame'],'path':s['style'],'sha256':digest(s['style'])} for s in specs],'binary_sha256':digest(a.backend),'width':w,'height':h,'source_fps':fps,'source_frames':len(fs),'selected_frames':selected,'stride':a.stride,'silent':True,'args':vars(a),'runtime_seconds':round(time.monotonic()-started,3),'frame_timings':timings,'outputs':results,'visual_qa':'not_reviewed','limitations':['Nearest-keyframe switching may cause appearance jumps','Missing regions may not be reconstructed faithfully','No generative video model inference','CPU serial output; framewise synthesis may flicker']}
 (out/'manifest.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
 (out/'status.json').write_text(json.dumps({'status':'complete','visual_qa':'not_reviewed'}),encoding='utf-8')
if __name__=='__main__':
 try:main()
 except Exception as exc:
  if ACTIVE_OUTPUT is not None:(ACTIVE_OUTPUT/'status.json').write_text(json.dumps({'status':'failed','error':str(exc)}),encoding='utf-8')
  raise

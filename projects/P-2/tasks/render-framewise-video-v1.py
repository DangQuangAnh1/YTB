"""Private CPU render of one framewise anime model over a source range.

Reuses models/runners from compare-framewise-v1.py. Subtitle box is detected
per source frame and pasted back; output is silent like the source test.
Run from kit root with .venv-p2/Scripts/python.exe; output dir must be new.
"""
from pathlib import Path
import argparse,hashlib,importlib.util,json,subprocess,time
import cv2,numpy as np,imageio_ffmpeg
here=Path(__file__).resolve().parent
spec=importlib.util.spec_from_file_location('compare_framewise',here/'compare-framewise-v1.py')
cf=importlib.util.module_from_spec(spec);spec.loader.exec_module(cf)
base=cf.base;W,H=cf.W,cf.H

def subtitle_rect(f,margin=2):
 """Wide green box in the lower third, or None when no subtitle is shown."""
 b,g,r=[f[...,c].astype(int) for c in range(3)]
 m=((g-r>12)&(g-b>35)).astype(np.uint8);m[:H*2//3]=0
 m=cv2.morphologyEx(m,cv2.MORPH_CLOSE,np.ones((5,5),np.uint8))
 _,_,st,_=cv2.connectedComponentsWithStats(m)
 boxes=[(x,y,w,h) for x,y,w,h,a in st[1:] if 150<w<420 and 18<h<60 and w>4*h and a/(w*h)>0.5]
 if not boxes:return None
 x,y,w,h=max(boxes,key=lambda b:b[2]*b[3])
 return [int(x-margin),int(y-margin),int(x+w+margin),int(y+h+margin)]

def gray(f):return cv2.cvtColor(f,cv2.COLOR_BGR2GRAY).astype(np.float32)

def main():
 ap=argparse.ArgumentParser()
 ap.add_argument('--model',choices=list(cf.MODELS),required=True)
 ap.add_argument('--source',default='media/cooking-pilot-v1/source-video.mp4')
 ap.add_argument('--start',type=float,required=True);ap.add_argument('--duration',type=float,required=True)
 ap.add_argument('--output-dir',required=True);ap.add_argument('--threads',type=int,default=4)
 a=ap.parse_args()
 if a.duration>15:raise SystemExit('Private test must stay within 15 seconds')
 src=base/a.source;out=base/a.output_dir;out.mkdir(parents=True,exist_ok=False)
 cf.THREADS=a.threads;run,info=cf.make_runner(cf.MODELS[a.model])
 cap=cv2.VideoCapture(str(src));fps=cap.get(cv2.CAP_PROP_FPS)
 first=round(a.start*fps);count=round(a.duration*fps);cap.set(cv2.CAP_PROP_POS_FRAMES,first)
 ff=imageio_ffmpeg.get_ffmpeg_exe()
 enc=lambda name,width:subprocess.Popen([ff,'-y','-v','error','-f','rawvideo','-pix_fmt','bgr24','-s',f'{width}x{H}','-r',str(fps),'-i','-','-an','-c:v','libx264','-pix_fmt','yuv420p','-crf','18',str(out/name)],stdin=subprocess.PIPE)
 procs={'anime.mp4':enc('anime.mp4',W),'comparison.mp4':enc('comparison.mp4',W*2)}
 samples=sorted({0,count//5,2*count//5,3*count//5,4*count//5,count-1})
 times=[];subs=[];static=[];prev=None;shots=[];start=time.monotonic()
 for i in range(count):
  ok,f=cap.read()
  if not ok:raise RuntimeError(f'Source ended at frame {first+i}')
  f=cv2.resize(f,(W,H),interpolation=cv2.INTER_AREA)
  t=time.monotonic();y,_=run(f);times.append(time.monotonic()-t)
  if y.shape!=f.shape:raise RuntimeError(f'Unexpected output shape {y.shape}')
  rect=subtitle_rect(f);subs.append(rect)
  if rect:y=cf.paste(f,y,rect)
  gs,go=gray(f),gray(y)
  if prev is not None:
   # Flicker on pixels the source keeps still; subtitle box excluded.
   still=np.abs(gs-prev[0])<2
   for r in (rect,prev[2]):
    if r:still[r[1]:r[3],r[0]:r[2]]=False
   if still.mean()>0.05:static.append((float(np.abs(go-prev[1])[still].mean()),float(np.abs(gs-prev[0])[still].mean()),float(still.mean())))
  prev=(gs,go,rect)
  both=np.concatenate([f,y],axis=1)
  procs['anime.mp4'].stdin.write(y.tobytes());procs['comparison.mp4'].stdin.write(both.tobytes())
  if i in samples:shots.append(both);cv2.imwrite(str(out/f'frame-{i:03}.jpg'),both,[cv2.IMWRITE_JPEG_QUALITY,90])
  if (i+1)%50==0:print(json.dumps({'frames':i+1,'elapsed_seconds':round(time.monotonic()-start,1)}),flush=True)
 cap.release()
 for p in procs.values():p.stdin.close();assert p.wait()==0
 outputs={}
 for name in procs:
  r=subprocess.run([ff,'-v','error','-i',str(out/name),'-f','null','-'],capture_output=True,text=True)
  assert r.returncode==0,r.stderr
  outputs[name]={'decode_passed':True,'sha256':hashlib.sha256((out/name).read_bytes()).hexdigest()}
 cv2.imwrite(str(out/'contact.jpg'),np.concatenate(shots,axis=0),[cv2.IMWRITE_JPEG_QUALITY,90])
 s=np.array(static);on=[i for i,r in enumerate(subs) if r]
 spec_m=cf.MODELS[a.model];model=cf.tools/spec_m['path']
 manifest={'adapter':'render-framewise-video-v1','model':model.name,'model_url':spec_m['url'],'model_sha256':cf.sha(model),'license':spec_m['license'],**info,'threads':a.threads,
  'input':f'ec15pSXc2Qg {a.start}–{a.start+a.duration}s, existing private test source','source_sha256':cf.sha(src),'first_frame':first,
  'width':W,'height':H,'fps':fps,'frames':count,'duration_seconds':count/fps,'silent':True,
  'runtime_seconds':round(time.monotonic()-start,2),'median_inference_seconds':float(np.median(times)),'p95_inference_seconds':float(np.percentile(times,95)),
  'subtitle':{'frames_with_box':len(on),'first':on[0] if on else None,'last':on[-1] if on else None,'rule':'per-frame G-R>12, G-B>35, lower third, wide filled box, margin 2px, 5px feather'},
  'static_flicker':{'output_mean':float(s[:,0].mean()),'output_p95':float(np.percentile(s[:,0],95)),'source_mean':float(s[:,1].mean()),'still_fraction_mean':float(s[:,2].mean()),
   'definition':'mean |gray(t)-gray(t-1)| (0-255) over pixels where source changes <2, subtitle boxes excluded'},
  'samples':samples,'outputs':outputs,'visual_review':'pending',
  'limits':['Framewise GAN, no temporal consistency model','Static-pixel metric does not measure flicker on moving hands','No new cloud upload or paid service']}
 (out/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
 print(json.dumps({'out':str(out),'frames':count,'seconds':manifest['runtime_seconds'],'static_flicker':manifest['static_flicker']['output_mean']}))

if __name__=='__main__':main()

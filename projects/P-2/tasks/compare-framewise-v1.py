"""Private 5-frame CPU comparison of framewise anime models on input4s.

Each model runs in its own subprocess so peak RAM is per model. The burned-in
subtitle box is detected on the source and pasted back over every output.
Run from kit root with .venv-p2/Scripts/python.exe; output dir must be new.
"""
from pathlib import Path
from ctypes import wintypes
import argparse,ctypes,hashlib,json,subprocess,sys,time
import cv2,numpy as np
base=Path(__file__).resolve().parents[1]
tools=base/'media/tools'
source=base/'media/cooking-pilot-v1/input-4s.mp4'
out=base/'artifacts/render/framewise-compare-v1'
FRAMES=[0,25,50,75,99];W,H=640,360;THREADS=2
AG_URL='https://github.com/TachibanaYoshino/AnimeGANv3/releases/download/'
AG_LICENSE='Official AnimeGANv3 noncommercial terms; private technical test only, no publishing permission inferred'
MODELS={
 'hayao36':dict(path='animegan-onnx/AnimeGANv3_Hayao_36.onnx',url=AG_URL+'v1.1.0/AnimeGANv3_Hayao_36.onnx',kind='animegan',license=AG_LICENSE),
 'shinkai37':dict(path='animegan-onnx/AnimeGANv3_Shinkai_37.onnx',url=AG_URL+'v1.1.0/AnimeGANv3_Shinkai_37.onnx',kind='animegan',license=AG_LICENSE),
 'h40':dict(path='animegan-onnx/animeganv3_H40_model.onnx',url=AG_URL+'v1.0.3/animeganv3_H40_model.onnx',kind='animegan',license=AG_LICENSE),
 'h64':dict(path='animegan-onnx/animeganv3_H64_model0.onnx',url=AG_URL+'v1.0.3/animeganv3_H64_model0.onnx',kind='animegan',license=AG_LICENSE),
 'wbc':dict(path='wbc-onnx/cartoonizer.onnx',url='https://huggingface.co/spaces/sayakpaul/cartoonizer-demo-onnx/resolve/main/cartoonizer.onnx',kind='wbc',
  license='White-box Cartoonization README: CC BY-NC-SA 4.0, commercial application prohibited; ONNX export from sayakpaul HF space keeps that lineage'),
 'dctbg':dict(path='dctnet/cartoon_anime_bg.pb',url='https://www.modelscope.cn/models/iic/cv_unet_person-image-cartoon_compound-models/resolve/master/cartoon_anime_bg.pb',kind='dct',
  license='ModelScope license field Apache License 2.0; DCT-Net code Apache-2.0; style/training-data rights not audited'),
}
COLUMNS=['source',*MODELS]

class PMC(ctypes.Structure):
 _fields_=[('cb',wintypes.DWORD),('PageFaultCount',wintypes.DWORD)]+[(n,ctypes.c_size_t) for n in ['PeakWorkingSetSize','WorkingSetSize','QuotaPeakPagedPoolUsage','QuotaPagedPoolUsage','QuotaPeakNonPagedPoolUsage','QuotaNonPagedPoolUsage','PagefileUsage','PeakPagefileUsage']]
def peak_mib():
 k=ctypes.windll.kernel32;k.GetCurrentProcess.restype=wintypes.HANDLE
 p=ctypes.windll.psapi;p.GetProcessMemoryInfo.argtypes=[wintypes.HANDLE,ctypes.POINTER(PMC),wintypes.DWORD]
 m=PMC();m.cb=ctypes.sizeof(PMC)
 if not p.GetProcessMemoryInfo(k.GetCurrentProcess(),ctypes.byref(m),m.cb):raise OSError('GetProcessMemoryInfo failed')
 return round(m.PeakWorkingSetSize/2**20,1)

def sha(path):return hashlib.sha256(Path(path).read_bytes()).hexdigest()

def read_source():
 cap=cv2.VideoCapture(str(source));frames=[]
 while True:
  ok,f=cap.read()
  if not ok:break
  frames.append(cv2.resize(f,(W,H),interpolation=cv2.INTER_AREA))
 cap.release()
 if len(frames)<=max(FRAMES):raise RuntimeError(f'Source has {len(frames)} frames')
 return frames

def subtitle_rect(frames,margin=2):
 """Union bbox of the green subtitle box (G clearly above R and B) over all frames."""
 boxes=[]
 for f in frames:
  b,g,r=[f[...,c].astype(int) for c in range(3)]
  m=((g-r>12)&(g-b>35)).astype(np.uint8);m[:H*2//3]=0
  m=cv2.morphologyEx(m,cv2.MORPH_CLOSE,np.ones((5,5),np.uint8))
  n,_,st,_=cv2.connectedComponentsWithStats(m)
  if n<2:raise RuntimeError('Subtitle box not found')
  x,y,w,h,_=st[1+np.argmax(st[1:,4])];boxes.append((x,y,x+w,y+h))
 b=np.array(boxes);x0,y0=b[:,:2].min(0)-margin;x1,y1=b[:,2:].max(0)+margin
 if not(150<x1-x0<320 and 20<y1-y0<50):raise RuntimeError(f'Unexpected subtitle bbox {boxes[0]}')
 return [int(x0),int(y0),int(x1),int(y1)]

def paste(src,styled,rect):
 x0,y0,x1,y1=rect;a=np.zeros((H,W),np.float32);a[y0:y1,x0:x1]=1
 a=cv2.GaussianBlur(a,(5,5),0)[...,None]
 return (a*src+(1-a)*styled).round().astype(np.uint8)

def make_runner(spec):
 path=tools/spec['path']
 if spec['kind']=='dct':
  import openvino as ov
  cm=ov.Core().compile_model(ov.Core().read_model(str(path)),'CPU',{'INFERENCE_NUM_THREADS':THREADS})
  def run(f):
   h,w=f.shape[:2];nh,nw=-(-h//16)*16,-(-w//16)*16
   x=np.full((nh,nw,3),255,np.float32);x[:h,:w]=f
   y=cm(x)[cm.output(0)]
   return y[:h,:w].astype(np.uint8),(float(y.min()),float(y.max()))
  return run,{'runtime':'openvino '+ov.__version__,'provider':['CPU'],'layout':'HWC BGR float32 0-255 padded to 16 with 255, uint8 output'}
 import onnxruntime as ort
 opt=ort.SessionOptions();opt.intra_op_num_threads=THREADS;opt.inter_op_num_threads=1
 s=ort.InferenceSession(str(path),sess_options=opt,providers=['CPUExecutionProvider']);name=s.get_inputs()[0].name
 bgr=spec['kind']=='wbc'
 def run(f):
  x=(f if bgr else cv2.cvtColor(f,cv2.COLOR_BGR2RGB)).astype(np.float32)/127.5-1
  y=s.run(None,{name:x[None]})[0][0]
  if not np.isfinite(y).all():raise RuntimeError('Nonfinite model output')
  o=np.clip((y+1)*127.5,0,255).astype(np.uint8)
  return (o if bgr else cv2.cvtColor(o,cv2.COLOR_RGB2BGR)),(float(y.min()),float(y.max()))
 return run,{'runtime':'onnxruntime '+ort.__version__,'provider':s.get_providers(),'layout':('NHWC BGR' if bgr else 'NHWC RGB')+' float32 [-1,1]'}

def run_model(mid):
 spec=MODELS[mid];d=out/mid;d.mkdir(exist_ok=False)
 frames=read_source();rect=json.loads((out/'subtitle.json').read_text())['rect']
 t=time.monotonic();run,info=make_runner(spec);load=time.monotonic()-t
 t=time.monotonic();run(frames[FRAMES[0]]);warmup=time.monotonic()-t
 times=[];ranges=[];x0,y0,x1,y1=rect;pad=10
 for i in FRAMES:
  f=frames[i];t=time.monotonic();y,rng=run(f);times.append(round(time.monotonic()-t,4));ranges.append(rng)
  if y.shape!=f.shape:raise RuntimeError(f'Unexpected output shape {y.shape}')
  cv2.imwrite(str(d/f'frame-{i:03}.jpg'),paste(f,y,rect),[cv2.IMWRITE_JPEG_QUALITY,92])
  if i==50:cv2.imwrite(str(d/'subtitle-raw-050.png'),y[y0-pad:y1+pad,x0-pad:x1+pad])
 res={'model':Path(spec['path']).name,'model_url':spec['url'],'model_bytes':(tools/spec['path']).stat().st_size,'model_sha256':sha(tools/spec['path']),
  'license':spec['license'],**info,'threads':THREADS,'width':W,'height':H,'frames':FRAMES,'load_seconds':round(load,3),'warmup_seconds':round(warmup,3),
  'frame_seconds':times,'median_seconds':float(np.median(times)),'output_range':[min(r[0] for r in ranges),max(r[1] for r in ranges)],'peak_working_set_mib':peak_mib()}
 (d/'result.json').write_text(json.dumps(res,ensure_ascii=False,indent=2),encoding='utf-8')
 print(json.dumps({'model':mid,'median_seconds':res['median_seconds'],'peak_mib':res['peak_working_set_mib']}),flush=True)

def label(img,text):
 bar=np.full((26,img.shape[1],3),32,np.uint8)
 cv2.putText(bar,text,(8,19),cv2.FONT_HERSHEY_SIMPLEX,0.6,(255,255,255),1,cv2.LINE_AA)
 return np.concatenate([bar,img],axis=0)

def contacts():
 load=lambda c,i:cv2.imread(str(out/c/f'frame-{i:03}.jpg'))
 full=[label(np.concatenate([cv2.resize(load(c,i),(W//2,H//2),interpolation=cv2.INTER_AREA) for c in COLUMNS],axis=1),f'frame {i}: '+' | '.join(COLUMNS)) for i in FRAMES]
 cv2.imwrite(str(out/'contact-full.jpg'),np.concatenate(full,axis=0),[cv2.IMWRITE_JPEG_QUALITY,90])
 hands=[label(np.concatenate([load(c,i)[110:330,290:630] for c in COLUMNS],axis=1),f'frame {i} hands/knife crop 340x220: '+' | '.join(COLUMNS)) for i in FRAMES]
 cv2.imwrite(str(out/'contact-hands.jpg'),np.concatenate(hands,axis=0),[cv2.IMWRITE_JPEG_QUALITY,90])
 x0,y0,x1,y1=json.loads((out/'subtitle.json').read_text())['rect'];pad=10
 rows=[label(np.concatenate([cv2.imread(str(out/m/'subtitle-raw-050.png')),load(m,50)[y0-pad:y1+pad,x0-pad:x1+pad]],axis=1),f'{m}: raw | pasted') for m in MODELS]
 cv2.imwrite(str(out/'subtitle-check.png'),np.concatenate(rows,axis=0))

def main():
 ap=argparse.ArgumentParser();ap.add_argument('--model',choices=list(MODELS));a=ap.parse_args()
 if a.model:return run_model(a.model)
 missing=[m for m,s in MODELS.items() if not(tools/s['path']).is_file()]
 if missing:raise SystemExit(f'Missing models: {missing}')
 out.mkdir(parents=True,exist_ok=False);(out/'source').mkdir()
 frames=read_source();rect=subtitle_rect(frames)
 (out/'subtitle.json').write_text(json.dumps({'rect':rect,'rule':'G-R>12 and G-B>35 in lower third, union over all source frames, margin 2px, 5px feather'}),encoding='utf-8')
 for i in FRAMES:cv2.imwrite(str(out/'source'/f'frame-{i:03}.jpg'),frames[i],[cv2.IMWRITE_JPEG_QUALITY,92])
 status={}
 for m in MODELS:
  r=subprocess.run([sys.executable,'-I',__file__,'--model',m],capture_output=True,text=True)
  status[m]={'returncode':r.returncode,'stdout':r.stdout.strip()[-500:],'stderr':r.stderr.strip()[-1500:]}
  print(m,r.returncode,r.stdout.strip()[-200:],r.stderr.strip()[-300:],flush=True)
 ok=[m for m in MODELS if status[m]['returncode']==0]
 if len(ok)==len(MODELS):contacts()
 results={m:json.loads((out/m/'result.json').read_text(encoding='utf-8')) for m in ok}
 manifest={'adapter':'compare-framewise-v1','input':'ec15pSXc2Qg range148–152s, existing private test','input_sha256':sha(source),'frames':FRAMES,'width':W,'height':H,
  'subtitle_rect':rect,'status':status,'results':results,'outputs':{p.name:sha(p) for p in sorted(out.glob('*.*')) if p.name!='manifest.json'},
  'visual_review':'pending','limits':['5 still frames only, no playback or flicker evidence','Timing from 5 frames with 2 threads while other apps run','No new cloud upload or paid service']}
 (out/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
 if len(ok)!=len(MODELS):raise SystemExit(f'Failed models: {[m for m in MODELS if m not in ok]}')

if __name__=='__main__':main()

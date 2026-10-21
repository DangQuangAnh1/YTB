"""Private 4s CPU AnimeGANv3 whole-frame benchmark. NHWC RGB [-1,1]."""
from pathlib import Path
import subprocess,time,json,hashlib
import cv2,numpy as np,onnxruntime as ort,imageio_ffmpeg
base=Path(__file__).resolve().parents[1]
source=base/'media/cooking-pilot-v1/input-4s.mp4'
model=base/'media/tools/animegan-onnx/AnimeGANv3_Hayao_36.onnx'
out=base/'artifacts/render/animegan-v3-cpu-v1';out.mkdir(parents=True,exist_ok=False)
opt=ort.SessionOptions();opt.intra_op_num_threads=2;opt.inter_op_num_threads=1
s=ort.InferenceSession(str(model),sess_options=opt,providers=['CPUExecutionProvider'])
cap=cv2.VideoCapture(str(source));fps=cap.get(cv2.CAP_PROP_FPS)
w,h=640,360;ff=imageio_ffmpeg.get_ffmpeg_exe();procs=[]
for name,width in [('anime.mp4',w),('comparison.mp4',w*2)]:
 procs.append(subprocess.Popen([ff,'-y','-v','error','-f','rawvideo','-pix_fmt','bgr24','-s',f'{width}x{h}','-r',str(fps),'-i','-','-an','-c:v','libx264','-pix_fmt','yuv420p','-crf','18',str(out/name)],stdin=subprocess.PIPE))
times=[];samples=[];i=0;start=time.monotonic()
while True:
 ok,f=cap.read()
 if not ok:break
 if i>=125:raise RuntimeError('Test must stay within 5seconds')
 f=cv2.resize(f,(w,h),interpolation=cv2.INTER_AREA)
 x=cv2.cvtColor(f,cv2.COLOR_BGR2RGB).astype(np.float32)/127.5-1
 t=time.monotonic();y=s.run(None,{s.get_inputs()[0].name:x[None]})[0];times.append(time.monotonic()-t)
 if not np.isfinite(y).all():raise RuntimeError('Nonfinite model output')
 rgb=np.clip((y[0]+1)*127.5,0,255).astype(np.uint8)
 anime=cv2.cvtColor(rgb,cv2.COLOR_RGB2BGR)
 if anime.shape!=f.shape:raise RuntimeError('Unexpected output shape')
 both=np.concatenate([f,anime],axis=1)
 procs[0].stdin.write(anime.tobytes());procs[1].stdin.write(both.tobytes())
 if i in [0,25,50,75,99]:samples.append(both);cv2.imwrite(str(out/f'frame-{i:03}.jpg'),both)
 i+=1
 if i%25==0:print(json.dumps({'frames':i,'elapsed_seconds':round(time.monotonic()-start,2)}),flush=True)
cap.release()
for p in procs:p.stdin.close();assert p.wait()==0
outputs={}
for name in ['anime.mp4','comparison.mp4']:
 r=subprocess.run([ff,'-v','error','-i',str(out/name),'-f','null','-'],capture_output=True,text=True)
 assert r.returncode==0,r.stderr
 outputs[name]={'decode_passed':True,'sha256':hashlib.sha256((out/name).read_bytes()).hexdigest()}
cv2.imwrite(str(out/'contact.jpg'),np.concatenate(samples,axis=0))
manifest={'model':'AnimeGANv3_Hayao_36.onnx','model_url':'https://github.com/TachibanaYoshino/AnimeGANv3/releases/download/v1.1.0/AnimeGANv3_Hayao_36.onnx','model_bytes':model.stat().st_size,'model_sha256':hashlib.sha256(model.read_bytes()).hexdigest(),'license':'Official AnimeGANv3 noncommercial terms; private technical test only, no publishing permission inferred','runtime':ort.__version__,'provider':s.get_providers(),'input':'ec15pSXc2Qg range148–152s, existing private test','layout':'NHWC RGB float32 [-1,1]','width':w,'height':h,'fps':fps,'frames':i,'duration_seconds':i/fps,'silent':True,'runtime_seconds':round(time.monotonic()-start,2),'median_inference_seconds':float(np.median(times)),'p95_inference_seconds':float(np.percentile(times,95)),'outputs':outputs,'visual_review':'pending','limits':['Framewise GAN, no temporal consistency model','No new cloud upload or paid service']}
(out/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'out':str(out),'frames':i,'seconds':round(time.monotonic()-start,2)}))

"""CPU proof of concept: propagate an AI anime keyframe with dense optical flow.
Not Diffutoon/EbSynth; no diffusion inference. Silent technical draft.
"""
import argparse, hashlib, json, subprocess, time
from pathlib import Path
import cv2
import numpy as np
import imageio_ffmpeg

p=argparse.ArgumentParser()
p.add_argument('--input',required=True)
p.add_argument('--keyframe',required=True)
p.add_argument('--reference-frame',type=int,default=50)
p.add_argument('--output-dir',required=True)
a=p.parse_args()
out=Path(a.output_dir)
out.mkdir(parents=True,exist_ok=False)
cap=cv2.VideoCapture(a.input)
fps=cap.get(cv2.CAP_PROP_FPS)
frames=[]
while True:
    ok,f=cap.read()
    if not ok: break
    frames.append(f)
cap.release()
assert frames and 0<=a.reference_frame<len(frames)
h,w=frames[0].shape[:2]
key=cv2.imread(a.keyframe)
assert key is not None
key=cv2.resize(key,(w,h),interpolation=cv2.INTER_AREA)
ref=cv2.cvtColor(frames[a.reference_frame],cv2.COLOR_BGR2GRAY)
flow_engine=cv2.DISOpticalFlow_create(cv2.DISOPTICAL_FLOW_PRESET_MEDIUM)
gridx,gridy=np.meshgrid(np.arange(w,dtype=np.float32),np.arange(h,dtype=np.float32))
ff=imageio_ffmpeg.get_ffmpeg_exe()
encode=subprocess.Popen([ff,'-y','-v','error','-f','rawvideo','-pix_fmt','bgr24','-s',f'{w}x{h}','-r',str(fps),'-i','-','-an','-c:v','libx264','-pix_fmt','yuv420p','-crf','18',str(out/'anime-draft.mp4')],stdin=subprocess.PIPE)
comparison=subprocess.Popen([ff,'-y','-v','error','-f','rawvideo','-pix_fmt','bgr24','-s',f'{w*2}x{h}','-r',str(fps),'-i','-','-an','-c:v','libx264','-pix_fmt','yuv420p','-crf','18',str(out/'comparison.mp4')],stdin=subprocess.PIPE)
started=time.monotonic()
samples=[]
for i,f in enumerate(frames):
    cur=cv2.cvtColor(f,cv2.COLOR_BGR2GRAY)
    flow=flow_engine.calc(cur,ref,None)
    anime=cv2.remap(key,gridx+flow[:,:,0],gridy+flow[:,:,1],cv2.INTER_LINEAR,borderMode=cv2.BORDER_REFLECT101)
    encode.stdin.write(anime.tobytes())
    both=np.concatenate([f,anime],axis=1)
    cv2.putText(both,'SOURCE',(12,23),cv2.FONT_HERSHEY_SIMPLEX,.6,(255,255,255),1,cv2.LINE_AA)
    cv2.putText(both,'AI KEYFRAME + FLOW TEST',(w+12,23),cv2.FONT_HERSHEY_SIMPLEX,.6,(255,255,255),1,cv2.LINE_AA)
    comparison.stdin.write(both.tobytes())
    if i in (0,25,50,75,len(frames)-1):
        cv2.imwrite(str(out/f'frame-{i:03}.jpg'),both)
        samples.append(both)
for proc in (encode,comparison):
    proc.stdin.close()
    assert proc.wait()==0
checks={}
for name in ('anime-draft.mp4','comparison.mp4'):
    target=out/name
    res=subprocess.run([ff,'-v','error','-i',str(target),'-f','null','-'],capture_output=True,text=True)
    assert res.returncode==0,res.stderr
    checks[name]={'sha256':hashlib.sha256(target.read_bytes()).hexdigest(),'decode_passed':True}
cv2.imwrite(str(out/'contact.jpg'),np.concatenate(samples,axis=0))
(out/'manifest.json').write_text(json.dumps({'adapter':'CPU DIS optical-flow keyframe propagation v1','source_url':'https://www.youtube.com/watch?v=ec15pSXc2Qg','source_range_seconds':[148,152],'input':a.input,'keyframe':a.keyframe,'reference_frame':a.reference_frame,'width':w,'height':h,'fps':fps,'frames':len(frames),'duration_seconds':len(frames)/fps,'runtime_seconds':round(time.monotonic()-started,2),'silent':True,'limits':['No diffusion video generation','Unseen regions may stretch; one keyframe only','Sampled visual checks required; no audio'],'outputs':checks},ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'output':str(out),'frames':len(frames),'runtime':round(time.monotonic()-started,2)}))

#!/usr/bin/env python3
"""Close-up study of a reference video, complementing analyze-video.py (whole-video stats) and the claude-video /watch skill
(scene frames + transcript). Two subcommands:
  strip <video> <out_dir> --from S --to S [--step N] [--crop x,y,w,h] [--width W] [--cols C] [--label NAME]
        every N-th source frame in [from,to] tiled into a numbered sheet: shows poses, smears and hit timing frame by frame.
  audio <video> <out_dir> [--from S --to S] [--compare other.wav|.mp4]
        log spectrogram with onset marks, per-onset features (attack, decay, spectral centroid, low/mid/high energy) and
        a short WAV per onset, so hit sounds can be compared numerically with ours.
Needs numpy, pillow, imageio-ffmpeg (ffmpeg) and ffprobe (Remotion runtime or PATH). Output is analysis data only."""
import sys,os,glob,json,shutil,subprocess,wave
from pathlib import Path
import numpy as np
from PIL import Image,ImageDraw

root=Path(__file__).resolve().parents[1]
def ffmpeg():
    if os.environ.get('FFMPEG'):return os.environ['FFMPEG']
    try:
        import imageio_ffmpeg;return imageio_ffmpeg.get_ffmpeg_exe()
    except Exception:return shutil.which('ffmpeg')
def ffprobe():
    if os.environ.get('FFPROBE'):return os.environ['FFPROBE']
    hits=glob.glob(str(root/'third_party/video/runtime/p2-remotion/node_modules/@remotion/compositor-*/ffprobe*'))
    return hits[0] if hits else shutil.which('ffprobe')
FF,FP=ffmpeg(),ffprobe()
def run(a,**k):return subprocess.run(a,check=True,capture_output=True,**k)
def arg(name,default=None,cast=str):
    return cast(sys.argv[sys.argv.index(name)+1]) if name in sys.argv else default

def strip(video,out):
    probe=json.loads(run([FP,'-v','error','-select_streams','v:0','-show_streams','-of','json',str(video)]).stdout)['streams'][0]
    fps=eval(probe['avg_frame_rate']);W0,H0=probe['width'],probe['height']
    t0,t1,step=arg('--from',0.0,float),arg('--to',None,float),arg('--step',1,int)
    crop=arg('--crop',None);tw=arg('--width',640,int);cols=arg('--cols',1,int);label=arg('--label','strip')
    vf=[]
    if crop:x,y,w,h=map(int,crop.split(','));vf.append(f'crop={w}:{h}:{x}:{y}');W0,H0=w,h
    th=round(H0*tw/W0);vf.append(f'scale={tw}:{th}')
    span=['-ss',str(t0)]+(['-to',str(t1)] if t1 else [])
    raw=run([FF,'-v','error']+span+['-i',str(video),'-vf',','.join(vf),'-f','rawvideo','-pix_fmt','rgb24','-']).stdout
    frames=np.frombuffer(raw,np.uint8).reshape(-1,th,tw,3)[::step]
    rows=(len(frames)+cols-1)//cols;sheet=Image.new('RGB',(cols*tw,rows*(th+16)),'#111');d=ImageDraw.Draw(sheet)
    for i,f in enumerate(frames):
        x,y=i%cols*tw,i//cols*(th+16);sheet.paste(Image.fromarray(f),(x,y+16))
        n=round(t0*fps)+i*step;d.text((x+4,y+2),f'src frame {n}  t={n/fps:.3f}s',fill='#ff0')
    out.mkdir(parents=True,exist_ok=True);p=out/f'{label}.jpg';sheet.save(p,quality=88)
    print(json.dumps({'sheet':str(p),'frames':len(frames),'fps':round(fps,3),'from':t0,'to':t1,'step':step}))

SR=22050
def load_audio(path,t0=None,t1=None):
    span=(['-ss',str(t0)] if t0 is not None else [])+(['-to',str(t1)] if t1 is not None else [])
    raw=run([FF,'-v','error']+span+['-i',str(path),'-ac','1','-ar',str(SR),'-f','s16le','-']).stdout
    return np.frombuffer(raw,'<i2').astype(np.float32)/32768
def stft(x,n=1024,hop=256):
    win=np.hanning(n);fr=[x[i:i+n]*win for i in range(0,max(1,len(x)-n),hop)]
    return np.abs(np.fft.rfft(np.array(fr),axis=1)),hop
def onsets(S,hop):
    flux=np.maximum(0,np.diff(np.log1p(S),axis=0)).sum(axis=1);flux=np.concatenate([[0],flux])
    thr=np.median(flux)+1.5*np.std(flux);mind=int(.08*SR/hop);pk=[]
    for i in range(1,len(flux)-1):
        if flux[i]>thr and flux[i]>=flux[i-1] and flux[i]>=flux[i+1] and (not pk or i-pk[-1]>=mind):pk.append(i)
    return pk,flux
def features(x,i0):
    seg=x[i0:i0+int(.35*SR)]
    if len(seg)<256:return None
    env=np.abs(seg);sm=np.convolve(env,np.ones(64)/64,'same');pk=int(np.argmax(sm));peak=float(sm[pk])+1e-9
    below=np.where(sm[pk:]<peak*.1)[0];decay=(below[0] if len(below) else len(sm)-pk)/SR
    spec=np.abs(np.fft.rfft(seg*np.hanning(len(seg))));f=np.fft.rfftfreq(len(seg),1/SR);e=spec**2;tot=e.sum()+1e-12
    band=lambda a,b:float(e[(f>=a)&(f<b)].sum()/tot)
    return {'attack_ms':round(pk/SR*1000,1),'decay_to_10pct_ms':round(decay*1000,1),'centroid_hz':round(float((f*e).sum()/tot)),
            'low_<200':round(band(0,200),3),'mid_200-2k':round(band(200,2000),3),'high_>2k':round(band(2000,SR/2),3),'peak':round(peak,3)}
def spectrogram_img(S,marks,hop,dur,title):
    img=np.log1p(S.T[::-1]*20);img=(255*img/img.max()).astype(np.uint8)
    im=Image.fromarray(img).resize((min(2400,max(800,int(dur*120))),300)).convert('RGB');d=ImageDraw.Draw(im)
    for m in marks:x=int(m*hop/SR/dur*im.width);d.line([(x,0),(x,299)],fill='#ff0',width=1)
    d.text((4,4),title,fill='#0ff');return im
def audio(video,out):
    t0,t1=arg('--from',None,float),arg('--to',None,float);x=load_audio(video,t0,t1);out.mkdir(parents=True,exist_ok=True)
    def analyse(sig,tag):
        S,hop=stft(sig);pk,_=onsets(S,hop);dur=len(sig)/SR;hits=[]
        cd=out/f'{tag}-onsets';cd.mkdir(exist_ok=True)
        for k,i in enumerate(pk):
            s0=max(0,i*hop-int(.02*SR));ft=features(sig,s0)
            if not ft:continue
            ft['t']=round(s0/SR+(t0 or 0),3);hits.append(ft)
            seg=(np.clip(sig[s0:s0+int(.4*SR)],-1,1)*32767).astype('<i2')
            with wave.open(str(cd/f'{k:02d}-{ft["t"]:.2f}s.wav'),'wb') as w:w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes(seg.tobytes())
        return spectrogram_img(S,pk,hop,dur,f'{tag}: {len(pk)} onsets'),hits
    imgs,report=[],{}
    im,hits=analyse(x,'reference');imgs.append(im);report['reference']=hits
    cmp=arg('--compare')
    if cmp:im2,h2=analyse(load_audio(cmp),'compare');imgs.append(im2);report['compare']=h2
    W=max(i.width for i in imgs);sheet=Image.new('RGB',(W,310*len(imgs)),'#000')
    for k,i in enumerate(imgs):sheet.paste(i,(0,k*310))
    sheet.save(out/'spectrogram.jpg',quality=88)
    def summary(h):
        if not h:return {}
        keys=['attack_ms','decay_to_10pct_ms','centroid_hz','low_<200','mid_200-2k','high_>2k']
        return {k:round(float(np.median([e[k] for e in h])),3) for k in keys}|{'onsets':len(h)}
    report['summary']={k:summary(v) for k,v in report.items() if isinstance(v,list)}
    (out/'audio-report.json').write_text(json.dumps(report,indent=1))
    print(json.dumps(report['summary'],indent=1))

if __name__=='__main__':
    if len(sys.argv)<4 or sys.argv[1] not in ('strip','audio'):print(__doc__);sys.exit(2)
    {'strip':strip,'audio':audio}[sys.argv[1]](Path(sys.argv[2]),Path(sys.argv[3]))

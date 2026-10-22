#!/usr/bin/env python3
"""Reference video analyzer: probe, shot cuts, motion curve, flashes, audio onsets/BPM, palette, contact sheets.
Usage: analyze-video.py <video> <out_dir> [--sheet-frames N]
Needs numpy, pillow, imageio-ffmpeg (ffmpeg) and ffprobe (Remotion runtime or PATH). Output is analysis data only."""
import sys,os,re,json,glob,shutil,subprocess
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
video=Path(sys.argv[1]);out=Path(sys.argv[2]);out.mkdir(parents=True,exist_ok=True)
NS=int(sys.argv[sys.argv.index('--sheet-frames')+1]) if '--sheet-frames' in sys.argv else 48
def run(a,**k):return subprocess.run(a,check=True,capture_output=True,**k)

probe=json.loads(run([FP,'-v','error','-show_streams','-show_format','-of','json',str(video)]).stdout)
v=[s for s in probe['streams'] if s['codec_type']=='video'][0];a=[s for s in probe['streams'] if s['codec_type']=='audio']
dur=float(probe['format']['duration']);fps=eval(v['avg_frame_rate'])
rep={'file':video.name,'duration_s':round(dur,2),'width':v['width'],'height':v['height'],'fps':round(fps,2),'video_codec':v['codec_name'],'audio':a[0]['codec_name'] if a else None,'bitrate_kbps':round(int(probe['format'].get('bit_rate',0))/1000)}

# shot cuts via ffmpeg scene score
p=subprocess.run([FF,'-v','info','-i',str(video),'-vf',"scale=320:-2,select='gt(scene,0.30)',showinfo",'-an','-f','null','-'],capture_output=True,text=True)
cuts=[float(m) for m in re.findall(r'pts_time:([0-9.]+)',p.stderr)]
bounds=[0]+cuts+[dur];shots=[round(b-a_,2) for a_,b in zip(bounds,bounds[1:])]
rep['cuts']={'count':len(cuts),'avg_shot_s':round(float(np.mean(shots)),2),'median_shot_s':round(float(np.median(shots)),2),'shortest_s':min(shots),'longest_s':max(shots),'first_cuts_s':[round(c,2) for c in cuts[:30]]}

# motion curve and luminance at 10 fps, 160x90 gray
W,H,R=160,90,10
raw=run([FF,'-v','error','-i',str(video),'-vf',f'fps={R},scale={W}:{H},format=gray','-f','rawvideo','-'],).stdout
fr=np.frombuffer(raw,np.uint8).reshape(-1,H,W).astype(np.float32)
lum=fr.mean(axis=(1,2));diff=np.abs(np.diff(fr,axis=0)).mean(axis=(1,2));diff=np.concatenate([[0],diff])
sm=np.convolve(diff,np.ones(5)/5,'same')
thr=sm.mean()+1.2*sm.std();peaks=[i for i in range(2,len(sm)-2) if sm[i]>thr and sm[i]>=sm[i-1] and sm[i]>=sm[i+1]]
sec=[round(float(diff[i*R:(i+1)*R].mean()),2) for i in range(int(dur))]
flash=[round(i/R,1) for i in range(1,len(lum)) if lum[i]-lum[i-1]>18]
rep['motion']={'mean_energy':round(float(diff.mean()),2),'p90_energy':round(float(np.percentile(diff,90)),2),'peaks_count':len(peaks),'top_peaks_s':[round(i/R,1) for i in sorted(peaks,key=lambda i:-sm[i])[:20]],'calm_seconds':int(sum(1 for s in sec if s<diff.mean()*.35)),'busy_seconds':int(sum(1 for s in sec if s>diff.mean()*1.6)),'per_second':sec}
rep['flashes']={'count':len(flash),'times_s':flash[:40]}

# audio onsets, bpm, loudness
if a:
    pcm=run([FF,'-v','error','-i',str(video),'-ac','1','-ar','16000','-f','s16le','-'],).stdout
    x=np.frombuffer(pcm,np.int16).astype(np.float32)/32768;hop=256;n=1024
    win=np.hanning(n);frames=[np.abs(np.fft.rfft(x[i:i+n]*win)) for i in range(0,len(x)-n,hop)]
    S=np.log1p(np.array(frames)*20);flux=np.maximum(0,np.diff(S,axis=0)).sum(axis=1);flux=np.concatenate([[0],flux]);flux=(flux-flux.mean())/(flux.std()+1e-9)
    fs=16000/hop;ons=[i for i in range(2,len(flux)-2) if flux[i]>2.0 and flux[i]>=flux[i-1] and flux[i]>=flux[i+1]]
    ons_t=[ons[0]/fs]+[ons[k]/fs for k in range(1,len(ons)) if (ons[k]-ons[k-1])/fs>0.12] if ons else []
    ac=np.correlate(flux-flux.mean(),flux-flux.mean(),'full')[len(flux)-1:];lags=np.arange(len(ac))/fs
    ok=(lags>60/200)&(lags<60/60);bpm=float(60/lags[ok][np.argmax(ac[ok])]) if ok.any() else None
    loud=[round(float(np.sqrt((x[i*16000:(i+1)*16000]**2).mean())),3) for i in range(int(dur))]
    rep['audio_analysis']={'onsets':len(ons_t),'onsets_per_s':round(len(ons_t)/dur,2),'bpm_estimate':round(bpm,1) if bpm else None,'rms_mean':round(float(np.mean(loud)),3),'silent_seconds':int(sum(1 for l in loud if l<0.01)),'loudest_s':[int(i) for i in np.argsort(loud)[-8:][::-1]],'first_onsets_s':[round(t,2) for t in ons_t[:30]]}

# palette from 24 sampled frames
cols=np.zeros((0,3))
for k in range(24):
    t=dur*(k+.5)/24;png=out/f'_p{k}.png';run([FF,'-y','-v','error','-ss',str(t),'-i',str(video),'-frames:v','1','-vf','scale=96:-2',str(png)])
    im=Image.open(png).convert('RGB').quantize(6).convert('RGB');cols=np.vstack([cols,np.asarray(im).reshape(-1,3)]);png.unlink()
vals,cnt=np.unique((cols//32*32+16).astype(int),axis=0,return_counts=True)
order=np.argsort(-cnt)[:8];tot=cnt.sum()
rep['palette']=[{'rgb':[int(c) for c in vals[i]],'hex':'#%02x%02x%02x'%tuple(int(c) for c in vals[i]),'share':round(float(cnt[i]/tot),3)} for i in order]

# contact sheets: uniform frames and first frame of each shot
def sheet(times,name,cols_n=8):
    tw,th=240,int(240*v['height']/v['width']);rows=(len(times)+cols_n-1)//cols_n
    im=Image.new('RGB',(cols_n*tw,rows*(th+14)),'#111');d=ImageDraw.Draw(im)
    for i,t in enumerate(times):
        png=out/f'_s{i}.png';run([FF,'-y','-v','error','-ss',str(max(0,t)),'-i',str(video),'-frames:v','1','-vf',f'scale={tw}:{th}',str(png)])
        f=Image.open(png).convert('RGB');x=i%cols_n*tw;y=i//cols_n*(th+14);im.paste(f,(x,y));d.text((x+3,y+th),f'{t:.1f}s',fill='#ddd');png.unlink()
    im.save(out/name,quality=88)
half=max(1,NS//2)
sheet([dur*(k+.5)/NS for k in range(half)],'sheet-1.jpg');sheet([dur*(k+.5)/NS for k in range(half,NS)],'sheet-2.jpg')
starts=[b for b in bounds[:-1]]
if len(starts)>40:starts=[starts[int(k*len(starts)/40)] for k in range(40)]
sheet([s+0.15 for s in starts],'shots.jpg')
(out/'report.json').write_text(json.dumps(rep,indent=1))
slim={k:v_ for k,v_ in rep.items() if k!='motion'};slim['motion']={k:v_ for k,v_ in rep['motion'].items() if k!='per_second'}
print(json.dumps(slim,indent=1))

"""Original local oscillator/noise soundtrack; no samples or providers."""
from pathlib import Path
import json
import wave
import numpy as np
SR=48000
DURATION=28
track=np.zeros((SR*DURATION,2),dtype=np.float64)
rng=np.random.default_rng(2031)
cues=[]
def add(start,signal,gain=.2,pan=0,name='tone'):
    at=round(start*SR);n=min(len(signal),len(track)-at)
    if n<=0:return
    track[at:at+n,0]+=signal[:n]*gain*np.sqrt((1-pan)/2)
    track[at:at+n,1]+=signal[:n]*gain*np.sqrt((1+pan)/2)
    cues.append({'event':name,'start_seconds':start,'frame':round(start*30),'duration_seconds':n/SR})
def pluck(freq,duration=.3):
    t=np.arange(round(SR*duration))/SR
    env=np.minimum(1,t/.004)*np.exp(-t*17)*(1-np.minimum(1,np.maximum(0,(t-duration+.025)/.025)))
    return (np.sin(2*np.pi*freq*t)+.22*np.sin(2*np.pi*freq*2.001*t))*env
def sweep(f0,f1,duration,decay):
    t=np.arange(round(SR*duration))/SR
    phase=2*np.pi*(f0*t+(f1-f0)*t*t/(2*duration))
    return np.sin(phase)*np.minimum(1,t/.004)*np.exp(-decay*t)
notes=[293.665,369.994,440,369.994,329.628,440,493.883,440]
for i in range(27):add(.2+i*.45,pluck(notes[i%8],.24),.045,(-.2 if i%2 else .2),'original_music')
for f in [50,180,225,257,289,650,810]:add(f/30,sweep(1500,900,.065,45),.23,.12,'tap')
for f,pan in [(76,.35),(206,.5),(251,-.55),(283,-.55),(315,.45),(715,0),(832,0)]:
    big=f==715;dur=.55 if big else .22;t=np.arange(round(SR*dur))/SR
    noise=np.convolve(rng.normal(0,1,len(t)),np.ones(13)/13,mode='same')
    sig=.8*sweep(105 if big else 220,46 if big else 95,dur,9 if big else 20)+noise*.25*np.exp(-t*24)
    add(f/30,sig,.5 if big else .23,pan,'large_box_land' if big else 'box_land')
    if f!=832:
        tt=np.arange(round(SR*.3))/SR
        whoosh=np.convolve(rng.normal(0,1,len(tt)),np.ones(21)/21,mode='same')*np.sin(np.pi*tt/.3)**2
        add(f/30-.34,whoosh,.16,pan,'box_flight')
for f in [510,790]:
    add(f/30,pluck(880,.25),.15,.1,'notification');add(f/30+.095,pluck(1174.659,.32),.11,.1,'notification_tail')
for dt,freq in [(0,587.33),(.12,739.99),(.24,880)]:add(340/30+dt,pluck(freq,.5),.13,-.1,'empty_screen_chime')
add(420/30,sweep(550,330,.24,12),.08,-.2,'realization')
for f,freq in [(578,440),(600,415.3),(625,392)]:add(f/30,pluck(freq,.3),.07,.1,'hesitation')
add(837/30,pluck(220,.1),.09,0,'last_reaction')
gain=.72/max(float(np.max(np.abs(track))),.001);track*=gain
track[:480]*=np.linspace(0,1,480)[:,None];track[-720:]*=np.linspace(1,0,720)[:,None]
out=Path(__file__).parent/'public';out.mkdir(exist_ok=True)
with wave.open(str(out/'soundtrack.wav'),'wb') as w:
    w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes((np.clip(track,-1,1)*32767).astype('<i2').tobytes())
data={'sample_rate':SR,'channels':2,'duration_seconds':DURATION,'peak_linear':float(np.max(np.abs(track))),'rms':float(np.sqrt(np.mean(track**2))),'all_original_synthesis':True,'seed':2031,'cues':cues,'perceptual_listening':'unverified; no audio listening tool available'}
(out/'audio-manifest.json').write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({k:v for k,v in data.items() if k!='cues'}))

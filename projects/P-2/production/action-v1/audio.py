"""Original synthesized Foley and small three-note finish motif; no external samples."""
from pathlib import Path
import numpy as np,wave,json
sr=48000;audio=np.zeros(sr*24);rng=np.random.default_rng(20261023)
def add(at,data,gain=1):
 start=round(at*sr);end=min(len(audio),start+len(data));audio[start:end]+=data[:end-start]*gain
def thump(at,amp=.16,freq=100):
 t=np.arange(round(.14*sr))/sr;add(at,(np.sin(2*np.pi*(freq*t-120*t*t))*np.exp(-t*26)+rng.normal(0,.25,len(t))*np.exp(-t*60))*amp)
def whoosh(at,duration=.25,amp=.055):
 t=np.arange(round(duration*sr))/sr;n=rng.normal(0,1,len(t));n=np.convolve(n,np.ones(9)/9,'same');add(at,n*np.sin(np.pi*t/duration)**2*amp)
for at in [0.5,1.3,2.7,3.05,4.25,5.65,8.8,9.4,10.15,12.15,14.1,14.8,15.3,16.15,17.05,20.6,21.4]:thump(at,.12)
for at in [3.0,4.8,5.4,10.9,11.45,12.0,17.1]:whoosh(at,.26,.11)
thump(3.2,.20,160);thump(19.5,.28,80);thump(22.5,.14,210)
for at,duration in [(6.0,2.7),(13,1.5),(16.6,1.8)]:whoosh(at,duration,.075)
whoosh(6.96,.35,.08);thump(7.4,.08,250)
for i,f in enumerate([523.25,659.25,783.99]):
 t=np.arange(round(.45*sr))/sr;add(20.2+i*.13,np.sin(2*np.pi*f*t)*np.exp(-t*9)*.055)
audio=np.tanh(audio*1.1);pcm=(audio*32767).astype('<i2');out=Path(__file__).resolve().parents[2]/'artifacts/render/action-v1';out.mkdir(parents=True,exist_ok=True)
with wave.open(str(out/'original-sfx.wav'),'wb') as w:w.setparams((1,2,sr,0,'NONE','not compressed'));w.writeframes(pcm.tobytes())
(out/'audio-provenance.json').write_text(json.dumps({'type':'original procedural Foley','sampleRate':sr,'durationSeconds':24,'seed':20261023,'externalSamples':False,'peak':float(np.max(np.abs(audio))),'script':'production/action-v1/audio.py'},indent=2),encoding='utf8')

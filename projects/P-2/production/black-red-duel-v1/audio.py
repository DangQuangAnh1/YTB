"""Adapt P-2 action-v1 original procedural Foley; no external samples/music."""
from pathlib import Path
import json,subprocess,wave
import numpy as np
base=Path(__file__).resolve().parent
out=base.parents[1]/'artifacts/render/black-red-duel-v1'
out.mkdir(parents=True,exist_ok=True)
events=json.loads(subprocess.check_output(['node','-e',"console.log(JSON.stringify(require('./motion.cjs').hits))"],cwd=base))
sr=48000; signal=np.zeros(sr*15);rng=np.random.default_rng(20261022)
def add(at,data):
 i=round(at*sr);j=min(len(signal),i+len(data))
 if j>i:signal[i:j]+=data[:j-i]
def thump(at,gain=.3,freq=100):
 t=np.arange(int(sr*.18))/sr
 add(at,gain*(np.sin(2*np.pi*(freq*t-90*t*t))*np.exp(-28*t)+rng.normal(0,.25,len(t))*np.exp(-55*t)))
def whoosh(at,d=.22,gain=.16):
 t=np.arange(int(sr*d))/sr;n=rng.normal(0,1,len(t));n=np.convolve(n,np.ones(13)/13,'same')
 add(at,n*np.sin(np.pi*t/d)**2*gain)
for h in events:
 f=h['f'];thump(f/30,.13 if h.get('soft') else .38,190 if h.get('soft') else 105)
 if not h.get('soft'):whoosh(max(0,(f-7)/30),.24,.25)
for f in [25,34,43,54,91,118,168,182,198,207,263,318,339,352,366]:thump(f/30,.075,160)
whoosh(3.35,.25,.18);whoosh(3.9,.40,.21);whoosh(5.1,.65,.17);whoosh(7,.25,.18)
thump(168/30,.28,68)
signal=np.tanh(signal)*.9
pcm=(signal*32767).astype('<i2')
with wave.open(str(out/'original-sfx.wav'),'wb') as w:
 w.setnchannels(1);w.setsampwidth(2);w.setframerate(sr);w.writeframes(pcm.tobytes())
(out/'audio-provenance.json').write_text(json.dumps({'source':'original procedural Foley adapted from P-2 action-v1/audio.py','seed':20261022,'sample_rate':sr,'duration':15,'external_samples':False,'shared_impact_frames':events,'peak':float(np.abs(signal).max()),'rms':float(np.sqrt(np.mean(signal**2)))},indent=2))

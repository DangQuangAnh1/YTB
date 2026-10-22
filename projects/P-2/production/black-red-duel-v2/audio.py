"""Adapt P-2 action-v1 original procedural Foley; no external samples/music."""
from pathlib import Path
import json,subprocess,wave
import numpy as np
base=Path(__file__).resolve().parent
out=base.parents[1]/'artifacts/render/black-red-duel-v2'
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
for f in [8,16,24,32,130,165,254,282,293,304,392]:thump(f/30,.065,150)
whoosh(3.6,.20,.10);whoosh(8.25,.35,.10)
thump(263/30,.15,85)
signal=np.tanh(signal)*.9
pcm=(signal*32767).astype('<i2')
with wave.open(str(out/'original-sfx.wav'),'wb') as w:
 w.setnchannels(1);w.setsampwidth(2);w.setframerate(sr);w.writeframes(pcm.tobytes())
(out/'audio-provenance.json').write_text(json.dumps({'source':'original procedural Foley adapted from P-2 action-v1/audio.py','seed':20261022,'sample_rate':sr,'duration':15,'external_samples':False,'shared_impact_frames':events,'peak':float(np.abs(signal).max()),'rms':float(np.sqrt(np.mean(signal**2)))},indent=2))

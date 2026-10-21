"""Original procedural SFX, no speech or third-party samples."""
from pathlib import Path
import wave
import numpy as np

p=Path(__file__).resolve().parents[2]/'artifacts/audio/charger-sfx-v1.wav'
sr=48000
audio=np.zeros((19*sr,2),dtype=np.float64)
rng=np.random.default_rng(921)
def tone(at,duration,f0,f1,gain=.1,noise=0):
 t=np.arange(int(duration*sr))/sr
 phase=2*np.pi*(f0*t+(f1-f0)*t*t/(2*duration))
 env=np.sin(np.pi*np.minimum(t/.01,1)/2)*np.exp(-t/(duration*.32))
 x=(np.sin(phase)+noise*rng.normal(0,1,len(t)))*env*gain
 start=int(at*sr);n=min(len(x),len(audio)-start)
 audio[start:start+n]+=x[:n,None]
for at in [.55,1.0]:
 tone(at,.16,780,620,.055);tone(at+.2,.12,780,620,.045)
tone(3.3,.07,950,300,.07,.1)
for at in [5.3,6.2,7.1,8.0]:tone(at,.25,230,510,.055,.12)
tone(8.55,.25,500,1000,.065)
for at in [9.95,11.55]:tone(at,.06,1050,340,.07,.4)
for at in [10.65,12.0]:
 tone(at,.17,310,270,.07);tone(at+.2,.18,270,210,.06)
tone(14.8,.7,620,95,.095,.05)
tone(17.35,.06,700,180,.045,.5)
peak=float(np.max(np.abs(audio)))
if peak>.9:audio*=.9/peak
p.parent.mkdir(parents=True,exist_ok=True)
with wave.open(str(p),'wb') as f:
 f.setnchannels(2);f.setsampwidth(2);f.setframerate(sr);f.writeframes((audio*32767).astype('<i2').tobytes())
print('Original SFX:',p,'peak',peak)

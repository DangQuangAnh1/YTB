"""Original procedural SFX and music for The Final Counter; no external samples or music."""
from pathlib import Path
import json,subprocess,wave,os
import numpy as np
base=Path(__file__).resolve().parent
out=Path(os.environ['P2_OUT']) if os.environ.get('P2_OUT') else base.parents[1]/'artifacts/render/final-counter-v1'
out.mkdir(parents=True,exist_ok=True)
ev=json.loads(subprocess.check_output(['node','-e',"""
const E=require('./events.cjs'),F=require('./fight.cjs');
console.log(JSON.stringify({hits:E.HITS.map(h=>({t:h.outT,kind:h.kind,power:h.power})),
 whoosh:E.WHOOSH.map(w=>({t:F.outAt(w.simT),len:w.len*(w.simT>6.9&&w.simT<7.4?4:1),gain:w.gain,kind:w.kind||'w'})),
 foley:E.FOLEY.map(f=>({t:F.outAt(f.simT),kind:f.kind,power:f.power||1,len:f.len||0})),
 slow:[F.outAt(F.SLOW.t0),F.outAt(F.SLOW.t1)]}))"""],cwd=base))
KEN=os.environ.get('SFX_SET')=='kenney';SUF='-kenney' if KEN else ''
def smp(name):
    w=wave.open(str(base/'sfx'/(name+'.wav')));x=np.frombuffer(w.readframes(w.getnframes()),'<i2').astype(float)/32768;return x
SR=48000;DUR=15.0;N=int(SR*DUR);SEED=20261022
rng=np.random.default_rng(SEED)
sfx=np.zeros(N);mus=np.zeros(N)
def put(buf,at,data,gain=1.0):
    i=int(at*SR);j=min(N,i+len(data))
    if i<N and j>i:buf[i:j]+=data[:j-i]*gain
def t_(d):return np.arange(int(SR*d))/SR
def lp(x,fc):
    a=np.exp(-2*np.pi*fc/SR);y=np.empty_like(x);s=0.0
    for i,v in enumerate(x):s=(1-a)*v+a*s;y[i]=s
    return y
def hp(x,fc):return x-lp(x,fc)
def sweep_noise(d,f0,f1,q=1.0):
    n=rng.normal(0,1,int(SR*d));y=np.empty_like(n);s1=s2=0.0
    for i in range(len(n)):
        fc=f0+(f1-f0)*i/len(n);a=np.exp(-2*np.pi*fc/SR);s1=(1-a)*n[i]+a*s1;s2=(1-a)*s1+a*s2;y[i]=s1-s2
    y/=np.max(np.abs(y))+1e-9;return y
def env(d,att,rel,power=2):
    t=t_(d);e=np.minimum(1,t/max(att,1e-4))*np.exp(-(t/ max(rel,1e-3))**1*power/ max(d,1e-3))
    return e
def whoosh(at,d,gain,rising=True):
    d=max(d,.12);w=sweep_noise(d,300,3200) if rising else sweep_noise(d,3200,300)
    t=t_(d);e=np.sin(np.pi*np.clip(t/d,0,1))**1.6
    put(sfx,at,w*e,gain*.55)
def thump(at,gain,f0=130,f1=48,d=.32,click=.5):
    t=t_(d);ph=2*np.pi*(f1*t+(f0-f1)*(1-np.exp(-t*28))/28)
    body=np.sin(ph)*np.exp(-t*11)
    nz=hp(rng.normal(0,1,len(t)),900)*np.exp(-t*60)*click
    put(sfx,at,body+nz,gain)
def clang(at,gain):
    t=t_(.55);y=np.zeros(len(t))
    for f,a in ((920,1),(1480,.7),(2210,.5),(3170,.35),(4100,.2)):
        y+=a*np.sin(2*np.pi*f*t*(1+rng.normal(0,.003)))*np.exp(-t*(9+f/500))
    put(sfx,at,y*.5,gain)
def boom(at,gain,d=1.6):
    t=t_(d);y=np.sin(2*np.pi*(38+60*np.exp(-t*7))*t)*np.exp(-t*2.6)
    cr=hp(rng.normal(0,1,len(t)),400)*np.exp(-t*7)*.5
    put(sfx,at,y+cr,gain)
    for k,(dl,g) in enumerate(((.07,.45),(.15,.3),(.27,.2))):put(sfx,at+dl,lp(y+cr,2400)[:int(SR*(d-.3))]*g,gain*.6)
def dust(at,d,gain):
    n=lp(rng.normal(0,1,int(SR*d)),1800);put(sfx,at,n*np.sin(np.pi*np.clip(t_(d)/d,0,1))**2,gain)
def heartbeat(at,gain):
    thump(at,gain,95,42,.28,.1);thump(at+.2,gain*.7,88,40,.25,.1)
# --- SFX from events ---
for h in ev['hits']:
    p=h['power'];k=h['kind']
    if KEN:
        put(sfx,h['t'],smp({'punch':'punch_medium','block':'metal_medium' if p<1 else 'metal_heavy','final':'punch_heavy'}[k]),.8 if k=='block' else 1.0);p*=.5
    if k=='punch':thump(h['t'],.7*p,150,50,.3,.7);put(sfx,h['t'],hp(rng.normal(0,1,int(SR*.07)),1500)*np.exp(-t_(.07)*55),.5)
    elif k=='block':clang(h['t'],.5*p);thump(h['t'],.4*p,120,55)
    elif k=='final':boom(h['t'],.95);thump(h['t'],.8,140,40,.5,.9);clang(h['t'],.25)
for w in ev['whoosh']:whoosh(w['t'],w['len']*(1.4 if w['kind']=='dash' else 1),w['gain'],rising=w['kind']!='fly')
for f in ev['foley']:
    if KEN and f['kind']=='land':put(sfx,f['t'],smp('soft_heavy' if f['power']>1 else 'step'),.7)
    if f['kind']=='jump':dust(f['t'],.18,.12);thump(f['t'],.2,110,60,.2,.1)
    elif f['kind']=='land':thump(f['t'],.5*f['power'],100,45,.35,.2);dust(f['t'],.3,.18*f['power'])
    elif f['kind']=='slide':dust(f['t'],f['len'],.22)
s0,s1=ev['slow']
for bt in np.arange(s0+.1,s1-.2,.62):heartbeat(bt,.5)
put(sfx,s1-.9,sweep_noise(.9,200,5200)*np.linspace(0,1,int(SR*.9))**2,.55)
# --- music ---
BPM=140;beat=60/BPM;step=beat/4
def saw(f,d):
    t=t_(d);y=np.zeros(len(t))
    for h in range(1,12):y+=np.sin(2*np.pi*f*h*t)/h
    return y/1.9
def note(buf,at,f,d,gain,cut,kind='saw'):
    if kind=='saw':y=saw(f,d)
    else:y=np.sin(2*np.pi*f*t_(d))
    t=t_(d);y=y*np.minimum(1,t/.006)*np.exp(-t*(5 if kind=='saw' else 2.2))
    put(buf,at,lp(y,cut) if cut else y,gain)
def kick(at,g=1):
    t=t_(.3);ph=2*np.pi*(46*t+90*(1-np.exp(-t*30))/30);put(mus,at,np.sin(ph)*np.exp(-t*9),.55*g)
def snare(at,g=1):
    t=t_(.22);put(mus,at,(hp(rng.normal(0,1,len(t)),1500)*np.exp(-t*20)*.6+np.sin(2*np.pi*190*t)*np.exp(-t*30)*.4),.32*g)
def hat(at,g=1):
    t=t_(.05);put(mus,at,hp(rng.normal(0,1,len(t)),6500)*np.exp(-t*80),.1*g)
ROOT=55.0;prog=[0,0,3,5];scale=[0,3,5,7,10,12]
drum_end=s0-.05
for bar in range(0,6):
    b0=bar*16*step
    if b0>=drum_end:break
    root=ROOT*2**(prog[bar%4]/12)
    for s in range(16):
        at=b0+s*step
        if at>=drum_end:break
        if s%4==0:kick(at)
        if s in(4,12):snare(at)
        if s%2==0:hat(at,.8 if s%4 else 1)
        if s in(0,3,6,8,11,14):note(mus,at,root*(2 if s in(6,14) else 1),step*1.8,.34,420+bar*140,'saw')
        f=root*4*2**(scale[(s*3+bar)%6]/12)
        if s%2==1:note(mus,at,f,step*1.4,.1,2200+bar*500,'saw')
# slow-mo section: low pad
for i,f in enumerate((ROOT*2,ROOT*2*2**(3/12),ROOT*2*2**(7/12))):
    d=s1-s0+.5;t=t_(d);y=np.sin(2*np.pi*f*t)*np.sin(np.pi*np.clip(t/d,0,1))**1.5;put(mus,s0-.1,y,.16)
# post-impact drone and victory
hit=ev['hits'][-1]['t']
t=t_(2.6);put(mus,hit+.05,np.sin(2*np.pi*ROOT*t)*np.exp(-t*1.3)*.3,1)
win=12.8
for i,m in enumerate((0,4,7,12,16)):
    f=220*2**(m/12);d=1.6-i*.12;t=t_(d);y=(np.sin(2*np.pi*f*t)+.4*np.sin(2*np.pi*f*2*t))*np.minimum(1,t/.01)*np.exp(-t*2.2);put(sfx,win+i*.07,y,.14)
t=t_(1.9);put(mus,win,sweep_noise(1.9,1500,9000)*np.exp(-t*2.4),.1)
for i,f in enumerate((ROOT*4,ROOT*4*2**(7/12),ROOT*8)):
    d=2.3;t=t_(d);put(mus,win-.05,np.sin(2*np.pi*f*t)*np.exp(-t*1.1)*.12,1)
# sidechain duck
duck=np.ones(N)
for h in ev['hits']:
    i=int(h['t']*SR);n=int(SR*.5);seg=np.arange(n)/SR;duck[i:i+n]*=1-.7*np.exp(-seg/.14)[:max(0,min(n,N-i))]
mus*=duck
fade=np.ones(N);fi=int(SR*.02);fo=int(SR*.12);fade[:fi]=np.linspace(0,1,fi);fade[-fo:]=np.linspace(1,0,fo)
mix=(mus*.8+sfx)*fade
rms0=np.sqrt(np.mean(mix**2));mix=np.tanh(mix*(.15/max(rms0,1e-9)))
mix*=.89/np.max(np.abs(mix))
pcm=(mix*32767).astype('<i2')
wav=out/('original-audio'+SUF+'.wav')
with wave.open(str(wav),'wb') as w:
    w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes(pcm.tobytes())
rms=float(np.sqrt(np.mean(mix**2)))
(out/('audio-provenance'+SUF+'.json')).write_text(json.dumps({'source':('procedural synthesis (numpy) plus a CC0 Kenney Impact Sounds subset' if KEN else 'original procedural synthesis (numpy); no external samples or music'),'seed':SEED,'sample_rate':SR,'duration':DUR,'bpm':BPM,'external_samples':KEN,'sample_source':'Kenney Impact Sounds 1.0, CC0, subset in sfx/' if KEN else None,'peak':float(np.max(np.abs(mix))),'rms':rms,'events':ev,'note':'Levels checked numerically only; no listening judgment.'},indent=1))
print('wrote',wav,'peak %.3f rms %.3f'%(np.max(np.abs(mix)),rms))

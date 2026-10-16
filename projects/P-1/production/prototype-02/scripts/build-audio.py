from pathlib import Path
import wave,json,hashlib
import numpy as np
from piper import PiperVoice,SynthesisConfig
p=Path(__file__).resolve().parents[3]
m=p/'media/prototype-02'
v=PiperVoice.load('/home/bss-group/.cache/creator-agency/voices/vais1000-medium/vi_VN-vais1000-medium.onnx')
lines=[('hook',0.15,'Khi bạn hỏi thăm mẹ, nhưng mẹ lại quá bình tĩnh.'),('bridge',7.3,'Xuống bình luận, còn có mẹ hệ game.'),('end',14.0,'Bà ngoại hồi đầy máu, sẵn sàng vào trận.')]
segments=[]; rate=22050; mix=np.zeros(18*rate,dtype=np.float32)
for name,start,text in lines:
    dest=m/(name+'.wav')
    with wave.open(str(dest),'wb') as f:v.synthesize_wav(text,f,SynthesisConfig(length_scale=.94,volume=.86))
    with wave.open(str(dest),'rb') as f: a=np.frombuffer(f.readframes(f.getnframes()),dtype=np.int16).astype(np.float32)/32768
    assert start+len(a)/rate<18,(name,len(a)/rate)
    i=round(start*rate);mix[i:i+len(a)]+=a
    segments.append(dict(name=name,start=start,duration=len(a)/rate,text=text))
# Original soft arcade recovery sound; no external soundtrack.
for st,freq in [(12.0,523.25),(12.12,659.25),(12.24,783.99),(12.36,1046.5)]:
    t=np.arange(int(.16*rate))/rate; a=.09*np.sin(2*np.pi*freq*t)*np.sin(np.pi*t/.16)**2
    i=round(st*rate);mix[i:i+len(a)]+=a
with wave.open(str(m/'mix.wav'),'wb') as f:
    f.setparams((1,2,rate,0,'NONE','not compressed'));f.writeframes((np.clip(mix,-1,1)*32767).astype(np.int16).tobytes())
(m/'audio-timings.json').write_text(json.dumps(segments,ensure_ascii=False,indent=2))
(p/'artifacts/content/prototype-02-script-v1.json').write_text(json.dumps({'duration':18,'language':'vi','segments':segments,'caption_format':'Remotion Caption','creative':'actual chat post to Full HP comment; original reaction framing, no truth claim about chat event','voice':'Piper vi_VN-vais1000-medium, length_scale .94; acceptance pending','sources':['https://www.threads.com/@biu_sub70/post/DegajokEbO2','https://www.threads.com/@nhtp.1907_/post/DegbtOsGB1G']},ensure_ascii=False,indent=2))
print(json.dumps(segments,ensure_ascii=False)); print('peak',float(abs(mix).max()))

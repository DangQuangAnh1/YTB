from pathlib import Path
import json,wave
import numpy as np
from faster_whisper import WhisperModel
p=Path(__file__).resolve().parents[2]/'artifacts/audio/voice-audition-v1'
model=WhisperModel('small',device='cpu',compute_type='int8',cpu_threads=4,download_root='/home/bss-group/.cache/creator-agency/asr',local_files_only=True)
checks=[]
for f in sorted(p.glob('voice-*.wav')):
 with wave.open(str(f),'rb') as w:
  samples=np.frombuffer(w.readframes(w.getnframes()),dtype=np.int16).astype(float)/32768
  info={'file':f.name,'duration':len(samples)/w.getframerate(),'sample_rate':w.getframerate(),'channels':w.getnchannels(),'sample_width':w.getsampwidth(),'peak':float(abs(samples).max()),'rms':float(np.sqrt(np.mean(samples*samples))),'finite':bool(np.isfinite(samples).all())}
 s,_=model.transcribe(str(f),language='vi',beam_size=3,vad_filter=True)
 info['asr']=[{'start':x.start,'end':x.end,'text':x.text} for x in s]
 checks.append(info); print(json.dumps(info,ensure_ascii=False),flush=True)
(p/'qa.json').write_text(json.dumps({'mode':'technical decode and ASR, not listening review','human_acceptance':'pending','checks':checks},ensure_ascii=False,indent=2))

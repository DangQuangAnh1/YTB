from pathlib import Path
import json,time,hashlib
import numpy as np
from vieneu import Vieneu
p=Path(__file__).resolve().parents[2]
out=p/'artifacts/audio/voice-audition-v1'
out.mkdir(parents=True,exist_ok=True)
text='Khi bạn hỏi thăm mẹ, nhưng mẹ lại quá bình tĩnh. Xuống bình luận, còn có mẹ hệ game. Mẹ trả lời: Rồi. Full HP! Bà ngoại hồi đầy máu, sẵn sàng vào trận.'
print('Loading local CPU model...',flush=True)
tts=Vieneu(mode='v3turbo',backend='onnx',device='cpu',precision='fp32',threads=4)
voices=tts.list_preset_voices(); print('VOICES',json.dumps(voices,ensure_ascii=False),flush=True)
choices=['Thiện Minh','Trúc Ly','Adam bựa']
voice_ids=[v[1] for v in voices]
for x in choices: assert x in voice_ids,(x,voice_ids)
records=[]
for index,voice in enumerate(choices,1):
 dest=out/f'voice-{index}.wav'
 assert not dest.exists(),'Do not overwrite prior samples'
 start=time.monotonic(); audio=tts.infer(text,voice=voice,temperature=.8,max_new_frames=700)
 tts.save(audio,str(dest))
 record={'file':str(dest.relative_to(p)),'preset':voice,'seconds':len(audio)/tts.sample_rate,'sample_rate':tts.sample_rate,'peak':float(np.max(np.abs(audio))),'rms':float(np.sqrt(np.mean(audio*audio))),'generation_seconds':round(time.monotonic()-start,2),'sha256':hashlib.sha256(dest.read_bytes()).hexdigest()}
 records.append(record); print('SAVED',json.dumps(record,ensure_ascii=False),flush=True)
 (out/'manifest.partial.json').write_text(json.dumps(records,ensure_ascii=False,indent=2))
manifest={'sdk':'vieneu 3.8.3','model':'pnnbao-ump/VieNeu-TTS-v3-Turbo','backend':'ONNX CPU fp32, 4 threads','text':text,'samples':records,'cost_added':0,'rights_source':'https://huggingface.co/pnnbao-ump/VieNeu-TTS-v3-Turbo#-usage-rights--licensing-faq','source_author':'Phạm Nguyễn Ngọc Bảo / pnnbao97; MOSS codec OpenMOSS-Team','license':'Apache-2.0 per publisher model card, including shipped presets and commercial synthetic output','cloning':'No custom reference or voice cloning; built-in presets only','acceptance':'Human listening review pending'}
(out/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2))

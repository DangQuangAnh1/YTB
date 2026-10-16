from faster_whisper import WhisperModel
from pathlib import Path
import json
p=Path(__file__).resolve().parents[3]/'artifacts/render/prototype-02-v1'
m=WhisperModel('small',device='cpu',compute_type='int8',cpu_threads=4,download_root='/home/bss-group/.cache/creator-agency/asr',local_files_only=True)
s,info=m.transcribe(str(p/'draft.mp4'),language='vi',beam_size=3,vad_filter=True)
items=[dict(start=x.start,end=x.end,text=x.text) for x in s]
(p/'asr-check.json').write_text(json.dumps({'tool':'faster-whisper small CPU int8','not_listening_review':True,'segments':items},ensure_ascii=False,indent=2));print(json.dumps(items,ensure_ascii=False))

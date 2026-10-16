"""Generate new Thiện Minh clips; never recreate registered old files."""
from pathlib import Path
import hashlib
import json
import wave
from vieneu import Vieneu

root = Path(__file__).resolve().parents[2]
out = root / 'media/prototype-03'
out.mkdir(parents=True, exist_ok=True)
tts = Vieneu(mode='v3turbo', backend='onnx', device='cpu', precision='fp32', threads=4)
voices = tts.list_preset_voices()
assert 'Thiện Minh' in [v[1] for v in voices], voices
lines = [('hook', 'Khi bạn hỏi thăm mẹ, nhưng mẹ lại quá bình tĩnh.', 6.8),
         ('bridge', 'Xuống bình luận, còn có mẹ hệ game.', 4.4),
         ('end', 'Bà ngoại hồi đầy máu, sẵn sàng vào trận.', 3.9)]
records = []
for name, text, limit in lines:
    dest = out / (name + '.wav')
    if dest.exists():
        raise RuntimeError('Output exists; preserve prior generation: ' + str(dest))
    samples = tts.infer(text, voice='Thiện Minh', temperature=.8, max_new_frames=700)
    tts.save(samples, str(dest))
    with wave.open(str(dest)) as audio:
        duration = audio.getnframes() / audio.getframerate()
    records.append({'file':dest.name, 'text':text, 'duration':duration,
                    'fits_slot':duration <= limit, 'sha256':hashlib.sha256(dest.read_bytes()).hexdigest()})
    print(json.dumps(records[-1], ensure_ascii=False), flush=True)
(out/'audio-manifest.json').write_text(json.dumps({'voice':'Thiện Minh','sdk':'vieneu 3.8.3',
    'samples':records,'human_listening':'unverified','added_provider_spend':0},ensure_ascii=False,indent=2),encoding='utf-8')
assert all(r['fits_slot'] for r in records), 'Audio exceeds timeline; revise timing before render'

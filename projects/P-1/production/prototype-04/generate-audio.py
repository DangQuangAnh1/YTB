"""Generate new Thiện Minh clips; never recreate registered old files."""
from pathlib import Path
import hashlib
import json
import wave
from vieneu import Vieneu

root = Path(__file__).resolve().parents[2]
out = root / 'media/prototype-04'
out.mkdir(parents=True, exist_ok=True)
tts = Vieneu(mode='v3turbo', backend='onnx', device='cpu', precision='fp32', threads=4)
voices = tts.list_preset_voices()
assert 'Thiện Minh' in [v[1] for v in voices], voices
lines = [('q1', 'Lũ lên nhà mình có sao không mẹ?', 5),
         ('a1', 'Chết ba con gà.', 4),
         ('q2', 'Nước ngập vào chuồng hả mẹ?', 4),
         ('a2', 'Thịt ra nấu lẩu!', 4),
         ('q3', 'Bà ngoại khỏe chưa mẹ?', 4),
         ('a3', 'Rồi.', 2),
         ('a4', 'Full H P!', 3)]
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

"""Voice each line with Thiện Minh; per-line cache keyed by text hash (pr-brainrot pattern)."""
from pathlib import Path
import hashlib
import json
import wave
from vieneu import Vieneu

here = Path(__file__).resolve().parent
root = here.parents[1]
out = root / 'media/prototype-06/voice'
out.mkdir(parents=True, exist_ok=True)
spec = json.loads((here / 'lines.json').read_text(encoding='utf-8'))
tts = None
records = []
for line in spec['lines']:
    key = hashlib.sha256((spec['voice'] + '|' + line['text']).encode()).hexdigest()[:12]
    dest = out / f"{line['id']}-{key}.wav"
    if not dest.exists():
        if tts is None:
            tts = Vieneu(mode='v3turbo', backend='onnx', device='cpu', precision='fp32', threads=4)
            assert spec['voice'] in [v[1] for v in tts.list_preset_voices()]
        samples = tts.infer(line['text'], voice=spec['voice'], temperature=.8, max_new_frames=900)
        tts.save(samples, str(dest))
    with wave.open(str(dest)) as audio:
        duration = audio.getnframes() / audio.getframerate()
    records.append({'id': line['id'], 'file': dest.name, 'text': line['text'], 'duration': round(duration, 3),
                    'sha256': hashlib.sha256(dest.read_bytes()).hexdigest()})
    print(json.dumps(records[-1], ensure_ascii=False), flush=True)
(out / 'audio-manifest.json').write_text(json.dumps({'voice': spec['voice'], 'sdk': 'vieneu 3.8.3', 'samples': records,
    'human_listening': 'unverified', 'added_provider_spend': 0}, ensure_ascii=False, indent=2), encoding='utf-8')

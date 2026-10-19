"""Objective proxies (not a substitute for listening): whisper word error rate vs script,
speech rate, and pitch variability (expressiveness) per audition clip."""
import json, re, sys, unicodedata
from pathlib import Path
import numpy as np, librosa

A = Path(__file__).resolve().parents[2] / 'media/voice-audition-moods'
norm = lambda s: [w for w in re.sub(r'[^\w\s]', ' ', unicodedata.normalize('NFC', s.lower())).split() if w]
def wer(ref, hyp):
    d = np.arange(len(hyp) + 1)
    for i, r in enumerate(ref, 1):
        prev, d[0] = d.copy(), i
        for j, h in enumerate(hyp, 1):
            d[j] = min(prev[j] + 1, d[j - 1] + 1, prev[j - 1] + (r != h))
    return d[-1] / len(ref)
rows = []
for r in json.loads((A / 'manifest.json').read_text(encoding='utf-8'))['records']:
    heard = ' '.join(h['w'] for h in json.loads((A / 'align' / (r['file'][:-4] + '.json')).read_text(encoding='utf-8'))['heard'])
    y, sr = librosa.load(A / r['file'], sr=16000)
    f0, voiced, _ = librosa.pyin(y, fmin=70, fmax=400, sr=sr)
    f0 = f0[voiced & ~np.isnan(f0)]
    semis = 12 * np.log2(f0 / np.median(f0))
    rows.append({**{k: r[k] for k in ('mood', 'voice', 'duration')}, 'wer': round(wer(norm(r['text']), norm(heard)), 3),
                 'syll_per_s': round(len(norm(r['text'])) / r['duration'], 2), 'pitch_median_hz': round(float(np.median(f0)), 1),
                 'pitch_sd_semitones': round(float(np.std(semis)), 2), 'heard': heard})
(A / 'scores.json').write_text(json.dumps(rows, ensure_ascii=False, indent=1), encoding='utf-8')
for x in sorted(rows, key=lambda x: (x['mood'], x['wer'])):
    print(f"{x['mood']:5} {x['voice']:12} WER {x['wer']:.2f}  {x['syll_per_s']:.1f} âm/s  F0 {x['pitch_median_hz']:5.0f}Hz  ±{x['pitch_sd_semitones']:.1f}st | {x['heard'][:70]}")

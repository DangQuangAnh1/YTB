"""Voice an episode with the mood preset's VieNeu voice.

Clips are cached per line, keyed by a hash of voice, temperature and text (the pr-brainrot pattern),
so editing one line re-voices only that line. The preset tempo (for example 1.1×) is applied afterwards
as a pitch-preserving ffmpeg atempo stretch, because VieNeu v3 Turbo has no speed control.
Takes are adaptive (2026-10-19 speed-up): every line is voiced once and scored with whisper.cpp; another take is
voiced only while the heard text has more errors than one per 12 words, up to `takes` (default 3). The best take
is kept. Digits in the heard text are spelled out before scoring, so "19" matches "mười chín". The whisper
alignment of each scored take is cached in media/<m>/align/, which build-timeline reuses instead of re-running whisper.
This is an intelligibility proxy, not a substitute for listening.

Multi-voice episodes (user feedback 2026-10-18, tasks/user-feedback-multivoice-v1.md) set `cast`, a map from
speaker to preset voice. A line's speaker is its `speaker` field, else "narrator" for bridges, else the handle in
its card name ("c1a-user123" -> "user123"). Unlisted speakers and the narrator fall back to the preset voice.
In a cast episode every clip is levelled to -20 LUFS so voices with different gain sit together in the mix.

Usage: generate-audio.py <episode_dir>
"""
from pathlib import Path
import hashlib
import json
import re
import shutil
import subprocess
import sys
import tempfile
import unicodedata
import wave
import imageio_ffmpeg
from vieneu import Vieneu

here = Path(__file__).resolve().parent
episode = Path(sys.argv[1]).resolve()
spec = json.loads((episode / 'lines.json').read_text(encoding='utf-8'))
preset = json.loads((here / 'mood-presets.json').read_text(encoding='utf-8'))['presets'][spec['mood']]
tts_cfg = {**preset['tts'], **spec.get('tts', {})}
voice, temperature, tempo = tts_cfg['voice'], tts_cfg['temperature'], tts_cfg.get('tempo', 1.0)
cast = spec.get('cast') or {}
LEVEL = 'I=-20:TP=-2:LRA=11'
full_ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()  # Remotion's bundled ffmpeg lacks loudnorm
ffmpeg = str(here / 'node_modules/@remotion/compositor-win32-x64-msvc/ffmpeg.exe')
media = here.parents[1] / 'media' / spec['media']
out = media / 'voice'
out.mkdir(parents=True, exist_ok=True)
tts = None
whisper_dir = here.parent / 'tools-whisper'


DIGITS = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín']


def num2vi(n):
    """Vietnamese reading of 0–9999, enough to compare whisper's digits with a spelled-out script."""
    if n < 10:
        return DIGITS[n]
    if n < 20:
        return 'mười ' + ('lăm' if n % 10 == 5 else DIGITS[n % 10]) if n % 10 else 'mười'
    if n < 100:
        u = n % 10
        tail = '' if u == 0 else ' ' + ('mốt' if u == 1 else 'lăm' if u == 5 else DIGITS[u])
        return DIGITS[n // 10] + ' mươi' + tail
    if n < 1000:
        r = n % 100
        return DIGITS[n // 100] + ' trăm' + ('' if r == 0 else (' lẻ ' + DIGITS[r] if r < 10 else ' ' + num2vi(r)))
    r = n % 1000
    return num2vi(n // 1000) + ' nghìn' + ('' if r == 0 else ' ' + num2vi(r))


def norm(s):
    s = re.sub(r'\d+', lambda m: ' ' + num2vi(int(m.group())) + ' ' if len(m.group()) <= 4 else m.group(), unicodedata.normalize('NFC', s.lower()))
    return [w for w in re.sub(r'[^\w\s]', ' ', s).split() if w]


def wer(ref, hyp):
    d = list(range(len(hyp) + 1))
    for i, r in enumerate(ref, 1):
        prev, d[0] = d[:], i
        for j, h in enumerate(hyp, 1):
            d[j] = min(prev[j] + 1, d[j - 1] + 1, prev[j - 1] + (r != h))
    return d[-1] / max(1, len(ref))


def heard_wer(wav, text):
    """Whisper.cpp intelligibility proxy for one take (ASCII temp copy: whisper-cli rejects non-ASCII paths)."""
    cache = media / 'align' / f'{wav.stem}.json'   # same file build-timeline reads for caption timing
    if not cache.exists():
        cache.parent.mkdir(parents=True, exist_ok=True)
        with tempfile.TemporaryDirectory() as tmp:
            shutil.copy(wav, Path(tmp) / 'take.wav')
            subprocess.run(['node', 'align.mjs', str(Path(tmp) / 'take.wav'), text, str(Path(tmp) / 'take.json'), ffmpeg],
                           cwd=whisper_dir, check=True, capture_output=True)
            shutil.copy(Path(tmp) / 'take.json', cache)
    heard = ' '.join(h['w'] for h in json.loads(cache.read_text(encoding='utf-8'))['heard'])
    return wer(norm(text), norm(heard)), heard


def speaker_of(line):
    if line.get('speaker'):
        return line['speaker']
    if line.get('kind') == 'bridge':
        return 'narrator'
    return line['card'].split('-', 1)[1] if '-' in line.get('card', '') else 'narrator'


def level(src):
    """Two-pass linear loudnorm of one clip to -20 LUFS (cast episodes only)."""
    dest = src.with_name(f'{src.stem}-L20.wav')
    if not dest.exists():
        with wave.open(str(src)) as w:
            rate = w.getframerate()
        probe = subprocess.run([full_ffmpeg, '-hide_banner', '-i', str(src), '-af', f'loudnorm={LEVEL}:print_format=json', '-f', 'null', '-'],
                               capture_output=True, text=True).stderr
        m = json.loads(re.findall(r'\{[^{}]*"input_i"[^{}]*\}', probe)[-1])
        try:
            subprocess.run([full_ffmpeg, '-y', '-v', 'error', '-i', str(src), '-af',
                            f"loudnorm={LEVEL}:measured_I={m['input_i']}:measured_TP={m['input_tp']}:measured_LRA={m['input_lra']}"
                            f":measured_thresh={m['input_thresh']}:offset={m['target_offset']}:linear=true", '-ar', str(rate), str(dest)], check=True)
        except subprocess.CalledProcessError:
            # One-syllable clips ("Bao!") are too short for loudnorm: measure on a silence-padded copy (the EBU gate
            # ignores the padding), then apply a plain gain with a limiter.
            probe = subprocess.run([full_ffmpeg, '-hide_banner', '-i', str(src), '-af', f'apad=whole_dur=3,loudnorm={LEVEL}:print_format=json',
                                    '-f', 'null', '-'], capture_output=True, text=True).stderr
            i = float(json.loads(re.findall(r'\{[^{}]*"input_i"[^{}]*\}', probe)[-1])['input_i'])
            gain = max(-12.0, min(12.0, -20.0 - i)) if i > -70 else 0.0
            subprocess.run([full_ffmpeg, '-y', '-v', 'error', '-i', str(src), '-af', f'volume={gain:.2f}dB,alimiter=limit=0.8:level=false',
                            '-ar', str(rate), str(dest)], check=True)
    return dest


def voiced(line, take):
    """Raw TTS take plus the tempo-stretched (and, with a cast, levelled) file that goes into the video."""
    global tts
    voice = cast.get(speaker_of(line), cast.get('narrator', tts_cfg['voice']))
    key = hashlib.sha256(f"{voice}|{temperature}|{line['text']}".encode()).hexdigest()[:12]
    dest = out / f"{line['id']}-{key}{'' if take == 0 else f'-k{take}'}.wav"
    if not dest.exists():
        if tts is None:
            tts = Vieneu(mode='v3turbo', backend='onnx', device='cpu', precision='fp32', threads=4)
            assert voice in [v[1] for v in tts.list_preset_voices()], voice
        tts.save(tts.infer(line['text'], voice=voice, temperature=temperature, max_new_frames=900), str(dest))
    if tempo != 1.0:
        raw, dest = dest, dest.with_name(f'{dest.stem}-t{tempo}.wav')
        if not dest.exists():
            subprocess.run([ffmpeg, '-y', '-v', 'error', '-i', str(raw), '-filter:a', f'atempo={tempo}', str(dest)], check=True)
    return level(dest) if cast else dest


records = []
for line in spec['lines']:
    # Adaptive takes: stop as soon as whisper hears the line well enough (at most one error per 12 words).
    # `asr_expect` scores a phonetic respelling against the words viewers should hear (e.g. "vái" voiced, "váy" heard).
    expect = line.get('asr_expect', line['text'])
    n_words = len(norm(expect))
    scored = []
    for k in range(line.get('takes', 3)):
        take = voiced(line, k)
        scored.append((heard_wer(take, expect), take))
        if round(scored[-1][0][0] * n_words) <= n_words // 12:
            break
    (best_wer, best_heard), dest = min(scored, key=lambda s: s[0][0])
    takes = scored
    with wave.open(str(dest)) as audio:
        duration = audio.getnframes() / audio.getframerate()
    records.append({'id': line['id'], 'file': dest.name, 'text': line['text'], 'duration': round(duration, 3),
                    **({'speaker': speaker_of(line), 'voice': cast.get(speaker_of(line), cast.get('narrator', voice))} if cast else {}),
                    'sha256': hashlib.sha256(dest.read_bytes()).hexdigest(),
                    'takes': len(scored), 'max_takes': line.get('takes', 3), 'take_wers': [round(s[0][0], 3) for s in scored], 'heard': best_heard})
    print(json.dumps(records[-1], ensure_ascii=False), flush=True)
(out / 'audio-manifest.json').write_text(json.dumps({'voice': cast.get('narrator', voice), **({'cast': cast, 'level': LEVEL} if cast else {}),
    'temperature': temperature, 'tempo': tempo, 'mood': spec['mood'],
    'sdk': 'vieneu 3.8.3 v3turbo', 'samples': records, 'human_listening': 'unverified', 'added_provider_spend': 0},
    ensure_ascii=False, indent=2), encoding='utf-8')

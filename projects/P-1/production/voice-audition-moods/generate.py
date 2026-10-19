"""Audition VieNeu presets per mood on one funny and one sad line (no cloning)."""
from pathlib import Path
import json, wave, hashlib
from vieneu import Vieneu

out = Path(__file__).resolve().parents[2] / 'media/voice-audition-moods'
out.mkdir(parents=True, exist_ok=True)
LINES = {
    'hai': 'Mẹ vừa chuyển tiền tiêu tháng này, bạn này lên Threads nhờ cả mạng nghĩ giùm một câu cảm ơn cho ngầu. Bà cố nội này!',
    'buon': 'Có những ngày đi làm về, mở cửa căn phòng trọ tối om, mình chỉ muốn gọi cho mẹ, nhưng lại sợ mẹ nghe giọng mình mà lo.',
}
VOICES = {
    'hai': ['Adam bựa', 'Hải Đăng', 'Quốc Tuấn', 'Xuân Vĩnh', 'Trúc Ly', 'Ngọc Trân', 'Thiện Minh'],
    'buon': ['Ngọc Linh', 'Quỳnh Anh', 'Thục Đoan', 'Mỹ Duyên', 'Thanh Bình', 'Đoan Trang', 'Thiện Minh'],
}
tts = Vieneu(mode='v3turbo', backend='onnx', device='cpu', precision='fp32', threads=4)
records = []
for mood, voices in VOICES.items():
    for v in voices:
        dest = out / f"{mood}-{v.replace(' ', '_')}.wav"
        if not dest.exists():
            tts.save(tts.infer(LINES[mood], voice=v, temperature=.8, max_new_frames=900), str(dest))
        with wave.open(str(dest)) as w:
            dur = w.getnframes() / w.getframerate()
        records.append({'mood': mood, 'voice': v, 'file': dest.name, 'text': LINES[mood], 'duration': round(dur, 2),
                        'sha256': hashlib.sha256(dest.read_bytes()).hexdigest()})
        print(json.dumps(records[-1], ensure_ascii=False), flush=True)
(out / 'manifest.json').write_text(json.dumps({'sdk': 'vieneu 3.8.3 v3turbo', 'records': records,
    'human_listening': 'unverified'}, ensure_ascii=False, indent=1), encoding='utf-8')

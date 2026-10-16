#!/usr/bin/env python3
"""Local Threads commentary card adapter; no network, publishing, or paid calls.

Contract threads-cards-1: registered JSON script + registered storyboard from the
current approved plan. Emits versioned media; register outputs with agency.py.
Requires the documented local Python environment and preset in --voice-dir.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import math
from pathlib import Path
import subprocess
import time
import wave
from uuid import uuid4

import agency

VERSION = "threads-cards-1.0"
WIDTH, HEIGHT, FPS, RATE = 1080, 1920, 30, 22050
KINDS = {"tree", "post", "reply", "contrast", "distinction", "question"}
MODEL_SHA = "ec7c89e2c85f4d1edc24b6120c18aaf1bda614f06b511567eb9c7c0de15e2dab"
FONT_DIR = Path("/usr/share/fonts/truetype/dejavu")
BG, INK, GREEN, ORANGE = "#f6f3e9", "#173f37", "#2c7963", "#d85837"


def contract(value):
    agency.require(isinstance(value, dict), "Script must be an object")
    agency.require(set(value) == {"adapter_contract", "title", "episode", "language", "source_label", "source_urls", "voice", "scenes"}, "Unexpected script fields")
    agency.require(value["adapter_contract"] == "threads-cards-1" and value["language"] == "vi-VN", "Unsupported contract/language")
    for key in ("title", "episode", "source_label"):
        agency.text(value[key], key, 120)
    agency.require(isinstance(value["source_urls"], list) and 1 <= len(value["source_urls"]) <= 5, "Source URLs required")
    agency.require(all(isinstance(u, str) and u.startswith("https://") for u in value["source_urls"]), "Require HTTPS source refs")
    voice = value["voice"]
    agency.require(isinstance(voice, dict) and set(voice) == {"name", "length_scale"}, "Invalid voice config")
    agency.require(voice["name"] == "vi_VN-vais1000-medium" and type(voice["length_scale"]) in (float, int) and .9 <= voice["length_scale"] <= 1.6, "Unsupported voice/speed")
    scenes = value["scenes"]
    agency.require(isinstance(scenes, list) and 4 <= len(scenes) <= 10, "Require 4-10 scenes")
    seen = set()
    for scene in scenes:
        agency.require(isinstance(scene, dict) and set(scene) == {"id", "kind", "kicker", "title", "body", "beats"}, "Invalid scene fields")
        agency.require(scene["kind"] in KINDS and scene["id"] not in seen, "Unsupported or duplicate scene")
        seen.add(scene["id"])
        for key in ("id", "kicker", "title"):
            agency.text(scene[key], key, 120)
        agency.require(isinstance(scene["body"], list) and len(scene["body"]) == 2, "Require two diagram labels")
        agency.require(isinstance(scene["beats"], list) and len(scene["beats"]) == 2, "Require two narration beats")
        for text in scene["body"] + scene["beats"]:
            agency.text(text, "scene text", 300)
    return value


def text_wrap(draw, text, font, width):
    lines = []
    for para in text.split("\n"):
        current = ""
        for word in para.split():
            new = f"{current} {word}".strip()
            if current and draw.textlength(new, font=font) > width:
                lines.append(current)
                current = word
            else:
                current = new
        if current:
            lines.append(current)
    return lines


def card_frame(script, scene, beat, progress, overall, layout_report):
    from PIL import Image, ImageDraw, ImageFont

    im = Image.new("RGB", (WIDTH, HEIGHT), BG)
    d = ImageDraw.Draw(im)
    def font(size, bold=False):
        return ImageFont.truetype(str(FONT_DIR / ("DejaVuSans-Bold.ttf" if bold else "DejaVuSans.ttf")), size)
    def label(text, xy, size=34, fill=INK, bold=False):
        d.text(xy, text, font=font(size, bold), fill=fill)
    def rr(box, fill, radius=28, outline=None, width=2):
        d.rounded_rectangle(box, radius, fill=fill, outline=outline, width=width)

    # Safe areas: 84px sides, 180px bottom; all rendered text checked to fit.
    label("CHUYỆN ĐANG BÀN", (84, 102), 30, bold=True)
    rr((866, 86, 996, 146), INK, 25)
    label(script["episode"], (905, 95), 34, "#ffffff", True)
    label(scene["kicker"], (84, 191), 28, ORANGE, True)
    heading = text_wrap(d, scene["title"], font(78, True), 912)
    agency.require(len(heading) <= 3, f"Heading overflows: {scene['id']}")
    for i, line in enumerate(heading):
        label(line, (78, 250 + i * 98), 78, bold=True)
    kind = scene["kind"]
    # Original diagram, deliberately distinct from a platform screenshot.
    rr((84, 535, 996, 1215), "#e7ebdc", 42)
    label("MINH HỌA", (122, 564), 25, GREEN, True)
    if kind == "tree":
        d.line((539, 1020, 539, 790), fill=INK, width=26)
        for dx, dy, r in ((-85, 30, 120), (80, 20, 125), (0, -70, 130)):
            drift = int(4 * math.sin(progress * math.pi * 2))
            x, y = 540 + dx + drift, 820 + dy
            d.ellipse((x-r, y-r, x+r, y+r), fill=GREEN)
        # Clear line art bag, not a realistic depiction offered as evidence.
        rr((305, 632, 775, 1020), None, 110, "#ffffff", 8)
        d.line((462, 1020, 540, 1058, 620, 1020), fill="#ffffff", width=8)
        label("ẢNH VUI", (423, 1108), 36, ORANGE, True)
    elif kind in {"post", "reply"}:
        rr((136, 665, 944, 835), "#ffffff", 26)
        rr((202, 950, 944, 1135), "#fff5dc" if kind == "reply" else "#ffffff", 26,
           ORANGE if kind == "reply" else "#c7d4c7", 4)
        d.line((166, 835, 166, 1042, 202, 1042), fill=GREEN, width=7)
        label("BÀI GỐC", (177, 685), 25, GREEN, True)
        label("Một câu hỏi về hoa sữa", (177, 740), 39, INK, True)
        label("PHẢN HỒI TÁC GIẢ", (242, 968), 25, ORANGE, True)
        label("“Ảnh meme thôi bồ”" if kind == "reply" else "Đọc tiếp để rõ bối cảnh", (242, 1028), 39, INK, True)
        if beat == 1 or kind == "reply":
            d.ellipse((147, 894, 185, 932), fill=ORANGE)
    elif kind == "contrast":
        for i, (txt, sub) in enumerate(zip(scene["body"], ("KÝ ỨC", "CẢM GIÁC"))):
            x = 128 + i*434
            rr((x, 695, x+390, 1085), "#ffffff", 28)
            label(sub, (x+28, 735), 27, ORANGE if i else GREEN, True)
            lines = text_wrap(d, txt, font(46, True), 330)
            for j, line in enumerate(lines): label(line, (x+28, 835+j*65), 46, bold=True)
            d.ellipse((x+135, 1010, x+245, 1024), fill=ORANGE if i else GREEN)
        label("Có thể cùng tồn tại", (325, 1145), 36, GREEN, True)
    elif kind == "distinction":
        for i, (head, txt) in enumerate((("Ý KIẾN", "Mình cảm thấy gì?"), ("SỰ KIỆN", "Điều gì đã xảy ra?"))):
            y = 690 + i*240
            rr((137, y, 943, y+190), "#ffffff", 28)
            label(head, (178, y+26), 27, ORANGE if i == 0 else GREEN, True)
            label(txt, (178, y+86), 48, bold=True)
    else:
        for i, txt in enumerate(("Nhận ra ngay", "Đọc thêm mới rõ")):
            y = 705 + i*217
            rr((140, y, 940, y+160), INK if i == beat else "#ffffff", 32)
            label("01" if i == 0 else "02", (181, y+55), 32, ORANGE, True)
            label(txt, (280, y+49), 43, "#ffffff" if i == beat else INK, True)

    # Captions use real synthesized beat timings, never estimated word times.
    caption_font = font(47)
    cap = text_wrap(d, scene["beats"][beat], caption_font, 868)
    agency.require(len(cap) <= 4, f"Caption overflows: {scene['id']}/{beat}")
    rr((84, 1298, 996, 1620), INK, 28)
    top = 1298 + (322-len(cap)*62)/2-2
    for i, line in enumerate(cap):
        x = (WIDTH-d.textlength(line, font=caption_font))/2
        d.text((x, top+i*62), line, font=caption_font, fill="#ffffff")
    label("Nguồn: " + script["source_label"], (84, 1652), 27, INK)
    label("GIỌNG TỔNG HỢP · HÌNH TỰ VẼ · NHÁP RIÊNG TƯ", (84, 1710), 22, GREEN, True)
    rr((84, 1765, 996, 1773), "#d8ddd0", 4)
    rr((84, 1765, 85+int(911*overall), 1773), ORANGE, 4)
    if layout_report is not None:
        layout_report.append({"scene": scene["id"], "beat": beat, "heading_lines": len(heading), "caption_lines": len(cap),
                              "caption_font_px": 47, "safe_text_right": 996, "safe_text_bottom": 1738})
    return im


def render(root, project_id, script_id, storyboard_id, expected_revision, voice_dir):
    import numpy as np
    from piper import PiperVoice, SynthesisConfig
    import imageio_ffmpeg
    from importlib.metadata import version

    started = time.monotonic()
    project = agency.project_path(root, project_id)
    with agency.lock(project / ".writer.lock"):
        state = agency.load_state(project)
        agency.require(state["revision"] == expected_revision, "Stale state revision")
        agency.require("render_draft" in agency.allowed_actions(project, state), "Draft rendering is not authorized")
        artifacts = {a["id"]: a for a in state["artifacts"]}
        refs = []
        for artifact_id, kind in ((script_id, "script"), (storyboard_id, "storyboard")):
            ref = artifacts.get(artifact_id)
            agency.require(ref is not None and ref["kind"] == kind, f"Registered {kind} required")
            agency.require(ref["plan_revision"] == state["plan"]["revision"], "Input belongs to another plan")
            agency.check_reference(project, ref)
            refs.append(ref)
        script = contract(agency.read_json(agency.check_reference(project, refs[0])))
        model = voice_dir / "vi_VN-vais1000-medium.onnx"
        agency.require(model.is_file() and agency.digest(model) == MODEL_SHA, "Voice preset hash mismatch")
        folder = agency.inside(project, "artifacts/render/threads-"+uuid4().hex[:10])
        folder.mkdir(parents=True)
        (folder / "beats").mkdir()
        (folder / "frames").mkdir()
        voice = PiperVoice.load(str(model))
        cfg = SynthesisConfig(length_scale=script["voice"]["length_scale"], volume=.85)
        segments, all_pcm, cursor = [], [], 0
        for scene in script["scenes"]:
            for beat, text in enumerate(scene["beats"]):
                path = folder/"beats"/f"{scene['id']}-{beat}.wav"
                with wave.open(str(path), "wb") as f:
                    voice.synthesize_wav(text, f, cfg)
                with wave.open(str(path), "rb") as f:
                    agency.require(f.getframerate() == RATE and f.getnchannels() == 1 and f.getsampwidth() == 2, "Unexpected voice WAV")
                    samples = np.frombuffer(f.readframes(f.getnframes()), dtype=np.int16).astype(np.float32)
                fade = min(int(.015*RATE),len(samples)//2)
                samples[:fade] *= np.linspace(0,1,fade)
                samples[-fade:] *= np.linspace(1,0,fade)
                # Whole-frame padding means captions and PCM boundaries agree exactly.
                frames = math.ceil((len(samples)/RATE+.16)*FPS)
                n = frames*(RATE//FPS)
                samples = np.pad(samples, (0,n-len(samples))).astype(np.int16)
                segments.append({"scene_id": scene["id"], "beat": beat, "text": text,
                                 "start_frame": cursor, "frames": frames, "start_seconds": cursor/FPS, "duration_seconds": frames/FPS})
                cursor += frames
                all_pcm.append(samples)
        duration = cursor/FPS
        agency.require(45 <= duration <= 75, f"Measured duration {duration:.2f}s outside approved 45-75s; revise script/speed into a new version")
        pcm = np.concatenate(all_pcm)
        audio = folder/"narration.wav"
        with wave.open(str(audio),"wb") as f:
            f.setparams((1,2,RATE,0,"NONE","not compressed"))
            f.writeframes(pcm.tobytes())
        peak = int(np.max(np.abs(pcm.astype(np.int32))))
        agency.require(peak < 32767, "PCM clipping detected")
        audio_metrics = {"sample_rate": RATE, "channels": 1, "duration_seconds": len(pcm)/RATE,
                         "peak_dbfs": float(20*np.log10(max(1,peak)/32768)),
                         "rms_dbfs": float(20*np.log10(max(1,float(np.sqrt(np.mean(pcm.astype(np.float64)**2))))/32768)),
                         "clipped_samples": int(np.sum(np.abs(pcm.astype(np.int32))>=32767))}
        agency.write_json(folder/"audio-metrics.json",audio_metrics)
        ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
        layout, scene_map = [], {s["id"]: s for s in script["scenes"]}
        log = folder/"encode.log"
        video = folder/"draft-01-v1.mp4"
        # All pipe frames in memory; raw media remains ignored under artifacts/.
        with log.open("w") as err:
            command = [ffmpeg,"-nostdin","-y","-v","error","-f","rawvideo","-pix_fmt","rgb24","-s",f"{WIDTH}x{HEIGHT}","-r",str(FPS),"-i","pipe:0",
                       "-i",str(audio),"-map","0:v:0","-map","1:a:0","-c:v","libx264","-preset","veryfast","-crf","22","-threads","4","-pix_fmt","yuv420p",
                       "-c:a","aac","-b:a","128k","-af","loudnorm=I=-16:TP=-1.5:LRA=11","-movflags","+faststart","-t",str(duration),str(video)]
            proc = subprocess.Popen(command,stdin=subprocess.PIPE,stdout=subprocess.DEVNULL,stderr=err)
            try:
                for segment in segments:
                    scene = scene_map[segment["scene_id"]]
                    # Reuse text layout; only the diagram/progress is animated per frame.
                    base = card_frame(script,scene,segment["beat"],.5,segment["start_frame"]/cursor,layout)
                    base.save(folder/"frames"/f"{scene['id']}-{segment['beat']}.png")
                    for n in range(segment["frames"]):
                        im = base.copy()
                        from PIL import ImageDraw
                        d = ImageDraw.Draw(im)
                        p = (segment["start_frame"]+n)/cursor
                        d.rounded_rectangle((84,1765,996,1773),4,fill="#d8ddd0")
                        d.rounded_rectangle((84,1765,85+int(911*p),1773),4,fill=ORANGE)
                        # A moving reading marker links the two diagram cards.
                        if scene["kind"] in {"post","reply"}:
                            y = 855+int(75*n/max(1,segment["frames"]-1))
                            d.ellipse((151,y,181,y+30),fill=ORANGE)
                        proc.stdin.write(im.tobytes())
                proc.stdin.close()
                result = proc.wait(timeout=180)
            except BaseException:
                proc.kill()
                proc.wait()
                raise
        agency.require(result == 0,"Encoding failed; inspect encode.log")
        decoded = subprocess.run([ffmpeg,"-nostdin","-v","error","-i",str(video),"-f","null","-"],capture_output=True,text=True,timeout=180)
        agency.atomic_write(folder/"decode.log",decoded.stderr or "Full A/V decode completed, exit 0.\n")
        agency.require(decoded.returncode == 0,"Full media decode failed")
        agency.write_json(folder/"layout-checks.json",layout)
        # A scene contact sheet contains both narration beats, not just a thumbnail.
        from PIL import Image, ImageDraw
        sheet = Image.new("RGB",(6*270,2*480),"#ffffff")
        for j,s in enumerate(script["scenes"]):
            for b in (0,1):
                frame=Image.open(folder/"frames"/f"{s['id']}-{b}.png")
                frame.thumbnail((270,480))
                sheet.paste(frame,(j*270,b*480))
        sheet.save(folder/"contact-sheet.png")
        manifest={"adapter":VERSION,"adapter_sha256":agency.digest(Path(__file__)),"project_id":project_id,"expected_revision":expected_revision,
                  "plan_revision":state["plan"]["revision"],"script_id":script_id,"script_sha256":refs[0]["sha256"],"storyboard_id":storyboard_id,"storyboard_sha256":refs[1]["sha256"],
                  "width":WIDTH,"height":HEIGHT,"fps":FPS,"frame_count":cursor,"duration_seconds":duration,"audio_metrics":audio_metrics,
                  "voice_model_sha256":MODEL_SHA,"voice_config_sha256":agency.digest(voice_dir/"vi_VN-vais1000-medium.onnx.json"),
                  "versions":{p:version(p) for p in ("piper-tts","imageio-ffmpeg","pillow","numpy","onnxruntime")},
                  "video_sha256":agency.digest(video),"audio_sha256":agency.digest(audio),"segments":segments,"full_decode_exit_code":0,
                  "elapsed_seconds":round(time.monotonic()-started,2),"audio_listening":"unverified","content_review":"unverified","extra_spend":0,
                  "registration":"Register outputs with agency.py using current expected revision; this renderer does not edit STATE"}
        agency.write_json(folder/"manifest.json",manifest)
        return {"folder":str(folder),"video":str(video),"audio":str(audio),"duration_seconds":duration,"expected_revision":expected_revision}


def main():
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument("project")
    p.add_argument("--root",type=Path,default=agency.ROOT)
    p.add_argument("--script-id",required=True)
    p.add_argument("--storyboard-id",required=True)
    p.add_argument("--expected-revision",type=int,required=True)
    p.add_argument("--voice-dir",type=Path,required=True)
    a=p.parse_args()
    print(json.dumps(render(a.root.resolve(),a.project,a.script_id,a.storyboard_id,a.expected_revision,a.voice_dir),ensure_ascii=False,indent=2))


if __name__=="__main__":
    main()

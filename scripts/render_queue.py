#!/usr/bin/env python3
"""A small local renderer adapter: timed queue scenes, optional supplied audio."""
from __future__ import annotations

import argparse
import json
from pathlib import Path
import subprocess
from uuid import uuid4

import agency

ADAPTER_VERSION = "queue-1"
WIDTH, HEIGHT, FPS = 640, 360, 24


def script_contract(value):
    agency.require(isinstance(value, dict), "Script must be an object")
    agency.require(set(value) <= {"title", "scenes"}, "Unknown script fields")
    agency.text(value.get("title"), "title", 100)
    scenes = value.get("scenes")
    agency.require(isinstance(scenes, list) and 1 <= len(scenes) <= 12, "Require 1–12 scenes")
    for scene in scenes:
        agency.require(isinstance(scene, dict) and scene.get("kind") == "queue", "Only queue scenes supported")
        agency.require(set(scene) <= {"kind", "caption", "seconds"}, "Unknown scene fields")
        agency.text(scene.get("caption"), "caption", 90)
        seconds = scene.get("seconds")
        agency.require(type(seconds) in {int, float} and 1 <= seconds <= 30, "Scene duration must be 1–30 seconds")
    agency.require(sum(s["seconds"] for s in scenes) <= 120, "Limit total duration to 120 seconds")
    return value


def render(root, project_id, script_id, expected_revision, audio_id=None):
    # Imports are deliberately optional for all non-render commands.
    from PIL import Image, ImageDraw, ImageFont
    import imageio_ffmpeg

    project = agency.project_path(root, project_id)
    with agency.lock(project / ".writer.lock"):
        state = agency.load_state(project)
        agency.require(state["revision"] == expected_revision, "Stale revision before rendering")
        agency.require("render_draft" in agency.allowed_actions(project, state), "Rendering is not authorized")
        artifacts = {a["id"]: a for a in state["artifacts"]}
        script = artifacts.get(script_id)
        agency.require(script is not None and script["kind"] == "script", "Registered script ID required")
        agency.require(script["plan_revision"] == state["plan"]["revision"], "Script belongs to another plan revision")
        value = script_contract(agency.read_json(agency.check_reference(project, script)))
        audio = artifacts.get(audio_id) if audio_id else None
        agency.require(audio_id is None or (audio is not None and audio["kind"] == "audio"), "Registered audio ID required")
        if audio is not None:
            agency.require(audio["plan_revision"] == state["plan"]["revision"], "Audio belongs to another plan revision")
            agency.check_reference(project, audio)
        folder = agency.inside(project, "artifacts/render/R-" + uuid4().hex[:12])
        frames = folder / "frames"
        frames.mkdir(parents=True)
        try:
            title_font = ImageFont.truetype("DejaVuSans.ttf", 26)
            caption_font = ImageFont.truetype("DejaVuSans.ttf", 20)
        except OSError:
            title_font = ImageFont.load_default(size=26)
            caption_font = ImageFont.load_default(size=20)
        frame_number = 0
        for scene in value["scenes"]:
            count = round(scene["seconds"] * FPS)
            for frame in range(count):
                image = Image.new("RGB", (WIDTH, HEIGHT), "#101828")
                draw = ImageDraw.Draw(image)
                draw.text((28, 28), value["title"], font=title_font, fill="#f9fafb")
                words = scene["caption"].split()
                lines, current = [], ""
                for word in words:
                    candidate = (current + " " + word).strip()
                    if current and draw.textlength(candidate, font=caption_font) > 580:
                        lines.append(current)
                        current = word
                    else:
                        current = candidate
                lines.append(current)
                draw.multiline_text((28, 80), "\n".join(lines), font=caption_font, fill="#d0d5dd", spacing=5)
                progress = frame / max(1, count - 1)
                for index in range(5):
                    x = 70 + index * 88 + int(progress * 28)
                    draw.ellipse((x, 205, x + 40, 245), fill="#53b1fd" if index < 4 else "#fdb022")
                draw.rounded_rectangle((540, 185, 610, 265), radius=10, outline="#98a2b3", width=3)
                draw.text((547, 211), "OUT", font=caption_font, fill="#f9fafb")
                draw.rectangle((28, 320, 28 + int(584 * progress), 325), fill="#53b1fd")
                image.save(frames / f"frame-{frame_number:05d}.png")
                frame_number += 1
        ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
        duration = frame_number / FPS
        partial, video = folder / "draft.partial.mp4", folder / "draft.mp4"
        argv = [ffmpeg, "-nostdin", "-y", "-v", "error", "-protocol_whitelist", "file,pipe",
                "-framerate", str(FPS), "-i", str(frames / "frame-%05d.png")]
        if audio is not None:
            argv += ["-protocol_whitelist", "file,pipe", "-i", str(agency.inside(project, audio["path"])),
                     "-map", "0:v:0", "-map", "1:a:0", "-af", "apad", "-c:a", "aac"]
        argv += ["-t", str(duration), "-c:v", "libx264", "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(partial)]
        encoded = subprocess.run(argv, capture_output=True, text=True, timeout=180)
        agency.atomic_write(folder / "encode.log", encoded.stderr or "Encoding completed without reported errors.\n")
        agency.require(encoded.returncode == 0, "ffmpeg encoding failed; see encode.log")
        decoded = subprocess.run([ffmpeg, "-nostdin", "-v", "error", "-protocol_whitelist", "file,pipe",
                                  "-i", str(partial), "-f", "null", "-"], capture_output=True, text=True, timeout=180)
        agency.atomic_write(folder / "decode.log", decoded.stderr or "Full output decoding completed without reported errors.\n")
        agency.require(decoded.returncode == 0, "ffmpeg decoding failed; see decode.log")
        partial.rename(video)
        manifest = {"adapter": ADAPTER_VERSION, "project_id": project_id,
                    "plan_revision": state["plan"]["revision"], "script_id": script_id,
                    "script_sha256": script["sha256"], "audio_id": audio_id,
                    "width": WIDTH, "height": HEIGHT, "fps": FPS, "frame_count": frame_number,
                    "duration_seconds": duration, "silent": audio is None,
                    "video_sha256": agency.digest(video), "full_decode_exit_code": decoded.returncode,
                    "content_review": "unverified", "audio_review": "unverified"}
        agency.write_json(folder / "manifest.json", manifest)
        dependencies = [script_id] + ([audio_id] if audio_id else [])
        registered = []
        for path, kind in [(video, "video"), (folder / "manifest.json", "other")]:
            relative = path.relative_to(project).as_posix()
            artifact = {**agency.reference(project, relative), "id": f"A-{len(state['artifacts']) + 1:03d}",
                        "kind": kind, "inputs": dependencies, "plan_revision": state["plan"]["revision"],
                        "created_at": agency.now()}
            state["artifacts"].append(artifact)
            registered.append(artifact["id"])
        state["revision"] += 1
        state["stage"] = "review"
        state["current_task"]["execution"] = "complete"
        state["acceptance"] = "not_reviewed"
        state["next_action"] = "Review the actual video and audio against the brief; decoding is not content QA"
        result = agency.commit_state(project, state)
        return {**result, "revision": state["revision"], "video": str(video), "artifact_ids": registered,
                "manifest": manifest}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("project")
    parser.add_argument("--root", type=Path, default=agency.ROOT)
    parser.add_argument("--script-id", required=True)
    parser.add_argument("--audio-id")
    parser.add_argument("--expected-revision", type=int, required=True)
    args = parser.parse_args()
    result = render(args.root.resolve(), args.project, args.script_id, args.expected_revision, args.audio_id)
    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    try:
        main()
    except (agency.AgencyError, OSError, ImportError, json.JSONDecodeError, subprocess.TimeoutExpired) as exc:
        print(json.dumps({"ok": False, "error": str(exc)}, ensure_ascii=False))
        raise SystemExit(2)

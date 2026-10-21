"""Download one public reference with yt-dlp and copy its original audio track.

Install yt-dlp[curl-cffi] and imageio-ffmpeg in the project environment.
Keep output in the project media/ directory (ignored by Git).
No browser cookies or credentials are read.
"""
import argparse
import hashlib
import json
from pathlib import Path
import subprocess

import imageio_ffmpeg
import yt_dlp


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("url")
    parser.add_argument("--name", required=True)
    args = parser.parse_args()
    if not args.name or any(c not in "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_" for c in args.name):
        parser.error("name must use letters, digits, hyphens or underscores")
    out = Path(__file__).resolve().parents[1] / "media" / args.name
    out.mkdir(parents=True, exist_ok=True)
    audio = out / "original-audio.m4a"
    if audio.exists():
        parser.error("output already exists; use a new name to preserve versions")
    from yt_dlp.networking.impersonate import ImpersonateTarget
    with yt_dlp.YoutubeDL({
        "noplaylist": True, "socket_timeout": 20, "retries": 1,
        "impersonate": ImpersonateTarget.from_str("chrome"),
        "outtmpl": str(out / "source.%(ext)s"),
    }) as downloader:
        info = downloader.extract_info(args.url, download=True)
        source = Path(downloader.prepare_filename(info))
    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    subprocess.run([ffmpeg, "-nostdin", "-v", "error", "-i", str(source),
                    "-vn", "-c:a", "copy", str(audio)], check=True)
    def pcm(path):
        return subprocess.run([ffmpeg, "-nostdin", "-v", "error", "-i", str(path),
                               "-map", "0:a:0", "-f", "s16le", "-acodec", "pcm_s16le", "-"],
                              capture_output=True, check=True).stdout
    original, copied = pcm(source), pcm(audio)
    if original != copied:
        raise RuntimeError("Audio verification failed")
    manifest = {"source_id": info.get("id"), "audio_copy": True,
                "pcm_identical": True, "pcm_sha256": hashlib.sha256(original).hexdigest(),
                "files": {p.name: hashlib.sha256(p.read_bytes()).hexdigest() for p in [source, audio]}}
    (out / "audio-integrity.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    print(audio)


if __name__ == "__main__":
    main()

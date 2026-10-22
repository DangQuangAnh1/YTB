---
name: video-study
description: Study a reference video (YouTube link or local file) for animation work - frames, frame-by-frame strips of the action, motion and cut statistics, and hit-sound analysis - saved under projects/<P-n>/media/<slug>/. Use when the user shares a video to learn from, asks "làm được như này không / giống bao nhiêu %", or wants frames cut and saved from a video.
---

# video-study

Learning only: never reuse the author's frames, audio or characters. Full rules and the scoring table: `docs/P-2-reference-video-analysis.md`.

## 1. Ask before downloading

A URL is downloaded only after the user agrees in chat to that specific download (state title/channel and ≤720p). Then pass `--download-approved`. Local files need no question.

## 2. Run

```bash
.venv/Scripts/python.exe scripts/video-study.py "<url or file>" --project P-2 --name <slug> --download-approved \
    [--compare ~/p2-out/<our-build>/original-audio.wav] [--windows 5.6-7.4,15-16.7] [--crop 0,140,1280,480]
```

(`.venv/bin/python` on Linux/macOS.) It writes `projects/<P>/media/<slug>/`:

| Output | From | Use |
|---|---|---|
| `analysis/` | `scripts/analyze-video.py` | cuts, motion per second, flashes, onsets/BPM, palette, 48-frame sheets |
| `watch/`, `watch-report.md` | claude-video `/watch` local engine (MIT, `third_party/video/sources/claude-video`) | scene-aware or uniform frames (about 1 per second: overview only) |
| `detail/w*.jpg` | `scripts/video-detail.py strip` | every frame at ~12 drawings/s in the busiest windows: poses, smears, afterimages, hit timing |
| `audio/` | `scripts/video-detail.py audio` | spectrogram with onsets, per-hit attack/decay/centroid/band energy, onset WAV clips, comparison with ours |
| `INDEX.md` | | what to read, in order |

Re-run `video-detail.py strip` by hand for any other window (`--from/--to/--step/--crop`).

## 3. Read and report

1. Read `INDEX.md`, then the sheets and strips with the Read tool. Strips matter most for animation: pose changes per frame, holds, smear and impact frames.
2. Compare audio numerically (`audio-report.json` summary) before saying sounds differ; you cannot listen.
3. Write `projects/<P>/research/reference-<slug>-analysis-v1.md`: numbers, visual vocabulary, gap table against our pipeline, subjective % with its rubric and sampling limits. Register it with `scripts/agency.py` on the machine that owns STATE.
4. Ask whether to delete the downloaded media when done.

## Windows notes

- `python3` may be the Microsoft Store stub: use `.venv/Scripts/python.exe` or `py -3`.
- The script builds `~/.cache/creator-agency/ffbin` with a full ffmpeg (from imageio-ffmpeg) and Remotion's ffprobe, because the Remotion ffmpeg build lacks the `select` filter claude-video needs. In Git Bash a PATH entry must be `/c/...`, not `C:/...`.

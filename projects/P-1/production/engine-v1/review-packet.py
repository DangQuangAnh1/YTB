"""Write a review packet for reviewer agents, who can see frames and read text but cannot hear audio.

Usage: review-packet.py <episode_dir> <render_dir_name> <source_url> <source_stats>
"""
import json
import sys
from pathlib import Path

episode, render, url, stats = Path(sys.argv[1]), sys.argv[2], sys.argv[3], sys.argv[4]
project = Path(__file__).resolve().parents[2]
props = json.loads((episode / 'props.json').read_text(encoding='utf-8'))
out = project / 'artifacts/render' / render
mix = json.loads((out / 'mix-intelligibility.json').read_text(encoding='utf-8'))
qa = json.loads((out / 'technical-qa.json').read_text(encoding='utf-8'))
frames = sorted(out.glob('frame-*.png'), key=lambda p: int(p.stem.split('-')[1]))
look = props['preset']['look']
L = [f"# Review packet: {render}", "",
     "Target: Vietnamese Gen Z viewers on YouTube Shorts and TikTok. This is a faceless channel that retells viral Threads posts and their comments. It is a private draft and has not been published.",
     f"Source post: {url} ({stats}). Cards are real screenshots, with identities and wording unchanged.",
     f"Mood preset: **{props['mood']}**. Voice: VieNeu \"{props['voice']['name']}\" (temp {props['voice']['temperature']}). Duration: {props['duration']}s at 1080×1920.",
     f"Look: background `{look['background'].split('/')[-1]}` (real Pexels footage, brightness {look['bg_brightness']}), grain {look['grain']}, "
     f"vignette {look['vignette']}, card motion {look['card_motion']}, caption style {look['caption_style']} (TikTok Sans), handwritten hook font {look['hook_font']}.",
     f"Hook text (handwritten, top): \"{props['hook']}\". Closing handwritten question: \"{props['cta']}\". Channel handle shown: {props['handle']} (a placeholder name).",
     "", "## Timeline (narration = original bridge text; read = card text spoken aloud)", "",
     "| t (s) | id | kind | card | spoken text |", "|---|---|---|---|---|"]
for l in props['lines']:
    L.append(f"| {l['start']:.1f}–{l['end']:.1f} | {l['id']} | {l['kind']} | {l['card']} | {l['text']} |")
L += ["", "## Reactions and SFX", ""]
L += [f"- {r['start']:.1f}s reaction `{r['id']}` ({r['kind']}) on card {r['card']}" for r in props['reactions']] or ["- none (mood disables reactions)"]
L += [f"- {s['at']:.1f}s SFX {s['type']}" for s in props['sfx']] or ["- no SFX (mood allows none)"]
L += ["", "## Audio evidence (reviewers cannot listen)", "",
      f"- Mixed audio peak {qa['audio_peak']:.3f}, RMS {qa['audio_rms']:.3f}. Music is ducked under speech: gain {props['preset']['music']['under_voice']} vs {props['preset']['music']['between']} between lines.",
      f"- Whisper.cpp transcription of the FINAL mix compared with the script gives an overall word error rate of {mix['overall_wer']}. This is an intelligibility proxy only.",
      "- Lines with the highest error (per-line windows can bleed into neighbouring lines):"]
for x in sorted(mix['per_line'], key=lambda x: -x['wer'])[:5]:
    L.append(f"  - {x['id']} WER {x['wer']}: script \"{x['script']}\" → heard \"{x['heard']}\"")
L += ["", "## Frames to inspect (Read these image files)", "", f"- Contact sheet: artifacts/render/{render}/contact-sheet.png"]
L += [f"- artifacts/render/{render}/{p.name} (t={int(p.stem.split('-')[1]) / 30:.2f}s)" for p in frames]
(out / 'review-packet.md').write_text('\n'.join(L) + '\n', encoding='utf-8')
print(out / 'review-packet.md')

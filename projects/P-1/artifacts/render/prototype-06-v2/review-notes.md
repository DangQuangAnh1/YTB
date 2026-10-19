# Prototype-06 v2 — mood preset "hài", comic SFX and reactions (2026-10-17)

This revision was requested in tasks/user-request-p06-v2.md (decision r109). It is a private draft. The cards, voice clips and captions are the same as v1; whisper timings were reused and nothing was re-voiced.

## Changes vs v1 (A-063)

**Mood preset system** (production/prototype-06/mood-presets.json). lines.json sets `mood: "hai"`, and the preset drives:
- music gain: 0.11 under voice, 0.26 between lines, 0.07 under accent SFX;
- the allowed SFX set;
- a whoosh on each card entry;
- reactions: at most 4, at least 5s apart, each shown for 1.7s, with a pop on appearance;
- yellow accent and a bouncier card spring.

**Beat cues** in lines.json. After each punchline line the timeline holds 0.85s so the reaction lands before the next card arrives.

| Time | Line | Reaction | SFX |
|---|---|---|---|
| 10.2s | tn.qang "Bà cố nội này" | 🤣 rofl | laugh |
| 21.2s | deertomars "Tiền con con giữ, tiền mẹ con xin" | Monkey Puppet meme | record scratch before the line, ting at the end |
| 32.4s | nhincaigi4142 cổ trang | 💀 skull | boing |
| 41.1s | myracle404 "dấu huyền" | 🤑 money | laugh |

**Layout fixes:**
- Reactions sit above the card stack (z-index) and are anchored to the front card's top-right corner, so they do not cover the punchline text.
- Older cards are clipped so they never hang below the front card.

## Output and checks (agent)

- draft.mp4: 49.4s, 1080×1920, H.264/AAC, SHA256 8939ff30787b6faa48c7105923492eec53f7593583c48772ef9f7aa223283ef5.
- Full decode exit 0, no errors. Peak 0.856 and RMS 0.102, so no clipping.
- contact-sheet.png samples 10 frames, including all four reaction moments. In each, the reaction is visible and the punchline text stays readable.
- During render, headless Chrome logged "VideoFrame garbage collected" warnings from AnimatedImage decoding. They are non-fatal; the output decodes fully.

## Not verified / limits

- **Listening and creative acceptance are pending.** This covers SFX loudness and taste, music ducking under the SFX, and the comic timing of the holds. The TTS mispronunciation flags from v1 still apply (see ../prototype-06-v1/review-notes.md).
- **Rights:**
  - Fluent emoji reactions: MIT, commercially usable.
  - Monkey Puppet: Imgflip template, rights unknown, private only (`commercial_ok: false` in the library).
  - SFX and music: CC0 per Openverse metadata. Freesound API commercial terms apply, so re-curate by hand before monetizing.
  - Threads screenshots: public-use rights unresolved.
- **Other moods untested.** buon, drama and am_ap are defined, but their music was not downloaded and nothing was rendered with them.

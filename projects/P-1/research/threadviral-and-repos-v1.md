# ThreadViral + open-source AI video repos — research, 2026-10-16

User direction (chat, 2026-10-16): “vẫn là thằng p1, tôi đang dùng chatgpt để làm nhưng chưa được như ý tôi lắm, tôi muốn làm giống thằng kia và học theo thằng https://threadviral.com/ với dự án P1 này. có thể research kết hợp với các repo github làm video AI”. Research request only; it does not approve a new plan, spending or publishing.

## ThreadViral (threadviral.com) — observed

Sources: landing page text, FAQ, /cach-tao-video-tu-bai-threads, /video-ke-chuyen-khong-lo-mat, and the 2:52 hero demo video (1080x1920), sampled as still frames at 2s, 8s, 20s, 60s, 90s, 120s, 150s. Muted; audio not heard.

Product workflow (from site text):
1. Paste a public Threads link, or your own text. Text inside chat screenshots is OCR'd.
2. AI reads the post, comments and reply chains, prioritizes high-engagement comments and drops ads/link spam. The user then spends about a minute approving each segment with Giữ/Bỏ, or switches to manual selection mode.
3. Narration is either verbatim or rewritten by AI into a story. Vietnamese voices, with a voice change allowed per highlighted line. Users can preview and edit the narration before rendering.
4. Background music is chosen by mood ("Nhẹ, hơi hài"). SFX (ting, whoosh, laugh) are placed on the twist, joke or dramatic line.
5. Brand kit (channel name, avatar, logo, caption style) is applied to every video. Output is 9:16 MP4 plus cover image, delivered by download or Telegram. Files are kept 24h. No auto-publishing.
6. Pricing: 200 free credits on signup. The FAQ puts usage-rights responsibility on the user.

Visual grammar (from demo frames):
- Light-theme Threads-style cards (white rounded rectangles) centered over a dark, slow background (night photo). Brand watermark sits at the top.
- Cards stack: previous cards stay behind, offset and dimmed, and the new comment card slides in front. Long threads use a tall comment-list card.
- Word-level karaoke captions sit at the bottom, with the current word highlighted green.
- A meme overlay (crying cat on a laptop with a BSOD) occupies the lower-left for an extended stretch, not just a short sting.
- In the demo, usernames are blurred or pixelated. Unlike HẻmThreads, ThreadViral does not show identity in this demo. The P-1 user asked for visible identities (A-055).
- Cards include an embedded image attachment (a screenshot inside the post) where the source post has one.

Inference for P-1: the parts worth copying are the pipeline shape (select → approve → narrate → music/SFX → stack cards → word captions) and the per-line SFX/voice control. The look is a re-rendered card, not a raw screenshot crop. ThreadViral is a paid SaaS; using it would need explicit spending approval and is not proposed here.

## Open-source repos (delegated research; summary)

All findings come from READMEs and pages, with nothing installed. "Inferred" is marked where a claim was not verified.

- No open-source generator targets Threads; all post/comment-card video generators are Reddit-based.
- elebumm/RedditVideoMakerBot (12.5k★, GPL-3.0, last commit 2026-03): per-comment pattern of Playwright screenshot + TTS clip + duration + timed overlay. Borrow the pattern, not the GPL code.
- c-ehrlich/pr-brainrot (Remotion, no license): props JSON per run, and a per-line voice cache so editing the script re-voices only changed lines. Pattern only.
- remotion-dev/template-tiktok and @remotion/captions `createTikTokStyleCaptions`: word-page captions from any `Caption[]` source. Adopt.
- whisperX (24.6k★, BSD-2): `vi` alignment model `nguyenvulebinh/wav2vec2-base-vi-vlsp2020`. Forced alignment against the known script gives word timings for Vietnamese captions. Adopt; local install not yet tested. stable-ts was archived on 2026-05-30.
- Ducking: Remotion `<Audio volume={(f)=>…}>` with an interpolate envelope driven by known TTS segment times. Build it ourselves.
- Music: the Openverse API returned a CC0 Freesound track on a live anonymous call. Use a curated local library plus Openverse, recording license and attribution.
- TTS: edge-tts (vi-VN HoaiMy/NamMinh, inferred) is a free fallback; it depends on an unofficial endpoint, so commercial terms are grey. viXTTS and the F5-TTS Vietnamese weights are effectively non-commercial. VieNeu (Thiện Minh) stays primary.
- Capture: Threads oEmbed (`graph.threads.net/v1.0/oembed`; no token since March 2026 per search snippets; public posts only; display-only usage terms) plus a Playwright element screenshot gives an official attributed post card. Comments are not covered and still need browser capture. junhoyeo/threads-api is archived after Meta contact; do not use. Scraping actors carry ToS risk.
- Remotion license: companies with 4 or more people need a paid company license (per pr-brainrot README; unverified at source).

## Gap vs current prototype-05 (A-060)

| Element | prototype-05 | HẻmThreads (sampled) | ThreadViral (sampled) |
|---|---|---|---|
| Card | dark screenshot crop | dark screenshot card | re-rendered white card, stacked |
| Identity | username row kept | kept | blurred |
| Background | abstract motion | moving footage (cooking) | dark still/slow photo |
| Captions | none / block | yes | word-highlight karaoke |
| Music/SFX | synth loop, one sting | unheard | mood music + per-line SFX |
| Selection | manual, 2 sources | multi-comment sequence | AI-ranked + Giữ/Bỏ approval |

## Suggested next test (not approved)

A prototype-06 private draft, 30–45s, using one viral post and 4–6 comments:
- Stacked card animation with the real username/avatar.
- Word-highlight captions from whisperX `vi` alignment.
- Ducked music from a CC0 track with SFX on the punchline.
- Per-line voice cache.
- A comment-selection sheet (Giữ/Bỏ) for the user to approve before voicing.

Zero spending; whisperX would be a local install. Needs a user go-ahead as a plan revision.

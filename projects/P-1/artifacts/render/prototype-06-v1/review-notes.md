# Prototype-06 v1: build and self-review notes (2026-10-17)

This is a private draft under plan v5 (decision r100). The user approved the selection in tasks/user-approval-selection-p06-v1.md.

## What was built

- **Video:** draft.mp4, 46.0s, 1080×1920, H.264/AAC.
  - SHA256 c897687061e1b4ff4476da56e64a6a671e0f191c262c03b381834957c1baa377.
  - Code: production/prototype-06 (lines.json, generate-audio.py, build-timeline.mjs, src/index.tsx, verify-export.py).
- **Cards:** 8 real Threads cards (post plus 7 comments).
  - Captured from the logged-in Chrome as clones of the page elements, enlarged 2.4x.
  - Cropped to content width (media/prototype-06/cards-fit). Avatars, usernames, dates and counts are kept and the source wording is unmodified.
  - Stack layout: older cards keep a 92px header strip visible above the front card, and a spring brings each new card in. This follows the ThreadViral stacked-card pattern, rebuilt in our own code.
- **Voice:** 15 lines in VieNeu Thiện Minh, using a per-line cache keyed by the text hash (the pr-brainrot pattern). Speech totals 41.7s.
- **Captions:** word-level timing from whisper.cpp 1.7.6 (`small`, language vi), installed through @remotion/install-whisper-cpp.
  - Whisper's word timings are mapped onto the exact script words, so the displayed text is never whisper's spelling.
  - Paging and highlighting use @remotion/captions createTikTokStyleCaptions (1100ms grouping, 220ms silence break).
- **Audio:**
  - Background music is "Cute Happy Background Music" by Seth_Makes_Sounds (CC0 via Openverse/Freesound). It sits at gain 0.11 during speech and 0.26 between lines, with fades at both ends.
  - SFX are whoosh (qubodup), ding (Daphne_in_Wonderland) and laugh (schots), all CC0 per Openverse metadata.
  - Provenance is recorded in media/prototype-06/audio/provenance.json.

## Checks done (agent)

- The full decode passed with exit code 0 and no errors.
- Duration is 46.0s. The mixed audio peaks at 0.857 with RMS 0.104, so there is no clipping.
- 12 decoded frames were inspected in contact-sheet.png:
  - the card order follows the script;
  - usernames are legible on the front card and on the older strips;
  - captions match the narration line on screen.

## Not verified / risks

- **Nobody has listened to the draft.** The music/voice balance, SFX taste and comic timing need the user's judgment.
- **Possible TTS pronunciation problems.** whisper.cpp misheard several lines. This is either a whisper `small` error or an unclear TTS reading; listen to these first:

  | Line | Script | Whisper heard |
  |---|---|---|
  | c1r | "Bà cố nội này" | "bà cuốn lội này" |
  | c1 | "cà phê" | "cà phi" |
  | b3 | "Bản ngắn gọn" | "ngoài ngắn gọn" |
  | b5 | "Nhưng đỉnh nhất" | "Nguyên định nhất" |
  | c5 | "mẫu thân… ban thưởng… cáo lui" | "mẫu thình… ban cửa… cấu lùi" |
  | cta | "Còn bạn, sẽ rep mẹ câu nào?" | "Bạn sẽ giúp mẹ câu nào" |

  If confirmed, re-voice only those lines; the cache keeps the others.
- **Card text size.** The post card is 1382px wide, so it displays at 0.72 scale and its text is smaller than the comment cards.
- **Rights.** Public-use rights for the Threads screenshots are unresolved; private evaluation only. The music and SFX licenses come from Openverse metadata; the Freesound landing pages were not opened.
- **Not done.** No publishing, paid calls or automation.

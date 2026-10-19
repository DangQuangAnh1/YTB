# Render QA: stale sample frames, non-ASCII paths, and a final-mix intelligibility proxy

- Status: project-only (applied inside P-1 production/engine-v1); a shared-kit adoption is proposed
- Origin: P-1, plan v6 production cycle, 2026-10-17
- Scope: P-1 Production and Review stages. A candidate for shared render QA guidance.
- Evidence:
  - **Stale frames.** In prototype-07-v1, the frame-*.png files kept their 01:27 timestamps after the 01:45 re-render. The contact sheet built from them hid a fixed bug.
  - **Non-ASCII paths.** 12 of 14 whisper-cli runs failed on audition files named after Vietnamese voices (media/voice-audition-moods). They succeeded once the files were copied to ASCII temp names.
  - **Mix proxy.** artifacts/render/*/mix-intelligibility.json gives a final-mix WER of 0.135 for v2 (Thiện Minh), 0.092 for v3 (Adam bựa) and 0.08 for p07.
- Expected / observed:
  - The verify script should resample frames from the newest render. It silently reused old PNGs because ffmpeg was called without `-y`.
  - Card-fit cropping ignored a 220px right zone on every row, which clipped long comment text ("ae", "không còn chúng ta"). A self-review of the contact sheet caught it before the reviewers ran.
- Impact: two extra renders, about 15 minutes, and a near-miss where QA would have been based on stale frames.
- Baseline: kit HEAD before this session's commits. Affected renders are prototype-06-v3 and prototype-07-v1.
- Hypothesis / lesson:
  1. Any QA step that writes derived files must overwrite them or write them under a hash-keyed name. Otherwise the evidence can describe an older artifact.
  2. On Windows, native CLI tools may not accept non-ASCII paths, so pass ASCII temp copies.
  3. Reviewer agents cannot hear audio. Transcribing the final mix with whisper and comparing it to the script gives an objective intelligibility signal that complements human listening without replacing it.
- Change (P-1 only):
  - engine-v1/verify-export.py: ffmpeg now runs with `-y`.
  - engine-v1/build-timeline.mjs: aligns from an ASCII temp copy.
  - engine-v1/fit-cards.py: the icon zone is ignored only in the header rows.
  - engine-v1/mix-intelligibility.mjs: new.
- Checks: re-ran verify (frames now carry the 01:48 timestamp) and inspected the uncropped card text in frame-420/900 of prototype-07-v1. mix-intelligibility ran on three renders. Human listening has not been done.
- Adoption: future P-1 episodes use engine-v1. Shared guidance in creator-production/creator-review would need a scope decision.
- Undo: revert the engine-v1 files. The registered renders keep their hashes.
- Next: PM may propose adding "verify that derived QA files are newer than the target artifact" and "a final-mix ASR proxy for audio" to the creator-review rubric.

## Addendum: missing loudness mastering (user report, 2026-10-17)

- Status: applied (P-1 engine-v1); shared rule added to creator-launch packaging.
- Evidence: the user could not hear the v3 phone copies. Measurement showed the audio stream was present but integrated loudness was about -20 LUFS (RMS about -23 dBFS). Platforms play at about -14 LUFS, so the mix was nearly inaudible on a phone. The in-app player may also start muted.
- Change: `engine-v1/master-audio.py` applies a two-pass EBU R128 loudnorm (-14 LUFS, -1.5 dBTP) and writes `final.mp4`, so the registered draft is not overwritten. `phone-copy.py` now uses `final.mp4`. Results: -14.19 and -14.17 LUFS on the phone copies, with true peak -1.3 and -1.58 dB.
- Rule: a deliverable needs an integrated loudness check alongside decode, peak and RMS. Peak below 1.0 and "audio stream present" do not prove the video is audible.

## Addendum: registered backlog file and agency.py path bases (release-03, 2026-10-17)

- Status: observed; nothing in the kit changed.
- Evidence:
  - An in-place status edit to `projects/P-1/tasks/source-backlog.md` made `agency.py artifact` fail with "Hash mismatch". The file is a registered artifact.
  - The edit was reverted, `check` returned valid, and the status went into the checkpoint instead.
- Path bases:
  - `artifact --file` resolves paths from the project directory.
  - `review --file`, `checkpoint --file` and `plan` resolve paths from the current directory (the repo root).
- Rules:
  - Treat a registered backlog as immutable. Record status changes in a checkpoint, or write a new versioned backlog file.
  - Check which base a subcommand uses before writing with it.
- Next: PM may propose an unregistered, living backlog file or a `backlog` subcommand. This needs a scope decision.

## Addendum: first real viewer feedback on captions (P-1, 2026-10-18)

- Status: applied in P-1 engine-v1; project-specific.
- Evidence:
  - The single comment on the first public Short: "đừng có nhét thêm chữ vào thế pố".
  - The user agreed: "nhét sub vào ko hay thật".
- Change: the `brand.json` `captions` flag (now false) gates the word captions. An episode can override it with `lines.json` `captions`.
- Reusable lesson (I): for card-based comment-reading Shorts, the cards already carry the text. Word captions on top duplicate it and read as clutter. Make captions an explicit per-channel choice, not an always-on default. Re-check against retention data.

## Addendum: overnight batch lessons (P-1, 2026-10-18)

- Status: applied in P-1 engine-v1, checked on contact sheets. Kit unchanged.
- **Meme tiers:**
  - `build-timeline.mjs` adds `beat.micro` (silent, small reactions or punch-text placed by word or fraction) and guardrails: density cap, minimum gaps between any/hit reactions, no reaction in the hook or on the CTA, no asset more than twice.
  - The guardrails caught 5 too-close pairs, each fixed by moving the micro reaction to the end of its line.
- **Tall cards in a chain:** the layout scales every shown card by the tallest one, so one tall photo reply (1,538px) made the whole chain unreadable. `assemble-cards.py keep_rows` now crops the middle of tall photos; aim for 950px or less per card.
- **Hook line:** about 33 characters fit on one line. At 34 or more the last word drops to a second line.
- **YouTube chapters:** the first must be at 0:00 and each must be 10s or longer. A 2.4s "Mở đầu" chapter would void them all. `make-compilation.py` now starts Chuyện 1 at 0:00.
- **Phone copy:** the x264 two-pass phone copy crashed on a 5-minute compilation in the OneDrive folder; short Shorts were fine. Suspected cause: OneDrive locking the `.mbtree.temp` file. Use single-pass CRF for long videos.
- **Mix ASR:** per-line WER is inflated by segment edges at tight gaps. One Short scored 0.218 overall while the heard text was correct but shifted by a line. Read the heard text before acting on the number.
- **Capture:** a clone in a 1080px overlay plus scale-1 zoom gave readable 1080px cards. For chat screenshots in posts, render the post's largest srcset image (1179w) directly. Profanity is blurred inside the clone with a TreeWalker before capture.

## Addendum 2026-10-18: multi-voice cast and scout extraction

- **User correction (P-1 tasks/user-feedback-multivoice-v1.md):** when a Short has several characters, each one gets its own voice. Engine-v1 now takes a `cast` map in lines.json (speaker → VieNeu preset). The speaker is `speaker`, else "narrator" for bridges, else the card's handle. Cast clips are levelled to -20 LUFS before mixing. Research (P-1 research/multi-voice-v1.md, labelled inference) suggests keeping the narrator out of character roles, keeping one voice per handle, alternating clearly different neighbours, and treating text-free gender choices as guesses. This lesson is project-local: no kit rule changes.
- **Scout extraction gap (reported by the scout agent, not yet fixed):** Threads comment lists keep only part of the page loaded, so a single read can miss top comments. The creator-scout extraction snippet should scroll and merge before ranking. This is a candidate kit fix; it was not applied.
- **Open licence question:** the VieNeu README roadmap labels v3 Turbo "on-device, personal use" while its licence line says Apache-2.0. Recheck this against the model-card FAQ before monetizing.
- **Meme edits (P-1 release-08-v1, after the user asked for better memes):** engine-v1 beats now take `enter` (pop, slam, shake, rise), `fx` (a camera punch-in or shake) and `label_style: "meme"` (white SVG text with a black outline). A line can carry its own camera `fx` (push, zoom, shake) with an SFX and no sticker. The background dims while a big beat is on screen. Lesson: foreign names break VieNeu and ASR ("Sherlock Holmes" was heard as "Sao lúc hôm"), so spell them phonetically in the voice text and keep the card unchanged. A private name in the text can be blurred on the card and replaced in the voice with an invented name, disclosed in the description.
- **Speed-up (2026-10-19, after the user said one video took too long; release-08 took about 90 minutes):**
  - engine-v1 now has `capture-card.js`, a saved Chrome capture helper with hide, noPhotos and hidePhotos options and hi-res photos.
  - `lint-episode.mjs` runs before voicing. It flags foreign words, estimates the v2 verbatim share within about ±0.02 (it read 0.75 on p17, which measured 0.75), and checks beats, cast and cards. On the next batch it caught p19 at 0.79 before any TTS ran.
  - generate-audio uses adaptive takes: it stops once whisper hears a line with at most one error per 12 words. Digits are normalised before scoring, and the whisper alignment cache is shared with build-timeline.
  - make-release renders with concurrency 6 and runs the mix ASR check in parallel with mastering and the phone copy, which now uses x264 medium.
  - `make-episode.sh` chains lint, voice and release.
  - Timing results are in the batch report (P-1 tasks/batch-2026-10-19.md).

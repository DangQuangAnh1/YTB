# Per-video packaging

Produce `artifacts/release/<video>/package.md` with these parts:

- **Title options (3).** At most 60 characters each. Curiosity plus a keyword. Never misrepresent the source.
- **Description.**
  - 1–2 lines of hook or summary in the channel's voice, then the CTA.
  - Credits block: "Trích dẫn để bình luận: Threads @handle1, @handle2…" (the user decides whether handles are shown); "Giọng đọc AI (VieNeu)"; background, music, emoji and font credits from media/library/provenance.json; "Liên hệ gỡ bài: [email], xử lý trong 24h".
- **Hashtags.** 5–8, mixing broad, niche and series tags.
- **Search metadata (YouTube Shorts).** P-1 research/youtube-seo-v1.md has the evidence and the Vietnamese keyword banks.
  - **Title:** keep the hook in the first ~40 characters and the whole title at 60 or fewer. Use sentence case and at most 1 emoji. Leave hashtags out of the title. Every claim must happen in the video, so a joke comment is never stated as fact. YouTube treats overpromising as clickbait spam.
  - **Description:** line 1 is a unique hook that carries the main keyword. Then the CTA and the credits. All hashtags go in one final line.
  - **Hashtags:** 6–8 relevant ones: a mood or topic tag, a niche tag and a format tag, then the rest. YouTube shows the 3 it considers most engaging. More than 60 voids all of them. #shorts is optional and goes last.
  - **Tags field:** 8–13 search phrases taken from real autocomplete. YouTube says tags play a minimal role. Never stuff loosely related tags.
  - **Checks:** test every hashtag's landing page, which catches typos and empty tags. Use the platform name only as a place ("trên Threads"). Avoid press words, disaster bait and sexual framing. Vary the hook line between videos.
- **Cover/thumbnail.** Name the frame file and the overlay text, and keep it readable at small size.
- **Pinned comment.** It repeats the CTA in a form that feeds the next episode (for example "câu hay nhất lên tập sau").
- **Series tag.** For example "Lớn Rồi Mới Hiểu" or "Mật Mã Hội Bạn".
- **Rights gate.**
  - Script rights check (props.rights.pass).
  - Avatars blurred.
  - Handles shown according to the user's decision.
  - Minors check.
  - No film/TV stills.
  - Music/SFX receipts.
  - VieNeu license note.
  - Length 60s or under for Shorts.
  - Loudness mastered to about -14 LUFS with true peak at or below -1.5 dB (engine-v1 master-audio.py). An audio stream being present does not prove it is audible.
  - Record pass, fail or accepted-risk, with its source.

# P-1: plan v6 cycle report (PM), 2026-10-17

## Results

| Artifact | Description | Audience review | SEO (packaging / search / monetization safety) | Review verdict |
|---|---|---|---|---|
| A-080 prototype-06 v3 | Funny video, rebuilt in the new look with the Adam bựa voice; 54.5s | 7/10 | 7 / 5 / 4 | needs_revision |
| A-083 prototype-07 v1 | New demo using the sad mood preset, Mỹ Duyên voice, rainy-night footage; 61s | 5.5/10 | 5 / 6 / 3 | needs_revision |

Previews under 30 MB: artifacts/render/*/preview-720p.mp4. Reviews: tasks/review-agents-v6.md. Recorded verdicts: artifacts/reviews.

## What the team did

- **BA ×3**
  - Researched repositories: popular AI video and meme repos plus plan/idea repos.
  - Researched Vietnamese voices for each mood.
  - Researched a non-AI-looking design. All of this is in research/team-research-v6.md.
- **Production**
  - Auditioned 14 VieNeu voices and scored them by whisper word error rate (WER) and pitch range.
  - Built engine-v1 (production/engine-v1): one shared codebase, with each episode defined by a lines.json and a mood preset. The preset controls the voice, music, SFX, memes and look.
  - Built a shared asset library with provenance records (media/library/provenance.json).
- **Content**
  - Chose a fresh post for the sad mood (@karis.like.sleep7, 11.6K likes) and wrote the narration bridges.
- **Review ×2**
  - An audience persona and an SEO/marketing reviewer. Both are model simulations: they saw frames and read text, and neither listened to the audio.
- **Improve**
  - Recorded three QA lessons in improvements/2026-10-17-p1-render-qa-lessons.md.

## Measured checks

- Both renders decode fully at 1080×1920.
- Final-mix intelligibility (whisper WER): v2 0.135 → v3 0.092; p07 0.08.
- Card clipping was found during self-review and fixed before the reviews.

## Unverified

- Nobody has listened to the audio yet.
- Possible tone errors: the "tiên" pun, "giận hờn", "lở đất".

## Proposed v7 (needs a user decision)

1. Cold-open hooks starting at 0.0s:
   - funny video: land the first punchline by about 3s;
   - sad video: open on the 1.4K-like quote.
2. Text sizing:
   - enlarge key cards;
   - in the sad video, make the quote the hero element and shrink the captions;
   - hide half-cut lines in the card stack;
   - brighten the sad video.
3. Listen to the audio, then re-voice the flagged lines. The cache re-voices only those lines.
4. Cut the sad video to 45s or less. Over 60s, a Content ID claim blocks a Short worldwide.
5. Replace the Monkey Puppet meme with a Fluent emoji or our own sticker.
6. Raise the channel's own commentary to at least 50% of spoken time (explain, rank, add context) to reduce reused-content risk.
7. Choose a channel name without "Threads" and a host persona.
8. Adopt a privacy protocol: blur face avatars, credit authors, provide a takedown contact.

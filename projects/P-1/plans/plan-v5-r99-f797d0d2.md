# Plan v5 — prototype-06 stacked-card thread video

Scope: one new private draft, about 30–45s. It applies research/threadviral-and-repos-v1.md (ThreadViral pipeline shape plus open-source parts) while keeping the P-1 baseline from A-060: real Threads source cards with visible username/avatar, coherent original bridges, background music, and the selected Thiện Minh voice.

Steps:
1. BA/Content: pick one fresh, public, high-engagement Vietnamese Threads post with funny or diverse comments. Capture the post card and 4–6 comment cards from the browser as pixel crops that keep the real identity rows.
2. Content: build a comment-selection sheet (Giữ/Bỏ, with reasons) plus a draft narration of a hook, bridges and verbatim card readings. **User approves the selection before voicing.**
3. Production: voice each line with VieNeu Thiện Minh, using a per-line cache keyed by text hash. Install whisperX locally (free) for Vietnamese forced word alignment, feeding `@remotion/captions` word-highlight captions. If the install fails, fall back to proportional timing and label it as such.
4. Remotion composition:
   - stacked-card animation: previous cards recede and dim, the new card springs in front;
   - a dark slow original background;
   - music ducked by the known speech segments;
   - one or two SFX on the punchline;
   - optional short meme overlay from the existing sourced library.
5. Review: technical decode, frame samples, caption/identity legibility, and mix levels. Human listening and creative acceptance remain the user's call.

Limits:
- Music: CC0 only, from Openverse or locally synthesized, with attribution and license recorded.
- Zero added spend. No ThreadViral account or credits.
- No publishing, channel creation, scheduling, or scraping APIs. Threads content comes only from manual browser viewing.
- Source-card public-use rights remain unresolved; private evaluation only.
- New paths and IDs; prior artifacts are not overwritten.

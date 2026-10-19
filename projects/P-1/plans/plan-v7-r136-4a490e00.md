# Plan v7: Scout role, reply-chain format, rights hardening, two new topics

Source: tasks/user-feedback-v7.md and tasks/user-feedback-chains-voice-v1.md. Private drafts only. No publishing, no paid services, no voice cloning, no automation or scheduling.

1. **BA (agent):** research copyright, privacy and platform policy for this format (Vietnam IP and personal-data law, YouTube and TikTok originality rules, Threads terms, quotes, memes, music, TTS, fonts, stock footage). Output a rights checklist and pipeline mitigations.
2. **Kit:** add a `creator-scout` role skill. Its job is to find today's hot Threads posts through the logged-in browser (read only), rank them by likes, reply count and chain depth, flag rights risks, and report links to the user. Register the role in AGENTS.md.
3. **Scout run:** produce today's shortlist with links and send it to the user.
4. **Content:** pick two posts on different topics from the shortlist. Write chain-based scripts: cold open, chains of B with C/D, and original commentary of at least 50% of spoken time where possible.
5. **Production (engine v2):**
   - chain layout, with child replies attached under the parent card;
   - narrower captures for larger card text;
   - voice tempo 1.1× with per-line caching;
   - Ngọc Linh for the buồn mood;
   - fixes for collapsed-card strips and caption chunking;
   - emoji-only reactions;
   - adopt the rights mitigations from step 1 where they are feasible.
6. **Review:** audience and SEO reviewer agents on the two new videos. These are labelled simulations.
7. **PM:** final report with checks and gaps.

# User feedback: remove word captions, 2026-10-18

Evidence:
- The only viewer comment on release-01 (youtube.com/shorts/yLhRIOp9ja4), from @Qlncnq: "đừng có nhét thêm chữ vào thế pố". See tasks/metrics-2026-10-18-0221.md.
- The user, after reading the results: "tôi thấy việc nhét sub vào ko hay thật".

Decision (channel-wide): **no word captions on Đọc Cmt Giùm videos.**
- engine-v1 `brand.json` now has `"captions": false`.
- `build-timeline.mjs` passes `show_captions`. An episode can still override it with `"captions": true` in lines.json.
- `src/index.tsx` renders `<Captions>` only when `show_captions` is not false.
- Caption timing data is still computed, because the CTA hand-off uses it.

Kept, pending the user's view:
- the handwritten hook at the top;
- the closing CTA question;
- the source cards themselves.

Note: one comment is weak evidence. Retention data (available after up to 2 days) should show whether viewers swipe away during the narration bridges as well.

Already-published release-01 cannot have its file replaced on YouTube, so it stays as is. New renders go into new folders: release-03-v2 and release-02-v2.

Update: the user said "khoan, ko cần render lại video đâu". The release-03-v2 and release-02-v2 renders were stopped before producing output; the empty folder artifacts/render/release-03-v2 is left in place. The no-captions setting stays in engine-v1 for future renders.

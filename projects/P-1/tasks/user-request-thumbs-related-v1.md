# User request: thumbnails and related-video links (2026-10-20)

The user's message in chat, with a link to the channel review doc "Đánh giá kênh YouTube Đọc Cmt Giùm" (Claude Docs):

> Khá là hay, tuy nhiên cần lưu ý về kênh ở đây … đọc và sửa cho hợp lý, về phần video ko cần sửa vội để sửa sau. có 2 cái tôi thấy cần sửa là để thumb mỗi video hợp lý hợp và mỗi video có cái mục đề xuất ý, đề xuất nội bộ lẫn nhau đi

Then:

> bạn tiếp tục đi. sau đó commit nhé

## Done (YouTube Studio, 20/10, via Claude-in-Chrome)

**Custom 9:16 thumbnails** were made with `production/engine-v1/make-thumbnail.py`: a blurred frame, a 2–3 line hook in large yellow and white text in the upper half, a meme or emoji sticker, and a Pt badge. Uploaded to:
- KnZgHePZnI0 "Minh Hà": release-08-v2/thumbnail.jpg
- ZazUgwubq2U "Hết tiền": release-13-v3/thumbnail.jpg
- FMAARXdLTlI "Bí mật con trai Pt.1": release-15-v3/thumbnail.jpg
- AVS1fIfYGrQ "Bí mật con gái Pt.1" (scheduled 19:30): release-17-v1/thumbnail.jpg
- The Pt.2 thumbnails are ready in release-18-v1 and release-19-v1 and are not uploaded, because Pt.2 is not published.
- yLhRIOp9ja4 "lẩu gà": the user then sent a screenshot of its old thumbnail (small handwritten hook) and asked "cái này thì sao". Replaced the same day with release-01-v1/thumbnail.jpg in the same style (spec: frame 6.0s, "HỎI MẸ LŨ CÓ SAO KHÔNG" / "MẸ REP:" / "nấu lẩu gà!", highlight line 2, sticker cat-shocked 520). Studio showed "Đã lưu thay đổi".

**"Video có liên quan" (related video)** was set and saved on:
- yLhRIOp9ja4 (lẩu gà) → KnZgHePZnI0 (Minh Hà)
- KnZgHePZnI0 (Minh Hà) → FMAARXdLTlI (con trai Pt.1)
- ZazUgwubq2U (Hết tiền) → AVS1fIfYGrQ (con gái Pt.1)
- FMAARXdLTlI (con trai Pt.1) → AVS1fIfYGrQ (con gái Pt.1)
- AVS1fIfYGrQ (con gái Pt.1) → FMAARXdLTlI (con trai Pt.1)

When Pt.2 is published, change Pt.1 → Pt.2 for each series.

**Done 21/10 ~21:25 ICT**, after both Pt.2 videos went public (see youtube-publish-log-v7.md):
- AVS1fIfYGrQ (girls Pt.1) → 3D8kW1N3FvY (girls Pt.2)
- FMAARXdLTlI (boys Pt.1) → 5_cG1Yta2s0 (boys Pt.2)

Studio saved both changes.

**Review doc:** the thumbnail item is ticked and two "Đã xử lý" items are added.

## Deferred (user: "phần video ko cần sửa vội")

These come from the review doc and are kept for the next video revision:
- a big text hook in the first 1–2s, and hiding the punchline until it is read;
- reaction stickers centred, clear of the bottom 20% and the right-hand buttons;
- an on-screen question in the last 3s, plus a pinned question comment;
- Pt.1 currently promises a Pt.2 that is not yet published. The Pt.2 drafts are ready and wait for the user's go-ahead;
- the AI label: the doc suggests labelling every AI-voice video, which conflicts with the user's standing "Không" answer. Left for the user to decide.

**Done 22/10 ~22:00 ICT**, after both Pt.3 videos went public (see youtube-publish-log-v8.md):
- 5_cG1Yta2s0 (boys Pt.2) → WIJay-r75Vk (boys Pt.3)
- 3D8kW1N3FvY (girls Pt.2) → izDGzY_riP8 (girls Pt.3)

Studio showed "Đã lưu thay đổi" for both. The chain now runs Pt.1 → Pt.2 → Pt.3 in each series. Each Pt.3 points back to its Pt.2.

# Rights research and mitigation protocol v1 (BA agent, 2026-10-17)

This is research, not legal advice. Questions for a Vietnamese IP/data lawyer are listed at the end. **V** means read on an official or primary page. **V\*** means statute text read on a secondary legal portal. **I** means inferred or from a secondary report.

## Verdict

In its v6 form, the format is **not safe to monetize**, for three reasons:
1. **YouTube reused-content policy** excludes "content that exclusively features readings of other materials you did not originally create" (V). An AI voice reading comments over a template fits that description.
2. **Vietnam Personal Data Protection Law 91/2025** applies (V\*): silence is not consent; public disclosure needs consent; there is no public-data or journalism exemption. Decree 356/2025 lists name, image and account info as basic personal data (V).
3. **The quotation exception** (IP Law Art. 25(1)(đ), as amended by Law 07/2022) requires a short quote that serves comment and names the author (V\*). It does not cover videos made mainly of other people's text (I).

The format becomes defensible (I) only if every one of these holds:
- consent for headline posts;
- replies paraphrased or anonymized;
- original commentary of at least 50%;
- verified music;
- no film/TV stills.

No documented strike or lawsuit against Vietnamese Threads-screenshot channels was found.

## Other key points

- **Threads Terms 3(a)** forbid "khai thác Dịch vụ Threads cho bất kỳ mục đích thương mại nào" and forbid bots or scrapers (V). The embed/oEmbed endpoint is for front-end embedding only (V). Instagram/Threads terms grant third parties no rights (V).
- **Decree 174/2026 Art. 95(1)(d):** sharing literary works on social networks without consent carries a 20–30m VND fine plus removal (I). Civil Code Art. 32 covers images of individuals, which includes avatars with faces (V\*). Decree 147/2024 forbids press-style formats or names for non-press accounts (I).
- **YouTube:**
  - privacy complaints cover uniquely identifiable people (V);
  - a Short over 60s with an active Content ID claim is blocked globally (V);
  - CC0 material is not eligible for Content ID, but false claims still happen (V).
- **TikTok** excludes "unoriginal content" from the For You feed and from Creator Rewards (I).
- **Assets:**
  - Pexels, Fluent Emoji (MIT) and OFL fonts: Low risk (V).
  - Freesound: the website terms bar commercial use of the portal and the API terms make it case by case. Download CC0 originals by hand while logged in and keep the license page (V).
  - Imgflip / Monkey Puppet: High risk, banned (V).
  - VieNeu: the HF card allows commercial use of presets, but the GitHub roadmap says "personal use", which conflicts. The watermark is an opt-in extra (`resemble-perth`) (V).

## Risk matrix

| Level | Risks |
|---|---|
| High | YouTube monetization; TikTok For You feed; meme stills; drama posts |
| Med | Personal-data law; privacy takedowns; copyright of comments; CC0 Content ID; Threads commercial clause |
| Low–Med | VieNeu license conflict; literary quotes; Decree 147 naming |
| Low | Pexels, Fluent, OFL, Freesound access method |

## Enforceable protocol and status in P-1

| # | Rule | Stage | Status after v7 |
|---|---|---|---|
| 1 | Manual screenshots only, no scrapers. Keep a per-post log (URL, handle, capture time, sha256, public status). | Scout/BA | Partial. Capture uses the browser and a human-like reading pace, and provenance JSON files are kept. Automated DOM reading during scout is flagged as a residual risk. |
| 2 | Reject minors, sensitive topics, accusations, phone numbers or locations, and deleted posts. | Scout | Applied in the creator-scout skill (hard-rejects). |
| 3 | Consent from the headline poster. No reply means no use. Otherwise paraphrase or anonymize. | BA | **Not done.** Sending messages needs user approval; the template is below. |
| 4 | Blur all avatars. Show handles only with consent. | Production | Avatars are blurred at capture from v7. Handles stay visible in **private** drafts. Needs the user's decision before any release. |
| 5 | At most 3 verbatim comments, each 30 words or fewer. Verbatim speech at most 35%. Original narration at least 50%. Tag lines ORIGINAL/QUOTE. | Content | Applied in v7 scripts. build-timeline reports the ratios. |
| 6 | Anti-template: vary hook and structure, give each video an original angle, no press naming. | Content | Partial. |
| 7 | Credit quotes; no song lyrics; label "ca dao (biến tấu)". | Content | Applied in the description drafts. |
| 8 | Asset ledger allowlist (CC0, Pexels, MIT, OFL, Apache-2.0). Ban film/TV stills and Imgflip. | Production | Monkey Puppet removed; ledger at media/library/provenance.json. Freesound files to be re-downloaded by hand before release. |
| 9 | Keep Shorts at 60s or under. Keep a music dispute packet. | Production/Review | Applied. v7 targets 45s or less. |
| 10 | Pin the VieNeu revision. Presets only. Enable the watermark extra. Disclose "Giọng đọc AI". | Production/PM | Presets only and disclosure in the description. Watermark extra not installed (open). |
| 11 | A failed checklist blocks the draft. | Review | Applied to the review rubric for v7. |
| 12 | Description block: credits, "trích dẫn để bình luận", "Giọng đọc AI", takedown email, 24h removal. | PM | Draft template in the v7 packets. |

## Consent template (from the research)

> Chào @handle, mình là kênh [tên] (Shorts/TikTok, có thể bật kiếm tiền). Mình xin phép trích bài [link] (đọc bằng giọng AI, kèm bình luận của kênh), không đổi ý bạn. Bạn chọn: "Đồng ý – hiện tên" / "Đồng ý – ẩn danh" / "Không". Không trả lời = không dùng. Gỡ bất cứ lúc nào qua [email].

## Questions for a lawyer

1. Does a screenshot plus a verbatim AI reading in a monetized Short count as "trích dẫn hợp lý"?
2. Quotation requires naming the author, while the data law requires consent to publish personal data. Is a pseudonymous handle personal data?
3. Does Law 91 apply to a solo creator, and what are the fine bands under Decree 330/2026?
4. Is blurring enough for avatars under Civil Code Art. 32?
5. Does Decree 174 Art. 95 cover credited quotes?
6. Is a household business registration needed to monetize?
7. What is the exposure under Threads Terms 3(a)?

The agent noted that pages on hethongphapluat.com contained instructions aimed at AI tools. It ignored them.

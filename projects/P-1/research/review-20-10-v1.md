# Review: 20/10 comment shortlist and final lineup (2026-10-22)

**Role.** Independent Review, before any card capture or render (tasks/user-request-20-10-video-v1.md, step 2).

**Material under review.** research/collect-20-10-v1.md (the collector's candidate table and proposed lineup).

**Rules applied.**
- PLAYBOOK.md, steps 1, 4, 5 and 6b
- tasks/user-request-20-10-video-v1.md
- tasks/user-request-pt3-v1.md: "nhạt" feedback; only the opening topic is read
- tasks/user-decision-clone-v2.md: reads only, crude words bleeped, verbatim cap lifted for clone/topic
- tasks/user-decision-meme-images-v1.md
- tasks/user-decision-multivoice-v1.md
- tasks/user-decision-publish-release08-v1.md: names in the joke stay visible
- the used-handle list (session scratchpad `used_sources_2026-10-22.json`, `handles` key)

**Also checked.**
- Every earlier episode script (production/episodes/p06–p30 `lines.json`), for repeated jokes and handles.
- The rendered timelines of release-20-v2 (p29) and release-21-v1 (p30) (`props.json`), for the real speaking rate.
- engine-v1 `capture-card.js`, `build-timeline.mjs` and `lint-episode.mjs`, for how find strings, bleeps and beats behave.

**Method and limits.** Repo files only. No browser, no capture, no render, no TTS. I did not see the Threads pages. The verbatim text, reply parentage, like counts and media flags are the collector's; I checked them only for internal consistency.

**Status.** This is a model review: one model's assessment, not user approval. "Approved" below means cleared by Review for capture. The user still approves the draft video.

---

## 1. Verdict in short

- **Thread: KEEP the collector's recommended opening, #8 @rianggg.205.**
  - The post is text-only and coherent.
  - Its best replies build one running gag: "6/4 là ngày gì?" → "19/11 trùng ngày quốc tế bồn cầu" → an AI confirms "Đúng."
  - Every card in the final cut comes from this one thread, so nothing needs a second topic read aloud (pt3 rule).
- **Length: the collector's plan is about 2.5–3 times too long** (§2).
  - The brief's figure of 13–15 syllables/s does not match our engine. Measured renders hold about 240–275 spoken syllables in 68–72 s.
  - The final cut is **252 spoken syllables, about 71–74 s**.
- **Cut:**
  - all non-#8 comments (bland, or off-theme for this cut);
  - C06 Gipsy Danger: about 27 s on its own, and it carries a catchphrase already used in boys Pt.1;
  - C07: a long argument;
  - C08: duplicates C02;
  - C03 and the fillers.
- **meta.ai closer: ALLOW, with conditions** (§6). Fallback in §10.
- **Corrections to the collect file:**
  - Two find-string collisions: C01 vs C10, and meta.ai vs the "meta.ai" tag inside trieu's comment.
  - ktran1911 repeats a Pt.1 line.
  - "Cu" and "64" need a specific TTS reading.
  - The verbatim policy is an interpretation the PM should record (§11).

## 2. Length budget: correction to the brief and the collect file

| Render | Episode | Spoken syllables (title to closing line) | Lines | Big beats | Video length | Syllables per video-second | Speech rate inside clips |
|---|---|---|---|---|---|---|---|
| release-20-v2 | p29 | 239 | 13 | 3 | 68.3 s | 3.5 | 4.1 syll/s (58.3 s of speech) |
| release-21-v1 | p30 | 273 | 14 | 3 | 72.4 s | 3.8 | 4.35 syll/s (62.8 s of speech) |

- **What fills the rest of the time:** about 0.3 s of edge silence per clip, 0.28 s gaps, about 2 s per big beat, and 0.3 s per fx hold.
- **So 60–75 s ≈ 210–280 spoken syllables** in total, including the title and closing lines. It is not 650–900.
  - At ~3.6 syllables per video-second, the collector's ~650-syllable plan would run about 3 minutes.
- **Date lists read slower.** p29's "một, hai, ba, bốn, năm" line ran at 3.4 syll/s. This lineup has two date-heavy cards (the opening and C02).
- **Lint warning is expected.** `lint-episode.mjs` still targets 25–45 s, so it will warn on any 60–75 s episode, as it would for p29 and p30. This is not a blocker.

## 3. Verdict per item

The punch score is my assessment for young Vietnamese viewers: 5 is the strongest. CTX means the comment needs its parent post.

### Collector's lineup and fillers

| id | handle | Verdict | Punch | Reason | Treatment if kept |
|---|---|---|---|---|---|
| C01 | rianggg.205 (opening) | **KEEP** | 3 (setup) | Text-only. It lists 6/4 and 19/11, which later cards pay off. | Voice the dates as dates ("tám tháng ba…"); otherwise "8/3" can come out as "tám phần ba". Find **"Ngày cho phụ nữ"**: the collector's "Ngày cho đàn ông" also matches C10 on the same page. |
| C14 | melody_meowmeow | CUT | 2 | Relatable but bland. "Đớn 1 / đớn 10" is the kind of line the user called "nhạt". It also switches to the women's no-gift angle mid-video. | – |
| C15 | pthao.28 | CUT | 2 | Mild, 38 syllables, off-theme. | – |
| C16 | t.wzyi | CUT (bench) | 3 | "1 clip tiktok" is fine, but it costs about 10 s. Bench it for a separate women's-side video. | If ever used, bleep "đèo", "mẹ" and "đéo". |
| C17 | kendeeep | CUT | 2.5 | Many viewers will see "2tr bồi thường" as a win, so the outrage doesn't land. The quoted boyfriend would also need a second voice. | – |
| C02 | cake_is.calling → rianggg.205 | **KEEP** | 3 | Introduces "19/11 = quốc tế bồn cầu", which C12 and C09 pay off. The OP's deadpan reply adds a beat. | Voice it without the parenthetical; the card stays whole. Respell the English. First card to cut if the cut runs over 75 s. |
| C04 | minh_tiep_03 → cutiart_ → minh_tiep_03 | **KEEP** | 4.5 | It answers the question every viewer has after the post ("6/4 là ngày gì?"). 6/4 → 64 → Đồng → Cu is the most bựa reveal in the set and still mild (a chemistry pun). | "64" voiced as "sáu tư" (not "sáu mươi bốn"), so it echoes "sáu tháng tư". "Cu" voiced in lowercase as "cu". "chủ tus" voiced as "chủ tút". No bleep (§8). |
| C07 | hoangxshikoku chain | CUT | 2 | 91 syllables (about 25 s) of debate. "Có tiếng không có miếng" is mild. It also says "ngày quốc tế bé trai", which next to the Cu pun edges toward a minors association. | – |
| C05 | anhtuan.imnita → hotmeecutee | **KEEP** | 5 | A long, pompous speech slammed with one word. Universal. | "câm" is rude, not crude: no bleep. It is a one-word line, so listen to the take. |
| C06 | vinh.duonh → justung274 → huy_cao_01 (+ ktran1911) | CUT | 4 | See the detail below. | Bench it for a long-form compilation. |
| C08 | kal.wardin.547 | OPTIONAL (swap) | 3 | Same toilet-day reveal as C02, plus "NNN", which most viewers won't decode when voiced ("en en en"). | Use it only if C02's English reply fails TTS. |
| C12 | vanlamon | **KEEP** | 4 | Born on 20/10, he loses even the one day the post gives men. It calls back toilet day and "cái ngày tự phong" (6/4). | Bleep (§4). fx shake. |
| C10 | gary657432 | **KEEP** | 4 | 8 syllables. It mirrors the post's list on screen, with a dark twist. | fx push. Try "sinh nhật, đám tang." so there is a beat before "đám tang". |
| C09 | trieu_goi_hon_mang → meta.ai | **KEEP (conditional, §6)** | 5 as closer | The AI's one-word "Đúng." caps the running gag. It is also factually right. | §6 |
| C18 | _uocco100ty_ (filler) | CUT | 2 | Bland, about 40 syllables. | – |
| C22 | varian9938varian99 (filler) | CUT | 2 | "Ngày rằm" is confusing on its own. | – |

**Why C06 is cut:**
- It runs about 105 syllables (about 27 s), over a third of the budget.
- It has 9 foreign or number tokens to respell: Gipsy Danger, Mark-3, plasma, I-19, GD6, 79,25, 1.980.
- The "drift" joke needs Pacific Rim knowledge.
- ktran1911's "tiết lộ bí mật quốc gia" repeats p24v2/p24v3 ("Sao lại tiết lộ bí mật quốc gia?").
- The gay-innuendo flavour already ran in p24, p27 and p30.

### Strongest alternates and the rest

| id | handle | Verdict | Punch | Reason |
|---|---|---|---|---|
| C03 | bowwiudau → OP | CUT | 2 | A weaker version of C04's 6/4 debunk. |
| C11 | aq2912 | OPTIONAL (swap for C10) | 4 | "Ngày giỗ" is itself an annual "day", which is arguably sharper. C10 stays because it mirrors the post's list. Never use both. |
| C13 | _hngmnhvwng_ (Porsche template) | CUT | 3 | About 45 syllables of foreign model names to respell. |
| C19 | ngqanh.09 | CUT | – | Possible minor: the handle may encode 2009. |
| C20 | nhincaigiizbae | CUT | 2.5 | "Cái nịt" is a dated meme. The handle closely resembles **nhincaigi4142**, used in p06/prototype-06; it may be the same person. Not an exact match to the used list. |
| C21 | _tttvii.ww chain | CUT | 2 | A call-out chain that depends on context. "lôz" would need a bleep. |
| C24 | alecthai123 | OPTIONAL (bench) | 3.5 | A clean pun on the dates that mostly explains itself, and the only good standalone line from another post that fits this theme. "20/11" (Teachers' Day) next to "19/11" may confuse. |
| C23, C25, C27 | – | CUT | – | CTX: they need their parent posts, which we can't read aloud. |
| C26 | __co.chin | CUT | 2 | Mild. |
| C28 | nguynxing | CUT | – | Doesn't stand alone. |
| Alt. A (#1 @k_t_t_l00, C29–C38) | – | CUT, in any form | – | See the detail below. |
| Alt. B (punlnh0103, C39–C40) | – | CUT for this video | – | Chat screenshots not checked for names; a story format; low likes. Bench it for a "bạn trai tệ" video. |

**Why Alternate A is cut in any form,** despite the 34K likes:
- The opening is a CCTV video of two identifiable private people accused of theft (privacy and defamation), and blurring it would remove the context.
- Shop location details appear in the replies.
- One commenter speculates the two are school-age.
- The tone is more "chửi" than bựa.

### Repeat check

- **Handles.** None of the 10 handles in the final cut is in the used-handle list. A grep over every earlier script and render finds none of them either.
- **The `urls` key.** It does list the #8 post URL, along with all the scout's 20/10 posts. I read it as the scout's "seen" log, not as "used in a video": the `handles` key and the episode scripts have no trace of these posts. The PM should confirm this reading.
- **Jokes.** None of the seven listed earlier jokes appears.
- **Thematic overlap (not a repeat).** Toilet humour also ran in p27 ("ỉa lâu") and p29 (bồn tiểu). Here the toilet gag is the spine of the video (§11).

## 4. FINAL approved lineup (Review-approved for capture; not user-approved)

### Episode settings

- **Format:** `format: "v2"`, `mood: "hai_v2"`. Reads only, plus the title line and one closing line.
- **Title card:** `{"line": "t0", "lines": ["topic:", "ngày của", "\"ĐÀN ÔNG\"", "là ngày nào?"], "highlight": 2}`
- **Chains:** `[["c1-minh_tiep_03", "c1a-cutiart_", "c1b-minh_tiep_03"], ["c3-cake_is.calling", "c3a-rianggg.205"], ["c4-anhtuan.imnita", "c4a-hotmeecutee"], ["c6-trieu_goi_hon_mang", "c6a-meta.ai"]]`. Every card in each chain is shown.
- **Card ids** follow the engine's `card.split('-')[1..]` speaker rule, so a handle keeps one voice. The OP's post and her reply in c3a both resolve to rianggg.205.

### Order

The time column is my model fitted on p29/p30, which overshoots by 1–2.6 s; treat it as ±3 s.

| # | Line id | Speaker (gender → voice) | Bleep | Beat / fx | Syll. | ~Time (s) |
|---|---|---|---|---|---|---|
| 0 | t0 | narrator → Adam bựa | – | – | 7 | 0.1–2.0 |
| 1 | p1 | rianggg.205 (F) → Trúc Ly | – | – | 27 | 2.2–10.0 |
| 2 | c1 | minh_tiep_03 (M) → Thiện Minh | – | – | 11 | 10.3–13.1 |
| 3 | c1a | cutiart_ (F, guess) → Ngọc Huyền | – | – | 41 | 13.3–22.8 |
| 4 | c1b | minh_tiep_03 (M) → Thiện Minh | – | **BIG 1** | 5 | 23.0–24.4 |
| 5 | c2 | gary657432 (F, guess) → Mai Anh | – | fx push | 8 | 26.7–28.8 |
| 6 | c3 | cake_is.calling (M, guess) → Phạm Tuyên | – | – | 26 | 29.4–36.9 |
| 7 | c3a | rianggg.205 (F) → Trúc Ly | – | fx shake | 6 | 37.2–38.8 |
| 8 | c4 | anhtuan.imnita (M) → Thiền Tâm Đức | – | – | 52 | 39.4–51.3 |
| 9 | c4a | hotmeecutee (F, guess) → Ngọc Linh | – | **BIG 2** | 1 | 51.5–52.1 |
| 10 | c5 | vanlamon (M) → Thái Sơn | tiên, sư, bố, mẹ, đéo | fx shake | 30 | 54.3–61.3 |
| 11 | c6 | trieu_goi_hon_mang (F, guess) → Ngọc Huyền | – | – | 28 | 61.9–68.4 |
| 12 | c6a | meta.ai (AI) → Phạm Tuyên | – | **BIG 3** | 1 | 68.7–69.2 |
| 13 | z1 | narrator → Adam bựa | – | – | 9 | 71.5–73.8 |
| | | | | | **252** | **≈ 71–74 s** |

### Line details

Card text is verbatim from the collect file; ⏎ marks a line break in the original. The voice text is what goes into `lines.json`; the card always stays as posted.

**t0 (narrator)**
- Voice: "Ngày của đàn ông là ngày nào?"

**p1: @rianggg.205, the opening post (read aloud).** Capture on https://www.threads.com/@rianggg.205/post/DeuBP9REkL4.
- Card: "Ngày cho phụ nữ ⏎ - 8/3 ⏎ - 20/10 ⏎ - Sinh nhật ⏎ Ngày cho đàn ông ⏎ - Sinh nhật ⏎ - 6/4 ⏎ - 19/11"
- Voice: "Ngày cho phụ nữ: tám tháng ba, hai mươi tháng mười, sinh nhật. Ngày cho đàn ông: sinh nhật, sáu tháng tư, mười chín tháng mười một."
- Find: `Ngày cho phụ nữ`

**c1 / c1a / c1b: the 6/4 chain.** Capture on https://www.threads.com/@minh_tiep_03/post/DeuTRA9E2jH.
- c1, @minh_tiep_03
  - Card: "Khoan khoan, ngày 6/4 là cái ngày gì vậy??"
  - Voice: "Khoan khoan, ngày sáu tháng tư là cái ngày gì vậy?"
  - Find: `Khoan khoan, ngày 6/4`
- c1a, @cutiart_
  - Card: "Nó là ngày do giới trẻ tự bịa ra, 64 là Đồng trong bảng tuần hoàn hoá học, mà Đồng là Cu. Nó chả là ngày gì cả, chủ tus chỉ đang cố gán ghép ý nghĩa cho nó thôi."
  - Voice: "Nó là ngày do giới trẻ tự bịa ra. Sáu tư là Đồng trong bảng tuần hoàn hoá học, mà Đồng là cu. Nó chả là ngày gì cả, chủ tút chỉ đang cố gán ghép ý nghĩa cho nó thôi."
  - Find: `mà Đồng là Cu`
  - Lowercase "cu" so VieNeu does not spell out "C-U". Set `asr_expect` to the same sentence. Listen that "cu" and "sáu tư" are clear.
- c1b, @minh_tiep_03
  - Card: "Thế thì em chịu rồi 🤦‍♂️"
  - Voice: "Thế thì em chịu rồi."
  - Find: `Thế thì em chịu rồi`

**c2: @gary657432.** Capture on the #8 post page.
- Card: "Ngày cho đàn ông: ⏎ Sinh nhật ⏎ Đám tang"
- Voice: "Ngày cho đàn ông: sinh nhật, đám tang."
- Find: `Đám tang`

**c3 / c3a: the toilet-day setup.** Capture on cake_is.calling's comment permalink (open it from the #8 page) so the OP's reply renders under it.
- c3, @cake_is.calling
  - Card: "Còn 1/6, 14/2+14/3 ( có là trai thì đa phần cũng tặng thôi =)) ) 19/11 còn chung với ngày QUỐC TẾ BỒN CẦU 🥀💔"
  - Voice (parenthetical not voiced): "Còn một tháng sáu, mười bốn tháng hai cộng mười bốn tháng ba. Mười chín tháng mười một còn chung với ngày quốc tế bồn cầu."
  - The all-caps words go into the voice text in lowercase, so they are not spelled out.
  - Find: `QUỐC TẾ BỒN CẦU`. Matching is case-sensitive, so this does not hit C12's lowercase "quốc tế bồn cầu".
- c3a, @rianggg.205 (the OP)
  - Card: "sad =))) happy toilet day"
  - Voice: "Xét. Hép pi toa lét đây."
  - `asr_expect`: "Sad. Happy toilet day." Listen. If the English is mangled, drop c3a (card and line).
  - Find: `happy toilet day`

**c4 / c4a: the "câm" slam.** Capture on https://www.threads.com/@anhtuan.imnita/post/DeuF3G7o6Sz.
- c4, @anhtuan.imnita
  - Card and voice, verbatim: "Thật ra đàn ông chúng tôi không để ý lắm đến những ngày dành cho mình đâu. Với đàn ông thì chúng tôi không đòi hỏi lắm sự vinh danh, âm thầm làm việc và cống hiến, miễn là mọi người đừng phủ nhận cố gắng của chúng tôi là đủ rồi."
  - Find: `không đòi hỏi lắm sự vinh danh`
- c4a, @hotmeecutee
  - Card: "câm"
  - Voice: "Câm."
  - Find: `hotmeecutee`. The card's innerText contains the handle; a bare `câm` is too short to trust.
  - Check on capture that this reply sits directly under anhtuan's comment, not under juliahoang.es's "Câu trả lời rất đàn ông."

**c5: @vanlamon.** Capture on the #8 post page.
- Card: "Tiên sư bố nó mình sinh 20/10 nên mất mẹ ngày sinh nhật… Còn mỗi quốc tế bồn cầu với cái ngày tự phong đ tính tiền"
- Voice: "Tiên sư bố nó, mình sinh hai mươi tháng mười, nên mất mẹ ngày sinh nhật. Còn mỗi quốc tế bồn cầu, với cái ngày tự phong đéo tính tiền."
- Bleep:
  - **Required:** `"mẹ"` and `"đéo"`. The single-letter "đ" is voiced as "đéo" and then bleeped. Bleeping "mẹ" also stops "mất mẹ" being heard as "lost his mother".
  - **Recommended:** `"tiên", "sư", "bố"`, for consistency with the channel bleeping milder words ("đệch", "vãi", "lọ").
  - `build-timeline.mjs` matches one aligned word per entry, at its first occurrence, so the curse must be three separate entries.
  - Listen: if the triple bleep stutters, the PM may leave "Tiên sư bố nó" unbleeped. It is an old-fashioned oath, not a sexual or scatological word.
- The card script blurs none of these words ("đ" alone and "mẹ" are not in its list). The card shows the text as posted, which matches clone-v2.
- Find: `mất mẹ ngày sinh nhật`

**c6 / c6a: the ending.** Capture on https://www.threads.com/@trieu_goi_hon_mang/post/DewedTEGO8v.
- c6, @trieu_goi_hon_mang
  - Card: "19/11 là ngày quốc tế toilet nhé ⏎ meta.ai ⏎ đúng ko??chỉ đúng hay không thôi chứ không có ngoài ra"
  - Voice: "Mười chín tháng mười một là ngày quốc tế toa lét nhé. Mê ta ây ai, đúng không? Chỉ đúng hay không thôi, chứ không có ngoài ra."
  - `asr_expect` with "toilet" and "Meta AI".
  - Find: `ngày quốc tế toilet`
- c6a, @meta.ai
  - Card: "Đúng."
  - Voice: "Đúng."
  - Find: **`Đúng.`** (case-sensitive, with the period). **Do not use `meta.ai`**: trieu's own comment contains the tag "meta.ai", so `__cap` would grab trieu's card first. Visually confirm the overlay is the meta.ai reply.

**z1 (narrator)**
- Voice: "Đàn ông muốn được tặng gì? Bình luận nha!"

## 5. Beats and fx

**Big beats** (at most 3, at least 5 s apart; here about 24 s, 52 s and 69 s):
- **BIG 1, after c1b** "Thế thì em chịu rồi."
  - Settings: reaction `mindblown` (or `facepalm`, mirroring his 🤦‍♂️), enter `pop`, pause 1.8, label "Đồng = Cu?!", label_style meme, fx zoom.
  - The pause lets the pun land.
  - Keep labels away from "bé trai" or anything about children.
- **BIG 2, after c4a** "Câm."
  - Settings: reaction `cat_shocked`, enter `slam`, pause 2.0, label "Câm luôn!", fx zoom.
- **BIG 3, after c6a** "Đúng."
  - Settings: reaction `cat_thumbsup_cry`, enter `rise`, pause 2.0, label "AI xác nhận!", fx zoom.
  - This is the strongest punchline, and it comes last.

**fx (no meme):**
- c2 push on "đám tang";
- c3a shake;
- c5 shake.

These keep the energy up across the 28 s gap between BIG 1 and BIG 2. SFX can be any the hai_v2 preset allows; vary them.

## 6. Open question: the official @meta.ai card as the ending

**Recommendation (model assessment): ALLOW it as the closer, with the conditions below.**

- **Privacy: no issue.** It is an automated corporate account, not a private person, and the reply ("Đúng.") contains nothing personal. It is lower-risk than most cards we show.
- **Branding and affiliation: low risk if contained.**
  - Every card already shows Threads, which is a Meta product, and the description carries "Kênh không liên kết với Meta/Threads".
  - A screenshot of the bot's public one-word reply, inside a humour video, does not claim sponsorship.
  - Conditions:
    1. The avatar is blurred by `__cap` as on every card, which also blurs the Meta AI logo.
    2. The handle stays visible, because the joke needs it.
    3. **No "Meta", "Meta AI" or Meta logo in the title, thumbnail, tags or meme label.** So I reject the collector's title idea 2 ("Hỏi Meta AI…").
    4. The non-affiliation line stays in the description.
- **Clarity: works without a narrator quip.**
  - The question card already reads like a prompt to the bot ("meta.ai … chỉ đúng hay không thôi chứ không có ngoài ra").
  - Voicing the tag as "Mê ta ây ai" makes "AI" audible.
  - The beat label "AI xác nhận!" finishes it on screen. Labels are allowed; narrator explanations are not.
- **Accuracy: the answer is correct.** 19/11 is both International Men's Day and the UN's World Toilet Day. So the clip neither misrepresents the AI nor spreads a false claim.
- **Voice:** give it a voice distinct from its neighbours: Phạm Tuyên after trieu's female voice, before Adam bựa. It is a one-word line, so the lint will warn and someone must listen.
  - Optional: a newsreader voice such as Minh Đức would suit an AI. It is not in the approved set, so it would need an audition first.
- **Residual risk:** low.
  - Review cannot grant permission. The PM should name this choice in the draft delivery note so the user's draft review covers it.
  - The fallback in §10 costs one chain.

## 7. Cast

Rule: one voice per handle, neighbouring voices differ, and genders alternate. The order above alternates M/F from p1 to c6a. The only same-gender neighbours are meta.ai and z1, and z1 is the narrator, a clearly different voice. There are two deliberate voice reuses between non-adjacent minor characters: Ngọc Huyền (cutiart_ and trieu) and Phạm Tuyên (cake and meta.ai).

| Handle | Gender | Cue | Confidence | Voice |
|---|---|---|---|---|
| narrator | – | – | – | Adam bựa |
| rianggg.205 (OP) | F | Collector notes she mentions "my bf"; I did not see it. Default female OP. | medium | Trúc Ly |
| minh_tiep_03 | M | 🤦‍♂️ male-sign facepalm; "Minh Tiệp" | medium | Thiện Minh |
| cutiart_ | F | none; chosen to alternate | **guess** | Ngọc Huyền |
| gary657432 | F | none; chosen to alternate | **guess** | Mai Anh (deadpan "news" tone suits a list) |
| cake_is.calling | M | "(có là trai thì đa phần cũng tặng thôi)" reads as a man's lament | weak guess | Phạm Tuyên |
| anhtuan.imnita | M | "đàn ông chúng tôi" | high | Thiền Tâm Đức (mature voice for a pompous speech) |
| hotmeecutee | F | none; chosen to alternate | **guess** | Ngọc Linh |
| vanlamon | M | born on 20/10, so he is left with the men's days | high | Thái Sơn (a Southern voice for Northern text; minor) |
| trieu_goi_hon_mang | F | none; chosen to alternate | **guess** | Ngọc Huyền |
| meta.ai | AI | – | – | Phạm Tuyên |

Suggested `cast_note`: "Gender from text cues where present (anhtuan, vanlamon, minh_tiep_03). cutiart_, gary657432, hotmeecutee, trieu_goi_hon_mang and cake_is.calling are guesses chosen to alternate voices. meta.ai is Meta's AI account."

## 8. Bleeps, crude words and readings

**Bleeps:**
- **c5 vanlamon:** see §4.
- **No other bleeps in the cut.** "câm" is rude but not crude.
- **"Cu" in c1a is not bleeped.** It is literally copper's chemical symbol, and the pun has to be heard. It is milder than the "chim" lines the channel bleeped in p24 and p30.
  - If the PM prefers to be stricter, bleeping it ("mà Đồng là [bíp]") also works as a gag, because the card shows "Cu".

**Readings and respellings:**
- Dates are voiced as words: "tám tháng ba", "hai mươi tháng mười", "sáu tháng tư", "mười chín tháng mười một", "một tháng sáu", "mười bốn tháng hai/ba".
- "64" → "sáu tư".
- "toilet" → "toa lét". The lint's foreign-word check will **not** flag "toilet", so respell it by hand.
- "meta.ai" → "Mê ta ây ai".
- "sad … happy toilet day" → "Xét. Hép pi toa lét đây."
- "ko" → "không".
- "tus" → "tút".
- All-caps "QUỐC TẾ BỒN CẦU" → lowercase in the voice text.

**Safety:**
- No minors, politics, celebrities or private data in the cut.
- The collector detected no attached photos on these cards, but only from alt text. The PM must confirm on the contact sheet that no face photo or third-party screenshot slipped in, including any link preview under the meta.ai reply.
- Mild innuendo: "Cu", and a dark "đám tang" joke. Nothing explicit.

## 9. Packaging

- **Title (≤70 characters):** "Phụ nữ có 20/10, đàn ông có… ngày bồn cầu 🚽" (about 44 characters).
  - Alternative: "Ngày của đàn ông là ngày nào? Dân mạng trả lời đau thật 💀" (about 57 characters).
  - No brand names in either.
- **Thumbnail hook (4 words):** "NGÀY CỦA ĐÀN ÔNG?" in white, with a yellow main line "= NGÀY BỒN CẦU 🚽". Use the meme `cat_thumbsup_cry`.
- **Closing narrator line (z1):** "Đàn ông muốn được tặng gì? Bình luận nha!" (9 syllables).
  - Longer option: "Mười chín tháng mười một này, anh em muốn được tặng gì? Bình luận nha!" This adds about 1.5 s.
- **Description:** keep the Kevin MacLeod CC BY credit, the "Giọng đọc AI" line and "Kênh không liên kết với Meta/Threads".
- **Background (PLAYBOOK 6b):** nothing here constrains clip choice. If this goes out the same day as another video, check the contact sheets so the backgrounds look clearly different; set `bg_seed` or `bg_hue` if needed.

## 10. Fallbacks and trims

- **If the user or PM vetoes meta.ai:**
  - Drop c6 and c6a.
  - Move BIG 3 to c5 vanlamon: `cat_thumbsup_cry`, label "Mất luôn sinh nhật!".
  - The estimate drops to about 61–64 s. C12's "quốc tế bồn cầu" is still set up by C02.
  - If that lands under 60 s, voice C02's parenthetical: "có là trai thì đa phần cũng tặng thôi" adds about 2.5 s.
- **If the render runs over 75 s:**
  1. Drop c3a.
  2. Then drop c3 too. C09 explains toilet day right after C12.
- **If C02's English reply fails TTS:** drop only c3a. If c3 then feels flat, swap in C08 (voice "NNN" as "en en en"; most viewers will miss it).
- **Bench, in order of use:** C11 (swap for C10), C24 (if the user wants comments from more than one post), C08, C16 and C06 (long-form only).

## 11. Risks and uncertainties (my assessment, not verified)

1. **Length estimate is ±3 s.** It comes from two renders, not from TTS of these lines. The date-heavy lines may read slower. Run the lint and check the real `props.json` duration.
2. **"Tổng hợp" reading.** The user asked to compile good comments from the 20/10 posts. The final cut uses one thread, because it is the strongest and keeps the "only the opening topic is read" rule clean. If the user expected a cross-post mix, C24 (#2) and C16 (#5) are the best standalone add-ins, at about 5 s and 10 s.
3. **Verbatim policy.** This is neither a strict clone nor a "bí mật" topic video. I recommend treating it as topic format (reads only, `verbatim_accepted: "tasks/user-decision-clone-v2.md"`, as PLAYBOOK step 4 does for topic videos) and stating that in the episode note. The other reading ("tự chọn bài": verbatim ≤75%) would force narrator bridges, which the user rejected in clone-v2.
4. **Gender guesses.** Five speakers are guesses (§7). None of them shows on screen.
5. **One-word lines.** "Câm." and "Đúng." are both big-beat lines, and TTS/ASR are unreliable on single syllables. Listen to each chosen take.
6. **Respelled English.** c3a and the meta.ai tag in c6 may sound off. Use `asr_expect`, and listen.
7. **Toilet humour overlaps recent videos:** p27 "ỉa lâu" and p29 "bồn tiểu". It is not a repeated joke, but the user may feel sameness.
8. **The 6/4 "Cu" meme circulates among teens.** Nothing in the cut involves minors. Keep labels, titles and thumbnails free of "bé trai" or school references.
9. **Reply parentage.** The collector confirmed the C04, C05 and C09 chains from their comment pages; only C06 and C07 were inferred, and both are cut. Still confirm on capture that "câm" answers anhtuan directly.
10. **Low like counts** on several picks (gary 1♥, vanlamon 1♥, trieu 0♥, cutiart_ 2♥, hotmeecutee 3♥). They were chosen for punch, not social proof. This does not affect the format.
11. **The `urls` key** in the used-sources file lists the scout's 20/10 posts. I treated it as a "seen" log (§3). If it actually means "used", the PM should stop and check.
12. **Verbatim text.** I did not see Threads. If a captured card differs from the collect file, the card wins, and the voice text must be corrected to match it.

## 12. Not checked

- The live Threads pages, photos inside cards, current like counts and reply placement (no browser, by instruction).
- TTS output, ASR and loudness (no render).
- Background clip selection (PM's step).

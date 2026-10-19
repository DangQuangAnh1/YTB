# Meme rights, licence-clean sources and meme-video repos v1 (BA agent, 2026-10-18)

This report answers the user's request: "nghiên cứu xem dùng meme có rủi ro bản quyền không, và có repo nào chứa meme hoặc repo AI làm video kiểu meme mà mình dùng được không". It builds on mood-meme-music-sources-v1.md, rights-protocol-v1.md and team-research-v6.md §A, and does not repeat their findings except where they are re-checked.

- **Scope.** This is research, not legal advice. It was read-only: nothing was downloaded, installed, logged into or posted, and no project file other than this one was changed.
- **Marks.** **(V)** means verified on a page opened for this report. When that page is a secondary source, such as a law portal or news site, the claim says so. **(I)** means inference.
- **Repo data.** GitHub stars, licence and last push came from api.github.com/repos. After the unauthenticated core limit ran out, the same fields came from the GitHub search API using `repo:` qualifiers. Model licences came from huggingface.co/api/models.
- **AI-directed text.** mixkit.co/llm-info contained instructions aimed at AI assistants. They were ignored and treated as data.

## Key conclusions

1. **Classic memes are not cleared, and Vietnam's quotation exception does not rescue them.** This covers film, TV and anime stills, viral clips, image macros and meme-people photos.
   - Art. 25(1)(đ) allows "Trích dẫn hợp lý tác phẩm mà không làm sai ý tác giả để bình luận, giới thiệu hoặc minh họa trong tác phẩm của mình" only if the author and source are named and the use doesn't conflict with normal exploitation or unreasonably harm the owner (V, secondary portal).
   - Meme sources are usually unknown and stills are actively licensed: Getty charged €785 for the Socially Awkward Penguin photo, and Jukin sells viral-clip licences (V). Both conditions are therefore hard to meet (I).
2. **Real people in memes add a second, separate risk.** Civil Code Art. 32 requires consent for using a person's image, and payment when the use is commercial. Its exceptions don't cover mockery (V). This applies to Vietnamese meme personalities.
3. **Content ID is not the main danger for SFX, but licence-washing is.**
   - YouTube says "Sound effects, soundbeds, or production loops" are ineligible for Content ID (V).
   - The "vine boom" traces to a commercial sample pack (V, secondary), and Pixabay hosts user uploads titled "VINE BOOM" while disclaiming any warranty (V).
   - Use CC0 equivalents instead (I).
4. **Emoji, our own mascot and CC0 assets are safe.** Fluent Emoji (MIT) has 746 animated emoji, and every target category exists (V). Vendor emoji (Apple, Samsung) and LINE stickers are not cleared (V).
5. **No open-source repo does licence-clean, transcript-driven meme insertion for Remotion.**
   - brainrot.js clones celebrity voices (V).
   - memecub is a hosted API whose web-collected memes are flagged not for commercial use (V).
   - The practical path is a thin layer on engine-v1 (I): a bigger tagged reaction library, Vietnamese CLDR emoji keywords, a two-tier reaction model and an owned SVG mascot.

---

## Part 1. Rights: can memes be used in monetized Shorts?

### 1.1 Legal and platform rules that decide the matrix

| Rule | What it says | Mark |
|---|---|---|
| VN IP Law Art. 25(1)(đ), as amended by Law 07/2022 | Reasonable quotation "để bình luận, giới thiệu hoặc minh họa trong tác phẩm của mình" with no permission or fee, but the user must "thông tin về tên tác giả và nguồn gốc, xuất xứ của tác phẩm" | V (ketoananpha.vn full-text portal; lsvn.vn) |
| Art. 25(2) | The use "không được mâu thuẫn với việc khai thác bình thường tác phẩm" and must not unreasonably harm the author or owner | V (same) |
| Art. 25(3) | The copying cases in clause 1 don't apply to architecture, fine-art works or computer programs. Whether this also limits quoting drawn memes is unclear. | V (portal summary) / I |
| Applying Art. 25 to memes | "Minh họa" (illustrate) gives a reaction still an arguable hook, but "trích dẫn hợp lý" is undefined and needs a named author. Licensing stills and clips is a "normal exploitation" market. The view is untested and not a basis for a monetized channel. | I |
| Civil Code 2015 Art. 32 | "Việc sử dụng hình ảnh của cá nhân phải được người đó đồng ý"; commercial use requires paying the person. Exceptions: national or public interest; images from public activities "mà không làm tổn hại đến danh dự, nhân phẩm, uy tín". Remedies: withdrawal, destruction, damages. | V (tapchitoaan.vn reproduces the text) |
| Image misuse fines | 10–20m VND under Decree 15/2020 for misusing someone's image or spreading false images. Insult falls under Criminal Code Art. 155. These may have been superseded by later decrees. | V (lsvn.vn, 2024 article) / I |
| AI-generated works, VN | Only humans can be authors, so AI output is protected only where there is human creativity (V, law-firm page). A draft decree under the AI Law adds Art. 5a (four conditions, including "đóng góp đáng kể và mang tính quyết định" by a human). The draft is still under review (article dated 2026-03-02). | V (luatvietan.vn, tienphong.vn) |
| AI-generated works, US context | USCO Part 2 (2025-01-29): "prompting alone does not qualify as sufficient human authorship"; human selection, arrangement and modification are protectable | V (copyright.gov; copyrightalliance.org summary) |
| US fair use, for YouTube disputes only | Courts decide, not YouTube. Commercial use weighs against fair use. "Giving credit to the owner … won't by itself turn a non-transformative copy … into fair use." "No infringement intended" doesn't protect. | V (YouTube fair-use page) |
| YouTube reused content (YPP) | Not allowed: "Clips of moments from your favorite show edited together with little or no narrative". Allowed when "viewers can tell that there's a meaningful difference", e.g. commentary or a critical review. Permission from the creator doesn't exempt content. | V |
| YouTube inauthentic content (renamed 2025-07-15) | Not allowed: "Image slideshows, templated storylines, or scrolling text with minimal or no narrative" and AI content "made with generic or unoriginal templates giving the impression of mass production". Allowed: "using AI to visualize a unique character and narrative you invented". | V |
| Content ID eligibility | Ineligible as references: CC- or open-licensed content, public domain, fair-use clips, "Sound effects, soundbeds, or production loops", compilations, mashups | V |
| Shorts with claims | "Shorts longer than one minute that have an active copyright claim, regardless of the policy, will be blocked." Claimed Shorts over one minute are not monetizable. | V |
| Shorts revenue split | When a Short features third-party or remixed content, its views are divided with rightsholders. Music in a Short doesn't change the creator's 45% share. | V |
| Claims vs strikes | A Content ID claim sits on a video; a legal removal request puts a copyright strike on the channel | V |
| AI disclosure | Needed only for realistic content: "Creators don't need to disclose non-realistic content that's made with AI" | V |
| TikTok | "We do not allow any content that infringes copyright"; repeat-infringer bans; fair use and local exceptions acknowledged (V). Creator Rewards pays only for "original content that is over a minute long" (V), so our 45–55s cuts are ineligible anyway (I). | V / I |

### 1.2 Risk matrix by meme type

Copyright, Content ID and YPP refer to YouTube. Verdict: **S** = safe, **R** = risky (needs approval or per-item checks), **A** = avoid.

| Meme type (examples) | Copyright (VN) | Image / personality (Art. 32) | Content ID / claims | YPP reused / inauthentic | TikTok | Verdict |
|---|---|---|---|---|---|---|
| **Film, TV or anime reaction stills** (Monkey Puppet, Drake, Confused Nick Young, Táo Quân frames, "Omae wa mou shindeiru") | Protected film and photo works. The Art. 25 hook is weak because the author is usually unnamed and stills are licensed commercially. Getty billed €785.40 for the Socially Awkward Penguin photo (V). | Actors' likeness → consent and payment when commercial (V law, I applied) | Stills are matched less often than video (I), but takedowns and invoices from Getty-style agencies happen (V) | Brief stills alone don't trigger it (I) | Removal or ban under the IP policy (V) | **A** (already banned in rights-protocol-v1) |
| **Short clips from viral videos and TV** (VTV shows, viral fails) | Protected. VTV handled about 500 infringing channels or pages a month and reported pirates shrinking and distorting clips to dodge detection (V, VietNamNet 2018). Jukin sells viral-clip licences from $49 non-monetized to $99 monetized for one channel and charges people who don't license (V). | People in the clip (V law) | High: video and audio match. Shorts over 1 min with a claim are blocked (V). | Show clips with little narrative are listed as not allowed (V) | Same | **A** |
| **Meme SFX** ("vine boom", "bruh", "nani", Curb Your Enthusiasm theme, Vietnamese viral audio such as TikTok trend sounds and song or livestream snippets) | Vine boom: Bluezone Corporation's commercial 2012 pack, licensed to buyers (V, secondary meme.com). Free soundboard copies carry no licence (I). "Nani" comes from an anime dub and "bruh" from a voice clip, with unclear owners (I). Music themes and songs are protected (I). | A real person's recorded voice. Art. 32 names images only, so voice coverage is unclear (I). | SFX are ineligible for Content ID (V), so claims are unlikely. Music themes and songs are eligible and will be claimed (I). | n/a | In-app sounds are licensed for TikTok use only (I) | **R → A** for soundboard copies; use CC0 look-alikes (§2.3) |
| **Image macros and templates** (Distracted Boyfriend, Success Kid, Grumpy Cat, Pepe; Imgflip and memegen templates) | Underlying photos and drawings are protected. Grumpy Cat won $710k for copyright and trademark (V). Infowars paid Matt Furie $15k over Pepe (V). Imgflip grants no rights and memegen's template images carry no licence (V, prior report). | Real people in stock photos (I) | Low automated risk; invoices and DMCA notices happen (V) | A slideshow of templates is "inauthentic" (V) | Same | **A** |
| **Real people who became memes**, including Vietnamese meme personalities (TV, livestream and viral-video faces) | Photographer's copyright, plus | Consent needed; payment if commercial. Mockery fails the public-activity exception because it harms honour (V law, I applied). Fines and insult offences (V, secondary). AI likeness or voice clones of them carry the same issue (I). | Video sources: High | — | — | **A** |
| **Emoji sets** | Vendor designs are owned by their vendors. Emojipedia: Apple, Samsung, Facebook and WhatsApp licensing info "is not publicly available"; commercial products need "a licensed emoji set" (V). Open sets are licensed (§2.1). | None | Open licences are ineligible as Content ID references (V) | Fine as overlays on original commentary (I) | Fine | **S** (open sets only); **A** for vendor art |
| **Stickers** (LINE, Telegram, Zalo, Facebook packs) | Creators' works. LINE terms describe stickers as content "used in internet communication services operated by LYC", and outside use of Creators Collaboration content needs LYC's written approval (V). No video licence. | Character and trademark rights (I) | Low | — | — | **A**; **S** only for CC0 or own sticker sets |
| **AI-generated original meme characters** | We may use them freely if the model licence allows commercial use, e.g. FLUX.1-schnell Apache-2.0 "personal, scientific, and commercial" (V). Others can also copy them because protection is weak (V US / I VN). Owning them needs human edits and arrangement (V USCO). | Must not resemble real people or existing characters (I) | Not a reference (I) | Allowed when it's "a unique character … you invented" (V); mass-produced templates are not (V) | OK | **S** with conditions; no local GPU (§3.3) |
| **Own TTS catchphrases** ("Ủa alo?", "Ối dồi ôi", "Cạn lời!") | Short phrases are generally not protected (I). Don't imitate a specific person's voice (I). | — | — | Original | OK | **S** (I) |
| **Public-domain footage** (pre-war silent films on Wikimedia Commons) | VN film term is 75 years from publication (I: Art. 27, not re-read). Each file's PD status must be checked. | Commons notes PD files may still carry publicity rights (V) | PD is ineligible (V), but restored versions are sometimes claimed (I) | Clip compilations are not allowed (V) | — | **R** (one-off, low value) |

### 1.3 Legitimate in-platform options

| Option | Rules (V unless marked) | Fit for P-1 |
|---|---|---|
| **YouTube Shorts Remix** (Sound, Green Screen, Cut, Collab) | Remixed Shorts "are attributed back to the original work". Cut takes 1–5s of a music video. Sound takes up to 90s, and some partners limit it to 30s. Shorts are opted in by default and owners can opt out. Claimed or private videos may be unavailable. Remixed music Shorts can be blocked. Instructions are only for "the YouTube app on mobile". Shorts made outside YouTube's tools need cleared material, or face claims and strikes. Remixed or third-party content splits views with rightsholders. | **Poor fit (I).** Remix works only inside the YouTube app's camera, so it can't drop a clip or sound into a Remotion render. It also halves the original claim and the revenue. Use it at most for an occasional in-app response Short, which needs a separate user decision. |
| **YouTube Audio Library** music and sound effects | "Copyright-safe music and sound effects downloaded from the Audio Library won't be claimed … through Content ID". Monetizable in YPP. CC tracks need credit in the description. Off-YouTube use is **not** stated on the help page; secondary sources disagree (V absent / I). | **Good for YouTube-only SFX** (boing, slide whistle, crowd laugh) (I). Don't reuse those files in TikTok cuts. Keep a per-file ledger. |
| **YouTube Create** app stickers and GIFs | The app offers Stickers, GIFs and Emoji tabs (search result for the help page). No licence wording for stickers or GIFs was found (unverified). | Not usable: mobile-only editing and unknown terms (I) |
| **TikTok** in-app sounds, stickers and effects | Not verified: TikTok help pages render as empty JS shells | Keep TikTok cuts on our own audio only (I) |

### 1.4 Safe / risky / avoid list for this channel

**Safe now, within the current allowlist (CC0, Pexels, MIT, OFL, Apache-2.0):**
- Fluent Emoji Animated and static Color, Flat and 3D (MIT), with our own Remotion motion (pop, wobble, shake, zoom);
- an own mascot drawn as React/SVG, optionally built from Open Peeps (CC0) or DiceBear CC0 styles;
- Kenney Emotes (CC0) bubbles such as "!", "?", "…" and hearts;
- typographic punch stickers we write in OFL fonts ("Ủa?", "Toang", "Xỉu", "Cạn lời", "Hả???");
- Freesound **CC0** comic SFX downloaded by hand per file, and Kenney audio (CC0);
- Tabler icons (MIT);
- own VieNeu catchphrase stingers, subject to the open VieNeu licence question in rights-protocol-v1.

**Risky. These need a user decision or a check on each item:**
- Noto Animated Emoji and Twemoji (CC BY 4.0, credit required; CC BY is not in the allowlist yet);
- OpenMoji (CC BY-SA 4.0; share-alike may attach to an animated adaptation);
- LottieFiles free animations (custom licence; check each file for brands or characters);
- Mixkit SFX (custom free licence) and Sonniss GDC bundles (custom licence);
- YouTube Audio Library SFX (YouTube-only);
- Pexels, Pixabay or Mixkit stock "reaction" clips of real people (the "bad light" clause and uploader warranty);
- public-domain film clips;
- AI-generated stickers (no local GPU; a cloud GPU is a paid provider);
- a paid licence for an original meme SFX pack.

**Avoid:**
- film, TV and anime stills or clips;
- viral-video clips;
- Imgflip, memegen and Know Your Meme templates;
- GIPHY and Tenor;
- vendor emoji art (Apple, Samsung, Facebook, WhatsApp);
- LINE, Telegram, Zalo and Facebook stickers;
- photos, video, voice or AI likeness of real people, including Vietnamese meme personalities;
- soundboard meme audio (vine boom, bruh, nani, Curb theme, trending TikTok sounds, song snippets);
- Pixabay or other uploads titled with meme names;
- web-collected memecub results;
- non-commercial models (FLUX.1-dev, FLUX.2-dev, FLUX.2-klein-9B, RMBG-2.0, MusicGen) and OmniLottie outputs;
- celebrity voice-clone generators (brainrot.js).

---

## Part 2. Sources we can actually use

### 2.1 Emoji and sticker sets

| Source | Licence (V) | Attribution | Redistribution and other terms | Notes |
|---|---|---|---|---|
| microsoft/fluentui-emoji: Color, Flat, High Contrast, **3D** | MIT (V; per-emoji folders `3D`, `Color`, `Flat`, `High Contrast` confirmed via API) | Keep the MIT notice in the asset ledger. No on-screen credit needed (I). | MIT allows redistribution with the notice | 10,168★, last push 2026-08-24. Static 3D PNGs exist for gaps such as Money with wings, Cross mark, Collision, Sparkles, Red question mark, Prohibited, Face with peeking eye, Saluting face, Dotted line face and Face with diagonal mouth (V, HTTP 200). |
| microsoft/fluentui-emoji-animated | MIT (V) | Same as above | ~5 GB LFS repo; fetch single files only (V README) | 165★, last push 2024-10-17. **746** animated APNGs at 256px (V). Already used through `<AnimatedImage>`. |
| Noto Emoji (googlefonts/noto-emoji) | Fonts OFL-1.1; "most image resources" Apache-2.0; flags public domain (V) | Apache: keep the notice in the ledger (I) | — | 5,076★, last push 2026-09-24 |
| **Noto Animated Emoji** (Google Fonts) | CC BY 4.0 (V: remotion-dev/animated-emoji README and Remotion docs) | **Required:** credit plus a licence link and a note of changes, e.g. "Animated emoji: Google Noto Emoji, CC BY 4.0, scaled/animated" in the description (I) | — | **881** emoji (V, api.json). Lottie, GIF and WebM. Has mind-blown, peeking, salute and money-with-wings, but no facepalm or gesturing-no (V). |
| Twemoji (jdecked fork, 1,882★; twitter/twemoji, 17,801★) | Graphics CC-BY 4.0, code MIT (V) | Required. The project accepts a README, About or footer mention; for video, use the description (I). | — | Flat style; adds little next to Fluent (I) |
| OpenMoji (hfg-gmuend/openmoji, 4,566★) | Graphics CC BY-SA 4.0, code LGPL-3.0 (V) | "All emojis designed by OpenMoji – the open-source emoji and icon project. License: CC BY-SA 4.0" (V) | Share-alike: if our animation counts as an adaptation, the adapted material must be BY-SA. The CC FAQ treats modification that "rises to the level of an adaptation" that way (V); applying it to emoji motion is I. | Not recommended |
| tabler/tabler-icons | MIT (V) | — | — | 22,347★. Icons and arrows only, not emoji. |
| LottieFiles free animations | Lottie Simple License: commercial use OK, "Use of Files without attributing the creator(s) … is permitted"; modifications "must also be expressly distributed under the same terms"; no compiling files for a competing service (V) | Optional | Same-terms clause for modifications | Check each file for brands, characters or real people (I) |
| Kenney Emotes pack | CC0, **480** files (V) | Not required (V) | — | Speech-bubble emotes ("!", "?", "…", heart, anger). Good for micro reactions (I). |
| Open Peeps (Pablo Stanley) | CC0, "Free for commercial and personal use" (V) | — | — | Mix-and-match bodies and "emotions", 584,688 combinations (V). Mascot parts. |
| DiceBear (dicebear/dicebear, 9,878★, MIT code) | Per style (V): **CC0** for Notionists, Lorelei, Thumbs, Open Peeps, Moods and 37 more; **CC BY 4.0** for Fun Emoji, Big Smile, Adventurer, Croodles and others | CC BY styles need credit (V) | — | Deterministic SVG avatars, scriptable in Node. Use CC0 styles only (I). |
| Vendor emoji (Apple, Samsung, Facebook, WhatsApp) | No public licence (V, Emojipedia) | — | — | **Banned** |
| LINE, Telegram and Zalo stickers | Platform-scoped (V, LINE terms) | — | — | **Banned** |

### 2.2 Reaction GIF and video sources

| Source | Licence terms (V) | Use for P-1 |
|---|---|---|
| Pexels | "All photos and videos on Pexels are free to use"; "Attribution is not required"; modification OK. Not allowed: "Identifiable people may not appear in a bad light", implied endorsement, selling unaltered copies, redistributing on stock sites. | Background loops are already used. Stock "shocked person" clips placed next to a mocked comment could put a real model in a bad light (I), so prefer emoji. |
| Pixabay | Free, no attribution, modification OK. No "Standalone" distribution; no commercial use of trademarks; no immoral use of "recognisable people". Terms: "We do not warrant that any consents or licenses have been obtained". Search returns user uploads titled "VINE BOOM" and "vine boom 12345". | Only reputable uploaders' generic assets; never anything titled as a meme |
| Mixkit | Free License: commercial use including "YouTube videos", "No attribution required". **Restricted License: "Cannot be used in monetized content".** Separate licence per item type (V). | Check each item's licence badge. Free-License SFX are fine pending allowlist approval. |
| Wikimedia Commons public domain | Per-file licence. Commons warns content "may violate a person's right of publicity" and that without consent a reuser "probably has no right to commercially reuse" it (V, essay page). | Rarely worth it (I) |
| GIPHY / Tenor | Tenor API closed; GIPHY forbids storing copies (V, prior report) | **Banned** |

### 2.3 Meme and comic SFX

| Source | Terms (V) | Attribution | Meme-equivalent examples |
|---|---|---|---|
| Freesound **CC0** (filter `license:"Creative Commons 0"`) | "for the 'zero' license you can do pretty much what you want with the sound" (FAQ) | None for CC0. CC-BY files need credit; NC files are banned. | 888 CC0 "rimshot" results, including "Baddum Tish – Comedy Rimshots"; 9 CC0 "sad trombone" results, including "wah wah sad trombone.wav" (V). Also search boom/impact, slide whistle, boing, record scratch, crickets, gasp. Download by hand and save the page (rights-protocol rule 8). |
| Kenney audio packs | All assets CC0, "free to use them, even in commercial projects", attribution not required (V) | — | Impact, UI and interface sounds (Impact Sounds CC0 verified in the prior report) |
| Sonniss GDC Game Audio Bundle | Commercial use, "without attribution", unlimited projects; may not sell or "supply the sound effects as sound effects"; **no AI training** (V) | — | Cinematic booms as vine-boom substitutes (I). Custom licence → allowlist approval. |
| YouTube Audio Library SFX | No Content ID claims; monetizable on YouTube (V). Off-platform use not stated. | None for SFX (I) | Cartoon and comedy SFX (I). YouTube versions only. |
| Mixkit SFX | Commercial use OK, "fine to use … in video projects that you upload to YouTube", attribution not required (V) | — | "Funny" category with Fart, Laugh, Cartoon and Happy (V) |
| Pixabay SFX | Licence as above; the uploader-rights risk is proven by meme-titled uploads (V) | — | Avoid meme-titled items |

### 2.4 GitHub repos that bundle licence-clean meme-like assets

- **Clean:** microsoft/fluentui-emoji(-animated) (MIT), googlefonts/noto-emoji (Apache/OFL), remotion-dev/animated-emoji (13★, last push 2024-07-26; Noto animated as WebM, CC BY 4.0), jdecked/twemoji (CC-BY), hfg-gmuend/openmoji (BY-SA) and dicebear/dicebear (CC0/CC BY styles) (V).
- **Not clean:** no repo licenses classic meme images (prior report). akilluminati47/noto-animated-emoji-pack (0★, NOASSERTION) is a third-party scrape of all 881 Noto animated emoji; prefer the official source. Ken-pan/clovlets (CC0, 60 clay stickers, 0★, last push 2026-10-15) is too new to trust (I).

---

## Part 3. AI and repos for meme-style video

### 3.1 Meme-video generators and auto-insertion

| Repo / tool | ★ | Licence | Last push | What it is (V) | Fit for engine-v1 |
|---|---|---|---|---|---|
| noahgsolomon/brainrot.js | 958 | MIT | 2026-10-13 | Text → "brainrot" video. Next.js, Python and Remotion (`src/Composition.tsx`). Needs Speechify, OpenAI and Groq keys. Voice IDs include JORDAN_PETERSON_VOICE_ID and DONALD_TRUMP_VOICE_ID. No meme-overlay feature described. | **Avoid**: celebrity voice clones (Art. 32) and paid APIs. At most, read its Remotion composition patterns. |
| harvestingmoon/OBrainRot | 121 | MIT | 2025-04-08 | Reddit URL → brainrot video | Low; no meme layer (I) |
| AlessandroBonomo28/Openbrainrot | 12 | MIT | 2025-10-23 | Topic plus Reddit memes → clips | Avoid: Reddit memes are uncleared (I) |
| iambodha/Automated-Meme-Video-Generation | 3 | Apache-2.0 | 2026-10-17 | Meme compilations uploaded to YouTube | Avoid: compilations are inauthentic content (V policy) |
| Mmbugraaslan/viralcut | 3 | none | 2026-04-13 | "auto cuts, memes, subtitles"; method undocumented | Can't reuse: no licence |
| **liyupi/memecub** | 6 | MIT (integrations only) | 2026-10-14 | Hosted MCP/REST meme search. `match_article` "picks sentences that deserve a meme". Each result has a `commercial_use` flag; web-collected memes are `false`; "Images are not covered by MIT". Server not open source. | **Design reference only.** Our own "lines → reaction" step should copy the idea: a licence flag per asset and a filter to commercial-only. Don't call the hosted API: it sends script text to a third party, and most images are uncleared. |
| leo524/unclesix-video-stickers-skill | 0 | none | 2026-10-11 | Subtitle-driven sticker planning. Remotion preferred, "所有状态由 Remotion 当前帧驱动". Avoids faces, subtitles and frame edges. `--density medium/high`. | Idea reference only (no licence). The placement rules match our card-corner anchoring. |
| hassancs91/claude-faceless-shorts-creator | 273 | MIT | 2026-08-18 | Beat grammar HOOK→SETUP→QUIZ→REVEAL→TWIST→LOOP, a "beats contract", an SFX cue sheet, "your ear is the final gate" | Medium: adopt the beat grammar in §4.4 |
| gyoridavid/short-video-maker | 1,414 | MIT | 2025-06-21 | Remotion with mood-tagged music (prior report) | No meme layer |
| harry0703/MoneyPrinterTurbo | 132,351 | MIT | 2026-10-17 | General shorts generator (prior report) | No meme layer |
| RayVentura/ShortGPT · elebumm/RedditVideoMakerBot | 8,038 · 12,548 | MIT · GPL-3.0 | 2025-02-10 · 2026-10-16 | General or Reddit generators (prior report) | No meme layer |
| emredevsalot/gigachad-maker | 14 | none | 2023-06-11 | Remotion "Gigachad" meme GIF | Avoid: real person's photo, no licence |

**Verdict (I):** nothing to adopt wholesale. Build two small things in our own engine: a reaction suggester (§3.2) and a two-tier reaction renderer (§4.3).

### 3.2 Meme search and retrieval (Content asks for "awkward", "shocked" and so on)

| Option | ★ / licence / push | How it works (V) | Fit |
|---|---|---|---|
| **Unicode CLDR Vietnamese emoji annotations** (unicode-org/cldr-json) | 714★, Unicode License v3, 2026-10-13 | `annotations/vi/annotations.json` has 1,966 entries with Vietnamese keywords, e.g. 🤦 "lại nữa rồi, không tin nổi, tay che mặt"; 🤯 "bị sốc, đầu nổ tung"; 🙅 "không đời nào, cấm"; 😅 "mồ hôi, lo lắng"; 🤨 "hoài nghi, ngờ vực" | **Adopt now.** Merge into `reaction_library[*].tags` so Content can search in Vietnamese. No model needed. |
| muan/emojilib | 1,775★, MIT, 2026-05-08 | English emoji keywords | Optional English tags |
| Multilingual embeddings: intfloat/multilingual-e5-small (MIT, 118M params) · sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2 (Apache-2.0) | HF | Model cards list `vi` (V) | When the library passes ~60 items (I): a small CPU script that ranks reactions for each line, with the final pick by the Content role. Not installed. |
| MoritzLaurer/mDeBERTa-v3-base-mnli-xnli | MIT, vi listed | Zero-shot labels (prior report) | Optional cross-check of a beat's emotion |
| bfelbo/DeepMoji · cardiffnlp/twitter-roberta-base-emoji | 1,555★ MIT (2024-08-02) · no licence tag | English-only emoji prediction (I) | Not for Vietnamese |
| meme-search/meme-search | 762★, Apache-2.0, 2026-10-01 | Self-hosted: local VLM captions (Florence-2 to Moondream2; INT8 "Ideal for CPU-only machines") plus pgvector. Rails, Python and Docker. No auth. | Overkill below ~200 images (I) |
| MemeMeow-Studio/MemeMeow | 1,264★, AGPL-3.0, 2026-10-12 | Chinese UI; embedding plus DINOv2; agent captioning through a configurable endpoint; Docker | Overkill. AGPL obligations if modified and served (I). |
| osmarks/meme-search-engine | 114★, MIT, 2026-09-04 | OpenCLIP/SigLIP; Rust and Python; GPU recommended | Overkill |

### 3.3 Original reaction stickers or a mascot we own

| Option | Licence (V) | GPU need (V) | Fit / effort |
|---|---|---|---|
| **Hand-built React/SVG mascot in Remotion**, like the existing brand marks in `src/marks.tsx` | Ours | None | **Best (I).** 8–12 expressions (eyes, brows and mouth as props), animated by spring and frame. Fully owned, on-brand, deterministic. About 1–2 days of Production work. |
| Open Peeps parts / DiceBear CC0 styles (`@dicebear/core`, MIT) | CC0 art | None | Fast base for the mascot. CC0 means others can use the same art, so customise it (I). |
| visioncortex/vtracer | 7,318★, MIT, 2026-10-12 | None | Vectorise a hand sketch into SVG for the mascot |
| FLUX.1-schnell | Apache-2.0; "personal, scientific, and commercial" | 12B params (V); about 24 GB VRAM unquantised (I) | Not runnable here |
| FLUX.2-klein-4B | Apache-2.0, "Open weights available for commercial use" | "as little as 13GB VRAM", RTX 3090/4070+ | Not runnable here |
| Tongyi-MAI/Z-Image-Turbo (Z-Image repo 12,096★) | Apache-2.0 | 6B, "fits comfortably within 16G VRAM" | Not runnable here |
| Qwen/Qwen-Image · HiDream-I1-Fast | Apache-2.0 · MIT | Large (I) | Not runnable here |
| Non-commercial models: FLUX.1-dev, FLUX.2-dev, FLUX.2-klein-9B | FLUX non-commercial licences (V, HF API) | — | **Banned** |
| Background removal: danielgatis/rembg (25,106★, MIT code) · ZhengPeng7/BiRefNet (MIT) · briaai/RMBG-2.0 | MIT · MIT · "bria-rmbg-2.0" custom licence | CPU OK for rembg (I) | rembg or BiRefNet if generated stickers ever need cut-outs; check rembg's weight licences per model (I). RMBG-2.0 is banned. |
| SVG generation: joanrod/star-vector (4,629★, Apache-2.0) · OmniSVG (2,643★, Apache-2.0) | Apache-2.0 | 8B-class, GPU (I) | Not runnable here |
| **This machine** | — | `Win32_VideoController` reports only Intel Iris Xe and `nvidia-smi` is absent (V, local check) | Local diffusion is impractical. A cloud GPU is a paid provider and not implemented in v0, so it needs user approval. |

### 3.4 Lottie and animated-sticker pipelines in Remotion

| Package / repo | ★ / licence / push | Facts (V) | Adoption |
|---|---|---|---|
| `<AnimatedImage>` (already in use) | Remotion licence | Renders our Fluent APNGs (index.tsx) | Keep as the primary path |
| **@remotion/animated-emoji** | Remotion licence; emoji CC BY 4.0 | `npx remotion add @remotion/animated-emoji` (Remotion ≥4.0.187). "By default, no emoji assets are included": copy WebM files from remotion-dev/animated-emoji `public/`. `scale` 0.5/1/2 → 512/1024/2048px. Uses `<OffthreadVideo>`. | Optional second style once CC BY is approved. Pin to 4.0.536 like the other @remotion packages. |
| **@remotion/lottie** + airbnb/lottie-web | lottie-web 32,243★, MIT, 2025-09-01 | `npm i @remotion/lottie lottie-web`. Speed and direction supported. SVG renderer only. "Limited expression support … leading to flickering". | For mascot animations or LottieFiles stickers. Test each file for flicker in a draft render. |
| LottieFiles/dotlottie-web | 919★, MIT, 2026-10-16 | Player for `.lottie` | Not needed. Unzip `.lottie` to JSON for `@remotion/lottie` (I). |
| OpenVGLab/OmniLottie | 799★, Apache-2.0 code, 2026-04-06 | Text, image or video → Lottie. 4B model, ~15.2 GB GPU memory. Training set MMLottie-2M is **CC BY-NC-SA**, "research and non-commercial purposes only". | **Avoid**: GPU, and the licence of its outputs is unclear |
| srk0102/AnimTOON | 22★, MIT, 2026-04-11 | SVG → Lottie keyframes, ~5 GB VRAM, "approximately 60% through training" | Watch only |
| Remotion licence | — | Free for "an individual" or a for-profit with "up to 3 employees", including commercial use (V, LICENSE.md) | OK for a solo channel. Recheck if the team grows. |

---

## Part 4. Recommendation for P-1

### 4.1 Adopt now (no licence change needed)

1. **Fluent Emoji Animated plus static 3D (MIT)** as the reaction source. Fetch single files, keep the sha256 and LICENSE in `media/library/reactions/provenance.json`, and grow the library from 6 to about 26 entries (§4.2).
2. **CLDR Vietnamese annotations (Unicode v3)** merged into the tags. Content picks reactions by Vietnamese feeling words.
3. **Freesound CC0 and Kenney CC0 comic SFX** to replace meme-soundboard sounds:
   - rimshot "ba-dum-tss" as the punchline sting;
   - sad trombone for "toang" or fail moments;
   - a deep cinematic boom as the vine-boom substitute (I);
   - slide whistle, record scratch, crickets for awkward silence, and a gasp.
4. **Typographic punch stickers.** One or two words in an OFL font, at most 3 per video, never full captions: "Ủa?", "Toang", "Xỉu", "Cạn lời", "Hả???", "Gắt". They are owned and Vietnamese-native (I).
5. **Kenney Emotes (CC0)** for micro reactions ("?", "!", "…", heart).
6. **Design a channel mascot**, e.g. a speech-bubble character with glasses "đọc giùm", as a React/SVG component in Remotion. Base it on CC0 Open Peeps or DiceBear parts, or draw it from scratch. This **needs a user brand decision** (§4.6).

Deferred: Noto Animated / @remotion/animated-emoji, LottieFiles, Mixkit, Sonniss and YouTube Audio Library SFX all wait on allowlist approval. AI sticker generation waits on a GPU.

### 4.2 Expanded reaction_library (all Fluent, MIT; names verified in the repo listing)

| Category | Asset (A = animated, S = static 3D animated by us) | Vietnamese tags (ours plus CLDR) |
|---|---|---|
| shocked | Face screaming in fear (A), Astonished face (A) | sốc, hú hồn, há hốc, kinh hãi |
| facepalm | Person facepalming (A) | cạn lời, bó tay, lại nữa rồi, không tin nổi |
| crying-laughing | rofl (existing), Face with tears of joy (A) | cười ra nước mắt, hài thật |
| sus | Face with raised eyebrow (A), Face with monocle (A) | nghi nghi, hoài nghi, soi |
| mind-blown | Exploding head (A) | nổ não, bị sốc, đầu nổ tung |
| clap | Clapping hands (A) | vỗ tay, đỉnh, nể |
| nope | Person gesturing no (A), Head shaking horizontally (A), Cross mark (S) | không nha, không đời nào, lắc đầu |
| sweat | Downcast face with sweat (A), Grinning face with sweat (A) | toát mồ hôi, quê, ngại |
| side-eye | Eyes (A), Unamused face (A), rolleyes (existing) | liếc, hóng, khinh khỉnh |
| heart | Red heart (A), Smiling face with hearts (A) | thương, iu, dễ thương |
| money | money (existing), Money with wings (S) | tiền, bay màu tiền, cháy túi |
| extras | Grimacing face, Melting face, Clown face, Thinking face, Shushing face, Face holding back tears, Loudly crying face, Pleading face, Hot beverage ("hóng drama"), Hundred points, Party popper, Person shrugging (all A) | ngượng, tan chảy, hề, suy tư, im lặng, cảm động, khóc ròng, năn nỉ, hóng, chuẩn, ăn mừng, kệ |

Excluded on taste and policy (I): Face with symbols on mouth, Pile of poo, Nauseated face. They read as insults aimed at real commenters.

### 4.3 Meme density per mood (proposal)

- **Evidence (V, render props.json):** the three released hài videos ran 45.9s, 46.7s and 54.0s with 2, 3 and 4 reactions, about one every 13–23s.
- **Engine constraints (V, build-timeline.mjs):**
  - one reaction per line, landing at line end −0.15s;
  - each adds a `pop` SFX and a 0.85s hold;
  - so 8 reactions would add about 7s of runtime.
- **Proposal (I):** two tiers.
  - **Hit:** the current 230px sticker with SFX and hold.
  - **Micro:** about 140px, emote bubble or mascot face, no hold, 1.0–1.2s, silent or a soft tick, anchored to a word inside a line using the existing alignment timings.

| Mood | Now (V) | Proposed per 45–55s | Hits | Micro | Min gap (any / between hits) | Allowed |
|---|---|---|---|---|---|---|
| hài | max 4, gap 5s, emoji | **6–8** (≈1 per 6–8s) | ≤3 | 3–5 | **2.5s / 6s** | all funny categories, punch text ≤3 |
| drama | max 1, gap 8s | 2–3 | 1 | 1–2 | 5s / 8s | sus, side-eye, eyes, hot beverage, shocked, mind-blown; no laugh SFX |
| ấm áp | max 1, gap 8s | 1–2 | 0–1 | 1 | 8s | heart, holding back tears, clap, pleading |
| buồn | disabled | 0–1 (closing beat only) | 0 | 0–1 | — | heart, holding back tears |

Guardrails:
- no reaction in the first 1.2s, so the hook stays clean;
- none in the last 2s before the CTA or outro;
- the same asset at most twice per video, never twice in a row;
- never over text that is being read;
- at most one SFX per 2s.

Viewers already called word captions clutter. Validate the density with retention graphs on 3 or more videos at 6–8 reactions against the current 2–4; don't assume more is funnier (I).

### 4.4 The "meme beat" rule for scripts

Each reaction is a beat in `lines.json` (`beat.reaction` plus a new `beat.why`, a Vietnamese tag). It must land on one of these:

1. **Punchline (Hit).** At the end of the funniest reply or our joke line: "ba-dum-tss" plus rofl, skull or clap.
2. **Turn or reveal (Hit or Micro).** When a reply flips the thread (sus, mind-blown, shocked). Uses the TWIST slot in HOOK→SETUP→REVEAL→TWIST→LOOP.
3. **Narrator aside (Micro, preferably the mascot face).** On our ORIGINAL commentary lines. This ties the reaction to our own voice and supports the ≥50% original-narration rule (I).
4. **Awkward silence (Micro).** After a cringe reply: sweat, grimace or crickets SFX.
5. **Optional loop callback.** One final reaction reprising the hook's emotion.

Hard rules:
- never react to the person, only to the situation, so no mocking appearance, minors or sensitive topics (rights-protocol rule 2);
- never use a reaction to imply a real commenter is stupid or evil (Art. 32 and dignity, I);
- Review fails a draft whose reactions lack a `why`, break the gaps, or use an asset without `commercial_ok: true` in the ledger.

### 4.5 What stays banned

- film, TV and anime stills or clips (Monkey Puppet, Drake, Táo Quân, "nani");
- viral-video clips;
- Imgflip, memegen and Know Your Meme templates;
- GIPHY and Tenor;
- vendor emoji art;
- LINE, Telegram, Zalo and Facebook stickers;
- photos, videos, voices or AI likenesses of real people, including Vietnamese meme personalities;
- soundboard meme audio (vine boom, bruh, nani, Curb theme, trending TikTok sounds, song snippets);
- assets whose uploader can't plausibly own them (meme-titled Pixabay items, web-collected memecub results);
- non-commercial models (FLUX.1-dev, FLUX.2-dev, FLUX.2-klein-9B, RMBG-2.0, MusicGen) and OmniLottie outputs;
- celebrity voice clones.

### 4.6 Changes the user must approve

| # | Change | Why approval is needed |
|---|---|---|
| 1 | Raise hài density: `max` 4 → 8 and add a "micro" tier with a 2.5s gap; raise drama and ấm áp as in §4.3 | Creative and preset change; engine work in `build-timeline.mjs` and `index.tsx` |
| 2 | Create a channel mascot (concept, name, style) | Brand identity decision |
| 3 | Add **CC BY 4.0** to the asset allowlist (Noto Animated, Twemoji) with description credits | The allowlist (CC0, Pexels, MIT, OFL, Apache-2.0) has no attribution licences |
| 4 | Add custom licences: Mixkit Free License, Sonniss GDC licence, Lottie Simple License, YouTube Audio Library SFX (YouTube-only) | Not in the allowlist; per-platform scope |
| 5 | Any paid item: original meme SFX pack, Jukin clip licence, cloud GPU for image models | Paid provider, not in v0 |
| 6 | OpenMoji (BY-SA) | Share-alike scope |

Items 1 and 2 are the ones that answer "more memes". Items 3–6 are optional and can wait.

---

## Could not verify

- YouTube Audio Library terms for use outside YouTube. The help page is silent and secondary sources conflict.
- TikTok help pages (FYF standards, Creator Rewards details, in-app sound licences). They rendered as empty JS shells.
- Licence terms for YouTube Create stickers and GIFs.
- Know Your Meme origin pages (HTTP 403). The vine boom origin comes from meme.com only, and the origins of "bruh" and "nani" are unverified.
- The full official text of IP Law Art. 27 (film term). The official thuvienphapluat text returned 403, so Art. 25 was read on a secondary full-text portal.
- Whether Decree 15/2020 fine amounts still apply after later decrees, including Decree 174/2026 named in rights-protocol-v1.
- FLUX.1-schnell VRAM, and the weight licences of rembg's bundled models.
- The internals of viralcut and Mixkit's full SFX licence text (the licence modal didn't render).

## Sources (opened 2026-10-18)

**YouTube / TikTok**
- https://support.google.com/youtube/answer/1311392 (YPP reused and inauthentic content)
- https://support.google.com/youtube/answer/10623810 (Shorts remix)
- https://support.google.com/youtube/answer/13486873 (music eligibility for Shorts; claimed Shorts)
- https://support.google.com/youtube/answer/12504220 (Shorts monetization policies)
- https://support.google.com/youtube/answer/3376882 (Audio Library)
- https://support.google.com/youtube/answer/2605065 (Content ID eligibility)
- https://support.google.com/youtube/answer/2797370 (how Content ID works)
- https://support.google.com/youtube/answer/7002106 (claims vs strikes)
- https://support.google.com/youtube/answer/9783148 (fair use)
- https://support.google.com/youtube/answer/14328491 (altered or synthetic content)
- https://www.tiktok.com/legal/page/global/copyright-policy/en
- https://newsroom.tiktok.com/en-us/introducing-the-new-creator-rewards-program
- https://www.tiktok.com/community-guidelines/en/fyf-standards and https://www.tiktok.com/support/faq_detail?id=7581821550694013452 (opened; empty JS shell)

**Vietnamese law**
- https://ketoananpha.vn/luat-so-huu-tri-tue-nam-2022 (Law 07/2022 text, Art. 25)
- https://lsvn.vn/bo-sung-cac-truong-hop-ngoai-le-khong-xam-pham-quyen-tac-gia1657018953-a120831.html
- https://tapchitoaan.vn/quyen-cua-ca-nhan-doi-voi-hinh-anh-quy-dinh-va-bat-cap (Civil Code Art. 32 text)
- https://lsvn.vn/bao-ve-quyen-cua-ca-nhan-doi-voi-hinh-anh-theo-quy-dinh-cua-phap-luat1625970700.html
- https://lsvn.vn/quyen-hinh-anh-ca-nhan-theo-quy-dinh-cua-phap-luat-viet-nam-va-phuong-thuc-bao-ve-khi-bi-xam-pham-1722783981.html
- https://luatvietan.vn/quyen-tac-gia-doi-voi-tac-pham-hinh-thanh-boi-tri-tue-nhan-tao.html
- https://tienphong.vn/dieu-kien-duoc-bao-ho-quyen-tac-gia-doi-voi-tac-pham-do-ai-tao-ra-post1823948.html
- https://vietnamnet.vn/tao-quan-2018-bi-vi-pham-ban-quyen-tren-youtube-i368662.html
- thuvienphapluat.vn (Law 07/2022) returned 403

**US context and cases**
- https://www.copyright.gov/ai/
- https://copyrightalliance.org/ai-report-part-2-copyrightability/
- https://ipwatchdog.com/2018/01/27/grumpy-cat-wins-copyright-trademark-infringement/
- https://www.nbcnews.com/news/us-news/infowars-pay-15-000-unauthorized-pepe-frog-posters-n1016026
- https://pulse.mallesons.com/ip-whiteboard/would-you-pay-for-a-meme-getty-claims-copyright-licence-fees-for-socially-awkward-penguin/
- https://www.thefashionlaw.com/ludacris-and-the-rise-in-meme-related-lawsuits/
- https://tubefilter.com/2020/08/11/jukin-launches-self-service-platform-license-videos/
- https://meme.com/memes/vine-boom
- knowyourmeme.com returned 403

**Asset licences**
- https://emojipedia.org/licensing
- https://creator.line.me/en/terms/
- https://creativecommons.org/faq/
- https://github.com/hfg-gmuend/openmoji
- https://github.com/jdecked/twemoji
- https://github.com/googlefonts/noto-emoji
- https://github.com/microsoft/fluentui-emoji, plus raw README.md and LICENSE
- https://raw.githubusercontent.com/microsoft/fluentui-emoji-animated/main/README.md
- https://api.github.com/repos/microsoft/fluentui-emoji-animated/contents/assets (746 names)
- raw.githubusercontent.com HEAD checks of `fluentui-emoji/main/assets/<name>/3D/*.png` and `fluentui-emoji-animated/main/assets/<name>/animated/*.png`
- https://googlefonts.github.io/noto-emoji-animation/data/api.json (881 entries)
- https://raw.githubusercontent.com/remotion-dev/animated-emoji/main/README.md
- https://www.remotion.dev/docs/animated-emoji
- https://www.remotion.dev/docs/animated-emoji/animated-emoji
- https://raw.githubusercontent.com/remotion-dev/remotion/main/packages/docs/docs/lottie/index.mdx
- https://raw.githubusercontent.com/remotion-dev/remotion/main/LICENSE.md
- https://lottiefiles.com/page/license
- https://raw.githubusercontent.com/unicode-org/cldr-json/main/cldr-json/cldr-annotations-full/annotations/vi/annotations.json and the repo LICENSE
- https://www.openpeeps.com/
- https://www.dicebear.com/licenses/
- https://kenney.nl/support
- https://kenney.nl/assets/emotes-pack
- https://sonniss.com/gdc-bundle-license/
- https://freesound.org/help/faq/
- https://freesound.org/search/?q=sad+trombone&f=license:%22Creative+Commons+0%22
- https://freesound.org/search/?q=rimshot&f=license:%22Creative+Commons+0%22
- https://pixabay.com/service/license-summary/
- https://pixabay.com/service/terms/
- https://pixabay.com/sound-effects/search/vine%20boom/
- https://www.pexels.com/license/
- https://mixkit.co/license/
- https://mixkit.co/llm-info/ (contained AI-directed instructions; ignored)
- https://mixkit.co/free-sound-effects/
- https://commons.wikimedia.org/wiki/Commons:Personality_rights

**Repos and models**
- https://github.com/liyupi/memecub
- https://github.com/noahgsolomon/brainrot.js
- https://github.com/Mmbugraaslan/viralcut
- https://github.com/MemeMeow-Studio/MemeMeow
- https://github.com/meme-search/meme-search
- https://github.com/osmarks/meme-search-engine
- https://github.com/leo524/unclesix-video-stickers-skill
- https://github.com/hassancs91/claude-faceless-shorts-creator
- https://github.com/OpenVGLab/OmniLottie
- https://github.com/srk0102/AnimTOON
- https://huggingface.co/black-forest-labs/FLUX.1-schnell
- https://huggingface.co/black-forest-labs/FLUX.2-klein-4B
- https://huggingface.co/Tongyi-MAI/Z-Image-Turbo
- https://huggingface.co/api/models/<id> for licence tags (FLUX.1-dev, FLUX.2-dev, FLUX.2-klein-9B, Qwen-Image, SDXL, HiDream-I1-Fast, BiRefNet, RMBG-2.0, OmniSVG, StarVector, bge-m3, multilingual-e5-small, paraphrase-multilingual-MiniLM-L12-v2, mDeBERTa-xnli, PhoBERT sentiment, twitter-roberta-emoji, clip-multilingual)
- https://api.github.com/repos/<owner>/<repo> and https://api.github.com/search/repositories (stars, licence and pushed_at for every repo listed)

**Local evidence (read-only)**
- `production/engine-v1/mood-presets.json`, `build-timeline.mjs` and `src/index.tsx`
- `artifacts/render/release-0{1,2,3}-v1/props.json` (durations and reaction counts)
- `media/library/reactions/provenance.json`
- `Win32_VideoController` query (Intel Iris Xe only; no `nvidia-smi`)

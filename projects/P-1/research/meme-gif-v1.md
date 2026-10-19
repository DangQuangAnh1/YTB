# Meme GIF research v1 (BA, 2026-10-19)

This report answers the user's request "nghiên cứu về meme gif": how to make our meme beats funnier without breaking the rights rules. It builds on meme-rights-and-repos-v1.md and competitor-shorts-v1.md §2.2/§5.4 and doesn't repeat what they settled: GIPHY and Tenor are banned, classic memes aren't licensed anywhere, Pexels/Pixabay people clips carry the "bad light" risk, and the allowlist is CC0, Pexels, MIT, OFL and Apache-2.0.

- **Scope.** This is research, not legal advice. It was read-only on the web: no downloads, logins or posts. The only local reads were the CPU/RAM query and the library listing. No file other than this one was changed.
- **Marks.** **V** means verified on a page opened for this report; "(sec.)" means that page was a secondary portal or news site. **I** means inference. **U** means unverified or a vendor claim.

## Bottom line

1. **Faces carry the laugh, and big beats in voice pauses carry the timing.** A reaction GIF works as a borrowed face or body reaction. The memes that land are big and placed in a voice pause, with a sound and a one-word label. Recognisability is a bonus we can't legally buy. We can earn it over time with a recurring mascot or animal.
2. **Film, TV, anime and viral GIFs stay banned, and three new reasons support that:**
   - Content ID has no minimum clip length.
   - Rightsholders file manual takedowns even against review channels.
   - Vietnam's quotation rule (Decree 17/2023 Art. 28) requires the quote to serve comment on the issue in our own work. A film GIF used to react to someone else's comment doesn't do that.
3. **The best legal "real meme" layer is real animals from Pexels plus our own edit tricks.** Pexels is already on the allowlist, and its licence restricts only identifiable people, not animals. The joke comes from the edit: snap-zoom, freeze, tint, SFX and label.
4. **Everything else either needs a licence decision** (Noto, LottieFiles, Pixabay GIFs, Mixkit, NASA, OpenRAIL models) **or isn't worth it** (public-domain cartoons, CPU AI animation).

## 1. What a "meme GIF" is, and what lands

| Kind | Why it's funny | Status for us |
|---|---|---|
| People reactions from film, TV, anime or viral clips | A recognisable face plus an exaggerated emotion | **Avoid** (§2) |
| Known meme characters (Pepe, Doge, Trollface, Nyan Cat) | Inside-joke recognition | **Avoid**, even when a "free" site hosts them (§3) |
| **Animal reactions** (sad dog, staring cat) | Human emotion read into an animal; nobody is mocked | **Use** via Pexels or our own footage |
| Generic animated emoji and stickers (Fluent, Noto) | A clear emotion, but low "meme" recognition | In use. Funnier when bigger, in pauses, with a label. |
| Edit-made memes (dramatic zoom, freeze plus record scratch, impact frame) | The meme is the technique, not an asset | **Use**: fully ours |
| Text reaction cards ("Ủa?", "Toang") | Native slang and timing | **Use**: fully ours |

**Evidence:**
- **GIFs as embodied reactions (V, authors' blog; I did not read the paper).** Tolins & Samermit (2016) call reaction GIFs "embodied enactments": mostly gestures, faces or physical actions that stand in for the sender's own reaction. GIFs can show bodily actions "human or otherwise".
- **Hẻm Threads (V, competitor-shorts-v1).** Three memes in 43 s, each 55–85% of the frame width, placed in 2–4 s voice pauses, with a laugh tag and a one-word label ("cô giáo"). One was a sad-dog photo.
- **Cat memes in Vietnam (U).** A Vietnamese tech blog cites a "Socialbakers 2023" report: cat memes are about 14% of viral memes in Vietnam, second only to celebrity reaction memes. Its categories are smirking, crying, dazed and judging cats. The original report was not found.
- **Data gap.** I found no published data on how other Vietnamese comment-reading channels use memes.

**What this means for us (I):**
- Celebrity reaction memes are the biggest Vietnamese category, and they're legally closed to us.
- Animals are the next-best category, and they're legally open.

## 2. Rights and platform risk (new findings only)

| Claim | Mark |
|---|---|
| **Content ID has no minimum clip length.** Rightsholders set match conditions by the duration or percentage of the user video or of the reference file. | V (YouTube 107129, 3506115) |
| YouTube's fair-use page: a claim "will keep you from monetizing the video, even if you only use a few seconds". Only courts decide fair use. | V (9783148) |
| **Manual takedowns hit review channels too.** In Dec 2021, Toei filed against about 150 Dragon Ball and One Piece review videos by Totally Not Mark. After dispute the strikes were removed, but the videos were blocked in Japan, which has no US-style fair use. | V (sec., Invenglobal 2022-01-26) |
| **Public-domain status doesn't stop claims.** In Jan 2024, Content ID claimed public-domain uploads of *Steamboat Willie*: both the original and a restoration, plus one music claim. | V (sec., Tubefilter) |
| **Shorts originality update (2026-10-01).** Recommendations now favour original content and reduce reach for channels "primarily aggregating or re-uploading". Rene Ritchie said value means "not just VO descriptions of what's happening on screen, minor technical edits, or template-based bulk changes". | V (sec., ppc.land, SEJ). The YouTube thread itself didn't render. |
| **US fair use after *Warhol v. Goldsmith* (2023).** When the purposes are the same or highly similar and the use is commercial, factor one "is likely to weigh against fair use". Commentary that "targets" the original may "conjure up" it. | V (LII opinion text) |
| *Hosseinzadeh v. Klein* (2017): a reaction video that critiques the clip itself was fair use, but the court did "not" rule that all reaction videos are fair use. | V (sec., search summaries; the copyright.gov PDF didn't extract) |
| **Applying Warhol and Hosseinzadeh to us.** A film or anime GIF reacting to a *Threads comment* doesn't target the film. It borrows the film's expressive purpose in a monetized video, which is the weak side of both cases. | I |
| **Vietnam, Decree 17/2023 Art. 28.** A quotation is reasonable only if all three hold: (1) it serves only to introduce, comment on or clarify the issue in our own work; (2) it doesn't unreasonably harm the owner and fits the nature of the quoted work; (3) source and author are named. The decree was later amended by Decree 134/2026, which I did not read. | V (sec., luatvietnam) |
| The reaction-GIF use fails condition 1, and condition 3 is usually impossible because the author is unknown. Vietnam has no open fair-use clause. | I |
| **Formats and ideas are free; images are not.** VN IP Law Art. 15(3) excludes "khái niệm, nguyên lý" from protection. *Rentmeester v. Nike* (9th Cir. 2018): a pose isn't protectable, only its expression. So redraw the *format* with our own characters, and never trace the image (Warhol). | V (sec., hethongphapluat; law-firm summaries) / I |
| **VN film term.** The 2005 text gives 50 years from first publication. A later 75-year amendment is reported but not verified. Either way, pre-1950 films are out of term in Vietnam. | V (sec.) / U / I |
| **Practical risk for us.** A 2 s overlaid GIF is less likely to be auto-matched than a full clip. Still, one claim on a Short over 60 s blocks it, and a manual notice is a channel strike. The downside is far larger than the gain. | I |

## 3. Licence-clean (or almost) sources

| Source | Licence and terms | Format, count, quality | Fit |
|---|---|---|---|
| Fluent Emoji Animated (in use) | MIT | 746 APNG at 256 px; 26 in our library (V local) | **Allowlist**. Keep. |
| **Pexels animal clips** | Restricts only "Identifiable people…" (bad light), resale, endorsement and trademark use; **no animal clause**; modification allowed (V). The licence page makes no warranty statement (V); the Terms of Use were not read (U). | MP4 HD/4K. Search counts: "sad dog" 3.9K, "surprised cat" 7.8K, "dog head tilt" 17.8K, but top results are mostly calm b-roll (V, titles) | **Allowlist**. Hand-pick expressive 1.5–2.5 s moments with no people or logos in frame. |
| Kenney Emotes | CC0 (prior) | 480 static bubbles | **Allowlist** (micro "?", "!", "…") |
| Noto Animated Emoji | CC BY 4.0, credit required (prior V) | 881 emoji as Lottie, GIF and WebM; Lottie can be retimed | **Decision**: add CC BY |
| LottieFiles free animations | Lottie Simple License: commercial use OK, attribution optional, modifications "under the same terms", no compiling into a competing service; provided "AS IS", no warranty including noninfringement (V) | The "meme" tag has 32 items, including Nyan Cat, Pepe, Doge, Trollface and Coffin Dance copies (V, titles) | **Decision**, then a per-file whitelist of original characters only |
| Pixabay GIFs | Content License: free, no attribution, no "Standalone" resale, recognisable-people clause (V); no warranty of consents (prior V) | "10,000+" GIFs and stickers; "cat" gives about 100, mostly illustrated, from community uploaders (V) | **Decision**, per uploader |
| Mixkit stock video | Free licence vs Restricted: "Cannot be used in monetized content" (prior V) | Per item | **Decision**, Free licence only |
| OpenGameArt | Per-asset licence; OGA only "make[s] an effort" to verify public-domain claims (V) | Mostly pixel-art sprites (I) | CC0 items are allowlisted; low fit |
| Public-domain cartoons (Commons, Internet Archive) | US-PD before 1931. 2026 entries include Betty Boop's debut, Pluto (as Rover) and 9 Mickey cartoons, but "newer, different versions" and trademarks remain protected (V, Duke). The Commons 1919 Felix GIF is 200×147 px, 16 s, B&W, and "might not be in the public domain outside of the United States" (V). | Low resolution, characters trademarked, Content ID misfires (§2) | **Avoid for now** |
| NASA media | "generally are not subject to copyright in the United States"; acknowledge NASA; no implied endorsement; the insignia "not in the public domain" (V) | Space and launch footage ("nổ não", "bay màu") | **Decision** (US-gov PD); niche |
| Google Emoji Kitchen; LINE, Telegram and Zalo stickers; CapCut and Canva-GIPHY stickers | No public licence (Emojipedia says vendor art is ©). CapCut asset terms reportedly vary per asset. | — | **Avoid** (U for CapCut) |
| GitHub "CC0 meme" packs | Only 0–6★ repos (clovlets, open-meme-registry, kmilo93sd/agent-video-editor "26 CC0 graphics"). Tarikul-Islam-Anik/Animated-Fluent-Emojis is 1,102★ but NOASSERTION. | — | Watch only; use the official Microsoft repo |

## 4. Making our own meme GIFs on CPU

- **Edit-made memes in Remotion (zero rights cost, I).** These use SFX already in `media/library/sfx` (boom, scratch, womp, fail, laugh, punch, awkward, question; V local):
  - snap-zoom (1.0 → 1.25 in 4 frames) plus a 6-frame shake;
  - freeze-frame plus record scratch;
  - an anime-style "impact frame" (B/W, high contrast, radial speed lines);
  - a sad slow push with blue tint;
  - the same effects applied to a Pexels animal clip.
- **Text reaction cards.**
  - Words: "Ủa?", "Hả???", "Cạn lời", "Toang", "Xỉu", "Hết cứu", "Quê xệ", "Gắt", "Khum".
  - Fonts: these OFL display fonts have Google Fonts' Vietnamese subset and an OFL.txt in google/fonts: Bangers, Paytone One, Bungee, Coiny, Sigmar, Baloo 2, Grandstander (V).
  - Avoid Luckiest Guy, Lilita One, Titan One and Shrikhand, which have no Vietnamese subset (V).
  - Style: white stroke, drop shadow, −6° tilt and an overshoot pop-in (I).
- **Owned meme formats as vector art.** Redraw the format with our mascot or Fluent emoji, never the source image:
  - "Không / Có" two-panel;
  - expanding-brain ladder;
  - pixel sunglasses dropping ("deal with it");
  - a "Loading…" bar.
  - Skip drawn-character formats such as "This is fine" (I).
- **Mascot pipeline.** Animate in SVG with springs or `@remotion/lottie`. `@remotion/rive` also exists (V). This is the long-term "recognisable meme" (I) and still needs the brand decision from meme-rights §4.6 #2.
- **Our own footage.** Phone clips of the user's pet, or hands doing a facepalm, are fully owned and read as "real" memes (I). Keep raw media out of Git.
- **AI on this machine.** It has an i5-1145G7 (4C/8T), 15.4 GB RAM and Iris Xe (V local).
  - FastSD CPU (MIT, 2,182★) benchmarks on an i7-12700 at 512 px with OpenVINO+TAESD: SDXS 0.82 s, SD Turbo 1.7 s, SDXL Turbo 2.5 s. FLUX.1-schnell takes 4 min 30 s and "around 30GB system RAM" (V).
  - Expect our laptop to run 2–4× slower; FLUX doesn't fit (I).
  - Licences:
    - SD-Turbo: Stability Community License; commercial use under US$1M revenue requires registering an account (V), which needs the user.
    - SDXL-Turbo: HF tag `sai-nc-community` (V). **Avoid.**
    - SDXS-512-0.9: openrail++, but its authors warn of "possible commercial and copyright risks" (V). **Avoid.**
    - SD 1.5 / DreamShaper 8 (CreativeML OpenRAIL-M) and LCM-LoRA (openrail++) (V tags): need a decision.
    - Z-Image-Turbo (Apache-2.0) runs through stable-diffusion.cpp (MIT) on CPU (V). It fits the allowlist but is a 6B model, so expect minutes per image; untested (I).
  - **Use AI only for one-off mascot pose drafts.** Then hand-edit, vectorise with vtracer and animate in Remotion. CPU AI GIF or video generation is impractical (I).

## 5. Recommendation for P-1

**Adopt now (inside the allowlist):**
1. **Meme-beat kit.** Build the edit memes and text cards from §4 on the existing Fluent library and SFX. Use 1–3 beats per Short, at 55–85% frame width, in voice pauses, with a label.
2. **Pexels animal pack.** Pick 10–12 clips:
   - 2 sad dog, 2 staring cat, 2 confused dog, 1 yawning cat, 1 startled cat;
   - plus 2–4 more animal clips.
   Ledger each one: Pexels URL and ID, sha256, and a "no people or logos" check. This replaces Hẻm's sad-dog photo legally.
3. **Owned formats.** Pixel sunglasses and the two-panel format first, because they need no mascot.

**Needs a user decision:**
- Noto Animated (CC BY);
- a LottieFiles per-file whitelist;
- Pixabay GIFs and Mixkit Free licence videos;
- NASA;
- the mascot brand;
- AI drafting: Z-Image-Turbo is allowlisted but unproven; SD 1.5 / LCM are OpenRAIL; SD-Turbo needs registration.

**Avoid:**
- film, TV, anime and viral GIFs;
- real-person memes;
- known meme characters, even on LottieFiles or Pixabay;
- public-domain cartoons with trademarked characters;
- GIPHY, Tenor, Emoji Kitchen and in-app stickers;
- SDXL-Turbo and SDXS.

**Meme moments (react to the situation, never mock the commenter):**

| # | Moment (script cue) | Visual | FX | SFX | Label |
|---|---|---|---|---|---|
| 1 | Shock or twist | Fluent scream / mindblown | snap-zoom + shake | boom | HẢ??? |
| 2 | Facepalm | Fluent facepalm | slow push | womp / awkward | CẠN LỜI |
| 3 | Fail | Fluent melting / skull | desaturate + drop | fail (CC0 sad trombone) | TOANG |
| 4 | Sad or pity | **Pexels sad dog** | blue tint + slow push | soft womp | Tội ghê |
| 5 | Side-eye or sus | **Pexels staring cat** / Fluent eyes | 2-step dramatic zoom | boom (light) | Ủa? |
| 6 | Confused | **Pexels dog** + our 12° tilt + Kenney "?" | tilt | question | Hả gì? |
| 7 | Punchline | Fluent rofl / joy | pop overshoot | laugh / CC0 rimshot | HẾT CỨU |
| 8 | Awkward silence | Kenney "…" + Fluent sweat | 1.5 s hold | awkward / crickets (CC0) | Quê xệ |
| 9 | Big reveal reply | Our impact frame on the card | freeze, B/W, speed lines | punch | (key word) |
| 10 | Before the twist | Freeze-frame | freeze | scratch | Khoan đã… |
| 11 | Self-own | Fluent clown | wobble | boing | Hề thật sự |
| 12 | Respect or "gắt" | Our pixel sunglasses dropping onto Fluent smirk or the mascot | drop + bounce | tada | GẮT |

**Test (I):** re-cut one released story with moments 4, 5 and 9 in place of emoji-only beats. Compare share viewed and replays.

## Could not verify

- The YouTube Help thread 470890423 (didn't render).
- The Pexels Terms of Use and the Mixkit video licence text (the modal didn't render).
- The Canva licence (403) and CapCut's asset terms.
- The Noto Animated licence on its own site (JS shell). The CC BY claim comes from the prior report.
- Socialbakers 2023.
- VN Art. 27 as amended.
- The Decree 134/2026 changes to Art. 28.
- Real CPU speeds on this laptop.

## Sources (opened 2026-10-19)

**YouTube and platform:**
- support.google.com/youtube/answer/107129
- support.google.com/youtube/answer/3506115
- support.google.com/youtube/answer/9783148
- support.google.com/youtube/thread/470890423 (no body)
- ppc.land/re-uploaded-shorts-lose-reach-as-youtube-favours-original-clips/
- searchenginejournal.com/youtube-original-shorts-reposted-clips-reach/591774/
- dexerto.com/youtube/youtube-cracks-down-on-clipping-channels-in-shorts-update-prioritizing-original-content-3415700/

**Cases:**
- invenglobal.com/lol/articles/16266/…totally-not-mark…
- tubefilter.com/2024/01/04/disney-copyright-claim-steamboat-willie/
- law.cornell.edu/supremecourt/text/21-869
- copyright.gov/fair-use/summaries/hosseinzadeh-klein-sdny2017.pdf (not extractable) plus search summaries
- Rentmeester summaries (loeb.com, copyrightalliance.org)

**Vietnamese law:**
- luatvietnam.vn/…nghi-dinh-17-2023-nd-cp…251358-d1.html (Art. 28)
- hethongphapluat.com/luat-so-huu-tri-tue-2005/dieu-15 and /dieu-27
- ketoananpha.vn/luat-so-huu-tri-tue-nam-2022

**Humour and VN culture:**
- rolsi.net/2016/05/17/guest-blog-what-gifs-do-in-online-chat/
- hoanghamobile.com/tin-tuc/anh-meo-bua/
- vietcetera.com/vn/meme-hoc-khi-loai-meo-xam-chiem-trai-dat

**Assets:**
- pexels.com/license/
- pexels.com/search/videos/ for "sad dog", "surprised cat" and "dog head tilt"
- pixabay.com/service/license-summary/
- pixabay.com/gifs/ and /gifs/search/cat/
- mixkit.co/license/
- lottiefiles.com/page/license
- lottiefiles.com/free-animations/meme
- opengameart.org/content/faq
- cspd.law.duke.edu/publicdomainday/2026/
- commons.wikimedia.org/wiki/File:Animated_GIF_from_the_1919_Feline_folies_by_Pat_Sullivan.gif
- nasa.gov/nasa-brand-center/images-and-media/
- Emoji Kitchen and CapCut search results
- fonts.googleapis.com/css2 subset checks and raw.githubusercontent.com/google/fonts/main/ofl/*/OFL.txt
- remotion.dev/docs/rive

**Repos and models:**
- api.github.com/repos/ for rupeshs/fastsdcpu, leejet/stable-diffusion.cpp, Tarikul-Islam-Anik/Animated-Fluent-Emojis, vdpw/open-meme-registry and kmilo93sd/agent-video-editor
- GitHub search API ("cc0 stickers", "cc0 meme", "cc0 mascot")
- raw.githubusercontent.com/rupeshs/fastsdcpu/main/Readme.md
- the stable-diffusion.cpp README
- huggingface.co/api/models/ licence tags
- huggingface.co/stabilityai/sd-turbo LICENSE.md
- the IDKiro/sdxs-512-0.9 README

**Local (read-only):**
- `Win32_Processor` and `Win32_ComputerSystem`
- `projects/P-1/media/library/{reactions,sfx,fonts}` listing
- `media/library/reactions/provenance.json` (monkey-puppet is still flagged `commercial_ok: false`, and git ignores the media folder)

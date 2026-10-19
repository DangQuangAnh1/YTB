# Multi-voice casting research v1 (BA, 2026-10-18)

User feedback (chat, 2026-10-18), verbatim: "với các video có nhiều text hay nhiều nhân vật tôi thấy mấy kênh kia kiểu mỗi nhân vật 1 giọng đọc., nghiên cứu, tổng hợp, tham khảo".

- **Scope.** Research only, using web search and fetch, read-only. Nothing was logged into, downloaded, created or posted. No other project file was changed, and scripts/agency.py was not run.
- **Marks.** **V** = verified in a primary source or local file I read. **I** = my inference. **U** = unverified, or a vendor or secondary claim.
- **Hard limit: no audio was heard.** I could not listen to any channel or preset. Navigation to youtube.com in the browser pane was refused in this session, so no Vietnamese Short was sampled either.
- **Vietnamese evidence.** The user's own observation is the only Vietnamese evidence that channels give each character a voice. Web search (CapCut, Vbee, FPT.AI, TikTok, "đọc tin nhắn", "đọc comment") found no Vietnamese guide or article that documents the practice.
- **Correction to competitor-shorts-v1.** Its line "One voice reads the whole post and the replies" (Hẻm 1) is not verified, because that study also did not listen.

## 1. Findings

| # | Finding | Mark | Source |
|---|---|---|---|
| 1 | Chat-story tools default to **one voice per sender**. Faceless: "pick a voice for each person", and you can change the sender or voice per message. Magica: "Choose different voices for the sender and receiver". | V (feature), U (effect) | faceless.so/tutorials/create-fake-text-conversation ; magica.com/features/ai-chat-story-generator |
| 2 | TikTok can reportedly give each text box its own TTS voice. Sources disagree. | U | socialz.ai/blog/tiktok-text-to-speech (search excerpt) |
| 3 | Reddit-story readers are described mainly as **one consistent narrator** at about 1.2× speed (165–180 wpm). The same vendor says channels "that lose their narrator character" lose returning viewers. | U (vendor) | voxbooster.com/blog/ai-voice-generator-reddit-story-narration |
| 4 | The most common open-source Reddit bot ships `random_voice = true`: "Randomizes the voice used for each comment". It changes voice per comment, but randomly, so the same person is not kept on the same voice. | V | raw.githubusercontent.com/elebumm/RedditVideoMakerBot/master/utils/.config.template.toml |
| 5 | Audiobook tooling separates "Single cast" (one narrator) from "Multi cast" (a narrator plus distinct character voices). When you change a character's voice, every line they speak updates. Minor or unnamed speakers are the hardest to detect. | V | elevenlabs.io/docs/eleven-creative/products/audiobooks/llms.txt |
| 6 | Google's multi-speaker TTS supports "up to 2 speakers" per request. Each turn is labelled by speaker, and fixed traits come from the voice choice, not from style prompts. | V | ai.google.dev/gemini-api/docs/speech-generation |
| 7 | A vendor-released survey (Edison Research for Spoken, n > 1,000 US fiction listeners, July 2026) rated AI multi-cast above a single human narrator for character-driven fiction: 61% vs 53% favorable, engagement 58% vs 49%. The **single narrator rated higher for exposition without characters**. It measured survey answers, not retention. | V (as reported), U (generalization) | podnews.net/press-release/edison-spoken |
| 8 | Lab evidence: recall was "slower and less accurate for sequences spoken by multiple talkers than a single talker". The cost was largest at fast rates. | V | Lim, Shinn-Cunningham & Perrachione 2019, pmc.ncbi.nlm.nih.gov/articles/PMC6752734 |
| 9 | Audio-drama craft advice: more than four voices in a scene is usually a bad idea, and a cast that differs in gender, age and accent sounds more distinct. More characters raise the odds that two sound alike and confuse listeners. | V | electricliterature.com/how-to-write-a-fiction-podcast/ ; sfwa.org/2022/09/29/tips-tricks-writing-audio-drama/ |
| 10 | Audiobook QC requires consistent level (-23 to -18 dB RMS per file) and consistent sound across the book. | V | help.acx.com/s/article/acx-audio-submission-requirements |
| 11 | UNESCO's 2019 report criticized default female voices for reinforcing gender bias. This is a caution against stereotyped casting. | V (press coverage) | dezeen.com/2019/05/24/united-nations-voice-assistants-gender-biases-siri-alexa/ |
| 12 | Vietnamese terms that mark gender: anh, chị, chú, cô, cậu, dì, ông, bà. Terms that need "trai/gái" to mark it: em, bác. Kin terms with no gender: con, cháu. "mẹ" is Northern and "má" Southern. | V | en.wikipedia.org/wiki/Vietnamese_pronouns |
| 13 | Vietnamese TTS catalogues are organized by **gender × region**. FPT.AI's API voices are banmai (female, northern), leminh (male, northern), lannhi (female, southern), myan (female, middle), giahuy (male, middle) and others. Vbee claims 18 regional Vietnamese voices. CapCut claims 200+ voices, Vietnamese included, but publishes no names. | V (FPT), U (Vbee, CapCut) | docs.fpt.ai/docs/en/speech/api/text-to-speech/ ; capcut.com/vi-vn/tools/text-to-speech |
| 14 | VieNeu v3 Turbo has 25 presets in three regions (Central: Quang Sơn, Ngọc Trân; Southern includes Thùy Dung) and 10 editors' picks. It has a multi-speaker "Conversation" batch mode and experimental inline `[cười]`/`[thở dài]` cues. **Flag for PM:** the README roadmap labels v3 Turbo "(on-device, personal use)" while the license line says Apache 2.0. Recheck this against the model-card FAQ recorded in voice-alternatives-v1. | V (README), U (meaning of "personal use") | github.com/pnnbao97/VieNeu-TTS |
| 15 | I found **no primary retention data** comparing multi-voice and single-voice Shorts. Vendor blogs cite engagement percentages with no source. | V (negative result) | – |

**Local voice measurements (V, not listened).** Source: media/voice-audition-moods/scores.json. These come from one clip per voice, raw TTS at temperature 0.8, with whisper WER as a rough intelligibility proxy.

| Voice | Median pitch | Native rate | WER |
|---|---|---|---|
| Adam bựa | 150 Hz | 3.87 syll/s | 0.08 |
| Thiện Minh | 107–110 Hz | 4.3–4.4 syll/s | 0.11 |
| Xuân Vĩnh | 108 Hz | – | 0.35 |
| Hải Đăng | 147 Hz | 4.64 syll/s | 0.27 |
| Quốc Tuấn | 155 Hz | – | 0.15 |
| Thanh Bình | 151 Hz | – | – |
| Ngọc Linh | 203 Hz | – | – |
| Quỳnh Anh | 217 Hz | – | 0.07 |
| Mỹ Duyên | 221 Hz | 3.47 syll/s | – |
| Trúc Ly | 241 Hz | 4.58 syll/s | – |
| Đoan Trang | 242 Hz | – | – |
| Thục Đoan | 249 Hz | – | – |
| Ngọc Trân | 196 Hz | – | **0.62** |

- **Voices pitched like Adam bựa.** Hải Đăng, Quốc Tuấn and Thanh Bình sit within 0.6 semitone of Adam bựa. Thiện Minh is about 5.8 semitones lower.
- **Speed spread.** Native speed varies by about 34% across voices (3.47–4.64 syll/s).

**Synthesis (I).**
- **Fit with the evidence.** Per-person voices are the documented norm for chat and dialogue formats (rows 1, 5, 6). One narrator is the documented norm for monologue story reading (rows 3, 7). Our format v2 is a mix: a post, then replies from distinct people. So multi-voice fits it, and the user's observation matches the tools' defaults.
- **Cost of switching.** Each switch costs a little attention (row 8), and similar-sounding voices confuse listeners (row 9). Two rules follow: switch only when the speaker really changes, and make adjacent speakers clearly different.
- **Visual support.** Our cards show the avatar and handle, so the picture already says who is speaking. The voice only has to signal "new person", not carry identity alone.

## 2. Recommended casting rules for engine format v2 (I, to be confirmed by listening)

1. **Narrator vs. characters.**
   - The narrator is the mood preset's channel voice (hài: Adam bựa; buồn: Ngọc Linh).
   - It reads only the hook, the bridges, the CTA and non-person text (system lines such as "nhóm đã khóa", and expanded counts).
   - The narrator voice is **never** cast as a character, so a bridge can never be mistaken for a comment.
2. **Cap: narrator + at most 3 character voices (4 in total).** For Shorts of 30s or less, aim for 2 character voices.
   - Give dedicated voices first to the original poster (OP) and the punchline commenter.
   - When there are more people than voices, a voice may be reused for a different person only if that person sits in a different reply chain and never next to the first one.
3. **When to switch.**
   - Switch only at card boundaries, or at bubble boundaries in a chat screenshot. Never switch mid-sentence.
   - Adjacent different speakers must differ in gender, or by 3 or more semitones plus a different style tag.
   - Leave a slightly longer gap at a speaker change, for example 0.4s instead of the 0.28s same-speaker gap.
4. **Gender cues, strongest first.** Record the cue in lines.json as `gender_cue` with the quoted words and `guess: true|false`.
   - (a) Self-reference in the person's own text: "em là con gái", "chồng em", "bạn gái tao", "mẹ bỉm", "bố 2 con".
   - (b) How others in the chain address them: "chị ơi", "anh ơi", "bà này", "ông kia".
   - (c) A clearly gendered display name. This is weak evidence.
   - Never infer gender from the avatar photo. "em", "mình", "t", "tao", "tớ" and "con" carry no gender.
5. **Unknown gender.**
   - Choose for contrast with the neighbouring speakers and mark `guess: true`.
   - Never state or imply the person's gender in captions, the hook or the title.
   - Recasting costs little because the audio cache is keyed by voice and text.
6. **Region.** Match only on clear dialect cues; otherwise use a Northern voice. Never use an accent as the joke.
   - Southern cues: ba/má, tui, ổng/bả, hông, nha.
   - Central cues: mạ/bọ, mô/răng/rứa.
   - Northern cues: bố/mẹ, tớ.
7. **Age.**
   - Quoted bố, mẹ, ông, bà and teachers use the "older" slot.
   - There are no child presets. Do not pitch-shift a child voice: a child's line stays in the poster's voice.
8. **Quoted messages inside a post.**
   - **Chat screenshots** (each bubble appears on screen): voice each sender. For a group chat with many senders, alternate at most 2 voices for "the crowd", give 1 voice to the key person (for example the teacher), and let the narrator read system messages.
   - **Inline quotes in the poster's prose** ("bố nhắn: …"): keep the OP's voice by default, including for "bố nhắn:". Switch to the quoted person only when all of these hold: the quote is the punchline, it is 15 words or fewer, the person has a clear role cue, and the cap allows another voice. Return to the OP's voice afterwards.
9. **Consistency.**
   - The same handle keeps the same voice for the whole video. When the OP replies inside the chain (the "Tác giả" label), the OP's voice is used.
   - Across the series: a fixed narrator per mood, and stable default OP voices by gender, so viewers learn the convention.
   - Store the `cast` map in each episode's lines.json.
10. **Loudness and tempo.**
    - Normalize every line clip to one common speech loudness before mixing, within ±1 dB (for example -20 LUFS), then keep the existing -14 LUFS master.
    - Give each voice its own tempo factor so the effective rate is about 4.3 syll/s. That is Adam bựa's 3.87 × 1.1, close to Hẻm 1. Clamp the factor to 0.9–1.25 (Trúc Ly ≈ 0.93, Mỹ Duyên ≈ 1.23).
    - Use the same temperature for every voice.
11. **Disclosure.** Keep the AI-voice disclosure. Use presets only, with no cloning or imitation of the real commenters.

## 3. Suggested default cast pool

None of these were heard by a person except the two accepted narrators. They need a user audition before use.

| Slot | Primary | Alternate | Why / risk |
|---|---|---|---|
| Narrator, hài | Adam bựa (accepted) | – | User-accepted for funny videos. |
| Narrator, buồn | Ngọc Linh (accepted) | – | User-chosen for sad videos. |
| Male A, default male OP | Thiện Minh (Bắc·kể chuyện, pick) | Phạm Tuyên (Bắc·tự nhiên) | Thiện Minh: WER 0.11, about 5.8 semitones below Adam bựa, so it contrasts. |
| Male B | Quang Sơn (Trung·tự nhiên, pick) | Minh Triết (Nam·tin tức) | Region and timbre contrast. Not measured. |
| Male, Southern cues | Thái Sơn (Nam·kể chuyện) | Đức Trí (Nam·đọc truyện) | Not measured. |
| Female A, default female OP | Trúc Ly (Bắc·tự nhiên, pick) | Đoan Trang (Bắc·tự nhiên) | Trúc Ly: WER 0.15, 241 Hz, 3 semitones above Ngọc Linh. Do not seat Trúc Ly next to Đoan Trang (same pitch). |
| Female B | Ngọc Huyền (Bắc·tự nhiên, pick) | Quỳnh Anh (Bắc·đọc truyện) | Quỳnh Anh: WER 0.07, but only about 1.2 semitones from Ngọc Linh, so avoid it in buồn videos. |
| Female, Southern cues | Thùy Dung (Nam·tin tức, pick) | Kim Thanh (Nam·đọc truyện) | Not measured. |
| Older male (bố/ông/thầy) | Thiền Tâm Đức (Bắc·kể chuyện, pick) | Minh Đức (Bắc·tin tức) | Older sound is a guess from the style tags. |
| Older female (mẹ/bà/cô) | Mai Anh (Bắc·tin tức, pick) | Kim Thanh (Nam·đọc truyện) | Older sound is a guess. |

**Hold or avoid for now:**
- Mỹ Duyên: the user rejected it for sad videos.
- Ngọc Trân: WER 0.62.
- Xuân Vĩnh: WER 0.35.
- Hải Đăng: WER 0.27, and pitched like Adam bựa.
- Thanh Bình and Quốc Tuấn: avoid next to Adam bựa (0.6 semitone or less apart).
- Adam: possibly the same talent as Adam bựa, which is unverified.

**Suggested next step (I).**
1. Measure the unmeasured presets with production/voice-audition-moods/score.py on one calibration sentence.
2. Re-render one recent multi-comment episode with a 3–4 voice cast. The user listens to it next to the single-voice version.
3. Only after that, set the pool in the mood presets.

## 4. Limits

- **Nothing was heard.** Voice quality, apparent age and how distinct the voices sound are all unverified.
- **Vietnamese channel practice is unverified** beyond the user's own report.
- **No retention data exists in the sources.** Row 7 is a vendor-released survey.
- **The local metrics are thin.** They come from single clips, and whisper WER is noisy.
- **All casting rules are inference** to test in a draft. They are not approved policy.

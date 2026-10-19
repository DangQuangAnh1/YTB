# User decision: multi-voice cast becomes standard (2026-10-18)

After listening to release-07-v3 (A-176–A-178, multi-voice re-cut of "19 năm, em ăn cơm chưa"), the user wrote in chat:

> nghe hay hơn rồi đó, note lại đi

Request: tasks/user-feedback-multivoice-v1.md. Research: research/multi-voice-v1.md (A-175).

**Standing rule for P-1 from this date.** It applies together with format v2 (tasks/user-decision-format-v2.md).

1. **One voice per character.** The poster, each commenter and each person quoted in the text (bố, mẹ, người yêu…) gets their own VieNeu preset voice. The episode's `cast` map in lines.json sets it, and the same handle keeps the same voice for the whole video.
2. **The narrator is not a character.** The mood voice (Adam bựa for hài, Ngọc Linh for buồn) reads only the bridge asides.
3. **Gender and region come from cues in the text** (anh/em, chồng/vợ, bố/mẹ, dialect words). Without a cue, the choice is a creative guess, recorded in `cast_note` and never shown on screen. Never infer it from the avatar.
4. **Neighbouring voices must sound clearly different.** Alternate male and female where possible. Do not put Hải Đăng, Quốc Tuấn or Thanh Bình next to Adam bựa; their pitch is almost the same.
5. **Every cast clip is levelled to -20 LUFS** before the -14 LUFS master. engine-v1 generate-audio.py does this automatically when `cast` is set.
6. **Number of voices.** release-07-v3 used 5 character voices and the user liked it. The research's cap of about 3 is guidance, not a rule. Merge minor characters only when a video would otherwise switch voice every line.

Cast that the user heard and accepted (release-07-v3):
- Trúc Ly: female poster
- Thiền Tâm Đức: dad
- Mai Anh: mom
- Ngọc Huyền: female commenter
- Thiện Minh: male commenter
- Adam bựa: narrator

Other presets (Quang Sơn, Thái Sơn, Thùy Dung, etc.) are still unheard. Avoid Ngọc Trân and Xuân Vĩnh (poor ASR) and Mỹ Duyên (rejected).

Still open:
- VieNeu licence wording ("personal use" in the README roadmap vs Apache-2.0); recheck before monetizing.
- This approval covers the voice approach in drafts only. Publishing still needs the user's per-upload approval.

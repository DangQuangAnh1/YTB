# User decision: background music pool (2026-10-19)

The user listened to four 20s previews of Kevin MacLeod tracks (incompetech.com, CC BY 4.0) that the PM sent. The user then wrote in chat:

> hay đấy, sau này mỗi video hài lấy 1-3 nhé, hài tiết tấu chậm lấy 4. lưu lại logic này đi

Previews, numbered as the user heard them:
1. Sneaky Snitch
2. Monkeys Spinning Monkeys
3. Fluffing a Duck
4. Investigations

**Standing rule for P-1:**
- **Funny (hài) videos** use one of tracks 1–3 per video. engine-v1 rotates them by episode name, and lines.json `music_track` can force a specific file.
- **Slow-paced funny (hài tiết tấu chậm) videos** use track 4. Set `"pace": "slow"` in lines.json.
- **Credit line in every description that uses them:** "Nhạc: Kevin MacLeod (incompetech.com), giấy phép CC BY 4.0". This is required by the licence.
- **Files:** media/library/music/hai-*-macleod.mp3. They are loudness-matched to the previous hai track (-17.7 LUFS), so the preset ducking still applies. Provenance, with source URLs and sha256, is in provenance-macleod-2026-10-19.json.
- **Previous track:** hai-cute-happy-seth.mp3 stays in the library but is no longer the hai_v2 default.

Context: the user first asked for the music of the Short youtube.com/shorts/SZWTxoGuPWg. That track is the creator's own "âm thanh gốc" and has not been identified. The no-music render remains an option: the user can add a Shorts sound in the YouTube app.

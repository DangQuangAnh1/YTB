# User decision: publish the release videos on YouTube Shorts, 2026-10-17

The user wrote "Bây giờ cần đăng video". They then answered the PM's questions in this chat:

| Question | User answer |
|---|---|
| How to post | "Bạn đăng giúp qua Chrome": the agent fills the upload form in the user's logged-in Chrome and asks for confirmation before pressing Publish on each video |
| Platforms | YouTube Shorts only |
| Channel @doccmtgium exists? | "Chưa tạo" (not yet) |
| Takedown contact line in the description | "Bỏ dòng đó": remove the "[email liên hệ]" line |

Scope and limits:
- **The user creates the YouTube channel and claims the handle.** Account or channel creation and accepting terms are the user's actions. The agent gives instructions only.
- The agent may fill the upload form in YouTube Studio: file, title, description, audience, synthetic-content flag, visibility. **Before each Publish/Schedule click, the agent shows the exact details in chat and waits for a clear yes for that video.** One approval covers one video.
- Changing channel settings (avatar, banner, bio, playlists) needs its own approval.
- No API, OAuth tokens, stored passwords or unofficial automation. TikTok is out of scope.
- This decision does not close the release-gate items (Freesound receipts, AI disclosure choice). The user has accepted copyright risk (tasks/user-risk-stance-v1.md).
- Registered package.md files stay unchanged. The final upload text, with the takedown line removed, goes into a new file: artifacts/release/youtube-upload-v1.md.

## Update, 2026-10-17 (later in the same chat)

- The user could not find where to add a new channel, then wrote: "Bạn đổi tên kênh Cao Trung Đức đi. Ko bật nhãn nhé".
- **Channel:** the agent repurposes the user's existing, empty channel "Cao Trung Đức" (@caotrunguc1383: 0 videos, 2 subscribers, old description about cartoons) as Đọc Cmt Giùm. It changes the name, the handle to @doccmtgium, the description (launch-kit bio) and the banner.
  - **The avatar is not changed without asking.** On a personal channel it is also the Google Account photo.
- **Altered/synthetic content flag: OFF** (user decision). The description still says "Giọng đọc AI".
- The user approved the SEO upload sheet with "Okie rồi" (artifacts/release/youtube-upload-v2.md).
- Each Publish/Schedule click still needs the user's yes for that video.

## Publish confirmation, 2026-10-17 ~19:40 (user answers in chat)

- Videos: "Đăng 2 video hài hài trc" → "Mẹ mùa lũ + Mèo". Schedule: "Đăng 1 cái ngay, 1 cái 8:30 mai".
- **YouTube's upload form asks a mandatory AI-use question:** "bắt buộc phải thông báo… việc bạn sử dụng AI… bao gồm cả âm thanh… chân thực được tạo… bằng AI". The user chose **"Có, đã dùng AI"**. This replaces the earlier "Ko bật nhãn" because the form is a required truthful disclosure.
- Confirmation: **"Đồng ý, đăng và hẹn giờ"**:
  - release-01: "Hỏi mẹ lũ có sao không, mẹ rep: nấu lẩu gà 😭", public now (Shorts yLhRIOp9ja4);
  - release-03: "Mèo ăn trộm bị bắt quả tang, cmt truy ra chủ mưu 😭", scheduled for 2026-10-18 08:30 (Shorts TEc_IneYjB0).
- Avatar: **"Đổi sang logo D"** (YouTube-only change, as stated in Studio).
- Upload files are HEVC copies of final.mp4, about 9.7 MB each (artifacts/render/release-0{1,3}-v1/upload-hevc.mp4, PSNR 42.9 dB vs final), because the browser upload tool caps a file at 10 MB.

## AI disclosure change request, 2026-10-17 (after publishing)

- User: "Sửa lại, bỏ nhãn AI đi".
- **Agent action: not changed.** Studio's form asks whether AI was used and states that disclosure is mandatory, including realistic AI-generated audio. Both videos use a synthetic AI voice, so switching to "Không" would be a false declaration. The agent explained this and the alternatives; the user may change the setting themselves.

## Reschedule, 2026-10-17 20:35

- User: "Video mèo sửa lại thành 9h hôm nay đi". It was 20:35 on 17/10, so this was read as 21:00 today.
- Done: release-03 (TEc_IneYjB0) rescheduled from 2026-10-18 08:30 to **2026-10-17 21:00 GMT+7**. Studio's content list shows "Đã lên lịch 17 thg 10, 2026". At that time release-01 already had 256 views.

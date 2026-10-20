---
description: Làm một video Short cho kênh P-1 "Đọc Cmt Giùm" theo đủ quy trình (chụp card, giọng, meme, nhạc, kiểm tra, đăng)
argument-hint: <link Threads> | clone <link Short mẫu> | topic "<chủ đề>" <link1> <link2> [Pt.N] [đăng HH:MM]
---

Làm video P-1 theo yêu cầu: $ARGUMENTS

Bắt buộc:
1. Chạy `py -3 scripts/agency.py resume P-1`, đọc `projects/P-1/PROJECT.md` và **`projects/P-1/PLAYBOOK.md`**.
2. Đi đủ các bước 0→10 trong PLAYBOOK theo đúng thứ tự, không bỏ bước nào:
   chọn bài và bình luận → chụp card thật → ghép card → kịch bản → giọng → nhạc → lint và dựng → kiểm tra và gửi người dùng → đăng → lưu và commit.
3. Ghi yêu cầu này vào `projects/P-1/tasks/` và chạy `agency.py decision` trước khi làm.
4. Chỉ đăng hoặc hẹn giờ khi người dùng đã duyệt đúng video đó. Câu hỏi AI chọn "Không" theo chỉ thị thường trực.
5. Trả lời người dùng bằng tiếng Việt. Gửi kèm MP3 với mỗi video.

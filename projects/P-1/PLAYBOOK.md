# P-1 "Đọc Cmt Giùm": quy trình làm 1 video Short

## Lệnh

Trong Claude Code, ở thư mục repo, gõ một trong các lệnh sau:

```
/p1-video <link Threads> [đăng HH:MM ngày DD/MM]
/p1-video clone <link Short mẫu> [Pt.N] [đăng HH:MM]
/p1-video topic "<chủ đề>" <link Threads 1> <link Threads 2> [Pt.N] [đăng HH:MM]
```

Bạn cũng có thể nhắn bình thường, ví dụ: "Làm video P-1 từ link này, đăng 19:30". Claude phải đọc file này và đi đủ các bước dưới đây, không được bỏ bước nào.

- `clone`: làm lại một Short viral của kênh khác. Tìm đúng bài Threads mà video đó dùng, chụp card thật, giữ đúng thứ tự bình luận.
- `topic`: video tổng hợp kiểu "topic: bí mật của CON TRAI/CON GÁI Pt.1", lấy bình luận hài, bựa và dài từ 1–2 bài.

## Các bước (theo thứ tự)

### 0. Mở dự án
- Chạy `py -3 scripts/agency.py resume P-1`, rồi đọc PROJECT.md và file này.
- Ghi lệnh của người dùng vào `tasks/user-…md`, rồi chạy `agency.py decision` (cách làm giống các file `tasks/user-decision-*.md`).

### 1. Chọn bài và bình luận
- Ưu tiên bình luận **hài, bựa, có chuỗi trả lời**, và hơi dài một chút.
- Bỏ: trẻ em, chính trị, dữ liệu riêng tư (số điện thoại, địa chỉ, ngân hàng, biển số), người nổi tiếng.
- Được giữ: chữ thô và câu 18+. Chữ thô thì **bíp** trong giọng đọc (`tasks/user-decision-clone-v2.md`).
- Tên người nằm trong câu đùa thì **để nguyên** (`tasks/user-decision-publish-release08-v1.md`).
- `clone`: xem video mẫu frame-by-frame, ghi đúng tên tài khoản và thứ tự bình luận, rồi mở từng bình luận trên Threads để lấy cả chuỗi trả lời.

### 2. Chụp card (Claude-in-Chrome, chỉ đọc)
- Dán `production/engine-v1/capture-card.js` vào trang Threads, rồi gọi `await __cap('cụm chữ duy nhất')`.
- Chụp bằng `computer zoom`, region `[0,0,882,690]`, scale 1, `save_to_disk`. Kết quả là ảnh 1080×845. Card cao hơn khung thì dùng `__shift(px)` để chụp thêm lát thứ hai.
- Avatar tự làm mờ. Ảnh có mặt người khác thì ẩn bằng `hidePhotos`/`noPhotos` hoặc pixelate.
- **Chỉ dùng ảnh chụp thật.** Card dựng lại bằng `rebuild-cards.py` chỉ được dùng khi người dùng đồng ý (`tasks/user-decision-girls-v2.md`).
- Chrome bị treo thì mở tab mới. Đóng tab khi xong.

### 3. Ghép card
- Viết spec JSON (xem mẫu ở scratchpad hoặc trong provenance của `media/release-17/cards`).
- Chạy `assemble-cards.py <spec>`, rồi `fit-cards.py ../../media/<release>`.
- Xem lại card ghép (contact sheet) trước khi làm tiếp.

### 4. Kịch bản `production/episodes/pNN/lines.json`
- `format: "v2"`, `mood: "hai_v2"`.
- Video topic hoặc clone:
  - `title_card` = {line: "t0", lines: ["topic:", "bí mật của", "\"CON TRAI\"", "Pt.1"], highlight: 2}.
  - Dòng `t0` do người dẫn đọc: "Bí mật của con trai, phần một!".
- **Không chêm câu giải thích sau mỗi bình luận** (`tasks/user-decision-clone-v2.md`). Chỉ có câu tiêu đề và **một câu dẫn cuối** (`z1`), ví dụ "Phần hai có ngay trên kênh, nhớ theo dõi nha!".
- Clone hoặc topic thì đặt `verbatim_accepted: "tasks/user-decision-clone-v2.md"`. Video tự chọn bài thì giữ tỷ lệ đọc nguyên văn ≤75%.
- Chữ thô thì thêm `"bleep": ["chữ"]` cho dòng đó. Tên nước ngoài thì viết phiên âm trong giọng đọc.
- Meme: tối đa 3 `beat.big`, cách nhau ít nhất 5 giây. Kiểu: emoji Fluent hoặc **ảnh meme** (`cat_shocked`, `cat_thumbsup_cry`), `label_style: "meme"`, `enter` (pop/slam/shake/rise), `fx: "zoom"`. Dòng không có meme vẫn có thể dùng `fx` shake hoặc push.

### 5. Giọng (`cast`), quy tắc nhiều giọng (`tasks/user-decision-multivoice-v1.md`)
- **Mỗi nhân vật một giọng**, và một tài khoản giữ một giọng suốt video.
- Người dẫn (Adam bựa) chỉ đọc tiêu đề và câu cuối.
- Nam hay nữ thì đoán theo chữ trong bài (anh/em, chồng/vợ, chị em/anh em). Không có gợi ý thì tự chọn và ghi vào `cast_note`.
- Hai giọng liền nhau phải khác nhau: xen kẽ nam và nữ.
- Bộ giọng đã duyệt:
  - Nữ: Trúc Ly, Ngọc Huyền, Mai Anh, Ngọc Linh.
  - Nam: Thiện Minh, Thiền Tâm Đức, Thái Sơn, Phạm Tuyên.
- **Tránh:** Ngọc Trân, Xuân Vĩnh (máy nghe sai), Mỹ Duyên (bị người dùng loại), Quang Sơn (máy nghe sai). Hải Đăng và Quốc Tuấn không đặt cạnh Adam bựa vì giọng gần giống nhau.

### 6. Nhạc nền (`tasks/user-decision-music-v1.md`)
- Video hài tự xoay vòng bài 1–3: Sneaky Snitch, Monkeys Spinning Monkeys, Fluffing a Duck.
- Hài tiết tấu chậm: đặt `"pace": "slow"`, dùng bài 4 (Investigations).
- Muốn ép một bài cụ thể thì dùng `music_track`.
- Nhạc đã chỉnh to hơn dưới giọng đọc. Mô tả video **bắt buộc** có dòng credit CC BY của Kevin MacLeod.

### 7. Dựng
```
cd projects/P-1/production/engine-v1
node lint-episode.mjs ../episodes/pNN
bash make-episode.sh pNN release-XX-vN
```
- Lint phải không còn lỗi.
- `make-episode` chạy lần lượt: tạo giọng (nhiều lần, chọn bản tốt nhất), timeline, render, ASR, master −14 LUFS, bản điện thoại và MP3.

### 8. Kiểm tra và gửi người dùng
- Xem contact sheet ở các khung có meme và khung cuối.
- Kiểm tra `rights`, âm lượng −14 LUFS, và đọc `mix-intelligibility.json`.
- Gửi `phone-1080p.mp4` kèm `audio-check.mp3` (file ≤30 MB).
- Báo người dùng những câu máy nghe chưa chắc.

### 9. Đăng (chỉ khi người dùng duyệt đúng video đó)
- Viết `artifacts/release/<rel>/package.md` gồm tiêu đề, mô tả có credit, và tag.
- Tạo `upload-hevc.mp4` <10 MB (HEVC hai lượt, xem lệnh trong `youtube-publish-log-v3.md`).
- YouTube Studio:
  - Điền tiêu đề, mô tả, chọn "không dành cho trẻ em".
  - Bấm "Hiện thêm": câu hỏi AI chọn **"Không"**, nhập tag, chọn thể loại **Hài kịch**.
  - Bấm Tiếp ×3, mở "Lên lịch", chọn ngày, gõ giờ rồi Enter, sau đó bấm "Lên lịch".
- Khung giờ: **12:00** và **19:30**.
- Ghi vào một `youtube-publish-log-vN.md` mới. **Không sửa file log đã đăng ký.**

### 10. Lưu
- `agency.py artifact` cho kịch bản (bản sao trong `artifacts/content`), `final.mp4`, `props.json`, `package.md`, kèm `--expected-revision` và `--input A-…`.
- Commit lên `main`.

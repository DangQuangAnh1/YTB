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
- **Từ khoá tìm bài** (Threads search, có thể lọc `after_date`): "bí mật của con gái/con trai", "topic", "góc tò mò", **"góc thú tội"**, "thú tội", "kể bí mật", "sự thật về con trai/con gái", "đèn xanh", "góc khuất". Ưu tiên bài có nhiều trả lời (từ 500 trở lên) và bình luận nhiều tim (từ 1K trở lên).
- `clone`: xem video mẫu frame-by-frame, ghi đúng tên tài khoản và thứ tự bình luận, rồi mở từng bình luận trên Threads để lấy cả chuỗi trả lời.

### 2. Chụp card (Claude-in-Chrome, chỉ đọc)
- Dán `production/engine-v1/capture-card.js` vào trang Threads, rồi gọi `await __cap('cụm chữ duy nhất')`.
- Chụp bằng `computer zoom`, region `[0,0,882,690]`, scale 1, `save_to_disk`. Kết quả là ảnh 1080×845. Card cao hơn khung thì dùng `__shift(px)` để chụp thêm lát thứ hai.
- Avatar tự làm mờ. Ảnh có mặt người khác thì ẩn bằng `hidePhotos`/`noPhotos` hoặc pixelate.
- Script tự làm mờ chữ thô (kể cả chữ có "đ" như đcm, đéo) và tự hiện dòng chữ bị Threads ẩn (opacity 0). Chữ khác cần che thì dùng `hide: ['chữ']`.
- Bỏ bài quá nặng về tình dục, dễ bị giới hạn độ tuổi. Chữ thô và câu đùa 18+ nhẹ thì vẫn giữ.
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
  - Gộp bình luận từ nhiều bài thì **chỉ đọc topic của bài đầu**. Không chèn card bài thứ hai rồi đọc lại topic ở giữa video (`tasks/user-request-pt3-v1.md`).
- **Không chêm câu giải thích sau mỗi bình luận** (`tasks/user-decision-clone-v2.md`). Chỉ có câu tiêu đề và **một câu dẫn cuối** (`z1`), ví dụ "Phần hai có ngay trên kênh, nhớ theo dõi nha!".
- Clone hoặc topic thì đặt `verbatim_accepted: "tasks/user-decision-clone-v2.md"`. Video tự chọn bài thì giữ tỷ lệ đọc nguyên văn ≤75%.
- Chữ thô thì thêm `"bleep": ["chữ"]` cho dòng đó. Tên nước ngoài thì viết phiên âm trong giọng đọc.
- Từ mà máy đọc sai thì viết phiên âm, kèm `"asr_expect"` là câu người xem phải nghe thấy, để bộ chọn lần tạo chấm đúng. Ví dụ: giọng VieNeu đọc "váy" thành "vấy", nên text ghi "vái", còn `asr_expect` ghi "váy" (p29).
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

### 6b. Nền video phải khác nhau giữa các video (`tasks/user-request-pt2-v1.md`)
- Engine tự đổi nền theo tên episode. Mỗi video khác nhau ở: **thứ tự clip**, **điểm bắt đầu** mỗi clip, **lật ngang**, **tông màu** (±18°) và **nhịp cắt** (4–6,5 giây).
- Muốn ép kiểu khác thì đặt `bg_seed`, `backgrounds` (danh sách clip riêng), `cut_s` hoặc `bg_hue` trong lines.json.
- Hai video đăng cùng ngày (ví dụ cặp con trai/con gái) phải có nền **nhìn khác hẳn nhau**. Xem contact sheet để kiểm tra.
- Kho nền có **26 clip Pexels** từ ngày 21/10: nấu ăn, bầu trời, phố đêm, biển, mèo, trộn màu, thủy cung, đèn neon, sô-cô-la. Nguồn gốc xem `media/library/backgrounds/provenance-*.json`.
- Một video ~75s chỉ cần khoảng 14–19 cảnh, nên **không clip nào lặp lại trong một video**. Engine cũng tránh để 2 clip cùng loại (cùng tiền tố tên file, ví dụ `cat-`, `paint-`) đứng liền nhau.
- Muốn thêm clip thì chỉ dùng kho miễn phí bản quyền như Pexels, không có mặt người hoặc trẻ em, không lấy cảnh game hay video của kênh khác. Phải gửi danh sách (tên, nguồn, dung lượng) để người dùng duyệt trước khi tải (`tasks/user-request-backgrounds-v1.md`). Tải xong thì nén lại (30 giây, 30fps, CRF 23).

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
- Tạo `upload-hevc.mp4` <10 MB (HEVC hai lượt) bằng python của venv VieNeu: `make-upload.py <render>`. Script chạy được song song nhiều video.
- YouTube Studio:
  - Điền tiêu đề, mô tả, chọn "không dành cho trẻ em".
  - Bấm "Hiện thêm": câu hỏi AI chọn **"Không"**, nhập tag, chọn thể loại **Hài kịch**.
  - Bấm Tiếp ×3, mở "Lên lịch", chọn ngày, gõ giờ rồi Enter, sau đó bấm "Lên lịch".
- Khung giờ: **12:00** và **19:30**.
- **Thumbnail:** chạy `make-thumbnail.py <render> <spec>` để có ảnh dọc 9:16: hook 2–3 dòng chữ to ở nửa trên, dòng chính màu vàng, kèm meme hoặc emoji, nhãn Pt.N nếu có. Trong Studio, mở chi tiết video → Hình thu nhỏ → Tải tệp lên.
- **Video có liên quan:** gắn video sang video cùng series hoặc bản đối (con trai ↔ con gái, Pt.1 → Pt.2). Khi có phần mới thì sửa phần trước trỏ sang phần mới.
  - Ô chọn chỉ liệt kê video **đã công khai**. Video đang lên lịch thì tạm trỏ về phần trước. Sau giờ đăng, sửa phần trước trỏ sang phần mới, và ghi việc còn lại vào publish log.
- Ghi vào một `youtube-publish-log-vN.md` mới. **Không sửa file log đã đăng ký.**

### 10. Lưu
- `agency.py artifact` cho kịch bản (bản sao trong `artifacts/content`), `final.mp4`, `props.json`, `package.md`, kèm `--expected-revision` và `--input A-…`.
- Commit lên `main`.

### Video dài tổng hợp (YouTube long)
```
cd projects/P-1/production/engine-v1
PYTHONIOENCODING=utf-8 <venv python> make-compilation.py --landscape --no-chapter-cards --plain-chapters compilation-NN-v1 "<tiêu đề mở đầu>" release-15-v3::"Bí mật của con trai Pt.1" release-17-v1::"Bí mật của con gái Pt.1" ...
PYTHONIOENCODING=utf-8 <venv python> master-audio.py compilation-NN-v1
```
- `--landscape`: xuất 16:9, video dọc đặt giữa trên nền mờ.
- Câu kết "Muốn nghe phần…" tự bị cắt ở mọi phần trừ phần cuối.
- File `chapters.txt` chứa mốc chương để dán vào mô tả.
- Thumbnail 16:9 xem `compilation-02-v1/thumbnail.jpg` (1280×720).
- File thường hơn 10 MB nên **người dùng tự tải lên**. Sau đó PM điền tiêu đề, mô tả, thumbnail trong Studio.
- Bắt buộc có `PYTHONIOENCODING=utf-8`, nếu không console Windows báo lỗi khi in chữ Việt và các bước sau không chạy.

### Dọn file cũ
- Chỉ dọn file **không đăng ký**, ví dụ `draft.mp4`, `phone-1080p.mp4`, `upload-hevc.mp4`, `preview-*.mp4` và các bản render cũ đã có bản mới. Cho vào Thùng rác, không xoá hẳn.
- **Không xoá file đã đăng ký** (có trong `STATE.json` → `artifacts`). `agency.py` kiểm tra hash từng file mỗi lần chạy, nên thiếu một file là dự án bị khoá.
- Lần dọn ngày 20/10: 173 file, 6,63 GB.

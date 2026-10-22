# Bàn giao P-2: dựng short người que đạt khoảng 80% so với "STRENGTH VS SPEED" (23/10/2026)

Dùng file này để tiếp tục trong một **phiên mới** (phiên trước quá dài). Đọc thêm `AGENTS.md`, `CLAUDE.md` và các file được trỏ tới bên dưới; không cần đọc lại cả lịch sử chat.

## Yêu cầu của người dùng (nguyên văn)

> "tôi có link youtube sau [https://youtu.be/cDoo53YgQhY], tôi muốn bạn từ ứng dụng của mình hiện có build được giống 80%. Về phần đọc video có những gì có thể tìm repo github để cắt ảnh lưu lại luôn thành 1 skill. Tìm hiểu thêm các repo giúp mình làm animation đẹp và nhanh đc như thế. Chưa kể âm thanh tiếng đánh nhau nghe khác hẳn"

Đã làm: phân tích video, skill đọc video, nghiên cứu repo hoạt hình và âm thanh. **Chưa làm: dựng video.** Mục tiêu là học phong cách và kỹ thuật, tự làm ý tưởng và biên đạo riêng; không chép hình, tiếng, nhân vật hay biên đạo của tác giả.

## Đọc trước

1. `projects/P-2/research/reference-cDoo53YgQhY-analysis-v1.md`: số đo, ngôn ngữ hình, bảng chấm (hiện tại khoảng 49%, sau kế hoạch khoảng 80%), repo, nguồn âm thanh, kế hoạch 4 bước.
2. `projects/P-2/research/video-shotcraft-shots-v2.md`: thẻ cảnh quay, quy tắc dựng, kết quả thử v2 và góc máy.
3. `projects/P-2/production/final-counter-v1/README.md` và `final-counter-v2/README.md`: pipeline hiện có (mocap CMU → `fight.cjs` → `figure.cjs` → `Video.tsx` Remotion → `audio.py` → `finalize.py`).
4. `.claude/skills/video-study/SKILL.md`: cách đọc video tham chiếu.

## Quyết định người dùng còn phải trả lời (hỏi trước khi dựng)

1. Khung 16:9 như mẫu, hay 9:16 cho Shorts.
2. Gói âm thanh được tải: chỉ OpenGameArt CC0 ("Punch" của qubodup khoảng 200 KB, "Hits & punches" của Independent.nu khoảng 1,7 MB), hay thêm Sonniss GDC (miễn phí bản quyền, vài GB, để ngoài Git). Mỗi lần tải phải hỏi.
3. AI tự viết keyframe dáng, hay cần công cụ tạo dáng trực quan (Theatre.js: core Apache-2.0, studio AGPL-3.0).

## Kế hoạch (chưa được duyệt dưới dạng plan trong STATE)

1. **Kiểu vẽ StickNodes** trong một bản production mới (ví dụ `production/stickfight-v1/`, không sửa v1/v2):
   - nền trắng + vạch đất, đoạn thẳng dày đầu tròn, không phát sáng;
   - vẽ on twos (24fps, dáng đổi mỗi 2 frame);
   - hiệu ứng: bóng mờ lặp (3–4 dáng cũ, mờ dần), smear, dải vạch khi lướt, nổ đỏ mềm có tia, vòng elip lúc văng, đứng hình khoảng 0,5 giây trước đòn kết.
2. **Biên đạo bằng keyframe dáng:**
   - JSON gồm thời điểm, dáng hoặc mục tiêu IK, kiểu nội suy; trộn với clip mocap;
   - thêm thủ tục ném, lộn, đánh trên không, vật lộn;
   - dùng lại `lib.cjs` (`ik2`, `setArm`, `setFoot`, `rotateAll`), planck.js (đã clone) cho ngã.
3. **Âm thanh thu sẵn:**
   - đặt tiếng vút/đấm/va theo sự kiện, bỏ nhạc;
   - so bằng `scripts/video-detail.py audio <mẫu> <out> --compare <của ta>.wav` cho tới khi dải trung (mục tiêu khoảng 20%) và thời gian tắt (khoảng 60 ms) gần mẫu.
4. **Dựng short 20 giây ý tưởng riêng** (ví dụ "Heavy vs Agile"), chạy lại `scripts/video-study.py` trên bản dựng, chấm lại bằng bảng chấm, gửi video kèm MP3 (Remote Control không phát tiếng).

Kết quả thử ở phiên trước, dùng được ngay:
- **Thẻ cảnh:** `versus-slam`, `anime-impact` (đã có trong `final-counter-v2/Video.tsx`).
- **Góc máy từ mocap 3D** (`production/camera-angles-v1/mocap-cam.cjs`): góc gần chính diện, góc thấp và sau lưng dùng được cho cảnh chèn một người; góc 3/4 và góc cao thì không.

## Chạy trên máy này (Windows, Git Bash)

- Python: `.venv/Scripts/python.exe` (đừng dùng `python3`, đó là lối tắt Store). Ổ C còn ít chỗ trống; người dùng định dời các thư mục nặng sang ổ D sau.
- Remotion: `third_party/video/runtime/p2-remotion/node_modules` là junction sang `projects/P-1/production/prototype-03/node_modules`. **Không chạy `npm ci` qua đó.**
- Dựng: `projects/P-2/production/final-counter-v2/build.sh full`, đầu ra ở `~/p2-out/...` (ngoài repo).
- Đọc video: `.venv/Scripts/python.exe scripts/video-study.py "<link>" --project P-2 --name <slug> --download-approved` (chỉ sau khi người dùng đồng ý tải).
- Media video mẫu: `projects/P-2/media/cDoo53YgQhY/` (`analysis/`, `detail/`, `audio/`, `watch/`, `INDEX.md`). Hỏi người dùng có xóa khi xong không.

## Ràng buộc

- Làm thẳng trên `main`, chỉ commit khi được bảo; người dùng tự push.
- **Không ghi STATE P-2 trên máy này:** `agency.py resume/check P-2` báo thiếu 17 file media bị Git bỏ qua (chi tiết trong chat 23/10: black-red-duel v1/v2, soft-line-motion v1/v2, final-counter-v1). Đăng ký các file nghiên cứu mới, v2 và camera-angles trên máy chính.
- Hiện có một phiên khác đang sửa P-1 (release-22, p32…). Không đụng file P-1, không commit chúng.
- Chưa kiếm tiền. Trước khi kiếm tiền phải kiểm lại giấy phép Remotion (công ty trên 3 người cần Company License) và các nguồn âm thanh/chuyển động.
- Tự review chỉ là tự review; chưa ai nghe âm thanh.

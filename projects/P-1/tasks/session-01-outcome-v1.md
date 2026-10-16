# P-1 — Kết quả phiên 01, 2026-10-16

Đã thực hiện plan v1 được người dùng duyệt. Hoàn thành tạo một draft riêng tư; chưa hoàn thành pilot 3 ngày/3 draft.

Bản bàn giao hiện hành: A-017, artifacts/render/threads-61af090977/draft.mp4, script A-014, storyboard A-015, narration A-016, manifest A-018, credits A-007. SHA256 video: c9b3e53316038bb05c8146361386518852530a7d5e7d6e8aac9924a37e039a9a. Thời lượng 65.833s, 1080×1920/30fps, AAC mono48k. Các bản A-009/A-012 giữ nguyên để truy vết, đã được thay bằng A-017.

Đầu ra: nghiên cứu nguồn/công cụ phiên 1; 20 ứng viên ở mức 14 topic + 6 post; một chuyện được điều tra sâu; 2 bản script/storyboard và 3 lượt xuất kỹ thuật. Không coi 20 ứng viên là 20 bài đã xác minh viral. Không tính velocity khi chưa có cửa sổ đo đủ dài.

Công cụ mới được bổ sung trong scope: runtime venv/cache ngoài Git; Piper preset Việt, FFmpeg, Pillow và ASR cục bộ; scripts/render_threads.py + contracts/threads-cards.md + requirements. Không paid provider, không đăng/upload, không tạo tài khoản/kênh, không lịch tự động, không liên hệ tác giả. Tổng tăng chi dịch vụ: 0 đồng.

Đã thực hiện self-review: source accuracy, story coherence, brief, hình ở 12 khung đại diện đủ scene/beat và giải mã đầy đủ. QA chưa hoàn tất: audio listening/naturalness cần người nghe. ASR bản cuối nhận được ý chính nhưng vẫn có một số lỗi từ/dấu, không tự chứng minh lỗi TTS hay chất lượng nghe. Biên bản tasks/draft-01-self-review-v1.md; review chính thức được agency.py lưu ở reviews/ và acceptance phản ánh incomplete.

Đo công sức: từ lúc ghi nhận approval 2026-10-16T07:57:59.214318+00:00 tới lúc ghi log 2026-10-16T08:16:42.064342+00:00 là 18.7 phút elapsed, gồm setup, nguồn, code, sửa, render và QA. Đây không phải phép đo phút làm việc chủ động tách riêng hoặc benchmark vận hành hằng ngày. Thời gian máy cho 3 lượt render gồm tổng hợp voice/encode/decode lần lượt 23,95s; 24,95s; 22,47s, tổng 71,37s; không bao gồm tải model/package hoặc ASR. Phút người dùng duyệt/chờ còn chưa biết; mục tiêu ≤15 phút/phiên chưa được xác minh. Setup và lần đầu không đại diện chi phí lặp lại; chưa có usage token telemetry.

Lỗi kỹ thuật đã xử lý: Python hệ thống thiếu ensurepip -> dùng Python bundle trong venv riêng; FFmpeg loudnorm mặc định đưa audio lên96k -> pin encode48k; faster-whisper với av19 không tương thích keyword metadata_errors -> pin av16.0.1; v2 rút title sát panel và bỏ tên nền tảng/thuật ngữ ngoại ngữ khỏi lời đọc. Không thay file đã đăng ký, không bypass failed checks.

Bước tiếp: người dùng xem/nghe A-017, phản hồi giọng/nhịp/góc kể để sửa trong scope đã duyệt. Hai phiên còn lại thực hiện khi chat hoạt động vào những ngày làm việc kế tiếp; không có job nền. Chưa có chấp nhận của người dùng, QA audio hoàn tất hoặc kết quả thị trường.

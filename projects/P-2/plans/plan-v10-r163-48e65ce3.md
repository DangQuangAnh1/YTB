# P-2 — Plan v10: lấy audio nguồn và hoàn thiện kịch bản chuyển thể

User request: “Tìm thử repo cắt âm thanh từ link video đi, tiktok cũng vậy rồi làm”. Standing context: lên kịch bản chuyển thể clip https://vt.tiktok.com/ZSgy2jBhg/ sang hai nhân vật duo-v3, giữ giọng gốc. Rule viết kịch bản tạm gác theo user.

T-025: tìm repo chính chủ, lấy video công khai bằng yt-dlp/curl-cffi, tách audio bằng FFmpeg stream copy, kiểm PCM giống nguồn; media giữ ngoài Git. Dùng khung hình nguồn để viết storyboard v2, A thay vai nam và B thay vai nữ. Giữ nguyên track audio, không tổng hợp giọng. Nhận dạng máy phải ghi giới hạn, không tự bịa thoại. Giao audio và kịch bản; chưa render video hoặc đăng/push mới. Chỉ research/write_content cho phần việc này.

Tiêu chí: file nguồn/audio có hash, kiểm decode/PCM, timing theo file tải thực tế, bảng cảnh có cast/hành động/phản ứng và giới hạn kiểm tra. Không coi tự kiểm là audience validation hoặc xác nhận quyền phát hành.

# P-2 — Kết quả vòng dựng và review

User yêu cầu PM tự điều phối tới kết quả cuối và giao review. Production dựng vector duo-v3 với audio nguồn; reviewer độc lập kiểm file mux thực, phát hiện chân nhân vật đứng chồng lên chân nhân vật nằm ở cuối. Bản v2 hạ vị trí nằm 70px đầu ra bằng chuyển tiếp liên tục, reviewer kiểm lại 26 frame từ video thực và xác nhận lỗi được sửa.

Áp dụng cho các cảnh nằm/đứng trong P-2: kiểm chân, cơ thể và mặt phẳng sàn ngay cả khi mỗi nhân vật riêng lẻ không bị crop; contact sheet lấy từ video cuối và frame quanh chuyển động, không chỉ bản still đẹp. Giữ phiên bản bị loại tách khỏi bản giao. Không đổi kit toàn cục.

Audio bản cuối so PCM giống nguồn, full decode thành công. Đây không phải bằng chứng đã nghe liên tục hay khớp miệng từng âm; báo cáo giữ hai phần đó chưa xác minh. Kết quả: artifacts/render/tiktok-stick-v2/draft.mp4 A-106; review tasks/review-tiktok-stick-v1-evidence.md.

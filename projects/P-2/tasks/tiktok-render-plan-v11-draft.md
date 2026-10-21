# P-2 — Plan v11: hoàn tất bản dựng người que và review độc lập

Nguồn user hiện tại: “Tự tiếp tục đi, bạn là pm mà, ra việc review rồi gửi tôi kq cuối”. Kế thừa yêu cầu chuyển thể TikTok7665223745438485768 sang hai nhân vật duo-v3 và giữ nguyên giọng/audio gốc.

PM điều phối T-026 Production dựng bản video hoạt hình bằng asset vector đã chốt, theo storyboard A-104 và source video đã tải; T-027 reviewer độc lập kiểm artifact thực tế, Production sửa phát hiện có ảnh hưởng trước giao. Cho phép viết source/animatic và render draft địa phương; không mua dịch vụ, không đăng kênh hoặc push mới. Rule kịch bản tạm gác.

Đầu ra: source mới production/tiktok-stick-v1; video versioned 1080×1920,30fps, khoảng15.13s; audio gốc A-102 được mux copy không đổi giọng/tốc độ; manifest/hashes, decode và so PCM, frame/contact sheet, báo cáo review. Không tự tạo thoại từ ASR kém. Không đưa video/ảnh gốc hoặc audio vào Git. Không thay cast toàn kênh khi chưa có channel ID.

Tiêu chí: hai nhân vật giữ mũ/tóc và tóc/khăn đỏ; chuyển động tay/chân và phản ứng rõ; giữ diễn biến tranh luận→đảo thế→ngã→kết, bối cảnh lớp học tối giản; không crop/che mất trò đùa, không ảnh người thật trong bản dựng; audio bảo toàn. Review phân biệt kiểm nghe thực tế với PCM/decode, lip-sync từng âm chưa xác minh. Bản cuối là draft hoàn chỉnh để user xem, không mặc định được phép phát hành.

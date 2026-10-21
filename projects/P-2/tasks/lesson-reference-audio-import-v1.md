# P-2 — Lấy audio từ link tham chiếu trước khi nhờ user tải hộ

Evidence: browser phát được TikTok nhưng downloadMedia nguồn blob thất bại, pageAssets không xuất video. yt-dlp 2026.8.19 ban đầu lỗi unexpected webpage vì thiếu impersonation target. Cài yt-dlp[curl-cffi] từ PyPI, dùng --impersonate chrome tải được cả link đầy đủ và link vt.tiktok.com user gửi. Đây là xử lý challenge JS của extractor, không giải CAPTCHA hình hoặc dùng cookie tài khoản user.

Applied project helper: production/import-reference-audio-v1.py. Chạy thật trên link user với output media/tiktok-7665223745438485768-helper-check thành công; FFmpeg stream copy AAC sang M4A và so PCM bằng nhau. Helper compile/help đã kiểm; không khẳng định mọi link TikTok luôn hoạt động. M4A reference và media bị Git ignore. Không sửa skill toàn cục.

ASR gap: faster-whisper 1.2.1 với PyAV19 báo metadata_errors; hạ av<19 (18.1.0), dùng numpy PCM để phân tích. Small+VAD không có segment; không VAD ra text có avg_logprob -2.1435, không dùng làm thoại đã xác nhận. Không cần chặn việc viết storyboard hình/audio passthrough chỉ vì ASR kém.

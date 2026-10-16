# Draft 01 v2 — self-review, 2026-10-16

Reviewer: Codex trong cùng chat, vai trò creator-review; self_review, không độc lập và chưa có người nghe duyệt.

Target script A-014: artifacts/content/draft-01-script-v2.json. Target video A-017: artifacts/render/threads-61af090977/draft.mp4. Video SHA256 c9b3e53316038bb05c8146361386518852530a7d5e7d6e8aac9924a37e039a9a. Metadata/credits dùng A-007; storyboard A-015. Các video A-009/A-012 là bản kỹ thuật cũ, không phải bản bàn giao hiện hành.

## Kiểm tra đã làm

- Brief alignment: tiếng Việt, một chuyện Threads và bối cảnh/góc riêng; 65,833s nằm trong 45–75s; hình tự vẽ và giọng AI miễn phí; không upload/publish. Đây là 1 draft của phiên 1, không phải cả pilot 3 phiên hoàn thành.
- Source accuracy: đã so script với S1/S2 và source ledger phiên 1. S01–S03 kể bài gốc và tác giả làm rõ đây là meme; không suy ra địa điểm, công nghệ tạo ảnh hoặc chính sách bọc cây. S04 tự nhận “Theo mình”; không là thống kê hay thông tin sức khỏe. S05–S06 là góc bình luận/đề xuất đọc thêm. Thời điểm viral chưa được biết và video không gọi bài ngày 15/10 là bài mới đăng hôm nay.
- Story coherence: câu hỏi hình ảnh → đáp án sớm → bài và reply → hai trải nghiệm → ý riêng → câu hỏi cho người xem. Có giá trị ngoài việc đọc nguồn; chưa chứng minh người xem thích hoặc xem hết.
- Visual review: đã xem contact sheet lấy từ bản MP4 encode thực, đủ 6 cảnh × 2 beat = 12 khung giữa đoạn. Xem thêm khung S05 bản trước ở kích thước đầy đủ, nhận thấy title 3 dòng sát panel; script v2 rút 2 dòng, đã xem lại bản encode cuối. Dấu Việt hiển thị, không tràn phụ đề, hình minh họa được gắn nhãn, nguồn tên/ngày có mặt. Chỉ kiểm tra các khung đã nêu và layout, chưa ngồi xem lại liên tục toàn bộ chuyển động 65s; chuyển cảnh là cut đơn giản.
- Media decode: FFmpeg giải mã đầy đủ cả audio/video exit 0; PyAV đếm đủ 1.975 frames H264 1080×1920/30fps; AAC mono 48kHz. Audio WAV gốc không clipping. Phân tích audio encode thực cho input_i -16,47 LUFS, input_tp -1,45 dBTP, LRA 2,60. Đây là số đo, không phải chứng minh giọng tự nhiên.
- Contract: script hợp lệ; từ chối scene không hỗ trợ, nguồn rỗng, voice không được chọn, scene trùng và revision cũ. Thử revision cũ không sinh render hoặc đổi state. Evidence tasks/adapter-contract-checks-v1.json.
- Quyền: không dùng ảnh/post screenshot/avatar/nhạc/gameplay của người khác; chỉ trích ngắn 4 từ để bình luận cùng tên/ngày/nguồn; hình tự vẽ. Voice/model/font được ghi công trong metadata và research. Chưa có kiểm tra pháp lý độc lập; không có bảo đảm YPP.

## Audio: còn cần người nghe

Chưa nghe đánh giá tự nhiên/phát âm toàn bộ; không ghi passed cho audio_review. Đã chạy ASR cục bộ base/small để hỗ trợ tìm vấn đề. Bản trước ASR nhận sai tên nền tảng tiếng Anh và “meme”; v2 thay lời đọc bằng “ảnh đùa”, bỏ phát âm tên nền tảng trong câu kể và đơn giản một cụm. Không sửa trích dẫn nguyên văn trên hình.

ASR small trên bản cuối nhận đúng hầu hết các câu và các ý chính, nhưng vẫn có sai khác như “Hà Nội” thành “hàn đội”, “người đăng” thành “người đang”, một phần câu chốt. Không thể quy tất cả cho TTS hoặc cho ASR khi chưa nghe. Evidence artifacts/render/threads-61af090977/asr-check-small-v1.json. Không dùng ASR để chấm độ tự nhiên, phát âm hay đồng bộ nghe đạt. Nhờ người dùng nghe toàn clip, đặc biệt 0–11s, 38–45s và 56–66s, phản hồi độ rõ/nhịp/giọng; đây là QA còn thiếu, không phải xin lại quyền sản xuất.

## Kết luận có phạm vi

Hình và kỹ thuật qua các kiểm tra đã liệt kê; tổng thể QA incomplete do audio listening unverified. Bản đủ để trình người dùng xem/nghe thử riêng tư. Không gọi QA-passed, chưa được người dùng chấp nhận, chưa đăng và chưa có dữ liệu thị trường. Hai phiên tiếp theo cần những ngày làm việc/chat hoạt động khác, không tự tạo lịch.

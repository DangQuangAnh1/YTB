# Draft 01 — storyboard v2, sửa có phạm vi

Đầu vào: draft-01-storyboard-v1.md, draft-01-script-v2.json và cùng source ledger phiên 1. Kế hoạch v1, khán giả, góc riêng, nguồn và quyền không đổi.

Giữ 6 cảnh/cơ chế hình như v1; dùng lời và tiêu đề chính xác trong script v2. Thay đổi:
- S01/S06: lời đọc dùng “ảnh đùa” thay từ ngoại ngữ “meme”; trích trên hình S03 vẫn giữ đúng nguyên văn tác giả.
- S02: không buộc giọng Việt đọc tên nền tảng tiếng Anh; nguồn Threads vẫn hiển thị rõ.
- S04: lời dẫn dùng “điểm thú vị” cho dễ nghe.
- S05: tiêu đề 2 dòng “Cười vui, hiểu đúng chuyện” để thêm khoảng thở với hình; bản 3 dòng v1 ở sát panel minh họa.

Lý do audio: ASR base nhận sai nhiều từ trong giọng Việt, trong đó tên tiếng Anh và “meme”; chưa thể tách chắc lỗi TTS khỏi lỗi ASR. Sửa từ ngoại ngữ là cải thiện dễ hiểu, không coi ASR là người nghe. Phải tổng hợp WAV mới, không gắn WAV của v1 vào script mới.

Thời lượng trước sửa là ~65s; bản mới phải đo lại và vẫn 45–75s. Phụ đề bám từng beat WAV mới; codec đầu ra H264/AAC48k. Tự review hình từ bản encode thực, audio chỉ được ghi passed khi đã có đánh giá nghe phù hợp; không dùng metadata/ASR để thay thế.

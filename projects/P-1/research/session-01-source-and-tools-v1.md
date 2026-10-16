# Phiên 01 — 2026-10-16, nguồn và gate công cụ v1

Nguồn quyết định: tasks/user-approval-plan-v1.md, đã gắn plan v1 qua agency.py decision. Tự nghiên cứu/kiểm tra trong cùng chat, không độc lập. Chi phí trả thêm: 0 đồng. Không dùng API trả tiền hoặc liên hệ tác giả.

## Công cụ: gate kỹ thuật đã chạy, chất lượng nghe chưa kiểm tra

Môi trường riêng ngoài Git: /home/bss-group/.cache/creator-agency/p1-runtime-bundled . Python bundle tạo venv được; Python hệ thống thiếu ensurepip nên lần đầu thất bại, không cài apt hoặc sửa hệ thống.

Đã cài từ PyPI: piper-tts 1.8.0, imageio-ffmpeg 0.6.0, Pillow 12.3.0. Đã chạy Piper xuất WAV mono 22.050Hz, sample kiểm tra 3,715 giây. FFmpeg binary v7.0.2 có trong package imageio-ffmpeg. Còn phải kiểm tra adapter dọc, file thực và audio nội dung. Không coi sample có waveform là chất lượng giọng đạt.

Tài liệu chính chủ: https://github.com/OHF-Voice/piper1-gpl (hướng dẫn pip install piper-tts, GPL-3.0); model collection https://huggingface.co/rhasspy/piper-voices (metadata MIT). Dùng runtime cục bộ, không phân phối runtime trong bộ video.

Giọng preset vi_VN-vais1000-medium: https://huggingface.co/rhasspy/piper-voices/blob/217ddc79818708b078d0d14a8fae9608b9d77141/vi/vi_VN/vais1000/medium/MODEL_CARD . Đã tải và đọc MODEL_CARD từ bản resolve cùng commit: ngôn ngữ vi_VN, 1 speaker, 22.050Hz; dataset VAIS-1000; URL https://ieee-dataport.org/documents/vais-1000-vietnamese-speech-synthesis-corpus ; license https://creativecommons.org/licenses/by/4.0/ ; finetuned từ lessac medium. CC BY 4.0 cho phép thương mại với ghi công/liên kết/ghi thay đổi; không hàm ý endorsement hoặc bảo đảm các quyền ngoài license.

Model tải vào cache riêng, không đưa Git:
- ONNX 63.201.294 bytes, SHA256 ec7c89e2c85f4d1edc24b6120c18aaf1bda614f06b511567eb9c7c0de15e2dab.
- Config 4.860 bytes, SHA256 fafb9da1354ed4b77c31af228ed41fb41cd825c14cffa105454b25e6ae751ee0.
- MODEL_CARD 361 bytes, SHA256 302db8a930ffc2b1c2181db26deaf8272116eca2b08b8f80da6375b0a994af7b.

Căn cứ dùng giọng: preset được phát hành công khai trong model collection, dataset khai báo CC BY 4.0, không thu giọng/clone hoặc giả danh người cụ thể. Credits bàn giao ghi Piper / rhasspy piper-voices / VAIS-1000, license và thay đổi: chuyển script riêng thành giọng tổng hợp, điều chỉnh tốc độ/âm lượng. Không dùng giọng vivos (NC) hoặc 25hours_single (license không rõ).

## Sàng lọc: 14 tín hiệu chủ đề + 6 bài từ tìm kiếm

Khoảng quan sát 15:00–15:05 UTC+7. Đây là 20 ứng viên ở hai mức TOPIC/POST, không phải 20 bài đã xác minh viral. TOPIC chỉ là mục AI/trending trong UI https://www.threads.com/search, chưa coi tóm tắt sự kiện là sự thật. Các số K làm tròn và cửa sổ không rõ.

| ID | Mức | Chủ đề / số UI | Kết quả sàng lọc ban đầu |
|---|---|---|---|
| 01 | topic | Roadster, 17K bài | Chờ xác minh sự kiện và quyền video; không chọn |
| 02 | topic | Hoa Trong Ngõ, 1K | Phản ánh thương hiệu, cần điều tra/đối chiếu; không chọn |
| 03 | topic | Fan booth, 566 | Dự phòng chuyện nhẹ; chưa truy nguyên post |
| 04 | topic | NEON A2O LITE, 4K | Cần số liệu nguồn gốc và quyền nhạc; không chọn |
| 05 | topic | Cứu hộ cú lợn, 519 | Cần nguồn trạm cứu hộ, hình thương tích; chưa chọn |
| 06 | topic | Concert ATVNCG, 10K | Dự phòng; cần lịch chính chủ/quyền clip |
| 07 | topic | Quỳnh Anh, 867 | Liên quan tin nhắn riêng/cáo buộc, không chọn pilot nhẹ |
| 08 | topic | Hoa sữa, 10K | Chọn điều tra bài gốc và reply; có góc meme/bối cảnh |
| 09 | topic | Timofei, 196 | Cá nhân/người trẻ tuổi; không chọn |
| 10 | topic | BIGBANG pop-up, 17K | Cần bằng chứng thực địa/quyền video; không chọn |
| 11 | topic | GrabFood/card, 7K | Cần điều kiện chương trình/quảng cáo; chưa chọn |
| 12 | topic | Dior Beauty, 5K | Tin sự kiện, chưa có góc riêng rõ |
| 13 | topic | Squishy, 10K | Dự phòng chuyện nhẹ, cần post gốc; chưa chọn |
| 14 | topic | CONGB/Mason, 638 | Hình tác giả khác, chưa có quyền/góc riêng |
| 15 | post | m_ctee2110, hỏi mùi hoa | Bài mới, thiếu tín hiệu lớn; không chọn |
| 16 | post | tamlinhsohocvietnam, thích hoa; 244 thích | Ý kiến cá nhân, không coi đại diện công chúng |
| 17 | post | socnaupham, thích hoa | Mới, ít số đo; không chọn |
| 18 | post | hoaduquang, thơ về hoa | Tác phẩm sáng tạo, không đọc lại/chép thơ |
| 19 | post | khanhdq70, tranh luận nơi ở; 1,6K thích | Dễ khuếch đại công kích vùng miền, không chọn |
| 20 | post | old.foxx, phản hồi tranh luận; 1 thích | Không chọn phản ứng cá nhân làm kết luận chung |

Các permalink post 15–20, đã đọc text và chỉ số khả dụng trong UI tìm kiếm:
- https://www.threads.com/@m_ctee2110/post/DejCVFVmtoI
- https://www.threads.com/@tamlinhsohocvietnam/post/DegfBAoIM35
- https://www.threads.com/@socnaupham/post/DejCRHllONG
- https://www.threads.com/@hoaduquang/post/DejCICTgRns
- https://www.threads.com/@khanhdq70/post/DehGXp1mM6G
- https://www.threads.com/@old.foxx/post/DejCGQAoHBH

Đối với các bài không chọn: không mở từng permalink/đọc toàn reply/chuẩn hóa timestamp, không công bố nội dung; không ghi giả là đã xác minh. Chọn sâu chuyện hoa sữa thay vì điều tra 20 chuyện không cần thiết.

## Chuyện được chọn và fact ledger

Nguồn S1: https://www.threads.com/@tc86_daily/post/DegzHSTAbxH . Tác giả tc86_daily; đăng 2026-10-15T10:58:51Z = 17:58:51 ngày 15/10 UTC+7; first_seen trong nghiên cứu trước khoảng 14:51 ngày 16/10. Lần kiểm tra phiên 1 khoảng 15:03: UI 6K thích, 300 replies, 201 reposts, 1K share. Screenshot kế tiếp thấy 301 replies; đây là thay đổi giữa hai quan sát, không tính velocity từ vài phút và số K.

Nguồn S2: https://www.threads.com/@tc86_daily/post/DehMH_ngQc3 . DOM time 2026-10-15T14:37:24Z = 21:37:24 ngày 15/10. Tác giả giải thích ảnh là meme. Đã kiểm tra lại reply còn hiện trong phiên 1. Screenshot cho thấy hình hàng cây có tán bọc trong túi; chỉ quan sát, chưa giám định công nghệ tạo ảnh hay vị trí ngoài đời.

F1: có bài hỏi về hoa sữa và hình cây bọc — S1. F2: người đăng làm rõ ảnh là meme — S2. Không khẳng định có chính sách bọc cây, không xác định ảnh chụp tại đâu hoặc do AI tạo. Không lặp lại nhận định sinh học trong reply khi chưa có nguồn chuyên môn.

I1 (góc riêng, phải ghi rõ): câu đùa có thể đánh trúng hai trải nghiệm khác nhau với mùi hoa; người hoài niệm và người thấy quá nồng có thể trải nghiệm khác nhau. Không tuyên bố thống kê bao nhiêu người nghĩ gì hoặc đưa hướng dẫn sức khỏe/cây xanh. I2: cần đọc thêm reply trước khi chia sẻ hình có vẻ như ảnh sự kiện.

Không có snapshot cách 60–120 phút trong phiên này; thời điểm bắt đầu viral vẫn chưa biết. Ngày đăng hôm trước và ngày thấy trong trending hôm nay được lưu riêng; video không nói bài mới đăng hôm nay.

## Quyền và nguồn bàn giao cho draft 01

- Lời dẫn/tóm tắt: viết mới, không đọc nguyên bài/câu đùa gốc; chỉ dựa vào diễn biến được kiểm tra. Chủ đề và sự kiện tác giả tự làm rõ được thuật lại có dẫn nguồn.
- Trích duy nhất 4 từ “Ảnh meme thôi bồ” từ S2 để trực tiếp bình luận cách hiểu ảnh. Hiển thị tên tác giả, ngày, link đầy đủ trong source/credits kèm draft. Căn cứ trích dẫn hợp lý để bình luận theo Điều 25(1)(đ) bản luật đã nghiên cứu; không thay thế nội dung nguồn, không làm sai ý. Đây là đánh giá nội bộ cho đoạn trích rất ngắn, không phải phép của tác giả hay kết luận tòa án.
- Không dùng ảnh gốc, screenshot, avatar, video, meme ảnh của người khác, âm nhạc hoặc gameplay; không xin phép/gửi tin. Toàn bộ hình minh họa vẽ bằng code, ghi MINH HỌA, không làm bằng chứng hiện trường.
- Font dự kiến DejaVu Sans từ hệ thống, license Bitstream Vera/DejaVu; kiểm tra file license và ghi trong credits. Không làm giả UI Threads; các card là sơ đồ kể chuyện riêng.
- Voice preset và license theo mục công cụ; credits kèm video/metadata. Không giả danh tác giả bài hoặc diễn viên.

Điểm đề xuất cho chuyện được chọn (quy tắc BA, không dự báo viral): liên quan 2, chú ý hiện tại 2, bối cảnh 2, góc riêng 2, hình/quyền/công sức 1 = 9/10. Điểm quyền chỉ dựa trên asset thực sự dùng như trên; ảnh gốc chưa có quyền và bị loại khỏi sản phẩm.

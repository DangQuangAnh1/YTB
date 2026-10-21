# P-2 — Chuyển thể hai người que: bản hình sơ bộ v1

User yêu cầu mở trình duyệt để xem tiếp clip. Ngày 22/10/2026, trình duyệt tích hợp đang kết nối đã phát được clip https://www.tiktok.com/@g.minhtrg/video/7665223745438485768; không còn CAPTCHA trong lần này. Inventory không có Chrome/Edge của user kết nối. Không đồng nhất trình duyệt tích hợp với hồ sơ Chrome/Edge cá nhân.

Thời lượng đọc từ video DOM: 15.277324 giây. Đã quan sát các khung hình, không phải kiểm liên tục từng frame. Tải video qua downloadMedia thất bại vì nguồn blob; pageAssets không có video xuất được. TikTok báo phụ đề không khả dụng/không nhận dạng được giọng nói. Công cụ quan sát không cung cấp audio nghe được cho model; chưa xác minh lời thoại hoặc cue âm.

## Phân vai chuyển thể

- A, mũ ngược: thay vai nam phía phải ở đầu clip.
- B, tóc rẽ ngôi và khăn đỏ: thay vai nữ phía trái ở đầu clip.
- Dùng spec duo-v3 A-092; giữ phụ kiện và tóc đã chốt. Bối cảnh lớp học tối giản: bảng phía phải, bàn phía trái, cửa sau. Chỉ hai nhân vật chính; bỏ người xem nền trong bản chuyển thể đề xuất.

## Bảng hình đề xuất — chưa chốt timing theo audio

Các khoảng dưới đây là phân bổ biên tập sơ bộ, không phải timecode bóc tách đã kiểm chứng. Hình gốc quan sát thấy hai người đối diện, có động tác tay gần đầu, chuyển động ra trái và nam nằm thấp/sàn gần cuối. Không suy ra nguyên văn cuộc cãi vã hoặc chính xác ai gây cú ngã từ khung hình mẫu.

| Khoảng dự kiến | Hình người que đề xuất | Trạng thái cần đối chiếu |
|---|---|---|
| 0–3s | Toàn cảnh dọc. B trái nhìn A phải, hai người đối diện. A mở miệng và giơ tay; B đáp bằng động tác tay. Chữ chủ đề phía trên nếu giữ packaging nguồn. | Thứ tự người nói và dấu nhấn chưa biết; không thêm thoại mới. |
| 3–7s | Giữ toàn cảnh. Phóng đại tay/đầu và động tác phòng thủ theo chuyển động gốc; mũ A và khăn B vẫn rõ. | Cần xem chuyển động liên tục để chốt tiếp xúc, số động tác và phản ứng. |
| 7–11s | Hai nhân vật chuyển về trái khung; camera giữ ổn định, để trống khoảng sàn và bảng phía phải. | Cần chốt đúng đường di chuyển và vai chủ động từ source file. |
| 11–15.277s | A ở tư thế thấp/nằm sàn, tay giơ, phản ứng hài. Giữ thời gian cho điểm kết thay vì thêm lời giải thích. B chỉ xuất hiện nếu khớp cảnh nguồn. | Đã thấy nam nằm sàn ở khung gần cuối; thời điểm bắt đầu ngã và frame kết chưa xác minh. |

## Audio và bước còn thiếu

Giữ nguyên track nguồn, tốc độ và giọng thu; không tạo giọng AI. Không ghi transcript do chưa nghe được. Chưa có tệp audio nên chưa thể bàn giao bản script khóa timing/lip-sync để render. Cần source media có thể truy cập hoặc file audio do user cung cấp. Tệp nguồn không đưa vào Git. Đây là bản hình sơ bộ dựa trên quan sát hạn chế, chưa phải bản clone hoàn chỉnh hoặc QA-pass.

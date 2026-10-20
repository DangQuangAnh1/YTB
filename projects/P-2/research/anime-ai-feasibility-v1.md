# P-2: Anime AI — đánh giá sơ bộ 20/10/2026

Nguồn yêu cầu trực tiếp: “nếu làm hoạt hình anime bằng AI thì sao”. Đây là yêu cầu đánh giá, chưa phải chọn format hoặc cho phép mua dịch vụ/render. Đầu vào P-2 revision 4, PROJECT.md và feasibility-v1.md.

## Kết luận
Có thể thử anime nhân vật gốc, ưu tiên hài đời thường với chuyển động giới hạn. Phân biệt ba mức: (1) tranh anime có chuyển động camera, đổi biểu cảm, miệng đơn giản, hiệu ứng — phù hợp khả năng dựng bằng code đã thấy; (2) ảnh thành clip ngắn có chuyển động sinh bởi AI — cần công cụ video riêng và kiểm tra chất lượng; (3) anime nhiều cảnh, đánh nhau, nhiều nhân vật liên tục — chưa có pipeline kiểm chứng, không nên cam kết sản xuất đều hoặc không tốn thêm.

Nguồn chính thức đã tra ngày 20/10/2026:
- https://help.runwayml.com/hc/en-us/articles/40042718905875-Creating-with-Gen-4-Image-References — ảnh tham chiếu để giữ đặc điểm nhân vật qua các ảnh; không chứng minh mọi frame video luôn nhất quán.
- https://help.runwayml.com/hc/en-us/articles/39789879462419-Gen-4-Video-Prompting-Guide — Gen-4 dùng ảnh + prompt, clip 5/10 giây. Đây là đặc tính của Gen-4, không khái quát mọi model hiện tại.
- https://www.adobe.com/cc-shared/assets/pdf/business/teams/resources/whitepapers-ebooks/sdk/firefly-video-guide.pdf — hướng dẫn từ ảnh sang video, liệt kê phong cách Anime. Chưa thử tài khoản, gói hay quota.
- https://github.com/Wan-Video/Wan2.2 — lựa chọn video chạy local để nghiên cứu tiếp; chưa kiểm tra GPU/VRAM, cài model hoặc chạy benchmark nên chưa kết luận khả thi tại máy.

## Khuyến nghị (suy luận kỹ thuật)
Pilot đề xuất 20–30 giây, 2 nhân vật gốc, 1 bối cảnh Việt Nam, 4–6 cảnh, có mở tình huống và câu chốt. Trước đó kiểm chứng 5–8 giây: cùng nhân vật qua 2 góc, một biểu cảm và một câu thoại Việt. Khóa mẫu tóc, trang phục, màu sắc và giọng trước khi làm cảnh. Dùng hình tạo riêng và dựng chuyển động giới hạn để kiểm soát chi phí; chỉ thử sinh video khi cần và trong quyền sử dụng/quota được xác minh.

Ví dụ premise để người dùng hình dung, không phải script được duyệt: hai bạn cùng phòng, một người tuyên bố tiết kiệm nhưng liên tục nhận đơn giao hàng. Anime chibi/hài biểu cảm phù hợp hơn cảnh hành động ở giai đoạn kiểm chứng.

Rủi ro chất lượng cần test thực: đổi mặt/trang phục giữa cảnh, tay/đạo cụ bất thường, khẩu hình tiếng Việt, thời điểm biểu cảm và câu chốt, số lần phải tạo lại. Chưa đo thời gian hoặc chi phí trên mỗi Short. Các nguồn vendor là mô tả năng lực, không thay thế benchmark tại máy. Không kết luận anime đang hot hoặc hiệu quả hơn format khác.

Ngân sách tăng 0 vẫn là giới hạn hiện hành; chưa có bằng chứng làm video sinh AI đều đặn miễn phí. Chưa tạo ảnh, clip hoặc dùng dịch vụ trả phí. Bước tiếp nếu người dùng chọn hướng: PM lập plan kiểm chứng anime chuyển động giới hạn, Content xác định nhân vật/storyboard, Production thử đoạn ngắn rồi QA trước khi mở rộng.

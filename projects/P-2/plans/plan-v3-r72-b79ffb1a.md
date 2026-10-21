# P-2 — Plan v3: chuyển hướng sang video người que

## Quyết định của người dùng
Nguồn: tin nhắn trực tiếp trong cuộc trò chuyện PM ngày 2026-10-22 (Asia/Saigon), không có message ID được cung cấp.
Trích nguyên văn: “Uk, P-2 đó, đổi nhiệm vụ task xem sao, làm các viêo liên quan tới người que”.
Người dùng yêu cầu đổi hướng P-2 sang video người que. Các chi tiết thể loại, người xem, độ dài và số video chưa chốt. Đây là phạm vi intake/khảo sát cho hướng mới, chưa phải duyệt một kịch bản cụ thể.

## Mục tiêu hiện hành
Phát triển hướng video người que tự sản xuất cho P-2. Tạm gác việc cải thiện bộ chuyển video nấu ăn sang anime. Giữ nguyên các bản thử và nguồn cũ làm lịch sử; các vấn đề QA cũ không phải điều kiện chặn khảo sát hướng mới.
PROJECT.md và goal trong STATE còn mô tả khởi tạo; kế hoạch v3 và checkpoint chuyển hướng ghi rõ mục tiêu hiện hành. CLI hiện không có lệnh sửa goal.

## Nhiệm vụ tiếp theo
T-011 — BA: khảo sát và so sánh ba nhánh người que: hài đời thường, hành động, kể chuyện/giải thích. Đầu vào: yêu cầu người dùng phía trên và packet P-2 r71. Đầu ra: research/stick-figure-directions-v1.md, có ví dụ nguồn khi thực hiện khảo sát, phân biệt quan sát và giả thuyết; kiểm tra khả năng tự dựng bằng công cụ local. Không mặc định nhánh nào đã được chọn.
Tiêu chí: nêu cách kể chuyện, độ khó chuyển động, nhu cầu âm thanh, khả năng làm chuỗi và đề xuất một pilot nhỏ; ghi rõ những gì chưa kiểm chứng. Dừng về PM khi cần chọn thể loại hoặc thay đổi chi phí.
T-012 — Content: sau khi xác định nhánh, chuẩn bị một kịch bản và storyboard pilot để có bản cụ thể trước khi render.
T-013 — Production/Review: dựng và kiểm tra pilot theo phạm vi kịch bản được xác định; ghi rõ tự kiểm tra nếu cùng một chat.

## Giới hạn và quyền
Phạm vi ghi nhận ngay: đổi nhiệm vụ và nghiên cứu hướng người que. Chưa ghi quyền render cho kế hoạch mới dựa trên các quyết định anime cũ. Ưu tiên công cụ hiện có, không chi phí mới, không đăng hoặc tạo kênh. Không giao agent khác.

## Điểm cần làm rõ
Thể loại người que ưu tiên; đối tượng/ngôn ngữ; độ dài mong muốn. Câu hỏi thể loại đã gửi trực tiếp cho người dùng. Chưa có bằng chứng thị trường mới hoặc benchmark người que trong lần chuyển hướng này.

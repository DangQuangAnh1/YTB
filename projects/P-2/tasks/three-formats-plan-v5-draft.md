# P-2 — Plan v5: một dự án, ba dạng video người que

## Quyết định thực của người dùng
Nguồn: cuộc trò chuyện PM 2026-10-22 Asia/Saigon, không có message ID.
Sửa phạm vi: “Tách nó thành 3 dạng là đc”. Xác nhận và giao việc: “Đúng rồi, chỉnh lại theo hướng đó, phân việc cho 3 BA nghiên cứu 3 ngách từng chủ đề đi. Càng chi tiết càng tốt, bạn review kết quả xem có hài lòng ko rồi mới đưa cho tôi. Phân việc cho các dev tìm repo trên github cõ thể hỗ trợ làm viêo dạng này tương ứng”.

## Cấu trúc và mục tiêu
Chỉ P-2 là dự án hoạt động. Ba dạng: (1) hài đời thường, (2) hành động/đánh nhau, (3) kể chuyện/giải thích. P-2.1/.2/.3 là hồ sơ lịch sử đã bị thay thế, không giao việc mới hoặc dùng làm dự án độc lập. Không xóa lịch sử. Goal khởi tạo trong STATE/PROJECT còn là khảo sát Shorts, kế hoạch v5 xác định phạm vi hiện hành.

## Phân việc và đầu ra
T-013: ba BA độc lập theo nhánh; mỗi BA khảo sát 6–10 ngách nhỏ, đào sâu ba lựa chọn, dẫn nguồn sơ cấp, phân biệt dữ kiện/giả thuyết, khả năng series, 15 ý tưởng gốc ở mức nghiên cứu và ba brief pilot. Files research/stick-{comedy,action,explainer}-ba-v1.md.
T-014: ba nhiệm vụ dev theo nhánh (có thể chạy nối tiếp trên cùng ba worker do giới hạn slot). Tìm GitHub repo thật; đọc README/LICENSE/source và trạng thái maintenance, khả năng Windows/CPU/Intel Iris Xe, chức năng nào đã có và phần phải tự code; so sánh 5–8 ứng viên, shortlist 2–3, kết luận chọn/loại, đề xuất pipeline và smoke-test có thể lặp lại. Không cài tùy tiện hay chạy mã lạ. Files research/stick-{comedy,action,explainer}-dev-v1.md.
T-015: PM dùng creator-review đọc đủ sáu báo cáo, kiểm chứng nguồn trọng yếu và license, tìm phản chứng, yêu cầu phiên bản sửa nếu cần. PM tự tổng hợp nên phần tổng hợp là self_review; review worker artifacts có thể độc lập với worker. Không coi đọc trang là xem video. Chỉ trình báo cáo sau review; không giấu khoảng trống.

## Chấp nhận
Nghiên cứu có nguồn truy cập ngày kiểm tra; ưu tiên thực tế với máy hiện có; không hứa viral/ROI. Repo có license thực được dẫn, không đồng nhất license code với quyền media hoặc model. Chưa benchmark thì ghi chưa benchmark. Báo cáo tổng hợp có ưu tiên rõ cho từng dạng, repo tương ứng, giới hạn và bước thử tiếp.

## Quyền và giới hạn
User cho phép ba BA và các nhiệm vụ dev, PM review; không recursive delegation. Chỉ nghiên cứu, read-only repo inspection và hồ sơ điều phối. Không render production, đăng, tạo kênh, gọi paid provider hay automation. Ngôn ngữ Việt Nam là giả định để nghiên cứu, chưa phải quyết định audience cuối.

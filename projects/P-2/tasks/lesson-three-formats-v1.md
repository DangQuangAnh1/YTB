# P-2 — Bài học sửa cấu trúc dự án

- Status: project-only
- Origin: user sửa “Tách nó thành 3 dạng là đc”, sau đó xác nhận một P-2 và giao ba BA/dev ngày 2026-10-22.
- Evidence: plan v5 và decision tương ứng tại P-2; checkpoint-superseded-v1.json tại P-2.1/.2/.3.
- Expected / observed: người dùng muốn ba dạng nội dung trong cùng dự án; PM đã tạo ba hồ sơ độc lập và thay đổi CLI trước khi hiểu đúng mức tổ chức.
- Impact: cấu trúc dư thừa và làm rõ lại; không có sản phẩm hoặc nội dung bị mất.
- Change: chỉ P-2 hoạt động, ba nhánh comedy/action/explainer lưu research dưới P-2. Hồ sơ con giữ làm lịch sử, không giao việc. Tính năng CLI mã con vẫn giữ vì đã kiểm thử và không cần tiếp tục sửa kit để giải quyết scope hiện tại.
- Checks: checkpoint qua agency.py; không sửa STATE/HANDOFF thủ công. Nguồn sửa phạm vi ghi tại plan v5.
- Adoption: không yêu cầu người dùng chọn một trong ba nữa. BA/dev là nhiệm vụ theo dạng, không phải ba dự án mới.
- Undo: tạo kế hoạch mới nếu người dùng lại thay đổi cấu trúc; không chỉnh lịch sử đã đăng ký.
- Next: PM review sáu báo cáo BA/dev trước gửi bản tổng hợp; chưa render hoặc đăng.

# P-2 — Plan v7: hai nhân vật người que từ ảnh người dùng

Nguồn quyết định: tin nhắn trực tiếp user ngày2026-10-22 trong cuộc trò chuyện PM, đính kèm3ảnh. Trích: “bạn tạo người que dựa trên đặc điểm đó nhé. Ưu tiên giữ cái mũ và mái tóc thôi. 2 ảnh sau. Ưu tiên giữ cái khăn và mái tóc”. Không có message ID. Không suy danh tính, tính cách hay quan hệ giữa người trong ảnh.

Phạm vi: tạo hai mẫu vector cùng phong cách SVG pilot hài, không photoreal portrait. Mẫu A dựa ảnh1: mũ đội ngược kaki/olive, dây/khóa ngang và tóc đen hơi rối, mái rủ. Mẫu B kết hợp tham chiếu ảnh2–3: tóc tối màu ngang vai/ôm mặt, mái thưa, khăn len sáng màu quấn dày có đuôi. Khuôn mặt tối giản; giữ phụ kiện/tóc làm dấu hiệu nhận diện. Tên A/B là nhãn tạm, không tên người.

T-019 Content/Production: bản mô tả đặc điểm, reusable SVG head/body assets và character sheet có fullbody/3biểu cảm mỗi mẫu; export PNG xem trước và SVG transparent riêng. Dùng source code-native để ghép rig hiện có. Không sửa artifact pilot đã đăng ký. Không tự làm lại video, đăng/push ảnh hoặc dùng paid provider.
T-020 Review: self-review so ảnh đính kèm với output thật về mũ/tóc/khăn, độ đơn giản và khả năng giữ nhất quán. Kiểm SVG parse, PNG bounds/alpha, render thật. Mức giống người thật chỉ ở dấu hiệu thiết kế, chờ user đánh giá.

Privacy: ảnh gốc giữ ở attachment ngoài repo, không copy vào Git. Chỉ lưu đặc điểm thiết kế và asset vector dẫn xuất; không lưu nội dung điện thoại hoặc chữ chèn trên ảnh. Không commit/push mới nếu user chưa giao.

Quyền: write_content và render_draft trong phạm vi hai mẫu nêu trên, căn cứ yêu cầu trực tiếp. Ngôn ngữ chú thích Việt. Giữ ba dạng trong một P-2; các nhánh khác không triển khai trong task này.

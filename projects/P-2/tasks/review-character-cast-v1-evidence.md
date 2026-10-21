# Hai mẫu người que — self-review v1

Reviewer: root Content/Production/PM, self_review. Đã đối chiếu ba ảnh user hiển thị trong chat và xem output PNG thực: character-sheet.png1600x1200, live-components-check.png800x500. Không suy danh tính/tính cách/quan hệ người trong ảnh.

A giữ mũ đội ngược kaki/olive, dây chỉnh có khóa nhô trái, tóc đen có mái rối. Màu là diễn giải từ ảnh ánh đèn ấm, chưa phải mẫu màu chính xác. B kết hợp tóc tối mái thưa/ôm mặt của hai ảnh, khăn len xám sáng quấn cổ có đuôi; không copy screen điện thoại hay caption ảnh. Mặt được giản lược cùng style video, không hứa chân dung giống hoàn toàn. Tóc A cách điệu thành các lọn rõ để đọc ở size nhỏ; mức mềm/rối có thể sửa theo user.

Đã xem bố cục hai toàn thân và ba biểu cảm/mẫu; không thấy chữ bị cắt/chồng khăn sau chỉnh vị trí hàng expression. Tóc/phụ kiện giữ geometry chung khi đổi mặt. Live React components render thật, không chỉ ảnh static. Khăn được tách khỏi head để tránh quay cả đuôi khăn khi đầu nghiêng; chưa thử walk cycle hoặc scene video mới.

Technical:11SVG parse hợp lệ,2PNG riêng RGBA alpha0..255,content bbox nằm trongcanvas; không clipping. Rendering ban đầu thất bại vì ký tự & chưa XML-escape trong annotation; đã sửa escape text, parse tất cảSVG rồi render thành công. Source/outputs hashes ở technical-qa-v1.json. Không sửa registered pilot; không copy ảnhgốc vào Git; không commit/push mới.

Kết luận: đạt draft thiết kế để trình user xem đặc điểm mũ/tóc/khăn. Chưa có human acceptance cuối cho nhân vật series; chưa có turnaround/animation QA.

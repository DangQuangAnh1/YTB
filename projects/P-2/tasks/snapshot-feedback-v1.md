# P-2 — Snapshot theo yêu cầu commit/push

Nguồn quyết định user trong hội thoại hiện tại:

- Sau video hành động A-124: “Nhìn ko hay lắm nhỉ”. Ghi nhận bản hành động chưa đạt mong đợi sáng tạo của user; không coi các pass kỹ thuật là chấp nhận nội dung.
- Sau bản hài A-116, user nói “Okie tạm lướt qua cái này vậy” rồi chuyển nhánh. Bản hài được tạm gác, chưa ghi thành được user chốt hoặc bị từ chối rõ ràng.
- Yêu cầu hiện tại: “Thôi commit tạm và push đã”. Cho phép lưu snapshot nguồn, research, lockfile/cấu hình, quyết định và evidence của P-2 lên remote đã dùng. Không phải chỉ thị dựng thêm, phát hành video hoặc cài thêm công cụ.

Đề xuất PM trước đó: thu nhỏ thành3–5s một pha để sửa lực/nhịp/acting trước dựng dài. Đây vẫn là đề xuất của model, chưa có quyết định user triển khai. Không tự chuyển đề xuất thành nhiệm vụ mới.

Snapshot không chứa raw media, ảnh cá nhân, audio, video, node_modules hoặc binary installer. Các render và công cụ đã cài được giữ cục bộ theo đường dẫn/manifest đã ghi. Khi clone sang máy khác, cần khôi phục dependency/runtime và render lại; file media bị Git ignore không tự có trên GitHub. FullMotionCanvasexport/OpenToonzGUI/chất lượng nghe liên tục còn thiếu kiểm như đã ghi.

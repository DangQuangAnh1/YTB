# Shinkai37 — video 10 giây, self_review

Nguồn yêu cầu 21/10/2026: “vậy cái nào tốt nhất, bạn tự đáh giá rồi thử render video 10s xem”. Plan v2, tăng chi 0, không upload/đăng. Clip test riêng tư ec15pSXc2Qg 148–158s, chưa có quyền phát hành; model AnimeGANv3 noncommercial.

## Chọn model
Từ so sánh 5 frame (`artifacts/render/framewise-compare-v1/qa-framewise-v1.md`): **shinkai37** có nét viền và màu gần anime nhất, da sáng hơn Hayao; wbc mượt và phẳng hơn nhưng xám, ít nét; dctbg bạc màu. Đây là đánh giá của BA/Review trong chat, không phải lựa chọn sáng tạo của người dùng.

## Đã chạy
- `tasks/render-framewise-video-v1.py --model shinkai37 --start 148 --duration 10 --threads 4`, đọc thẳng `media/cooking-pilot-v1/source-video.mp4` từ frame 3700, 250 frame 640×360 25fps. Seek đã kiểm: 3 frame đầu khớp `input-4s.mp4` (sai khác ~1,1/255, nhiễu re-encode).
- Chọn 148–158s vì nằm trọn một cảnh (cắt cảnh ở 146,68s và 160,48s), có cả đoạn có phụ đề và không phụ đề.
- 202,5s cho 250 frame; median 0,78s/frame, p95 0,89s (4 thread, ORT CPU). Không âm thanh như nguồn test.
- `anime.mp4` và `comparison.mp4` (nguồn | anime) decode pass, hash trong manifest.

## Kiểm tra
- **Phụ đề:** dò từng frame, có box ở frame 0–117 (148,0–152,7s), từ 118 nguồn tắt hẳn phụ đề. Crop frame 114–120: chữ dán lại rõ, frame 118+ không còn chữ nhòe hay mảng xanh sót. Passed.
- **Hình học (6 frame mẫu 0/50/100/150/200/249 trong contact.jpg):** tay, dao, khối đậu, thớt, nồi đúng vị trí; vết cắt trên đậu giữ đúng. Passed trên ảnh mẫu.
- **Nhấp nháy nền tĩnh:** trên pixel nguồn gần như đứng yên (<2/255), sai khác frame liên tiếp của output trung bình 0,30/255 (p95 0,54) so với nguồn 0,07 trước encode; sau decode H.264 đo trên frame 120–249: chỉ 0,01% pixel tĩnh có mức thay đổi >2/255. Nền, nồi, thớt ổn định; heatmap chỉ sáng mờ quanh mép thớt và vùng tay.
- **Vùng tay chuyển động:** xem 4 frame liên tiếp 180–183, mảng sáng/tối kiểu posterize trên mu bàn tay đổi hình theo từng frame trong khi nguồn chỉ dịch nhẹ. Khả năng cao sẽ thấy “sôi” nhẹ trên tay khi phát. Chỉ số nền tĩnh không đo được lỗi này.
- **Playback liên tục:** chưa xem bằng mắt; chỉ đánh giá qua frame mẫu, frame liên tiếp và chỉ số. Người dùng cần xem video để kết luận.

## Verdict
self_review: kỹ thuật passed (250 frame, decode, phụ đề, hình học mẫu). Nền ổn định hơn dự kiến cho model từng frame. Rủi ro còn lại: tay “sôi” nhẹ, chất anime vẫn là tranh nền Shinkai chứ chưa phải cel shading. Chưa chấp nhận chất lượng cuối; chưa có quyền phát hành footage.

## Tiếp theo đề xuất
Nếu tay sôi thấy rõ khi xem: thử lọc temporal theo flow có mask chỉ cho vùng tay (nhóm 2 trong `research/repo-scan-after-animegan-v1.md`), hoặc render wbc cùng đoạn để so độ ổn định.

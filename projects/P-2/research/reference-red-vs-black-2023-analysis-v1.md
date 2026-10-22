# Phân tích video tham chiếu "Red vs Black 2023" (MicroMist) và mức đạt của pipeline P-2

Ngày phân tích: 22/10/2026. Video công khai trên kênh Hyun's Dojo Community, link do người dùng đưa. Chỉ để học cấu trúc và độ khó; **không tái dùng hình, âm thanh hay nhân vật của tác giả**. File tải về nằm ở `projects/P-2/media/reference-RvB2023/` (bị Git ignore, không đưa vào repo). Mọi nhận xét hình ảnh dựa trên khoảng 120 khung hình lấy mẫu, chưa xem phát liên tục; phần trăm bên dưới là **ước tính chủ quan của mình**, không phải số đo.

## Số đo từ `scripts/analyze-video.py`

| Chỉ số | Giá trị |
|---|---|
| Thông số | 1280×720, 24 fps, 4 phút 51 giây (291,28s), AV1 + Opus |
| Cắt cảnh | 145 lần; trung bình 1,99s mỗi shot, trung vị 0,9s, ngắn nhất 0,04s, dài nhất 22,8s |
| Chuyển động | trung bình 10,9 (thang 0–255 trên khung 160×90); 59 giây bận, 95 giây tĩnh; 85 đỉnh chuyển động; khoảng 30 giây cuối gần như tĩnh (credits) |
| Chớp sáng | 107 lần nhảy độ sáng lớn |
| Âm thanh | 328 onset (1,13 mỗi giây); ước lượng BPM 197 (không đáng tin, có thể gấp đôi); 22 giây im lặng; tiếng to nhất ở giây 287–290 (kết) |
| Bảng màu | xám đậm và đen chiếm khoảng 63%, xám sáng/trắng khoảng 23%, đỏ khoảng 2,5% |

## Nhìn thấy gì (từ bảng khung hình)

Hoạt hình người que kiểu cảnh phim: nền xám phẳng với bóng đá núi, nhân vật đỏ, đen và trắng đơn sắc; cận cảnh cực đại (bàn tay khổng lồ, mặt che kín khung); tia năng lượng, sét, nổ, mảnh vỡ; cảnh vũ trụ có nền sao và tinh vân, hành tinh nổ; đòn đánh quy mô lớn, nhân vật bị biến dạng; có logo mở đầu, tiêu đề "RED vs BLACK 2023" ở khoảng giây 264, danh sách cảm ơn (credits), và một đoạn meme cuối.

## Chấm mức đạt (ước tính chủ quan, theo pipeline hiện tại)

| Yếu tố | Trọng số | Đạt | Điểm | Lý do |
|---|---|---|---|---|
| Nhân vật, phong cách phẳng | 15% | 80% | 12,0 | Đã có RED/BLUE, nét phẳng, màu đơn sắc |
| Độ đa dạng và phức tạp của võ thuật | 25% | 25% | 6,3 | Chỉ có một số clip mocap (đấm, đá, né, nhảy), không biến dạng, không đòn quy mô lớn |
| Góc máy và dựng (cắt nhanh, cận cảnh) | 15% | 45% | 6,8 | Có zoom, pan, rung, slow motion; chưa có cắt cảnh theo shot, whip pan, cận cảnh cực đại |
| Hiệu ứng năng lượng (tia, sét, nổ, mảnh vỡ) | 15% | 30% | 4,5 | Có tia va chạm, vòng sóng, bụi; chưa có tia, sét, mảnh vỡ |
| Bối cảnh (sa mạc, vũ trụ) | 10% | 40% | 4,0 | Chỉ có nền xám và sàn; thiếu nền đá núi, vũ trụ |
| Âm thanh và nhạc | 10% | 40% | 4,0 | Nhạc tự tổng hợp và SFX có lớp mẫu CC0; thiếu nhạc có bản quyền |
| Kịch bản, kịch tính 5 phút | 10% | 30% | 3,0 | Chưa có công cụ viết kịch bản dài và quản lý khoảng 145 shot |
| **Tổng** | 100% | | **khoảng 40%** | khoảng 35–45% là biên độ hợp lý |

## Điều gì kéo con số lên

Theo thiết kế đã đề xuất: kịch bản dạng dữ liệu kèm cắt shot và render từng cảnh; thư viện hiệu ứng (tia, sét, mảnh vỡ, nền vũ trụ bằng code hoặc ảnh CC0); thêm clip chuyển động (Blender cùng Quaternius); cận cảnh một chi khổng lồ làm bằng cách phóng to một chi; nhạc có bản quyền ghép ở CapCut/Canva. Với đủ các thứ đó ước tính lên khoảng 60–70%. Phần còn lại là tay nghề: biến dạng, tạo dáng từng khung, nhịp và độ "đã mắt" của một người làm hoạt hình lâu năm; pipeline này không tự có.

## Chi phí dựng thô

4:51 ở 24 fps là khoảng 7.000 khung; theo số đo GPU hiện tại (0,11s mỗi khung ở 1080×1920) khoảng 13 phút render, phần dựng 145 shot mới là chỗ tốn công.

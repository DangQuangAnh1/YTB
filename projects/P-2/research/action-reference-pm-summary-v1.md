# P-2 — Tổng hợp nghiên cứu hành động đơn giản hơn mẫu Jay_Thor

Ngày 22/10/2026, Asia/Bangkok. Phạm vi: nghiên cứu được user yêu cầu trong `action-reference-brief-v1.md`. Bốn vai dev và một BA làm các phạm vi riêng theo hai đợt; PM tổng hợp và tái chạy hai numeric smoke. Đây là nghiên cứu có tự kiểm kỹ thuật, không phải review phim độc lập hay quyết định duyệt sản xuất.

## Kết luận để ra quyết định

**Có cơ sở thử một đoạn hành động đơn giản hơn mẫu, chưa đủ bằng chứng hứa chất lượng ngang mẫu hoặc sản xuất tự động ổn định.** Phần nền/camera có thể giảm rất nhiều; chuyển động, nhịp và tiếp xúc vẫn cần thiết kế riêng. Không cần chuyển sang engine 3D hoặc model sinh video để kiểm câu hỏi hiện tại.

Mẫu user: [Idk what to say... #shorts — @Jay_Thor](https://www.youtube.com/shorts/zrV1Af3IJRs). PM đã quan sát screenshot ở nhiều thời điểm khi browser phát clip, gồm người que đỏ, vách đá/hành lang và tương tác cửa; duration video element 39.681s. Không có teardown từng frame, nghe liên tục, xác nhận tác giả gốc hoặc xác định phần mềm nguồn. Các worker dùng quan sát PM bàn giao và ghi rõ họ chưa playback. Không lấy footage/audio/nhân vật mẫu để sản xuất.

## Kết quả theo vai

| Vai | Repo/nguồn hữu ích | Kết luận có thể dùng | Phần còn thiếu |
|---|---|---|---|
| Dev nhân vật/nền/đạo cụ | stick-motion, Motion Canvas; Kenney chỉ tham khảo | Có starter gait/pose và primitives cảnh; giữ nhận diện duo-v3 thay vì đổi thành người que đỏ của nguồn | Upstream tay FK, rig P-2 hiện có tay IK; thay toàn bộ sẽ mất chức năng. Kenney chưa tải/import |
| Dev cảnh/camera/export | Remotion hiện có; Motion Canvas Camera; screen PixiJS/Godot/exporters | Một shot ngang, nền 2D ít lớp, toàn thân và điểm chạm trong khung đủ cho proof; camera mới/3D chưa cần thiết | Runtime Linux và full export hiện chưa chứng minh; license Remotion có điều kiện riêng |
| Dev cơ thể/tiếp xúc | stick-motion; Fullik dự phòng; rig P-2 hiện có | Tận dụng gait đều và solver upstream, giữ target tay hiện có nếu cần; chỉ bổ sung trạng thái thiếu | Giảm tốc, chuyển stance, grip acquire/hold/release và turn không được giải quyết chỉ bằng IK |
| Dev timing/FX/SFX | Remotion/Motion Canvas; Tween.js/Anime.js chỉ so sánh | Timeline, easing, audio và effect cơ bản đã có; cần beat và timing riêng từng pha | Không thư viện nào trong phạm vi kiểm tự tạo choreography hay. Uniform smoothstep là giả thuyết về nhịp đều, chưa phải chẩn đoán phim cũ |
| BA | Văn bản creator Gildedguy, Hyun, Simon’s Cat, Pencilmation | Ưu tiên một nhân vật + một chướng ngại; tiếp theo né/bắt một vật; đối kháng hai người để sau | Chưa có chứng cứ nhu cầu VN, retention, hiệu quả kiếm tiền, thời gian sản xuất hoặc tương đương chất lượng mẫu |

Từng role so sánh 4–5 ứng viên; có chồng lặp có chủ ý vì rig/timeline/renderer liên quan nhau. Không cộng lượt đánh giá thành số repo khác nhau hay coi năm báo cáo là năm lần kiểm phim độc lập.

## Reuse cụ thể và trạng thái thật

1. **Stick Motion**: shallow clone, pin `6315c09c4e5051267806988defa28279b965fe29`, giữ MIT LICENSE. Đã đọc starter và chạy nguyên hàm toán upstream; chưa cài làm skill có thẩm quyền, chưa browser playback/export hoặc tích hợp vào phim P-2. GSAP CDN đi kèm cần kiểm điều kiện riêng trước khi chọn runtime.
2. **Motion Canvas**: dùng checkout đã có, pin `7b91435c301d530351dcf5ebb91dd139c002e405`, MIT. Camera/flow/tween source đã đọc; không clone trùng. Package P-2 lock 3.17.2 không đồng nhất tự động với source HEAD. Bản build Windows cũ không chứng minh Linux export chạy được.
3. **Fullik**: shallow clone pin `3f22da98a0fa0051416b20077af5142aec3dfc2e`, giữ LICENSE và MIT notice trong bundle. Chạy solver bundle nguyên bản không cần npm install. Là nguồn dự phòng cho chuỗi dài/giới hạn khớp, không đưa mặc định vào stack hai xương đã đủ.
4. **Remotion P-2**: source composition và pipeline cũ là nền ít thay đổi nhất nếu điều kiện license phù hợp. Hiện chưa có kiểm runtime/export trên Linux. Không viết lại camera/âm thanh/rig tương đương chỉ để gắn nhãn reuse.

Canonical URLs, SHA và license hashes ở [catalog](../../../third_party/video/CATALOG.md); cách restore ở [RESTORE](../../../third_party/video/RESTORE.md). Thêm ignore sources/runtime/smoke để parent Git chỉ giữ tài liệu, không giữ embedded checkout/binary.

## Kiểm tra thực sự đã chạy

PM đã tái chạy cả hai script dưới đây; đều exit 0. Các kết quả là toán học, không phải kiểm thị giác:

- `node third_party/video/smoke/p2-action-assets-v1/math-smoke.cjs`: 257 cặp stance; sai lệch world X tối đa ~2.27e-13; IK reachable ~5.12e-14. Target ngoài tầm có sai lệch ~40.01 — clamp không thể được gọi là contact đạt.
- `node third_party/video/smoke/p2-action-contacts-v1/check.cjs`: 2.040 mẫu stance với root speed cố định khớp gait, world X drift ~5.68e-14; reachable IK ~6.07e-14; Fullik residual ~5.93e-6.
- Dev timing chạy Tween.js 25.0.0 explicit-time easing ở năm mốc, assertion midpoint/end pass. PM không tái chạy smoke này; đây không phải dependency được chọn hoặc đã tích hợp.
- PM xác nhận SHA nguồn, sạch Git status trong hai checkout ban đầu, hash license, và kiểm parent Git không liệt kê checkout/runtime/media. `git diff --check` pass tại thời điểm tổng hợp.

Không có kiểm chạy–phanh, grip, đổi hướng, full exporter hoặc continuous human playback trên phim mới. Các mẫu dùng tham số duty cho gait không được gọi là walk/run clip đã nhìn đẹp.

## Đề xuất bản đơn giản để kiểm tiếp

**Proof đề xuất: một nhân vật bước nhanh tới một thanh chắn thấp → chuẩn bị → nhảy qua → tiếp đất → quay đầu phản ứng, khoảng 5–8 giây.** Giữ cast đã chốt, một góc ngang cố định, một nền gốc đơn giản; không combo đối kháng, không chuyển bối cảnh, không cầm vật liên tục. Đây là phép thử chuyển động trước khi đầu tư một premise phim hoàn chỉnh; user chưa chọn triển khai proof.

Trước khi adapter: phát nguyên ví dụ gait/pose upstream và chứng minh exporter nhỏ nhất trên Linux. Sau đó chỉ sửa gap: stance/airborne/landing, timing từng pha và giữ silhouette cast. Nếu upstream chưa đáp ứng bước nhanh, giữ bước thường làm baseline; không tăng speed rồi tự gọi đó là chạy tốt.

Tiêu chí đề xuất: thấy rõ chuẩn bị/lấy đà/tiếp đất; chân trụ bám đúng khi cần; trọng tâm và hướng đi đọc được; phát tốc độ thật vẫn có lực; frame seek không làm thay đổi kết quả. Xem plain motion trước rồi mới thêm SFX/accent. User xem và nhận xét sáng tạo riêng; pass geometry/encode không được ghi thành đã hay.

BA còn đề xuất năm premise: vạch dừng quá gần, thùng lăn chặn lối, bóng bật ngược, mang khay qua thanh chắn, nhường đường ở lối hẹp. Chúng là phương án để chọn sau, chưa kiểm độc nhất toàn Internet hoặc được duyệt Content. Pilot 12–20 giây chỉ nên được cân nhắc sau proof và scope cụ thể.

## Giới hạn hồ sơ vận hành

`resume P-2` và đăng ký brief bằng `agency.py artifact ... --expected-revision 213` đều bị chặn bởi thiếu historical `artifacts/cooking-pilot-v1/anime-keyframe.png`. Vì vậy các báo cáo mới đang lưu ở research nhưng **chưa đăng ký artifact**. Không chỉnh STATE/HANDOFF, không giả lập acknowledgement mất dữ liệu và không bỏ kiểm hash. Hồ sơ baseline vẫn revision 213. Việc này không cản đọc và nghiên cứu nguồn; phục hồi hồ sơ cần xử lý riêng trước operational production mới.

## Báo cáo từng vai

- [Dev assets](action-reference-dev-assets-v1.md)
- [Dev camera/export](action-reference-dev-camera-v1.md)
- [Dev contacts](action-reference-dev-contacts-v1.md)
- [Dev timing/FX/SFX](action-reference-dev-timing-v1.md)
- [BA format đơn giản](action-reference-ba-simplified-v1.md)
- [Brief và nguồn chỉ thị user](action-reference-brief-v1.md)

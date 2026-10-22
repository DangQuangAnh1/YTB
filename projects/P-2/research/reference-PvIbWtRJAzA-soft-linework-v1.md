# P-2 — nét mềm theo reference PvIbWtRJAzA

Ngày kiểm:22/10/2026,Asia/Bangkok. Phạm vi: sau khi push code hiện tại, xem trực tiếp reference mới và tìm cách gần hơn. User chưa yêu cầu xuất bản hay dựng v3 trong lượt này. Code/records trước nghiên cứu đã commit và push thành công `8b4400e` lên origin/main trước khi mở link.

## Quan sát trực tiếp và giới hạn

[Reference user](https://www.youtube.com/shorts/PvIbWtRJAzA), uploader hiển thị @Jay_Thor; title “No wonder why bro was shocked that Green copied him 🤔 #alanbecker #shorts”. Browser video element:15.281s,1076×1920. Đây là clip có chữ/meme edit và các cảnh được cắt, không phải project animation gốc. Tag Alan Becker không xác nhận quyền sở hữu footage hoặc phần mềm dùng cho chính đoạn này.

Đã xem screenshot thực trong lúc phát và khi pause/seek, kèm thời gian đọc từ video element: khoảng1.08s,3.14s,8.14s,13.14s.1.08s có Yellow/Red, Red nghiêng thân;3.14s là cận Yellow do edit;8.14s Red với vật hình bánh trên đầu trong nền Minecraft;13.14s Red/Green, Red đưa tay lên gần đầu. Các tay/thân/chân ở các pose này có đường cong liền và đầu mút tròn, nhất là vòng tay quanh đầu; không lộ rõ hai thanh nối ở khuỷu/gối như bản P-2. Body line đi theo hình dáng tư thế, không chỉ một đoạn thẳng từ hông tới vai.

Đây là sampled visual inspection, không phải teardown toàn bộ frame, đo bone-length hoặc nghe liên tục. Không xác nhận FPS gốc, quy trình tác giả, thời gian lao động, original episode hay khả năng tái tạo ngang chất lượng. Crop tham khảo cục bộ ở media/reference-PvIbWtRJAzA bị Git ignore, không dùng làm asset phim mới.

## Vì sao v2 vẫn cứng — đối chiếu source

`production/black-red-duel-v2/Video.tsx` vẽ mỗi chi bằng M→L→L và thân bằng các đoạn thẳng. Round caps/joins chỉ làm tròn đầu/góc, không biến trung tuyến thành đường cong. Rig giới hạn chiều dài cố định có ích cho điểm chân/tay, nhưng đưa trực tiếp các thanh xương ra hình sẽ tạo silhouette kiểu mô hình khớp. GSAP hiện tween cả pose theo cùng từng khoảng; khác nhịp lấy đà/ra đòn chưa thay được hình dáng nét hoặc độ trễ riêng của ngực/đầu/tay.

Suy luận thiết kế, không khẳng định cách tác giả reference làm: cần tách **rig điều khiển** và **lớp nét hiển thị**. Chân/tay tiếp xúc vẫn có anchor; thân/chi vẽ bằng spline/Bézier hoặc silhouette có pose correction. Tại động tác lớn, author key pose và khoảng giữa riêng; cho hông/ngực/đầu phản ứng lệch nhịp có chủ đích. Một bộ lọc làm mượt hoặc thêm FPS không tự tạo diễn hoạt đúng. Không đoán phần trăm giống hoặc mức tự động hóa.

## Nguồn/công cụ đã kiểm

| Nguồn | Có thể tận dụng | Trạng thái/giới hạn |
|---|---|---|
| [Motion Canvas Spline](https://motioncanvas.io/docs/spline/) và [Bézier](https://motioncanvas.io/docs/bezier-curves/) | Curve đi qua control points; smoothness, explicit handles; có thể animate control points | Reuse local source pin7b91435c301d530351dcf5ebb91dd139c002e405. Đọc Spline.ts/CubicBezier.ts và docs; không cài/xuất scene mới. Không cần tự viết spline engine. |
| [Perfect Freehand](https://github.com/steveruizok/perfect-freehand) | Tạo outline tô kín từ điểm trung tuyến, có bề dày/pressure/caps; phù hợp lớp nét mềm | Đọc MIT/source, clone shallow/sparse pin176e00f2399f4969e1b0965c5921d96a3e50ce9f. Chạy original getStroke + README helper cho SVG. Không phải rig hoặc animation generator; smoothing ở đây chủ yếu xử lý stroke, không thay pose. |
| [OpenToonz Plastic](https://opentoonz.readthedocs.io/en/latest/create_animations_using_plastic_tool.html) | Mesh/skeleton uốn một drawing; kết hợp drawing keyframes/cutout | Primary docs đọc lại; source BSD3 có carveouts như nghiên cứu cũ. Máy Linux hiện chưa GUI-test. Hợp khi cần sửa drawing/mesh bằng animator, không tự tạo key poses. |
| [Synfig Advanced Outline](https://wiki.synfig.org/Advanced_Outline_Layer) | Spline và control bề dày độc lập, đầu nét và cusp | Chỉ docs screening, chưa clone/install/test. Tool khác không cần thêm vào stack chỉ để đổi tên renderer. |

Không khẳng định creator dùng bất cứ công cụ nào trong bảng. Dùng thuật ngữ của docs để chỉ khả năng công cụ, không suy công cụ từ hashtag. Không mua/cài provider trả phí hoặc lấy background/nhạc/nhân vật nguồn.

## Phép thử upstream thực sự đã chạy

`node projects/P-2/research/curve-stroke-proof-v1.cjs` dùng esbuild runtime hiện có để bundle source Perfect Freehand đúng pin, không sửa source. Script lấy nguyên helper getSvgPathFromStroke trong README và giữ MIT license trong output. Browser tại localhost:8768 thực thi getStroke trên5trung tuyến Bézier gốc (SVG native sampling), trả338outline points, tất cả finite. Hai panel gốc so đoạn gãy với đường cong tô kín; screenshot thực đã xem, nét cong ở tay/chân/thân nhìn được.

Đây chỉ là static technical research proof. Nó chưa gắn với phim v2, chưa kiểm contact sau khi vẽ curve, chưa có temporal stability, tweened silhouettes hoặc chứng minh giống reference. Đầu/gối trong panel không là bản sao của nhân vật nguồn. Output/runtime/source checkout/screenshot đều ignored. Script tái lập và catalog/restore có trong Git.

## Hướng đề xuất

Ưu tiên ít thay đổi: giữ Remotion xuất hình và GSAP timing; giữ stick-motion làm guide/contact khi có ích. Thay lớp M-L-L bằng curve/filled-stroke, có control points và thickness ổn định theo pose. Dùng Motion Canvas curve primitives nếu chọn authoring ở MC; với renderer React hiện tại, Perfect Freehand đã chứng minh phần outline chạy không cần engine mới. Chọn một route, không trộn cả hai chỉ để gọi nhiều repo.

Tiếp theo nên kiểm một tương tác original2–3s (xoay thân/né hoặc kéo tay) với khoảng3–5key poses, đường cong thân/chi và điểm tiếp xúc giữ rõ. Kiểm silhouette tĩnh trước, rồi playback và frame-to-frame contour; cho phép author pose correction thay vì bắt mọi hình tuân cứng hình thanh xương. Nếu làm bằng code vẫn không tạo được pose mong muốn, chuyển phần drawing/key pose sang OpenToonz/animator workflow thay vì tiếp tục thêm combo vào rig cũ. Đây là đề xuất nghiên cứu, chưa tạo phim v3.

Kết luận: khoảng cách quan trọng của P-2 là lớp tạo hình mềm và diễn hoạt theo pose. Repo hỗ trợ curve/stroke đã có; chưa có repo được kiểm nào biến rig hiện tại thành chất lượng reference một cách tự động. User cần xem chất lượng thực ở một đoạn ngắn trước khi dựng tiếp15s.

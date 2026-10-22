# "Người viết kịch bản" biết giới hạn của pipeline P-2 (đề xuất thiết kế, 22/10/2026)

Mục tiêu: một quy trình để AI viết kịch bản video người que mà **chỉ dùng được những gì pipeline thật sự làm được**, rồi biến kịch bản thành video. Đây là nghiên cứu và thiết kế. Chưa xây hay chạy gì. Nguồn ngoài là bản tóm tắt trang web (chưa chạy thử).

## 1. Đã có sẵn gì (ưu tiên tái dùng)

| Nguồn | Có gì | Dùng cho việc này |
|---|---|---|
| Repo này, P-1 | `lines.json` (kịch bản dạng dữ liệu), `lint-episode.mjs` (kiểm trước khi tốn công, thoát mã 1 nếu lỗi), PLAYBOOK từng bước, lệnh `/p1-video` | **Mô hình chính**: kịch bản là dữ liệu, có trình kiểm tra, có playbook và lệnh gọi |
| `.agents/skills/creator-content` + `contracts/render-script.schema.json` | Skill viết kịch bản; hợp đồng chỉ cho trình render "queue" ("chọn adapter phù hợp thay vì giả vờ") | Chỉ ra đúng nguyên tắc; hợp đồng queue không dùng được cho đánh nhau |
| [stickman-video-director](https://github.com/kaomei/stickman-video-director) (MIT) | Phase A đề cương dừng chờ duyệt rồi mới Phase B; hàng storyboard mỗi 10 giây có 3 nhịp (thiết lập 0–3s, leo thang 3–7s, cao trào 7–10s); đổi hình mỗi 2–3 giây; ít nhất 4 thiết bị hình ảnh; mỗi hàng ghi "cái gì được thừa hưởng"; đổi cài đặt toàn cục thì hủy duyệt cũ; bố cục 9:16 theo chiều sâu/dọc | Mượn **cấu trúc và nhịp**, không mượn phần Flow/Gemini (có chi phí ngoài) |
| [Editly](https://github.com/mifi/editly) (MIT, một người bảo trì) | Spec khai báo `clips[] → layers[]`, chuyển cảnh | Tham khảo hình dạng schema; không dùng để dựng vì ta có Remotion |
| SceneCraft MCP, immerschema | Mô hình Shot/Scene/Storyboard, schema cho đầu vào/ra LLM | Tham khảo; không có "catalog khả năng" nên không thay thế được |

Không tìm thấy công cụ có sẵn đúng kiểu "LLM chỉ chọn trong catalog khả năng, bị bắt lỗi rồi sửa lại". Phần này phải tự xây trên mô hình P-1.

## 2. Pipeline hiện làm được gì (từ số đo thật của final-counter-v1)

- **Nhân vật:** 2 người (RED, BLUE, BLUE là bản lật gương), cao khoảng 370 đơn vị; khung 1080×1920, 60 fps, 15 giây; render khoảng 98 giây trên GPU tích hợp.
- **Hành động từ mocap CMU:** chạy (1,23s, 816 đơn vị/giây), đấm tay phải từ thế bốc (3 cú, cách nhau 0,5s), đấm tay trái (cách 0,53s), cúi né (3s, hạ khoảng 80), đá vòng cầu (1,18s, vươn 120, cao ngang đầu), nhảy (1,6s, bay khoảng 0,5s, tiến 302), đi (275 đơn vị/giây), đứng.
- **Thủ tục (không có mocap):** phản lực khi trúng đòn, bay văng theo parabol rồi lăn, trượt, nằm; đỡ chéo tay (phía trước hoặc trên đầu); đá bổ trên không; ngả người né; tư thế giơ nắm đấm thắng.
- **Điểm chạm:** bộ giải tự đặt đòn đánh đến đúng khớp đối thủ (hiện có kiểu: đấm trúng thân, đá bị chắn, đấm sượt mặt).
- **Hiệu ứng, camera:** neon, vệt chuyển động, tia/vòng va chạm (đấm, chắn, đòn cuối), flash, rung hình, bụi, vệt tốc độ, slow motion theo đoạn, hit-stop 4 frame, zoom/pan theo keyframe, thanh máu, chữ pop-in, tối dần để nối vòng lặp.
- **Âm thanh:** gió vút, đấm, chắn, tiếp đất, trượt, tim đập, cú đòn cuối, nhạc 140 BPM 3 đoạn; tùy chọn lớp mẫu CC0.
- **Chưa làm được:** đòn ngoài clip đang có (quét chân, combo nhiều đòn), hơn 2 nhân vật, vũ khí và đạo cụ, nhân vật hay bối cảnh khác, góc máy 3D, lời thoại và phụ đề, nhiều kiểu va chạm hơn ba kiểu trên.

## 3. Thiết kế đề xuất: "Stick-Fight Director"

1. **Catalog khả năng `capabilities.json`.** Sinh từ dữ liệu clip và danh sách thủ tục, không viết tay: mỗi hành động có id, mô tả, thời lượng tối thiểu/tối đa, tầm với, kiểu va chạm hợp lệ (trúng, chắn, né, sượt), cặp đối thủ tương thích. Đây là thứ AI được phép dùng.
2. **Schema kịch bản trận `fight-script.schema.json`.** Dữ liệu: `meta` (khung, thời lượng, phong cách, hook, kết), `beats[]` mỗi beat có thời điểm, người ra đòn, hành động, mục tiêu, kết quả, camera, hiệu ứng, âm thanh, máu.
3. **Trình kiểm tra `lint-fight.mjs` (theo mẫu `lint-episode.mjs`).** Bắt lỗi trước khi render: hành động ngoài catalog, thời lượng bất khả thi, kết quả không hợp cặp đòn (ví dụ đấm trúng người đang cúi), quá nhiều beat trong một giây (khó đọc trên điện thoại), thiếu hook trong 1 giây đầu, vòng lặp không khớp, **độ giống các kịch bản trước** (để tránh bị xếp vào "nội dung theo mẫu" của YouTube). Lỗi trả dạng máy đọc được để AI tự sửa.
4. **Bộ biên dịch kịch bản → `fight.cjs`.** Hiện lịch đánh nhau nằm cứng trong code; cần sinh từ JSON. Đây là phần tốn công nhất.
5. **Skill và lệnh gọi `creator-fight-director` + PLAYBOOK + `/p2-fight`,** theo quy trình: đề cương (logline, vài lựa chọn bất ngờ, nhịp) dừng chờ bạn duyệt, rồi JSON kịch bản, rồi lint (tối đa vài vòng tự sửa), rồi xem trước độ phân giải thấp trên GPU, gửi bạn xem, rồi render đầy đủ và ghi artifact. AI viết, code kiểm tra.

Nguyên tắc: thứ ngoài catalog **không được giả vờ làm được**; AI ghi nó vào danh sách "đề xuất thêm clip" (ví dụ cần đòn quét chân thì thêm clip Quaternius).

## 4. Rủi ro và giới hạn

- Catalog nhỏ thì các video dễ giống nhau; cần mở rộng clip và thêm biến thể (nhân vật, màu, nền, ngoặt cốt truyện) trước khi đăng nhiều.
- Chất lượng kịch bản AI viết **chưa đo**; lint chỉ bảo đảm làm được, không bảo đảm hay.
- Bộ biên dịch (mục 4) là rủi ro lớn nhất về công sức; cần một bài kiểm tra vàng: dựng lại The Final Counter từ JSON, kết quả phải khớp bản hiện tại.
- Thể loại khác (hài, kể chuyện) cần catalog khác (đi, nói, cử chỉ).

## 5. Thứ tự làm đề xuất

1. **v1:** catalog tự sinh, schema, linter, và chuyển The Final Counter thành JSON. Đạt khi video dựng từ JSON khớp bản cũ và linter bắt đúng ba kịch bản xấu mẫu.
2. **v2:** skill, PLAYBOOK, lệnh `/p2-fight`, chế độ xem trước thấp, thử AI viết kịch bản mới qua vòng lint.
3. **v3:** mở rộng clip (Blender và Quaternius), thêm biến thể và thể loại khác.

Chưa làm bước nào, chờ bạn chọn.

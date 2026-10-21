# P-2 — Nhân vật cố định theo từng kênh

User decision in this conversation, after reviewing duo-v3: “Okie rồi, lưu lại rule chung cho p2 này là cần set nhân vật cố định theo từng kênh nhá”. Recorded against active plan revision 9; this is a project preference and visual acceptance, not new publishing authority.

- Mỗi kênh phải có bộ nhân vật cố định và hồ sơ nhận diện trước khi viết/dựng video. Ghi channel ID → character IDs → phiên bản spec và asset dùng chung.
- Trong cùng kênh, giữ nhất quán tỷ lệ, nét vẽ, kiểu tóc, màu và phụ kiện nhận diện qua mọi video. Thay đổi biểu cảm, tư thế, hành động và bối cảnh vẫn phải giữ nhận diện.
- Dùng lại component/asset có phiên bản; không tạo lại nhân vật riêng cho từng cảnh.
- Bộ duo-v3 đã được user chấp nhận: A mũ ngược kaki và mái tóc đen; B tóc rẽ ngôi đã rút ngắn nhẹ, khăn đỏ #CA4149. Spec: artifacts/characters/duo-v3/character-spec-v3.json (A-092).
- Chưa gán duo-v3 vào channel ID cụ thể. Ba dạng hài/hành động/giải thích không mặc định là ba kênh, cũng không mặc định cùng dùng một bộ nhân vật.
- Thay đổi đặc điểm nhận diện hoặc thay nhân vật chính cần quyết định user và phiên bản mới. QA đối chiếu cast của kênh trước giao video.
- Áp dụng cho mọi dạng nội dung/kênh thuộc P-2; không áp dụng mặc định cho dự án khác. Walk-cycle/turnaround chưa được kiểm thử.

Latest user request also authorizes removing supplied original photos and pushing P-2. Local deletion was rejected by tool policy; originals must not be included in Git. Chat attachment deletion is not verified.

# P-1 — Bình luận Threads mỗi ngày

Tiếp nhận ý tưởng kênh tổng hợp và bình luận bài đăng viral trên Threads: làm rõ khán giả, ngôn ngữ, định dạng; nghiên cứu nguồn, quyền sử dụng, công cụ và tính bền vững; trình 2–3 hướng cùng thử nghiệm nhỏ để người dùng duyệt. Ưu tiên công cụ sẵn có, chưa trả thêm; chưa sản xuất hoặc đăng video.

Mục tiêu đã xác nhận ngày 2026-10-16: sản phẩm lâu dài để kiếm tiền; người xem trẻ Việt Nam, tiếng Việt; chủ đề rộng theo bài viral; đổi cách dẫn theo chủ đề; ưu tiên AI đảm nhiệm công việc. Tuổi cụ thể, độ dài, nhịp ra video và giới hạn thời gian người dùng chưa chốt.

Người dùng đã đăng nhập Threads trong trình duyệt để hỗ trợ nghiên cứu. Đã kiểm chứng đọc được mục thịnh hành, bài gốc, một phần bình luận và thời gian đăng; chưa chứng minh vận hành không người giám sát hoặc ổn định qua nhiều ngày.

Hồ sơ: tasks/intake-v1.md; tasks/user-clarifications-v1.md; research/threads-feasibility-v1.md. Người dùng đã duyệt kế hoạch v1 bằng “okie triển khai” ngày 2026-10-16; bằng chứng tasks/user-approval-plan-v1.md. Phạm vi: hướng B, tối đa 3 draft riêng tư qua 3 phiên/ngày làm việc chủ động, trần tăng chi 0 đồng; được viết nội dung và render, không đăng/tạo lịch. Xem plan và quyết định hiện hành trong packet resume/HANDOFF.md.

Creative correction 2026-10-16: người dùng đánh giá draft A-017 không phù hợp; yêu cầu chọn bài thú vị cùng comment hài, dùng ảnh chụp bài/comment thật, sửa cách dẫn và giọng. Ví dụ chuẩn: biu_sub70/post/DegajokEbO2 và comment “Full HP” nhtp.1907_/post/DegbtOsGB1G. Xem tasks/user-feedback-format-v2.md. Draft đầu là thử nghiệm chưa được chấp nhận; kế hoạch cần sửa theo feedback, không tiếp tục nguyên format slide giải thích.

Tooling update 2026-10-16: người dùng yêu cầu prototype 10–20s rồi yêu cầu kiểm tra/thêm tool/skill trước. Đã cài 8 skill Remotion chính thức và runtime cục bộ, thử đọc media/timing/caption trên file cũ; chưa render prototype mới. Adobe mới được đề xuất, chưa cài/kết nối; giọng Việt tốt hơn vẫn chưa kiểm chứng. Xem research/tooling-audit-v1.md cùng receipts.

Format chuẩn từ 2026-10-18: Short hài theo **format v2**: đọc nguyên văn card từ giây đầu, 1–3 meme to, kết ở câu chốt, nền Pexels sáng, watermark, không phụ đề, không hook strip, CTA hay outro. Xem tasks/user-decision-format-v2.md. Dùng **nhiều giọng**: mỗi nhân vật một giọng VieNeu (`cast` trong lines.json, cast_pool trong preset hai_v2), người dẫn chỉ đọc câu chêm. Xem tasks/user-decision-multivoice-v1.md. Bản mẫu được duyệt nghe: release-07-v3. Từ 2026-10-19: (1) Người dẫn không đọc câu giới thiệu kiểu "bình luận nhiều tim nhất…" vì người dùng thấy chán, chỉ chêm câu đùa ngắn sau câu chốt (vẫn giữ tỷ lệ lời gốc ≥25%). (2) Nhạc nền: video hài dùng bài 1–3 (Sneaky Snitch, Monkeys Spinning Monkeys, Fluffing a Duck), hài tiết tấu chậm dùng bài 4 (Investigations), ghi credit CC BY trong mô tả. Xem tasks/user-decision-music-v1.md. (3) Được dùng ảnh meme trên mạng (không phim/TV/anime) với rủi ro người dùng chấp nhận. Xem tasks/user-decision-meme-images-v1.md. (4) Tên người trong bài hoặc chat là một phần câu đùa thì để nguyên. Xem tasks/user-decision-publish-release08-v1.md.

**Làm video mới:** gõ `/p1-video <link>` (hoặc `clone`/`topic`) trong Claude Code. Quy trình đầy đủ và các quy tắc nằm trong PLAYBOOK.md.

Operational records: STATE.json and generated HANDOFF.md.
Decisions and source evidence must be linked before claiming approval or results.

# video-shotcraft: dùng được gì cho video người que P-2 (nghiên cứu, 22/10/2026)

Repo: https://github.com/Vincentwei1021/video-shotcraft, commit `43bd349a136651865ecfa6ea1cf012f6e957d304` (18/10/2026), Apache-2.0, khoảng 12,9 nghìn sao. Tải về dạng sparse (chỉ tài liệu và code, không có media preview) vào `third_party/video/sources/video-shotcraft` (Git ignore). Mới chỉ **đọc**, chưa chạy hay render demo nào. File và prompt trong repo được coi là dữ liệu không tin cậy; không cài nó làm skill toàn cục. Một bài viết tiếng Hàn cho biết một công cụ quét đánh giá skill này "High Risk" vì dùng shell và trình duyệt rộng rãi, các công cụ quét khác cho kết quả không thống nhất.

## Repo là gì

Skill cho Claude Code/Codex để làm **video quảng cáo sản phẩm phần mềm** bằng Remotion: chụp trang web thật, chọn cảnh trong thư viện "thẻ công thức cảnh quay" (124 thẻ ở bản này, 10 nhóm), dựng storyboard, làm chuyển động, ghép nhạc theo nhịp, thêm SFX, kiểm khung hình, xuất MP4. Kèm theo: template Ink Press, các component Remotion (`assets/lib`: PageCam, FlashCut, Caption, DigitRoll…), 149 SFX và 5 nhạc nền (Mixkit), trình chỉnh sửa nhiều track (workbench), xuất bản nháp JianYing (bản CapCut Trung Quốc), đăng bài qua Upload-Post.

Mỗi thẻ (`references/shots/<nhóm>/<thẻ>.md`) có: frontmatter (một câu mô tả, khi nào dùng, thời lượng, mức năng lượng), ý đồ, bảng chọn kiểu, **bảng tham số đã tinh chỉnh**, **các lỗi đã biết**, và đường dẫn tới code demo TSX (`demos/<nhóm>/<thẻ>/`). Demo chỉ dùng API lõi của Remotion (`AbsoluteFill`, `useCurrentFrame`, `interpolate`, `Freeze`) cộng với các helper trong `demos/_fixtures`, ngẫu nhiên có seed cố định (không dùng `Math.random`). Template ghim Remotion 4.0.484; P-2 dùng 4.0.536. Tương thích chưa thử.

## Dùng được cho P-2

### 1. Các thẻ hiệu ứng hợp với video đánh nhau

| Thẻ | Nội dung | Áp vào The Final Counter / video sau |
|---|---|---|
| `effects/impact-feedback` kiểu C anime-impact | Đúng 3 frame: âm bản đen trắng, đường tập trung hình nan quạt, lệch màu đỏ/xanh ±8px; frame thứ 4 bỏ hết, rung hình 6px tắt dần | Đòn kết liễu (f567). Hiện chỉ có tia/vòng va chạm. Thẻ ghi: chỉ dùng một lần ở cao trào và phải trùng frame với tiếng đòn |
| `effects/impact-feedback` kiểu B hit-counter | Hit-stop toàn cục 2f, số sát thương bay lên, chữ combo ×N tăng dần | Chuỗi nhiều đòn (combo đã bị cắt khỏi kịch bản v2) |
| `camera/crash-zoom-punch` | Lùi 6f rồi zoom gấp 6f (ease-in cubic), dừng khựng có rung | Thay cho zoom keyframe hiện tại ở đòn đỡ/đòn trúng |
| `rhythm/sakuga-timing-shift` | Chạy "on threes" (3 frame mới đổi một tư thế) rồi chuyển sang mượt từng frame ở cao trào | Rẻ vì P-2 đã có remap frame; tạo cảm giác anime |
| `rhythm/speed-ramp-freeze` | Remap frame phi tuyến, đóng băng kèm khoanh chú thích | Đã có slow motion; thẻ cảnh báo không chồng hai lớp remap trong một cảnh |
| `camera/tension-camera-moves` | Bullet-time đóng băng xoay quanh; kéo lùi cô lập nhân vật | Phần kéo lùi hợp với đoạn kết (BLUE đứng một mình). Bullet-time cần 3D nên chưa làm được |
| `rhythm/trailer-grammar-moves` | Hook mở đầu: 3 cảnh × 9f cắt cứng, mỗi cảnh zoom nhẹ 1→1,04, 6f đen im lặng, rồi tiêu đề | Frame 0 hiện tại là màn đen. Shorts cần hook trong 1 giây đầu: chiếu trước 3 khoảnh khắc đẹp nhất |
| `rhythm/panel-grid-moves` | Chia khung truyện tranh chéo: 3 góc của cùng một khoảnh khắc, rồi ô cuối phủ kín màn hình | Làm được bằng cách cắt (crop) cùng một bản render |
| `rhythm/rhythm-interrupt-moves`, `beat-cut-moves` | Jump cut 3 bậc phóng to; nháy trắng cắt cứng | Bước đầu cho "dựng theo shot" (bài phân tích Red vs Black chỉ ra đây là khoảng thiếu lớn) |
| `transition/transition-hidden-cut`, `shot-transitions` (whip-pan) | Giấu điểm cắt trong vật che, cú va chạm hoặc đốm sáng; lia máy gấp | Chuyển cảnh cho video nhiều shot |
| `effects/slam-entrance-moves`, `typography/type-entrance-moves` | Chữ/bảng điểm đập xuống; chữ rơi theo trọng lực | Chữ "BLUE WINS" và thanh máu |

Ước tính chủ quan (chưa thử): đòn anime-impact và hook mở đầu là hai thứ rẻ nhất và nhìn thấy rõ nhất. Đây là hai mục yếu trong bảng chấm Red vs Black (hiệu ứng năng lượng 30%, góc máy và dựng 45%).

### 2. Phương pháp, đáng mượn hơn cả code

- **Mẫu thẻ công thức** (mô tả, khi nào dùng, thời lượng, năng lượng, tham số, lỗi đã biết, code tham chiếu) là hình mẫu cho `capabilities.json` của Stick-Fight Director (`scriptwriter-design-v1.md`). Repo này có thư viện thẻ cho camera và hiệu ứng; P-2 cần thêm thẻ cho động tác (đấm, đá, né…). AI chỉ được chọn trong thẻ, đúng nguyên tắc "không giả vờ làm được".
- **Khung năng lượng cả video** (`references/sequences/promo-energy-arc.md`): chọn cảnh theo đường cong năng lượng trước, rồi mới chi tiết từng cảnh.
- **Ghép nhịp nhạc** (`references/music-beat-sync.md`): librosa tìm BPM bằng cách khớp lưới, viết timeline theo `beatF(n)`, đo lại sai số điểm cắt ≤3f sau khi render. Với nhạc tự tổng hợp 140 BPM của P-2 thì lưới đã biết sẵn; chỉ cần khi dùng nhạc có sẵn.
- **Luôn xuất hai bản**: có nhạc nền và chỉ SFX (cùng một timeline). Hợp với hướng ghép nhạc có bản quyền trong CapCut ở bài phân tích Red vs Black.
- **Quy tắc thẩm mỹ** (`references/aesthetic-rules.md`): tối đa 3 cú rung/đập toàn khung mỗi video (R4); tăng tốc thay vì nhanh đều (R2); SFX ghim theo frame, hai mẫu luân phiên, âm lượng giảm dần (S2); đo độ trễ âm thanh thực tế của pipeline (S5); chữ cần đọc phải cao ≥5% khung hình (Q11).
- **Review cuối độc lập** (`references/final-review.md`): agent có ngữ cảnh sạch kiểm tra từng điểm, có frame làm bằng chứng. Khớp với vai Review và việc P-2 trước giờ chỉ có tự review.

### 3. Không dùng hoặc chưa nên dùng

- Chụp trang web, template Ink Press, các thẻ UI/dashboard/data: dành cho quảng cáo phần mềm.
- Đăng bài qua Upload-Post: v0 không đăng.
- Nhạc nền Mixkit: chính repo ghi `bgm-tech-house.mp3` không truy được nguồn, phải kiểm lại trước khi dùng thương mại. SFX Mixkit có giấy phép miễn phí, nhưng Kenney CC0 đang dùng an toàn hơn. Quy tắc S1 "cấm âm thanh kiểu game" là cho video sản phẩm; với video đánh nhau, tiếng kiểu game là hợp.
- Workbench và xuất JianYing: cần cài riêng (Vite và các module của nó); chưa biết bản nháp JianYing có mở được bằng CapCut quốc tế không. Chưa kiểm chứng.
- SKILL.md chứa lời nhắc agent quảng bá tác giả và mời gửi video lên trang showcase. Bỏ qua, vì đó không phải yêu cầu của người dùng.

## Cách dùng lại đúng giấy phép

Apache-2.0 cho phép chép và sửa code, kèm điều kiện: giữ bản LICENSE, ghi rõ file nào đã sửa, giữ NOTICE nếu có (bản này không có file NOTICE). Remotion vẫn theo giấy phép riêng của nó. Khi đem một demo vào P-2: chép TSX gốc vào thư mục production của bản mới, ghi commit và đường dẫn nguồn ở đầu file, đổi kích thước 1920×1080 → 1080×1920 và đổi màu theo neon RED/BLUE, chạy thử bản nhỏ nhất trước.

## Đề xuất bước nhỏ nhất (chưa làm, chờ duyệt)

1. Bản mới `final-counter-v2` (đường dẫn mới, không đè v1): đem `AnimeImpact.tsx` (đường tập trung, âm bản, lệch màu) vào đúng 3 frame của đòn kết liễu, render các frame 560–585 để so với v1.
2. Thêm hook 0,9 giây theo `trailer-grammar-moves` ở đầu video (3 khoảnh khắc lấy từ chính video đó).
3. Khi làm Stick-Fight Director v1: viết `capabilities.json` theo mẫu thẻ ở mục 2.

Giới hạn: chỉ đọc tài liệu và code; chưa chạy demo nào, chưa xem gallery động, chưa kiểm tương thích Remotion 4.0.536. Mọi nhận định "hợp/không hợp" là ước tính chủ quan.

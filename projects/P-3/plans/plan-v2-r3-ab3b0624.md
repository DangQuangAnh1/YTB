# Plan — P-3 / v2: Kênh tiếng Nhật qua hoạt động hằng ngày

## Mục tiêu và người xem
- **Mẫu tham chiếu:** kênh 누구나영어 (@nuguenaenglish, ~8,6N sub, 40 video, đăng ~5 năm trước). Mỗi video là 1 hoạt động đời thường (First Thing in the Morning, Brushing Your Teeth, Taking a Train...), tranh vẽ tay nhất quán, dài 2–8 phút. Video số 1 đạt ~143N view, video cuối ~3–9N: view dồn vào các bài đầu chuỗi, kiểu học theo thứ tự.
- **Người xem (người dùng đã chốt):** người Việt học tiếng Nhật N5–N4, chuẩn bị du học, thực tập sinh, kỹ sư sang Nhật. Không có giọng Việt; chỉ giọng Nhật kèm phụ đề tiếng Việt.
- **Lời hứa của kênh:** "Mỗi ngày 1 hoạt động, nói được tiếng Nhật về chính việc bạn đang làm", gồm câu ngắn ở thể ます, đọc chậm, có hình minh hoạ cho từng hành động.
- **Thành công ở giai đoạn này:** 1 pilot dài + 1 Short nháp riêng tư được người dùng duyệt format. View và doanh thu là kết quả thị trường sau này, không phải tiêu chí của plan.

## Bằng chứng và góc riêng
- Quan sát (từ ảnh chụp kênh người dùng gửi): 40 chủ đề theo trình tự 1 ngày, thumbnail nền trắng, 1 tranh và tên chủ đề to; các bài có view cao là thói quen buổi sáng.
- Suy luận, chưa kiểm chứng: format "1 hoạt động = 1 chuỗi câu mô tả" (dạng Total Physical Response) chuyển sang tiếng Nhật được, vì câu chia thể ます rất đều.
- **Góc riêng so với bản gốc:** (1) đặt bối cảnh **đời sống tại Nhật** như đi tàu bằng Suica, đổ rác phân loại, mua ở konbini, đi sento, đi xe đạp có đăng ký, đúng nhu cầu thực tế của người sắp sang Nhật; (2) mỗi câu có furigana, nghĩa tiếng Việt và 1 ghi chú ngữ pháp/từ vựng ngắn; (3) có Short 30–45 giây cắt từ mỗi video dài để kéo người xem mới; (4) liên kết chéo với app **Study Japanese** người dùng đang làm (`~/Atk/Jp`).
- **Không sao chép:** bản gốc dựa trên sách *English for Everyday Activities* (Zwier). Ta chỉ mượn ý tưởng format, tự viết câu và tự tạo hình, không dịch nguyên văn sách hay kênh.
- Chưa làm: chưa khảo sát đối thủ tiếng Nhật trên YouTube VN/quốc tế. Đây là task BA đầu tiên.

## Cấu trúc 1 video dài (đề xuất, 16:9, 3–6 phút)
1. Mở đầu 5 giây: tranh chủ đề, tên tiếng Nhật kèm tiếng Việt (vd. 「朝起きる」 – Thức dậy buổi sáng).
2. Phần học, 8–15 bước. Mỗi bước gồm tranh hành động, câu Nhật có kanji kèm furigana bằng hiragana, từ mượn viết katakana có chú thích, phụ đề nghĩa tiếng Việt bên dưới. **Romaji ẩn mặc định** (giả định của PM, người dùng chưa trả lời; đổi được sau pilot). Câu được đọc 2 lần: tốc độ thường rồi chậm. Từ khoá được tô màu.
3. Ôn lại: chạy lại toàn bộ câu liền mạch, chỉ hiện tiếng Nhật (luyện nghe/shadowing).
4. Kết: 3 từ vựng hoặc ngữ pháp đáng nhớ, gợi ý bài tiếp theo.
- **Short (9:16, 30–45 giây):** 4–6 bước đầu, đọc 1 lần, chữ to, CTA đi tới video dài.

## Danh sách chủ đề (bản nháp 40 bài, chia 4 mùa)
- **Mùa 1, Buổi sáng (1–10):** thức dậy, đánh răng, tắm vòi sen, rửa mặt/cạo râu/trang điểm, thay đồ, pha cà phê/trà, làm bữa sáng (cơm, canh miso, trứng), ăn sáng, dọn giường, ra khỏi nhà (khoá cửa, mang ô).
- **Mùa 2, Di chuyển (11–20):** đi bộ ra ga, đi tàu (Suica, đổi tàu), đi xe buýt, đi xe đạp, đi taxi, lái xe, đến công ty/trường, đi thang máy, hỏi đường, về nhà.
- **Mùa 3, Việc nhà và mua sắm (21–30):** mua đồ ở konbini, đi siêu thị, phân loại rác, giặt đồ, phơi đồ, dọn nhà, rửa bát, nấu cơm, nấu cà ri, làm salad.
- **Mùa 4, Buổi tối và đời sống (31–40):** ăn tối, tắm bồn (お風呂), đi sento, xem TV, dùng điện thoại, đọc sách, chăm thú cưng, gọi điện đặt lịch, đi khám bệnh, đi ngủ.
- Thứ tự cụ thể và độ khó (N5 trước, N4 sau) để Content chốt sau khi BA nghiên cứu.

## Phạm vi và công cụ
**Đã có hoặc tái dùng được (đã thấy trong repo, chưa chạy cho P-3):**
- Engine Remotion của P-1 (`projects/P-1/production/engine-v1`): timeline, render, master −14 LUFS, thumbnail, Whisper ASR để kiểm phát âm. Cần adapter riêng cho khung 16:9 và layout bài học, không sửa engine của P-1.
- App `~/Atk/Jp` đang dùng giọng Google 1 giọng Nhật, có công cụ `fetch-audio.py`.
- Máy này **không có GPU NVIDIA** và `ffmpeg` không có trên PATH, nên không chạy được model ảnh/video nặng ở máy.

**Các phương án cần test (chưa kiểm chứng):**
| Hạng mục | Phương án A (ưu tiên) | Phương án B | Rủi ro cần kiểm |
|---|---|---|---|
| Giọng Nhật | VOICEVOX (miễn phí, chạy CPU, nhiều giọng) | Kokoro-82M (giọng `jf_*`/`jm_*`), giọng Google như app | Điều khoản credit từng nhân vật VOICEVOX; ngữ điệu và độ tự nhiên; đọc đúng kanji (cần chú thích cách đọc) |
| Giọng Việt (lời dẫn) | **Không dùng** (người dùng đã chốt): chỉ giọng Nhật + phụ đề Việt | — | Phụ đề Việt phải đồng bộ thời gian, đọc được trên điện thoại |
| Tranh minh hoạ | Tạo ảnh AI theo 1 style sheet cố định (nhân vật chính, màu, nét), qua công cụ ảnh hiện có, ví dụ thử `generate_image` của Figma MCP | いらすとや (Irasutoya) | Nhân vật có giữ được nhất quán qua 10–15 cảnh không; quota/chi phí; Irasutoya giới hạn **≤20 hình/sản phẩm thương mại**, phải đọc lại điều khoản trước khi dùng |
| Chuyển động | Ken Burns, hiện chữ từng phần, highlight từ (Remotion) | Không dùng video AI | Không cần GPU |

**Ngoài phạm vi:** tạo kênh, đăng video, lịch tự động, dịch vụ trả phí (trần tăng chi 0 đồng cho tới khi người dùng duyệt), dịch nguyên văn sách gốc.

## Kiểm soát chất lượng tiếng Nhật
Người dùng không đọc được tiếng Nhật (theo `~/Atk/Jp/ke-hoach-nang-cap.md`), nên áp dụng lại cách review chéo đã chốt ở app:
- 1 agent viết, 1 agent khác soát độc lập: ngữ pháp, độ tự nhiên, cách đọc furigana, cấp độ JLPT.
- Dùng Whisper (tiếng Nhật) nghe lại audio TTS, so với câu gốc để bắt lỗi đọc sai kanji.
- Bắt buộc kiểm riêng: furigana/katakana đúng cách đọc, và phụ đề Việt khớp nghĩa câu Nhật. Ghi rõ "chưa có người bản ngữ kiểm"; khuyến nghị nhờ 1 người biết tiếng Nhật nghe pilot trước khi đăng công khai.

## Task và tiêu chí nghiệm thu
| # | Vai | Đầu ra | Kiểm tra | Quay về PM khi |
|---|---|---|---|---|
| T-1 | BA | `research/competitors-v1.md`: 5–10 kênh dạy tiếng Nhật theo chủ đề đời sống (VN + quốc tế), độ dài, view, khoảng trống | Có link và ngày xem, tách quan sát/suy luận | Đã có kênh VN làm y hệt |
| T-2 | BA/Production | `research/tooling-test-v1.md`: thử 2 giọng Nhật × 5 câu mẫu, 3 cảnh tranh cùng 1 nhân vật | Ghi file mẫu, ASR khớp, ảnh liên tiếp nhìn cùng nhân vật | Không có cách tạo tranh nhất quán mà không tốn tiền |
| T-3 | Content | Kịch bản pilot **#1 朝起きる (Thức dậy)**: 10–12 câu, furigana, nghĩa, ghi chú, storyboard cảnh | Review chéo AI đạt, câu ≤ N4 | Review chéo phát hiện lỗi chưa giải quyết |
| T-4 | Production | Adapter P-3 + video dài pilot (1920×1080) + Short (1080×1920) | Render decode OK, −14 LUFS, chữ đọc được trên điện thoại, ASR khớp ≥ ngưỡng | Engine cần sửa lớn |
| T-5 | Review | `artifacts/reviews/…` QA pilot | passed/failed/unverified có bằng chứng | Không đạt |
| T-6 | Launch (chỉ chuẩn bị) | Brand kit: tên kênh đề xuất, avatar, mẫu thumbnail kiểu nền trắng + tranh + chữ to | Người dùng chọn | — |

Sau pilot được duyệt: lập plan v2 cho sản xuất hàng loạt (nhịp đăng đề xuất 2 video dài/tuần + 1 Short/ngày, cần đo thời gian thật trên pilot trước khi cam kết).

## Quyết định của người dùng và phần còn mở
Đã chốt trong chat: (1) người xem là người Việt; (2) giọng Nhật + phụ đề Việt + hiragana/katakana, không giọng Việt; (3) thử tranh AI theo quota miễn phí, Irasutoya dự phòng; (4) đồng ý phạm vi research + write_content + render_draft, yêu cầu lên plan trước khi làm.
Còn mở: **romaji** (tạm ẩn), tên kênh/branding (T-6), nhịp đăng sau pilot.
Cần người dùng xác nhận plan v2 này rồi PM mới ghi decision và bắt đầu T-1/T-2.

Plan này là bản đề xuất có phiên bản. Bản thân nó không phải là phê duyệt.

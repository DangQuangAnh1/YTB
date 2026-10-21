# Plan — P-3 / v6: Kênh tiếng Nhật qua hoạt động hằng ngày

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

## Phân tích video mẫu (từ 229 khung hình người dùng cung cấp)
Nguồn: bộ khung hình của video "English for Everyday Activities 01 – First Thing in the Morning" (zip cất ở `media/reference/`, ngoài Git). **Chỉ có khung hình, không có âm thanh và không biết fps/độ dài thật**, nên mọi nhịp dưới đây tính bằng số khung hình tương đối, không phải giây.

Quan sát (đã xem trực tiếp contact sheet và dò tự động khung có chữ):
| Pha | Khung | Có gì |
|---|---|---|
| Mở đầu | 1–7 | Thẻ chữ trắng: tên phần ("Section 1. Starting the Day"), rồi tên bài ("1. First Thing in the Morning") |
| 1. Listen | 8–51 | Thẻ "Listen", sau đó 15 tranh nối nhau, **không có chữ**, mỗi tranh ~3 khung |
| 2. Listen & Read | 52–95 | Thẻ "Listen & Read", rồi lại 15 tranh, **mỗi tranh có đúng 1 câu chú thích bên dưới**, ~2–4 khung/câu |
| 3. Listen & Repeat | 96–174 | Thẻ "Listen & Repeat", 15 tranh + câu, **giữ lâu hơn** (~5 khung/câu) để người xem đọc theo |
| 4. Speak | 175–229 | Thẻ "Speak", 15 tranh **không chữ** để người xem tự nói lại |
- **1 hành động = 1 tranh = 1 câu.** Bài mẫu có 15 câu ghép thành một câu chuyện liền mạch về một nhân vật. 15 tranh dùng lại cả 4 pha, nên **mỗi video chỉ cần ~15 ảnh** chứ không phải 60.
- Một số tranh có nhãn chỉ vào đồ vật (toilet bowl, razor, shaving cream) ở các pha có chữ.
- Tranh dường như có chuyển động rất nhẹ (zoom/dịch chút giữa các khung liên tiếp); chưa xác nhận bằng video.
- Video gốc dài **~4 phút**. Người dùng gửi thêm **phụ đề có mốc thời gian** (31 dòng) nên có phần tiếng thật của mẫu (chỉ là chữ, chưa nghe giọng). Mốc thời gian khớp với số khung hình ở mức ~1 khung/giây (bằng chứng: pha Nghe 8–51 ≈ 0:11–0:54).
- **Cách mẫu dùng âm thanh (đo từ phụ đề):**
| Pha | Mốc | Cách đọc |
|---|---|---|
| Mở đầu | 0:00–0:11 | Đọc tên phần rồi tên bài (thẻ tên bài giữ ~7,5s) |
| 1. Nghe | 0:11–0:55 (44s) | **Đọc liền cả bài như một đoạn văn**, tốc độ thường, tranh không chữ (~2,9s/hành động) |
| 2. Nghe & đọc | 0:55–1:39 (44s) | **Đọc lại y hệt cả đoạn**, lần này tranh có câu chú thích; chữ đổi theo giọng đọc |
| 3. Nghe & lặp lại | 1:39–3:00 (81s) | **Đọc từng câu/mệnh đề riêng**, mỗi cái ~5–7s gồm cả khoảng lặng để người xem đọc theo (câu ngắn ~4,5s, câu dài ~7s) |
| 4. Nói | sau ~3:00 (~55s) | **Không có tiếng**, chỉ còn tranh để người xem tự nói |
- Nội dung đọc ở 3 pha là **cùng một văn bản**: chỉ khác cách cắt (cả đoạn → từng mệnh đề). Câu mở đầu ghép 2 ý ("Dan's alarm clock rings and he wakes up") ở pha 1–2 được tách làm 2 tranh/2 mệnh đề ở pha 3 và ở caption.
- Chưa biết: giọng đọc (người thật hay TTS), có nhạc nền không, tỉ lệ khung; phụ đề này chỉ là chữ, mốc cuối cùng có thể bị kéo dài.
- Chú ý bản quyền: dùng bộ khung hình này **chỉ để học cấu trúc/nhịp**. Không dùng lại tranh, câu hay chuyện "Dan" của bản gốc; câu và tranh của P-3 tự tạo.

## Cấu trúc 1 video dài của P-3 (bám 4 pha của mẫu, 16:9)
Mỗi video có một nhân vật làm 12–15 hành động liền nhau (1 tranh + 1 câu mỗi hành động), mục tiêu **~4 phút** như mẫu.
Nhịp đề xuất cho 15 hành động (điều chỉnh theo độ dài câu Nhật, chốt sau khi thử giọng ở T-2): mở đầu ~10s; **Nghe** ~45s (đọc liền cả bài); **Nghe & đọc** 50–60s (đọc lại cả bài, chậm hơn mẫu một chút vì có 4 lớp chữ); **Nghe & lặp lại** 80–90s (từng mệnh đề + khoảng lặng bằng ~1–1,5 lần độ dài câu, **máy tự chèn khoảng lặng bằng code**); **Nói** ~55s không tiếng. Tổng ≈ 4–4,5 phút.
0. **Mở đầu:** thẻ chữ tên phần và tên bài, tiếng Nhật + Việt (vd. 「第1部 一日のはじまり」 / 「1. 朝いちばん」).
1. **聞く (Nghe):** thẻ pha, rồi chạy các tranh **không chữ**, giọng Nhật **đọc liền cả bài** một lần ở tốc độ thường (ngữ điệu liền mạch như đọc đoạn văn).
2. **聞いて読む (Nghe & đọc):** giọng **đọc lại cả bài y hệt pha 1**; mỗi tranh hiện **câu Nhật có furigana, romaji, nghĩa Việt** bên dưới. Từ khoá được chỉ vào vật trên tranh bằng nhãn nhỏ (từ Nhật + hiragana/katakana + Việt), như "toilet bowl", "razor" trong mẫu.
3. **聞いて繰り返す (Nghe & lặp lại):** **đọc từng câu/mệnh đề riêng**, mỗi cái kèm khoảng lặng để người xem đọc theo; tranh và chữ giữ suốt cả câu và khoảng lặng.
4. **話す (Nói):** chỉ còn tranh không chữ, **không có tiếng** (~55s) để người xem tự nói; đáp án đã hiện ở pha 2–3.
- **Mỗi hành động đều phải có chữ ở pha 2 và 3** (theo yêu cầu của người dùng), và **có tiếng đọc ở pha 1–3** (pha 4 để im).
- **Short (9:16, 30–45 giây):** lấy 4–6 hành động đầu ở dạng pha 2.
- **Sản xuất tranh:** tạo 12–15 ảnh **không chữ** cho mỗi video (nhân vật cố định từ character sheet, chừa trống quanh nhân vật và 20% phía dưới). Toàn bộ chữ, nhãn và đường chỉ do code vẽ, vì công cụ ảnh hay sai chữ Nhật.

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
| T-2 | BA/Production | `research/tooling-test-v1.md`: thử 2 giọng Nhật, đọc **cả đoạn 15 câu liền mạch** (đo thời lượng, nghe có tự nhiên không) và **từng mệnh đề riêng** (đo độ dài để tính khoảng lặng), 3 cảnh tranh cùng 1 nhân vật | Ghi file mẫu, ASR khớp, ảnh liên tiếp nhìn cùng nhân vật | Không có cách tạo tranh nhất quán mà không tốn tiền |
| T-3 | Content | Kịch bản pilot **#1 朝起きる (Thức dậy)**: 12–15 câu (1 câu/hành động) viết thành **một đoạn văn liền mạch**, kèm cách cắt thành từng mệnh đề cho pha 3, furigana, romaji, nghĩa Việt, danh sách nhãn đồ vật, mô tả từng tranh (storyboard) cho 12–15 ảnh | Review chéo AI đạt, câu ≤ N4 | Review chéo phát hiện lỗi chưa giải quyết |
| T-4 | Production | Adapter P-3 dựng đủ 4 pha (Nghe / Nghe & đọc / Nghe & lặp lại / Nói) + video dài pilot (1920×1080) + Short (1080×1920) | Render decode OK, −14 LUFS, chữ đọc được trên điện thoại, ASR khớp ≥ ngưỡng | Engine cần sửa lớn |
| T-5 | Review | `artifacts/reviews/…` QA pilot | passed/failed/unverified có bằng chứng | Không đạt |
| T-6 | Launch (chỉ chuẩn bị) | Brand kit: tên kênh đề xuất, avatar, mẫu thumbnail kiểu nền trắng + tranh + chữ to | Người dùng chọn | — |

Sau pilot được duyệt: lập plan v2 cho sản xuất hàng loạt (nhịp đăng đề xuất 2 video dài/tuần + 1 Short/ngày, cần đo thời gian thật trên pilot trước khi cam kết).

## Quyết định của người dùng và phần còn mở
Đã chốt trong chat: (1) người xem là người Việt; (2) giọng Nhật + phụ đề Việt + hiragana/katakana, không giọng Việt; (3) hiện cả romaji; (4) thử tranh AI theo quota miễn phí, Irasutoya dự phòng; (5) cấu trúc 4 pha theo video mẫu, mỗi hành động một tranh một câu có chữ; (6) đồng ý phạm vi research + write_content + render_draft, yêu cầu lên plan trước khi làm.
Romaji: **hiển thị** (người dùng chốt ở lượt sau). Còn mở: tên kênh/branding (T-6), nhịp đăng sau pilot, giọng/nhạc nền của video mẫu.
Cần người dùng xác nhận plan v6 này rồi PM mới ghi decision và bắt đầu T-1/T-2.

Plan này là bản đề xuất có phiên bản. Bản thân nó không phải là phê duyệt.

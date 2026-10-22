# P-2 — BA: hành động người que đơn giản hơn mẫu Jay_Thor

Ngày nghiên cứu: 22/10/2026, Asia/Bangkok. Vai trò: BA, được user yêu cầu tách riêng để nghiên cứu. Phạm vi là quyết định format và thử nghiệm; các đoạn thử dưới đây là đề xuất, chưa phải quyền render hay chọn kênh. Không có paid calls, download media hoặc xuất bản.

## 1. Bối cảnh và câu hỏi

Đã chạy `python3 scripts/agency.py resume P-2`; lệnh thất bại vì thiếu `artifacts/cooking-pilot-v1/anime-keyframe.png`. Đã đọc PROJECT.md, HANDOFF.md revision 213, research/stick-action-ba-v1.md, research/stick-comedy-ba-v2.md, tasks/snapshot-feedback-v1.md và tasks/comedy-script-rules-v1.md. Không sửa STATE/HANDOFF hoặc né kiểm tra thiếu media. Quy tắc comedy chỉ là nguồn kinh nghiệm, không tự áp toàn bộ vào action.

User: “nghiên cứu đi, với mỗi thành phần tách ra 1 role dev để đi check các repo có thể hỗ trợ làm, tách ra 1 ba để nghiên cứu dạng research, có thể làm đơn giản hơn video kia”. Câu hỏi BA: giữ cảm giác hành động và nhân quả, giảm gì để có phép thử sáng tạo đáng tin hơn bản “Sàn mới lau” trước?

Dự án chưa chốt audience, thị trường, ngôn ngữ, tuổi và kênh. Không có bằng chứng đủ về nhu cầu VN, tốc độ tăng trưởng, retention hay tiềm năng monetization. Ưu tiên dưới đây theo độ gọn của phép thử, không là xếp hạng thị trường.

## 2. Mẫu user và trạng thái quan sát

Mẫu: https://www.youtube.com/shorts/zrV1Af3IJRs — parent báo đã quan sát browser: @Jay_Thor, tựa “Idk what to say...”, khoảng 39.68 giây, người que đỏ, khu vực vách đá/hành lang và cửa. Đây là quan sát do parent bàn giao, BA không tự playback hoặc xác minh từng timestamp. Web open của BA bị throttled. Không suy ra FPS, tool tác giả, đầy đủ cốt truyện, mức bạo lực hoặc số người làm từ các frame mẫu.

Suy luận dùng cho quyết định: một nhân vật di chuyển và tương tác môi trường có thể là trục hành động; không cần mặc định phải làm đấu tay đôi. Không copy nhân vật, địa hình, động tác nối tiếp hay diễn biến cửa của mẫu.

## 3. Bốn case primary đã đọc lại

Tất cả truy cập 22/10/2026. BA chỉ đọc văn bản creator/trang tác phẩm, chưa phát phim; không có teardown timing/frame của bất kỳ case nào.

| Case và nguồn | Dữ kiện thật đã đọc | Suy luận hữu ích có giới hạn |
|---|---|---|
| Gildedguy — [Working on…An Electric Animation](https://gildedguy.com/wip-electric-animation/) | Tác giả nêu thiết kế đơn giản giúp phân biệt nhân vật; tách mức chi tiết với chất lượng; mô tả FX có thể tái dùng và ưu tiên chuyển động so với cleanup nét. Bài còn ghi xin phép tác giả ca khúc. | Có thể giảm shading, màu và FX để tập trung động tác; không có bằng chứng rig/tween tự sinh được động tác đẹp. Bài không cấp phép tái sử dụng nhân vật, nhạc hay assets. |
| Hyun — [One vs Skid](https://www.newgrounds.com/portal/view/779450) | Trang tác giả nói một đứa trẻ chạy trốn bounty hunter phản ứng trong sợ hãi khi gặp nhân vật đang tìm câu trả lời; phân loại Action. | Động cơ trốn thoát có thể làm hành động có mục tiêu ngoài thắng trận. P-2 có thể giảm thành vượt vật cản, không cần lore hoặc nhiều đối thủ. Không kể lại choreography khi chưa xem. |
| Simon’s Cat — [official film summaries](https://simonscat.com/) | Trang liệt kê các mục tiêu cụ thể: vào nhà, thu hút chú ý, khám phá hộp, bắt ruồi, đối phó máy hút bụi. | Một mục tiêu nhìn hiểu được và một vật cản có thể nuôi nhiều premise. Đây là chuyển giao từ animation động vật, không phải bằng chứng thị trường stickman hay instruction chép gag. |
| Pencilmation — [Phoney Baloney](https://www.newgrounds.com/portal/view/707724) | Credit tách đạo diễn, animation, storyboard, viết, music, sound, compositing và coloring. | Hình ít nét vẫn có nhiều công đoạn. Phải đo công làm test thật, không suy “đơn giản” đồng nghĩa nhanh/rẻ. Không dùng views/UGC để hứa chất lượng hoặc suy audience. |

Bản nghiên cứu trước còn có nhiều case nhưng chưa playback; lần này thu hẹp thành bốn case để hỗ trợ đúng quyết định. Không coi bốn trang là mẫu đại diện hoặc survey.

## 4. Ba format đơn giản hơn — đều là đề xuất

| Phương án | Lời hứa cho người xem | Giới hạn đề xuất | Khó nhất / thứ giảm được |
|---|---|---|---|
| A. Vượt một chướng ngại | Xem nhân vật thử một cách, thất bại có nguyên nhân, đổi cách để vượt | Một actor, một bối cảnh nhìn ngang, một vật cản, một giải pháp | Khó: chạy/dừng/tiếp đất có trọng lượng. Giảm: không combat, không chuyển bối cảnh, không quay perspective, FX tối thiểu. Ưu tiên 1. |
| B. Né–bắt–giữ một vật | Nhân vật phải bảo vệ hoặc chộp được một vật qua một biến cố | Một actor, một đạo cụ, đường chuyển động rõ, một contact chính | Khó: tay–vật, điểm chạm, continuity. Giảm: không combo, không nhiều mục tiêu. Ưu tiên 2 nếu upstream hỗ trợ attachment tốt. |
| C. Một pha đối kháng có luật | Hai người tranh đường đi hoặc đổi thế qua một tương tác | Hai actor, một cảnh, tối đa một nhịp tấn công–né–phản ứng trong proof | Khó: timing hai cơ thể, khoảng cách/contact/reaction. Giảm: không nhiều đòn, không power-up, không crowd. Để sau A/B. |

Cả ba có thể ít thoại; đó là hướng thử, không claim hợp mọi audience. Tỷ lệ hài/action chưa chốt. Hài nên xuất phát hệ quả động tác, không dùng caption giải thích thay nhân quả. Không ưu tiên remake “Sàn mới lau” vì user đã không hài lòng; thay premise không đủ nếu diễn hoạt vẫn cùng lỗi.

## 5. Năm premise original để Content chọn sau

Đây là ý tưởng mới trong báo cáo, chưa kiểm độc nhất toàn Internet, chưa có script được duyệt.

1. **Vạch dừng quá gần:** A chạy tới một vạch đích sát mép tấm đệm. Phanh gấp làm đệm trượt; lần sau A bước lên đệm trước và dùng cú trượt để tới đúng vạch. Một actor, một đệm; phải nhìn rõ đệm dịch chuyển vì lực, không teleport.
2. **Thùng lăn chặn lối:** Một thùng tròn lăn tới; A định nhảy nhưng nó chậm lại ngay dưới chân. A đổi sang đặt một chân lên, giữ cân bằng rồi bước qua. Một actor, một vật; tập trung tiếp xúc và chuyển trọng tâm, không làm nhào lộn dài.
3. **Bóng nhỏ quay về:** A tung bóng nhẹ qua vật cản; bóng bật ngược làm A né rồi chộp lại bằng hai tay. Payoff là tư thế đắc ý khi bóng vẫn đang nảy trong tay. Một actor, một bóng, một contact lớn; không thêm giải thích vật lý thật.
4. **Mang khay qua thanh chắn:** A cúi người để qua thanh thấp nhưng khay trên tay mắc lại. A đổi tay, đưa khay qua trước rồi mới chui qua. Mục tiêu giữ khay ngay ngắn đọc bằng hình; không crowd/đánh nhau, dễ lộ chất lượng attachment.
5. **Đến trước nhờ nhường đường:** A và B cùng lách qua một khoảng hẹp, cản nhau. A lùi một bước, B lao qua quá đà; A bình tĩnh bước qua đúng chỗ. Hai actor, một squeeze, một recovery; cần tránh truyền tải bắt nạt hoặc sao chép routine mẫu.

Premise 1 thích hợp kiểm locomotion/stop nhưng có yếu tố surface tương tự nghiên cứu cũ; premise 2/4 cho phép kiểm chuyển trọng tâm/attachment ít FX hơn. Đề xuất ban đầu chọn 2 nếu rig có sẵn động tác bước lên vật, chọn 4 nếu upstream có hand-object constraint; không ép chọn chỉ dựa trên bản chữ.

## 6. Proof 5–8 giây và pilot 12–20 giây

**Đề xuất proof trước:** một actor + một thùng/đệm, góc ngang cố định, full body, ba nhịp approach → contact/đổi trọng tâm → settle/reaction. Không làm toàn bộ tiền truyện, title card, đổi cảnh hoặc nhạc. Dùng upstream clip/rig thật trước; chỉnh đủ một tương tác riêng. Dev xác định tương tác nào có nguồn tái sử dụng phù hợp rồi Content mới chốt beat. Chưa ước tính giờ công hay phần trăm tự động hóa.

Điều kiện xem xét proof:

- Phát tốc độ thật, cả mute và có tiếng; ghi rõ ai đã xem. Kiểm frame chỉ hỗ trợ, không thay playback.
- Chân trụ không trượt vô cớ; điểm tiếp đất có chuẩn bị và recovery; tay/vật không tách hoặc xuyên rõ.
- Người xem nội bộ diễn đạt được muốn làm gì, vật cản gì, vì sao đổi cách. Có thể thử 3–5 người như phát hiện lỗi, không quy đổi thành kết luận thị trường.
- Có một nhận xét sáng tạo trực tiếp từ user; pass kỹ thuật không được coi là “hay”. Ghi đúng lời người xem, không tự gán approval.
- Dev ghi bằng chứng integrated thật: upstream URL, SHA/version, asset license, example đã chạy, phạm vi chỉnh, output local, lỗi và checks còn thiếu. Feature list hoặc cài đặt thành công không đủ.

**Chỉ sau proof được chấp nhận mới đề xuất pilot 12–20 giây:** thiết lập mục tiêu → thử thất bại → đổi cách → kết quả/phản ứng. Một bối cảnh, tối đa hai actor, một đạo cụ trung tâm. Đây là khung lựa chọn, không phải user đã duyệt sản xuất. Cần script/storyboard cụ thể, scope quyết định và quyền render tương ứng. Thời lượng là hạn chế thử nghiệm nội bộ, không “thời lượng tối ưu Shorts”.

## 7. Handoff cho các dev component

- Rig/motion: chứng minh clip bước/chạy/dừng/đổi trọng tâm, không chỉ IK giữ chiều dài xương. Cho BA biết motion nào thật sự tái dùng được.
- Scene/camera: ưu tiên nền phẳng ít lớp và một shot nhìn ngang; không cần camera động để làm proof hấp dẫn.
- Contact/props: một object path hoặc physics được author chủ động; test parent/attachment/foot contact; engine physics không quyết định acting.
- Audio/FX/export: contact cue đúng frame, hai mức âm tương phản, effect tối thiểu; provenance từng âm/asset; xuất deterministic để sửa từng nhịp.

BA không thẩm định repo/license thay dev và chưa đo runtime máy. Kết luận nghiên cứu: thu nhỏ dàn cảnh và số tương tác là hướng kiểm chứng khả thi; chất lượng chuyển động, mức effort và audience vẫn chưa được chứng minh.

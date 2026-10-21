# P-2 — Ba dạng video người que: kết quả BA, dev và đánh giá PM

Ngày: 22/10/2026, Asia/Saigon. Phạm vi: một dự án P-2, gồm hài đời thường, hành động và kể chuyện/giải thích. Người dùng yêu cầu ba BA nghiên cứu và các dev tìm repo tương ứng, PM review trước giao. Ba worker làm BA rồi chuyển vai dev tuần tự theo nhánh; không phải sáu người độc lập đồng thời. PM khác người viết sáu báo cáo; bản tổng hợp này do PM tự kiểm tra.

## Quyết định được hỗ trợ

**Đủ cơ sở lập shortlist nội dung và công nghệ để thử nhỏ; chưa đủ để kết luận ngách nào thắng thị trường Việt Nam hoặc pipeline nào đã chạy tốt trên máy.** PM hài lòng với độ hữu dụng của bản nghiên cứu sau bổ sung, không dùng sự hài lòng thay audience test hay benchmark. Không chọn bỏ hai dạng còn lại. Thứ tự thử được đề nghị nhằm giảm công dựng nền tảng.

| Dạng | Ba ngách ưu tiên | Pilot đầu đề nghị | Hướng kỹ thuật đáng thử |
|---|---|---|---|
| Hài đời thường | Đời sống số; công sở; sống trọ/chia tài nguyên | Nút “để sau” làm việc tồn thành hộp đồ thật | Remotion SVG cho lần thử ít setup; Motion Canvas nếu preview/tween giúp sửa nhịp |
| Hành động | Đấu bằng một luật; ứng biến bằng đồ vật; bảo vệ mục tiêu | Sàn mới lau: thắng nhờ dùng luật trượt | Motion Canvas + rig tự làm/kiểm thử; Matter.js chỉ khi cần vật lý đạo cụ |
| Kể chuyện/giải thích | Hệ thống đời thường; công nghệ dễ nhầm; học tập | Hai quầy nhưng chỉ một máy làm đồ uống | Motion Canvas hoặc Remotion; ManimCE khi công thức/đồ thị trở thành trọng tâm |

Độ dài 20–60 giây, tiếng Việt, khung dọc và nhóm tuổi trong các brief đều là giả định nghiên cứu, chưa phải thông số người dùng chốt. Không có kịch bản cuối hoặc video đã dựng trong lượt này.

## 1. Hài đời thường

Chín ngách đã sàng lọc: đời sống số, công sở, sống trọ, đi học/làm nhóm, gia đình/gọi video, mua hàng/voucher, giao tiếp ngại ngùng, ăn uống/tập luyện nhẹ, di chuyển/xếp hàng. Ưu tiên ba ngách đầu vì mục tiêu và vật cản dễ cụ thể hóa, có thể dùng ít nhân vật và tài sản dùng lại. Đây là suy luận về thiết kế và công sức, không phải số liệu cầu.

**Đời sống số:** thông báo, tab, mật khẩu và việc “để sau” trở thành đồ vật tương tác được. Điểm mạnh là một nhân vật cũng đủ gây chuyện. Gag cần lựa chọn dẫn tới hệ quả rồi bất ngờ, không chỉ icon nảy trên caption. Có thể phát triển series theo cùng một thói quen, đổi cơ chế: vật chất hóa, quy tắc ngược, đổi vai. Rủi ro lớn: đề tài phổ thông dễ trùng và UI nhỏ khó đọc trên điện thoại.

**Công sở:** câu “sửa nhẹ” tạo tài liệu tăng cân, cuộc họp mọc rễ, deadline xuất hiện như người đang đợi ngoài cửa. Người que phải góp phần gây rắc rối để có tính cách; không chỉ than phiền về sếp. Bàn/ghế/laptop tái sử dụng được, nhưng ngồi, kéo và phản ứng vẫn cần pose tốt. Chưa có bằng chứng trực tiếp xác nhận công sở người que là ngách mạnh ở VN.

**Sống trọ/chia tài nguyên:** hai người cùng có lý nhưng muốn một ổ cắm, ngăn tủ hay luồng gió. Tài nguyên ở trung tâm giúp đọc nhanh. Rủi ro là khung dọc rối, nhiều tương tác tay-vật và một nhân vật bị đóng vai xấu cố định. Series nên thay người đúng/sai qua từng tập.

| Pilot đề xuất | Điều cần kiểm chứng | Tài sản/công khó |
|---|---|---|
| Để sau thành đồ thật, 25–30s giả định | Người xem hiểu luật mà ít lời; hệ quả có bất ngờ | Một rig, điện thoại, hộp đồ; pop/hold và tay chạm đúng |
| Họp 5 phút mọc rễ, 25–35s | Timing và phản ứng có đủ hài khi ít chuyển động | Hai rig ngồi, ghế/rễ, kéo và khoảng lặng |
| Chia gió, khoảng 25–35s | Luật chia tài nguyên có rõ và kết có công bằng | Hai rig, quạt, vạch chia, gió cách điệu |

BA v1 có 15 premise; [bản bổ sung v2](stick-comedy-ba-v2.md) sửa sức mạnh bằng chứng và liên kết về v1. Pencilmation có các trang tác phẩm đọc được credit nhiều công đoạn; không thể suy ít nét nghĩa là ít công. Simon’s Cat chỉ là benchmark chuyển giao về mục tiêu đời thường, không phải đối thủ người que trực tiếp. Nguồn kiểm lại: [Phoney Baloney](https://www.newgrounds.com/portal/view/707724), [lịch sử Simon’s Cat](https://simonscat.com/history). Chưa phát video nên không nhận đã phân tích từng shot hoặc timing của đối thủ.

## 2. Hành động

Chín ngách: một luật vật lý, võ thuật đồ vật, bảo vệ mục tiêu, parkour hành lang, duel một năng lực, một chống nhiều, boss nhiều giai đoạn, đấu theo nhạc, võ phái/vũ khí Việt có giải thích. Ba ngách đầu giảm crowd/FX và tạo điều kiện thắng đọc được; các ngách sau cần thêm công chuyển động, quyền nhạc hoặc chuyên môn.

**Đấu bằng một luật:** người xem thấy bất lợi, đoán cách thoát và nhìn nhân vật dùng chính luật để thắng. Chỉ một quy luật xuyên tập, không đổi ở cuối để cứu nhân vật. Nếu giả tưởng thì biểu thị là luật hư cấu; không gọi hoạt họa sai thành vật lý thật. Side view và ít góc máy giúp kiểm nguyên nhân–kết quả.

**Ứng biến bằng đồ vật:** ô che tầm nhìn, ghế tạo khoảng cách, dây thay điểm tựa. Điểm hay là công năng thay đổi có chủ ý. Điểm tốn công là tay cầm, quán tính, chuyển tay và recovery. Không cần một combo dài hoặc camera rung để làm có lực.

**Bảo vệ mục tiêu:** giữ chuông không rung, cây không đổ, nước không tràn. Mục tiêu quan trọng hơn thắng bằng knockout. Đường đi của vật phải liên tục; người xem luôn thấy trạng thái. Hài có thể ở payoff nhưng xung đột hành động phải là trục để khác nhánh hài.

| Pilot | Câu hỏi | Kiểm tra trọng yếu |
|---|---|---|
| Sàn mới lau, 20–30s giả định | Người xem hiểu luật trượt và cách đổi thế trận? | Phân biệt trượt có chủ đích với lỗi foot-lock |
| Ô không được rách, 25–35s | Ô có tạo chiến thuật thực sự? | Bàn tay bám cán, chuyển tay không teleport |
| Chuông không được rung, 20–30s | Điều kiện thất bại có tạo căng thẳng? | Contact, trigger và tiếng chuông thống nhất |

BA có 15 premise và tiêu chí chuyển động tại [báo cáo hành động](stick-action-ba-v1.md). Tiền lệ từ Gildedguy cho thấy tác giả chủ động giữ thiết kế/năng lực đơn giản, nhưng cũng ghi nhận nhiều tháng sản xuất và nhiều người làm cleanup/inbetween. Đây là phản chứng về công sức, không lấy lịch làm phim của họ để ước lượng pilot P-2. Nguồn PM kiểm lại: [bài production](https://gildedguy.com/gildedguy-vs-oxob-is-out-in-the-wild), [bài thiết kế](https://gildedguy.com/wip-electric-animation). [XOI GAME](https://xoigame.com/films/) là tiền lệ cung nội dung từ studio tự mô tả Made in Vietnam, chưa có bằng chứng về cầu hoặc performance.

## 3. Kể chuyện/giải thích

Chín ngách: hệ thống đời thường, công nghệ dễ nhầm, học tập/tự kiểm tra, câu đố xác suất, vật lý đồ vật, tiền bạc qua mô hình, lịch sử một quyết định, tâm lý giao tiếp, ngụ ngôn hiện đại. Hệ thống/công nghệ/học tập được ưu tiên vì có thể thu nhỏ thành một câu hỏi, một cơ chế và một câu kiểm tra hiểu. Người que phải thay đổi trạng thái hoặc ra quyết định; chỉ đứng cạnh chữ không tạo lợi thế.

**Hệ thống đời thường:** hàng đợi, nút thắt, việc phụ thuộc nhau. Cho dự đoán, chạy luật A, đổi một điều kiện rồi so kết quả. Counter phải lấy từ cùng event log với hình để không kể hai câu chuyện khác nhau. Ghi rõ mô hình minh họa; không kết luận xã hội từ một mô hình đồ chơi.

**Công nghệ dễ nhầm:** thông lượng khác độ trễ, lối tắt khác tệp gốc, hai người sửa chung tệp. Mỗi chủ đề phải quay về docs chính chủ trước khi viết claim. Ẩn dụ cần cả ánh xạ và giới hạn; không lấy số bảo mật trong comic cũ làm lời khuyên hiện hành.

**Học tập:** nhận ra khác tự nhớ, lịch học, thiết kế câu hỏi. Video có thể mời người xem dự đoán nhưng không gọi trải nghiệm đó là thí nghiệm chứng minh hiệu quả. Phần factual cần nghiên cứu gốc, không dùng trải nghiệm creator làm kết luận phổ quát.

| Pilot | Điều cần người xem hiểu | Khó khăn riêng |
|---|---|---|
| Hai quầy, một máy, 40–50s giả định | Công đoạn dùng chung mới là nút thắt trong mô hình | Nhiều token nhưng vẫn rõ trên màn dọc |
| Đường rộng mà tin muộn, 35–50s | Chở nhiều hơn khác đến nhanh hơn | Chỉ đổi một biến mỗi lần; giới hạn ẩn dụ |
| Nhìn quen nhưng che thì quên, 40–60s | Nhận ra khác tự truy xuất trong ví dụ | Nhịp chờ, card chữ và fact-check claim |

15 ý tưởng và fact-check workflow nằm trong [BA v1](stick-explainer-ba-v1.md); [BA v2](stick-explainer-ba-v2.md) bổ sung chứng cứ sau review. Nicky Case/xkcd giúp tham khảo cơ chế giải thích nhưng phần lớn là tương tác/comic dài, không phải bằng chứng thành tích Shorts. PM đã đọc [Trust](https://ncase.me/trust/words.html) và [Remember](https://ncase.me/remember/) để xác nhận giới hạn định dạng này.

## 4. Repo GitHub: dùng vào việc gì

Ba bảng dev có tổng 23 lượt đánh giá, 17 repo khác nhau trong các bảng; thêm repo examples được dẫn để kiểm tra caveat. Mức kiểm tra khác nhau: shortlist chính đã đọc README/LICENSE/source liên quan, các lựa chọn khác chủ yếu metadata/README và license theo phạm vi ghi trong báo cáo. Không gọi đó là audit toàn codebase hoặc dependency.

| Repo | Dạng phù hợp | Đã có gì | P-2 phải làm thêm | PM đánh giá |
|---|---|---|---|---|
| [Motion Canvas](https://github.com/motion-canvas/motion-canvas) | Cả ba; rõ lợi thế ở timeline/diagram | Library TS, vector, preview, timing | Rig, pose, grip, diễn xuất, dữ liệu cảnh, kiểm export | Nền tảng đáng thử dùng chung, chưa production-ready cho stick |
| [Remotion](https://github.com/remotion-dev/remotion) | Hài, explainer, đóng gói render | React/SVG/frame composition; package 4.0.536 có local | Rig/timeline authored, cue và layout; kiểm browser | Ít setup có thể là lợi thế; license riêng có điều kiện |
| [Matter.js](https://github.com/liabru/matter-js) | Hành động, đạo cụ rơi/va chạm | Rigid body physics | Choreography, trạng thái cầm/nhả, bake simulation | Helper tùy cảnh; không dùng như đạo diễn combat |
| [stick-motion](https://github.com/cafermutluozkan/stick-motion) | Hành động; rig tham khảo | FK/IK starter người que | Multi-character, tay/prop, contact và export | Có điều kiện: giới hạn reach; dependency audit còn thiếu |
| [Fullik](https://github.com/lo-th/fullik) | IK dự phòng | FABRIK solver | Adapter rig, thresholds và timeline | Không thêm nếu two-bone solver đủ |
| [Manim Community](https://github.com/ManimCommunity/manim) | Explainer mô hình/toán | Scene, hình học, text/diagram | Rig, cue, layout và model fact-check | Ưu tiên khi toán/đồ thị thực sự cần; phân biệt ManimGL |
| [manim-voiceover](https://github.com/ManimCommunity/manim-voiceover) | Explainer | Plugin voice cue | Chọn audio/provider phù hợp, kiểm sync | Plugin phụ, không tự gọi TTS/network |
| [Synfig](https://github.com/synfig/synfig) | Hài; hoạt họa thủ công | Editor vector/tween | Artwork, rig và pose authored | Phương án so công sửa tay khi code pose chậm |
| [OpenToonz](https://github.com/opentoonz/opentoonz) | Hành động thủ công | Editor, Plastic skeleton/mesh | Artwork, key pose và kiểm contact | Dự phòng khi có công diễn hoạt tay |
| [Pencil2D](https://github.com/pencil2d/pencil) | Pose/smear bổ trợ | Editor vẽ từng frame | Người vẽ và timing | Không phải giải pháp tự động hóa rig |
| [Motion Canvas exporters](https://github.com/motion-canvas/exporters) | Xuất video cho MC | Plugin FFmpeg | Pin version, kiểm codec/audio/binary | Phải thử tương thích, không nhầm với animator |

Các repo chưa chọn làm core: Wick vì khoảng trống setup Windows và push cũ; ManimGL vì tăng biến môi trường/API so với CE; Antonin/Manim vì ví dụ cũ/đường SVG tuyệt đối và provenance asset chưa rõ dù code MIT; hmelberg/stick và Stickman-animation-app vì chưa xác minh grant qua license file; stickman-video-director vì là thư viện prompt/style hướng công cụ ngoài chứ không local rig/renderer. Lý do và link ở các báo cáo dev, không kết luận mọi repo này vô dụng.

**Giấy phép:** MC/Matter/Manim và một số rig có license MIT cho code được bao phủ; không tự bao gồm font, SFX, model hay nhân vật mẫu. Remotion có license riêng; PM đã đọc file local 4.0.536 và pin GitHub, không tự xác định entity của user đủ điều kiện dùng thương mại. OpenToonz có phần BSD3 và carveout thư viện/brush. Không repo public nào mặc nhiên cho phép lấy toàn bộ asset. Nguồn: [Remotion license](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md), [MC license](https://github.com/motion-canvas/motion-canvas/blob/main/LICENSE), [OpenToonz license](https://github.com/opentoonz/opentoonz/blob/master/LICENSE.txt).

## 5. Điều PM đã kiểm, yêu cầu sửa và giữ chưa xác minh

PM đã đọc sáu báo cáo đầu và hai bản BA bổ sung; yêu cầu comedy thêm primary pages đọc thực, explainer phân biệt video benchmark và transfer interactive/comic. Đã mở lại một mẫu nguồn production/creator quan trọng, đọc metadata 10 repo qua API với SHA, đọc license pin của năm repo chủ chốt và kiểm source rig. Tại stick-motion starter có clamp khoảng cách trong solver và CDN GSAP3.12.5; vì vậy không nhận lời “chân luôn bám đúng mọi target” hoặc “toàn dependency đều MIT” mà không thử. Exporter manifest pin có Vite4 peer; tương thích phải kiểm, không đoán từ ngày push. [Manifest](https://github.com/motion-canvas/exporters/blob/f08e8e30d6bfb69da4b65d63c6acc3f209f98a4f/packages/ffmpeg/package.json).

| Câu hỏi review | Kết quả |
|---|---|
| Một dự án, ba dạng có được giữ đúng? | Có; hồ sơ con chỉ lịch sử, không còn nhiệm vụ mới |
| Nghiên cứu có đủ phân nhánh, premise và pilot để quyết định thử? | Có: 27 ngách, 45 ý tưởng, 9 brief; không phải 45 script đã viết |
| Repo có được map vào việc cụ thể? | Có; tách rig, timeline, physics, editor và exporter |
| Đã xử lý nguồn yếu ban đầu? | Có bổ sung và hạ phạm vi kết luận; không nâng snippet thành playback |
| Nhu cầu/ngách trống VN đã được chứng minh? | Chưa; dữ kiện còn thiếu và ghi công khai |
| Đã xem trực tiếp video để review motion/audio? | Chưa; không tuyên bố đã teardown video |
| Repo đã chạy được/nhanh/đẹp trên máy này? | Chưa install/render/benchmark; smoke tests chỉ là đề xuất |

## 6. Thứ tự thử được PM đề nghị

1. Kiểm một fixture 8–10 giây, một người que, một đạo cụ, dấu tiếng Việt và cue WAV local. Bắt đầu một engine; không ghép MC+Manim+Remotion chỉ để đủ bộ. Host đã kiểm i5-1145G7, RAM ~15.39GiB, Iris Xe, Node24.14, Remotion4.0.536; không giả định CUDA. FFmpeg chưa thấy trên PATH, chưa kết luận thiếu toàn máy.
2. Hài C1 là bài đầu hợp lý để kiểm rig tối thiểu và comedic hold. Explainer hai-quầy là bài thứ hai để kiểm model/counter/cue. Action sàn trượt kiểm thêm stance/contact; không mở đầu bằng crowd/boss nhiều phase.
3. Mỗi nhánh giữ một pilot riêng. Cổng kỹ thuật: render tái lập khi seek, xương/điểm cầm không sai, chữ Việt không mất dấu, cue âm lệch không quá một frame theo tiêu chí đề xuất, MP4 decode đúng. Cổng nội dung: tắt tiếng vẫn hiểu luật/mục tiêu, lời dẫn không nói vượt nguồn. Cổng người xem: thử nhỏ nếu có người tham gia; không coi 4/5 người nội bộ là thống kê thị trường.
4. Chỉ ước lượng lịch series sau khi đo công làm đoạn đầu và một vòng sửa thật. Các khoảng ngày công trong dev là giả thuyết, không cam kết. Chưa có quyền production cụ thể hoặc đăng mới từ báo cáo nghiên cứu này.

## Hồ sơ để đọc sâu

- Hài: [BA v1 — ngách/15 ý tưởng/pilot](stick-comedy-ba-v1.md), [BA v2 — evidence bổ sung](stick-comedy-ba-v2.md), [dev — 7 repo](stick-comedy-dev-v1.md).
- Hành động: [BA — ngách/15 ý tưởng/pilot](stick-action-ba-v1.md), [dev — 8 repo](stick-action-dev-v1.md).
- Giải thích: [BA v1 — ngách/15 ý tưởng/pilot](stick-explainer-ba-v1.md), [BA v2 — evidence bổ sung](stick-explainer-ba-v2.md), [dev — 8 repo](stick-explainer-dev-v1.md).
- Kiểm độc lập của PM: [host](stick-host-capabilities-pm-v1.md), [GitHub metadata](stick-repo-metadata-pm-v1.json), [license pin](stick-license-audit-pm-v1.json), findings vòng đầu ở tasks/review-stick-initial-findings-v1.md.

Kết luận nghiên cứu chỉ bao phủ cơ hội thiết kế và shortlist công cụ tại thời điểm kiểm tra. Không có dự báo viral, lợi nhuận, hiệu suất sản xuất hay bảo đảm quyền mọi asset.

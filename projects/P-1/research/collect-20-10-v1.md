# Collect: 20/10 comments and reply chains for one Short (2026-10-22, ~21:00–21:35 ICT)

Input: the posts in `research/scout-2026-10-22-20-10-v1.md`. Selection rules: PLAYBOOK.md step 1, the standing user decisions, and the used-handle list in the session scratchpad (`used_sources_2026-10-22.json`, `handles` key).

## 1. Method and coverage

- **Browser.** The user's logged-in Chrome (Claude-in-Chrome), one tab, strictly read-only. I only navigated, scrolled (`window.scrollBy`) and read. I never clicked like, reply, repost, follow or any other button. The tab is now closed.
- **Extraction.** A JS pass over `div[data-pressable-container="true"]` read the handle, the `<time datetime>`, the text, and the like and reply counts from the action-bar buttons. It also flagged attached media: any `<img>` whose alt does not start with "Ảnh đại diện", plus any `<video>`.
- **Output path.** The JS tool truncates output at about 1,000 characters. To get around this, the dumps went into a hidden local `<article>` that I read with `get_page_text`. This changed only the page's local DOM, never the server. During the final verbatim pass I also used a temporary `localStorage` key (`__collect`) on threads.com. I removed both before closing the tab.
- **Verbatim pass.** Every candidate in §3 was re-read raw, either from its own permalink or from the parent post page, with `?`, `=` and the original line breaks kept. In this file, **⏎ marks a line break in the original**.
- **Counts and dates.** Likes and replies are as shown at about 21:00–21:30 ICT. Dates are the UTC date from `datetime`, so a post made after 17:00 UTC shows as the previous ICT day.
- **Order.** Comments were read in the "Hàng đầu" (top) order. The counts below include inline replies and seller ads.

| # | Post | Comments read (approx.) | Usable? (my assessment) |
|---|---|---|---|
| 7 | @hamie.dreamy | ~140 of 773 | No. About 90% are shop ads (the OP pinned "post này thành cái chợ"). |
| 9 | @uyenxinhnhat | ~185 of 654 | Weak. Mostly earnest complaints about a florist, which is named in the replies (privacy/business). |
| 6 | @ishoujostyle_ | ~150 of 484 | No. Almost all shop ads. |
| 3 | @buicongnam0308 | ~140 of 472 | **Excluded: celebrity post.** The comments also only make sense with his video. |
| 5 | @phqlinnn | ~140 of 355 | **Yes.** It has the best standalone 20/10 complaint jokes. |
| 1 | @k_t_t_l00 | ~137 of 329, plus 3 chains | **Yes (alternate opening).** Top likes, but CCTV/crime risks (see §5). |
| 8 | @rianggg.205 | ~130 of 238, plus 8 chains | **Yes (recommended opening).** Text-only post with very bựa comments. |
| 10 | @hydrangea.15126 | ~120 of 247, plus 1 chain | A few lines; most depend on the chat screenshot. |
| 2 | @chihoahoa_a | ~97 of 162 | A few pun lines. Most comments are "OSAD đẹp trai" shop spam (OSAD is a celebrity), so they are excluded. |
| 4 | @yc_pgn | ~89 of 136 | Weak. Many school/class ("lớp") comments carry a minors risk. |
| backup | @punlnh0103 | ~117 of 396, plus 3 chains | Usable as a second alternate (bad-boyfriend theme). |
| backup | @ngwiey.its | ~88 of 187 | One standalone line. |

- **Chains opened:** vinh.duonh, anhtuan.imnita, cake_is.calling, trieu_goi_hon_mang, hoangxshikoku, minh_tiep_03, sa.kkar, nguyenduyhai7050, bowwiudau (#8); sirikko_o, embethuy2311, shokojuzo (#1); tuicungkobt892301, ngqanh.09 (#5); hydrangea.15126 "sinh nhật còn k có" (#10); alinado_02, __co.chin (#9); punlnh0103 "14/8", long_nguyennp (backup); quan.do.97 (ngwiey).
- **Not read:** the scout's other backups (@tiemhoacua_pi, @dr_coconut.xxis), which were not requested. I did not look at the photos inside comments (no captures were taken). Attached media was detected only from alt text.

## 2. Posts read

| # | Link | Post text (verbatim) | ♥ / 💬 | Media |
|---|---|---|---|---|
| 8 | https://www.threads.com/@rianggg.205/post/DeuBP9REkL4 | Ngày cho phụ nữ ⏎ - 8/3 ⏎ - 20/10 ⏎ - Sinh nhật ⏎ Ngày cho đàn ông ⏎ - Sinh nhật ⏎ - 6/4 ⏎ - 19/11 | 7.2K / 238 | none detected (text-only) |
| 1 | https://www.threads.com/@k_t_t_l00/post/DewiroOgU2C | hậu 20/10 của mấy anh đã đ có tiền còn sĩ gái :)) | 34K / 329 | 1 video (CCTV of two men taking a bouquet from a shop front at ~4 a.m.) |
| 5 | https://www.threads.com/@phqlinnn/post/DetykuuGrB- | (tag 20/10) Các bạn nữ độc thân hôm nay k có quà đừng buồn nhé ⏎ Mình có ngy còn chả có quà đây | 12.8K / 355 | image |
| 2 | https://www.threads.com/@chihoahoa_a/post/DetKfS7k3Zg | khi nào là ngày nữ chính VN v ạ? mình hỏi cho mình | 28.9K / 162 | 1 image (text) |
| 3 | https://www.threads.com/@buicongnam0308/post/DetsvlVgXz0 | 20/10 thật vui và hạnh phúc nhé các chị em 🫰🏻 | 20.5K / 472 | video (celebrity) |
| 4 | https://www.threads.com/@yc_pgn/post/DerBM1fj0OS | Ngta nhận quà 20/10 từ ⏎ 1. Love ⏎ 2. Lớp ⏎ 3. Lốp ⏎ Còn tôi ko có quà | 16.1K / 136 | image |
| 6 | https://www.threads.com/@ishoujostyle_/post/Dei2MpWkT8r | Góc nhắc nhở : Quà 20/10 cho chị em phải có giá trị sử dụng và giá trị sống ảo ⏎ Xin cảm ơn | 11.8K / 484 | image |
| 7 | https://www.threads.com/@hamie.dreamy/post/Deo7mnUH556 | Quà 20/10 từ anh yêu, cả lò Threads bán gì để mình mua với :> | 7.2K / 773 | 2 images (transfer screenshot with the sender's name) |
| 9 | https://www.threads.com/@uyenxinhnhat/post/DeuRRSjk7-v | (tag "tặng hoa 20/10") khổ thân chồng tôi, đặt hoa tạo bất ngờ cho vợ nhưng shop hoa L rất xịn giấu tên chốt đơn đã đời,thanh toán xong hết rồi và hẹn 5h chiều 20/10 ship. Bây giờ 11h đêm rồi và k có bó hoa nào dc ship cho tôi. Mặt ck tôi ngắn tũn ra rồi đấy tại “thấy vợ k có hoa để chụp ảnh, khổ thân em” 🤣 có những người tồi chẳng nổi 1 lời chúc, nhưng cũng có những người đàn ông đủ tinh tế và bị shop bỏ bom :)) ảnh cho xem tin nhắn thấy bó hoa cũng k hề rẻ đâu mà sao quên hay z tr 😮‍💨ck mình có lỗi gì đâu mà phải xin? | 6.7K / 654 | 2 images |
| 10 | https://www.threads.com/@hydrangea.15126/post/DerCA8jGKND | (tag "tinhyeu") um, em tự mua được ⏎ #20/10 | 4.9K / 247 | image (chat) and music |
| backup | https://www.threads.com/@punlnh0103/post/DeuOK38GMJE | Còn 1h là kết thúc ngày 20/10 và thứ mình nhận được là ⏎ - Không hoa vì: "anh thấy phí,kiểu gì chả héo" ⏎ - Không lời chúc vì: "anh ngại lắm tại chả chúc ai bao giờ=)))" ⏎ - Không thiệp vì: "thôi phiền lắm" ⏎ - Không những món khác vì: "anh hết tiền rồi" ⏎ Và một trận cãi vã🫠 | 2.6K / 396 | 2 chat screenshots (check them for names) |
| backup | https://www.threads.com/@ngwiey.its/post/DeqZ54DEmER | Dear thread city ⏎ Sắp 20/10 rồi các bạn đừng khoe hoa nữa mình ghen tị lắm | 3.3K / 187 | 1 image |

## 3. Candidates (40 rows)

The "Find" column holds a short unique substring for `__cap()`. For replies, capture on the parent's permalink, which the "Chain" column names. Bleep words are listed under Flags. **CTX** means the comment only works with its parent post as the opening. **OK-solo** means it works on its own in a 20/10 compilation.

| id | post | handle | date | ♥ | verbatim text | chain (handle: verbatim) | why funny (my view) | flags | find |
|---|---|---|---|---|---|---|---|---|---|
| C01 | #8 | rianggg.205 | 10-20 | 7.2K | Ngày cho phụ nữ ⏎ - 8/3 ⏎ - 20/10 ⏎ - Sinh nhật ⏎ Ngày cho đàn ông ⏎ - Sinh nhật ⏎ - 6/4 ⏎ - 19/11 | opening post | Sets up "women get days, men get… what?" | none; text-only | Ngày cho đàn ông |
| C02 | #8 | cake_is.calling | 10-20 | 105 | Còn 1/6, 14/2+14/3 ( có là trai thì đa phần cũng tặng thôi =)) ) 19/11 còn chung với ngày QUỐC TẾ BỒN CẦU 🥀💔 | → **rianggg.205** (OP, 24♥): sad =))) happy toilet day | Men's day shares the date with World Toilet Day; the OP's deadpan reply lands it | CTX (#8). The reply's English needs phonetics | QUỐC TẾ BỒN CẦU / happy toilet day |
| C03 | #8 | bowwiudau | 10-20 | 150 | 6/4 là ngày bọn tiktok bịa á chứ lmg dc công nhận | → **rianggg.205** (OP, 8♥): thồi có còn hơn kh chứ | Debunks 6/4; the OP shrugs | CTX | bọn tiktok bịa |
| C04 | #8 | minh_tiep_03 | 10-20 | 0 | Khoan khoan, ngày 6/4 là cái ngày gì vậy?? | → **cutiart_** (2♥): Nó là ngày do giới trẻ tự bịa ra, 64 là Đồng trong bảng tuần hoàn hoá học, mà Đồng là Cu. Nó chả là ngày gì cả, chủ tus chỉ đang cố gán ghép ý nghĩa cho nó thôi. → **minh_tiep_03**: Thế thì em chịu rồi 🤦‍♂️ | 6/4 = copper = "Cu" (mild dick pun), then a defeated reply | CTX. Mild 18+ innuendo. Capture on minh_tiep_03/post/DeuTRA9E2jH | Khoan khoan, ngày 6/4 / mà Đồng là Cu / Thế thì em chịu rồi |
| C05 | #8 | anhtuan.imnita | 10-20 | 445 | Thật ra đàn ông chúng tôi không để ý lắm đến những ngày dành cho mình đâu. Với đàn ông thì chúng tôi không đòi hỏi lắm sự vinh danh, âm thầm làm việc và cống hiến, miễn là mọi người đừng phủ nhận cố gắng của chúng tôi là đủ rồi. | → **hotmeecutee** (3♥): câm (other replies: juliahoang.es "Câu trả lời rất đàn ông.") | A noble speech answered with one word, "câm". Perfect meme slam | CTX. "câm" is rude, but not a bleep word. Capture the reply on anhtuan.imnita/post/DeuF3G7o6Sz | không đòi hỏi lắm sự vinh danh / hotmeecutee |
| C06 | #8 | vinh.duonh | 10-21 | 449 (14 replies) | Thật ra đàn ông chúng tôi không để ý đến những ngày dành cho mình đâu. Nhưng nếu được tặng một con Gipsy Danger cao 79,25 mét, nặng 1.980 tấn, thuộc thế hệ Mark-3, vận hành bằng lò phản ứng hạt nhân. Trang bị pháo plasma I-19, kiếm xích GD6 và cả tên lửa ở khuỷu tay thì cũng được | → **justung274** (1♥): này này phải 2 ông lái, ông cho tôi lái ké với :)))) → **huy_cao_01**: Rồi là 2 người đàn ông xa lạ quện vào nhau trong tiềm thức hả :))))))) · also **ktran1911**: Bro đã tiết lộ bí mật quốc gia, cần phải bị loại trừ · **minhtotem5.0**: Nếu ông đc tặng thì tôi muốn đc lau lõi phản ứng của nó | Parodies C05 with a Pacific Rim robot spec, then a "two men drifting" gay joke | CTX. Mild innuendo. Foreign words need phonetics (Gipsy Danger, Mark-3, plasma, I-19, GD6). I inferred from page order that huy_cao_01 replies to justung274. Capture on vinh.duonh/post/Devu0_JmUjh | Gipsy Danger / cho tôi lái ké / quện vào nhau / tiết lộ bí mật quốc gia |
| C07 | #8 | hoangxshikoku | 10-22 | 87 | 8/3 là ngày phụ nữ quốc tế, 19/11 là ngày đàn ông quốc tế, 20/10 là ngày phụ nữ Việt Nam, 6/4 là ngày quốc tế bé trai. Thế không có ngày đàn ông Việt Nam hả mn? giống 20/10 ý 🗿🗿🗿 | → **xuanbachhhh_** (4♥): đàn ông VN ngày trước sướng bỏ cụ còn đòi có ngày thì làm tướng à → **hoangxshikoku** (3♥): Đàn ông ngày trc chứ ngày nay có hưởng đc tí nào đâu. Có tiếng không có miếng🙄 | A mini argument; "có tiếng không có miếng" | CTX. Capture on hoangxshikoku/post/DeyIvjSnfBR | ngày quốc tế bé trai / sướng bỏ cụ / Có tiếng không có miếng |
| C08 | #8 | kal.wardin.547 | 10-21 | 9 | Ngày 6/4 thì không rõ nhưng ngày 19/11 là ngày bồn cầu thế giới và nằm trong tháng NNN :v | none | Toilet day plus No-Nut November: double insult | CTX. Mild 18+ (NNN). Write "NNN" phonetically | tháng NNN |
| C09 | #8 | trieu_goi_hon_mang | 10-21 | 0 | 19/11 là ngày quốc tế toilet nhé ⏎ meta.ai ⏎ đúng ko??chỉ đúng hay không thôi chứ không có ngoài ra | → **meta.ai** (Meta's AI account): Đúng. | The AI confirms in one word. **Best closer** | CTX. meta.ai is a brand/AI account, not a person or celebrity; flag for PM. Write "meta.ai" phonetically. Capture on trieu_goi_hon_mang/post/DewedTEGO8v | ngày quốc tế toilet / handle meta.ai |
| C10 | #8 | gary657432 | 10-21 | 1 | Ngày cho đàn ông: ⏎ Sinh nhật ⏎ Đám tang | none | Mirrors the post's format; dark punchline | CTX (works only after C01) | Đám tang |
| C11 | #8 | aq2912 | 10-20 | 1 | Đàn ông thì chỉ có ngày giỗ thôi | none | Same dark joke in 8 syllables (use C10 or C11, not both) | nearly OK-solo | chỉ có ngày giỗ |
| C12 | #8 | vanlamon | 10-21 | 1 | Tiên sư bố nó mình sinh 20/10 nên mất mẹ ngày sinh nhật… Còn mỗi quốc tế bồn cầu với cái ngày tự phong đ tính tiền | none | A man born on 20/10 loses his birthday to Women's Day and is left with toilet day | bleep "Tiên sư bố", "mẹ", "đ". Unbleeped, "mất mẹ" could be misheard as "lost his mother". CTX | mất mẹ ngày sinh nhật |
| C13 | #8 | _hngmnhvwng_ | 10-22 | 0 | Thật ra đàn ông chúng tôi không để ý đến những ngày dành cho mình đâu. Nhưng nếu được tặng một con Porsche 911 992.2 GT3 Touring Sonderwunsch thì cũng được | other variants on the same template: vungazinh (RTX 5090 ROG Matrix), fpthieusuy23 (5090 + Ryzen 9950X3D), granalegria.simp (Yu-Gi-Oh cards) | A running template; a backup if C06 runs long | CTX. Heavy foreign words (needs phonetics) | Sonderwunsch |
| C14 | #5 | melody_meowmeow | 10-20 | 162 | Độc thân k có quà đớn 1 thì có ny mà vẫn k có quà đớn 10 | 1 reply (not read) | Clean "đớn 1 / đớn 10" scale | OK-solo | đớn 10 |
| C15 | #5 | pthao.28 | 10-21 | 0 | Trc nyc tôi còn bảo ngày này là ngày của phụ nữ (theo ý b ấy là ngày của các bà các mẹ) nên t ko có quà cơ mô Phật thế mà cũng gật đầu 🥰 | none | Ex: "20/10 is for mothers, not you"; "cơ mô Phật" | OK-solo. Fits the "whose day is it" theme | cơ mô Phật |
| C16 | #5 | t.wzyi | 10-22 | 0 | đèo mẹ :))) không quà không chúc tui bảo “sao 20/10 anh hong tặng quà em mà cũng không chúc em gì hết vậy” thế đ nào cha gửi cho được 1 clip tiktok ạ | none | Asks for a wish and gets a TikTok link | bleep "đèo mẹ", "đ". OK-solo | 1 clip tiktok |
| C17 | #5 | kendeeep | 10-21 | 0 | "anh quên mua hoa mất rồi,chuyển em 2tr bồi thường nha" 20h30 ngày 20/10 ⏎ Quên??? ủa??? | none | "Forgot" Women's Day, pays compensation like an insurance claim | OK-solo | 2tr bồi thường |
| C18 | #5 | _uocco100ty_ | 10-20 | 0 | Ngày 20/10 năm ngoái thằng nyc t rủ t đi chơi, đã kh tặng quà cho t thì thôi đi, đằng này nó còn bắt t trả tiền cho buổi đi chơi đó nữa, đớn -)))) | none | No gift, and she paid for the date | OK-solo | bắt t trả tiền |
| C19 | #5 | ngqanh.09 | 10-20 | 13 | người yêu mình còn bảo “em có phải phụ nữ đâu”😂 | none | Boyfriend: "you're not a woman anyway" | OK-solo. **The handle may encode birth year 2009 (minor?).** Uncertain, so not in the main lineup | em có phải phụ nữ đâu |
| C20 | #5 | nhincaigiizbae | 10-20 | 0 | T k có lời chúc,k có quà ⏎ Chỉ có 1 cái nịt,1 CÁI NỊT MÀU VÀNG | none | "Cái nịt" meme | OK-solo | CÁI NỊT MÀU VÀNG |
| C21 | #5 | _tttvii.ww | 10-20 | 1 | gì mà đớn z b :))) ở 1m khoẻ lôz k chịu 😤 | → **vananh26_8**: S đi đâu cx gặp m z → **_tttvii.ww**: ủa do bà fl tui á với lại tui sống thật ở thr bà ơi :)))) | Brash "stay single" plus a callout chain | bleep "lôz". Semi-solo | khoẻ lôz |
| C22 | #10 | varian9938varian99 | 10-20 | 0 | Hồi đó nyc t nói là đã tới ngày rằm đâu e | none | Ex treats 20/10 like it needs a lunar date | OK-solo | ngày rằm đâu |
| C23 | #10 | nhodlathonmmc_ | 10-19 | 529 | mai mà m k có hoa thiệt là m bỏ nó liền cho t nha | none read | A friend's ultimatum | **CTX** (needs #10's chat screenshot) | m bỏ nó liền |
| C24 | #2 | alecthai123 | 10-20 | 4 | 8/3 nữ chính, 20/10 nữ phụ, 20/11 bình đẳng giới | none | Phụ nữ → "nữ phụ" pun, plus Teachers' Day as "gender equality" | semi-solo (the pun explains itself) | bình đẳng giới |
| C25 | #2 | linhdaylamsao | 10-20 | 709 | Cái số k được làm nữ chính nên làm tạm phụ v | 2 replies (not read) | Same pun, most liked | **CTX** (needs #2) | làm tạm phụ |
| C26 | #9 | __co.chin | 10-21 | 1 | Đó là lí do 6 năm nay ck t luôn tặng hoa ngày 19 chăng :)) | → **uyenxinhnhat** (OP): dẫn đầu xu hướng đó ạ 😋 | Husband dodges the 20/10 flower chaos | semi-solo | tặng hoa ngày 19 |
| C27 | #9 | alinado_02 | 10-20 | 1.9K | KHOAN SAO LẠI BẢO CHỒNG B ĐI LỰA LỜI XIN LỖI? SHOP BỊ NGẪN À? Ông chồng có lgi sai đâu đụ má t đọc thấy tức nha :))) | → **peekk.abooo** (16♥): lỗi của ông chồng là đặt mua hoa shop này =))))))) | All-caps rage, then "his only mistake was choosing this shop" | bleep "đụ má". **CTX** (needs #9). Avoid any shop names from the replies | SHOP BỊ NGẪN / lỗi của ông chồng |
| C28 | ngwiey | nguynxing | 10-19 | 0 | mng up ảnh hoa bên youtube nhé, mình đi trực bên đó mình 0 xem😀 | none | "Post your flowers on YouTube, I don't look there" | OK-solo | đi trực bên đó |
| C29 | #1 | k_t_t_l00 | 10-21 | 34K | hậu 20/10 của mấy anh đã đ có tiền còn sĩ gái :)) | opening post | Flower thieves "showing off for girls" | bleep "đ". **CCTV video, blur it; see §5** | sĩ gái :)) |
| C30 | #1 | sirikko_o | 10-21 | 12.3K | Lậy mấy bố này =))) mắc sĩ gái đéo nghĩ đến cảnh bị bắt đc xong vừa mất tiền vừa mất mặt mà còn mất gái | → **sirikko_o**: Vl sao cái cmt này 10k tim r ???? · → **k_t_t_l00** (OP, 4K♥): như th nào đấy trộm hoa tặng bạn gái bị chính chủ đòi lại -)) | "mất tiền, mất mặt, mất gái" triple, then shock at own 10K likes | bleep "đéo", "Vl". CTX (#1). Capture on sirikko_o/post/DewkxHFifO- | vừa mất tiền vừa mất mặt / 10k tim / bị chính chủ đòi lại |
| C31 | #1 | embethuy2311 | 10-21 | 3.9K | Hôm qua t mới lướt đc cái video. Bà này đc tặng hoa để ở xe xong vô quán. Bị tk kia chôm đi tặng ny. Bả check cam quán thấy tk này lấy. Mà đi uống nước lại gặp đúng tk cha đó đang ngồi với ny cùng bó hoa đặt bên cạnh. Bả sang nói cho xong lấy hoa về. Tk kia đúng nhục. | → **embethuy2311** (382♥): À đính chính lại là bả k nói gì nha. Bả sang lấy hoa về. Còn tk cu thì vẫn cắn hướng dương 🤣 bạn gái thì ngơ ngác. · **kiwtham.06** (114♥): T mà là bạn gái t nhục tới chết :))) chia tay xong về thôi → **embethuy2311** (34♥): Bạn trai nhục 1 bạn gái nhục 10. Quen phải tk ối dồi | Story with a twist ending: he keeps cracking sunflower seeds | CTX (#1). It describes a different viral incident (café), still 20/10 flowers. Capture on embethuy2311/post/Dew0wthnQLr | cắn hướng dương / nhục tới chết / Bạn trai nhục 1 |
| C32 | #1 | batmanz207 | 10-21 | 3.2K | khổ vll bố mấy tk ngáo | 2 replies (not read) | Short exasperated insult | bleep "vll". CTX | bố mấy tk ngáo |
| C33 | #1 | starb.1te | 10-21 | 586 | ''ê nó lấy hoa của mình luôn kìa'' dm nghe vừa tội vừa buồn cười mấy bà,bất lực mà đ lm đc gì:))) | 1 reply (not read) | Quotes the shop girls' voice in the clip | bleep "dm", "đ". **CTX** (needs the video audio) | lấy hoa của mình luôn |
| C34 | #1 | chocuteo01 | 10-21 | 108 | vl cô gái xấu số nào đây?? | none | "Which unlucky girl got these?" | bleep "vl". CTX | cô gái xấu số |
| C35 | #1 | codontrensamac | 10-21 | 0 | lấy có 1 bó v 2 ổng tặng nhau hã | none | Two thieves, one bouquet: gay joke | CTX | 2 ổng tặng nhau |
| C36 | #1 | acoho00 | 10-21 | 0 | Em cám ơn, a mua hoa đẹp thế! ⏎ Ko hoa a ăn trộm đấy!:)))))) | none | Mock dialogue | CTX | Ko hoa a ăn trộm |
| C37 | #1 | xoaiinhhh | 10-21 | 28 | Qua bó hoa t xả 189k rồi nó còn trả giá 150k thì anh lấy cơ à🤣 chồng t bảo đ có tiền thì mua cái gì nhỏ nhỏ thôi. Cái bánh kem nhỏ vài chục cũng đc mắc đ gì cứ cố hoa xong đi trả giá rách vđ | 2 replies (not read) | A florist's customer haggles | bleep "đ", "vđ". Semi-solo | trả giá 150k |
| C38 | #1 | nbang_bang | 10-22 | 0 | Thất bại của thuyết tiến hoá | none | Four-word closer | CTX | thuyết tiến hoá |
| C39 | backup | punlnh0103 (OP) | 10-20 | 1.5K | Vừa check xong 14/8 là sinh nhật nyc ảnh các bà ạ🙂 | → **yzzchyy**: Ô sinh nhật t này=)))) thằng nào đấy bà · OP's later replies to ~25 commenters asking "ctay chưa?": "Rồi ạ" / "Ctay rồi bà ơii" | Twist: he remembered his ex's birthday. A stranger with the same birthday asks "which guy?" | CTX (punlnh0103 post). **2 chat screenshots: check them for names.** Capture on punlnh0103/post/DeuUfFimNUV | sinh nhật nyc ảnh / thằng nào đấy bà |
| C40 | backup | mihphwg.luvk_ | 10-20 | 1 | ảnh có ngại nói ra câu anh yêu em không? có ngại tỏ tình không? ⏎ tò mò quá, còn cái gì ngại hơn vậy | none | Roasts "anh ngại lắm" | CTX (punlnh0103) | còn cái gì ngại hơn |

**Seen but not tabled.**
- **Lower value:** mrbeam_3 "Ngày đàn ông trùng vs ngày bồn cầu thế giới nx🐧hài vcd" (duplicates C02). rieuoc99 "Mình chia tay ny đúng 20/10 nè, có gì đâu mà buồn 😌". jjuu.uu01 "Phụ nữ 1/2 có được chúc kh😞". _14th.novem_ / bietlareview (#1). long_nguyennp → OP "Ctay rồi bà ơii". phamvan73630 "Bộ nó làm em đã lắm hả sao còn chưa cook" (mild 18+).
- **Excluded:**
  - happiord26 "Nào đẻ con với ảnh nhớ ủn mông em nhoa": a kids-wear shop with a baby photo (minors).
  - _pthw.hwngg_ "cháu t mới học lớp 3…" (a minor).
  - ugotnojams_621 "6/4 đa phần cho cấp 3…" (school).
  - luonng2011 (good list joke "Quà: đeos…", but the handle suggests birth year 2011).
  - huyhoang041209 (2009 birthdate in the handle).
  - supervegeta1402 "2009 học đ lo…" (minor).
  - hanrejj "khéo chỉ cấp 2 cấp 3" (speculates the thieves are minors).
  - nh_zinzin_6th12 "up biển số xe" (licence plate).
  - Any comment giving the #1 shop's address or the #9 florist's name.
  - _sunniene_ "Phí quá t yêu hộ cho gớm đm": its card shows a private full name, "Nguyễn Mai Nguyên". Usable only if that name is hidden.
  - All OSAD and Bùi Công Nam comments (celebrities).
  - The shokojuzo thread (#1): extreme family insults.
  - pubgmobilevn (brand).
  - quan.do.97 "Đã tặng cho vợ từ tuần trước." (683♥): the joke depends on its photo.

## 4. Proposed lineup (my assessment)

### Recommended: "Ngày của đàn ông" (opening #8, @rianggg.205)

Why this one: it is the most bựa and internally coherent thread, with several reply chains, and the opening post has no media. Every non-#8 comment below is a standalone 20/10 joke. No second post's topic is read aloud.

| # | Card(s) | ~syll. | Meme beat |
|---|---|---|---|
| 0 | **Opening (read aloud):** C01 rianggg.205 post | 27 | |
| 1 | C14 melody_meowmeow | 18 | |
| 2 | C15 pthao.28 | 38 | |
| 3 | C16 t.wzyi (bleep) | 36 | |
| 4 | C17 kendeeep | 25 | |
| 5 | C02 cake_is.calling → rianggg.205 "happy toilet day" | 41 | |
| 6 | C04 minh_tiep_03 → cutiart_ → minh_tiep_03 | 57 | |
| 7 | C07 hoangxshikoku → xuanbachhhh_ → hoangxshikoku | 91 | |
| 8 | C05 anhtuan.imnita → hotmeecutee "câm" | 53 | **BIG 1:** slam on "câm" |
| 9 | C06 vinh.duonh → justung274 → huy_cao_01 (+ ktran1911) | 105–118 | **BIG 2:** cat_shocked on huy_cao_01 |
| 10 | C08 kal.wardin.547 | 27 | |
| 11 | C12 vanlamon (bleep) | 29 | |
| 12 | C10 gary657432 "Sinh nhật / Đám tang" | 8 | fx push |
| 13 | **Ending:** C09 trieu_goi_hon_mang → meta.ai "Đúng." | 28 | **BIG 3:** pop on "Đúng." |

- **Length.** The core comes to about 595–610 spoken syllables (my hand count, numbers spoken out), which is about 40–47 s of reading. Title, outro, ~25 card transitions and 3 meme beats should bring it to about 55–62 s.
- **Fillers.** To land in 60–75 s and the 650–900 syllable band, add C18 _uocco100ty_ (~40) after #4 and C22 varian9938varian99 (~14) after #1. That gives about 650 syllables, or roughly 62–68 s. If the cut runs long, drop #7 first.
- **Meme spacing.** The three big beats fall about 10 s or more apart.
- **Voice hints** (my guesses from the text):
  - Male: anhtuan, vinh.duonh, justung274, huy_cao_01, hoangxshikoku, minh_tiep_03, vanlamon (born on 20/10, male), gary657432.
  - Female: pthao.28, t.wzyi, kendeeep, melody, rianggg.205 (mentions "my bf").
  - meta.ai: a neutral or robotic voice if one is available.
- **Thumbnail hook:** "NGÀY CỦA ĐÀN ÔNG?" with a yellow line "= NGÀY BỒN CẦU 🚽".
- **Title ideas:**
  1. "Phụ nữ có 20/10, đàn ông có… ngày bồn cầu 🚽"
  2. "Hỏi Meta AI 19/11 là ngày gì, nó trả lời đúng 1 chữ 💀"

### Alternate A: "Trộm hoa sĩ gái" (opening #1, @k_t_t_l00)

- **Order:**
  1. C29 (opening)
  2. C30 (sirikko_o → self "10k tim" → OP)
  3. C31 (embethuy2311 story → "cắn hướng dương" → kiwtham.06 → "nhục 1 / nhục 10")
  4. C32
  5. C34
  6. C35
  7. C36
  8. C37
  9. C33 (only if the clip's audio is shown)
  10. End on C38 "Thất bại của thuyết tiến hoá".
- **Strengths:** much higher likes (34K post, 12.3K and 3.9K comments).
- **Weaknesses:** only about 400–470 syllables, so it needs 2–3 more long comments. The tone is more "chửi" than bựa. It also carries the risks in §5.

### Alternate B: punlnh0103 (bad-boyfriend excuses)

- **Order:** opening post → C39 twist → C40 → OP "Ctay rồi" montage. Can be padded with C14–C20, which fit this theme too.
- **Strengths:** the most coherent story.
- **Weaknesses:** low likes. The chat screenshots need a name check.

## 5. Uncertain points and risks

- **Reply parentage.** huy_cao_01 → justung274 (C06) and the order inside C07 were inferred from where they appear on the parent permalink. The other chains were confirmed from the comment pages.
- **Handles that may encode a birth year** (possible minors): ngqanh.09 (C19, kept out of the lineup), kiwtham.06 and okbbyviet19.09 (probably adults, but unverified).
- **#1 (Alternate A).** The opening card is a CCTV video of two identifiable private people accused of theft. It needs a blurred thumbnail. One commenter speculates they are school-age; that is unverified, and I excluded the comment. Shop location details appear in the replies and must not be shown.
- **meta.ai (C09).** This is Meta's official AI account. It is not a person or celebrity, but it is a brand; PM should confirm it is fine to show.
- **Mild 18+ innuendo:** C04 ("Cu"), C06 (drift and "lau lõi phản ứng"), C08 (NNN). None of it is explicit.
- **Pronunciation.** Foreign or abbreviated terms need phonetic text plus `asr_expect`: happy toilet day, Gipsy Danger, Mark-3, plasma, I-19, GD6, NNN, meta.ai, tiktok, clip.
- **Media.** Detection is alt-text based. I did not view comment photos. No attached photos were detected on the C01–C17 lineup cards. The post-level media in §2 comes from alt text and the scout notes.
- **Counts and dates.** Like counts are a snapshot (~21:00–21:30 ICT). Dates are UTC dates.
- **Labels.** The funniness ratings, lineup choice, durations and voice/gender hints are my own assessment. The syllable counts are hand estimates, not TTS measurements.

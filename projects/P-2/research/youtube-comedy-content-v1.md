# P-2 — Shorts hài: nghiên cứu nội dung sau phản hồi bản clone

Ngày quan sát: 22/10/2026. Quyết định cần hỗ trợ: chọn tình huống hài hợp hai người que đã chốt, sau khi user nhận xét bản TikTok chuyển thể A-106 chưa hay. Tạm dừng clone cũ. Đây là nghiên cứu thiết kế nội dung, không phải bảng xếp hạng thị trường hoặc dự báo viral.

## Cách kiểm và giới hạn

Tìm trực tiếp YouTube bằng “shorts hài tình huống” và “Pencilmation shorts”. Web search ngoài nền tảng trả nhiều kết quả không liên quan, không dùng làm bằng chứng. Sàng 10 mẫu dưới đây, tải và xem contact sheet 1fps cho 4 mẫu (mở thêm mẫu hoạt hình vì ba mẫu người thật có rủi ro giống bản clone cũ). Đọc phụ đề tự động của hai mẫu Khủng Long Nhỏ, đối chiếu chữ cháy trong hình; không dùng caption như transcript tuyệt đối. Không nghe liên tục hoặc kiểm toàn bộ từng frame. Không kết luận nội dung chỉ từ tiêu đề.

Metadata clip đã tải nằm ở youtube-comedy-sources-v1.json; raw media/caption/info JSON có signed media URL giữ trong media/ bị Git ignore. Tác giả kênh upload không đồng nghĩa đã xác nhận sở hữu footage/nhạc. Không lấy giọng, hình hoặc logo nguồn đưa vào video mới. Mọi metric là snapshot, không có velocity, retention, CTR hoặc chứng minh audience Việt.

## Sàng 10 mẫu

| Mẫu / link | Tín hiệu nhìn thấy | Mức kiểm / quyết định |
|---|---|---|
| [Chưa đeo kính mà đòi làm việc](https://www.youtube.com/shorts/-kporozDols) | Khủng Long Nhỏ;13s;30/09/2026;1,147,246views snapshot | Tải/hình1fps/caption; học cách giấu–lộ bối cảnh, không sao chép gag cơ thể. |
| [Hơn thua trong tình yêu](https://www.youtube.com/shorts/KBoo3ael_jY) | Khủng Long Nhỏ;27s;19/10/2026;29,345views | Tải/hình1fps/caption; học leo thang và đổi vai. |
| [Có Ma ban ngày](https://www.youtube.com/shorts/NseWKR5DfR4) | ny tinh nghịch;12s;30/06/2024;34,359,993views | Tải/hình1fps; dùng làm phản ví dụ vì phụ thuộc nét mặt/phản ứng, không chọn clone. |
| [Checked Out](https://www.youtube.com/shorts/KNHhTSKU-eM) | Pencilmation;42s;27/09/2022;12,672,395views | Tải/hình1fps+cắt phóng phần hoạt hình; benchmark trực tiếp hữu ích nhất về luật hình/đồ vật. |
| [Kế hoạch chạy trốn](https://www.youtube.com/shorts/f0Qkp0F1evQ) | Search UI7.7mviews làm tròn | Chỉ metadata; không suy cốt truyện, chưa chọn vì chưa kiểm nguồn và dựng cảnh. |
| [Bộ đôi Bà Nội và Ông Nội](https://www.youtube.com/shorts/I87JxseAfBo) | Search UI1.9m | Chỉ metadata; không ép thêm vai tuổi tác vào duo đang có. |
| [Cháu trai và Ông Nội](https://www.youtube.com/shorts/1dHY1U1NpXo) | Search UI10m | Chỉ metadata; chưa đánh giá gag hay quyền footage. |
| [Nhân viên hiểu ý thiệt](https://www.youtube.com/shorts/gtHQVJJpsNI) | Search UI14k | Chỉ metadata; có thể tìm tiếp nhánh hiểu sai yêu cầu, chưa gọi đã xem. |
| [Tall Tails](https://www.youtube.com/shorts/4hhQUvprEGk) | Search UI7.9m | Chỉ metadata; tiêu đề không đủ để bóc cơ chế hài. |
| [Pencilmate Gets in Shape!](https://www.youtube.com/shorts/ghMaIKmyXWM) | Search UI23m | Chỉ metadata; có thể đào sâu sau, chưa suy nội dung từ tên. |

Không so clip3ngày với clip2–4năm bằng view thô để xếp độ hấp dẫn. Mẫu3 nhiều view không đồng nghĩa phù hợp bộ dựng hiện tại.

## Bóc tách 4 mẫu đã kiểm hình

### 1. Giấu bối cảnh rồi lộ sự hiểu nhầm — clip không đeo kính

Quan sát:0–2s khuôn hình cận người và dụng cụ nhỏ;2–4s nhân vật khác đề nghị đeo kính (caption);5–9s nhân vật tìm/đeo kính;10–12s khuôn hình mở ra cho thấy có người thứ ba nằm phía dưới và thao tác ở vùng mặt. Khung11s xác nhận vùng chân mày được giữ/thao tác; không khẳng định chính xác loại dịch vụ chỉ từ mẫu hình.

Suy luận cơ chế: cho người xem đọc nhầm một hành động trong khung cận rồi tiết lộ bối cảnh lớn hơn. Thay đổi thông tin mới tạo điểm cười, không chỉ vung tay hoặc ngã. Chi tiết nét mặt và tình huống cơ thể gốc không cần mang sang P-2.

Ứng dụng: giấu vật hoặc thông tin, reveal bằng mở khung/xoay đồ vật; chỉ hai nhân vật và một đạo cụ. Ví dụ độc lập: tưởng A đang nhắn tin tình cảm, hóa ra là lời nhắc tưới cây đặt tên “Em”; cần hình cuối dễ đọc. Rủi ro: nếu câu cuối chỉ giải thích bằng chữ thì gag yếu, nên chọn reveal nhìn thấy được.

### 2. Hơn thua → tăng mức → đổi vai — clip tình yêu

Quan sát: đầu clip một cặp nhìn cặp khác cõng nhau; khoảng7s bắt đầu cõng;13–16s động tác nâng/cõng tăng mức;18–23s có so sánh và bình luận qua caption;24–26s khung cuối cho thấy nữ cõng nam. Có4người và nhiều động tác nâng cơ thể, không phải clip hai người dễ dựng sẵn.

Suy luận: mong muốn “hơn” đối phương thúc đẩy mỗi bước và kết bằng đảo vai. Nhân vật tự đẩy mình vào kết quả trái mong đợi; mạch này có thể tồn tại ngay cả khi bỏ đối thủ người thật và động tác cõng.

Ứng dụng: hai người hơn thua bằng đồ vật đơn giản hoặc tự cạnh tranh với lời khoe trước đó. Không tiếp tục dựng cõng/ngã phức tạp khi acting chưa đạt. Không gán mặc định một giới là người ngốc.

### 3. Phản ví dụ: có ma ban ngày

Quan sát:0–3s nhân vật vào nhà;4–5s ngoái lại; cửa phía sau đóng ở mẫu5s;6–10s phần lớn là cận mặt, giật mình/nhảy;11s chạy đi. Không có caption thoại trong dữ liệu tải được. Chưa xác nhận nguyên nhân cửa đóng hoặc chi tiết người trêu từ mẫu hình, nên không bịa cú reveal có ma thật/người nấp.

Suy luận: phần lớn trải nghiệm dựa vào phản ứng thật và âm thanh chưa nghe kiểm. Một cặp mắt/mồm đổi trạng thái trên người que có thể làm mất lý do người xem thích. Tạm loại dạng prank phản ứng này khỏi pilot tiếp theo dù view cao.

### 4. Chọn sai hàng, càng tối ưu càng mắc kẹt — Checked Out

Quan sát:0–1s người đẩy xe ở quầy2;2–15s góc trên cho thấy hai hàng và nhân vật đổi vị trí giữa hàng1/2 khi độ dài khác nhau;16–25s số người/chướng ngại dài ra, bất lợi tăng rõ;26–28s rời cửa hàng;29–41s lên xe rồi lại vướng hàng xe, lặp cấu trúc hàng chờ ở bối cảnh mới. Đây là bản42s đóng khung ngang bên trong Shorts dọc với khoảng màu lớn, không lấy bố cục letterbox đó làm mẫu sản xuất.

Suy luận: luật hài đơn giản, được thể hiện bằng số lượng/vị trí, liên tục phản bội lựa chọn của nhân vật; ending gọi lại rắc rối ở bối cảnh khác. Hành động có mục đích và hệ quả, thay vì chuyển động cho có.

Ứng dụng: một vấn đề nhìn thấy được, hai cách giải, mỗi lần chọn lại làm phát sinh hệ quả; kết gọi lại luật đã thiết lập. Học cấu trúc chứ không dựng lại đổi hàng siêu thị rồi kẹt xe. Không giả định animation mềm và biến dạng của Pencilmation đã có trong adapter P-2.

## Kết luận cho P-2 và 3 hướng nên thử

Đề xuất BA, không phải user đã chốt hoặc đã có validation khán giả:

| Ưu tiên | Hướng | Premise riêng để phát triển | Vì sao hợp / cần kiểm |
|---|---|---|---|
| 1 | Hài đồ vật, một luật dễ thấy | **Giành cục sạc:** hai điện thoại cạn pin, A/B giành đầu sạc; người thắng cắm vào máy vẫn không lên, mở khung mới thấy ổ cắm ở phía người thua. **Nút im lặng:** A tắt từng tiếng nhỏ để ngủ, tắt xong lại không chịu nổi tiếng đồng hồ chính mình vừa đặt. **Ngăn cuối cùng:** mỗi lần dọn vật khỏi chỗ A lại lấn chỗ B, cuối cùng cả hai ngồi lọt trong một ô trống. | Ít thoại,1bối cảnh,1–2đạo cụ chủ đạo; phản ứng và camera phải rõ. Ưu tiên cục sạc vì bằng chứng cuối có thể vẽ được, nhưng không gọi premise là độc nhất thị trường. |
| 2 | Hiểu nhầm, lộ thông tin cuối | **Giấu điện thoại:** A úp máy, B tò mò; lộ ra A đang nhìn công thức món định nấu bất ngờ cho B. **Cánh cửa bí mật:** B nhìn A ra sức kéo một cánh cửa, mở rộng khung thấy biển ĐẨY ngay trên đầu. **Cuộc gọi căng thẳng:** A nói như sắp nghỉ việc, hóa ra đang thương lượng với robot nhắc đi ngủ. | Học reveal từ mẫu1; chọn ý tưởng có hình cuối tự giải thích. Ý tưởng lời thoại nhiều như cuộc gọi có effort/uncertainty cao hơn. |
| 3 | Hơn thua nhỏ nhặt, tự hại mình | **Ai tiết kiệm điện hơn:** hai người tắt đèn từng bên để khoe tiết kiệm, cuối cùng cùng soi hóa đơn bằng hai điện thoại hết pin. **Ai gọn hơn:** mỗi người giấu đồ sang túi người kia, đến lúc bước ra cửa cả hai không nhấc nổi túi. **Ai nhanh hơn:** A khoe tự động hóa việc nhỏ, B làm tay xong và ngồi chờ trong lúc A vẫn bấm thiết lập. | Học động cơ tự leo thang từ mẫu2, thay động tác nâng người bằng đồ vật. Cần tránh lặp thông điệp giáo huấn và thêm chữ giải thích sau gag. |

Đề xuất đi tiếp với **Giành cục sạc** như một premise để Content phát triển, không tự render trong lượt research. Trước render chỉ cần animatic vài pose để kiểm3điểm: người xem hiểu điều hai người muốn; thấy thắng/thua; nhìn reveal nguồn điện là hiểu vì sao tình thế đảo. Nếu animatic chưa ra gag thì sửa content/acting trước, không tăng độ phân giải để bù.

## Bài học từ phản hồi user

User nhận xét A-106 “Nhìn ko hay”. Kết luận chắc chắn: bản đó chưa đáp ứng sở thích sáng tạo của user. Chẩn đoán PM/BA: diễn lại khung động tác và giữ audio chưa bảo toàn nét diễn/nguyên nhân gây cười; đây là giả thuyết có căn cứ từ dạng source và animation thô, không phải user đã xác nhận lỗi duy nhất nằm ở kịch bản. Vì vậy nghiên cứu này ưu tiên gag có bằng chứng hình ảnh và khả năng dựng rõ, không tăng lượng clone trước khi thử chất lượng.

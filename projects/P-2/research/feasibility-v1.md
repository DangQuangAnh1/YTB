# P-2 — Chọn dạng Shorts có thể làm

Ngày 20/10/2026. PM → BA tuần tự. Đầu vào: P-2 revision 1, PROJECT.md và khảo sát sao lưu research/source-scout-2026-10-20-v1.md. Yêu cầu trực tiếp: “tôi muốn tách thành 1 p mới, xem cái nào có thẻ làm đc”. Người dùng đã yêu cầu tách dự án và đánh giá khả thi; chưa chọn một format hay cho phép sản xuất. Các quyết định riêng P-1 không được chuyển thành quyền P-2.

## Giả định làm việc
Khán giả Việt Nam, nội dung tiếng Việt theo brief khảo sát. Ưu tiên AI/công cụ sẵn có, tăng chi 0 đồng; chưa biết người dùng có muốn lên hình hoặc tự quay. Đánh giá trước theo phương án không cần quay. Không áp dụng mặc định giọng, nhạc, watermark, câu chốt hay quy tắc Threads của P-1 cho kênh mới.

## Bằng chứng năng lực tại máy
Đã đọc package.json, make-episode.sh và danh sách file engine-v1 của P-1; có mã Remotion, build timeline, tạo giọng, ghép card và master audio. Có node.exe trên PATH; có node_modules của engine. File final.mp4 release-17-v1 và props.json tồn tại. Đây là bằng chứng tài sản và quy trình cũ, chưa phải chạy thành công pipeline P-2. make-episode.sh đang gắn đường dẫn môi trường VieNeu trên máy và cấu trúc episodes riêng P-1; cần adapter riêng trước khi tái sử dụng. Không gọi TTS, render hoặc tải media trong khảo sát này. ffmpeg không hiện khi dò Get-Command; chưa kết luận máy không có vì công cụ có thể dùng đường dẫn riêng.

## Bảng khả thi (đánh giá kỹ thuật, không phải dự báo view)
| Dạng | Khả năng với AI/công cụ hiện có | Phần phải làm thêm | Quyết định đề xuất |
|---|---|---|---|
| Hài đối chiếu bằng hội thoại tự viết | Cao với card/nhân vật 2D đơn giản, nhiều giọng | Thiết kế cảnh/chat hư cấu riêng, chỉnh timing và kiểm tra giọng | Ưu tiên 1; không đồng nhất với diễn viên đóng tiểu phẩm |
| Chơi chữ / một câu nhiều cách hiểu | Cao với chữ, biểu tượng, nhiều giọng | Kiểm chứng cách hiểu, dựng phần đáp án và nghe phát âm | Ưu tiên 2; rẻ nhất về hình ảnh |
| Thử thách dạng câu đố | Cao nếu là câu đố số hoặc tìm chi tiết trong hình tự vẽ | Logic đáp án, đồng hồ, thời gian đọc; tránh câu mơ hồ | Ưu tiên 3; là biến thể mới, chưa có mẫu khảo sát trực tiếp chứng minh nhu cầu |
| So sánh văn hóa/đồ ăn thực tế | Có điều kiện | Nguồn thật, dữ kiện, footage có quyền dùng hoặc người quay | Chưa chọn khi không tự quay; stock/AI không chứng minh trải nghiệm thực |
| Ăn thử / reaction thực | Thấp trong phương án AI hoàn toàn | Người thật thử món, âm thanh và footage | Chỉ mở khi có người quay; không giả review đã trải nghiệm |
| Trend biểu diễn | Thấp với hệ thống card hiện có | Người biểu diễn hoặc thử nghiệm hoạt hình, timing/âm nhạc riêng | Để sau; chưa kiểm chứng chuyển động AI nhất quán |
| Vật lạ / chế tạo | Có điều kiện nếu chỉ giải thích bằng sơ đồ; thấp nếu kiểm thử thật | Vật thật, thao tác, quay quá trình và kết quả | Chưa chọn cho pilot không quay; sơ đồ là nội dung giải thích khác format gốc |

Độ phù hợp không dựa trên view mẫu cũ. Những mẫu từng mở sâu đăng năm 2022/2024/2025; phần “hot hiện tại” vẫn chưa xác minh. Không dùng các view đó để hứa hẹn doanh thu hoặc hiệu quả.

## Đề xuất cụ thể để review
1. **Hài hội thoại đối chiếu**: series những chuyện nhỏ đi làm/ở trọ. Ví dụ premise: hai người cùng nhắn xin nghỉ nhưng hiểu khác nhau. Nội dung tự viết, thể hiện hư cấu; không làm giả ảnh chụp bài người thật. Cần câu chốt đủ vui và diễn giọng tốt; AI dựng được không có nghĩa tự động viết hài tốt.
2. **Một câu, nhiều cách hiểu**: tiếng Việt đời thường, mỗi nhân vật hiểu một kiểu. Hình chữ/biểu tượng dễ làm, có thể giữ khác biệt qua giọng và tình huống. Cần đáp án hợp lý, tránh bịa nguồn gốc từ ngữ.
3. **Đố nhanh với hình tự tạo**: tìm điểm vô lý/đếm hình; ưu tiên SVG và chuyển động bằng code. Dễ dựng và kiểm tra, nhưng nhu cầu khán giả chưa có bằng chứng trong mẫu hiện tại; chỉ nên thử sau hai hướng đầu.

Khuyến nghị chọn **hài hội thoại đối chiếu làm hướng chính**, chơi chữ làm hướng dự phòng. Đây là đề xuất BA, chưa phải lựa chọn của người dùng.

## Thử nghiệm nhỏ đề xuất, chưa được thực hiện
Sau khi chọn hướng: 1 bản nháp riêng tư 20–30 giây, 9:16, 1080×1920, tự viết và dùng hình tự tạo; không cần nhạc để giảm phụ thuộc ban đầu. Kiểm tra: tình huống hiểu ngay, chữ đọc được trên điện thoại, phát âm đúng, câu chốt/đáp án rõ, nguồn tài sản ghi đầy đủ. Mốc đầu là kiểm tra adapter P-2 và đoạn giọng ngắn; nếu môi trường không chạy thì báo gap trước render. Chưa ước tính thời gian cố định vì chưa chạy pipeline mới.

## Bàn giao PM / creator-improve
Đã sửa phạm vi từ nghiên cứu gắn P-1 sang P-2 theo yêu cầu trực tiếp, giữ bản P-1 làm dấu vết và sao lưu nguồn sang P-2. Đây là điều chỉnh riêng dự án, không cần thay kit. Chưa có tự review độc lập, kiểm tra khán giả, xem/nghe mẫu đầy đủ hoặc render P-2. Bước tiếp: người dùng review lựa chọn; PM lập plan thử nghiệm đúng hướng, không kế thừa quyền sản xuất P-1. Duy trì phần xác minh trend mới là công việc nghiên cứu còn mở.

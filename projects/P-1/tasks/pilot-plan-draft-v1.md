# P-1 — Kế hoạch thử nghiệm v1, chờ người dùng duyệt

Ngày trình: 2026-10-16, Asia/Bangkok. Căn cứ: tasks/user-clarifications-v1.md (A-002) và research/threads-feasibility-v1.md (A-003). Chỉ bản sao bất biến do agency.py plan đăng ký là kế hoạch trình duyệt. Tài liệu này và nghiên cứu BA không cấp quyền sản xuất.

## Mục tiêu và hướng đề xuất

Thử B — Chuyện đang bàn, hiểu thêm một lớp: 3 video nháp riêng tư, mỗi clip dọc 45–75 giây, tiếng Việt, một chuyện mỗi clip. Mục tiêu kiểm tra nguồn, mức công việc AI làm thay, chất lượng góc riêng và khả năng vận hành lặp lại với chi phí tăng thêm 0 đồng. Đây là kiểm tra khả thi/biên tập, chưa phải thử hiệu quả phân phối.

Khán giả: người trẻ Việt đã được xác nhận; 18–30 là giả thuyết làm việc cho pilot. Chủ đề rộng, không thu hẹp kênh vào một ngách. Đề xuất ba kiểu dẫn tùy chuyện: hài nhẹ, giải thích bối cảnh, đối chiếu hai góc nhìn. Nhận diện hình/giọng nhất quán, không biến mỗi chủ đề thành một kênh khác nhau. Không sao chép gameplay/meme từ mẫu.

## Phạm vi, công cụ và điểm dừng

- Dùng browser Threads người dùng đã đăng nhập, nguồn web chính chủ, hồ sơ agency.py. API Threads chỉ là phương án tương lai, chưa là dependency.
- Sau duyệt, kiểm chứng giọng Việt miễn phí có quyền dùng thương mại và khả năng xuất; bổ sung công cụ nguồn mở từ nguồn chính thức/registry và adapter dựng dọc cục bộ nếu cần. Có thể khảo sát CapCut nhưng chưa coi tài khoản/quota/quyền là đã xác nhận. Mọi bước đòi chấp nhận hợp đồng/điều khoản mới do người dùng thực hiện khi cần.
- Chưa có pipeline Threads/TTS sẵn; FFmpeg không thấy trong PATH và package liên quan không thấy trong hai Python đã kiểm tra. Không render bằng queue adapter hiện tại hoặc ghi kết quả giả.
- Nếu không đạt đường giọng/dựng miễn phí, dừng trước stage phụ thuộc và báo bằng chứng; không tự mua hoặc chuyển paid provider. Có thể bàn giao phần kiểm tra nguồn đã làm, không tự thay mục tiêu video có giọng bằng bản không tiếng.
- Không tạo kênh, đăng/upload (kể cả unlisted), lịch tự động, thuê dịch vụ, gửi tin tác giả, clone giọng người khác, hoặc dùng asset chưa có căn cứ quyền. Chủ đề nhạy cảm/cáo buộc thiếu nguồn không đưa vào 3 draft đầu.

## Thực hiện sau khi được duyệt

Các phiên được thực hiện khi chat đang chạy hoặc người dùng tiếp tục; đây không phải lời hứa agent tự thức dậy hằng ngày.

1. PM/BA, phiên 1: xác minh công cụ/TTS/quyền, dự toán setup trần 6 giờ làm việc chủ động; thử lấy 15–20 ứng viên qua thịnh hành và tìm kiếm. Hai snapshot cùng chỉ số cách 60–120 phút nếu phiên làm việc cho phép. Nếu chưa đủ khoảng đo, ghi thiếu chứ không bịa velocity. Lưu ngày đăng, phát hiện, quan sát trend riêng biệt; chấm và gộp theo chuyện. Chọn một chuyện đủ nguồn/quyền, không cần là bài đăng hôm nay.
2. Content/Production, sau gate công cụ và nguồn: viết, dựng draft đầu 45–75s; hồ sơ nguồn/claim/quyền và lý do cách dẫn đi kèm. Thực hiện trong phạm vi write_content/render_draft nếu người dùng duyệt. Không tạo script ngay từ bản kế hoạch.
3. Phiên 2 và 3 vào hai ngày làm việc tiếp theo có chat hoạt động: lặp lấy nguồn và tạo mỗi phiên một draft; thử đổi cách dẫn phù hợp chuyện, giữ cùng lời hứa kênh. Nếu không có chuyện đủ chất lượng, ghi một phiên không có draft và nguyên nhân; không cố lấp số lượng.
4. Review theo creator-review: kiểm tra đúng ba bản file/hash, nguồn, phân biệt meme/thật/ý kiến, giá trị riêng, quyền và kỹ thuật. Nếu cùng model/chat tự rà thì ghi self-review, không nhận độc lập. PM tổng hợp công việc và chờ người dùng chọn tiếp/dừng/sửa.

## Sản phẩm bàn giao

- 3 bảng sàng lọc nguồn theo phiên, snapshot có thời gian và số đo khả dụng; thiếu dữ liệu ghi rõ.
- Tối đa 3 draft MP4 1080×1920, mục tiêu 30fps, 45–75s; giọng Việt, phụ đề dễ đọc, nguồn trong cảnh/mô tả bàn giao; không upload.
- Mỗi draft có script/storyboard tương ứng, source/rights ledger, biên bản kiểm tra, nhật ký phút AI/người dùng/thời gian máy/chờ, số lượt sửa và chi phí tăng thêm.
- Báo cáo khả thi v2: so sánh kết quả thực với ước lượng, giới hạn, đề xuất nhịp làm tiếp. Không coi render xong là QA đạt, hay QA đạt là người dùng chấp nhận/được phép đăng.

## Tiêu chí chấp nhận pilot

- Đủ 3 draft qua kiểm tra nội dung và kỹ thuật để kết luận mục tiêu draft hoàn thành; thiếu draft là kết quả chưa đạt mục tiêu, dù vẫn có giá trị học được.
- Mỗi clip có ít nhất một đóng góp riêng thực chất (bối cảnh/đối chiếu/nhận định có lý do), không chỉ đọc post và replies. Không có tỷ lệ lời bình bảo đảm YPP.
- Mọi khẳng định kiểm chứng được có evidence ref; phân biệt sự kiện/ý kiến/meme; không dựng sự kiện từ ảnh đùa. Không nói xác định lúc bắt đầu viral khi không có chuỗi quan sát.
- Asset cần dùng có căn cứ quyền/ngoại lệ cụ thể, không đồng nhất ghi nguồn với permission hoặc permission với đủ điều kiện kiếm tiền. Không giữ asset phải xin phép mà chưa có phép.
- Đúng thời lượng/kích thước, phát được từ đầu đến cuối, chữ và dấu Việt đọc rõ trên màn hình điện thoại, âm thanh rõ/không clipping, phụ đề khớp; ghi công cụ và kiểm tra thực sự đã thực hiện.
- Trần tăng chi 0 đồng; mục tiêu sau setup ≤120 phút công việc chủ động/clip, người dùng tham gia ≤15 phút/phiên là giả thuyết kiểm tra, không cam kết. Vượt ngưỡng phải báo và xem lại nhịp. Tách thời gian chờ nguồn/render khỏi công việc chủ động.
- Không đo CTR/retention/doanh thu vì không đăng; không hứa qua YPP, viral hoặc có thu nhập.

## Quyết định cần người dùng

Duyệt hoặc sửa kế hoạch v1: chọn hướng B, 3 phiên chủ động với tối đa 3 draft riêng tư, trần 0 đồng tăng thêm; cho phép viết nội dung và render draft sau khi kiểm chứng công cụ/nguồn/quyền. Duyệt gồm bổ sung adapter/công cụ miễn phí cần thiết trong phạm vi pilot, không gồm dịch vụ trả phí, tạo lịch, liên hệ người khác, tạo kênh hoặc đăng/upload.

Nếu chọn A hoặc C thay B, PM lập kế hoạch phiên bản mới cho phạm vi/tiêu chí tương ứng, không tự diễn giải là đồng ý v1. Nếu chỉ đồng ý nghiên cứu tiếp, quyền sản xuất vẫn chưa được cấp.

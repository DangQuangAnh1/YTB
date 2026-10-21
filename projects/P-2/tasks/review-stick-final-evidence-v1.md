# P-2 — Bằng chứng review cuối nghiên cứu người que

Reviewer: root PM. independent_review cho các báo cáo worker; self_review cho bản tổng hợp do PM viết. Ngày 22/10/2026. Phạm vi quyết định: dùng được làm shortlist ngách và repo để chọn thử nghiệm nhỏ. Không phải market validation, video motion QA hoặc runtime benchmark.

## Target đã đọc
- research/stick-comedy-ba-v1.md + stick-comedy-ba-v2.md (v2 sửa kết luận chứng cứ, v1 giữ 9 ngách/15 ý tưởng/3 pilot)
- research/stick-action-ba-v1.md
- research/stick-explainer-ba-v1.md + stick-explainer-ba-v2.md
- research/stick-comedy-dev-v1.md, stick-action-dev-v1.md, stick-explainer-dev-v1.md
- research/stick-three-formats-pm-summary-v1.md (self-review riêng)

## Findings và đóng finding
F1 comedy v1 nguồn chỉ metadata: đã yêu cầu bổ sung, v2 thêm primary Pencilmation/Newgrounds tác phẩm và Simon’s Cat; phân loại transfer, UGC và claim strength. PM mở lại Phoney Baloney xác nhận credit tách nhiều khâu, không coi bình luận đại diện audience; mở Simon’s Cat history xác nhận câu chuyện mở rộng team. Đóng F1 trong scope research; playback và thị trường VN vẫn chưa xác minh.
F2 explainer benchmark thiên interactive/comic: v2 thêm MinutePhysics danh mục video và RSA creator page, tách direct/adjacent/transfer. PM mở cả hai URL xác nhận danh mục có hai title Using Stick Figures/How To Draw A Stick Figure và RSA ghi chuyển từ speech. Đóng F2 trong scope research; không nâng thành đã xem video hoặc chứng minh audience VN.
F3 action chưa motion playback: không phải lỗi bị che, báo cáo ghi rõ. Chấp nhận như thiết kế/nghiên cứu chứ không choreography teardown. PM đọc lại production Gildedguy và XOI pages như findings vòng đầu.

## Kiểm dev
- Đã đọc cả ba báo cáo đầy đủ; phân biệt timeline, rig, physics, editor/exporter. Mỗi bảng có 7/8/8 repo, top2 có README/LICENSE/source pin links và suitability được ghi suy luận. Không lấy stars để pass.
- PM API snapshot 10 repo lưu SHA/push/archive; pinned license audit 5 repo đọc toàn file. Không audit toàn dependency tree.
- PM mở source stick-motion starter pin 6315c09: có solveLegIK clamp khoảng cách ở line153 và CDN GSAP3.12.5 line89. Xác nhận giới hạn reach và chưa biết license toàn dependencies, không khuyến nghị dùng mù.
- PM mở exporter manifest pin f08e8e3: có Vite4.x peer và ffmpeg/ffprobe installers. Test version compatibility vẫn cần; ngày push cũ không tự chứng minh hỏng.
- PM đọc toàn file local Remotion4.0.536 LICENSE.md tại P1 engine-v1; cùng cấu trúc free/company eligibility đã ghi. Không tự xác nhận entity user eligible, không sửa/copy asset P1.
- Source render không được thực thi. Không benchmark Windows/Node24/IrisXe/font Việt/audio mux. Smoke tests là đề xuất, không phải pass thực nghiệm.

## Kết quả theo scope
Passed: bám một P-2/ba dạng; phân ngách đủ sâu; đủ 45 premise và 9 pilot briefs; sourcing có phân cấp và access limits; mapping repo vào nhu cầu cụ thể; chủ động counterexample/loại repo theo lý do thực; có bước thử tái lập và ghi rõ chưa chạy. Nguồn trọng yếu được PM kiểm theo mẫu, không tuyên bố mọi link đã kiểm độc lập.
Unverified ngoài scope research acceptance: market validation VN, playback của benchmark, runtime/build/render benchmark, audience test, toàn bộ quyền dependency/media. Những việc này còn cần trước kết luận production/market.

## Self-review tổng hợp
Bảng ưu tiên và 27 ngách/45 premise/9 briefs đối chiếu BA; không biến preference thành quyết định user. 17 repo khác nhau trong ba comparison tables; motion-canvas/examples là link hỗ trợ thêm. Kết luận giữ có điều kiện, không hứa viral/ROI, không tự duyệt render hoặc đăng. Links nội bộ được kiểm tồn tại; nguồn external trọng yếu đã mở theo mẫu. PM hài lòng mức research shortlist, không phải đã chứng minh thắng thị trường.

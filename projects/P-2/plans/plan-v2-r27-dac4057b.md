# Plan v2 — hoàn thiện tool convert anime

Nguồn: yêu cầu trực tiếp 20/10/2026 “khoan, đó là ý tưởng. doc lại cho thằng p2 này nhé. còn giờ phải hoàn thiện tool convert anime đã”. Phạm vi: xây adapter nhỏ cần thiết và kiểm chứng trên input4s hiện có, không xây app/kênh, không scout nguồn mới.

1. Lưu ý tưởng Trung Quốc ở backlog riêng.
2. Lấy backend EbSynth CPU từ nguồn chính chủ, lưu ngoài Git, ghi provenance/hash; smoke test 3 frame cùng style/reference hiện có trước. Không dùng CUDA/paid/cloud/upload.
3. Nếu tốt hơn: đóng gói CLI kiểm tra input, versioned output, guides và xử lý sequence; thêm keyframe chỉ khi cần và giữ artifact v1. Nếu xấu: báo benchmark thật và phân tích giới hạn, không gọi output đạt chất lượng.
4. QA geometry/timing/temporal bằng output thực, decoder check, manifest và limitations. Chỉ chấp nhận hoàn thiện chất lượng sau test; không suy từ encode pass. Nếu thiếu backend khả dụng, thử phương án trong cùng tài nguyên; không tự mua GPU/dịch vụ.

Ngân sách tăng0; thử local trên IrisXe; quyền render_draft/write_content/research trong phạm vi converter do yêu cầu trực tiếp này, không publication/account/upload/paid. Tool hoàn thiện có thể cần nhiều phiên nếu chất lượng chưa đạt; checkpoint trung thực.

# T-002 — BA: repo cho Shorts anime AI

Ngày khảo sát: 20/10/2026, Asia/Saigon. Phạm vi nhận từ PM: tasks/ba-anime-repos-v1.md; resume đầu phiên P-2 r6, PM báo đã checkpoint r7 trong lúc BA chạy. Đọc PROJECT.md, creator-ba/SKILL.md, investigate.md. Báo cáo này là nghiên cứu, không là quyết định sản xuất, giấy phép hay benchmark tại máy.

## Kết quả để PM quyết định

**Máy hiện tại phù hợp nhất với anime chuyển động giới hạn bằng code; chưa có cơ sở chọn sinh video AI nặng chạy local làm pipeline chính.** Đã đọc 12 repo chính chủ, LICENSE/model card có liên quan, và metadata GitHub API công khai. Không cài, clone, tải weights, upload, gọi paid API hoặc render.

Kiểm kê bằng Get-CimInstance: Intel Iris Xe Graphics; RAM vật lý khoảng 15,4 GiB. CIM AdapterRAM trả 2.147.479.552 byte; không coi đây là toàn bộ bộ nhớ GPU khả dụng của iGPU. `nvidia-smi` không được tìm thấy trên PATH; không có NVIDIA hiện trong kết quả Win32_VideoController. Chưa benchmark CPU/iGPU hay dò máy khác/cloud sẵn có. Không ghi thông tin định danh máy.

Đối chiếu nguồn: [Wan2.2 README](https://github.com/Wan-Video/Wan2.2#run-wan22) ghi lệnh TI2V-5B 720p cần ít nhất 24GB VRAM; A14B mẫu cần 80GB. ComfyUI có CPU mode và Intel Arc/XPU, nhưng **hỗ trợ Arc không chứng minh Iris Xe chạy được các model này**. RAM dùng chung không thay thế tự động CUDA VRAM.

## 12 repo đã sàng lọc

Giấy phép bên dưới là điều nguồn công bố; cần giữ đúng phiên bản, tài sản và phụ thuộc khi triển khai. Mục “chưa rõ” không đồng nghĩa cấm hoặc cho phép. Không phải đánh giá pháp lý. GPU/RAM là số nhà phát triển nêu, không phải đo local; không có số thì để chưa công bố/đọc thấy, không bịa mức tối thiểu.

| Repo chính chủ | Vai trò, mức hợp anime | Code / weights, thương mại theo nguồn | Phần cứng, phụ thuộc, kết luận P-2 |
|---|---|---|---|
| [ComfyUI](https://github.com/Comfy-Org/ComfyUI) | Điều phối workflow ảnh/video, không tự giữ nhân vật | GPL-3.0; license mỗi checkpoint riêng | Python/PyTorch; có CPU mode, Intel Arc/XPU. Không có VRAM chung cho mọi workflow. Có thể làm hub về sau; chưa chứng minh tốc độ Iris Xe. |
| [Forge](https://github.com/lllyasviel/stable-diffusion-webui-forge) | UI tạo ảnh, quản lý bộ nhớ; anime tùy model | AGPL-3.0; weights SD/Flux/anime riêng, chưa chọn checkpoint | Python/PyTorch/Gradio; không lấy mức VRAM demo NVIDIA làm bảo đảm Intel. Không ưu tiên thêm UI thứ hai ở pilot. |
| [IP-Adapter](https://github.com/tencent-ailab/IP-Adapter) | Conditioning bằng ảnh, hữu ích giữ diện mạo; không khóa tuyệt đối danh tính | Code Apache-2.0; [h94/IP-Adapter model card](https://huggingface.co/h94/IP-Adapter) Apache-2.0. Base model/encoder phải xét riêng; chưa chọn FaceID | PyTorch/Diffusers, encoder CLIP và SD. Chưa có minimum phù hợp Iris Xe. Đáng dùng khi đã có môi trường ảnh hợp lệ. |
| [ComfyUI_IPAdapter_plus](https://github.com/cubiq/ComfyUI_IPAdapter_plus) | Node tích hợp IP-Adapter, không là model riêng | GPL-3.0; weights bên ngoài. Không chuyển license node sang weights | ComfyUI + checkpoint + encoder. Tác giả công bố maintenance-only từ 14/04/2025, rủi ro tương thích. Không chọn làm điểm tựa duy nhất. |
| [ControlNet](https://github.com/lllyasviel/ControlNet) | Điều khiển pose/edge/depth, hỗ trợ bố cục anime; không giữ mặt tự động | Code Apache-2.0; [ControlNet-v1-1](https://huggingface.co/lllyasviel/ControlNet-v1-1) ghi OpenRAIL, không phải Apache. Detectors/base SD xét riêng | Conda/PyTorch/SD, có low-VRAM mode cho 8GB GPU. Chưa chứng minh Intel. Ưu tiên canny/scribble để tránh phụ thuộc pose chưa rà soát. |
| [AnimateDiff](https://github.com/guoyww/AnimateDiff) | Module chuyển model ảnh thành animation; hợp thử phong cách anime với base tương ứng | Code Apache-2.0; [motion weights](https://huggingface.co/guoyww/animatediff) ghi Apache-2.0; base anime/LoRA riêng | PyTorch + SD. README SDXL-beta nêu khoảng 13GB VRAM; không áp cho mọi config. Có flicker và giới hạn chất lượng được tác giả ghi. Chưa phù hợp local này. |
| [Wan2.2](https://github.com/Wan-Video/Wan2.2) | Text/image-to-video; có Animate và speech-to-video riêng | Code Apache-2.0; [TI2V-5B card](https://huggingface.co/Wan-AI/Wan2.2-TI2V-5B) ghi models Apache-2.0. Không tự suy sang mọi finetune/quantization | Torch >=2.4, môi trường GPU, weights lớn; 5B mẫu 24GB, A14B 80GB. Chọn ứng viên video khi có GPU ngoài; chưa chứng minh anime/Việt ở pipeline mình. |
| [HunyuanVideo](https://github.com/Tencent-Hunyuan/HunyuanVideo) | Sinh video; ứng viên so sánh, không chọn cho pilot | [Tencent Community License](https://github.com/Tencent-Hunyuan/HunyuanVideo/blob/main/LICENSE.txt), bao gồm code/weights, điều kiện lãnh thổ và thương mại riêng; không phải Apache/MIT | GPU pipeline; chưa xác minh minimum của cấu hình muốn dùng. Không có benchmark Iris Xe. License và phần cứng tạo thêm việc so với Wan; để sau. |
| [LivePortrait](https://github.com/KlingAIResearch/LivePortrait) | Chuyển biểu cảm/đầu từ driving video sang chân dung; không tự tạo chuyển động toàn thân hoặc khớp tiếng Việt | [LICENSE](https://github.com/KlingAIResearch/LivePortrait/blob/main/LICENSE) MIT cho code nhưng cảnh báo weights InsightFace chỉ nghiên cứu phi thương mại; cần bỏ/thay detector khi dùng thương mại. Chưa audit toàn bộ bộ weights | Torch/CUDA examples, Apple Silicon khác; không có minimum Intel xác minh. Cần driving motion. Không chọn ngay cho anime cách điệu. |
| [MuseTalk](https://github.com/TMElyralab/MuseTalk) | Lip-sync audio vào mặt; hỗ trợ nhiều ngôn ngữ, chưa có bằng chứng test tiếng Việt/anime của mình | README: code MIT và trained model cho cả thương mại; weights phụ thuộc xét riêng; testdata chỉ nghiên cứu phi thương mại | Python 3.10/CUDA, ffmpeg, MMLab. Demo tác giả: RTX3050Ti 4GB, fp16, 8 giây khoảng 5 phút; không phải tốc độ Iris Xe. Chọn ứng viên khẩu hình có điều kiện. |
| [Wav2Lip](https://github.com/Rudrabha/Wav2Lip) | Lip-sync, không dựng anime toàn cảnh | README open-source code/results chỉ personal/research/noncommercial; models LRS2 không dùng thương mại. API thương mại là sản phẩm khác | Python3.6/ffmpeg/deps cũ; không chọn cho kênh hướng kiếm tiền. Không dùng bản demo làm tài sản. |
| [Remotion](https://github.com/remotion-dev/remotion) | Dựng layer nhân vật, camera, miệng, caption, audio; không phải model sinh ảnh/video | [License riêng](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md): miễn phí cá nhân/tổ chức lợi nhuận tối đa 3 nhân viên hoặc đánh giá phi thương mại; trường hợp khác cần company license. Không có weights | Node/React/Chromium; không cần diffusion GPU cho chuyển động code. P-1 có engine/assets đầu ra nhưng P-2 chưa chạy. Ưu tiên kiểm chứng local. |

## Dấu hiệu bảo trì — không dùng stars để chấm chất lượng

Đọc `https://api.github.com/repos/{owner}/{repo}` ngày khảo sát, không token. Tất cả 12 trả archived=false. `pushed_at` dưới đây là lần push repo, **không khẳng định commit mặc định mới nhất hay chất lượng bảo trì**. Ngày UTC, có thể khác ngày Việt Nam gần nửa đêm.

| Repo | pushed_at UTC |
|---|---|
| ComfyUI | 2026-10-20 |
| Remotion | 2026-10-20 |
| HunyuanVideo | 2026-10-08 |
| Wan2.2 | 2026-09-21 |
| LivePortrait | 2026-06-01 |
| MuseTalk | 2025-09-26 |
| Forge | 2025-07-31 |
| Wav2Lip | 2025-06-22 |
| ComfyUI_IPAdapter_plus | 2025-04-14, kèm thông báo maintenance-only trong README |
| AnimateDiff | 2024-07-31 |
| IP-Adapter | 2024-06-28 |
| ControlNet | 2024-02-25 |

Repo cũ vẫn có thể dùng qua integration mới; ngày mới không bảo đảm tương thích. Không kiểm thử issue resolution, supply-chain hoặc tất cả dependency.

## Đào sâu 3 stack để chọn

### A — Ưu tiên hiện tại: hình anime gốc + animation giới hạn + giọng Việt + Remotion

Tạo bộ nhân vật có 3 biểu cảm và layer miệng/tay; dùng chung thiết kế gốc xuyên cảnh. Việc tạo ảnh cần nguồn/công cụ hợp lệ được chọn riêng, không mặc định repo ảnh chạy được trên Iris Xe hay công cụ ngoài miễn phí. Code điều khiển chớp mắt, đổi miệng theo audio amplitude/cue, nghiêng người, camera và hiệu ứng. Đây là hoạt hình giới hạn, không phải sinh chuyển động toàn thân. Có thể dùng giọng hiện có sau khi xác minh quyền/model cho P-2; quyền P-1 không tự chuyển.

Suy luận BA: ít phụ thuộc GPU nhất, chủ động giữ nhân vật, nhịp hài và cảnh 9:16; cần chuẩn bị layer và kiểm soát biểu cảm. Chưa chứng minh render thời gian hợp lý hoặc chất lượng diễn giọng trên máy này.

Test đề xuất 6 giây: 1 nhân vật, 2 biểu cảm, một câu Việt, miệng đóng khi im, 1 camera push. Tiêu chí: hình không nhảy nét, mắt/miệng không lệch, không mất âm, đọc rõ điện thoại; ghi thời gian dựng/render và số lần sửa. Nếu đạt, thử đối thoại 2 nhân vật rồi mới 20–30 giây.

### B — Có GPU ngoài: ComfyUI + IP-Adapter/ControlNet cho ảnh + Wan TI2V-5B + dựng/audio riêng

Ảnh tham chiếu cố định → tạo keyframe theo cảnh → image-to-video từng shot → ghép với audio. Không hứa Wan tự giữ cùng nhân vật xuyên tập hoặc tự nói chuẩn tiếng Việt. Tránh trộn quá nhiều model/LoRA ở test đầu. Chưa chọn base anime, chưa biết license, quota hoặc GPU ngoài có sẵn. Với giới hạn tăng chi 0, đây là phương án **có điều kiện**, không khuyến nghị cài local hiện tại.

Test đề xuất 5–8 giây trên môi trường GPU được xác nhận: một ảnh nhân vật, quay đầu nhẹ, không tay/đạo cụ phức tạp; so 3 output theo giữ tóc/mặt/trang phục, temporal flicker, chuyển động hợp cảnh và thời gian/chi phí thực. Lồng giọng ngoài trước; đánh giá lip-sync ở bài test khác. Không dùng số VRAM của lệnh mẫu như cam kết mọi quantization.

### C — Cần khẩu hình gần mặt: ảnh/cảnh sẵn có + MuseTalk + ghép dựng

Giữ thành phần hình anime tương đối gần khuôn mặt người để detector có cơ hội hoạt động; cần thử trực tiếp, không có chứng cứ đủ để cam kết anime chibi. Các số demo NVIDIA cho thấy lựa chọn nhẹ hơn model video lớn, nhưng **không chứng minh khả năng chạy Intel**. LivePortrait phục vụ chuyển biểu cảm bằng driving video, là nhánh khác, không thay MuseTalk tự động. Wav2Lip bị loại khỏi lựa chọn thương mại open-source hiện tại.

Test đề xuất 8 giây: cùng câu Việt có âm môi b/m/p, một chân dung frontal; kiểm tra detector, khẩu hình, răng/mép, giữ nét anime; tách lỗi giọng khỏi lỗi miệng. Chỉ thử sau khi có môi trường và đủ license phụ thuộc. Không dùng testdata lấy từ Internet trong sản phẩm.

## Khoảng trống và bàn giao PM

Đã hoàn tất nghiên cứu sơ bộ 12 repo và 3 stack. Không có model nào được cài/chạy, không xem/nghe hết demo, chưa kiểm thử tiếng Việt, chưa pin commit/checksum hay dependency license toàn bộ. Hardware kiểm kê chỉ máy hiện tại. Chưa chứng minh thị trường anime Shorts đang hot, chất lượng hài, doanh thu hoặc chi phí mỗi tập. Các số hiệu năng là công bố tác giả, không local benchmark.

Khuyến nghị: PM trình A làm pilot phù hợp máy và chi phí hiện tại; B chỉ mở khi có GPU/quota thực; C là test bổ sung nếu cần khẩu hình. Cần xác định kỳ vọng người dùng: anime có chuyển động giới hạn có chấp nhận không, hay bắt buộc chuyển động toàn thân sinh AI. Không dùng báo cáo làm bằng chứng người dùng đã chọn hoặc duyệt production.

creator-improve tại mốc: phát hiện license code và weights/face detector có thể khác (LivePortrait/InsightFace, ControlNet) đã thể hiện ngay trong bảng; đây là áp dụng quy tắc có sẵn, không cần sửa kit. Báo cáo chỉ ghi outcome, không lưu dữ liệu riêng tư hoặc suy luận nội bộ.

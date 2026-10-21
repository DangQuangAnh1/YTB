# P-2 — Quét repo GitHub sau bản AnimeGANv3 CPU

Ngày 20/10/2026. Yêu cầu trực tiếp: “thử tìm repo khác trên github xem có cái nào hỗ trợ làm kiểu này okie hơn k”. BA chạy tuần tự ở STATE r47 trong scope plan v2 (converter), chia 3 nhóm research song song chỉ đọc README/source/LICENSE/release. Không cài, không tải weights, không chạy code từ xa, không render. Mọi số tốc độ/chất lượng dưới đây là suy luận trừ khi ghi nguồn; chưa có benchmark mới.

## Mốc so sánh

`artifacts/render/animegan-v3-cpu-v1/` (AnimeGANv3_Hayao_36 ONNX, CPUExecutionProvider, 640×360, 100 frame, median 0,90s/frame). Manifest ghi `visual_review: pending`. Nhìn contact sheet (tự xem, không phải review chính thức): hình học tay/dao/đậu và phụ đề giữ đúng chỗ ở 5 frame mẫu; nhìn như filter tranh vẽ hơn anime (thiếu nét sạch và mảng màu phẳng), da sạm/đỏ, emoji đổi màu. Playback/flicker chưa kiểm. EbSynth v2 đã thất bại hình học giữa các keyframe.

Kết luận chung: hướng khả thi nhất là **model từng frame giữ hình học + lọc temporal sau + dán lại phụ đề gốc**. Diffusion cho chất anime thật hơn nhưng chậm và rủi ro RAM, hợp làm keyframe hơn là cả clip.

## Nhóm 1 — Model anime từng frame (thay thế/so với AnimeGANv3)

| Ứng viên | Điểm mạnh với clip nấu ăn | CPU/Intel | Weights | License |
|---|---|---|---|---|
| [AnimeGANv3 Shinkai_37](https://github.com/TachibanaYoshino/AnimeGANv3/releases) | Cùng script hiện có, chỉ đổi model; có thể bớt sạm da | CPU như baseline | 4,04MB ONNX (v1.1.0); v1.0.3 còn H40/H64/Shinkai_40 | Noncommercial |
| [White-box Cartoonization](https://github.com/SystemErrorWang/White-box-Cartoonization) qua [ONNX export](https://huggingface.co/spaces/sayakpaul/cartoonizer-demo-onnx) | Mảng màu phẳng + nét, README có ví dụ món ăn/nội thất/người | ONNX demo code: `providers=["CPUExecutionProvider"]`, chuẩn hóa `/127.5-1`, cắt bội 8, không resize cố định (đã đọc app.py) | `cartoonizer.onnx` ~5,9MB | README: “CC BY-NC-SA 4.0”, cấm commercial (đã đọc) |
| [DCT-Net](https://github.com/menyifang/DCT-Net) — chỉ mạng nền `cartoon_anime_bg.pb` | Không có mặt người thì code trả kết quả mạng nền toàn khung (đã đọc `cartoonize.py`: “No face detected!” → `return res`) | TF frozen graph, `allow_soft_placement`, không ép GPU; cần TF compat.v1 hoặc tf2onnx | ~5,9MB trên ModelScope | Apache-2.0 code; ModelScope ghi “Apache License 2.0” cho model (đã đọc API). Duy nhất cho phép commercial trong nhóm này |
| [Scenimefy](https://github.com/Yuxinn-J/Scenimefy) (ICCV 2023) | Thiết kế riêng cho anime hóa cảnh (Shinkai) | Theo BA: `--gpu_ids -1` → CPU, `map_location` trong code; README không nói CPU | `Shinkai_net_G.pth` ~45,6MB (release v0.1.0), PyTorch | S-Lab License: commercial phải liên hệ tác giả (đã đọc LICENSE.md) |

Loại: VToonify (chỉ video mặt, S-Lab NC); đầu mặt DCT-Net (cần mặt căn chỉnh); CartoonGAN ports (2018, PyTorch 0.3, license weights không rõ); bản WBC ONNX của PINTO (input cố định 720×720 làm méo 16:9); img2img-turbo (không có checkpoint anime, nặng cho CPU); NijiGAN (không thấy code/weights); không tìm được model cảnh 2024–2026 có weights mở.

Tăng tốc Iris Xe: ONNX Runtime DirectML hỗ trợ Intel integrated từ Haswell trên Windows 10 1903+ (tài liệu chính thức, đang sustained engineering). Áp dụng được cho các ONNX ở trên sau khi CPU output đúng; chưa cài provider.

## Nhóm 2 — Giảm nhấp nháy / lan truyền keyframe

Môi trường `.venv-p2` hiện có opencv (có `DISOpticalFlow_create`) và onnxruntime 1.31 CPU; chưa có torch/scipy/VapourSynth (BA kiểm tra chỉ đọc).

1. **Tự viết lọc blend theo flow có mask** (~60 dòng, không cài thêm): DIS flow trên frame gốc, kiểm tra forward-backward, warp frame anime trước rồi blend với frame hiện tại; vùng mask fail (tay/dao chạy nhanh) giữ frame anime hiện tại. Cùng ý tưởng Lai/Bonneel. Rẻ nhất để thử trước.
2. **[vs_temporalfix](https://github.com/pifroggi/vs_temporalfix)** — Apache-2.0. README: sửa “fizzle or wiggly lines” của output AI từng frame; backend `cpu` (rất chậm), `directml` (Windows, hầu hết GPU), Classic chạy CPU. Vùng chuyển động lớn không bị sửa nên tay/dao không bị kéo, nhưng cũng không được làm ổn định. Cần VapourSynth + plugin, là bước cài đặt riêng.
3. **[Deep Video Prior — PyTorch](https://github.com/yzxing87/pytorch-deep-video-prior)** — train U-Net trên chính video, không dùng flow nên không kéo dao. Theo BA: `--use_gpu 0` chạy CPU, không có `.cuda()`. Không có LICENSE (giữ mọi quyền). Ước tính 15–40 phút với L1, nửa độ phân giải, 10 epoch (suy luận).
4. **[Few-Shot Patch-Based Training](https://github.com/OndrejTexler/Few-Shot-Patch-Based-Training)** — train mạng nhỏ từ vài keyframe rồi sinh từng frame độc lập; hợp tay nhanh hơn EbSynth vì không kéo patch. Theo BA chạy được CPU sau khi sửa config `cuda:0`. Không có LICENSE, README khuyên người dùng thương mại tự viết lại. Không chạy các `.exe` dựng sẵn trong `_tools`.
5. [Ezsynth](https://github.com/Trentonom0r3/Ezsynth) — pipeline EbSynth đầy đủ (edge, flow, warp frame trước, chạy xuôi/ngược rồi blend), AGPL-3.0. Sửa đúng điểm yếu cấu hình v2 nhưng vẫn là EbSynth; ưu tiên thấp.

Loại: CoDeF (tiny-cuda-nn), sd-webui-fastblend (CuPy bắt buộc), video-stream-consistency (CUDA 12), All-In-One-Deflicker (atlas, ước tính nhiều giờ CPU), fast_blind_video_consistency (link weights HTTP chưa xác minh được), ReReVST/MCCNet/LinearStyleTransfer (chỉ chuyển style một ảnh, không ra chất AnimeGAN). ffmpeg `deflicker` chỉ sửa độ sáng, `tmix` sẽ tạo bóng ma tay — chỉ dùng làm đối chứng.

## Nhóm 3 — Diffusion chạy trên Intel (chất anime thật hơn)

1. **[stable-diffusion.cpp](https://github.com/leejet/stable-diffusion.cpp)** — MIT, C++ một binary. README: ControlNet SD1.5, LCM/LCM-LoRA, CPU AVX/AVX2/AVX512, Vulkan. `docs/sd.md` có ví dụ img2img `-i … --strength 0.4`. Theo BA: header cho phép init image và control image cùng một lệnh, có `--control-video`, release Windows CPU ~17,7MB; tài liệu quantization ghi SD1.x 512px khoảng 2,0–2,8GB RAM (không nêu phần cứng). Chưa kiểm chứng img2img + ControlNet cùng lúc cho kết quả tốt. Đây là đường duy nhất tìm được có img2img + ControlNet + model lượng tử hóa vừa ~4GB RAM trống.
2. **[FastSDCPU](https://github.com/rupeshs/fastsdcpu)** đào sâu — đã đọc `lcm_text_to_image.py`: ControlNet chỉ dựng ở nhánh không OpenVINO; **OpenVINO không có ControlNet**. OpenVINO img2img vẫn có (optimum-intel), có `DEVICE=GPU`. Model anime mặc định `Disty0/LCM_SoteMix` (repo HF ~16,8GB đủ định dạng, merge nhiều model Civitai không rõ license). Số RAM trong README tự mâu thuẫn (2–4GB vs 9GB).
3. **[openvino.genai](https://github.com/openvinotoolkit/openvino.genai) Image2ImagePipeline** — sample chính thức dùng `dreamlike_anime_1_0`, CPU hoặc GPU. Không có ControlNet; hình học phải dựa vào strength thấp. [dreamlike-anime-1.0](https://huggingface.co/dreamlike-art/dreamlike-anime-1.0) license rõ nhất cho output thương mại (nhóm ≤10 người, không chạy trên web/app).

Loại: openvino_notebooks (notebook ControlNet chỉ txt2img OpenPose; các notebook LCM-ControlNet/T2I-Adapter trả 404), optimum-intel (không có lớp ControlNet), OnnxStack (archived 2025-12-09), Amuse (đóng nguồn, nhắm AMD), Krita AI/dgenerate (PyTorch XPU không hỗ trợ Iris Xe), A1111 OpenVINO (preview, 2023), comfyui_openvino (không nói ControlNet), SDXL anime (quá lớn).

Lưu ý chung: diffusion sẽ làm hỏng phụ đề tiếng Việt — mask và dán lại phụ đề gốc. Iris Xe dùng RAM chung nên không thêm bộ nhớ. Mỗi lần tải model cần xác nhận.

## Đề xuất thứ tự thử (chưa chạy)

1. **Miễn phí ngay:** AnimeGANv3 Shinkai_37/H40/H64 qua script hiện có, 5 frame 0/25/50/75/99, so contact với Hayao_36.
2. **White-box Cartoonization ONNX** cùng stack onnxruntime, 5 frame rồi 100 frame nếu tay/dao giữ đúng. Song song thử **DCT-Net bg** vì là lựa chọn Apache-2.0 duy nhất.
3. **Scenimefy** nếu hai cái trên vẫn không ra chất anime; cần cài torch CPU.
4. Với model thắng: **lọc flow-mask tự viết**, đo flicker bằng sai khác frame liên tiếp so với nguồn và warp error vùng tĩnh (thớt, nồi); vs_temporalfix nếu cần thêm.
5. Nhánh chất lượng cao: **stable-diffusion.cpp CPU**, 1 frame (frame 50) ≤512px, strength ~0,35, ControlNet canny/lineart, LCM, seed cố định, đo RAM peak. Nếu đẹp, dùng làm 5–6 keyframe cho **Few-Shot Patch-Based Training** thay EbSynth.

Mọi bước đều tách phụ đề: mask vùng chữ, dán lại bản gốc sau khi stylize.

## Quyền sử dụng

Chỉ DCT-Net (Apache-2.0), vs_temporalfix (Apache-2.0) và stable-diffusion.cpp (MIT, model riêng) cho phép commercial ở phần code/weights đã đọc. AnimeGANv3, White-box, Scenimefy là noncommercial; DVP và Few-Shot không có license. License model không thay quyền footage: clip ec15pSXc2Qg vẫn chỉ là test kỹ thuật riêng tư, xem `research/copyright-anime-conversion-v1.md`.

## Kiểm chứng và giới hạn

PM tự đọc lại: README/LICENSE White-box, `app.py` ONNX demo, `cartoonize.py` DCT-Net, API ModelScope, LICENSE.md Scenimefy, release AnimeGANv3, README vs_temporalfix, README stable-diffusion.cpp và `docs/sd.md`, `lcm_text_to_image.py` FastSDCPU. Các chi tiết còn lại (ngày push, kích thước file trên API, cờ CPU trong Scenimefy/DVP/Few-Shot, RAM sd.cpp) theo báo cáo BA, chưa đọc lại. Không có benchmark; stars và ngày cập nhật không dùng làm phán quyết chất lượng. Không đổi artifact cũ, kit hay plan.

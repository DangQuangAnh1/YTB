# P-2 / T-003 — Biến video nấu ăn thành anime

Ngày: 20/10/2026, Asia/Saigon. Nhận từ PM yêu cầu người dùng: “kiểu biến 1 video nấu ăn thành 1 video anime chẳng hạn, research”. Resume đầu phiên r9; PM báo brief mới đã đăng ký ở r10. Đã đọc PROJECT.md. Chỉ nghiên cứu và ghi báo cáo, không operational writes.

## Kết luận đúng bài toán

Đây là **video-to-video stylization**: giữ hành động nấu, bố cục, thời điểm và nguyên liệu của footage, đổi cách thể hiện sang anime. Stack talking-head, TTS và text-to-video trong khảo sát trước không trả lời trực tiếp nhu cầu này.

Hai lựa chọn đáng kiểm chứng trước: **Diffutoon** nếu có GPU phù hợp và rà đủ weights; **keyframe anime hóa + EbSynth** nếu muốn bám chuyển động nguồn và chấp nhận chỉnh keyframe. **DomoAI** là đối chứng dịch vụ nhanh, chưa xác minh quota hay quyền thương mại cho tài khoản cụ thể. Không khẳng định lựa chọn nào chạy tốt trên Intel Iris Xe/RAM 15,4GiB của máy hiện tại hoặc miễn phí sản xuất đều. Không có clip nguồn nào được nhận/xem/chạy thử.

## 8 repo/nhánh kỹ thuật đã đọc

Các giới hạn tay/dao/thực phẩm dưới đây là suy luận về failure mode cần test, không phải khẳng định tác giả đã benchmark video nấu ăn.

| Ứng viên chính chủ | Đúng chức năng và bằng chứng code | Code / weights | Phần cứng và quyết định |
|---|---|---|---|
| [Diffutoon trong DiffSynth-Studio](https://github.com/modelscope/DiffSynth-Studio) | [Trang tác giả](https://ecnu-cilab.github.io/DiffutoonProjectPage/) nói rõ realistic-video → anime; có ví dụ Python/notebook thực, không chỉ paper | Historical code Apache-2.0. Sample dùng AingDiffusion_v12, AnimateDiff_v2, ControlNet lineart/tile, annotators và negative embedding; license từng weights chưa audit đủ | Script đặt device=cuda; không thấy minimum VRAM riêng đủ tin cậy. Main hiện tại **không chứa ví dụ Diffutoon**, cần pre-2.0 commit cố định. Ưu tiên có điều kiện GPU. |
| [Rerender_A_Video](https://github.com/williamyang1991/Rerender_A_Video) | PyTorch/WebUI, tạo keyframe rồi propagation/blend. Phù hợp style video giữ cấu trúc | [S-Lab License](https://github.com/williamyang1991/Rerender_A_Video/blob/main/LICENSE.md) chỉ cho noncommercial. SD models/ControlNet/EbSynth có điều khoản riêng | README yêu cầu 24GB VRAM, PyTorch CUDA; Windows cần build dependency. Loại khỏi lựa chọn sản phẩm kiếm tiền theo license hiện tại, giữ làm tham khảo nghiên cứu. |
| [TokenFlow](https://github.com/omerbt/TokenFlow) | Có preprocess inversion và run_tokenflow_pnp.py; README thiết kế cho structure-preserving edit, có thể jitter từ decoder | [MIT code](https://github.com/omerbt/TokenFlow/blob/master/LICENSE); pretrained SD và kỹ thuật edit bên ngoài license riêng. Không có bộ weights “TokenFlow anime” tự động hợp lệ | Sample config cuda, SD2.1, 40 frames; README không nêu minimum VRAM rõ. Là baseline giữ cấu trúc nếu Diffutoon quá đổi chi tiết; chưa kiểm thử Intel. |
| [TemporalKit](https://github.com/CiaraStrawberry/TemporalKit) | Extension AUTOMATIC1111: trích frame/grid, img2img keyframe, EbSynth-process và ghép; không tự là model video | GPL-3.0 code; model ảnh và phần mềm EbSynth riêng. Không được suy GPL thành quyền mọi input/output | Cần ffmpeg, A1111/SD và EbSynth; chưa có minimum độc lập. FAQ thừa nhận smear và đề xuất keyframe sát nhau hơn. Workflow cũ, không lấy hướng dẫn legacy làm bảo đảm chạy trên app EbSynth mới. |
| [jamriska/ebsynth](https://github.com/jamriska/ebsynth) | Thư viện example-based image synthesis, không phải toàn bộ app web/video hiện tại. Repo có code build; cần tự tích hợp propagation/ghép | README công bố code public domain và cảnh báo các thuật toán có thể có patent. Không xác minh phạm vi patent hiện hành; không kết luận pháp lý. Không có neural weights | Không tìm thấy minimum Iris Xe/RAM cho workflow mục tiêu. Đáng hiểu cơ chế nhưng không chọn tự viết pipeline thư viện thay việc kiểm chứng sản phẩm trước. |
| [AnyV2V](https://github.com/TIGER-AI-Lab/AnyV2V) | Edit first frame rồi DDIM inversion/feature injection; có I2VGen-XL, SEINE, ConsistI2V code, không chỉ paper | MIT wrapper; README tự nêu I2VGen-XL thiếu license ở code gốc, SEINE Apache-2.0, ConsistI2V MIT. Weights/base mỗi nhánh phải xét riêng | README nêu 128 frame/16s trên A6000, **không phải minimum**. Có thể đổi nhiều nội dung hơn yêu cầu chỉ đổi phong cách; không chọn đầu tiên khi cần giữ đúng dao/nguyên liệu. |
| [VideoPainter](https://github.com/TencentARC/VideoPainter) | Có infer/edit.sh và inpainting/masked editing; bổ trợ thay vùng chứ không tối ưu bài toán đổi anime toàn clip | [LICENSE](https://github.com/TencentARC/VideoPainter/blob/main/LICENSE) giới hạn academic/research/education; cấm commercial/production, áp dụng cả code và weights. Base CogVideoX và optional FLUX còn điều kiện riêng | Python3.10, CogVideoX-5B-I2V; không thấy minimum chắc chắn, Gradio CUDA. **Loại cho sản phẩm P-2** theo điều kiện hiện tại. |
| [White-box-Cartoonization](https://github.com/SystemErrorWang/White-box-Cartoonization) | Có test_code cartoonize.py và ví dụ Food; inference ảnh, không có temporal consistency chuyên dụng | README CC BY-NC-SA4.0, nói rõ commercial application prohibited. Không chọn dù có vẻ nhẹ hơn diffusion | TF1.x/CUDA legacy; không có benchmark Intel. Frame độc lập có nguy cơ flicker; dùng làm đối chứng phương pháp nghiên cứu, không pipeline kiếm tiền. |

## Chi tiết Diffutoon cần tránh triển khai sai

Nguồn hiện tại trỏ về [historical examples/Diffutoon](https://github.com/modelscope/DiffSynth-Studio/tree/afd101f3452c9ecae0c87b79adfa2e22d65ffdc3/examples/Diffutoon), commit `afd101f3452c9ecae0c87b79adfa2e22d65ffdc3`. Đã đọc README/script qua raw.githubusercontent.com vì web fetch cây thư mục không trả được. Có `diffutoon_toon_shading.py`, bản with_editing_signals, native Python và notebook. Phải dùng code/API đồng bộ phiên bản cũ, không pip bản mới rồi giả định ví dụ cũ chạy.

Không lấy các thông báo low-VRAM cho Wan/Hunyuan/MOSS của framework mới áp lên Diffutoon cũ. Script mẫu tự gọi download_models nếu thực thi; phiên nghiên cứu **không thực thi**. Checkpoint anime AingDiffusion và embedding Civitai trong ví dụ chưa được xác minh license; nên thay/chọn assets có nguồn rõ khi lập pilot. AnimateDiff/ControlNet license đã được ghi ở báo cáo trước nhưng không bao phủ toàn bộ stack.

## Đối chứng phần mềm/dịch vụ hiện tại

### EbSynth hiện tại — khác thư viện repo và legacy desktop

[Trang chính thức](https://ebsynth.com/) mô tả sửa một keyframe rồi lan phong cách sang chuyển động nguồn. Texture propagation là điểm phù hợp bài toán giữ thao tác; phần tạo keyframe có thể làm bằng AI riêng. Không coi propagation là sinh video diffusion. PM đã kiểm tra trên trang hiện hành: Free720p, Pro20USD/tháng cho1080/4K, Studio200USD/tháng/seat có localWindows. Đây là giá công bố ngày nghiên cứu, chưa xác minh tài khoản/thuế/quota. Web xử lý trên server; không mô tả như desktop miễn phí xử lý hoàn toàn local. Trước mọi thử nghiệm cần chọn đúng phiên bản, điều khoản dùng và nơi xử lý; chưa upload gì.

Suy luận: keyframe phải giữ hình dáng tay, dao, miếng thức ăn đúng nguồn để propagation bám; stylization làm thay đổi silhouette mạnh có thể kéo méo/nhòe. Các vùng vừa lộ ra sau che khuất cần keyframe mới. Cảnh cắt phải tách, không propagate xuyên cut. Công cụ không bảo đảm tái dựng đúng mọi nguyên liệu hay chuyển động phức tạp.

### DomoAI — đối chứng nhanh, chưa dùng

[Help chính thức Video to Video](https://help.domoai.app/en/articles/12958715-video-to-video) công bố anime style và giữ motion/audio; khuyên clip3–10s, tối đa10s/lần, credits theo thời lượng, free có watermark. Đây là lời mô tả vendor, chưa benchmark nấu ăn. V6 được mô tả thiên half-body/close-up portrait, nên không mặc định đó là model tốt nhất cho close-up bàn tay/đồ ăn. Chưa chọn gói, chưa kiểm tra free quota, commercial terms hoặc retention dữ liệu cụ thể. Không sử dụng domoapi.com vì không phải nguồn dịch vụ chính chủ đã xác minh.

## Bộ kiểm tra video nấu ăn

Suy luận BA: anime hóa người nhảy không đủ chứng minh anime hóa nấu ăn. Test phải đo **giữ đúng thông tin thao tác** bên cạnh vẻ đẹp:

- Tay và dao: số ngón/điểm cầm, mép dao không biến thành đũa, tiếp xúc với đồ ăn đúng thời điểm.
- Nguyên liệu: loại, màu và lượng không tự đổi; vật nhỏ không biến mất rồi xuất hiện lại; số lần cắt và vị trí miếng phải bám footage.
- Che khuất: tay đi qua bát/dao, vật vừa lộ ra không dính texture cũ hoặc kéo vệt.
- Hơi nước/dầu/nước: vùng trong suốt/nhanh dễ flicker hoặc bị vẽ thành vật thể; tách test riêng sau cảnh đơn giản.
- Camera/cut: giữ bố cục, thời gian, tốc độ thao tác; xử lý từng shot, không dùng một keyframe cho nhiều cảnh khác nhau.
- Chữ/bao bì, logo và âm thanh: không cần AI vẽ lại chữ để đánh giá phong cách; giữ audio nguồn nếu có quyền dùng và so sync.

## 3 hướng và test đề xuất (chưa chạy)

1. **Ưu tiên repo: Diffutoon historical**, chỉ khi có GPU tương thích và weights/giấy phép được chốt. Test3–5s một shot overhead: một tay khuấy bát, ánh sáng đều, camera cố định. Bắt đầu resolution thấp để đo tài nguyên rồi mới tăng; không dùng chất lượng demo ở độ phân giải khác như cam kết. So input/output side-by-side về timing, nguyên liệu, silhouette, flicker và runtime.
2. **Ưu tiên giữ chuyển động: keyframe anime + EbSynth**, test3–5s cùng footage, tạo một keyframe trung tâm và bổ sung tại chỗ che khuất nếu cần. Ghi số keyframe, công sửa, smear, giới hạn output và credits; kiểm tra app hiện tại thay vì mặc định extension TemporalKit tương thích. Khả năng local IrisXe chưa chứng minh; web/service là phương án khác với cần truyền video.
3. **Đối chứng dịch vụ DomoAI**, cùng shot3–5s, cùng mục tiêu phong cách, kiểm tra settings/quota/terms trước nếu sau này được giao test. So thao tác thật và từng frame quan trọng với hai hướng trên; chưa mua gói hoặc upload. Không gọi đây là repo open-source hay lời giải miễn phí dài hạn.

TokenFlow là baseline bổ sung nếu hai hướng chính giữ cấu trúc chưa đủ; AnyV2V chưa ưu tiên. Rerender, VideoPainter, White-box bị loại khỏi đề xuất sản phẩm theo license nguồn đã đọc. Không né điều kiện license bằng fork hay đổi wrapper.

## Nguồn footage và giới hạn hiện tại

Chưa có source video nên chưa đánh giá scene thực, crop, audio, quyền footage hoặc chất lượng đầu vào. Pilot sau này nên dùng footage do người dùng sở hữu/được phép chuyển thể; đổi style không tự tạo quyền dùng video của người khác. Đây là dependency cụ thể cho test, không phải yêu cầu dừng nghiên cứu hiện tại.

Không cài/clone/tải model, render, đăng hoặc gọi API có phí. Chưa có output kiểm chứng, số phút/clip, chi phí/clip hoặc tỷ lệ thành công. Giá/quota dịch vụ cần xem lại khi thử. Không có kết luận dạng này đang hot hoặc dễ kiếm tiền.

## Dấu hiệu bảo trì và kiểm tra thực đã làm

Đọc public GitHub API `repos/{owner}/{repo}`: tất cả8 repo archived=false; pushed_at UTC: DiffSynth2026-10-20; Rerender2024-03-09; TokenFlow2025-02-03; TemporalKit2024-03-13; AnyV2V2024-10-29; VideoPainter2025-04-08; White-box2026-01-19; jamriska/ebsynth2023-06-14. Đây là lần push repo, không bảo đảm hỗ trợ/tương thích. Repo đời cũ cần môi trường riêng và pin version khi triển khai.

Đã đọc README, các LICENSE và một số sample/config, không chạy code ngoài. Một lần in raw Unicode trên terminal lỗi encoding, đã đọc lại dạng JSON ASCII; không ghi nhầm rằng nguồn thiếu. API/nguồn web bị lỗi ở URL đoán ban đầu đã được thay bằng URL chính chủ có chứng cứ tìm kiếm. Không bypass truy cập.

creator-improve: điều chỉnh quan trọng là định tuyến từ tạo anime gốc/talking-head sang giữ chuyển động video nguồn; ghi riêng tại P-2, không sửa báo cáo cũ đã đăng ký hay thay kit. Bước PM tiếp theo: trình đúng shortlist này; chưa cần hứa sản xuất trước khi có nguồn test và môi trường phù hợp.

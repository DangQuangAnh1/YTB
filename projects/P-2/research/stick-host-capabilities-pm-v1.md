# Host kiểm tra cho nghiên cứu repo P-2

Ngày địa phương: 2026-10-22. Kiểm tra trực tiếp bằng PowerShell Get-CimInstance, Get-Command và đọc file package.json.

- Windows; CPU Intel i5-1145G7, 4 cores/8 logical processors.
- RAM 16,527,003,648 bytes (~15.39 GiB); không coi AdapterRAM WMI là dung lượng VRAM riêng chính xác của iGPU.
- GPU Intel Iris Xe. Không tìm thấy GPU NVIDIA qua Win32_VideoController; không mặc định CUDA.
- Node v24.14.0; git 2.41.0.windows.1.
- Python dùng .venv-p2/Scripts/python.exe. python/python3 PATH là Store aliases, không dùng chúng.
- ffmpeg không được Get-Command tìm thấy trên PATH. Chưa kết luận máy không có executable ở nơi khác.
- Có package và node_modules Remotion tại projects/P-1/production/engine-v1; package.json pin 4.0.536 và React 19.2.3. Đây là khả năng tái sử dụng kỹ thuật được suy luận, chưa benchmark renderer người que và không sao chép asset P-1.
- Không install dependency mới, không chạy repo tải về, không render video trong lượt nghiên cứu.

Metadata GitHub độc lập: research/stick-repo-metadata-pm-v1.json lưu pushed_at, archived và head SHA. Pushed_at không đồng nghĩa release ổn định hay repo phù hợp. API license có thể thiếu/NOASSERTION; cần đọc license file. Matplotlib /license trả 404: không suy ra không có license.

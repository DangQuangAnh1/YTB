# P-2 cast v2 — sửa mẫu B theo ảnh mới

Mẫu A giữ nguyên geometry và SVG byte-for-byte so v1. Mẫu B dùng tóc dài tối nâu, phồng nhẹ, rẽ lệch và ôm mặt từ ảnh mới user gửi; thêm khăn len sáng như yêu cầu. Không lấy danh tính, UI, account name, caption hoặc background screenshot. Không lưu ảnhgốc vào repo.

Build: node projects/P-2/production/characters-v2/build.cjs. Render: node projects/P-2/production/characters-v2/render.cjs. Output artifacts/characters/duo-v2. Chỉ reuse dependency/browser local read-only.

Khi ghép video B: CharacterHairBack -> CharacterBody -> CharacterHead -> CharacterScarf. Mũ/tóc trước theo head, tóc sau render dưới body, khăn theo neck/torso. Long-hair silhouette được thu gọn để không nuốt mất tay/thân; body B dang khuỷu nhẹ để rõ nét người que. Head SVG độc lập vẫn bao gồm tóc và khăn. Chưa có full walk-cycle/turnaround test. API/ảnh v1 giữ nguyên, không sửa artifact đã đăng ký.

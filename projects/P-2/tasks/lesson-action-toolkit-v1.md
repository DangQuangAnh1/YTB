# P-2 — Action toolkit installation findings

User explicitly requested installing previously proposed action tools. Cài và smoke test khác với dùng trong phim: MotionCanvas3.17.2 build được, exporter plugin và bundled binaries load được; full MotionCanvas export chưa kiểm. Phim pilot vẫn dùng Remotion đã kiểm, Matter thực sự bake đạo cụ, original analytic IK và duo-v3.

Observed fixes: npm registry không có package fullik (404); GitHub git-dependency fetch bị chậm, chuyển sang tarball codeload cùng exactSHA, install thành công. Fullik package1.3.3 nhưng internalREVISION1.4.0: ghi cả hai thay vì đoán. MotionCanvas vite-plugin cần @motion-canvas/ui dù không tự kéo: thêm pin3.17.2, build1087modules thành công. OpenToonz1.8 official user-local install và CLIversion chạy; không gọi đó là GUIanimationtest. stick-motion originalverify257stance samples pass không thay kiểm heel drift actualfilm.

Scope project-only, không đổi shared skill hoặc bypass failed checks. Evidence tasks/action-toolkit-installed-v1.json; package-lock giữ nguồn pin; binary/repos ngoại bộ và generated dist không đưa Git. Với node/npm setup khác cần test lại. Không thêm hai repo đã hoãn tích hợp do grant chưa xác minh chỉ để gọi đủ bộ.

# Hỗ trợ mã dự án con khi người dùng yêu cầu

- Status: applied
- Origin: yêu cầu trực tiếp P-2 ngày 2026-10-22: tách cả ba nhánh thành 2.1, 2.2, 2.3.
- Scope: shared kit; CLI init/resume, không đổi quyền hoặc schema của dự án cũ.
- Evidence: scripts/agency.py trước sửa chỉ nhận P-[1-9][0-9]*; init chỉ cấp số nguyên.
- Expected / observed: cần hồ sơ riêng P-2.1 nhưng allocator và validator chưa hỗ trợ.
- Baseline: f3375b6; P-2 r74.
- Change: init --parent cấp số con một cấp dưới parent tồn tại; validator nhận mã con; allocator cấp cha bỏ qua mã con. Không tự kế thừa approval.
- Checks: unittest test_agency.py: 38 tests, OK, 1 skipped. Fixture kiểm tra số con, parent thiếu, cấm lồng thêm cấp, quyền độc lập, cấp cha sau khi có con. check P-2/P-2.1/P-2.2/P-2.3 đều valid.
- Adoption: CLI hiện tại dùng được ngay. Resume: python scripts/agency.py resume P-2.1. Công cụ bên ngoài có thể chưa hỗ trợ mã con; chưa kiểm tra chúng.
- Undo: đảo patch scripts/agency.py và tests/test_agency.py chỉ sau khi bảo toàn các hồ sơ con; không xóa dữ liệu dự án.
- Next: tiếp tục BA riêng từng nhánh; chưa khảo sát hoặc render trong lượt tạo hồ sơ.

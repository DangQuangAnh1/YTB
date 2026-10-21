# Hai nhân vật người que P-2 — v1

Nguồn tham chiếu: ba ảnh user cung cấp trong chat, chỉ chuyển dấu hiệu tóc/phụ kiện thành hình học original. Không copy ảnh gốc, background, screen điện thoại hoặc caption ảnh vào repo. Mẫu A mũ ngược kaki và tóc đen rối; mẫu B tóc tối ôm mặt và khăn len sáng. Tên A/B là nhãn tạm.

Chạy từ kit root: node projects/P-2/production/characters-v1/build.cjs rồi node projects/P-2/production/characters-v1/render.cjs. Reuse local Remotion dependency/browser read-only từ P1 engine-v1. Chưa install hoặc gọi provider. Preview.tsx render sheet/transparent PNG và live React components. SVG originals ở artifacts/characters/duo-v1; PNG preview bị gitignore như mọi media.

API Cast.tsx: CharacterHead(id,expression,x,y,scale,rotation), CharacterBody(id,pose), CharacterScarf(). Chỉ id cap/scarf; expression neutral/happy/surprised/deadpan; body idle/wave/hip. Head origin0,0 radius48; torso origin cùng hệ, feet~281. Khăn tách khỏi head để theo cổ/thân, mũ/tóc theo đầu. Scarf asset SVG đơn bao gồm khăn để dùng độc lập. Chưa có full walk-cycle/turnaround/animation integration test; không nhận mọi pose đã kiểm.

Giữ palette/geometry dấu hiệu cố định trong cast.cjs khi đổi expression, không sinh lại bằng prompt theo từng cảnh. User xem mẫu đầu trước khi chốt nhận diện cho cả series. Không sửa pilot cũ hoặc push GitHub tự động.

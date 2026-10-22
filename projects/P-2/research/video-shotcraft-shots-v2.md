# video-shotcraft đợt 2: cảnh quay, góc máy và chuyển động cho video người que (22/10/2026)

Tiếp nối `video-shotcraft-v1.md`. Lần này đã **render thật** 19 demo phù hợp bằng runtime Remotion 4.0.536 của P-2 (repo ghim 4.0.484): cả 19 chạy được, mỗi demo 4–14 giây ở nửa độ phân giải. Như vậy demo tương thích với runtime của ta trên máy này. Công cụ: `projects/P-2/production/shotcraft-study/` (`render.cjs`, `demos.txt`, `sheets.py`). Video và bảng khung hình nằm ngoài repo ở `~/p2-out/shotcraft-demos/` (`sheet-1..4.jpg` lấy 10 frame đều; `dense.jpg` lấy frame dày quanh các cú va chạm). Đây là xem các frame lấy mẫu, chưa xem phát liên tục; các nhận định "hợp/không hợp" là ước tính chủ quan.

## Điều quan trọng nhất: "camera" của repo là 2,5D

Mọi chuyển động máy trong demo đều là biến đổi CSS (translate/scale/rotateX/Y, perspective) trên **các lớp phẳng**. Không có cảnh 3D thật. Điều này **khớp** với P-2: nhân vật của ta là nét 2D vẽ từ khớp xương, camera hiện tại cũng là biến đổi trên một lớp. Vì vậy mọi cú zoom, rung, cắt, chia khung, chuyển cảnh và hiệu ứng va chạm đều chuyển sang được. Các kiểu xoay lớp 3D (bullet-time, Kanada) áp lên người que phẳng sẽ trông như **tấm bìa bị nghiêng**, không phải góc máy mới.

Muốn có **góc máy thật** (3/4, góc thấp nhìn lên, từ trên xuống, xoay quanh nhân vật) thì repo không giúp được. Nhưng dữ liệu CMU của ta vốn là 3D (BVH): `soft-line-motion-v2/mocap2d.cjs` hiện chiếu cố định về góc ngang. Thêm tham số góc chiếu (yaw/pitch) có thể cho ra **cảnh chèn ngắn ở góc khác** của cùng một động tác. Riêng bộ giải điểm chạm `fight.cjs` thì đang làm trên 2D. Đây là giả thuyết, chưa thử.

## Bảng: kiểu cảnh → áp vào trận đánh

Thời lượng lấy từ thẻ (30fps); "Nhìn thấy" là điều đã thấy trong frame render; "Áp vào" là đề xuất.

### Hiệu ứng va chạm (dùng cho từng đòn)

| Kiểu | Nhìn thấy | Áp vào người que | Độ khó |
|---|---|---|---|
| `anime-impact` | f30–32 zoom gấp có nhòe chuyển động, f34–36 âm bản đen trắng + đường tập trung, f37 sạch lại | Đòn kết liễu: 3 frame âm bản trùng frame tiếng đòn. **Chỉ một lần mỗi video** | Thấp |
| `hit-counter` | Hit-stop 2f toàn cục, combo ×1→×3 to dần, số bay lên | Chuỗi 3 đòn liên tiếp; số "sát thương" có thể thay cho thanh máu | Trung bình |
| `score-slam` / `impact-burst-kit` | Vật rơi từ scale 2,6 trong 6 frame, vòng sóng + bụi + rung cùng frame | Cú tiếp đất sau cú nhảy; chữ "K.O." đập xuống | Thấp |
| `riso-misregistration-hit` | Chữ tách hai lớp màu rồi khớp lại "cạch" | Chữ tên đòn hoặc "BLUE WINS" | Thấp |
| `kanada-perspective-snap` | Vật quăng vào từ phối cảnh rất nghiêng, 18f, vượt đà rồi bật phẳng, có đường tập trung | Nhân vật hoặc tiêu đề lao vào khung (chỉ nên dùng cho chữ, xem lưu ý 2,5D) | Thấp |

### Góc máy và chuyển động máy

| Kiểu | Nhìn thấy | Áp vào người que | Độ khó |
|---|---|---|---|
| `crash-zoom-punch` | Zoom 6f lên 2,4–2,8 lần, dừng có rung 14px tắt dần (hoặc vượt đà 3–6%) | Đòn trúng mạnh; thẻ khuyên tối đa 2 lần mỗi video | Thấp (đã có zoom keyframe) |
| `pull-back-isolation` | Từ cận cảnh kéo lùi, mọi thứ xung quanh tắt dần, nền chìm vào tối | Kết: BLUE đứng một mình, RED nằm mờ dần | Thấp |
| `bullet-time-freeze-orbit` | Đóng băng giữa chừng, mặt phẳng xoay 55° rồi về | Với người que phẳng chỉ ra hiệu ứng "tấm bìa nghiêng". Bullet-time thật cần chiếu lại từ 3D | Cao nếu làm thật |
| `jump-cut-punch-in` | 3 lần nhảy cắt cứng phóng to dần cùng một bố cục | Khoảnh khắc trước đòn quyết định (mặt → nắm đấm → mắt) | Thấp |
| `paparazzi-flash` | 3 lần nháy trắng, mỗi lần cắt sang một vùng khác của cùng hình (toàn → vừa → cận) | Đóng băng tư thế thắng: 3 tấm "ảnh chụp" | Thấp |

### Nhịp dựng và cấu trúc shot

| Kiểu | Nhìn thấy | Áp vào người que | Độ khó |
|---|---|---|---|
| `trailer-bumper` | 3 cảnh × 9f cắt cứng, 6f đen im lặng, rồi tiêu đề | Hook 1 giây đầu: chiếu trước 3 khoảnh khắc đẹp nhất của chính trận. Frame 0 của The Final Counter hiện là màn đen | Thấp |
| `versus-slam` | Hai nửa khung cắt chéo lao vào nhau, khi chạm thì nháy trắng + rung + dấu "VS" đóng mạnh | **Mở đầu RED vs BLUE**: mỗi nửa là một võ sĩ. Thẻ ghi chỉ dùng khi thật sự có hai phe đối đầu, rất hợp | Thấp |
| `comic-panel-split` | Ba khung chéo của cùng một chủ thể (toàn/cận/cực cận) bật ra liên tiếp, khung cuối phủ kín màn hình | Lúc đòn trúng: 3 cách cắt (crop) của cùng frame render, rồi trở lại toàn cảnh | Trung bình |
| `sakuga-timing-shift` | Chạy "on threes" (dán nhãn "ON 3s"), khung va chạm có đường tập trung, rồi mượt từng frame ("ON 1s") | Lao vào trước đòn kết: giật kiểu tranh vẽ tay rồi mượt hẳn. Thẻ ghi không dùng chung với slow motion/hit-stop trong cùng một cảnh | Trung bình (đã có remap frame) |
| `quad-split-parallel-scenes` | Chia 4 ô, mỗi ô một cảnh nhỏ lệch nhịp 3–6f | Recap cuối hoặc "4 trận một lúc" cho video tổng hợp | Trung bình |

### Chuyển cảnh (khi video có nhiều shot)

| Kiểu | Nhìn thấy | Áp vào người que |
|---|---|---|
| `invisible-cut` | Một vật lớn bị nhòe quét ngang sát ống kính, cắt cảnh ẩn sau nó | Cắt giấu sau nắm đấm hoặc thân người lao qua sát máy |
| `light-leak-burn` | Vệt sáng ấm quét chéo, cắt cảnh ở đỉnh sáng | Đổi bối cảnh (ngày/đêm, đấu trường mới) |
| `glitch-displace` | 16 dải ngang lệch rồi cắt cứng | Cảm giác "game", chuyển sang hiệp sau |
| `portal-wipe` (mask-wipe) | Một ô phóng to thành cửa sổ, cảnh mới mọc ra từ trong | Ít hợp; dùng cho intro kiểu thẻ nhân vật |

### Không hợp

`exploded-view`, `cursor-flyover`, `terminal-3d`, các thẻ UI/dashboard/data, `spotlight-hero-card` (giao diện sản phẩm), `tilt-reveal` (mặt phẳng trang web).

## Quy tắc dựng nên chép theo

Rút từ các thẻ và `aesthetic-rules.md`, đã lọc cho video đánh nhau:

- **Một người điều khiển thời gian mỗi cảnh**: hit-stop, slow motion, sakuga, speed-ramp loại trừ nhau trong cùng một cảnh, nếu không sẽ trông như lỗi.
- **Rung/đập toàn khung tối đa 3 lần mỗi video** (R4). Âm bản anime tối đa 1 lần. Zoom gấp tối đa 2 lần.
- **Va chạm phải cùng frame với tiếng**: khung âm bản không có tiếng trông như lỗi hình.
- **Giữ yên sau khoảnh khắc chính**: tiêu đề/chữ thắng giữ ≥1 giây, kết thúc một loạt động tác giữ 0,5 giây (R1, R2).
- **Bước nhảy đủ lớn**: chạy "on threes" mỗi bước phải dịch ≥30px, không thì trông như máy lag.
- **Biên độ rung đủ thấy**: 6–16px tắt dần theo hàm mũ; >20px trông như lỗi.

## Khung cho một short 15 giây (đề xuất, chưa dựng)

Dựa trên `promo-energy-arc` nhưng đổi cho trận đánh, đúng các động tác P-2 đang có:

| Giây | Cảnh | Thẻ |
|---|---|---|
| 0–0,9 | Hook: 3 khoảnh khắc mạnh nhất, 9f mỗi cái, 6f đen | `trailer-bumper` |
| 0,9–2 | RED vs BLUE lao vào nhau, dấu VS | `versus-slam` |
| 2–6 | Trao đổi đòn (đã có): né, đỡ chéo tay, cú đấm đầu tiên có zoom gấp | `crash-zoom-punch` (lần 1) |
| 6–8,5 | Cú đá trên không bị đỡ, chia khung 3 crop | `comic-panel-split` |
| 8,5–9,5 | Lao vào: on threes → on ones | `sakuga-timing-shift` |
| 9,5 | Đòn kết liễu: 3f âm bản + đường tập trung + rung | `anime-impact` (lần duy nhất) |
| 9,5–12 | Bay văng, nằm (đã có) | — |
| 12–15 | BLUE thắng: 3 tấm ảnh nháy trắng, kéo lùi cô lập, giữ ≥1s, nối vòng lặp | `paparazzi-flash` + `pull-back-isolation` |

## Đề xuất bước tiếp (chưa làm)

1. **Thử nhỏ nhất**: bản `final-counter-v2` (đường dẫn mới), đem đúng `AnimeImpact` (3 frame) vào đòn kết và `VersusSlam` vào phần mở đầu; render các frame quanh hai chỗ đó để so với v1.
2. **Thẻ cho Stick-Fight Director**: viết `capabilities.json` gồm thẻ động tác (từ clip mocap) và thẻ cảnh/chuyển cảnh (từ bảng trên), mỗi thẻ có thời lượng, giới hạn số lần dùng và cặp loại trừ.
3. **Thử góc chiếu 3D**: thêm tham số yaw/pitch vào `mocap2d.cjs`, xuất một clip đấm ở góc 3/4 và góc thấp để xem cảnh chèn có dùng được không.

Giấy phép: code demo Apache-2.0 (giữ LICENSE và ghi file đã sửa khi chép vào P-2). Remotion theo giấy phép riêng.

## Kết quả thử (23/10/2026, người dùng: "Làm 1 và 2 xem sao")

### Thử 1: `final-counter-v2` (VS mở đầu + khung đòn anime)

`projects/P-2/production/final-counter-v2/`, đầu ra `~/p2-out/final-counter-v2/final-counter.mp4`: 960 frame, 16,000 giây, giải mã toàn bộ đạt, render 87,7 giây, cả `build.sh full` khoảng 1 phút 50.

- Màn VS (frame 0–59): frame 0 có tiêu đề "THE FINAL COUNTER" nên không còn màn đen. Hai nửa lao vào, chạm nhau ở frame 28 kèm nháy trắng, rung, dấu VS và tiếng va chạm, rồi cắt cứng vào trận. Nhìn thấy rõ trong frame 0, 16, 28, 34, 59.
- Khung anime (frame 627–632): âm bản, tách màu đỏ/xanh, đường tập trung đổi hình mỗi 2 frame, frame 633 trở lại màu. Lần thử đầu đường tập trung gần như vô hình vì nền đã thành trắng; đã đảo màu nan so với demo.
- Chuyển từ 30fps sang 60fps: nhân đôi số frame của demo để giữ đúng thời lượng (3 frame ở 30fps = 6 frame ở 60fps).
- Chưa làm: âm thanh chưa ai nghe; dấu VS che tay thủ của RED; rung ở đòn kết của v1 (26px) vẫn vượt ngưỡng 20px mà thẻ khuyên.

### Thử 2: góc máy từ mocap 3D (`camera-angles-v1`)

`mocap-cam.cjs` (phát triển từ `mocap2d.cjs`) thêm yaw/pitch/phối cảnh. Ở yaw 0, pitch 0 kết quả **trùng khớp tuyệt đối** với clip của v1. Đã chiếu cú đấm 144_20 và cú đá 135_07 từ 6 góc (`~/p2-out/camera-angles-v1/angles.mp4`, ảnh `stills/angles-sheet.jpg`). Nhận định theo ảnh tĩnh, chủ quan:

| Góc | Kết quả với người que |
|---|---|
| 3/4 (yaw 40°) | Gần như giống góc ngang: người que không có độ dày thân/vai nên không lộ góc. **Không đáng làm** |
| Gần chính diện (yaw 75–85°) | Cú đá vòng cầu thành đường quét ngang rất mạnh, **dùng được**. Cú đấm vào ống kính **không đọc được**: tay co lại gần như còn một điểm sau đầu |
| Góc thấp (pitch −24°) | Cú đá cao thành chân dựng thẳng lên trời, khá ấn tượng. Cú đấm gần như góc ngang |
| Góc cao (pitch 48°) | Người que bị dẹt, nhìn như đang ngồi xổm; diễn viên di chuyển theo chiều sâu làm chân rời khỏi vạch đất. **Kém** |
| Sau lưng (yaw 150°) | Dáng người khác hẳn, hợp làm cảnh qua vai trước đòn. **Dùng được** |

Đã sửa trong lúc thử: mặt đất khi có pitch chỉ tính trong đoạn cắt (toàn bộ trial làm nhân vật lơ lửng); thứ tự tay/chân theo độ sâu; nét và đầu phóng to theo phối cảnh.

Giới hạn còn lại:
- Đầu luôn vẽ sau cùng, chưa xếp theo độ sâu.
- Chưa có hình nắm đấm để phóng to khi đấm vào máy.
- Góc khác chỉ dùng được cho **cảnh chèn ngắn của một người**: bộ giải điểm chạm `fight.cjs` vẫn chỉ làm trong 2D, nên hai người ở góc khác sẽ không chạm đúng nhau.

### Bước tiếp gợi ý

1. Nghe và xem v2. Nếu ổn, thêm `comic-panel-split` lúc đỡ đòn, dùng 3 khung: ngang, chính diện, sau lưng (lấy từ thử 2).
2. Cảnh chèn một người: cú đá ở góc gần chính diện hoặc góc thấp, chèn 0,3–0,5 giây trước đòn đá bị đỡ.
3. Nếu cần cảnh đấm vào ống kính: vẽ riêng một nắm đấm tròn có phối cảnh, và xếp đầu theo độ sâu.

# User request: more background clips, fewer repeats (2026-10-21)

While the Pt.3 drafts were rendering, the user wrote:

> nhưng mà video nền chúng mình chỉ có vài video đó lặp đi lặp lại thôi à b

The PM confirmed the facts:
- The hai_v2 pool has 6 Pexels clips, mostly cooking plus sky.
- A ~70s video cuts every 4–6.5s, so it cycles the pool about twice.

The PM proposed adding 15–20 free vertical clips. The user answered:

> nền nào cũng được nghĩa là ko dính bản quyền và ít lặp lại trong video hơn
> (Pt.3) Giữ Pt.3 như hiện tại

Scope:
- **Clips:** any category, free-license stock only (Pexels License: free commercial use, no attribution). No game footage or other channels' footage.
- **Goal:** no clip repeats within one video. The pool should be at least as large as the number of cuts in a typical video (~14).
- **Pt.3 drafts** (release-20-v1, release-21-v1) keep their current backgrounds.
- **Download:** the PM lists the exact files (name, source, size) and gets the user's go-ahead before downloading. Media stays out of Git, with provenance recorded.

## Approved download (2026-10-21 ~22:40 ICT)

The PM listed 20 Pexels clips: names, `videos.pexels.com` 1080×1920 file URLs, and sizes of about 400 MB in total. The clips cover night city, ocean, cats, paint mixing, aquarium, neon/bokeh and chocolate. None shows faces or children. A calico-in-sunlight clip (84 MB) was dropped for size. The user chose:

> Tải cả 20 clip (Recommended)

Plan:
1. Download into `media/library/backgrounds/_incoming-2026-10-21/`.
2. Re-encode each clip to H.264 1080×1920, at most 30 s, with no audio.
3. Keep only the compressed copies. Record provenance (landing page, file URL, license, sha256 of the original and of the kept file).
4. Add the clips to the hai_v2 pool.
5. Make the engine avoid repeating a clip within one video.

The list is in the scratchpad file `bg_files.txt` and is copied into the provenance file.

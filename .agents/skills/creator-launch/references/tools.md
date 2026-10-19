# Launch tools (researched 2026-10-17; stars, push dates and licenses from the GitHub API)

Recheck licenses and platform rules before a real launch. They change.

| Need | Adopt now | Later / optional | Skip (why) |
|---|---|---|---|
| Logo, avatar, banner | Our own SVG marks in Remotion stills (`src/brand.tsx`, `src/marks.tsx`); tabler-icons (MIT) or lucide (ISC) glyphs; OFL fonts; Penpot (MPL-2.0) or Inkscape for hand edits | vtracer (MIT) to vectorize a sketch; local image models only with a GPU and a commercial license (FLUX.1-schnell, Z-Image-Turbo, Qwen-Image: Apache-2.0) | logoly (joke style); logocreator and logo-generator-skill (paid API keys, no license file); FLUX.1-dev and sdxl-turbo (non-commercial terms) |
| Outro / end card | Remotion `Outro` in engine-v1 (2–3s, baked into the video); Remocn (MIT) text reveals | reactvideoeditor/remotion-templates `end-card.tsx` / `subscribe-reminder.tsx` (MIT per README; relayout to 1080×1920); Lottie via @remotion/lottie, with each file's license recorded | Motion Canvas (a second engine) |
| Cover / thumbnail | Remotion stills at 1080×1920; one cover frame held inside the video, because the TikTok API only picks a frame | Shorts custom thumbnails: desktop Studio, verified account, 9:16 at 2160×3840 recommended | AI thumbnail repos (paid keys) |
| Packaging | `references/packaging.md`; borrow the AgriciDaniel/claude-youtube seo and shorts playbooks (MIT); coreyhaines31/marketingskills copywriting (MIT) | AI-disclosure flags: YouTube `containsSyntheticMedia`, TikTok `is_aigc` | — |
| Upload (needs explicit authorization) | Manual upload in the official apps | porjo/youtubeuploader (Apache-2.0, official API) or google-api-python-client; Postiz (AGPL, self-hosted, official APIs) if TikTok audits the app | social-auto-upload, TiktokAutoUploader, tiktok-uploader (browser automation conflicts with YouTube/TikTok terms); youtube-upload (stale) |

## Platform facts (V = official docs)

**YouTube**
- End screens need videos of at least 25s and are absent on Shorts (I). Bake the outro into the video and set the "Related video" link by hand in Studio.
- Links in Shorts descriptions are not clickable (V).
- Uploads have had their own quota since 2026-06-01: 100 uploads/day by default (V).
- Older docs say unverified API projects upload as private, but the current reference conflicts with that. Test with one private upload.
- OAuth apps in "Testing" status get refresh tokens that expire after 7 days (V).

**TikTok**
- Posts from unaudited apps are private-only (V).
- Captions can be up to 2,200 characters (V).

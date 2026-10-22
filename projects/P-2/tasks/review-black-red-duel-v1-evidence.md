# Self-review — Black / Red duel v1

Reviewer: same agent that authored/rendered the draft; **self_review**, not independent review. Target: `artifacts/render/black-red-duel-v1/draft.mp4`, 15.000s, H.264/AAC, 1280×720, 30fps, 450 decoded video frames.

Actual encoded contact sheet inspected through image viewer: frames 0,38,66,74,91,105,120,133,148,168,192,220,244,263,286,320,351,380,415,449. Black/red identities remain legible, full body/feet inside frame, shared fist/guard contacts visible, low sweep and airborne red kick discernible, ending guards lower and fists bump. Deliberate translucent trails and lighter rear limbs are effects/depth, not extra actors. Minor overlap at the close block around frame244 is present; the adjacent poses retain both identities. Sample coverage is not a proof about every intermediate pose or real-time rhythm.

Final MP4 opened in browser at `http://localhost:8766/draft.mp4`: DOM reports duration15,width1280,height720,readyState4,pausedfalse,currentTime4.43; visible frame shows red airborne and black recovering. This verifies actual playback begins, not continuous human viewing/listening of all15s.

Numeric check executed on all450frames/3600limbs: finite joints, segment length error ~1.14e-13, maximum target residual ~2.55e-13. Five authored contact frames have zero computed distance. Out-of-order pose sampling is deterministic. These checks validate geometry/target mapping, not expressive animation or weight. All plain feet and hands remain reachable after pre-registration corrections; no error was waived by claiming a clamped target was a contact.

Full final MP4 decode with existing full FFmpeg7.0.2 returns0, stderr empty. FFprobe confirms video450frames/15.0s/30fps/1280×720. Final AAC decoded to720896mono samples at48kHz, finite, peak0.42918,RMS0.02325; numeric output is non-silent without numeric clipping. Foley is synthesized from shared hit frame events, not borrowed audio. Perceptual alignment/mix quality and continuous listening remain **unverified**.

Brief alignment: actual new original short black/red two-person sparring film delivered, with red rush/black block, low sweep, red hop/kick, counter-punch/block, simultaneous fists and friendly bump. Current user requested the creator to select content and produce roughly15s. The plain black/red cast is a scoped user override for this test only. No publishing, paid-provider calls or reference-footage reuse occurred.

Verdict: technically decodable draft ready for user viewing; overall review remains **unverified** because continuous audiovisual judgment is missing. User creative acceptance is pending. This report does not repeat the prior mistake of equating IK/decode/sample passes with a good fight scene.

# Voice replacement audition — 2026-10-16
Decision: replace Piper voice rejected by the user. Source: tasks/voice-feedback-v1.md. No spending authorized; private sample audition only.
Primary sources checked live:
- https://github.com/pnnbao97/VieNeu-TTS : latest open-source line is v3 Turbo, CPU/ONNX supported; SDK voice list authoritative; style parameter ignored. Proprietary v4 not selected.
- https://pypi.org/pypi/vieneu/json : latest at check 3.8.3, official project link pnnbao97/VieNeu-TTS. Installed in isolated cache environment, no change to existing Piper runtime.
- https://huggingface.co/pnnbao-ump/VieNeu-TTS-v3-Turbo : model revision observed 61b85e3d937fbbacb387714180e8182823512523. Model card Usage Rights & Licensing FAQ says Apache-2.0 covers weights, ONNX and bundled presets; generated preset audio can be used commercially without extra fee; publisher states speakers/rightsholders granted consent. This records the publisher's representations, not an independent legal audit. Built-in presets only; no custom reference or impersonation.
- https://fpt.ai/try-for-free/ : free trial via account. Not selected for this immediate no-account local audition.
- https://viettelai.vn/en/chuyen-giong-noi : free try mentioned. Not tested/connected; no claim of working automated export or commercial free quota.
Choice: generate three different VieNeu built-in presets against identical narration, not pitch-shift the rejected voice. No music or sound effect, to expose pronunciation and cadence. Actual generation/decoded audio metrics in artifacts/audio/voice-audition-v1/manifest.json and qa.json when available.
Limitations: model descriptions/quality claims are vendor claims until tested here. Human listening decides voice quality and creative fit. Samples do not select a final channel voice, authorize release, or solve source-post rights.

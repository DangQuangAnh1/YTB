"""Optional real local encoder integration, using synthetic scripts/audio only."""
import importlib.util
import json
import math
from pathlib import Path
import struct
import sys
import tempfile
import unittest
import wave

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))
import agency
import render_queue

AVAILABLE = bool(importlib.util.find_spec("PIL") and importlib.util.find_spec("imageio_ffmpeg"))


@unittest.skipUnless(AVAILABLE, "Optional render dependencies not installed")
class Renderer(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        info = agency.initialize(self.root, "Encoder test", "Synthetic local adapter test")
        self.pid, self.project = info['project_id'], Path(info['path'])
        plan = self.project / "test-plan.md"
        plan.write_text("Synthetic integration test only; not a human content approval")
        agency.update(self.root, self.pid, 1, "plan", file=str(plan))
        agency.update(self.root, self.pid, 2, "decision", decision="approve", source_ref="fixture:test-only",
                      excerpt="Synthetic integration fixture", allow=["write_content", "render_draft"])
        script = self.project / "artifacts/script.json"
        script.parent.mkdir()
        script.write_text(json.dumps({"title": "Queue test", "scenes": [{"kind": "queue", "caption": "A local encoder smoke test.", "seconds": 1}]}))
        agency.update(self.root, self.pid, 3, "artifact", file="artifacts/script.json", kind="script")

    def test_silent_draft_decodes_and_is_not_marked_qa_passed(self):
        result = render_queue.render(self.root, self.pid, "A-001", 4)
        self.assertTrue(Path(result['video']).is_file())
        self.assertEqual(result['manifest']['full_decode_exit_code'], 0)
        self.assertTrue(result['manifest']['silent'])
        state = agency.load_state(self.project)
        self.assertEqual(state['acceptance'], 'not_reviewed')
        self.assertEqual(state['release'], 'not_requested')
        self.assertEqual(state['artifacts'][1]['inputs'], ['A-001'])

    def test_supplied_test_tone_is_muxed_but_not_called_narration_review(self):
        path = self.project / "artifacts/tone.wav"
        with wave.open(str(path), 'wb') as handle:
            handle.setnchannels(1)
            handle.setsampwidth(2)
            handle.setframerate(16000)
            handle.writeframes(b''.join(struct.pack('<h', round(1000 * math.sin(2 * math.pi * 440 * i / 16000))) for i in range(16000)))
        agency.update(self.root, self.pid, 4, "artifact", file="artifacts/tone.wav", kind="audio")
        result = render_queue.render(self.root, self.pid, "A-001", 5, audio_id="A-002")
        self.assertFalse(result['manifest']['silent'])
        self.assertEqual(result['manifest']['audio_review'], 'unverified')
        self.assertEqual(result['manifest']['full_decode_exit_code'], 0)

    def test_new_plan_blocks_rendering_even_with_old_script(self):
        path = self.project / "new-plan.md"
        path.write_text("New scope, pending")
        agency.update(self.root, self.pid, 4, "plan", file=str(path))
        with self.assertRaises(agency.AgencyError):
            render_queue.render(self.root, self.pid, "A-001", 5)
        self.assertFalse((self.project / "artifacts/render").exists())


class ScriptShape(unittest.TestCase):
    def test_duration_and_supported_format_are_bounded(self):
        for value in [
            {"title": "Bad", "scenes": [{"kind": "external", "caption": "No", "seconds": 1}]},
            {"title": "Bad", "scenes": [{"kind": "queue", "caption": "No", "seconds": True}]},
            {"title": "Bad", "scenes": [{"kind": "queue", "caption": "No", "seconds": 30}] * 5},
            {"title": "Bad", "scenes": [{"kind": "queue", "caption": "No", "seconds": 1, "url": "unsupported"}]},
        ]:
            with self.subTest(value=value), self.assertRaises(agency.AgencyError):
                render_queue.script_contract(value)


if __name__ == '__main__':
    unittest.main()

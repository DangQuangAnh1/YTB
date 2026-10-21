"""Record/authorization invariants using synthetic fixtures, not model behavior evals."""
from concurrent.futures import ThreadPoolExecutor
import json
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))
import agency


class Records(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.id = agency.initialize(self.root, "Synthetic pilot", "Create a reviewed local draft")['project_id']
        self.project = self.root / "projects" / self.id

    def state(self):
        return agency.load_state(self.project)

    def test_child_projects_are_independent_and_do_not_break_allocation(self):
        first = agency.initialize(self.root, "Comedy", "Child scope", parent=self.id)
        second = agency.initialize(self.root, "Action", "Other scope", parent=self.id)
        self.assertEqual(first['project_id'], "P-1.1")
        self.assertEqual(second['project_id'], "P-1.2")
        child = agency.project_path(self.root, first['project_id'])
        self.assertEqual(agency.load_state(child)['approval']['status'], "pending")
        self.assertEqual(agency.context_pack(self.root, first['project_id'])['required']['project_id'], "P-1.1")
        self.assertEqual(agency.initialize(self.root, "Next", "Top level")['project_id'], "P-2")
        with self.assertRaises(agency.AgencyError):
            agency.initialize(self.root, "Nested", "Unsupported", parent="P-1.1")
        with self.assertRaises(agency.AgencyError):
            agency.initialize(self.root, "Missing", "Unsupported", parent="P-99")
        self.assertEqual(self.state()['revision'], 1)

    def write(self, relative, content):
        path = self.project / relative
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(content)
        return path

    def update(self, operation, **kwargs):
        return agency.update(self.root, self.id, self.state()['revision'], operation, **kwargs)

    def plan(self):
        source = self.write("tasks/proposed-plan.md", "# Synthetic plan\nA draft, not a release.\n")
        self.update("plan", file=str(source))

    def approve(self, grants=None):
        self.plan()
        self.update("decision", decision="approve", source_ref="fixture:synthetic-human-input",
                    excerpt="Synthetic approval used only for this test",
                    allow=grants if grants is not None else ["write_content", "render_draft"])

    def register(self, kind="script", content="Synthetic script", relative="artifacts/script-v1.txt"):
        self.write(relative, content)
        self.update("artifact", file=relative, kind=kind)
        return self.state()['artifacts'][-1]['id']

    def review(self, checks, targets=None):
        path = self.write("tasks/report.json", json.dumps({"artifact_ids": targets or ["A-001"],
                         "reviewer": "synthetic fixture", "mode": "self_review", "checks": checks}))
        return self.update("review", file=str(path))

    def test_ids_increase_and_description_is_persisted(self):
        second = agency.initialize(self.root, "Next", "Another project")
        self.assertEqual(second['project_id'], "P-2")
        self.assertIn("Synthetic pilot", (self.project / "PROJECT.md").read_text())

    def test_orphan_project_id_is_not_reused(self):
        (self.root / "projects/P-5").mkdir()
        self.assertEqual(agency.initialize(self.root, "Next", "Another")['project_id'], "P-6")

    def test_registry_lock_rejects_concurrent_writer(self):
        with agency.lock(self.root / "projects/.registry.lock"):
            with self.assertRaises(agency.AgencyError):
                agency.initialize(self.root, "Concurrent", "Another")

    def test_project_and_state_are_isolated(self):
        second = agency.initialize(self.root, "Next", "Other audience")
        wrong = self.state()
        with self.assertRaises(agency.AgencyError):
            agency.validate(Path(second['path']), wrong)

    def test_waiting_user_cannot_enter_production(self):
        self.plan()
        path = self.write("tasks/patch.json", json.dumps({"stage": "production"}))
        with self.assertRaises(agency.AgencyError):
            self.update("checkpoint", file=str(path))
        self.assertEqual(self.state()['approval']['status'], "pending")

    def test_protected_state_patch_is_rejected(self):
        path = self.write("tasks/patch.json", json.dumps({"approval": {"status": "approved"}}))
        with self.assertRaises(agency.AgencyError):
            self.update("checkpoint", file=str(path))

    def test_stale_revision_is_rejected(self):
        self.plan()
        with self.assertRaises(agency.AgencyError):
            agency.update(self.root, self.id, 1, "decision", decision="approve", source_ref="fixture", excerpt="yes")

    def test_actual_source_and_excerpt_are_required(self):
        self.plan()
        with self.assertRaises(agency.AgencyError):
            self.update("decision", decision="approve", source_ref="", excerpt="", allow=["write_content"])

    def test_write_scope_does_not_grant_rendering(self):
        self.approve(["write_content"])
        self.register()
        with self.assertRaises(agency.AgencyError):
            self.register(kind="video", relative="artifacts/draft.mp4")

    def test_new_plan_invalidates_previous_approval(self):
        self.approve()
        self.plan()
        self.assertEqual(self.state()['approval']['status'], "pending")
        self.assertEqual(agency.allowed_actions(self.project, self.state()), {"research"})

    def test_reject_and_revise_do_not_grant_actions(self):
        self.approve()
        self.update("decision", decision="reject", source_ref="fixture", excerpt="Not approved")
        self.assertEqual(self.state()['approval']['status'], "rejected")
        self.assertEqual(agency.allowed_actions(self.project, self.state()), {"research"})

    def test_publish_action_cannot_be_granted_in_v0(self):
        self.plan()
        with self.assertRaises(agency.AgencyError):
            self.update("decision", decision="approve", source_ref="fixture", excerpt="yes", allow=["publish_video"])

    def test_tampered_plan_is_detected(self):
        self.approve()
        plan = self.state()['plan']
        (self.project / plan['path']).write_text("Changed after approval")
        with self.assertRaises(agency.AgencyError):
            self.state()

    def test_changed_registered_file_blocks_reuse(self):
        self.approve()
        self.register()
        self.write("artifacts/script-v1.txt", "Changed content")
        with self.assertRaises(agency.AgencyError):
            agency.context_pack(self.root, self.id)

    def test_same_path_cannot_be_registered_as_new_version(self):
        self.approve()
        self.register()
        with self.assertRaises(agency.AgencyError):
            self.update("artifact", file="artifacts/script-v1.txt", kind="script")

    def test_artifact_inputs_must_exist(self):
        self.approve()
        self.write("artifacts/new.txt", "New")
        with self.assertRaises(agency.AgencyError):
            self.update("artifact", file="artifacts/new.txt", kind="script", input=["A-999"])

    def test_absolute_and_parent_paths_are_rejected(self):
        for value in ["../other.txt", "/tmp/other.txt", "artifacts/../../outside", "..\\outside"]:
            with self.subTest(value=value), self.assertRaises(agency.AgencyError):
                agency.inside(self.project, value)

    def test_symlink_escape_is_rejected(self):
        try:
            (self.project / "escape").symlink_to(self.root, target_is_directory=True)
        except OSError as exc:
            if getattr(exc, "winerror", None) == 1314:
                self.skipTest("Windows host does not grant symlink creation")
            raise
        with self.assertRaises(agency.AgencyError):
            agency.inside(self.project, "escape/file.txt")

    def test_operational_file_cannot_be_an_output(self):
        with self.assertRaises(agency.AgencyError):
            self.update("artifact", file="STATE.json", kind="research")

    def test_missing_qa_checks_remain_unverified(self):
        self.approve()
        self.register()
        self.review([{"name": "brief_alignment", "status": "unverified", "detail": "No inspection yet"}])
        self.assertEqual(self.state()['acceptance'], "unverified")

    def test_pass_requires_real_evidence_files_and_required_checks(self):
        self.approve()
        self.register()
        names = ["brief_alignment", "source_accuracy", "story_coherence"]
        checks = [{"name": n, "status": "passed", "detail": "Synthetic assertion", "evidence_path": "tasks/evidence.txt"} for n in names]
        with self.assertRaises(agency.AgencyError):
            self.review(checks)
        self.write("tasks/evidence.txt", "Synthetic fixture evidence, not a real content evaluation")
        self.review(checks)
        self.assertEqual(self.state()['acceptance'], "passed")

    def test_video_needs_audio_and_visual_review_even_if_decodable(self):
        self.approve()
        self.register(kind="video", relative="artifacts/draft.mp4")
        self.write("tasks/decode.txt", "Synthetic decoder fixture")
        self.review([{"name": n, "status": "passed", "detail": "Synthetic", "evidence_path": "tasks/decode.txt"}
                     for n in ["brief_alignment", "media_decode"]])
        self.assertEqual(self.state()['acceptance'], "unverified")

    def test_changed_qa_evidence_is_detected(self):
        self.approve()
        self.register()
        self.write("tasks/evidence.txt", "Synthetic evidence")
        self.review([{"name": "brief_alignment", "status": "passed", "detail": "Synthetic", "evidence_path": "tasks/evidence.txt"}])
        self.write("tasks/evidence.txt", "Changed evidence")
        with self.assertRaises(agency.AgencyError):
            self.state()

    def test_atomic_replace_failure_preserves_old_state(self):
        path = self.project / "STATE.json"
        previous = path.read_bytes()
        with patch.object(agency.os, "replace", side_effect=OSError("Injected disk failure")):
            with self.assertRaises(OSError):
                agency.write_json(path, {"corrupt": True})
        self.assertEqual(path.read_bytes(), previous)
        self.assertFalse(list(self.project.glob(".write-*")))

    def test_decision_retry_after_uncommitted_record(self):
        self.plan()
        with patch.object(agency, "commit_state", side_effect=OSError("Injected failure")):
            with self.assertRaises(OSError):
                self.update("decision", decision="approve", source_ref="fixture", excerpt="Synthetic yes", allow=["write_content"])
        self.assertEqual(self.state()['approval']['status'], "pending")
        self.update("decision", decision="approve", source_ref="fixture", excerpt="Synthetic yes", allow=["write_content"])
        self.assertEqual(self.state()['approval']['status'], "approved")

    def test_derived_handoff_failure_is_reported(self):
        path = self.write("tasks/patch.json", json.dumps({"next_action": "Read the next source"}))
        with patch.object(agency, "handoff", side_effect=OSError("Injected handoff failure")):
            result = self.update("checkpoint", file=str(path))
        self.assertTrue(result['state_committed'])
        self.assertFalse(result['handoff_updated'])
        self.assertEqual(self.state()['next_action'], "Read the next source")

    def test_resume_rebuilds_stale_handoff_from_state(self):
        self.write("HANDOFF.md", "Stale handoff says publish now")
        result = subprocess.run([sys.executable, str(agency.ROOT / "scripts/agency.py"), "--root", str(self.root), "resume", self.id],
                                capture_output=True, text=True, check=True)
        self.assertNotIn("publish now", (self.project / "HANDOFF.md").read_text())
        self.assertEqual(json.loads(result.stdout)['required']['revision'], self.state()['revision'])

    def test_required_context_is_not_silently_dropped(self):
        with self.assertRaises(agency.AgencyError):
            agency.context_pack(self.root, self.id, 500)
        packet = agency.context_pack(self.root, self.id)
        self.assertEqual(packet['required']['constraints'], self.state()['constraints'])
        self.assertIsNone(packet['token_count'])

    def test_context_marks_omitted_artifacts(self):
        for i in range(10):
            self.register(kind="research", relative=f"research/source-{i}.md", content="Source")
        packet = agency.context_pack(self.root, self.id, 1800)
        self.assertTrue(packet['truncated'])
        self.assertGreater(packet['omitted_artifacts'], 0)

    def usage(self, sample_id, values, **extra):
        return self.update("usage", sample_id=sample_id, session="session-1", source="synthetic usage fixture",
                           mode="cumulative", input_tokens=values[0], output_tokens=values[1], cached_input_tokens=values[2], **extra)

    def test_cumulative_usage_is_not_double_counted(self):
        self.usage("one", (100, 20, 40))
        self.usage("two", (150, 30, 60))
        self.assertEqual(self.state()['usage']['input_tokens'], 150)
        self.assertEqual(self.state()['usage']['output_tokens'], 30)
        self.assertEqual(self.state()['usage']['cached_input_tokens'], 60)

    def test_usage_sample_replay_is_idempotent(self):
        self.usage("one", (100, 20, 40))
        revision = self.state()['revision']
        self.assertTrue(self.usage("one", (100, 20, 40))['replayed'])
        self.assertEqual(self.state()['revision'], revision)
        with self.assertRaises(agency.AgencyError):
            self.usage("one", (101, 20, 40))

    def test_cumulative_reset_requires_new_session(self):
        self.usage("one", (100, 20, 40))
        with self.assertRaises(agency.AgencyError):
            self.usage("two", (10, 2, 1))

    def test_alias_path_cannot_duplicate_artifact_version(self):
        self.approve()
        self.register()
        with self.assertRaises(agency.AgencyError):
            self.update("artifact", file="./artifacts/script-v1.txt", kind="script")

    def test_old_plan_artifact_cannot_pass_current_plan_review(self):
        self.approve()
        self.register()
        self.plan()
        with self.assertRaises(agency.AgencyError):
            self.review([{"name": "brief_alignment", "status": "unverified", "detail": "Old plan"}])

    def test_usage_modes_cannot_double_count_same_session(self):
        self.usage("one", (100, 20, 40))
        with self.assertRaises(agency.AgencyError):
            self.update("usage", sample_id="two", session="session-1", source="fixture", mode="delta",
                        input_tokens=50, output_tokens=10, cached_input_tokens=0)

    def test_inconsistent_cached_usage_delta_is_rejected(self):
        self.usage("one", (100, 20, 0))
        with self.assertRaises(agency.AgencyError):
            self.usage("two", (101, 21, 50))

    def test_old_grant_cannot_be_restored_after_rejection(self):
        self.approve()
        old = self.state()['approval']
        self.update("decision", decision="reject", source_ref="fixture", excerpt="No")
        state = self.state()
        state['approval'] = old
        with self.assertRaises(agency.AgencyError):
            agency.validate(self.project, state)


if __name__ == "__main__":
    unittest.main()

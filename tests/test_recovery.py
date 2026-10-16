"""Explicit loss recovery, using synthetic records only."""
import sys
import unittest
from pathlib import Path
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).parent))
import test_agency
import agency


class Recovery(unittest.TestCase):
    setUp = test_agency.Records.setUp
    state = test_agency.Records.state
    write = test_agency.Records.write
    update = test_agency.Records.update
    plan = test_agency.Records.plan
    approve = test_agency.Records.approve
    register = test_agency.Records.register
    review = test_agency.Records.review
    def lose(self):
        self.approve()
        self.register(relative="artifacts/old.txt")
        self.before = self.state()
        (self.project / "artifacts/old.txt").unlink()

    def recover(self, revision=None):
        return agency.recover(self.root, self.id, revision or self.before['revision'],
                              "fixture:loss-confirmation", "Synthetic user confirms lost media")

    def test_recovery_preserves_history_and_allows_new_outputs(self):
        self.lose()
        self.recover()
        state = self.state()
        self.assertEqual(state['artifacts'], self.before['artifacts'])
        self.assertEqual(state['approval'], self.before['approval'])
        self.assertEqual(agency.unavailable_artifact_ids(self.project, state), {'A-001'})
        self.register(relative="artifacts/new.txt")
        self.assertEqual(self.state()['artifacts'][-1]['id'], 'A-002')
        with self.assertRaises(agency.AgencyError):
            self.update('artifact', kind='other', file='artifacts/new.txt', input=['A-001'])

    def test_recovery_rejects_stale_revision_and_lock(self):
        self.lose()
        with self.assertRaises(agency.AgencyError):
            self.recover(self.before['revision'] - 1)
        with agency.lock(self.project / '.writer.lock'):
            with self.assertRaises(agency.AgencyError):
                self.recover()

    def test_recovery_does_not_waive_changed_present_file(self):
        self.lose()
        (self.project / self.before['plan']['path']).write_text('tampered')
        with self.assertRaises(agency.AgencyError):
            self.recover()

    def test_recovery_does_not_waive_missing_plan(self):
        self.lose()
        (self.project / self.before['plan']['path']).unlink()
        with self.assertRaises(agency.AgencyError):
            self.recover()

    def test_recovery_failure_preserves_state(self):
        self.lose()
        before = (self.project / 'STATE.json').read_bytes()
        with patch.object(agency, 'commit_state', side_effect=OSError('fixture failure')):
            with self.assertRaises(OSError):
                self.recover()
        self.assertEqual(before, (self.project / 'STATE.json').read_bytes())

    def test_recovery_review_evidence_and_acceptance(self):
        self.approve()
        self.register(kind='other', relative='artifacts/old.txt')
        self.write('tasks/evidence.txt', 'synthetic check')
        self.review([{'name':'brief_alignment', 'status':'passed', 'detail':'synthetic',
                      'evidence_path':'tasks/evidence.txt'}])
        self.before = self.state()
        (self.project / 'tasks/evidence.txt').unlink()
        self.recover()
        self.assertEqual(self.state()['acceptance'], 'unverified')
        self.assertEqual(self.state()['reviews'], self.before['reviews'])

    def test_restored_wrong_bytes_fail(self):
        self.lose()
        self.recover()
        (self.project / 'artifacts/old.txt').write_text('different')
        with self.assertRaises(agency.AgencyError):
            self.state()

#!/usr/bin/env python3
"""Reproducible synthetic smoke workspace, separate from the real project registry."""
import argparse
import json
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
import agency
import render_queue


def run(output):
    output = output.resolve()
    agency.require(not output.exists(), "Use a fresh evaluation output path")
    agency.require(output != ROOT and not output.is_relative_to(ROOT / "projects"),
                   "Synthetic evaluation cannot use the real project registry")
    output.mkdir(parents=True)
    info = agency.initialize(output, "Synthetic local renderer test", "Technical smoke test; not a real content project")
    project, pid = Path(info["path"]), info["project_id"]
    plan = project / "fixture-plan.md"
    plan.write_text("Synthetic integration fixture: render the supplied local demo. No publishing or content acceptance.")
    agency.update(output, pid, 1, "plan", file=str(plan))
    agency.update(output, pid, 2, "decision", decision="approve", source_ref="synthetic:evaluation-fixture",
                  excerpt="Synthetic test input; not a human content-project approval", allow=["write_content", "render_draft"])
    path = project / "artifacts/script.json"
    path.parent.mkdir()
    path.write_text((ROOT / "examples/queue-script.json").read_text())
    agency.update(output, pid, 3, "artifact", file="artifacts/script.json", kind="script")
    result = render_queue.render(output, pid, "A-001", 4)
    agency.write_json(output / "RESULT.json", result)
    return result


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, required=True)
    args = parser.parse_args()
    print(json.dumps(run(args.output), ensure_ascii=False, indent=2))

"""fake_run_pipeline(): same signature as run_pipeline, but does no real work.

The backend uses it (PIPELINE_MODE=fake) so it can be built before the real pipeline exists.
It walks through every status, then returns the example clips from docs/contracts/examples.
"""

import json
import shutil
import time
from pathlib import Path

from .models import ClipResult, ProgressCallback

EXAMPLES = Path(__file__).resolve().parents[2] / "docs" / "contracts" / "examples"
STEPS = ["extracting_audio", "transcribing", "scoring", "cutting"]


def fake_run_pipeline(
    video_path: str,
    out_dir: str,
    on_progress: ProgressCallback,
    max_clips: int = 5,
    step_seconds: float = 2.0,
) -> list[ClipResult]:
    for i, status in enumerate(STEPS):
        on_progress(status, i / len(STEPS))
        time.sleep(step_seconds)

    clips_dir = Path(out_dir) / "clips"
    clips_dir.mkdir(parents=True, exist_ok=True)

    examples = json.loads((EXAMPLES / "clips.json").read_text())[:max_clips]
    results = []
    for i, clip in enumerate(examples):
        path = clips_dir / f"clip_{i}.mp4"
        shutil.copy(EXAMPLES / "sample_clip.mp4", path)
        results.append(ClipResult.model_validate({**clip, "file_path": str(path)}))

    on_progress("done", 1.0)
    return results

from pathlib import Path

from pipeline.fake import fake_run_pipeline


def test_fake_pipeline_reports_progress_and_returns_clips(tmp_path):
    seen = []
    clips = fake_run_pipeline(
        "ignored.mp4",
        str(tmp_path),
        on_progress=lambda status, p: seen.append(status),
        max_clips=2,
        step_seconds=0,
    )

    assert seen == ["extracting_audio", "transcribing", "scoring", "cutting", "done"]
    assert len(clips) == 2
    assert all(Path(c.file_path).exists() for c in clips)

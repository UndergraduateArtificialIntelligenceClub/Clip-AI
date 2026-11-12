"""run_pipeline(): chains every stage. This is what the backend calls."""

from pathlib import Path

from .audio import extract_audio, split_audio
from .cut import cut_clip
from .models import ClipResult, ProgressCallback
from .score import pick_top, score_windows
from .transcribe import transcribe
from .windows import make_windows


def run_pipeline(
    video_path: str,
    out_dir: str,
    on_progress: ProgressCallback,
    max_clips: int = 5,
) -> list[ClipResult]:
    """Turn one video into up to max_clips scored clips saved in out_dir/clips."""
    work = Path(out_dir)
    clips_dir = work / "clips"
    clips_dir.mkdir(parents=True, exist_ok=True)

    on_progress("extracting_audio", 0.0)
    audio = extract_audio(video_path, str(work))
    pieces = split_audio(audio, str(work / "pieces"))

    on_progress("transcribing", 0.2)
    transcript = transcribe(pieces)
    (work / "transcript.json").write_text(transcript.model_dump_json(indent=2))

    on_progress("scoring", 0.6)
    candidates = pick_top(score_windows(make_windows(transcript)), max_clips)

    on_progress("cutting", 0.85)
    results = []
    for i, c in enumerate(candidates):
        path = cut_clip(video_path, c, str(clips_dir / f"clip_{i}.mp4"))
        results.append(ClipResult(**c.model_dump(), file_path=path))

    on_progress("done", 1.0)
    return results

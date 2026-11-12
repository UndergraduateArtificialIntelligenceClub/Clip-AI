"""Stage 6: cut clips out of the original video with FFmpeg."""

from .models import Candidate


def cut_clip(video_path: str, candidate: Candidate, out_path: str) -> str:
    """Cut candidate.start to candidate.end into out_path and return out_path.

    Command: ffmpeg -ss START -to END -i source.mp4 -c:v libx264 -c:a aac out.mp4
    Stretch goals: burned-in captions and a 9:16 crop.
    """
    raise NotImplementedError("Pipeline issue: cut clips with FFmpeg")

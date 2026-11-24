"""Stage 6: cut clips out of the original video with FFmpeg."""

from pathlib import Path
import subprocess

from .models import Candidate


def cut_clip(video_path: str, candidate: Candidate, out_path: str) -> str:
    """Cut candidate.start to candidate.end into out_path and return out_path.

    Command: ffmpeg -ss START -to END -i source.mp4 -c:v libx264 -c:a aac out.mp4
    Stretch goals: burned-in captions and a 9:16 crop.
    """

    out_path = Path(out_path)/"out.mp4"

    subprocess.run(
        [
            "ffmpeg",
            '-y',
            '-ss',
            candidate.start,
            '-to',
            candidate.end,
            '-i',
            str(video_path),
            'c:v',
            'libx264',
            '-c:a',
            'aac',
            str(out_path),

        ],
        check= True
    )

    return str(out_path)
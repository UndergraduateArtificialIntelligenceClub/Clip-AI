"""Where files live on disk.

storage/videos/{video_id}/source.mp4
storage/videos/{video_id}/clips/clip_0.mp4 ...
"""

from pathlib import Path

from .config import settings


def video_dir(video_id: str) -> Path:
    path = Path(settings.storage_dir) / "videos" / video_id
    path.mkdir(parents=True, exist_ok=True)
    return path


def source_path(video_id: str, filename: str) -> Path:
    return video_dir(video_id) / f"source{Path(filename).suffix or '.mp4'}"

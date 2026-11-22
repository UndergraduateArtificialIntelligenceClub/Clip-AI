"""Where files live on disk.

storage/videos/{video_id}/source.mp4
storage/videos/{video_id}/clips/clip_0.mp4 ...
"""

import shutil
from pathlib import Path
from typing import BinaryIO

from fastapi import UploadFile

from .config import settings


def video_dir(video_id: str, storage_dir: str | Path | None = None) -> Path:
    root = storage_dir if storage_dir is not None else settings.storage_dir
    path = Path(root) / "videos" / video_id
    path.mkdir(parents=True, exist_ok=True)
    return path


def save_upload(
    file: UploadFile | BinaryIO, video_id: str, storage_dir: str | Path | None = None
) -> Path:
    """Stream an uploaded video to its source path and return that path."""
    destination = video_dir(video_id, storage_dir) / "source.mp4"
    source = getattr(file, "file", file)
    with destination.open("wb") as target:
        shutil.copyfileobj(source, target)
    return destination


def source_path(video_id: str, filename: str) -> Path:
    return video_dir(video_id) / f"source{Path(filename).suffix or '.mp4'}"

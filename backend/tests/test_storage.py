from io import BytesIO

import pytest
from fastapi import UploadFile

from app.storage import save_upload


@pytest.mark.parametrize(
    "file_factory",
    [BytesIO, lambda content: UploadFile(filename="source.mp4", file=BytesIO(content))],
)
def test_save_upload_writes_source_video(tmp_path, file_factory):
    content = b"small video content"

    path = save_upload(file_factory(content), "video-123", storage_dir=tmp_path)

    assert path == tmp_path / "videos" / "video-123" / "source.mp4"
    assert path.read_bytes() == content

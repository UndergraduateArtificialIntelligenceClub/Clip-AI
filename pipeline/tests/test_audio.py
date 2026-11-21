import shutil
from pathlib import Path

import pytest

from pipeline.audio import extract_audio

EXAMPLES = Path(__file__).resolve().parents[2] / "docs" / "contracts" / "examples"

pytestmark = pytest.mark.skipif(shutil.which("ffmpeg") is None, reason="ffmpeg not installed")


def test_extract_audio_makes_mp3(tmp_path):
    out = extract_audio(str(EXAMPLES / "sample_clip.mp4"), str(tmp_path))
    assert out == str(tmp_path / "audio.mp3")
    assert (tmp_path / "audio.mp3").exists()
    assert (tmp_path / "audio.mp3").stat().st_size > 0

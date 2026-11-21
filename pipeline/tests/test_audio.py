from conftest import EXAMPLES

from pipeline.audio import extract_audio


def test_extract_audio_makes_mp3(tmp_path):
    mp3 = tmp_path / "audio.mp3"
    out = extract_audio(str(EXAMPLES / "sample_clip.mp4"), str(tmp_path))
    assert out == str(mp3)
    assert mp3.exists()
    assert mp3.stat().st_size > 0

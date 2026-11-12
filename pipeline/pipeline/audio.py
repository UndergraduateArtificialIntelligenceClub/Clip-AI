"""Stage 2: extract audio from the video with FFmpeg."""

PIECE_SECONDS = 600  # Whisper accepts at most 25 MB per request, so split into 10-minute pieces.


def extract_audio(video_path: str, out_dir: str) -> str:
    """Save the video's audio as small mono MP3 in out_dir and return its path.

    Command: ffmpeg -i source.mp4 -vn -ac 1 -ar 16000 -b:a 32k audio.mp3
    """
    raise NotImplementedError("Pipeline issue: extract audio with FFmpeg")


def split_audio(audio_path: str, out_dir: str) -> list[tuple[str, float]]:
    """Split audio into PIECE_SECONDS pieces.

    Returns (piece_path, offset_seconds) pairs. The offset is where the piece starts in the
    full audio, so transcribe() can shift timestamps back into place.
    """
    raise NotImplementedError("Pipeline issue: split audio into pieces")

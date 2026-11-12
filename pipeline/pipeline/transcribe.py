"""Stage 3: transcribe audio with timestamps using the Whisper API."""

from .models import Segment, Transcript


def transcribe(pieces: list[tuple[str, float]]) -> Transcript:
    """Transcribe each audio piece and join them into one Transcript.

    Add each piece's offset to its segment times so they match the full video.
    """
    raise NotImplementedError("Pipeline issue: transcribe with Whisper")


def shift_segments(segments: list[Segment], offset: float) -> list[Segment]:
    """Return copies of segments moved later by offset seconds."""
    return [Segment(start=s.start + offset, end=s.end + offset, text=s.text) for s in segments]

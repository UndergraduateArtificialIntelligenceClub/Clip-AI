"""Stage 4: cut the transcript into overlapping windows that are possible clips."""

from .models import Transcript, Window

MIN_SECONDS = 30
MAX_SECONDS = 90
STEP_SECONDS = 15


def make_windows(transcript: Transcript) -> list[Window]:
    """Return windows between MIN_SECONDS and MAX_SECONDS long.

    A new window starts about every STEP_SECONDS. Windows start and end on segment edges,
    so clips never begin or end mid-sentence.
    """
    raise NotImplementedError("Pipeline issue: build transcript windows")

"""Stage 5: score windows with an LLM and pick the best non-overlapping clips."""

from .models import Candidate, Window

BATCH_SIZE = 10  # windows per LLM call
MIN_SCORE = 60


def score_windows(windows: list[Window]) -> list[Candidate]:
    """Score every window and return candidates, best first.

    The LLM rates hook, emotion, standalone and payoff from 0-10 each. The overall score is
    their sum scaled to 0-100. Validate every reply with Pydantic; retry a bad batch once,
    then skip it.
    """
    raise NotImplementedError("Pipeline issue: score windows with the LLM")


def pick_top(candidates: list[Candidate], max_clips: int) -> list[Candidate]:
    """Keep the best candidates that score at least MIN_SCORE and do not overlap."""
    picked: list[Candidate] = []
    for c in sorted(candidates, key=lambda c: c.score, reverse=True):
        if c.score < MIN_SCORE or len(picked) == max_clips:
            break
        if all(c.end <= p.start or c.start >= p.end for p in picked):
            picked.append(c)
    return picked

from pipeline import Candidate, Scores, Segment
from pipeline.score import pick_top
from pipeline.transcribe import shift_segments


def _candidate(start: float, end: float, score: int) -> Candidate:
    return Candidate(
        start=start,
        end=end,
        score=score,
        scores=Scores(hook=5, emotion=5, standalone=5, payoff=5),
        title="t",
        reason="r",
        transcript="x",
    )


def test_shift_segments_moves_times_by_offset():
    shifted = shift_segments([Segment(start=1.0, end=2.5, text="hi")], offset=600)
    assert (shifted[0].start, shifted[0].end) == (601.0, 602.5)


def test_pick_top_skips_overlaps_and_low_scores():
    candidates = [
        _candidate(0, 60, 90),
        _candidate(30, 90, 85),  # overlaps the first
        _candidate(100, 150, 70),
        _candidate(200, 250, 40),  # below MIN_SCORE
    ]
    picked = pick_top(candidates, max_clips=5)
    assert [c.score for c in picked] == [90, 70]

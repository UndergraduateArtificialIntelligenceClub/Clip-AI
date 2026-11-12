"""The example files in docs/contracts must always match the pipeline models."""

from pipeline import Candidate, Transcript


def test_example_transcript_matches_model(example_transcript):
    Transcript.model_validate(example_transcript)


def test_example_clips_match_candidate_model(example_clips):
    for clip in example_clips:
        Candidate.model_validate(clip)

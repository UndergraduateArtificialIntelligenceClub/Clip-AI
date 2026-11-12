"""Clip-AI pipeline: long video in, scored short clips out."""

from .models import Candidate, ClipResult, ProgressCallback, Scores, Segment, Transcript, Window
from .runner import run_pipeline

__all__ = [
    "Candidate",
    "ClipResult",
    "ProgressCallback",
    "Scores",
    "Segment",
    "Transcript",
    "Window",
    "run_pipeline",
]

"""Shared data shapes. This is the contract between the pipeline and the backend.

Change these only through a PR that also updates docs/contracts/examples and the fakes.
All times are seconds from the start of the original video.
"""

from collections.abc import Callable
from typing import Literal

from pydantic import BaseModel, Field

JobStatus = Literal[
    "queued", "extracting_audio", "transcribing", "scoring", "cutting", "done", "failed"
]

# Called as on_progress(status, progress) where progress is 0.0 to 1.0.
ProgressCallback = Callable[[JobStatus, float], None]


class Segment(BaseModel):
    start: float = Field(ge=0)
    end: float = Field(ge=0)
    text: str


class Transcript(BaseModel):
    language: str
    segments: list[Segment]


class Window(BaseModel):
    index: int
    start: float
    end: float
    text: str


class Scores(BaseModel):
    hook: int = Field(ge=0, le=10)
    emotion: int = Field(ge=0, le=10)
    standalone: int = Field(ge=0, le=10)
    payoff: int = Field(ge=0, le=10)


class Candidate(BaseModel):
    start: float
    end: float
    score: int = Field(ge=0, le=100)
    scores: Scores
    title: str
    reason: str
    transcript: str


class ClipResult(Candidate):
    file_path: str

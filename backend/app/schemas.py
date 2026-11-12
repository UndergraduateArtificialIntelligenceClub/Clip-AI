"""API request and response shapes. This is the contract with the frontend.

Keep in sync with docs/contracts/examples and frontend/lib/types.ts.
"""

from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field

from pipeline.models import JobStatus, Scores

ClipStatus = Literal["pending", "approved", "rejected"]


class UploadResponse(BaseModel):
    video_id: str
    job_id: str


class VideoOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    filename: str
    duration: float | None
    created_at: datetime


class JobOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    video_id: str
    status: JobStatus
    progress: float = Field(ge=0, le=1)
    error: str | None


class ClipOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    video_id: str
    start: float
    end: float
    score: int = Field(ge=0, le=100)
    scores: Scores
    title: str
    reason: str
    transcript: str
    status: ClipStatus
    video_url: str


class ClipUpdate(BaseModel):
    """Every field is optional. Only the fields sent are changed."""

    status: ClipStatus | None = None
    start: float | None = None
    end: float | None = None

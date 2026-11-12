"""Picks the real or fake pipeline based on PIPELINE_MODE."""

from pipeline import run_pipeline
from pipeline.fake import fake_run_pipeline

from .config import settings


def get_pipeline():
    if settings.pipeline_mode == "real":
        return run_pipeline
    return fake_run_pipeline

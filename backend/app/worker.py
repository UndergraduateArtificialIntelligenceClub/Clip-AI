"""Celery app. Start a worker with: celery -A app.worker worker --pool=solo"""

from celery import Celery

from .config import settings

celery_app = Celery(
    "clipai",
    broker=settings.redis_url,
    backend=settings.redis_url,
    include=["app.tasks"],
)
celery_app.conf.task_always_eager = settings.celery_eager

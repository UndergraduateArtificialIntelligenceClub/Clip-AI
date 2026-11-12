"""Background tasks run by the Celery worker."""

from .worker import celery_app


@celery_app.task(name="process_video")
def process_video(job_id: str) -> None:
    """Run the pipeline for one job.

    1. Load the Job and its Video from the database.
    2. Call get_pipeline()(video_path, out_dir, on_progress) where on_progress saves
       job.status and job.progress.
    3. Save each returned ClipResult as a Clip row.
    4. Set the job to "done", or to "failed" with the error message if anything raises.
    """
    raise NotImplementedError("Backend issue: process_video task")

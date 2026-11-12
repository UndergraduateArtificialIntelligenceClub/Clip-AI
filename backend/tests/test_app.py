from app.pipeline_runner import get_pipeline
from pipeline.fake import fake_run_pipeline


def test_health(client):
    assert client.get("/api/health").json() == {"status": "ok"}


def test_fake_pipeline_is_the_default():
    assert get_pipeline() is fake_run_pipeline

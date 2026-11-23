import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import Session

from app.db import Base, get_db
from app.main import app
from app.models import Job, Video


@pytest.fixture
def job_database(tmp_path, monkeypatch):
    engine = create_engine(f"sqlite:///{tmp_path / 'jobs.db'}")
    Base.metadata.create_all(engine)

    def get_test_db():
        with Session(engine) as session:
            yield session

    monkeypatch.setitem(app.dependency_overrides, get_db, get_test_db)
    try:
        yield engine
    finally:
        engine.dispose()


def test_get_saved_job(client, job_database, example):
    expected = example("job.json")
    with Session(job_database) as session:
        session.add(Video(id=expected["video_id"], filename="test.mp4", file_path="test.mp4"))
        session.flush()
        session.add(Job(**expected))
        session.commit()

    response = client.get(f"/api/jobs/{expected['id']}")

    assert response.status_code == 200
    assert response.json() == expected


def test_get_unknown_job(client, job_database):
    response = client.get("/api/jobs/00000000-0000-0000-0000-000000000000")

    assert response.status_code == 404
    assert response.json() == {"detail": "Job not found"}

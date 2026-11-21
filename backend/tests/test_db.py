from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db import get_db
from app.models import Video


def test_video_round_trip(db):
    video = Video(filename="sample.mp4", file_path="videos/sample.mp4")
    db.add(video)
    db.commit()
    video_id = video.id
    db.expunge_all()

    assert db.get(Video, video_id).filename == "sample.mp4"


def test_client_reads_test_database(client, db, monkeypatch):
    router = APIRouter(dependency_overrides_provider=client.app)

    @router.get("/test/videos/{video_id}")
    def read_video(video_id: str, session: Session = Depends(get_db)):
        return session.get(Video, video_id).filename

    monkeypatch.setattr(client.app.router, "routes", [*client.app.router.routes, *router.routes])
    video = Video(filename="client.mp4", file_path="videos/client.mp4")
    db.add(video)
    db.commit()

    response = client.get(f"/test/videos/{video.id}")
    assert response.status_code == 200
    assert response.json() == "client.mp4"

"""The example files in docs/contracts must always match the API schemas."""

from app.schemas import ClipOut, JobOut, UploadResponse, VideoOut


def test_examples_match_api_schemas(example):
    UploadResponse.model_validate(example("upload_response.json"))
    VideoOut.model_validate(example("video.json"))
    JobOut.model_validate(example("job.json"))
    for clip in example("clips.json"):
        ClipOut.model_validate(clip)


def test_api_has_every_contract_endpoint(client):
    paths = client.get("/openapi.json").json()["paths"]
    assert set(paths) >= {
        "/api/videos",
        "/api/jobs/{job_id}",
        "/api/videos/{video_id}/clips",
        "/api/clips/{clip_id}",
        "/api/clips/{clip_id}/video",
    }

from fastapi import APIRouter, Depends, HTTPException, UploadFile
from sqlalchemy.orm import Session

from ..db import get_db
from ..schemas import ClipOut, UploadResponse, VideoOut

router = APIRouter(prefix="/videos", tags=["videos"])


@router.post("", response_model=UploadResponse, status_code=201)
def upload_video(file: UploadFile, db: Session = Depends(get_db)):
    """Save the file, create a Video and a Job, and queue process_video."""
    raise HTTPException(501, "Not implemented yet")


@router.get("", response_model=list[VideoOut])
def list_videos(db: Session = Depends(get_db)):
    """List uploaded videos, newest first."""
    raise HTTPException(501, "Not implemented yet")


@router.get("/{video_id}/clips", response_model=list[ClipOut])
def list_clips(video_id: str, db: Session = Depends(get_db)):
    """List a video's clips, best score first. 404 if the video does not exist."""
    raise HTTPException(501, "Not implemented yet")

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..db import get_db
from ..schemas import ClipOut, ClipUpdate

router = APIRouter(prefix="/clips", tags=["clips"])


@router.patch("/{clip_id}", response_model=ClipOut)
def update_clip(clip_id: str, update: ClipUpdate, db: Session = Depends(get_db)):
    """Change a clip's status, start or end. 404 if it does not exist."""
    raise HTTPException(501, "Not implemented yet")


@router.get("/{clip_id}/video")
def get_clip_video(clip_id: str, db: Session = Depends(get_db)):
    """Return the clip's MP4 file. 404 if it does not exist."""
    raise HTTPException(501, "Not implemented yet")

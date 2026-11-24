"""Stage 6: cut clips out of the original video with FFmpeg."""

import subprocess
from pathlib import Path


from .models import Candidate

def _srt_time(seconds: float) -> str:
    ms = int(round(seconds*1000))
    h,ms = divmod(ms,3_600_000)
    m,ms = divmod(ms,60_000)
    s,ms = divmod(ms,1000)

    return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"

def write_srt(segments, clip_start: float,clip_end: float,srt_path: Path)->None:
    """Write captions for one clip. Times are shifted so the clip starts at 0"""

    lines = []

    n = 1
    for seg in segments:
        if seg.end <= clip_start or seg.start >= clip_end:
            continue
        start = max(seg.start, clip_start) - clip_start
        end = min(seg.end, clip_end) - clip_start
        lines.append(f"{n}\n{_srt_time(start)} --> {_srt_time(end)}\n{seg.text.strip()}\n")
        n+=1

    srt_path.write_text("\n".join(lines), encoding="utf-8")    

def cut_clip(video_path: str, candidate: Candidate, out_path: str, segments= None,
             vertical: bool = False) -> str:
    """Cut candidate.start to candidate.end into out_path and return out_path.

    Command: ffmpeg -ss START -to END -i source.mp4 -c:v libx264 -c:a aac out.mp4
    Stretch goals: burned-in captions and a 9:16 crop.
    """

    out = Path(out_path)
    out.parent.mkdir(parents=True, exist_ok=True)

    filters = []

    if vertical:
        filters.append("crop=ih*9/16:ih")
        filters.append("scale=1080:1920")

    if segments:
        srt = out.with_suffix(".srt")
        write_srt(segments, float(candidate.start), float(candidate.end), srt)
        style = "FontSize=14,Alignment=2,MarginV=40,Outline=2"
        filters.append(f"subtitles='{srt.as_posix()}':force_style='{style}'")

    cmd = [
        "ffmpeg", "-y",
        "-ss", str(candidate.start),
        "-to", str(candidate.end),
        "-i", str(video_path),
    ]
    if filters:
        cmd += ["-vf", ",".join(filters)]
    cmd += ["-c:v", "libx264", "-c:a", "aac", str(out)]

    subprocess.run(cmd, check=True)

    return str(out)
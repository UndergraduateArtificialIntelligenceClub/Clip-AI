"""Command line: python -m pipeline run VIDEO --out DIR [--fake] [--max-clips N]"""

import argparse

from dotenv import load_dotenv

from .fake import fake_run_pipeline
from .runner import run_pipeline


def main() -> None:
    load_dotenv()
    parser = argparse.ArgumentParser(prog="pipeline")
    sub = parser.add_subparsers(dest="command", required=True)
    run = sub.add_parser("run", help="Turn a video into clips")
    run.add_argument("video")
    run.add_argument("--out", default="out")
    run.add_argument("--max-clips", type=int, default=5)
    run.add_argument("--fake", action="store_true", help="Use the fake pipeline (no API calls)")
    args = parser.parse_args()

    pipeline = fake_run_pipeline if args.fake else run_pipeline
    clips = pipeline(
        args.video,
        args.out,
        on_progress=lambda status, p: print(f"[{p:4.0%}] {status}"),
        max_clips=args.max_clips,
    )
    for c in clips:
        print(f"{c.score:3d}  {c.start:8.1f}-{c.end:<8.1f} {c.title}  ->  {c.file_path}")


if __name__ == "__main__":
    main()

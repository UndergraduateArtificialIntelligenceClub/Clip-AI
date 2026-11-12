# Pipeline

Plain Python package that turns a long video into scored short clips. No web code lives here.

## Setup

```bash
cd pipeline
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -e ".[dev]"
```

You also need FFmpeg on your PATH (`ffmpeg -version` should work).

## Run

```bash
python -m pipeline run path/to/podcast.mp4 --out out/          # real pipeline
python -m pipeline run path/to/podcast.mp4 --out out/ --fake   # fake pipeline, no API calls
```

## Layout

| File | Stage | What it does |
| --- | --- | --- |
| `models.py` | all | Shared data shapes (the contract) |
| `audio.py` | 2 | Extract and split audio with FFmpeg |
| `transcribe.py` | 3 | Whisper transcription with timestamps |
| `windows.py` | 4 | Cut the transcript into 30–90 s windows |
| `score.py` | 5 | LLM scoring and picking the best clips |
| `cut.py` | 6 | Cut clips with FFmpeg |
| `runner.py` | all | `run_pipeline()` chains the stages |
| `fake.py` | all | `fake_run_pipeline()` for the backend team |

## Tests

```bash
ruff check . && ruff format --check . && pytest
```

Tests never call OpenAI. Save real replies as JSON in `tests/fixtures/` and load them instead.

# Backend

FastAPI server, Celery worker, Postgres and Redis.

## Setup

```bash
cd backend
python -m venv .venv
source .venv/bin/activate              # Windows: .venv\Scripts\activate
pip install -e ../pipeline -r requirements-dev.txt
```

From the repo root, start Postgres and Redis:

```bash
docker compose up -d
```

## Run

```bash
uvicorn app.main:app --reload            # API on http://localhost:8000, docs at /docs
celery -A app.worker worker --pool=solo  # worker (--pool=solo is needed on Windows)
```

`PIPELINE_MODE=fake` (the default) uses the fake pipeline, so you don't need FFmpeg or an API key.

## Layout

| File | What it does |
| --- | --- |
| `app/main.py` | Creates the app, CORS, and routes |
| `app/config.py` | Settings read from `.env` |
| `app/db.py` | Database connection and sessions |
| `app/models.py` | Database tables |
| `app/schemas.py` | API request and response shapes (the contract) |
| `app/routes/` | Endpoints: `videos.py`, `jobs.py`, `clips.py` |
| `app/worker.py` | Celery app |
| `app/tasks.py` | `process_video` task that runs the pipeline |
| `app/pipeline_runner.py` | Picks the real or fake pipeline |
| `app/storage.py` | Where files are saved |

## Tests

```bash
ruff check . && ruff format --check . && pytest
```

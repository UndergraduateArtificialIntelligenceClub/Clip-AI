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

Then, from `backend/`, create the database tables:

```bash
alembic upgrade head
```

## Run

```bash
uvicorn app.main:app --reload            # API on http://localhost:8000, docs at /docs
celery -A app.worker worker --pool=solo  # worker (--pool=solo is needed on Windows)
```

`PIPELINE_MODE=fake` (the default) uses the fake pipeline, so you don't need FFmpeg or an API key.

## Database changes

Tables are defined in `app/models.py`. After you change a model, create a migration and apply it:

```bash
alembic revision --autogenerate -m "describe the change"   # writes a file in migrations/versions/
alembic upgrade head                                       # applies it to your database
```

Read the generated file before committing. Autogenerate can miss some changes, like renamed columns.

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
| `alembic.ini` | Alembic settings (the database URL comes from `app/config.py`) |
| `migrations/` | Database migrations. Each file in `versions/` is one change |

## Tests

```bash
ruff check . && ruff format --check . && pytest
```

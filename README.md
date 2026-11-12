# Clip-AI

Finds the most viral moments in long podcasts and turns them into short clips ready to post.

| Folder | Team | What it is |
| --- | --- | --- |
| [`pipeline/`](pipeline/) | Pipeline | Python package: video in, scored clips out |
| [`backend/`](backend/) | Backend | FastAPI + Celery + Postgres + Redis |
| [`frontend/`](frontend/) | Frontend | Next.js website |
| [`docs/`](docs/) | Everyone | Architecture and the shared contracts |

Start with [`docs/architecture.md`](docs/architecture.md), then your team's README.

## Each team works on its own

Teams connect at two points, both defined in [`docs/contracts/`](docs/contracts/):

- **Pipeline → Backend:** `run_pipeline()` and the shapes in `pipeline/pipeline/models.py`
- **Backend → Frontend:** the REST API in `backend/app/schemas.py` and `frontend/lib/types.ts`

Until the other side is ready, each team uses a fake:

| Team | Uses | Switch |
| --- | --- | --- |
| Backend | `fake_run_pipeline()` | `PIPELINE_MODE=fake` / `real` |
| Frontend | `lib/mockApi.ts` | `NEXT_PUBLIC_API_MODE=mock` / `real` |
| Pipeline | Saved OpenAI replies in tests, `--fake` on the CLI | — |

## Workflow

1. Pick an issue on the Projects board and move it to **In Progress**.
2. Create a branch: `git checkout -b feature/<issue#>-short-name` (or `fix/...`).
3. Commit small changes and open a PR into `main`. Write `Closes #<issue#>` in the description.
4. CI must pass and the project lead must approve.
5. After approval, the PR is merged.

Direct pushes to `main` are blocked.

## Local setup

```bash
cp .env.example .env      # add your own API key
docker compose up -d      # Postgres + Redis (backend only)
```

Then follow your team's README. Never commit `.env`, videos, or model files.

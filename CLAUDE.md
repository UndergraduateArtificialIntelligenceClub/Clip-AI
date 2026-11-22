# Clip-AI

Upload a long podcast. Clip-AI finds the moments most likely to go viral and cuts them into short clips ready to post (TikTok, Reels, Shorts).

Built by a student team at the Undergraduate Artificial Intelligence Club (UAIC). Many contributors are learning, so keep code and explanations simple.

## How it works

1. **Upload**: the website sends the video to the API. The API saves it, creates a job, and queues it.
2. **Extract audio**: FFmpeg, mono 16 kHz MP3.
3. **Transcribe**: Whisper, in 10-minute pieces, with timestamps.
4. **Split into windows**: 30–90 s pieces that start and end on full sentences, one starting every 15 s.
5. **Score**: an LLM rates each window 0–10 on hook, emotion, stands alone, and payoff. Keep the top 5 that don't overlap and score 60 or more.
6. **Cut**: FFmpeg cuts the clips. Captions and a 9:16 crop are stretch goals.
7. **Review**: the website shows clips best first. The user approves, rejects, trims, and downloads.

Job status: `queued → extracting_audio → transcribing → scoring → cutting → done`, or `failed`.

Planned for v2, not now: embeddings + pgvector, RAG-based scoring.

## Stack and teams

| Folder | Team | Tech |
| --- | --- | --- |
| `pipeline/` | Pipeline | Python 3.11, FFmpeg, OpenAI Whisper + GPT, LangChain. No web code. |
| `backend/` | Backend | FastAPI, Postgres, Celery + Redis worker |
| `frontend/` | Frontend | Next.js 16, TypeScript, Tailwind |
| `docs/` | Everyone | Architecture and shared contracts |

Docker Compose runs Postgres and Redis locally. GitHub Actions runs lint and tests for all three folders on every PR.

## Fakes: teams work in parallel

- Frontend uses a mock API by default: `NEXT_PUBLIC_API_MODE=mock` (`real` for the backend).
- Backend uses a fake pipeline by default: `PIPELINE_MODE=fake` (`real` for the real pipeline).
- Both return the examples in `docs/contracts/examples/`. Keep fakes and examples in sync.

## Contracts (shared data shapes)

- Pipeline shapes: `pipeline/pipeline/models.py`. Entry point: `run_pipeline()` in `pipeline/pipeline/runner.py`.
- API shapes: `backend/app/schemas.py` and `frontend/lib/types.ts`.
- Database tables: `backend/app/models.py`.
- Changing a contract: update models, example JSON, and fakes in one PR and tag the other teams. Adding fields is fine. Renaming or removing a field needs everyone's OK. CI checks examples against the models.

## Checks (same as CI)

```bash
cd pipeline && ruff check . && ruff format --check . && pytest
cd backend  && ruff check . && ruff format --check . && pytest
cd frontend && npm run lint && npm run typecheck && npm test && npm run build
```

## Rules

- Never push to `main`. One branch per issue: `feature/<issue#>-short-name`. PR into `main` with `Closes #<issue#>`.
- Keep PRs small. CI must pass and the project lead must approve (see `.github/CODEOWNERS`).
- Tests never call OpenAI. Save real replies as JSON in `tests/fixtures/` and load them.
- Never commit API keys (use `.env`, copied from `.env.example`), videos, or audio. The repo is public.
- Frontend: Next.js 16 differs from older versions. Read `frontend/AGENTS.md` and `node_modules/next/dist/docs/` before using a feature you know from an older version.

## Current status

Scaffolding, fakes, website pages, API routes, and CI are in place. The real pipeline stages (`audio`, `transcribe`, `windows`, `score`, `cut`) and the backend `process_video` task are stubs (`NotImplementedError`) and are being built as starter issues.

## More detail

`README.md`, `docs/architecture.md`, `docs/contracts/README.md`, and each team's README.

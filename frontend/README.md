# Frontend

Next.js + TypeScript + Tailwind.

## Setup

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev        # http://localhost:3000
```

By default the app uses the **mock API** (`NEXT_PUBLIC_API_MODE=mock`), so you don't need the backend running. Set it to `real` to use the backend on port 8000.

## Layout

| Path | What it is |
| --- | --- |
| `app/page.tsx` | Upload page |
| `app/jobs/[jobId]/page.tsx` | Progress page |
| `app/videos/page.tsx` | Video list |
| `app/videos/[videoId]/page.tsx` | Clip review page |
| `lib/types.ts` | API shapes (the contract) |
| `lib/api.ts` | Picks the mock or real API. Pages only import from here |
| `lib/mockApi.ts` | Fake backend that returns the examples in `docs/contracts` |
| `lib/realApi.ts` | Calls the FastAPI backend |

## Checks (same as CI)

```bash
npm run lint && npm run typecheck && npm test && npm run build
```

> This project uses Next.js 16. APIs differ from older versions. Check `node_modules/next/dist/docs/` before using a feature you know from an older version.

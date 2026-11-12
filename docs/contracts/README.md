# Contracts

These files define the data that passes between teams. Every fake and every test reads them.

- `examples/*.json` — one real example of each shape.
- Python shapes: `pipeline/pipeline/models.py` (pipeline) and `backend/app/schemas.py` (API).
- TypeScript shapes: `frontend/lib/types.ts`.

## Changing a contract

1. Open a PR that updates the models, the example JSON, and the fakes together.
2. Tag the other teams in the PR.
3. Add fields freely. Renaming or removing a field needs everyone's OK.

CI checks every example file against the models, so a mismatch fails the build.

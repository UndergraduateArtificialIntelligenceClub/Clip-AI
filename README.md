# Clip-AI

## Workflow

1. Pick an issue.
2. Create a branch: `git checkout -b issue-<number>-short-name`
3. Commit your work and open a pull request into `main`.
4. CI (lint, format, tests) must pass and the project lead must approve.
5. After approval, the PR is merged into `main`.

Direct pushes to `main` are blocked.

## Local setup

```bash
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt -r requirements-dev.txt
ruff check . && ruff format --check . && pytest
```

import json
from pathlib import Path

import pytest

EXAMPLES = Path(__file__).resolve().parents[2] / "docs" / "contracts" / "examples"


@pytest.fixture
def example_transcript() -> dict:
    return json.loads((EXAMPLES / "transcript.json").read_text())


@pytest.fixture
def example_clips() -> list[dict]:
    return json.loads((EXAMPLES / "clips.json").read_text())

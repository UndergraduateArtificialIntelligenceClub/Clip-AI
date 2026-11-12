import json
from pathlib import Path

import pytest
from fastapi.testclient import TestClient

from app.main import app

EXAMPLES = Path(__file__).resolve().parents[2] / "docs" / "contracts" / "examples"


@pytest.fixture
def client() -> TestClient:
    return TestClient(app)


@pytest.fixture
def example():
    def load(name: str):
        return json.loads((EXAMPLES / name).read_text())

    return load

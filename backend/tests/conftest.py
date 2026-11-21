import json
from collections.abc import Iterator
from pathlib import Path

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy.pool import StaticPool

from app import models  # noqa: F401 -- register tables before creating the schema
from app.db import Base, get_db
from app.main import app

EXAMPLES = Path(__file__).resolve().parents[2] / "docs" / "contracts" / "examples"


@pytest.fixture
def db() -> Iterator[Session]:
    engine = create_engine(
        "sqlite://", connect_args={"check_same_thread": False}, poolclass=StaticPool
    )
    try:
        Base.metadata.create_all(engine)
        with Session(engine) as session:
            yield session
    finally:
        engine.dispose()


@pytest.fixture
def client(db: Session, monkeypatch) -> Iterator[TestClient]:
    monkeypatch.setitem(app.dependency_overrides, get_db, lambda: db)
    with TestClient(app) as test_client:
        yield test_client


@pytest.fixture
def example():
    def load(name: str):
        return json.loads((EXAMPLES / name).read_text())

    return load

"""Settings, read from environment variables or a .env file (see .env.example)."""

from typing import Literal

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=("../.env", ".env"), extra="ignore")

    database_url: str = "postgresql+psycopg://clipai:clipai@localhost:5432/clipai"
    redis_url: str = "redis://localhost:6379/0"
    storage_dir: str = "../storage"
    pipeline_mode: Literal["fake", "real"] = "fake"
    celery_eager: bool = False  # run tasks right away, without Redis (used in tests)
    cors_origins: list[str] = ["http://localhost:3000"]


settings = Settings()

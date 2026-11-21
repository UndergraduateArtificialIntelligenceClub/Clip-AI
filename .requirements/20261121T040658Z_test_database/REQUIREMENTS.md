## As Is
Backend tests have a client fixture but no shared database fixture.

## To Be
Each test can use a fresh in-memory SQLite database, including through FastAPI.

## Requirements
1. Provide a db session with the application tables created.
2. Override get_db for the test client for the duration of the test.

## Acceptance Criteria
1. A committed Video can be read back from SQLite after clearing the session.
2. A client request with a database dependency can read that same Video.

## Testing Plan
Verify both behaviors with pytest and run backend CI commands locally.

## Implementation Plan
1. Add a failing Video round-trip test, implement db, then rerun.
2. Add a failing client integration test, override get_db, then run both tests and backend checks.

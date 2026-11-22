## As Is

The route receives a database session and returns HTTP 501 for every ID. The backend tests have an HTTP client and example payloads.

## To Be

The website can read the latest saved job status and progress using the ID from the upload response.

## Requirements

1. Retrieve the requested job using db.get(Job, job_id) and return it through JobOut.
2. Return HTTP 404 with the detail "Job not found" for an unknown ID.

## Acceptance Criteria

1. A request for a committed job returns HTTP 200 and the five fields in the job response contract.
2. A request for an absent ID returns HTTP 404 and the specified detail.

## Testing Plan

Use the FastAPI test client with an isolated SQLite database. Seed a video and job for the success case. Exercise the missing-ID case separately.

## Implementation Plan

1. Add the database fixture and success test. Observe the 501 failure, implement the lookup, and rerun the test.
2. Add the missing-ID test. Observe the failure, implement the 404 response, and rerun both tests.
3. Run the backend suite and Ruff checks.

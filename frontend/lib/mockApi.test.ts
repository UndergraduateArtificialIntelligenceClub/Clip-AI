import { afterEach, describe, expect, it, vi } from "vitest";
import { MOCK_STEP_MS, mockApi } from "./mockApi";

afterEach(() => {
  vi.useRealTimers();
});

describe("mockApi", () => {
  it("moves a job through every status until done", async () => {
    vi.useFakeTimers();
    const { job_id } = await mockApi.uploadVideo(new File([], "a.mp4"));

    expect((await mockApi.getJob(job_id)).status).toBe("queued");
    vi.advanceTimersByTime(MOCK_STEP_MS * 2);
    expect((await mockApi.getJob(job_id)).status).toBe("transcribing");
    vi.advanceTimersByTime(MOCK_STEP_MS * 10);
    const done = await mockApi.getJob(job_id);
    expect(done.status).toBe("done");
    expect(done.progress).toBe(1);
  });

  it("returns clips best score first", async () => {
    const { video_id } = await mockApi.uploadVideo(new File([], "a.mp4"));
    const scores = (await mockApi.getClips(video_id)).map((c) => c.score);
    expect(scores).toEqual([...scores].sort((a, b) => b - a));
  });

  it("updates a clip's status", async () => {
    const [clip] = await mockApi.getClips((await mockApi.listVideos())[0].id);
    const updated = await mockApi.updateClip(clip.id, { status: "approved" });
    expect(updated.status).toBe("approved");
  });
});

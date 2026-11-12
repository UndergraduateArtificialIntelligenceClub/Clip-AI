// Fake backend for building the UI before the real API exists.
// Returns the shared examples from docs/contracts. Jobs move to the next status every few seconds.

import exampleClips from "../../docs/contracts/examples/clips.json";
import exampleUpload from "../../docs/contracts/examples/upload_response.json";
import exampleVideo from "../../docs/contracts/examples/video.json";
import type { Api, Clip, Job, JobStatus, Video } from "./types";

const STEPS: JobStatus[] = [
  "queued",
  "extracting_audio",
  "transcribing",
  "scoring",
  "cutting",
  "done",
];
export const MOCK_STEP_MS = 3000;

const clips = new Map<string, Clip>((exampleClips as Clip[]).map((c) => [c.id, { ...c }]));
const jobStartedAt = new Map<string, number>();

export const mockApi: Api = {
  async uploadVideo() {
    jobStartedAt.set(exampleUpload.job_id, Date.now());
    return exampleUpload;
  },

  async listVideos() {
    return [exampleVideo as Video];
  },

  async getJob(jobId) {
    const startedAt = jobStartedAt.get(jobId) ?? Date.now();
    jobStartedAt.set(jobId, startedAt);
    const step = Math.min(Math.floor((Date.now() - startedAt) / MOCK_STEP_MS), STEPS.length - 1);
    const job: Job = {
      id: jobId,
      video_id: exampleVideo.id,
      status: STEPS[step],
      progress: step / (STEPS.length - 1),
      error: null,
    };
    return job;
  },

  async getClips(videoId) {
    return [...clips.values()]
      .filter((c) => c.video_id === videoId)
      .sort((a, b) => b.score - a.score);
  },

  async updateClip(clipId, update) {
    const clip = clips.get(clipId);
    if (!clip) throw new Error("Clip not found");
    const updated = { ...clip, ...update };
    clips.set(clipId, updated);
    return updated;
  },

  clipVideoSrc() {
    return "/sample_clip.mp4";
  },
};

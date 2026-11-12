// Talks to the FastAPI backend.

import type { Api, Clip } from "./types";

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, init);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail ?? `Request failed (${res.status})`);
  }
  return res.json();
}

export const realApi: Api = {
  uploadVideo(file) {
    const form = new FormData();
    form.append("file", file);
    return request("/api/videos", { method: "POST", body: form });
  },

  listVideos() {
    return request("/api/videos");
  },

  getJob(jobId) {
    return request(`/api/jobs/${jobId}`);
  },

  getClips(videoId) {
    return request(`/api/videos/${videoId}/clips`);
  },

  updateClip(clipId, update) {
    return request(`/api/clips/${clipId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(update),
    });
  },

  clipVideoSrc(clip: Clip) {
    return `${BASE}${clip.video_url}`;
  },
};

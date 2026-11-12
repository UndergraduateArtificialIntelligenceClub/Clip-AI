// API shapes. Keep in sync with backend/app/schemas.py and docs/contracts/examples.

export type JobStatus =
  | "queued"
  | "extracting_audio"
  | "transcribing"
  | "scoring"
  | "cutting"
  | "done"
  | "failed";

export type ClipStatus = "pending" | "approved" | "rejected";

export interface UploadResponse {
  video_id: string;
  job_id: string;
}

export interface Video {
  id: string;
  filename: string;
  duration: number | null; // seconds
  created_at: string; // ISO date
}

export interface Job {
  id: string;
  video_id: string;
  status: JobStatus;
  progress: number; // 0 to 1
  error: string | null;
}

export interface Scores {
  hook: number; // 0-10
  emotion: number;
  standalone: number;
  payoff: number;
}

export interface Clip {
  id: string;
  video_id: string;
  start: number; // seconds into the original video
  end: number;
  score: number; // 0-100
  scores: Scores;
  title: string;
  reason: string;
  transcript: string;
  status: ClipStatus;
  video_url: string; // path on the backend, e.g. /api/clips/{id}/video
}

export interface ClipUpdate {
  status?: ClipStatus;
  start?: number;
  end?: number;
}

export interface Api {
  uploadVideo(file: File): Promise<UploadResponse>;
  listVideos(): Promise<Video[]>;
  getJob(jobId: string): Promise<Job>;
  getClips(videoId: string): Promise<Clip[]>;
  updateClip(clipId: string, update: ClipUpdate): Promise<Clip>;
  clipVideoSrc(clip: Clip): string; // URL a <video> tag can play
}

// Progress page (frontend issue).
// Poll api.getJob(jobId) every 3 seconds and show the status and a progress bar.
// When status is "done", go to /videos/{job.video_id}. When "failed", show job.error.

export default function JobPage() {
  return (
    <section className="space-y-2">
      <h1 className="text-2xl font-semibold">Processing your video</h1>
      <p className="opacity-70">Progress bar goes here.</p>
    </section>
  );
}

import { api } from "@/lib/api";
import type { Clip } from "@/lib/types";

interface ClipCardProps {
  clip: Clip;
  rank?: number;
  index?: number;
}

function formatTime(seconds: number): string {
  const totalSeconds = Math.max(0, Math.floor(seconds));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const remainingSeconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  }

  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

export default function ClipCard({ clip, rank, index }: ClipCardProps) {
  const clipRank = rank ?? (index === undefined ? undefined : index + 1);
  const clipSrc = api.clipVideoSrc(clip);
  const duration = Math.max(0, clip.end - clip.start);

  return (
    <article className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm dark:border-white/10 dark:bg-[#16161f]">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-black/5 px-5 py-4 dark:border-white/10">
        <div className="min-w-0">
          <p className="mb-1 text-xs font-semibold tracking-wide text-violet-700 dark:text-violet-300">
            {clipRank === undefined ? "Viral clip" : `Clip #${clipRank}`}
          </p>
          <h2 className="text-lg font-semibold">{clip.title}</h2>
        </div>
        <div className="shrink-0 rounded-full bg-emerald-100 px-3 py-1.5 text-sm font-bold text-emerald-800 dark:bg-emerald-400/15 dark:text-emerald-300">
          {clip.score} / 100
          <span className="ml-1 font-medium">viral score</span>
        </div>
      </div>

      <div className="space-y-5 p-5">
        <p className="text-sm text-black/60 dark:text-white/60">
          {formatTime(clip.start)} – {formatTime(clip.end)}
          <span className="mx-2 text-black/25 dark:text-white/25">·</span>
          {Math.round(duration)} sec
        </p>

        <video
          className="aspect-video w-full rounded-xl bg-[#0d0d12] object-contain"
          controls
          preload="metadata"
          src={clipSrc}
        >
          Your browser does not support the video element.
        </video>

        {clip.reason && (
          <section>
            <h3 className="mb-1 text-sm font-semibold">Why this hook works</h3>
            <p className="text-sm leading-6 text-black/65 dark:text-white/65">{clip.reason}</p>
          </section>
        )}

        {clip.transcript && (
          <section>
            <h3 className="mb-1 text-sm font-semibold">Transcript</h3>
            <p className="whitespace-pre-wrap text-sm leading-6 text-black/65 dark:text-white/65">
              {clip.transcript}
            </p>
          </section>
        )}

        <a
          className="inline-flex items-center rounded-lg border border-violet-600/25 px-4 py-2 text-sm font-semibold text-violet-700 transition hover:bg-violet-600/10 dark:border-violet-300/25 dark:text-violet-300 dark:hover:bg-violet-300/10"
          href={clipSrc}
          download
        >
          Download clip
        </a>
      </div>
    </article>
  );
}

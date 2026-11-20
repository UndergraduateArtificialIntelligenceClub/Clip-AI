"use client";

import { ChangeEvent, DragEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  FileVideo,
  LoaderCircle,
  Play,
  Sparkles,
  UploadCloud,
  WandSparkles,
  X,
} from "lucide-react";
import { api } from "@/lib/api";

const MAX_SIZE = 2 * 1024 * 1024 * 1024;
const VALID_EXTENSIONS = /\.(mp4|mov|mkv)$/i;

function formatFileSize(bytes: number) {
  if (bytes >= 1024 * 1024 * 1024) {
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  }
  return `${Math.max(bytes / (1024 * 1024), 0.01).toFixed(1)} MB`;
}

export default function UploadPage() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);

  function validateAndSet(nextFile: File) {
    const validType =
      ["video/mp4", "video/quicktime", "video/x-matroska"].includes(nextFile.type) ||
      VALID_EXTENSIONS.test(nextFile.name);

    if (!validType) {
      setFile(null);
      setError("Unsupported format. Please choose an MP4, MOV, or MKV video.");
      return;
    }
    if (nextFile.size > MAX_SIZE) {
      setFile(null);
      setError("This file is larger than 2GB. Choose a smaller video.");
      return;
    }

    setError("");
    setFile(nextFile);
  }

  function handleInput(event: ChangeEvent<HTMLInputElement>) {
    const nextFile = event.target.files?.[0];
    if (nextFile) validateAndSet(nextFile);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);
    const nextFile = event.dataTransfer.files?.[0];
    if (nextFile) validateAndSet(nextFile);
  }

  async function submitUpload(uploadFile: File) {
    setLoading(true);
    setError("");
    try {
      const response = await api.uploadVideo(uploadFile);
      router.push(`/jobs/${response.job_id}`);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Upload failed. Please try again.",
      );
      setLoading(false);
    }
  }

  return (
    <section className="pb-16 pt-14 md:pb-20 md:pt-20">
      <div className="mx-auto max-w-[820px] text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-violet-300/60 bg-violet-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-violet-700 dark:border-violet-400/20 dark:bg-violet-500/10 dark:text-violet-300">
          <Sparkles className="h-3.5 w-3.5" />
          AI Video Clipping Pipeline
        </div>

        <h1 className="mx-auto mt-7 max-w-[760px] text-balance text-[42px] font-bold leading-[1.08] tracking-[-0.045em] text-slate-950 sm:text-[56px] md:text-[68px] dark:text-white">
          Turn long-form videos into{" "}
          <span className="bg-gradient-to-r from-violet-600 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent dark:from-violet-400 dark:via-violet-300 dark:to-fuchsia-400">
            viral shorts
          </span>{" "}
          in seconds.
        </h1>

        <p className="mx-auto mt-6 max-w-[680px] text-pretty text-base leading-7 text-slate-600 md:text-[17px] dark:text-slate-400">
          Upload any long-form video, interview, lecture, or podcast. Whisper
          transcribes it, our AI scores the most viral moments, and you get
          ready-to-post clips.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-[760px]">
        <input
          ref={inputRef}
          type="file"
          accept="video/mp4,video/quicktime,video/x-matroska,.mp4,.mov,.mkv"
          onChange={handleInput}
          className="hidden"
        />

        {file ? (
          <div className="rounded-[24px] border border-slate-200 bg-white p-3 shadow-[0_24px_80px_rgba(15,23,42,.08)] dark:border-white/10 dark:bg-[#111118] dark:shadow-[0_24px_80px_rgba(0,0,0,.28)]">
            <div className="flex items-center gap-4 rounded-[18px] border border-slate-100 bg-slate-50 p-4 sm:p-5 dark:border-white/6 dark:bg-white/[0.035]">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/20">
                <FileVideo className="h-7 w-7" />
              </div>
              <div className="min-w-0 flex-1 text-left">
                <p className="truncate text-sm font-bold text-slate-950 sm:text-base dark:text-white">
                  {file.name}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  Ready to upload · {formatFileSize(file.size)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="hidden h-10 rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 transition hover:border-violet-300 hover:text-violet-600 sm:block dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300"
              >
                Change
              </button>
              <button
                type="button"
                onClick={() => setFile(null)}
                aria-label="Remove selected file"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-white/10 dark:hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {error && (
              <p className="px-4 pt-3 text-left text-sm font-medium text-red-500" role="alert">
                {error}
              </p>
            )}

            <button
              type="button"
              disabled={loading}
              onClick={() => void submitUpload(file)}
              className="mt-3 flex h-14 w-full items-center justify-center gap-2 rounded-[16px] bg-gradient-to-r from-violet-600 via-violet-500 to-fuchsia-500 text-sm font-bold text-white shadow-[0_12px_30px_rgba(124,58,237,.25)] transition hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <>
                  <LoaderCircle className="h-5 w-5 animate-spin" />
                  Uploading video…
                </>
              ) : (
                <>
                  <WandSparkles className="h-5 w-5" />
                  Generate Viral Clips
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        ) : (
          <div
            role="button"
            tabIndex={0}
            onClick={() => inputRef.current?.click()}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") inputRef.current?.click();
            }}
            onDragEnter={(event) => {
              event.preventDefault();
              setDragging(true);
            }}
            onDragOver={(event) => event.preventDefault()}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            className={`rounded-[24px] border border-dashed p-3 transition ${
              dragging
                ? "border-violet-500 bg-violet-50/80 dark:bg-violet-500/10"
                : "border-slate-300 bg-white dark:border-white/15 dark:bg-[#111118]"
            } shadow-[0_24px_80px_rgba(15,23,42,.08)] dark:shadow-[0_24px_80px_rgba(0,0,0,.28)]`}
          >
            <div className="flex min-h-[235px] flex-col items-center justify-center rounded-[18px] bg-slate-50/70 px-6 py-8 dark:bg-white/[0.025]">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-200 bg-white text-violet-600 shadow-sm dark:border-violet-400/20 dark:bg-violet-500/10 dark:text-violet-300">
                <UploadCloud className="h-7 w-7" />
              </div>
              <p className="mt-5 text-base font-bold text-slate-950 dark:text-white">
                Drag & drop your video here
              </p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                or{" "}
                <span className="font-bold text-violet-600 dark:text-violet-300">
                  browse local files
                </span>
              </p>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  inputRef.current?.click();
                }}
                className="mt-5 flex h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-5 text-sm font-bold text-white shadow-lg shadow-violet-500/20"
              >
                <Play className="h-4 w-4 fill-current" />
                Select Video File
              </button>
              <p className="mt-3 text-[11px] font-medium text-slate-400">
                MP4, MOV, or MKV · Maximum 2GB
              </p>
            </div>

            {error && (
              <p className="px-4 pb-1 pt-3 text-center text-sm font-medium text-red-500" role="alert">
                {error}
              </p>
            )}
          </div>
        )}

      </div>

      <div className="mx-auto mt-16 grid max-w-[1080px] gap-4 md:grid-cols-3">
        {[
          {
            number: "01",
            title: "Whisper Transcription",
            description:
              "Word-level timestamps and speaker-aware transcripts generated automatically from clean FFmpeg audio tracks.",
            icon: "transcript",
          },
          {
            number: "02",
            title: "AI Viral Moment Scoring",
            description:
              "Evaluates 30–90s candidate windows for opening hook strength, pacing, emotional resonance, and shareability.",
            icon: "score",
          },
          {
            number: "03",
            title: "Auto-Cut & Export",
            description:
              "Smart 9:16 active-speaker reframing, animated burned-in captions, and instant 1080p MP4 or batch ZIP export.",
            icon: "export",
          },
        ].map((feature) => (
          <article
            key={feature.number}
            className="rounded-[20px] border border-slate-200 bg-white p-5 text-left shadow-[0_12px_40px_rgba(15,23,42,.04)] dark:border-white/8 dark:bg-white/[0.025]"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold tracking-[0.12em] text-violet-600 dark:text-violet-400">
                {feature.number}
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-300">
                {feature.icon === "transcript" ? (
                  <UploadCloud className="h-4 w-4" />
                ) : feature.icon === "score" ? (
                  <Sparkles className="h-4 w-4" />
                ) : (
                  <ArrowRight className="h-4 w-4" />
                )}
              </span>
            </div>
            <h2 className="mt-5 text-[15px] font-bold text-slate-950 dark:text-white">
              {feature.title}
            </h2>
            <p className="mt-2 text-[13px] leading-6 text-slate-500 dark:text-slate-400">
              {feature.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

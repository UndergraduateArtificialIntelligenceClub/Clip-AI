"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import ClipCard from "@/components/ClipCard";
import { api } from "@/lib/api";
import type { Clip } from "@/lib/types";

type ClipsState =
  | { status: "loading" }
  | { status: "error"; videoId: string; message: string }
  | { status: "success"; videoId: string; clips: Clip[] };

export default function ClipsPage() {
  const { videoId } = useParams<{ videoId: string }>();
  const [state, setState] = useState<ClipsState>({ status: "loading" });

  useEffect(() => {
    let active = true;

    api
      .getClips(videoId)
      .then((clips) => {
        if (active) setState({ status: "success", videoId, clips });
      })
      .catch((error: unknown) => {
        if (active) {
          setState({
            status: "error",
            videoId,
            message: error instanceof Error ? error.message : "Unable to load clips.",
          });
        }
      });

    return () => {
      active = false;
    };
  }, [videoId]);

  const visibleState: ClipsState =
    state.status !== "loading" && state.videoId !== videoId ? { status: "loading" } : state;
  const sortedClips =
    visibleState.status === "success"
      ? [...visibleState.clips].sort((a, b) => b.score - a.score)
      : [];

  return (
    <section className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="mb-1 text-sm font-semibold tracking-wide text-violet-700 dark:text-violet-300">
            Studio
          </p>
          <h1 className="text-2xl font-bold tracking-tight">Your viral clips</h1>
          {visibleState.status === "success" && (
            <p className="mt-2 inline-flex rounded-full bg-violet-100 px-3 py-1 text-sm font-semibold text-violet-800 dark:bg-violet-400/15 dark:text-violet-200">
              {sortedClips.length} Viral {sortedClips.length === 1 ? "Clip" : "Clips"} Found
            </p>
          )}
        </div>
        <Link
          href="/"
          className="inline-flex items-center rounded-lg bg-violet-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-600"
        >
          + New Upload
        </Link>
      </header>

      {visibleState.status === "loading" && (
        <p className="rounded-xl border border-black/10 bg-white p-5 text-sm text-black/60 dark:border-white/10 dark:bg-[#16161f] dark:text-white/60">
          Loading…
        </p>
      )}

      {visibleState.status === "error" && (
        <div
          className="rounded-xl border border-red-500/20 bg-red-50 p-5 text-sm text-red-800 dark:border-red-400/20 dark:bg-red-400/10 dark:text-red-200"
          role="alert"
        >
          <h2 className="font-semibold">Couldn’t load clips</h2>
          <p className="mt-1">{visibleState.message}</p>
        </div>
      )}

      {visibleState.status === "success" && sortedClips.length === 0 && (
        <div className="rounded-xl border border-black/10 bg-white p-8 text-center dark:border-white/10 dark:bg-[#16161f]">
          <h2 className="font-semibold">No clips found yet</h2>
          <p className="mt-2 text-sm text-black/60 dark:text-white/60">
            Try another video or check back after clip processing is complete.
          </p>
        </div>
      )}

      {sortedClips.length > 0 && (
        <div className="grid gap-5">
          {sortedClips.map((clip, index) => (
            <ClipCard key={clip.id} clip={clip} rank={index + 1} />
          ))}
        </div>
      )}
    </section>
  );
}

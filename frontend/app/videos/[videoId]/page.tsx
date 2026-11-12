// Clip review page (frontend issue).
// Show api.getClips(videoId) best first: player (api.clipVideoSrc(clip)), title, score,
// reason, and approve / reject buttons that call api.updateClip().

export default function ClipsPage() {
  return (
    <section className="space-y-2">
      <h1 className="text-2xl font-semibold">Clips</h1>
      <p className="opacity-70">Clip cards go here.</p>
    </section>
  );
}

"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Track = {
  src: string;
  title: string;
  artist?: string;
  cover?: string;
};

const playlist: Track[] = [
  {
    src: "/audio/BGM.mp3",
    title: "Night Cruising",
    artist: "City Pop",
    cover: "/citypop/citypop_cover.jpg",
  },
];

function fmt(t: number) {
  if (!isFinite(t)) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function CityPopPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoop, setIsLoop] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);

  const current = useMemo(() => playlist[index], [index]);

  // initialize audio element
  useEffect(() => {
    if (!audioRef.current) return;
    const a = audioRef.current;
    a.volume = volume;
  }, []);

  // load track on index change
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const wasPlaying = isPlaying;
    a.src = current.src;
    a.loop = isLoop;
    a.load();
    setTime(0);
    // Only play after user interaction; browsers block auto-play
    if (wasPlaying) a.play().catch(() => setIsPlaying(false));
  }, [index, current.src]); // eslint-disable-line

  // wire events
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    const onLoaded = () => setDuration(a.duration || 0);
    const onTime = () => setTime(a.currentTime || 0);
    const onEnd = () => {
      if (isLoop) return;
      setIndex((i) => (i + 1) % playlist.length);
    };

    a.addEventListener("loadedmetadata", onLoaded);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("ended", onEnd);

    return () => {
      a.removeEventListener("loadedmetadata", onLoaded);
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("ended", onEnd);
    };
  }, [isLoop]);

  // controls
  const togglePlay = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (isPlaying) {
      a.pause();
      setIsPlaying(false);
    } else {
      try {
        await a.play();
        setIsPlaying(true);
      } catch {
        // play will fail until user interacts (browser policy)
        setIsPlaying(false);
      }
    }
  };

  const seek = (v: number) => {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = v;
    setTime(v);
  };

  const changeVolume = (v: number) => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = v;
    setVolume(v);
  };

  const prev = () =>
    setIndex((i) => (i - 1 + playlist.length) % playlist.length);
  const next = () => setIndex((i) => (i + 1) % playlist.length);

  const toggleLoop = () => {
    const a = audioRef.current;
    if (!a) return;
    a.loop = !isLoop;
    setIsLoop(!isLoop);
  };

  return (
    <>
      <audio ref={audioRef} preload="metadata" />

      {/* Sticky bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-[60]">
        <div className="mx-auto mb-4 w-full max-w-5xl rounded-2xl border border-white/15 bg-[#0e0a1a]/80 backdrop-blur px-4 py-3 text-white shadow-lg">
          <div className="flex items-center gap-3">
            {/* Cover */}
            <img
              src={current.cover ?? "/citypop/citypop_cover.jpg"}
              alt=""
              width={44}
              height={44}
              className="h-11 w-11 rounded-lg object-cover"
            />

            {/* Titles */}
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold">
                {current.title}
              </div>
              <div className="truncate text-xs text-white/60">
                {current.artist ?? "City Pop"}
              </div>
            </div>

            {/* Transport */}
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                aria-label="Previous"
                className="rounded-md border border-white/15 px-2 py-1 hover:bg-white/10"
              >
                {/* prev icon */}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M6 6h2v12H6zM20 6v12L9 12z" />
                </svg>
              </button>

              <button
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause" : "Play"}
                className="rounded-md bg-white px-3 py-1.5 text-black font-medium hover:bg-white/90"
              >
                {isPlaying ? "Pause" : "Play"}
              </button>

              <button
                onClick={next}
                aria-label="Next"
                className="rounded-md border border-white/15 px-2 py-1 hover:bg-white/10"
              >
                {/* next icon */}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M16 6h2v12h-2zM4 6l11 6-11 6z" />
                </svg>
              </button>

              <button
                onClick={toggleLoop}
                aria-pressed={isLoop}
                title="Loop track"
                className={`rounded-md border px-2 py-1 ${
                  isLoop
                    ? "border-fuchsia-400 text-fuchsia-300"
                    : "border-white/15 hover:bg-white/10"
                }`}
              >
                ⟲
              </button>
            </div>
          </div>

          {/* Seek + time */}
          <div className="mt-2 flex items-center gap-3">
            <span className="w-10 text-right text-[11px] tabular-nums text-white/60">
              {fmt(time)}
            </span>
            <input
              type="range"
              min={0}
              max={Math.max(duration, 0.000001)}
              step={0.1}
              value={Math.min(time, duration || 0)}
              onChange={(e) => seek(parseFloat(e.currentTarget.value))}
              className="flex-1 accent-fuchsia-400"
            />
            <span className="w-10 text-[11px] tabular-nums text-white/60">
              {fmt(duration)}
            </span>

            {/* Volume */}
            <div className="ml-2 hidden items-center gap-2 sm:flex">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-white/70"
              >
                <path d="M3 9v6h4l5 5V4L7 9H3z" />
              </svg>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) =>
                  changeVolume(parseFloat(e.currentTarget.value))
                }
                className="w-28 accent-cyan-300"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

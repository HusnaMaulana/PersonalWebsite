"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src?: string; // audio path
  initialVolume?: number; // 0..1
  size?: number; // px (visual diameter of disc)
  className?: string; // to override positioning
};

export default function DiscPlayer({
  src = "/audio/BGM.mp3",
  initialVolume = 0.8,
  size = 112,
  className = "",
}: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    a.src = src;
    a.loop = true;
    a.volume = initialVolume;

    let disposed = false;

    const tryPlay = async () => {
      try {
        await a.play();
        setIsPlaying(true);
        setAutoplayBlocked(false);
        return true;
      } catch {
        setIsPlaying(false);
        setAutoplayBlocked(true);
        return false;
      }
    };

    let cleanup: (() => void) | null = null;
    tryPlay().then((ok) => {
      if (!ok && !disposed) {
        const resume = async () => {
          await tryPlay();
          cleanup?.();
        };
        const on = (t: keyof WindowEventMap) =>
          window.addEventListener(t, resume, { once: true });
        const off = (t: keyof WindowEventMap) =>
          window.removeEventListener(t, resume);
        on("pointerdown");
        on("keydown");
        cleanup = () => {
          off("pointerdown");
          off("keydown");
        };
      }
    });

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);

    return () => {
      disposed = true;
      cleanup?.();
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      a.pause();
    };
  }, [src, initialVolume]);

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      try {
        await a.play();
        setIsPlaying(true);
        setAutoplayBlocked(false);
      } catch {
        setIsPlaying(false);
      }
    } else {
      a.pause();
      setIsPlaying(false);
    }
  };

  // spinning utility
  const spinClass = [
    "will-change-transform",
    "rounded-full object-cover",
    "motion-safe:animate-[spin_6s_linear_infinite]",
  ].join(" ");

  return (
    <>
      <audio ref={audioRef} preload="metadata" playsInline />

      <button
        onClick={toggle}
        aria-label={isPlaying ? "Pause" : "Play"}
        aria-pressed={isPlaying}
        className={[
          "fixed bottom-4 left-4 z-50",
          "p-3 rounded-full hover:bg-black/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
          isPlaying ? "ring-2 ring-fuchsia-400/60" : "ring-1 ring-white/15",
          "transition",
          className,
        ].join(" ")}
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 0.75rem)" }}
        title={isPlaying ? "Click to pause" : "Click to play"}
      >
        <div className="relative" style={{ width: size, height: size }}>
          <img
            src="/citypop/citypop_cover.jpg"
            alt="disc cover"
            className={`h-full w-full ${spinClass}`}
            draggable={false}
            // inline style ensures pause works even if your Tailwind doesn't support bracket utilities
            style={{ animationPlayState: isPlaying ? "running" : "paused" }}
          />
          {/* optional center hole + ring */}
          <span className="pointer-events-none absolute left-1/2 top-1/2 block h-[6%] w-[6%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/80" />
          <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/20" />
        </div>
      </button>
    </>
  );
}

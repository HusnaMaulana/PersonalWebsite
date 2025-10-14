"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src?: string;
  initialVolume?: number; // 0..1
  size?: number; // max size on desktop (px)
  className?: string;
};

export default function DiscPlayer({
  src = "/audio/BGM.mp3",
  initialVolume = 0.8,
  size = 112, // desktop cap
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

  // Responsive diameter: 56px on tiny screens → up to `size` on desktop
  const diameter = `clamp(56px, 18vw, ${size}px)`;

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
        title={isPlaying ? "Click to pause" : "Click to play"}
        className={[
          "fixed z-40",
          // placement (bottom-left). To put it bottom-right on mobile, swap to: 'right-3 md:left-6 left-auto'
          "left-3 md:left-6",
          // safe bottom spacing + desktop bump
          "bottom-3 md:bottom-6",
          "rounded-full hover:bg-black/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
          // subtler ring on mobile
          isPlaying
            ? "ring-2 md:ring-2 ring-fuchsia-400/60"
            : "ring-1 md:ring-1 ring-white/15",
          "transition",
          className,
        ].join(" ")}
        // IMPORTANT: offset above safe area (don’t pad the button)
        style={{ bottom: "calc(env(safe-area-inset-bottom) + 30px)" }}
      >
        <div className="relative" style={{ width: diameter, height: diameter }}>
          <img
            src="/citypop/citypop_cover.jpg"
            alt="disc cover"
            className={`h-full w-full ${spinClass}`}
            draggable={false}
            style={{ animationPlayState: isPlaying ? "running" : "paused" }}
          />
          <span className="pointer-events-none absolute left-1/2 top-1/2 block h-[6%] w-[6%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/80" />
          <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/20" />
        </div>
      </button>
    </>
  );
}

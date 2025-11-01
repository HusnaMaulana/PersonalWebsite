"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function ImageProjects({
  images,
  interval = 3500,
  titleForAlt = "project",
}: {
  images: string[];
  interval?: number;
  titleForAlt?: string;
}) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = images.length || 0;
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  useEffect(() => {
    if (count <= 1 || paused || reducedRef.current) return;
    const id = setInterval(() => setI((v) => (v + 1) % count), interval);
    return () => clearInterval(id);
  }, [count, paused, interval]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [count]);

  const prev = () => setI((v) => (v - 1 + count) % count);
  const next = () => setI((v) => (v + 1) % count);

  return (
    <figure
      className="relative aspect-video overflow-hidden rounded-xl bg-black/30 select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="group"
      aria-roledescription="carousel"
      aria-label={titleForAlt}
      aria-live="polite"
    >
      {images.map((src, idx) => (
        <div
          key={`${src}-${idx}`}
          className={`absolute inset-0 transition-opacity duration-500 ${
            idx === i ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={idx !== i}
        >
          <Image
            src={src}
            alt={`${titleForAlt} image ${idx + 1}`}
            fill
            sizes="(min-width: 768px) 66vw, 100vw"
            className="object-cover"
            priority={idx === 0}
          />
        </div>
      ))}

      {count > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white ring-1 ring-white/20 backdrop-blur hover:bg-black/60"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M15 18l-6-6 6-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white ring-1 ring-white/20 backdrop-blur hover:bg-black/60"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M9 6l6 6-6 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </button>

          <figcaption className="pointer-events-none absolute bottom-3 left-0 right-0 flex justify-center gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Go to image ${idx + 1}`}
                onClick={() => setI(idx)}
                className={`pointer-events-auto h-2.5 w-2.5 rounded-full ring-1 ring-white/30 ${
                  i === idx ? "bg-white" : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </figcaption>
        </>
      )}
    </figure>
  );
}

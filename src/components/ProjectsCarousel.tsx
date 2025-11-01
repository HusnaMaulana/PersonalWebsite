// src/components/ProjectsCarousel.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import type { Project } from "@/data/project";

export default function ProjectsCarousel({
  projects,
}: {
  projects: Project[];
}) {
  const [perView, setPerView] = useState(1);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<Project | null>(null);

  // responsive: 1 card on small, 2 on md+
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setPerView(mq.matches ? 2 : 1);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const maxIndex = Math.max(0, (projects?.length || 0) - perView);
  const canPrev = index > 0;
  const canNext = index < maxIndex;

  const itemW = useMemo(() => 100 / perView, [perView]);

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(maxIndex, i + 1));

  // keyboard support (left/right)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [maxIndex]);

  const pos = useRef<{ startX: number; deltaX: number } | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    pos.current = { startX: e.touches[0].clientX, deltaX: 0 };
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!pos.current) return;
    pos.current.deltaX = e.touches[0].clientX - pos.current.startX;
  };
  const onTouchEnd = () => {
    if (!pos.current) return;
    if (pos.current.deltaX > 40) prev();
    else if (pos.current.deltaX < -40) next();
    pos.current = null;
  };

  return (
    <div className="relative">
      {/* track */}
      <div
        className="-mx-2 overflow-hidden"
        role="region"
        aria-label="Projects carousel"
        aria-live="polite"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${index * itemW}%)` }}
        >
          {projects.map((p) => (
            <div
              key={p.slug}
              className="shrink-0 px-2"
              style={{ width: `${itemW}%`, flex: `0 0 ${itemW}%` }}
            >
              <ProjectCard p={p} onOpen={() => setSelected(p)} />
            </div>
          ))}
        </div>
      </div>

      {/* controls */}
      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between">
        <button
          type="button"
          onClick={prev}
          disabled={!canPrev}
          aria-label="Previous projects"
          className="pointer-events-auto ml-[-0.25rem] rounded-full bg-white/10 p-2 backdrop-blur ring-1 ring-white/15 hover:bg-white/20 disabled:opacity-40 disabled:hover:bg-white/10"
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
          onClick={next}
          disabled={!canNext}
          aria-label="Next projects"
          className="pointer-events-auto mr-[-0.25rem] rounded-full bg-white/10 p-2 backdrop-blur ring-1 ring-white/15 hover:bg-white/20 disabled:opacity-40 disabled:hover:bg-white/10"
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
      </div>

      {/* modal */}
      <ProjectModal
        project={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}

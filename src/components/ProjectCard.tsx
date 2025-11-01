// src/components/ProjectCard.tsx
"use client";

import Image from "next/image";
import type { Project } from "@/data/project";

export default function ProjectCard({
  p,
  onOpen,
}: {
  p: Project;
  onOpen?: (p: Project) => void;
}) {
  const open = () => onOpen?.(p);

  return (
    <article
      className="group rounded-2xl  bg-white/5 p-4 transition hover:border-white/25"
      role={onOpen ? "button" : undefined}
      tabIndex={onOpen ? 0 : -1}
      aria-label={onOpen ? `Open details for ${p.title}` : undefined}
      onClick={(e) => {
        // allow clicks on <a> to behave normally (don't open modal)
        const a = (e.target as HTMLElement).closest("a");
        if (a) return;
        open();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" && onOpen) {
          e.preventDefault();
          open();
        }
      }}
    >
      <div className="relative aspect-video overflow-hidden rounded-xl bg-black/30">
        <Image
          src={p.image ?? "/projects/fallback.jpg"}
          alt={p.title}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          priority={false}
        />
      </div>

      <header className="mt-3 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold leading-tight">{p.title}</h3>
          {p.tagline && <p className="text-sm text-white/70">{p.tagline}</p>}
        </div>
        {p.year && (
          <span className="rounded-full border border-white/15 px-2 py-0.5 text-xs text-white/70">
            {p.year}
          </span>
        )}
      </header>

      {p.summary && <p className="mt-3 text-sm text-white/75">{p.summary}</p>}

      {p.tech && (
        <ul className="mt-3 flex flex-wrap gap-2">
          {p.tech.map((t) => (
            <li
              key={t}
              className="rounded-md bg-white/[0.10] px-2 py-1 text-xs text-white/80"
            >
              {t}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex gap-2">
        {p.live && (
          <a
            href={p.live}
            className="rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-black hover:bg-white/90"
            target="_blank"
            rel="noopener noreferrer"
          >
            Live
          </a>
        )}
        {p.repo && (
          <a
            href={p.repo}
            className="rounded-lg border border-white/20 px-3 py-1.5 text-sm hover:border-white/40"
            target="_blank"
            rel="noopener noreferrer"
          >
            Repo
          </a>
        )}
      </div>
    </article>
  );
}

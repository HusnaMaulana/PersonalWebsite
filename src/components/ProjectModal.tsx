"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/data/project";
import ImageProjects from "./ImageProjects";

export default function ProjectModal({
  project,
  open,
  onClose,
}: {
  project: Project | null;
  open: boolean;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // ESC + scroll lock + focus restore
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      prev?.focus?.();
    };
  }, [open, onClose]);

  if (!mounted || !open || !project) return null;

  const images = project.images?.length
    ? project.images
    : [project.image ?? "/projects/fallback.jpg"];

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[80] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        aria-modal="true"
        role="dialog"
        aria-labelledby="project-modal-title"
      >
        {/* overlay (click to close) */}
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* dialog card */}
        <motion.div
          className="relative z-10 w-full max-w-4xl rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6"
          initial={{ y: 24, scale: 0.98, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          exit={{ y: 24, scale: 0.98, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          onClick={(e) => e.stopPropagation()} // keep clicks inside from closing
        >
          {/* close button (safe-area aware, highest z) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close"
            className="absolute right-3 top-3 z-30 pointer-events-auto rounded-md p-3 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            style={{ top: "calc(env(safe-area-inset-top,0px) + 12px)" }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </button>

          {/* image slider (top) */}
          <ImageProjects images={images} titleForAlt={project.title} />

          {/* title + year */}
          <div className="mt-4 flex items-center justify-between gap-3">
            <h3
              id="project-modal-title"
              className="text-lg sm:text-xl font-semibold leading-tight"
            >
              {project.title}
            </h3>
            {project.year && (
              <span className="rounded-full border border-white/15 px-2 py-0.5 text-xs text-white/70">
                {project.year}
              </span>
            )}
          </div>

          {/* summary */}
          {project.summary && (
            <p className="mt-2 text-sm text-white/80">{project.summary}</p>
          )}

          {/* tech chips */}
          {project.tech?.length ? (
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <li
                  key={t}
                  className="rounded-md bg-white/[0.10] px-2 py-1 text-xs text-white/[0.85]"
                >
                  {t}
                </li>
              ))}
            </ul>
          ) : null}

          {/* actions */}
          {(project.live || project.repo) && (
            <div className="mt-4 flex gap-2">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-black hover:bg-white/90"
                >
                  Live
                </a>
              )}
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-white/20 px-3 py-1.5 text-sm hover:border-white/40"
                >
                  Repo
                </a>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

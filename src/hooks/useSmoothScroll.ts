"use client";

import { useCallback } from "react";
import Lenis from "@studio-freight/lenis";

let sharedLenis: Lenis | null = null;

export function useSmoothScroll() {
  // ensure 1 Lenis instance app-wide
  if (!sharedLenis) {
    sharedLenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // drive RAF once
    let rafId = requestAnimationFrame(function raf(time) {
      sharedLenis!.raf(time);
      rafId = requestAnimationFrame(raf);
    });
    // NOTE: we’re not cleaning here because this is app shell lifetime.
    // If you want strict cleanup, keep Lenis in Providers instead.
  }

  const scrollToId = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const navHVar = getComputedStyle(document.documentElement).getPropertyValue(
      "--nav-h"
    );
    const navH = parseInt(navHVar || "64", 10);

    sharedLenis!.scrollTo(el, {
      offset: -navH,
    });
  }, []);

  return { scrollToId };
}

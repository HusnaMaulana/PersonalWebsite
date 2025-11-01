// src/components/useParallax.ts
"use client";

import {
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import type { RefObject } from "react";

type Ranges = {
  input: [number, number];
  output: [number, number];
  clamp?: boolean;
};

export function useParallax(
  ref: RefObject<HTMLElement>,
  { input, output, clamp = true }: Ranges
): MotionValue<number> {
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // If user prefers reduced motion, return a flat transform (no parallax).
  return useTransform(
    scrollYProgress,
    prefersReduced ? [0, 1] : input,
    prefersReduced ? [0, 0] : output,
    { clamp }
  );
}

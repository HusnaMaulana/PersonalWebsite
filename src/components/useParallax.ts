"use client";

import type { RefObject } from "react";
import { useScroll, useTransform, type MotionValue } from "framer-motion";

type Ranges = {
  input: [number, number];
  output: [number, number];
  clamp?: boolean;
};

export function useParallax(
  ref: RefObject<HTMLElement>,
  { input, output, clamp = true }: Ranges
): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return useTransform(scrollYProgress, input, output, { clamp });
}

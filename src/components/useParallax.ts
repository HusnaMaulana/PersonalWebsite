"use client";

import {
	useReducedMotion,
	useScroll,
	useTransform,
	type MotionValue,
} from "framer-motion";
import { useEffect, useState, type RefObject } from "react";

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

	const [isMobile, setIsMobile] = useState(false);
	useEffect(() => {
		const mq = window.matchMedia("(max-width: 768px)");
		const update = () => setIsMobile(mq.matches);
		update();
		mq.addEventListener("change", update);
		return () => mq.removeEventListener("change", update);
	}, []);

	const disable = prefersReduced || isMobile;

	return useTransform(
		scrollYProgress,
		disable ? [0, 1] : input,
		disable ? [0, 0] : output,
		{ clamp }
	);
}

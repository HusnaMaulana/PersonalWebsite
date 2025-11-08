"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function Providers({ children }: { children: ReactNode }) {
	useEffect(() => {
		const prefersReduced = window.matchMedia(
			"(prefers-reduced-motion: reduce)"
		).matches;

		const isSmallScreen = window.matchMedia("(max-width: 768px)").matches;

		if (prefersReduced || isSmallScreen) {
			return;
		}

		const lenis = new Lenis({
			duration: 1.1,
			easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			smoothWheel: true,
		});

		let rafId = requestAnimationFrame(function raf(time) {
			lenis.raf(time);
			rafId = requestAnimationFrame(raf);
		});

		const onClick = (e: MouseEvent) => {
			const a = (e.target as HTMLElement).closest(
				"a[href^='#']"
			) as HTMLAnchorElement | null;
			if (!a) return;
			const id = a.getAttribute("href")!.slice(1);
			const el = document.getElementById(id);
			if (!el) return;
			e.preventDefault();
			lenis.scrollTo(el, {
				offset:
					-parseInt(
						getComputedStyle(document.documentElement).getPropertyValue(
							"--nav-h"
						)
					) || 0,
			});
		};

		document.addEventListener("click", onClick);

		return () => {
			cancelAnimationFrame(rafId);
			document.removeEventListener("click", onClick);
			lenis.destroy?.();
		};
	}, []);

	return <>{children}</>;
}

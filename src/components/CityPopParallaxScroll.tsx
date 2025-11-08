// src/components/CityPopParallaxScroll.tsx
"use client";

import { useRef, useEffect, useState } from "react";
import {
	motion,
	useScroll,
	useTransform,
	useReducedMotion,
	useSpring,
} from "framer-motion";
import { blob } from "@/lib/blob";

export default function CityPopParallaxScroll() {
	const ref = useRef<HTMLDivElement | null>(null);
	const reduce = useReducedMotion();

	const [isMobile, setIsMobile] = useState(false);
	useEffect(() => {
		const mq = window.matchMedia("(max-width: 768px)");
		const update = () => setIsMobile(mq.matches);
		update();
		mq.addEventListener("change", update);
		return () => mq.removeEventListener("change", update);
	}, []);

	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end end"],
	});

	const smoothProgress = useSpring(scrollYProgress, {
		stiffness: 90, // lower = softer
		damping: 15, // higher = less overshoot
		mass: 0.4,
	});

	const factor = reduce || isMobile ? 0.3 : 1;

	const skyY = useTransform(
		smoothProgress,
		[0, 1],
		reduce ? [0, 0] : [0, -60 * factor]
	);
	const farY = useTransform(
		smoothProgress,
		[0, 1],
		reduce ? [0, 0] : [0, -110 * factor]
	);
	const midY = useTransform(
		smoothProgress,
		[0, 1],
		reduce ? [0, 0] : [0, -240 * factor]
	);
	const nearY = useTransform(
		smoothProgress,
		[0, 1],
		reduce ? [0, 0] : [0, -190 * factor]
	);
	const nameY = useTransform(
		smoothProgress,
		[0, 0, 1],
		reduce ? [0, 0, 0] : [0, -150 * factor, 140 * factor]
	);

	return (
		<section
			id="home"
			ref={ref}
			className="relative h-[120svh] overflow-hidden">
			<div className="sticky top-0 h-[100svh] overflow-hidden fade-bottom">
				<motion.div
					aria-hidden="true"
					role="presentation"
					className="absolute inset-x-0 -inset-y-32 will-change-transform"
					style={{
						y: skyY,
						backgroundImage: `url("${blob("/citypop/citypop_sun_sky.webp")}")`,
						backgroundSize: "cover",
						backgroundPosition: "center",
						opacity: 0.95,
						transform: "translateZ(0)",
					}}
				/>

				{/* FAR */}
				<motion.img
					aria-hidden="true"
					role="presentation"
					src={blob("/citypop/citypop_skyline_far.webp")}
					alt=""
					decoding="async"
					loading="eager"
					className="pointer-events-none absolute bottom-[-8rem] left-1/2 z-[1] max-w-none -translate-x-1/2 select-none will-change-transform"
					style={{ y: farY, transform: "translateZ(0)" }}
				/>

				{/* MID */}
				<motion.img
					aria-hidden="true"
					role="presentation"
					src={blob("/citypop/citypop_street_mid.webp")}
					alt=""
					decoding="async"
					loading="eager"
					className="pointer-events-none absolute bottom-[-10rem] left-1/2 z-[2] max-w-none -translate-x-1/2 select-none will-change-transform"
					style={{ y: midY, transform: "translateZ(0)" }}
				/>

				{/* NEAR */}
				<motion.img
					aria-hidden="true"
					role="presentation"
					src={blob("/citypop/citypop_palm_near.webp")}
					alt=""
					decoding="async"
					loading="eager"
					className="pointer-events-none absolute bottom-[-12rem] left-1/2 z-[3] max-w-none -translate-x-1/2 select-none will-change-transform"
					style={{ y: nearY, transform: "translateZ(0)" }}
				/>

				{/* TITLE */}
				<motion.div
					className="relative z-[2] flex h-full items-center justify-center px-4 text-center will-change-transform"
					style={{ y: nameY }}>
					<div>
						<h1 className="text-5xl font-extrabold tracking-tight md:text-7xl">
							<span className="bg-gradient-to-r from-fuchsia-400 via-rose-300 to-cyan-400 bg-clip-text text-transparent">
								Husna Maulana
							</span>
						</h1>
						<p className="mx-auto mt-4 max-w-2xl text-[#E9D7FF]/80">
							ソフトウェアデベロッパー | フルスタックエンジニア | 開発者
						</p>
						<div className="mt-8 flex justify-center gap-3">
							<a
								href="#projects"
								className="rounded-xl bg-white px-5 py-2 font-medium text-neutral-900 hover:bg-white/90">
								View Projects
							</a>
							<button className="rounded-xl border border-white/30 px-5 py-2 text-white/90 hover:bg-white/50">
								<a href="#contact">Contact</a>
							</button>
						</div>
					</div>
				</motion.div>

				{/* Vignette → page bg */}
				<div
					aria-hidden="true"
					className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(5,4,11,0.72)]"
				/>
			</div>
		</section>
	);
}

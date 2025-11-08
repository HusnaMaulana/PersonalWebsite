"use client";

import { useRef, ReactNode, useId } from "react";
import { motion } from "framer-motion";
import { useParallax } from "./useParallax";

type Props = {
	id?: string;
	bgUrl?: string;
	heading: ReactNode;
	subheading?: ReactNode;
	children?: ReactNode;
	height?: string;
	className?: string;
	ariaLabelledby?: string;
};

export default function ParallaxSection({
	id,
	bgUrl,
	heading,
	subheading,
	children,
	className = "",
	height = "min-h-[100svh]",
	ariaLabelledby,
}: Props) {
	const ref = useRef<HTMLDivElement | null>(null);
	const targetRef = ref as React.RefObject<HTMLElement>;
	const uid = useId();
	const titleId = ariaLabelledby || `${id ?? uid}-h`;

	const bgY = useParallax(targetRef, { input: [0, 1], output: [-60, 60] });
	const midY = useParallax(targetRef, { input: [0, 1], output: [-30, 30] });
	const fgY = useParallax(targetRef, { input: [0, 1], output: [-10, 10] });

	return (
		<section
			id={id}
			ref={ref}
			aria-labelledby={titleId}
			className={`relative ${height} flex items-center overflow-hidden scroll-mt-[var(--nav-h)] ${className}`}>
			{bgUrl && (
				<motion.div
					aria-hidden="true"
					role="presentation"
					className="pointer-events-none absolute inset-0 will-change-transform"
					style={{
						y: bgY,
						backgroundImage: `url(${bgUrl})`,
						backgroundSize: "cover",
						backgroundPosition: "center",
						opacity: 0.4,
						filter: "grayscale(20%)",
					}}
				/>
			)}

			<motion.div
				aria-hidden="true"
				role="presentation"
				className="absolute -inset-10 will-change-transform"
				style={{ y: midY }}>
				<div className="absolute right-10 top-20 h-40 w-40 rounded-full bg-fuchsia-500/10 blur-2xl" />
				<div className="absolute bottom-10 left-10 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
			</motion.div>

			<motion.div
				className="container relative z-10"
				style={{ y: fgY }}
				initial={{ opacity: 0, y: 24 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ margin: "-10% 0px -10% 0px", once: true }}
				transition={{ duration: 0.6, ease: "easeOut" }}>
				<h2
					id={titleId}
					className="text-4xl font-bold tracking-tight md:text-6xl">
					{heading}
				</h2>
				{subheading && (
					<p className="mt-3 max-w-2xl text-base text-neutral-300 md:text-lg">
						{subheading}
					</p>
				)}
				{children && <div className="mt-8">{children}</div>}
			</motion.div>

			<div
				aria-hidden
				className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[rgba(5,4,11,0.9)]"
			/>
		</section>
	);
}

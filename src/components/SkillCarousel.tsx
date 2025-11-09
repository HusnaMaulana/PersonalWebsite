"use client";

import { useEffect, useRef, useState } from "react";
import type { IconType } from "react-icons";
import {
	SiHtml5,
	SiCss3,
	SiBootstrap,
	SiTailwindcss,
	SiPhp,
	SiJavascript,
	SiTypescript,
	SiPython,
	SiNodedotjs,
	SiReact,
	SiNextdotjs,
	SiLaravel,
	SiPostgresql,
	SiMysql,
	SiPostman,
	SiFigma,
} from "react-icons/si";
import {
	MdPsychology,
	MdSchedule,
	MdGroups,
	MdAutorenew,
} from "react-icons/md";
import { TbBulb } from "react-icons/tb";

type Skill = { label: string; Icon?: IconType };

function SkillCard({ label, Icon }: Skill) {
	const colors: Record<string, string> = {
		HTML: "#E44D26",
		CSS: "#264DE4",
		Bootstrap: "#7952B3",
		Tailwind: "#38BDF8",
		PHP: "#777BB4",
		JavaScript: "#F7DF1E",
		TypeScript: "#3178C6",
		Python: "#3776AB",
		"Node.js": "#68A063",
		"React.js": "#61DAFB",
		"Next.js": "#FFFFFF",
		Laravel: "#FF2D20",
		Postgres: "#336791",
		MySQL: "#00758F",
		Postman: "#FF6C37",
		Figma: "#F24E1E",
	};

	const color = colors[label] ?? "#ffffff";

	return (
		<div
			className="skill-card h-[6.5rem] w-[8.25rem] md:h-[7rem] md:w-[9rem] flex shrink-0 flex-col items-center justify-center gap-3 transition duration-500 hover:scale-110"
			role="listitem">
			{Icon ? (
				<Icon
					className="h-9 w-9 md:h-10 md:w-10 drop-shadow-md transition-transform duration-300 hover:rotate-6"
					style={{ color }}
				/>
			) : (
				<div className="flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-xs md:text-sm">
					{label.slice(0, 2)}
				</div>
			)}
			<span className="text-xs md:text-sm text-white/90">{label}</span>
		</div>
	);
}

function Row({
	items,
	duration = 10,
	reverse = false,
}: {
	items: Skill[];
	duration?: number;
	reverse?: boolean;
}) {
	const [paused, setPaused] = useState(false);
	const [reduce, setReduce] = useState(false);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const isDragging = useRef(false);
	const startX = useRef(0);
	const scrollLeft = useRef(0);

	useEffect(() => {
		setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
	}, []);

	useEffect(() => {
		const el = containerRef.current;
		if (!el) return;

		const onMouseDown = (e: MouseEvent) => {
			isDragging.current = true;
			startX.current = e.pageX - el.offsetLeft;
			scrollLeft.current = el.scrollLeft;
			el.classList.add("cursor-grabbing");
		};
		const onMouseLeave = () => {
			isDragging.current = false;
			el.classList.remove("cursor-grabbing");
		};
		const onMouseUp = () => {
			isDragging.current = false;
			el.classList.remove("cursor-grabbing");
		};
		const onMouseMove = (e: MouseEvent) => {
			if (!isDragging.current) return;
			e.preventDefault();
			const x = e.pageX - el.offsetLeft;
			const walk = (x - startX.current) * 1.2;
			el.scrollLeft = scrollLeft.current - walk;
		};

		el.addEventListener("mousedown", onMouseDown);
		el.addEventListener("mouseleave", onMouseLeave);
		el.addEventListener("mouseup", onMouseUp);
		el.addEventListener("mousemove", onMouseMove);

		return () => {
			el.removeEventListener("mousedown", onMouseDown);
			el.removeEventListener("mouseleave", onMouseLeave);
			el.removeEventListener("mouseup", onMouseUp);
			el.removeEventListener("mousemove", onMouseMove);
		};
	}, []);

	const looped = [...items, ...items, ...items, ...items];

	return (
		<div className="relative" role="list" aria-label="skills row">
			<div
				ref={containerRef}
				className="overflow-x-auto overflow-y-hidden rounded-2xl p-3 md:p-4 
                   outline-none focus-visible:ring-2 focus-visible:ring-white/60 
                   no-scrollbar cursor-grab select-none"
				onMouseEnter={() => setPaused(true)}
				onMouseLeave={() => setPaused(false)}
				onFocus={() => setPaused(true)}
				onBlur={() => setPaused(false)}
				onScroll={() => setPaused(true)}
				tabIndex={0}>
				<div
					className={[
						"flex gap-4 will-change-transform",
						reduce ? "" : "motion-safe:animate-marquee",
						paused ? "marquee-paused" : "",
					].join(" ")}
					style={
						{
							"--marquee-duration": `${duration}s`,
							animationDirection: reverse ? "reverse" : "normal",
						} as React.CSSProperties
					}>
					{looped.map((s, i) => (
						<SkillCard key={`${s.label}-${i}`} {...s} />
					))}
				</div>
			</div>

			<div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[rgba(5,4,11,1)] to-transparent" />
			<div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[rgba(5,4,11,1)] to-transparent" />
		</div>
	);
}

export default function SkillsCarousel() {
	const hard: Skill[] = [
		{ label: "HTML", Icon: SiHtml5 },
		{ label: "CSS", Icon: SiCss3 },
		{ label: "Bootstrap", Icon: SiBootstrap },
		{ label: "Tailwind", Icon: SiTailwindcss },
		{ label: "PHP", Icon: SiPhp },
		{ label: "JavaScript", Icon: SiJavascript },
		{ label: "TypeScript", Icon: SiTypescript },
		{ label: "Python", Icon: SiPython },
		{ label: "Node.js", Icon: SiNodedotjs },
		{ label: "React.js", Icon: SiReact },
		{ label: "Next.js", Icon: SiNextdotjs },
		{ label: "Laravel", Icon: SiLaravel },
		{ label: "Postgres", Icon: SiPostgresql },
		{ label: "MySQL", Icon: SiMysql },
		{ label: "Postman", Icon: SiPostman },
		{ label: "Figma", Icon: SiFigma },
	];

	const soft: Skill[] = [
		{ label: "Problem Solving", Icon: MdPsychology },
		{ label: "Fast Learner", Icon: TbBulb },
		{ label: "Time Management", Icon: MdSchedule },
		{ label: "Teamwork", Icon: MdGroups },
		{ label: "Adaptability", Icon: MdAutorenew },
	];

	return (
		<section aria-label="Skills" className="container space-y-8">
			<div className="text-center">
				<h3 className="text-3xl md:text-4xl font-bold">Hard Skills</h3>
				<p className="mt-1 text-white/70">
					Proficient in technical tools and frameworks
				</p>
			</div>
			<Row items={hard} duration={10} />

			<div className="pt-4 text-center">
				<h3 className="text-3xl md:text-4xl font-bold">Soft Skills</h3>
				<p className="mt-1 text-white/70">
					Enhancing collaboration and leadership in projects
				</p>
			</div>
			<Row items={soft} duration={10} reverse />
		</section>
	);
}

"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const LINKS = [
	{ href: "#home", label: "Home" },
	{ href: "#about", label: "About" },
	{ href: "#skills", label: "Skills" },
	{ href: "#projects", label: "Projects" },
	{ href: "#contact", label: "Contact" },
];

type HighlightRect = { width: number; left: number };

export default function Navbar() {
	const [active, setActive] = useState("home");
	const [scrolled, setScrolled] = useState(false);
	const [highlightRect, setHighlightRect] = useState<HighlightRect | null>(
		null
	);

	const observersRef = useRef<IntersectionObserver | null>(null);
	const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

	useEffect(() => {
		function handleScroll() {
			const y = window.scrollY;
			setScrolled(y > 40);

			const scrollBottom =
				window.innerHeight + window.scrollY >= document.body.offsetHeight - 4;
			if (scrollBottom) {
				setActive("contact");
			}
		}

		handleScroll();
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		if (observersRef.current) observersRef.current.disconnect();

		const navHVar = getComputedStyle(document.documentElement).getPropertyValue(
			"--nav-h"
		);
		const navH = parseInt(navHVar || "64", 10);

		const observer = new IntersectionObserver(
			(entries) => {
				const scrollBottom =
					window.innerHeight + window.scrollY >= document.body.offsetHeight - 4;
				if (scrollBottom) return;

				const visible = entries
					.filter((e) => e.isIntersecting)
					.sort(
						(a, b) =>
							(a.target as HTMLElement).offsetTop -
							(b.target as HTMLElement).offsetTop
					);

				if (visible.length > 0) {
					const id = visible[0].target.id;
					if (id) setActive(id);
				}
			},
			{
				rootMargin: `-${navH + 8}px 0px -60% 0px`,
				threshold: 0.2,
			}
		);

		const sectionIds = LINKS.map((l) => l.href.slice(1));
		sectionIds.forEach((id) => {
			const el = document.getElementById(id);
			if (el) observer.observe(el);
		});

		observersRef.current = observer;
		return () => observer.disconnect();
	}, []);

	useLayoutEffect(() => {
		const el = linkRefs.current[active];
		if (!el) return;

		const rect = {
			width: el.offsetWidth,
			left: el.offsetLeft,
		};
		setHighlightRect(rect);
	}, [active]);

	return (
		<header className="fixed inset-x-0 top-0 z-50 px-3 sm:px-0">
			<nav
				aria-label="Primary"
				className={[
					"relative mx-auto mt-4 w-full max-w-[36rem] sm:w-auto sm:containernav",
					"flex items-center justify-center gap-2 sm:gap-6 whitespace-nowrap rounded-full px-3 sm:px-4 py-2",
					"border backdrop-blur-md supports-[backdrop-filter]:bg-black/10 transition-all duration-500",
					scrolled
						? "bg-black/40 border-white/20 shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
						: "bg-black/20 border-white/10",
				].join(" ")}>
				{highlightRect && (
					<motion.div
						className="pointer-events-none absolute top-1/2 -translate-y-1/2 rounded-full bg-white shadow-gray-900/20 "
						initial={false}
						animate={{
							width: highlightRect.width,
							left: highlightRect.left,
						}}
						transition={{
							type: "spring",
							stiffness: 400,
							damping: 32,
						}}
						style={{
							height: "2.1rem",
						}}
					/>
				)}

				{LINKS.map(({ href, label }) => {
					const id = href.slice(1);
					const isActive = active === id;

					return (
						<a
							key={href}
							href={href}
							ref={(el) => {
								linkRefs.current[id] = el;
							}}
							className={[
								"relative z-10 whitespace-nowrap px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-base font-medium transition-colors duration-300",
								isActive
									? "bg-gradient-to-r from-fuchsia-600 via-purple-400 to-violet-600 bg-clip-text text-transparent"
									: "text-white/100 hover:text-white",
							].join(" ")}
							aria-current={isActive ? "page" : undefined}>
							{label}
						</a>
					);
				})}
			</nav>
		</header>
	);
}

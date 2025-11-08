"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export default function Skeleton() {
	const [visible, setVisible] = useState(true);
	const reduce = useReducedMotion();

	useEffect(() => {
		const hide = () => {
			setTimeout(() => setVisible(false), 200);
		};

		if (document.readyState === "complete") {
			hide();
		} else {
			window.addEventListener("load", hide);
		}

		const fallback = setTimeout(() => setVisible(false), 2500);

		return () => {
			window.removeEventListener("load", hide);
			clearTimeout(fallback);
		};
	}, []);

	return (
		<AnimatePresence>
			{visible && (
				<motion.div
					initial={{ opacity: 1 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={
						reduce ? { duration: 0 } : { duration: 0.5, ease: "easeOut" }
					}
					className="fixed inset-0 z-[90] flex items-center justify-center
                             bg-black/50 backdrop-blur-lg">
					<div className="shell"></div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}

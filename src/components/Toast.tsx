"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

type ToastProps = {
	open: boolean;
	onClose: () => void;
	title?: string;
	message: string;
	variant?: "success" | "error" | "info";
	duration?: number; // ms
};

export default function Toast({
	open,
	onClose,
	title,
	message,
	variant = "success",
	duration = 2800,
}: ToastProps) {
	useEffect(() => {
		if (!open) return;
		const t = setTimeout(onClose, duration);
		return () => clearTimeout(t);
	}, [open, onClose, duration]);

	const accent =
		variant === "success"
			? "text-emerald-300"
			: variant === "error"
			? "text-rose-300"
			: "text-fuchsia-300";

	return (
		<AnimatePresence>
			{open ? (
				<motion.div
					initial={{ y: 24, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: 24, opacity: 0 }}
					transition={{ type: "spring", stiffness: 420, damping: 32 }}
					role="status"
					aria-live="polite"
					className="fixed bottom-6 right-6 z-[100] w-[92vw] max-w-sm">
					<div
						className={[
							// glass card
							"rounded-xl border border-white/10 bg-white/[0.06] p-4",
							"backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.35)]",
						].join(" ")}>
						<div className="flex items-start gap-3 text-white">
							<div
								className={[
									"mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
									"border border-white/20 bg-white/[0.08]",
									accent,
								].join(" ")}>
								{/* icon */}
								{variant === "success" ? "✓" : variant === "error" ? "!" : "ℹ"}
							</div>

							<div className="min-w-0 flex-1">
								{title ? (
									<div className="text-sm font-semibold">{title}</div>
								) : null}
								<div className="mt-0.5 text-sm text-white/90 break-words">
									{message}
								</div>

								{/* progress bar */}
								<div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/10">
									<motion.div
										initial={{ width: "100%" }}
										animate={{ width: 0 }}
										transition={{ duration: duration / 1000, ease: "linear" }}
										className={["h-full", accent.replace("text-", "bg-")].join(
											" "
										)}
									/>
								</div>
							</div>

							<button
								onClick={onClose}
								aria-label="Close notification"
								className="ml-1 rounded-md px-2 py-1 text-xs text-white/70 hover:text-white hover:bg-white/10">
								✕
							</button>
						</div>
					</div>
				</motion.div>
			) : null}
		</AnimatePresence>
	);
}

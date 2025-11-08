"use client";

import { JSX, useState } from "react";
import Toast from "@/components/Toast";

export default function ContactForm(): JSX.Element {
	const [loading, setLoading] = useState(false);
	const [toastOpen, setToastOpen] = useState(false);
	const [toastMsg, setToastMsg] = useState("");
	const [toastVariant, setToastVariant] = useState<
		"success" | "error" | "info"
	>("success");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);

		const form = e.currentTarget;
		const fd = new FormData(form);
		const data = {
			name: String(fd.get("name") || ""),
			email: String(fd.get("email") || ""),
			message: String(fd.get("message") || ""),
		};

		try {
			const res = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});

			if (!res.ok) throw new Error("Failed to send");

			form.reset();

			setToastVariant("success");
			setToastMsg("Message sent! I’ll get back to you soon.");
			setToastOpen(true);
		} catch (err) {
			console.error(err);
			setToastVariant("error");
			setToastMsg("Failed to send. Please try again in a moment.");
			setToastOpen(true);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div className="grid gap-4 md:grid-cols-2">
					<input
						type="text"
						name="name"
						placeholder="Name"
						className="contact-input"
						required
					/>
					<input
						type="email"
						name="email"
						placeholder="Email"
						className="contact-input"
						required
					/>
				</div>

				<textarea
					name="message"
					placeholder="Message"
					className="contact-input min-h-[10rem] resize-y"
				/>

				<button
					type="submit"
					disabled={loading}
					className={[
						"inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-medium text-white",
						"border border-white/10 bg-white/[0.03] backdrop-blur-sm",
						"shadow-[0_2px_0_rgba(0,0,0,0.6)] transition-colors duration-300",
						"hover:border-white/20 hover:bg-white/[0.08]",
						"disabled:cursor-not-allowed disabled:opacity-60",
					].join(" ")}>
					{loading ? (
						<>
							<span className="animate-pulse">Sending...</span>
							<span className="text-fuchsia-300 animate-spin">⟳</span>
						</>
					) : (
						<>
							<span>Send Message</span>
							<span className="text-fuchsia-300">➤</span>
						</>
					)}
				</button>
			</form>

			<Toast
				open={toastOpen}
				onClose={() => setToastOpen(false)}
				title={
					toastVariant === "success"
						? "Success"
						: toastVariant === "error"
						? "Error"
						: "Notice"
				}
				message={toastMsg}
				variant={toastVariant}
				duration={2800}
			/>
		</>
	);
}

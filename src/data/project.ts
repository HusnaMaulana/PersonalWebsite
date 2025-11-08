import { blob } from "@/lib/blob";

export type Project = {
	slug: string;
	title: string;
} & Partial<{
	tagline: string;
	year: string;
	role: string;
	tech: string[];
	image: string;
	images: string[];
	live?: string;
	repo?: string;
	summary: string;
}>;

export const projects: Project[] = [
	{
		slug: "web-cv-maker",
		title: "Web CV Maker",
		year: "2023",
		role: "Fullstack Developer",
		tech: ["Laravel", "PHP", "MySQL", "Bootstrap"],
		image: blob("/projects/CvMaker/CvMaker_2.png"),
		images: [
			blob("/projects/CvMaker/CvMaker_2.png"),
			blob("/projects/CvMaker/CvMaker_1.png"),
			blob("/projects/CvMaker/CvMaker_3.png"),
			blob("/projects/CvMaker/CvMaker_4.png"),
		],
		summary:
			"A personal portfolio website built with a backend CMS for easy content management. This system allows the owner to easily update sections like work history, education, skills and projects.",
	},
	{
		slug: "stumble-fall-guy",
		title: "Stumble Fall Guy",
		year: "2023",
		role: "Game Developer",
		tech: ["Unity", "C#", "Blender 3D"],
		image: blob("/projects/Stumble/stumble-1.webp"),
		images: [
			blob("/projects/Stumble/stumble-1.webp"),
			blob("/projects/Stumble/stumble-2.webp"),
			blob("/projects/Stumble/stumble-3.webp"),
		],
		summary:
			"A 3D platformer game inspired by the vibrant, trap-filled of Fall Guys and Stumble Guys, challenging players through obstacle.",
	},
	{
		slug: "disucussion-forum",
		title: "Discussion Forum",
		year: "2024",
		role: "Fullstack Developer",
		tech: ["React", "Vite", "Typescripts", "postgrasQL", "Express.js"],
		image: blob("/projects/ForumDiskusi/forumDiskusi-1.webp"),
		images: [
			blob("/projects/ForumDiskusi/forumDiskusi-1.webp"),
			blob("/projects/ForumDiskusi/forumDiskusi-2.webp"),
			blob("/projects/ForumDiskusi/forumDiskusi-3.webp"),
		],
		summary:
			"A discussion forum for an LMS web application, designed for asking questions and sharing knowledge.",
	},
];

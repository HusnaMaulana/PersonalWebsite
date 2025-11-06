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
			"This is a personal portfolio website that functions as a digital CV to professionally showcase your qualifications and projects. It also features a Content Management System (CMS) on the backend, allowing you to easily manage and update all content, such as your work history or new projects, without the need for any code changes.",
	},
	{
		slug: "stumble-fall-guy",
		title: "Stumble Fall Guy",
		year: "2023",
		role: "Game Developer",
		tech: ["Unity", "C#", "Blender 3D"],
		image: blob("/projects/Stumble/Stumbel_Fall_Guys.png"),
		images: [
			blob("/projects/Stumble/Stumbel_Fall_Guys.png"),
			blob("/projects/Stumble/stumble-1.png"),
			blob("/projects/Stumble/stumble-2.png"),
		],
		summary: "3D platformer game inspired by Fall Guys and Stumble Guys.",
	},
];

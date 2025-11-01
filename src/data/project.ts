// src/data/project.ts
export type Project = {
  slug: string;
  title: string;
} & Partial<{
  tagline: string;
  year: string;
  role: string;
  tech: string[];
  image: string; // ← legacy single cover (kept for fallback)
  images: string[]; // ← NEW: multi-images for modal slider
  live?: string;
  repo?: string;
  summary: string;
}>;

// example
export const projects: Project[] = [
  {
    slug: "web-cv-maker",
    title: "Web CV Maker",
    year: "2023",
    role: "Fullstack Developer",
    tech: ["Laravel", "PHP", "MySQL", "Bootstrap"],
    image: "/projects/CvMaker/CvMaker_2.png",
    images: [
      "/projects/CvMaker/CvMaker_2.png",
      "/projects/CvMaker/CvMaker_1.png",
      "/projects/CvMaker/CvMaker_3.png",
      "/projects/CvMaker/CvMaker_4.png",
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
    image: "/projects/Stumble/Stumbel_Fall_Guys.png",
    images: [
      "/projects/Stumble/Stumbel_Fall_Guys.png",
      "/projects/Stumble/stumble-1.png",
      "/projects/Stumble/stumble-2.png",
    ],
    summary: "3D platformer game inspired by Fall Guys and Stumble Guys.",
  },
];

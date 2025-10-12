export type Project = {
  slug: string;
  title: string;
} & Partial<{
  tagline: string;
  year: string;
  role: string;
  tech: string[];
  image: string;
  live?: string;
  repo?: string;
  summary: string;
}>;

export const projects: Project[] = [
  {
    slug: "stumble-fall-guy",
    title: "Stumble Fall Guy",
    year: "2023",
    role: "Game Developer",
    tech: ["Unity", "C#", "Blender 3D"],
    image: "/projects/Stumbel_Fall_Guys.png",
    summary: "3D platformer game inspired by Fall Guys and Stumble Guys.",
  },
];

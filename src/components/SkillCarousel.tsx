"use client";

import { useState } from "react";

type Skill = { label: string; icon?: string };

function SkillCard({ label, icon }: Skill) {
  return (
    <div className="skill-card transition duration-500 hover:scale-110 h-[6.5rem] w-[8.25rem] md:h-[7rem] md:w-[9rem] flex flex-col items-center justify-center gap-3 shrink-0">
      {icon ? (
        <img
          src={icon}
          alt=""
          className="h-9 w-9 md:h-10 md:w-10 select-none"
          loading="lazy"
        />
      ) : (
        <div className="flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-sm">
          {label.slice(0, 2)}
        </div>
      )}
      <span className="text-xs md:text-sm text-white/85">{label}</span>
    </div>
  );
}

function Row({
  items,
  duration = 24,
  reverse = false,
}: {
  items: Skill[];
  duration?: number;
  reverse?: boolean;
}) {
  const [paused, setPaused] = useState(false);
  const looped = [...items, ...items, ...items, ...items];

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/15 p-3 md:p-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className={[
          "flex gap-4 will-change-transform motion-safe:animate-marquee",
          paused ? "marquee-paused" : "",
        ].join(" ")}
        style={
          {
            "--marquee-duration": `${duration}s`,
            animationDirection: reverse ? "reverse" : "normal",
          } as React.CSSProperties
        }
      >
        {looped.map((s, i) => (
          <SkillCard key={`${s.label}-${i}`} {...s} />
        ))}
      </div>
    </div>
  );
}

export default function SkillsCarousel() {
  const hard: Skill[] = [
    { label: "HTML", icon: "/skills/html.svg" },
    { label: "CSS", icon: "/skills/css.svg" },
    { label: "Bootstrap", icon: "/skills/bootsrap.svg" },
    { label: "Tailwind", icon: "/skills/tailwind.svg" },
    { label: "PHP", icon: "/skills/php.svg" },
    { label: "JavaScript", icon: "/skills/javascript.svg" },
    { label: "TypeScript", icon: "/skills/typescript.svg" },
    { label: "Python", icon: "/skills/python.svg" },
    { label: "Node.js", icon: "/skills/nodejs.svg" },
    { label: "React.js", icon: "/skills/react.svg" },
    { label: "Next.js", icon: "/skills/nextjs.svg" },
    { label: "Laravel", icon: "/skills/laravel.svg" },
    { label: "Postgres", icon: "/skills/postgresql.svg" },
    { label: "MySQL", icon: "/skills/mysql.svg" },
    { label: "Postman", icon: "/skills/postman.svg" },
    { label: "Figma", icon: "/skills/figma.svg" },
  ];

  const soft: Skill[] = [
    { label: "Problem Solving", icon: "/skills/problem-solving.svg" },
    { label: "Fast Learner", icon: "/skills/fast-learner.svg" },
    { label: "Time Management", icon: "/skills/time.svg" },
    { label: "Teamwork", icon: "/skills/teamwork.svg" },
    { label: "Adaptability", icon: "/skills/adaptability.svg" },
  ];

  return (
    <section aria-label="Skills" className="container space-y-8">
      <div className="text-center">
        <h3 className="text-3xl md:text-4xl font-bold">Hard Skills</h3>
        <p className="mt-1 text-white/70">
          Proficient in technical tools and frameworks
        </p>
      </div>
      <Row items={hard} duration={40} />

      <div className="pt-4 text-center">
        <h3 className="text-3xl md:text-4xl font-bold">Soft Skills</h3>
        <p className="mt-1 text-white/70">
          Enhancing collaboration and leadership in projects
        </p>
      </div>
      <Row items={soft} duration={30} reverse />
    </section>
  );
}

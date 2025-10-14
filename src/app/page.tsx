import Navbar from "@/components/Navbar";
import CityPopParallaxScroll from "@/components/CityPopParallaxScroll";
import ParallaxSection from "@/components/ParallaxSection";
import ProjectCard from "@/components/ProjectCard";
import SkillsCarousel from "@/components/SkillCarousel";
import Image from "next/image";
import { projects } from "@/data/project";

export default function HomePage() {
  return (
    <>
      <Navbar />
      {/* HERO */}
      <CityPopParallaxScroll />

      {/* ABOUT */}
      <ParallaxSection
        id="about"
        className="relative -mt-[16dvh] md:-mt-[20dvh]" // gentle overlap with hero
        heading="About"
        subheading={
          <>
            <span className="text-white/80">
              ソフトウェアデベロッパー • Software Developer
            </span>
            <br />
          </>
        }
        height="min-h-[90svh]"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-semibold">My Introduction</h3>
                <p className="mt-5 text-white/80">
                  A developer who brings complex ideas to life by building an
                  innovative design on a foundation of clean, functional code. I
                  am dedicated to creating intuitive products that effectively
                  meet user needs.
                </p>
              </div>
              <div className="relative h-40 w-40 flex-shrink-0 md:h-56 md:w-56">
                <Image
                  src="/Profile.png"
                  alt="Portrait of Husna Maulana"
                  fill
                  sizes="(min-width: 768px) 14rem, 10rem"
                  className="rounded-full object-cover"
                  priority={false}
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-semibold">What I do</h3>
            <ul className="mt-5 space-y-2 text-white/80">
              <li>
                • Develop modern UIs with clean code and responsive design.
              </li>
              <li>• Integrate front-end components with backends and APIs.</li>
              <li>• Full-stack work with React/Node.js and databases.</li>
              <li>• Performance tuning and testing for broad compatibility.</li>
            </ul>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2  gap-4 text-center">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="text-3xl font-extrabold">2+</div>
            <div className="mt-1 text-xs text-white/70">Years Experience</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="text-3xl font-extrabold">10+</div>
            <div className="mt-1 text-xs text-white/70">Projects & demos</div>
          </div>
        </div>
        <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-4 text-center">
          <div className="text-3xl font-extrabold">100%</div>
          <div className="mt-1 text-xs text-white/70">Client focus</div>
        </div>
      </ParallaxSection>

      <ParallaxSection
        id="skills"
        heading="Skills"
        subheading="Hard & Soft skills"
        height="min-h-[90svh]"
      >
        <SkillsCarousel />
      </ParallaxSection>

      {/* PROJECTS */}
      <ParallaxSection
        id="projects"
        heading="Projects"
        subheading="Selected work."
        height="min-h-[95svh]"
      >
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.slug} p={p} />
          ))}
        </div>
      </ParallaxSection>

      {/* CONTACT */}
      <ParallaxSection
        id="contact"
        heading="Contact"
        subheading="Open to collabs & roles"
        height="min-h-[50svh]"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold">Get in touch</h3>
            <p className="mt-2 text-white/80">
              Prefer email? I&apos;ll reply within a day.
            </p>

            <a
              href="mailto:you@example.com"
              className="mt-4 inline-block rounded-xl bg-white px-4 py-2 font-medium text-black"
            >
              you@example.com
            </a>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold">Social</h3>
            <ul className="mt-3 space-y-2 text-white/85">
              {[
                ["GitHub", "#"],
                ["LinkedIn", "#"],
                ["X / Twitter", "#"],
                ["Instagram", "#"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a
                    className="underline-offset-4 hover:underline"
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${label} in new tab`}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </ParallaxSection>

      <footer className="py-12 text-center text-xs text-white/60">
        © {new Date().getFullYear()} Husna Maulana
      </footer>
    </>
  );
}

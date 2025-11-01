import Navbar from "@/components/Navbar";
import CityPopParallaxScroll from "@/components/CityPopParallaxScroll";
import ParallaxSection from "@/components/ParallaxSection";
import SkillsCarousel from "@/components/SkillCarousel";
import ProjectsCarousel from "@/components/ProjectsCarousel";
import ContactForm from "@/components/ContactForm";
import Image from "next/image";
import { projects } from "@/data/project";
import { FaLinkedinIn, FaGithub, FaInstagram } from "react-icons/fa6";

const cardClass =
  "rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm hover:border-white/20 transition";

export default function HomePage() {
  return (
    <>
      <Navbar />
      {/* HERO */}
      <CityPopParallaxScroll />

      {/* ABOUT */}
      <ParallaxSection
        id="about"
        className="relative -mt-[16dvh] md:-mt-[20dvh]"
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
        <ProjectsCarousel projects={projects} />
      </ParallaxSection>

      {/* CONTACT */}
      <ParallaxSection
        id="contact"
        heading="Contact"
        subheading="Open to collabs & roles"
        height="min-h-[70svh]"
      >
        <div className="grid gap-10 md:gap-16">
          {/* Top Row: Info + Form */}
          <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-8 text-white">
            {/* LEFT COLUMN (info) */}
            <div className="space-y-8">
              {/* email block */}
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded  text-white/80 text-sm leading-none">
                  ✉
                </div>
                <div>
                  <div className="text-lg font-semibold text-white">Email</div>
                  <a
                    href="mailto:uns200345@gmail.com"
                    className="text-white/70 hover:text-white break-all"
                  >
                    uns200345@gmail.com
                  </a>
                </div>
              </div>

              {/* location block */}
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded  text-white/80 text-sm leading-none">
                  📍
                </div>
                <div>
                  <div className="text-lg font-semibold text-white">
                    Location
                  </div>
                  <div className="text-white/70">Bandung</div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN (form) */}
            <ContactForm />
          </div>

          {/* Social icons row */}
          <div className="flex justify-center gap-3 ">
            {[
              {
                href: "https://.linkedin.com/in/husna-maulana",
                label: "LinkedIn",
                Icon: FaLinkedinIn,
                color: "#0A66C2",
              },
              {
                href: "https://github.com/HusnaMaulana",
                label: "GitHub",
                Icon: FaGithub,
                color: "#ffffff",
              },
              {
                href: "https://www.instagram.com/una_45",
                label: "Instagram",
                Icon: FaInstagram,
                color: "#E1306C",
              },
            ].map(({ href, label, Icon, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="group relative flex h-12 w-12 items-center justify-center rounded-full mb-5
                 transition-all duration-300 
                 hover:scale-110 hover:border-transparent hover:shadow-[0_0_20px_var(--glow-color)]"
                style={
                  {
                    "--glow-color": color,
                  } as React.CSSProperties
                }
              >
                <div
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 
                   bg-gradient-to-tr from-transparent via-[color:var(--glow-color)]/20 to-transparent 
                   blur-md transition-opacity duration-500"
                />
                <Icon
                  className="relative text-xl transition-transform duration-300 group-hover:scale-110"
                  style={{ color }}
                />
              </a>
            ))}
          </div>
        </div>
      </ParallaxSection>

      <footer className="py-12 text-center text-xs text-white/60">
        © {new Date().getFullYear()} Husna Maulana
      </footer>
    </>
  );
}

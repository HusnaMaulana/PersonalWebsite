"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function CityPopParallaxScroll() {
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const skyY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const farY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const midY = useTransform(scrollYProgress, [0, 1], [0, -240]);
  const nearY = useTransform(scrollYProgress, [0, 1], [0, -190]);
  const nameY = useTransform(scrollYProgress, [0, 0, 1], [0, -150, 140]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative h-[120svh] overflow-hidden"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* SKY */}
        <motion.div
          aria-hidden="true"
          role="presentation"
          className="absolute inset-x-0 -inset-y-32 will-change-transform"
          style={{
            y: skyY,
            backgroundImage: 'url("/citypop/citypop_sun_sky.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.95,
          }}
        />

        {/* FAR */}
        <motion.img
          aria-hidden="true"
          role="presentation"
          src="/citypop/citypop_skyline_far.png"
          alt=""
          className="pointer-events-none absolute bottom-[-8rem] left-1/2 z-[1] max-w-none -translate-x-1/2 select-none will-change-transform"
          style={{ y: farY }}
        />

        {/* MID */}
        <motion.img
          aria-hidden="true"
          role="presentation"
          src="/citypop/citypop_street_mid.png"
          alt=""
          className="pointer-events-none absolute bottom-[-10rem] left-1/2 z-[2] max-w-none -translate-x-1/2 select-none will-change-transform"
          style={{ y: midY }}
        />

        {/* NEAR */}
        <motion.img
          aria-hidden="true"
          role="presentation"
          src="/citypop/citypop_palm_near.png"
          alt=""
          className="pointer-events-none absolute bottom-[-12rem] left-1/2 z-[3] max-w-none -translate-x-1/2 select-none will-change-transform"
          style={{ y: nearY }}
        />

        {/* TITLE / CTAs */}
        <motion.div
          className="relative z-[2] flex h-full items-center justify-center px-4 text-center will-change-transform"
          style={{ y: nameY }}
        >
          <div>
            <h1 className="text-5xl font-extrabold tracking-tight md:text-7xl">
              <span className="bg-gradient-to-r from-fuchsia-400 via-rose-300 to-cyan-400 bg-clip-text text-transparent">
                Husna Maulana
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-[#E9D7FF]/80">
              ソフトウェアデベロッパー | フルスタックエンジニア | 開発者
            </p>
            <div className="mt-8 flex justify-center gap-3">
              <a
                href="#projects"
                className="rounded-xl bg-white px-5 py-2 font-medium text-neutral-900"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="rounded-xl border border-white/30 px-5 py-2 text-white/90"
              >
                Contact
              </a>
            </div>
          </div>
        </motion.div>

        {/* Vignette: fades to page bg to avoid seams */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(5,4,11,0.72)]"
        />
      </div>
    </section>
  );
}

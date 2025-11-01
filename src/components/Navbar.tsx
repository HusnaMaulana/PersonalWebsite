"use client";

import { useEffect, useRef, useState } from "react";

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const observersRef = useRef<IntersectionObserver | null>(null);

  // 1. Track scroll depth just for nav visuals AND for bottom-of-page override
  useEffect(() => {
    function handleScroll() {
      const y = window.scrollY;
      setScrolled(y > 40);

      // --- bottom fallback logic ---
      const scrollBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 4; // 4px tolerance
      if (scrollBottom) {
        setActive("contact");
      }
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Observe sections for intersection-based active state
  useEffect(() => {
    // clean up old observer if hot reload
    if (observersRef.current) {
      observersRef.current.disconnect();
    }

    // read nav height from CSS var
    const navHVar = getComputedStyle(document.documentElement).getPropertyValue(
      "--nav-h"
    );
    const navH = parseInt(navHVar || "64", 10);

    const observer = new IntersectionObserver(
      (entries) => {
        // ignore updates if we're already pinned to "contact" by bottom-of-page
        // (prevents flicker when barely bouncing bottom)
        const scrollBottom =
          window.innerHeight + window.scrollY >= document.body.offsetHeight - 4;
        if (scrollBottom) return;

        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              (a.target as HTMLElement).offsetTop -
              (b.target as HTMLElement).offsetTop
          );

        if (visible.length > 0) {
          const id = visible[0].target.id;
          if (id) {
            setActive(id);
          }
        }
      },
      {
        // Shift the top detection line below the navbar,
        // and limit bottom so we prefer the section that's "higher up"
        rootMargin: `-${navH + 8}px 0px -60% 0px`,
        threshold: 0.2,
      }
    );

    const sectionIds = ["home", "about", "skills", "projects", "contact"];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    observersRef.current = observer;
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 sm:px-0">
      <nav
        aria-label="Primary"
        className={[
          "mx-auto mt-4 w-full max-w-[36rem] sm:w-auto sm:containernav",
          "px-3 sm:px-4 py-2 rounded-full overflow-x-auto scrollbar-hide",
          "flex items-center gap-2 sm:gap-6 whitespace-nowrap justify-center sm:justify-center",
          "backdrop-blur supports-[backdrop-filter]:bg-black/10 border",
          scrolled
            ? "bg-black/40 border-white/20"
            : "bg-black/20 border-white/10",
        ].join(" ")}
      >
        {LINKS.map(({ href, label }) => {
          const id = href.slice(1);
          const isActive = active === id;
          return (
            <a
              key={href}
              href={href}
              className={[
                "whitespace-nowrap rounded-full px-3 py-1.5 transition-colors",
                "px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-base",
                isActive
                  ? "bg-white text-black"
                  : "text-white/80 hover:text-white",
              ].join(" ")}
              aria-current={isActive ? "page" : undefined}
            >
              {label}
            </a>
          );
        })}
      </nav>
    </header>
  );
}

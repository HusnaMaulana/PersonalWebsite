"use client";

export default function Navbar() {
  const links = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    // side padding only on mobile so the pill doesn't touch the edges
    <header className="fixed inset-x-0 top-0 z-50 px-3 sm:px-0">
      <nav
        aria-label="Primary"
        className={[
          // mobile: full-width pill with side margin; desktop: your containernav width
          "mx-auto mt-4 w-full max-w-[36rem] sm:w-auto sm:containernav",
          "rounded-full border border-white/10 bg-black/20 px-3 sm:px-4 py-2",
          "backdrop-blur supports-[backdrop-filter]:bg-black/10",
          "overflow-x-auto scrollbar-hide",
        ].join(" ")}
      >
        <ul className="flex items-center gap-3 sm:gap-6 whitespace-nowrap justify-start sm:justify-center">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-3 py-1 text-white/80 hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

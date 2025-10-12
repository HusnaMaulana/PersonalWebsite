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
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="containernav mt-4 rounded-full border border-white/10 bg-black/20 px-4 py-2 backdrop-blur supports-[backdrop-filter]:bg-black/10">
        <ul className="flex items-center justify-center gap-4 text-sm md:gap-6">
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

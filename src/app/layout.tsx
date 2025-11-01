// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Providers from "./providers";
import { Inter } from "next/font/google";
// import DiscPlayer from "@/components/DiscPlayer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://your-portfolio-domain.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Husna Maulana",
    template: "%s | Husna Maulana",
  },
  description:
    "Frontend/Full-stack developer focused on motion, performance, and delightful UX.",
  alternates: { canonical: "/" },
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    type: "website",
    title: "Husna Maulana — Portfolio",
    url: "/",
    images: ["/og.jpg"],
  },
  twitter: { card: "summary_large_image", images: ["/og.jpg"] },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      // Smooth hash scrolling across the site
      className="scroll-smooth"
    >
      <body
        className={[
          inter.variable,
          "antialiased text-neutral-100",
          // Base background + selection
          "bg-[#05040b] selection:bg-fuchsia-500/30 selection:text-white",
          // If you have a fixed navbar, this prevents anchor overlap:
          "scroll-pt-24",
        ].join(" ")}
      >
        {/* Skip link */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-3 focus:py-2 focus:text-black"
        >
          Skip to content
        </a>

        {/* Background layers (purely decorative) */}
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
          {/* soft radial spotlight */}
          <div className="absolute inset-0 [background:radial-gradient(60%_50%_at_50%_10%,rgba(255,0,153,0.12),rgba(0,0,0,0))]" />
          {/* top vignette */}
          <div className="absolute inset-x-0 top-0 h-48 from-black/40 to-transparent bg-gradient-to-b" />
          {/* bottom vignette */}
          <div className="absolute inset-x-0 bottom-0 h-48 from-black/40 to-transparent bg-gradient-to-t" />
          {/* optional noise overlay (add noise.png to /public if you like) */}
          {/* <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.png')] bg-repeat" /> */}
        </div>

        <Providers>
          <main id="main">{children}</main>
          {/* Fixed audio control if you re-enable it */}
          {/* <DiscPlayer className="fixed bottom-4 right-4 z-40" /> */}
        </Providers>
      </body>
    </html>
  );
}

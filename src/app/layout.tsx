import "./globals.css";
import type { Metadata } from "next";
import Providers from "./providers";
import { Inter } from "next/font/google";
import DiscPlayer from "@/components/DiscPlayer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Husna Maulana — Portfolio",
    template: "%s | Husna Maulana",
  },
  description:
    "Frontend/Full-stack developer focused on motion, performance, and delightful UX.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  metadataBase: new URL("https://una.tech"),
  openGraph: {
    type: "website",
    title: "Husna Maulana — Portfolio",
    url: "https://your-portfolio-domain.vercel.app",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-neutral-950 text-neutral-100">
      <body className={`${inter.className} antialiased`}>
        {/* Skip link for a11y */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-3 focus:py-2 focus:text-black"
        >
          Skip to content
        </a>
        <Providers>
          <main id="main">{children}</main>
          <DiscPlayer />
        </Providers>
      </body>
    </html>
  );
}

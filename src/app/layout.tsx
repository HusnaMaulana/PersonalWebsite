import "./globals.css";
import type { Metadata } from "next";
import Providers from "./providers";
import { Inter } from "next/font/google";
import DiscPlayer from "@/components/DiscPlayer";

const inter = Inter({ subsets: ["latin"] });

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://your-portfolio-domain.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Husna Maulana — Portfolio",
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
    images: ["/og.jpg"], // add this file to /public
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
    <html lang="en">
      <body className={`${inter.className} antialiased text-neutral-100`}>
        {/* Skip link */}
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

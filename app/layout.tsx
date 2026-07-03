import type { Metadata } from "next";
import { Playfair_Display, Poppins, Great_Vibes } from "next/font/google";
import SmoothScroll from "../components/wedding-card/SmoothScroll";
import "./globals.css";
import { cn } from "@/lib/utils";

// ── Display font: warm festive serif for headlines ──────────────────────────
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

// ── Body font: clean readable sans ──────────────────────────────────────────
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
});

// ── Script font: cursive handwriting for signatures/coda ────────────────────
const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
});

export const metadata: Metadata = {
  title: "Happy Raksha Bandhan 🪢",
  description: "A heartfelt digital Raksha Bandhan greeting card — because some threads cross any distance.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased",
        playfair.variable,
        poppins.variable,
        greatVibes.variable
      )}
      suppressHydrationWarning
    >
      {/* Body uses rakhi-cream as the base background */}
      <body
        className="min-h-full flex flex-col"
        style={{ background: "var(--rakhi-cream)", color: "var(--rakhi-text-primary)" }}
        suppressHydrationWarning
      >
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

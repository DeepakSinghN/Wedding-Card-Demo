import type { Metadata } from "next";
import { Playfair_Display, Poppins, Great_Vibes, Dancing_Script, Crimson_Pro, Cherry_Bomb_One, Alex_Brush, Arimo, Vesper_Libre } from "next/font/google";
import localFont from "next/font/local";
import SmoothScroll from "../components/Rakhi-card/SmoothScroll";
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

// ── Second script font: for personal written messages ──────────────────────────
const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dancing",
});

// ── Warm text serif: Crimson Pro ───────────────────────────────────────────────
const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-crimson-pro",
});

// ── Playful Bubble Font: Cherry Bomb One ─────────────────────────────────────────
const cherryBombOne = Cherry_Bomb_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-cherry-bomb-one",
});

// ── Local Custom Script Font: High Spirited ────────────────────────────────────
const highSpirited = localFont({
  src: "../public/Rakhi-card-media/High-Spirited/High Spirited.ttf",
  variable: "--font-high-spirited",
});

// ── Wedding Card 2: cursive display (Latin) ────────────────────────────────────
const alexBrush = Alex_Brush({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-alex-brush",
});

// ── Wedding Card 2: clean body (Latin) ─────────────────────────────────────────
const arimo = Arimo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arimo",
});

// ── Wedding Card 2: Devanagari serif for the Sanskrit shloka ───────────────────
// (Alex Brush & Arimo are Latin-only, so a Devanagari face is required to render
//  the Sanskrit text correctly.)
const vesperLibre = Vesper_Libre({
  subsets: ["devanagari"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-devanagari",
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
        greatVibes.variable,
        dancingScript.variable,
        highSpirited.variable,
        crimsonPro.variable,
        cherryBombOne.variable,
        alexBrush.variable,
        arimo.variable,
        vesperLibre.variable
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

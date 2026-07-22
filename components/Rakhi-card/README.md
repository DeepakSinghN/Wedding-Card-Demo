# Premium Raksha Bandhan Greeting Card Component Package

This directory contains all the sections, animations, interactions, and custom components for the premium **Raksha Bandhan Digital Greeting Card** (Deepak & Komal's sibling greeting card).

It has been structured to be **100% self-contained** within this `Rakhi-card` folder. You can copy and paste this entire folder into the `components/` directory of another Next.js application, install the dependencies, transfer the assets to your public directory, configure your layout fonts/globals, and run it.

---

## 1. Install Dependencies

Install the following required packages in your destination project:

```bash
npm install gsap @gsap/react lenis motion lucide-react canvas-confetti
npm install --save-dev @types/canvas-confetti
```

---

## 2. Copy Static Assets (Public Directory)

The card components reference several local graphics, illustrations, audio, and SVG assets. Copy the entire `media/` folder from this directory to the `/public/Rakhi-card-media/` directory of your target application:

* **Source**: `components/Rakhi-card/media/`
* **Destination**: `public/Rakhi-card-media/`

This includes:
* `Butterfly.gif` - The flight path butterfly GIF.
* `Confetti animation.mp4` - The envelope background video particle layer.
* `Lovely-Long-Version-chosic.com_.mp3` - The background ambient music loop.
* `High-Spirited/` - TrueType local font folder containing `High Spirited.ttf`.
* Other decorations (`Location-icon.svg`, `Story-frame.png`, `Tape.png`, `clouds.svg`, etc.).

---

## 3. Configure Fonts (Next.js layout.tsx)

Configure the Google Fonts and local custom script font in your destination project's root `layout.tsx` file:

```typescript
import { Playfair_Display, Poppins, Great_Vibes, Dancing_Script, Crimson_Pro, Cherry_Bomb_One } from "next/font/google";
import localFont from "next/font/local";
import SmoothScroll from "../components/Rakhi-card/SmoothScroll";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dancing",
});

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-crimson-pro",
});

const cherryBombOne = Cherry_Bomb_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-cherry-bomb-one",
});

const highSpirited = localFont({
  src: "../public/Rakhi-card-media/High-Spirited/High Spirited.ttf",
  variable: "--font-high-spirited",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${poppins.variable} ${greatVibes.variable} ${dancingScript.variable} ${highSpirited.variable} ${crimsonPro.variable} ${cherryBombOne.variable}`}
    >
      <body>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
```

---

## 4. Add CSS Variables & Keyframe Animations

Append these design tokens, variables, utility classes, and custom keyframes to your global stylesheet (e.g. `app/globals.css`):

```css
:root {
  /* ── Rakhi card design tokens ── */
  --rakhi-maroon: #7A1F3D;        /* primary color */
  --rakhi-gold: #F5A623;          /* accent color */
  --rakhi-saffron: #FFD36E;       /* secondary accent */
  --rakhi-thread-red: #C0392B;    /* thread red */
  --rakhi-cream: #FFF8F0;         /* background / text contrast */
  --rakhi-blush: #FFE4E4;         /* soft blush pink */
  --rakhi-text-primary: #4A1525;  /* primary dark text */
  --rakhi-text-secondary: #8B4A5A;/* secondary text */
}

/* Hero Background styling */
.hero-bg {
  background: linear-gradient(165deg,
      var(--rakhi-cream) 0%,
      #fff0f4 45%,
      var(--rakhi-blush) 100%);
}

/* Spinning watermark mandala */
.hero-mandala {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='90' fill='none' stroke='%237A1F3D' stroke-width='0.6' stroke-dasharray='4 6'/%3E%3Ccircle cx='100' cy='100' r='70' fill='none' stroke='%23F5A623' stroke-width='0.4' stroke-dasharray='3 8'/%3E%3Ccircle cx='100' cy='100' r='50' fill='none' stroke='%237A1F3D' stroke-width='0.4' stroke-dasharray='2 6'/%3E%3Ccircle cx='100' cy='100' r='30' fill='none' stroke='%23F5A623' stroke-width='0.5' stroke-dasharray='2 4'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 420px 420px;
  opacity: 0.06;
  animation: mandalaSpin 60s linear infinite;
}

@keyframes mandalaSpin {
  to { transform: rotate(360deg); }
}

@media (prefers-reduced-motion: reduce) {
  .hero-mandala {
    animation: none;
  }
}

/* Wax Seal Ribbon CTAs */
.cta-button:hover {
  background: var(--rakhi-thread-red) !important;
  border-color: var(--rakhi-thread-red) !important;
}

/* Out-of-phase floating animations for Hero Polaroids */
@keyframes float-card-1 {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
}
@keyframes float-card-2 {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}
@keyframes float-card-3 {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-7px); }
}

.animate-float-card-1 { animation: float-card-1 4s ease-in-out infinite; }
.animate-float-card-2 { animation: float-card-2 4.5s ease-in-out infinite; }
.animate-float-card-3 { animation: float-card-3 3.8s ease-in-out infinite; }

/* Lenis Smooth Scroll layout directives */
html.lenis,
html.lenis body {
  height: auto;
}

.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}

.lenis.lenis-smooth [data-lenis-prevent] {
  overscroll-behavior: contain;
}

.lenis.lenis-stopped {
  overflow: hidden;
}
```

---

## 5. Implement on Route Page

To display the Rakhi Greeting Card, import the parent page module in your Next.js route file (e.g. `app/page.tsx`):

```typescript
import RakhiCardPage from "@/components/Rakhi-card/page";

export default function Home() {
  return (
    <main>
      <RakhiCardPage />
    </main>
  );
}
```

---

## 6. Architecture & Code Optimizations Built-in

* **Code Splitting (`next/dynamic`)**: The entry [page.tsx](file:///components/Rakhi-card/page.tsx) automatically imports below-the-fold pages dynamically with `{ ssr: false }`, reducing initial JavaScript payload size and ensuring critical mount-path performance is buttery-smooth.
* **Scroll-Bound Render Pausing**: Infinite animations, video background loops, and butterfly GIFs are linked to ScrollTriggers. They play exclusively when visible in the viewport and freeze on exit, reclaiming crucial CPU/GPU cycles on mobile devices.
* **Unified Transform Stacks**: Avoids component layout conflicts by separating Framer Motion parallax translations (outer container wrappers) and GSAP fly-in animations (nested inner container divs).

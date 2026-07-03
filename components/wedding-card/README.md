# Premium Wedding Card Component Package

This folder contains all the sections, animations, utility components, and custom UI components for the interactive, highly animated, and premium **Wedding Card Invitation**.

It has been structured to be 100% self-contained within this `wedding-card` folder. You can copy and paste this entire folder into the `components/` directory of another React / Next.js application, install the dependencies, configure your styles/assets, and run it.

---

## 1. Install Dependencies

You will need to install the following npm packages in the destination project.

Run this command in the terminal of the target project:
```bash
npm install gsap @gsap/react lenis motion canvas-confetti lucide-react rough-notation clsx tailwind-merge class-variance-authority radix-ui
```

### Dev Dependencies (TypeScript Support)
If you are using TypeScript (highly recommended), install the types:
```bash
npm install -D @types/canvas-confetti
```

---

## 2. Copy Static Assets (Public Directory)

The card components reference several local media assets, sounds, and custom fonts. Ensure you copy the following folders from the `public/` directory of this application to the `public/` directory of your target application:

- `/public/fonts/` - Contains the custom brand font `Distrela-Demo.ttf`
- `/public/Hero/` - Contains the Hero header images/assets (e.g., Ganesha idol artwork)
- `/public/Gallery/` - Contains stacking album images
- `/public/Images/` - Contains standard page images
- `/public/RSVP images/` - Contains envelope backgrounds and textures (`rsvp-3.png`)
- `/public/Song/` - Contains background background audio files (`kesariya for wedding card.m4a`)
- `/public/card video/` - Contains video assets used in the loader animation (`Pre-Load Card Animation.mp4`)

---

## 3. Fonts & Typography Setup

### Next.js Font Config (Google Fonts)
The template uses Google Fonts (`Cormorant Garamond` and `Dancing Script`) and the local custom font (`Distrela`).

In your Root Layout (`app/layout.tsx` or similar), configure the fonts:
```typescript
import { Cormorant_Garamond, Dancing_Script, Geist } from "next/font/google";
import { cn } from "@/lib/utils"; // or from your local utility

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans"
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dancing",
});
```

Inject the font variables into the root class:
```tsx
<html className={cn(cormorant.variable, dancingScript.variable, geist.variable, "font-sans")}>
```

---

## 4. Tailwind CSS Configuration

### Tailwind v4 Setup (Recommended)
If your target project is using **Tailwind CSS v4** (e.g., Next.js 15+ standard setup), add the theme values and local font-face rule directly in your main CSS stylesheet (e.g., `app/globals.css`):

```css
@import "tailwindcss";
@import "tw-animate-css";

@theme {
  --color-maroon: #7A1C2C;
  --color-gold: #D4AF37;
  --color-cream: #FAF4EF;
  --color-card-bg: #FDFAF7;

  --color-brand-dark: #2c2a29;
  --color-brand-maroon: #A36662;
  --color-brand-light-maroon: #ba7a76;

  --font-distrela: "Distrela", serif;
  --font-cormorant: var(--font-cormorant), serif;
  --font-dancing: var(--font-dancing), cursive;
}

@font-face {
  font-family: 'Distrela';
  src: url('/fonts/Distrela-Demo.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
```

### Tailwind v3 Setup (Fallback)
If your target project is using **Tailwind CSS v3**, extend your `tailwind.config.js` config object with:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        maroon: '#7A1C2C',
        gold: '#D4AF37',
        cream: '#FAF4EF',
        'card-bg': '#FDFAF7',
        brand: {
          dark: '#2c2a29',
          maroon: '#A36662',
          'light-maroon': '#ba7a76',
        }
      },
      fontFamily: {
        distrela: ['Distrela', 'serif'],
        cormorant: ['var(--font-cormorant)', 'serif'],
        dancing: ['var(--font-dancing)', 'cursive'],
      }
    }
  }
}
```

---

## 5. Custom Global CSS Styles

Add the following custom style overrides, animations, and configurations to your main stylesheet (e.g., `app/globals.css`). These classes are vital for the 3D cards, smooth scrolling, floating, and falling flower petal animations:

```css
body {
  background-color: #FAF4EF;
  color: #A36662;
  font-family: var(--font-cormorant), serif;
  overflow-x: hidden;
}

/* Premium Gold Gradients */
.gold-gradient {
  background: linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%);
}

.gold-text-gradient {
  background: linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* 3D Premium Card Shadows & Borders */
.card-3d {
  background: #FDFAF7;
  border: 1px solid rgba(163, 102, 98, 0.2);
  box-shadow:
    0 15px 35px -10px rgba(163, 102, 98, 0.35),
    0 5px 15px -5px rgba(163, 102, 98, 0.15),
    inset 0 1px 0 0 rgba(255, 255, 255, 0.6);
  border-radius: 16px;
  position: relative;
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.card-3d:hover {
  transform: translateY(-5px) scale(1.01);
  box-shadow:
    0 25px 45px -15px rgba(163, 102, 98, 0.45),
    0 10px 20px -5px rgba(163, 102, 98, 0.2),
    inset 0 1px 0 0 rgba(255, 255, 255, 0.8);
  border-color: rgba(163, 102, 98, 0.4);
}

/* Floating Animations */
@keyframes float {
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-8px) rotate(0.5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
}

.animate-float { animation: float 3.5s ease-in-out infinite; }
.animate-float-slow { animation: float 6s ease-in-out infinite; }

/* Out-of-phase floating animations for components */
@keyframes float-card-1 { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-6px); } }
@keyframes float-card-2 { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
@keyframes float-card-3 { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-7px); } }

.animate-float-card-1 { animation: float-card-1 4s ease-in-out infinite; }
.animate-float-card-2 { animation: float-card-2 4.5s ease-in-out infinite; }
.animate-float-card-3 { animation: float-card-3 3.8s ease-in-out infinite; }

/* Custom Scrollbar */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #FAF4EF; }
::-webkit-scrollbar-thumb {
  background: #A36662;
  border-radius: 3px;
}

/* Falling Flower Petals Keyframes */
@keyframes petalFall {
  0% { transform: translateY(-10vh) rotate(0deg); opacity: 0; }
  10% { opacity: 0.85; }
  90% { opacity: 0.85; }
  100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
}

@keyframes petalSway {
  0%, 100% { transform: translateX(0) rotate(0deg); }
  50% { transform: translateX(35px) rotate(20deg); }
}

/* Lenis Smooth Scroll Configuration */
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

.lenis.lenis-scrolling iframe {
  pointer-events: none;
}
```

---

## 6. How to Integrate & Use in Your Page

To run the card invitation, import the components into your route page file (e.g., `app/page.tsx`). You can wrap the page in `<SmoothScroll>` inside your Root Layout (`app/layout.tsx`) as follows:

### Layout Setup (`app/layout.tsx`)
```tsx
import SmoothScroll from "@/components/wedding-card/SmoothScroll";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
```

### Main Page Setup (`app/page.tsx`)
```tsx
"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Hero from "@/components/wedding-card/Hero";
import IntroStory from "@/components/wedding-card/IntroStory";
import SaveTheDate from "@/components/wedding-card/SaveTheDate";
import Countdown from "@/components/wedding-card/Countdown";
import Gallery from "@/components/wedding-card/Gallery";
import Venue from "@/components/wedding-card/Venue";
import Festivities from "@/components/wedding-card/Festivities";
import RSVP from "@/components/wedding-card/RSVP";
import Footer from "@/components/wedding-card/Footer";
import FloatingControls from "@/components/wedding-card/FloatingControls";
import FlowerPetals from "@/components/wedding-card/FlowerPetals";
import ScrollReveal from "@/components/wedding-card/ScrollReveal";
import ShlokaLoader from "@/components/wedding-card/ShlokaLoader";

export default function Home() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Lock scrolling initially for on-load screen
    if (typeof window !== "undefined" && (window as any).lenis) {
      (window as any).lenis.stop();
    }
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  const handleEnter = () => {
    setShowLoader(false);
    setTimeout(() => {
      if (typeof window !== "undefined" && (window as any).lenis) {
        (window as any).lenis.start();
      }
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }, 2000);
  };

  return (
    <main className="w-full min-h-screen bg-[#FAF4EF] flex flex-col items-center relative">
      <AnimatePresence>
        {showLoader && <ShlokaLoader onEnter={handleEnter} />}
      </AnimatePresence>

      <Hero />

      <ScrollReveal animation="fade-in" duration={1.2} className="w-full h-screen">
        <IntroStory />
      </ScrollReveal>

      <SaveTheDate onAllRevealed={() => setIsRevealed(true)} />

      <Countdown active={isRevealed} />

      <Gallery />

      <Venue />

      <Festivities />

      <RSVP />

      <Footer />

      <FloatingControls />

      <FlowerPetals />
    </main>
  );
}
```

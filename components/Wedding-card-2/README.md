# Premium Wedding Card 2 Component Package

This directory contains all the sections, animations, forms, and custom components for the second interactive, highly animated, and premium **Wedding Card Invitation** (Deepak & Amrita's invitation).

It has been structured to be **100% self-contained** within this `Wedding-card-2` folder. You can copy and paste this entire folder into the `components/` directory of another Next.js application, install the dependencies, configure your styles/assets, and run it.

---

## 1. Install Dependencies

You will need to install the following npm packages in the destination project:

```bash
npm install gsap @gsap/react lenis framer-motion
```

---

## 2. Copy Static Assets (Public Directory)

The card components reference several local graphics, illustrations, and SVG assets. Copy the entire `/public/Wedding-card-2/` folder from the source project to the `/public/` directory of your target application:

- `/public/Wedding-card-2/Hero-section image/` - Ganesha icons, floral frame arches, peacock illustrations, and couple graphics.
- `/public/Wedding-card-2/Save-the-date/` - Save the date background vectors, frames, and icons.
- `/public/Wedding-card-2/Invitation-section/` - Central oval photo frames, Lord Ganesha line vectors, and decorative flower branches.
- `/public/Wedding-card-2/Venue-section/` - Floral corner overlays.

---

## 3. Configure Google Fonts (Next.js layout.tsx)

Configure the required Google Fonts in your destination project's root `layout.tsx` file to match the typography design:

```typescript
import { Alex_Brush, Arimo, Cormorant_Garamond, Rozha_One } from "next/font/google";

const alexBrush = Alex_Brush({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-alex-brush",
  display: "swap",
});

const arimo = Arimo({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-arimo",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const devanagari = Rozha_One({
  subsets: ["devanagari", "latin"],
  weight: ["400"],
  variable: "--font-devanagari",
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${alexBrush.variable} ${arimo.variable} ${cormorant.variable} ${devanagari.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

---

## 4. Add Global Styles & Keyframe Animations

Append these custom variables, utility animation classes, and CSS keyframes to your global styles stylesheet (e.g. `app/globals.css`):

```css
@theme {
  --font-alex-brush: var(--font-alex-brush), cursive;
  --font-arimo: var(--font-arimo), sans-serif;
  --font-display: var(--font-cormorant), serif;
  --font-devanagari: var(--font-devanagari), serif;
}

/* Floating animation utilities */
.animate-float {
  animation: float 3.5s ease-in-out infinite;
}

.animate-float-slow {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-8px) rotate(0.5deg);
  }
}

/* Viewport Entrance Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 1.4s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.animation-delay-150 { animation-delay: 150ms; }
.animation-delay-300 { animation-delay: 300ms; }
.animation-delay-450 { animation-delay: 450ms; }

/* Slow Reveal Animations */
@keyframes slowFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slowFadeInLeft {
  from { opacity: 0; transform: translateX(-40px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes slowFadeInRight {
  from { opacity: 0; transform: translateX(40px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes slowFadeInBottom {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slowFadeInTop {
  from { opacity: 0; transform: translateY(-40px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-slow-fade-in {
  animation: slowFadeIn 2.2s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.animate-slow-fade-in-left {
  animation: slowFadeInLeft 2.2s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.animate-slow-fade-in-right {
  animation: slowFadeInRight 2.2s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.animate-slow-fade-in-bottom {
  animation: slowFadeInBottom 2.2s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.animate-slow-fade-in-top {
  animation: slowFadeInTop 2.2s cubic-bezier(0.16, 1, 0.3, 1) both;
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
```

---

## 5. How to Integrate & Use in Your Page

Mount the wrapper page inside the target project using the mockup-constrained structure:

```typescript
import WeddingCardTwoPage from "@/components/Wedding-card-2/page";

export default function Page() {
  return <WeddingCardTwoPage />;
}
```

# Premium Scroll-Animated Wedding Card Component (Wedding-card-3)

A premium, mobile-first digital wedding invitation card built with **Next.js**, **Tailwind CSS**, **GSAP (ScrollTrigger & DrawSVGPlugin)**, and **Framer Motion**. It features smooth momentum scrolling, dynamic SVG line drawing, responsive image loading, parallax-style layouts, and sticky polaroid card stacking.

---

## 📂 Directory Structure

Copy the entire `components/Wedding-card-3/` directory into your project:

```text
Wedding-card-3/
├── page.tsx                    # Main container (coordinates states, Hero reveal, Lenis smooth scrolling, ScrollTrigger RAF)
├── hero.tsx                    # Landing view (animated cover page, tap-to-reveal, floating hearts)
├── SaveTheDate.tsx             # DrawSVG martini glass animation & staggered text reveals
├── WineGlassSVG.tsx            # Inline path masks used by DrawSVG for SaveTheDate
├── invitation.tsx              # RSVP welcome note card with absolute floral framing
├── collage.tsx                 # CSS Sticky stacking gallery (polaroids reveal & rotate on scroll)
├── EventDetails.tsx            # Lord Ganesha schedule cards (slide up from below on viewport entry with 1s delay)
├── rsvp.tsx                    # Interactive attendance response form (staggered inputs, success modal)
├── Closing.tsx                 # Final view (bride & groom illustration with dense floral border framing)
├── Fonts/                      # Local typography assets
└── *-section-resources/        # Highly optimized PNG, JPG & SVG graphics per section
```

---

## ⚡ Dependencies & Setup

The component uses high-performance animation and layout tools. Install these dependencies in your target project:

```bash
npm install gsap @gsap/react framer-motion lenis
```

### 🟢 GSAP Premium Plugin Notice
The `SaveTheDate.tsx` component relies on **`DrawSVGPlugin`** to draw the martini glass outlines. 
* This is a premium club-level GSAP plugin.
* Set up your private `.npmrc` with your GSAP token to install `gsap-trial` or the full `gsap` package containing premium plugins:
  ```text
  # Example .npmrc for premium GSAP
  @gsap:registry=https://npm.greensock.com
  //npm.greensock.com/:_authToken=YOUR-GREEN-SOCK-TOKEN-HERE
  ```

---

## ✍️ Customizing Typography (Fonts)

The card utilizes elegant custom typography variables. You must declare these local fonts in your main Next.js layout (`app/layout.tsx` or similar):

```typescript
import localFont from "next/font/local";
import { Playfair_Display, Poppins, Great_Vibes } from "next/font/google";

// Standard Serif Header & Body fonts
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-display" });
const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--font-body" });
const greatVibes = Great_Vibes({ subsets: ["latin"], weight: ["400"], variable: "--font-script" });

// Local Custom fonts (Path points to wherever you locate the card folder)
const anastasia = localFont({
  src: "./components/Wedding-card-3/Fonts/anastasia_script/Anastasia Script Personal Use.ttf",
  variable: "--font-anastasia",
});

const amsterdam = localFont({
  src: "./components/Wedding-card-3/Welcome-section-resources/Amsterdam_Amsterdam_Four_Font_Family_(Fontmirror)/Amsterdam 400.ttf",
  variable: "--font-amsterdam",
});

const amsterdamFour = localFont({
  src: "./components/Wedding-card-3/Welcome-section-resources/Amsterdam_Amsterdam_Four_Font_Family_(Fontmirror)/Amsterdam Four_ttf 400.ttf",
  variable: "--font-amsterdam-four",
});

// Pass variables into your html tag class list:
// className={`${playfair.variable} ${poppins.variable} ${greatVibes.variable} ${anastasia.variable} ${amsterdam.variable} ${amsterdamFour.variable}`}
```

---

## 🛠️ Usage / Integration

Once fonts and packages are configured, mount the entry point anywhere in your Next.js route:

```tsx
import WeddingCardThreePage from "@/components/Wedding-card-3/page";

export default function WeddingCardRoute() {
  return <WeddingCardThreePage />;
}
```

---

## ⚙️ Configuration & Customization Guide

An agent or developer can customize any section easily:

### 1. Changing Names & Sign-Offs
* **Hero Screen (`hero.tsx`)**: Change lines `144` and `164` to modify the primary names (inside the wreath).
* **Save the Date (`SaveTheDate.tsx`)**: Change line `105` to update the script titles.
* **Invitation Sign-off (`invitation.tsx`)**: Edit line `125` to change the `- With love, Vivek & Khushi` signing.
* **RSVP Header (`rsvp.tsx`)**: Edit line `193` to update names.
* **Closing Footer (`Closing.tsx`)**: Edit names at lines `162` and `191`.

### 2. Customizing Schedule & Locations (`EventDetails.tsx`)
Modify the `events` array at the top of `EventDetails.tsx` (lines `16` to `57`). Each event object looks like this:
```typescript
{
  id: "wedding",
  title: "Wedding Ceremony",
  dateTime: "Sunday, Nov 29 - 11:00 AM Onwards",
  location: "Main Hall, The Oberoi Amarvilas",
  dressCode: "Traditional Formal",
  mapLink: "https://www.google.com/maps/search/?api=1&query=Your+Coordinates+Or+Address",
}
```

### 3. Stacking Photo Gallery (`collage.tsx`)
Update the `photos` array at the top of `collage.tsx` (lines `21` to `57`). Provide local Next.js `StaticImageData` imports for target portrait dimensions. Adjust polaroid tilt rotations via the `rotate` attribute (e.g., `rotate: -3` for left slant, `rotate: 3` for right slant).

---

## 🚀 Performance Optimizations Checklist (Lag-Free Mobile Rendering)

These solutions are already implemented in this codebase, but should be preserved during any subsequent edits:
1. **GPU Promotion (`will-change`)**: All rotating, scaling, or translating containers utilize `style={{ willChange: "transform, opacity" }}`.
2. **GSAP Compositing (`force3D: true`)**: All GSAP tweens explicitly declare `force3D: true` to prevent pixel-alignment checks and leverage GPU hardware acceleration.
3. **Optimized PNG Textures**: The closing section illustrations are high-density, web-compressed PNG textures instead of heavy vector SVGs, avoiding CPU repaint lags.
4. **Next.js Image Sizes**: Next.js `<Image>` components specify appropriate `sizes` attributes (e.g., `sizes="(max-width: 480px) 280px, 280px"`) to prevent serving desktop assets to mobile browsers.
5. **Reduced Motion Guard**: Standard checks for user prefers-reduced-motion media query return early:
   ```typescript
   if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
   ```

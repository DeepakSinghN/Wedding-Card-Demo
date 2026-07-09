# Happy Raksha Bandhan — Digital Scrapbook Card Summary

A luxury, highly interactive, and responsive digital scrapbook greeting card designed to celebrate the bond between siblings. Built with Next.js, React, Tailwind CSS, and GSAP, the application delivers a premium editorial layout and sensory micro-interactions.

---

## 🎨 Design Philosophy & Aesthetics

Adhering to the **`ui-ux-pro-max`** design standards, the website balances traditional festive warmth with modern luxury styling:
* **Color Palette**: Uses a curated blend of HSL-tailored colors—deep festive maroon (`#7A1F3D`), marigold gold (`#F5A623`), saffron accents, soft blush red, and a warm cream background (`#FFF8F0`) that acts as a tactile paper canvas.
* **Typography**: Beautifully pairs editorial fonts:
  * **Playfair Display**: Bold headlines and card titles.
  * **Crimson Pro**: Highly readable serif for body texts and quotes.
  * **Poppins**: Clean, modern sans-serif for secondary captions and utility elements.
  * **Great Vibes / Dancing Script / High Spirited**: Intimate cursive handwriting scripts for signatures, side notes, and titles.
* **Icon system**: Employs vector-based assets (`lucide-react`) styled to match their themes, completely avoiding generic, low-contrast system emojis for structural or interactive elements.
* **Tactile Visuals**: Implements organic liquid glass gradients, dual drop-shadow offsets, 3D borders, hand-drawn Polaroid frames, and realistic paper/tape textures.

---

## 🧭 Page Flow & Feature Details

The website is structured as a continuous vertical scrapbook journey, with scroll controls keeping the experience tightly focused.

### 1. Pinned Hero & Morphing Countdown (Hero.tsx)
* **Collage Layout**: A full-screen scattered Polaroid collage featuring childhood memories.
* **3D Cursor Parallax**: On desktop viewports, cards dynamically tilt and track mouse coordinates to create a depth perspective.
* **Scroll-Lock Mechanics**: Page scrolling is completely locked upon loading to prevent users from bypassing the landing cards.
* **Shape-Morphing CTA Button**: 
  * Click to trigger a morph from a gold-rimmed rectangle (`152px x 42px`) to a perfect circle (`72px x 72px`).
  * Initiates a 5-second circular SVG loading progress ring and displays a scale-popping countdown (`5, 4, 3, 2, 1`).
  * Once the countdown completes, scrolling is unlocked and the viewport automatically scrolls the user down to the Story section. The button smoothly morphs back to its original layout.

### 2. Sibling Story & Confetti (Story.tsx)
* **Red-Thread Divider**: Decorative thread lines separating the sections, acting as an anchor for a global flying butterfly element.
* **Interactive Confetti MP4 Overlay**: A ScrollTrigger detects when the story section enters view, playing a high-fidelity video celebration overlay (`Confetti animation.mp4`) that automatically unmounts upon ending to save CPU resources.
* **Hand-Drawn Frame**: Focuses on a central sibling photograph framed inside a sketch polaroid overlay.

### 3. Sibling Message (Message.tsx)
* **Editorial Division**: A simple calligraphy letterpress-inspired divider line.
* **Blur-Reveal Typographic Animation**: Uses a customized ScrollReveal staggering characters with CSS filter blurs for a gentle, organic text fade-in.

### 4. Interactive Scrapbook (Scrapbook.tsx)
* **Scroll-Linked Scale-Zooms**: Displays memories that zoom and rotate onto the canvas. Easing is set to `ease: "none"` to map the size changes perfectly to the user's thumb scrolling speed on mobile devices.
* **Polaroid Card Mounts**: Cards utilize realistic tape headers and offset rotations to feel like a real book.

### 5. Flip Traits (Traits.tsx)
* **Double-Sided Cards**: Three interactive card mounts that flip on hover/tap.
* **Vector Icons**: Front faces display high-fidelity vector icons (`Compass`, `Shield`, and `HeartHandshake`) colored dynamically to match their trait definitions.

### 6. Promises Envelope (PromisesEnvelope.tsx)
* **Origami Folds**: An interactive folded paper envelope held shut by a wax seal.
* **Tactile Wax Seal**: Swapped out static emojis for a dynamic vector `Heart` icon.
* **Butterfly Particle Swarm**: Clicking the wax seal opens the letter contents and spawns `25` colorful butterfly elements flying upward across the screen.

### 7. Secret Code Box (SecretCodeBox.tsx)
* **Locked Memory Safe**: Prompts the user with a personal secret question.
* **Passcode Validation**: Inputs flash red and shake on incorrect answers.
* **Sparkle Particles**: Entering the correct answer reveals a hidden card block and bursts `40` golden sparkle particles outward.

### 8. Retro Cassette Player (CassettePlayer.tsx)
* **Sensory Retro Audio**: An interactive vintage tape deck playing custom background music.
* **Lucide Audio Controls**: Stylized Play, Pause, and Mute buttons with volume indicator icons and a ticking tape tape progress ring.

### 9. Diya & Sky Lantern Rituals (DiyaRitual.tsx & LanternRelease.tsx)
* **Firelighting Diya**: Click to light the traditional clay lamp, triggering canvas glowing halos and marigold petal showers.
* **Twilight Lantern Launch**: Tap to light the paper lantern; its inner flame glows, its body turns amber, and it floats up off the screen trailing golden sparks.

### 10. Thank You Outro (ThankYou.tsx)
* **Fluid Geometry**: Curves bend as the user scrolls into the final section.
* **Cursive Signature**: Concludes the card with a warm heartfelt quote and signature lettering.

---

## 🛠️ Technology Stack & Performance

* **Framework**: Next.js (utilizing Turbopack, typescript validation, and static-path prerendering).
* **Scroll Dynamics**: Driven by Lenis smooth scroll and GSAP ticker sync to keep frame rates locked at 60fps on mobile displays.
* **Animations**: Powered by GSAP (ScrollTrigger, SplitText, timelines) and Framer Motion.
* **SEO & Responsiveness**: Fluid typography, container layouts, metadata headings, and accessibility checking for reduced motion preferences.

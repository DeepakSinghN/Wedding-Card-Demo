"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ScratchCardProps {
  title: string;
  revealValue: string;
  subText: string;
  onReveal?: () => void;
  swingDelay?: number;
  rotateDuration?: number;
  yDuration?: number;
}

// Programmatic ASMR scratch sound synthesizer using Web Audio API
class ScratchAudioSynthesizer {
  private ctx: AudioContext | null = null;
  private noise: AudioBufferSourceNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private gainNode: GainNode | null = null;

  constructor() { }

  public init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    try {
      this.ctx = new AudioContextClass();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0, this.ctx.currentTime);

      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = "bandpass";
      this.filter.frequency.value = 1300; // soft grainy scratch tone
      this.filter.Q.value = 2.0;

      // 2 seconds looping white noise buffer
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      this.noise = this.ctx.createBufferSource();
      this.noise.buffer = buffer;
      this.noise.loop = true;

      this.noise.connect(this.filter);
      this.filter.connect(this.gainNode);
      this.gainNode.connect(this.ctx.destination);

      this.noise.start();
    } catch (e) {
      console.warn("Scratch sound init failed:", e);
    }
  }

  public setVolume(volume: number) {
    if (!this.gainNode || !this.ctx) return;
    // Smooth gain transition to avoid pops
    this.gainNode.gain.setTargetAtTime(volume * 0.12, this.ctx.currentTime, 0.03);
  }

  public stop() {
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setTargetAtTime(0, this.ctx.currentTime, 0.04);
    }
  }

  public destroy() {
    if (this.noise) {
      try { this.noise.stop(); } catch (e) { }
    }
    if (this.ctx) {
      try { this.ctx.close(); } catch (e) { }
    }
  }
}

export default function ScratchCard({
  title,
  revealValue,
  subText,
  onReveal,
  swingDelay = 0,
  rotateDuration = 1.2,
  yDuration = 1.4
}: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratched, setIsScratched] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const isDrawingRef = useRef(false);

  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Upgrade refs
  const scratchStrokes = useRef<{ x: number; y: number }[][]>([]);
  const sparkles = useRef<{ x: number; y: number; vx: number; vy: number; size: number; opacity: number }[]>([]);
  const hoverCoordsRef = useRef<{ x: number; y: number } | null>(null);
  const synthRef = useRef<ScratchAudioSynthesizer | null>(null);
  const isAnimatingRef = useRef(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const lastTimeRef = useRef(0);
  const lastVibrateRef = useRef(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDrawingRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xOffset = (x / rect.width) - 0.5;
    const yOffset = (y / rect.height) - 0.5;

    setTilt({
      x: -yOffset * 18,
      y: xOffset * 18,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  useEffect(() => {
    setIsClient(true);
    synthRef.current = new ScratchAudioSynthesizer();
    return () => {
      if (synthRef.current) {
        synthRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (!isClient) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const isMobile = window.innerWidth < 768;
    const width = isMobile ? 120 : 160;
    const height = isMobile ? 165 : 220;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Dynamic Redraw Function
    const redraw = () => {
      ctx.globalCompositeOperation = "source-over";

      const coords = hoverCoordsRef.current;
      let gradient;

      if (coords) {
        // Specular radial gradient centered on the cursor
        gradient = ctx.createRadialGradient(coords.x, coords.y, 5, coords.x, coords.y, Math.max(width, height) * 0.95);
        gradient.addColorStop(0, "#FFEBEA"); // bright specular highlight
        gradient.addColorStop(0.25, "#E1B2AF"); // rose gold shine highlight
        gradient.addColorStop(0.6, "#A36662"); // terracotta base
        gradient.addColorStop(1, "#6A3633"); // shadow base
      } else {
        // Default linear gradient
        gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, "#A36662");
        gradient.addColorStop(0.4, "#E1B2AF");
        gradient.addColorStop(0.6, "#B37A76");
        gradient.addColorStop(1, "#A36662");
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Add subtle grain/texture noise
      ctx.fillStyle = "rgba(253, 250, 247, 0.12)";
      const dotCount = isMobile ? 150 : 250;
      for (let i = 0; i < dotCount; i++) {
        const rx = Math.random() * width;
        const ry = Math.random() * height;
        ctx.fillRect(rx, ry, 1.2, 1.2);
      }

      // Draw "SCRATCH" text (under composite source-over, so it scratches away)
      ctx.font = "bold 14px var(--font-cormorant), sans-serif";
      ctx.fillStyle = "#FDFAF7";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("SCRATCH", width / 2, height / 2);

      // Erase scratched paths smoothly
      ctx.globalCompositeOperation = "destination-out";
      ctx.strokeStyle = "rgba(0,0,0,1)";
      ctx.lineWidth = 44; // diameter of stroke (double the old 22px arc radius)
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.fillStyle = "rgba(0,0,0,1)";

      scratchStrokes.current.forEach((stroke) => {
        if (stroke.length === 0) return;
        
        ctx.beginPath();
        ctx.moveTo(stroke[0].x, stroke[0].y);
        for (let i = 1; i < stroke.length; i++) {
          ctx.lineTo(stroke[i].x, stroke[i].y);
        }
        
        if (stroke.length === 1) {
          ctx.arc(stroke[0].x, stroke[0].y, 22, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.stroke();
        }
      });

      // Draw active sparkles
      ctx.globalCompositeOperation = "source-over";
      sparkles.current.forEach((sp) => {
        ctx.save();
        ctx.translate(sp.x, sp.y);
        ctx.globalAlpha = sp.opacity;
        ctx.fillStyle = "#FFF2CC"; // Golden glow

        ctx.beginPath();
        ctx.moveTo(0, -sp.size);
        ctx.quadraticCurveTo(0, 0, sp.size, 0);
        ctx.quadraticCurveTo(0, 0, 0, sp.size);
        ctx.quadraticCurveTo(0, 0, -sp.size, 0);
        ctx.quadraticCurveTo(0, 0, 0, -sp.size);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      });
    };

    // Frame-by-frame animation loop (only active during scratching or when sparkles fade)
    const startAnimationLoop = () => {
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;

      const loop = () => {
        if (!canvasRef.current) {
          isAnimatingRef.current = false;
          return;
        }

        // Update active sparkles
        const sList = sparkles.current;
        for (let i = sList.length - 1; i >= 0; i--) {
          const sp = sList[i];
          sp.x += sp.vx;
          sp.y += sp.vy;
          sp.opacity -= 0.04;
          if (sp.opacity <= 0) {
            sList.splice(i, 1);
          }
        }

        redraw();

        if (sList.length > 0 || isDrawingRef.current) {
          requestAnimationFrame(loop);
        } else {
          isAnimatingRef.current = false;
        }
      };

      requestAnimationFrame(loop);
    };

    // Draw initial state
    redraw();

    const getCoords = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      let clientX = 0;
      let clientY = 0;

      if ("touches" in e) {
        if (e.touches.length === 0) return null;
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    };

    const handleDraw = (e: MouseEvent | TouchEvent) => {
      if (!isDrawingRef.current || isScratched) return;
      const coords = getCoords(e);
      if (!coords) return;

      // Add coordinate to active stroke
      const currentStroke = scratchStrokes.current[scratchStrokes.current.length - 1];
      if (currentStroke) {
        currentStroke.push(coords);
      }

      // Synthesize scratch sound modulated by cursor speed
      const now = Date.now();
      let speed = 0;
      if (lastPosRef.current) {
        const dx = coords.x - lastPosRef.current.x;
        const dy = coords.y - lastPosRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const dt = now - lastTimeRef.current;
        if (dt > 0) speed = dist / dt;
      }
      lastPosRef.current = coords;
      lastTimeRef.current = now;

      if (synthRef.current) {
        synthRef.current.init();
        synthRef.current.setVolume(Math.min(speed * 0.8, 1.0));
      }

      // Vibrate mobile device (throttled)
      const vNow = Date.now();
      if (vNow - lastVibrateRef.current > 50) {
        if (typeof navigator !== "undefined" && navigator.vibrate) {
          navigator.vibrate(8);
        }
        lastVibrateRef.current = vNow;
      }

      // Spawn sparkle particles
      for (let i = 0; i < 2; i++) {
        sparkles.current.push({
          x: coords.x,
          y: coords.y,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3,
          size: 2 + Math.random() * 4,
          opacity: 1.0,
        });
      }

      startAnimationLoop();
    };

    const handleStart = (e: MouseEvent | TouchEvent) => {
      isDrawingRef.current = true;
      if (synthRef.current) {
        synthRef.current.init();
      }
      scratchStrokes.current.push([]);
      handleDraw(e);
    };

    const checkScratchAmount = () => {
      if (isScratched) return;

      const imgData = ctx.getImageData(0, 0, width * dpr, height * dpr);
      const data = imgData.data;
      let transparent = 0;
      const total = data.length / 4;

      for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] === 0) {
          transparent++;
        }
      }

      const percent = (transparent / total) * 100;
      if (percent > 45) { // If 45%+ scratched, reveal the entire card automatically
        setIsScratched(true);
        if (typeof navigator !== "undefined" && navigator.vibrate) {
          navigator.vibrate([80, 50, 80]); // double pulse haptic
        }
        if (synthRef.current) {
          synthRef.current.stop();
        }
        ctx.clearRect(0, 0, width, height);
        if (onReveal) {
          onReveal();
        }
      }
    };

    const handleEnd = () => {
      isDrawingRef.current = false;
      if (synthRef.current) {
        synthRef.current.stop();
      }
      lastPosRef.current = null;
      checkScratchAmount();
    };

    const onTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      handleStart(e);
    };

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      handleDraw(e);
    };

    const onTouchEnd = (e: TouchEvent) => {
      e.preventDefault();
      handleEnd();
    };

    const onMouseDown = (e: MouseEvent) => {
      handleStart(e);
    };

    const onMouseMove = (e: MouseEvent) => {
      const coords = getCoords(e);
      if (coords) {
        hoverCoordsRef.current = coords;
      }
      if (isDrawingRef.current) {
        handleDraw(e);
      } else {
        startAnimationLoop(); // update specular shine
      }
    };

    const onMouseLeave = () => {
      hoverCoordsRef.current = null;
      handleEnd();
      startAnimationLoop(); // remove specular shine highlight
    };

    const onMouseUp = () => {
      handleEnd();
    };

    // Bind touch events with passive: false to allow e.preventDefault()
    canvas.addEventListener("touchstart", onTouchStart, { passive: false });
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    canvas.addEventListener("touchend", onTouchEnd, { passive: false });

    // Bind mouse events
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mouseleave", onMouseLeave);

    return () => {
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);

      canvas.removeEventListener("mousedown", onMouseDown);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [isClient, isScratched, onReveal]);

  return (
    <div className="flex flex-col items-center gap-2 select-none scratch-card-container">
      {/* Title above the card */}
      <span className="font-semibold text-lg tracking-[0.2em] text-black/75 uppercase">
        {title}
      </span>

      {/* Card Wrapper with dynamic 3D swing that stops when scratched */}
      <motion.div
        animate={isScratched
          ? { rotate: [-1.2, 1.2], y: [-5, 5] }
          : { rotate: [-4, 4], y: [-3, 3] }
        }
        transition={isScratched
          ? {
            rotate: { repeat: Infinity, repeatType: "reverse", duration: 3.2, ease: "easeInOut", delay: swingDelay },
            y: { repeat: Infinity, repeatType: "reverse", duration: 3.8, ease: "easeInOut", delay: swingDelay }
          }
          : {
            rotate: { repeat: Infinity, repeatType: "reverse", duration: rotateDuration, ease: "easeInOut", delay: swingDelay },
            y: { repeat: Infinity, repeatType: "reverse", duration: yDuration, ease: "easeInOut", delay: swingDelay }
          }
        }
        className="relative"
      >
        <div
          className="relative w-[130px] h-[170px] mx-2 md:w-[160px] md:h-[200px] rounded-2xl bg-[#FDFAF7] border border-[#A36662]/12 border-b-[4px] md:border-b-[6px] border-b-[#A36662]/20 overflow-hidden flex items-center justify-center  cursor-pointer"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: isHovered
              ? `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.05)`
              : 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)',
            transition: isHovered
              ? "transform 0.05s ease-out, box-shadow 0.05s ease-out"
              : "transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)",
            boxShadow: isHovered
              ? `${-tilt.y * 2.2}px ${tilt.x * 2.2 + 25}px 45px -8px rgba(163, 102, 98, 0.38), 0 12px 20px -6px rgba(163, 102, 98, 0.18), inset 0 1px 0 0 rgba(255, 255, 255, 0.7)`
              : "0 12px 30px -8px rgba(163, 102, 98, 0.18), 0 8px 12px -6px rgba(163, 102, 98, 0.12), inset 0 1px 0 0 rgba(255, 255, 255, 0.7)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Underlying revealed content */}
          <motion.div
            animate={isScratched ? { rotateY: [0, -20, 20, -10, 10, 0] } : {}}
            transition={{ duration: 1.0, ease: "easeInOut", delay: 0.1 }}
            className="flex flex-col items-center justify-center text-center p-4 transition-transform duration-300"
            style={{
              transform: isHovered ? "translateZ(35px)" : "translateZ(0px)",
              transformStyle: "preserve-3d",
            }}
          >
            <span className="font-cormorant font-light text-4xl md:text-5xl text-[#8f5854] font-bold uppercase tracking-wider leading-none">
              {revealValue}
            </span>
          </motion.div>

          {/* Scratch Canvas Overlay */}
          {isClient && (
            <canvas
              ref={canvasRef}
              className={`absolute inset-0 w-full h-full rounded-2xl transition-all duration-500 ${isScratched ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
              style={{
                touchAction: "none",
                transform: isHovered ? "translateZ(15px)" : "translateZ(0px)",
                cursor: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%237A1C2C' stroke-width='2.5' stroke-linecap='round'><line x1='12' y1='5' x2='12' y2='19'></line><line x1='5' y1='12' x2='19' y2='12'></line></svg>") 12 12, crosshair`
              }}
            />
          )}
        </div>
      </motion.div>

      {/* Subtext below card */}
      <span className="text-[10px] text-[#A36662]/60 tracking-wider uppercase mt-1">
        {isScratched ? "" : subText}
      </span>
    </div>
  );
}

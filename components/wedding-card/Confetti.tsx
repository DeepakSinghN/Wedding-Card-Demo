"use client";

import React, { useEffect, useRef } from "react";

interface ConfettiProps {
  trigger: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  shape: "circle" | "rect" | "triangle";
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  decay: number;
}

const playPopperSound = () => {
  if (typeof window === "undefined") return;
  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextClass) return;

  try {
    // --- Trigger Mobile Haptics ---
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate([150, 80, 150, 80, 200]);
    }

    const ctx = new AudioContextClass();

    // --- 1. Low Pop Thud ---
    const osc = ctx.createOscillator();
    const gainOsc = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 0.08);

    gainOsc.gain.setValueAtTime(0.8, ctx.currentTime);
    gainOsc.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

    osc.connect(gainOsc);
    gainOsc.connect(ctx.destination);

    // --- 2. High Crackle Noise ---
    const bufferSize = ctx.sampleRate * 0.15;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noiseNode = ctx.createBufferSource();
    noiseNode.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 1600;
    filter.Q.value = 1.0;

    const gainNoise = ctx.createGain();
    gainNoise.gain.setValueAtTime(0.35, ctx.currentTime);
    gainNoise.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

    noiseNode.connect(filter);
    filter.connect(gainNoise);
    gainNoise.connect(ctx.destination);

    // Start playback
    osc.start();
    osc.stop(ctx.currentTime + 0.08);

    noiseNode.start();
    noiseNode.stop(ctx.currentTime + 0.15);
  } catch (error) {
    console.warn("Failed to play synthesized popper sound:", error);
  }
};

export default function Confetti({ trigger }: ConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!trigger) return;

    playPopperSound();

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas sizes
    const resizeCanvas = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create particles
    const colors = ["#A36662", "#BF953F", "#FDFAF7", "#E1B2AF", "#7A1C2C", "#D4AF37", "#ba7a76"];
    const shapes: ("circle" | "rect" | "triangle")[] = ["circle", "rect", "triangle"];
    const list: Particle[] = [];

    const createBurst = (originX: number, originY: number, angleRange: [number, number]) => {
      const count = 70;
      for (let i = 0; i < count; i++) {
        // Random angle between range
        const angle = angleRange[0] + Math.random() * (angleRange[1] - angleRange[0]);
        // Random speed
        const speed = 6 + Math.random() * 8;

        list.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 6 + Math.random() * 8,
          color: colors[Math.floor(Math.random() * colors.length)],
          shape: shapes[Math.floor(Math.random() * shapes.length)],
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.25,
          opacity: 1.0,
          decay: 0.002 + Math.random() * 0.003,
        });
      }
    };

    const width = window.innerWidth;
    const height = window.innerHeight;

    // 1. Top-Left corner: shoots inwards and downwards
    createBurst(-20, -20, [0, Math.PI / 4]);
    // 2. Top-Right corner: shoots inwards and downwards
    createBurst(width + 20, -20, [Math.PI * 3 / 4, Math.PI]);
    // 3. Bottom-Left corner: shoots inwards and upwards
    createBurst(-20, height + 20, [-Math.PI / 2.2, -Math.PI / 8]);
    // 4. Bottom-Right corner: shoots inwards and upwards
    createBurst(width + 20, height + 20, [-Math.PI * 7 / 8, -Math.PI / 1.8]);

    particlesRef.current = list;

    // Animation loop
    const update = () => {
      const particles = particlesRef.current;
      if (particles.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Apply physics (very slow feather-like drift)
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08; // Super-soft gravity
        p.vx *= 0.982; // Slower drag
        p.vy *= 0.982;
        p.rotation += p.rotationSpeed;
        p.opacity -= p.decay;

        if (p.opacity <= 0 || p.y > window.innerHeight) {
          particles.splice(i, 1);
          continue;
        }

        // Draw particle
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        ctx.beginPath();
        if (p.shape === "circle") {
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === "rect") {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        } else if (p.shape === "triangle") {
          ctx.moveTo(0, -p.size / 2);
          ctx.lineTo(p.size / 2, p.size / 2);
          ctx.lineTo(-p.size / 2, p.size / 2);
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();
      }

      animationFrameRef.current = requestAnimationFrame(update);
    };

    animationFrameRef.current = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [trigger]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999] w-full h-full"
    />
  );
}

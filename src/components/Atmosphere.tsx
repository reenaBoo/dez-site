'use client';

import { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const drift = keyframes`
  0% { transform: translate3d(-4%, -2%, 0) scale(1); }
  50% { transform: translate3d(4%, 3%, 0) scale(1.08); }
  100% { transform: translate3d(-4%, -2%, 0) scale(1); }
`;

const driftSlow = keyframes`
  0% { transform: translate3d(3%, 2%, 0) scale(1.05); }
  50% { transform: translate3d(-3%, -3%, 0) scale(1); }
  100% { transform: translate3d(3%, 2%, 0) scale(1.05); }
`;

const grainShift = keyframes`
  0%, 100% { transform: translate(0, 0); }
  20% { transform: translate(-3%, 2%); }
  40% { transform: translate(2%, -3%); }
  60% { transform: translate(-2%, -2%); }
  80% { transform: translate(3%, 3%); }
`;

const Layer = styled.div`
  position: fixed;
  inset: 0;
  z-index: 500;
  pointer-events: none;
  overflow: hidden;
`;

const Fog = styled.div`
  position: absolute;
  inset: -20%;
  background:
    radial-gradient(42% 34% at 24% 22%, rgba(217, 177, 95, 0.045) 0%, transparent 70%),
    radial-gradient(50% 40% at 78% 68%, rgba(120, 140, 190, 0.05) 0%, transparent 70%);
  animation: ${drift} 46s ease-in-out infinite;
  will-change: transform;
`;

const FogSecond = styled.div`
  position: absolute;
  inset: -20%;
  background:
    radial-gradient(38% 30% at 70% 18%, rgba(217, 177, 95, 0.035) 0%, transparent 70%),
    radial-gradient(45% 36% at 20% 80%, rgba(140, 150, 180, 0.04) 0%, transparent 70%);
  animation: ${driftSlow} 64s ease-in-out infinite;
  will-change: transform;
`;

// шум через SVG feTurbulence, инлайном — без внешних запросов
const GRAIN_URI = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`;

const Grain = styled.div`
  position: absolute;
  inset: -5%;
  background-image: ${GRAIN_URI};
  background-size: 160px 160px;
  opacity: 0.05;
  animation: ${grainShift} 0.9s steps(5) infinite;
`;

const Dust = styled.canvas`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
`;

interface Particle {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  phase: number;
  speed: number;
}

export default function Atmosphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const particles: Particle[] = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      particles.length = 0;
      const count = Math.min(70, Math.floor((width * height) / 26000));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: 0.4 + Math.random() * 1.4,
          vx: -0.06 - Math.random() * 0.12,
          vy: -0.03 - Math.random() * 0.08,
          phase: Math.random() * Math.PI * 2,
          speed: 0.004 + Math.random() * 0.008,
        });
      }
    };

    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.phase += p.speed;
        if (p.x < -4) p.x = width + 4;
        if (p.y < -4) p.y = height + 4;
        const alpha = 0.06 + Math.abs(Math.sin(p.phase)) * 0.2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(226, 205, 160, ${alpha})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    resize();
    seed();
    raf = requestAnimationFrame(tick);

    const onResize = () => {
      resize();
      seed();
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <Layer aria-hidden>
      <Fog/>
      <FogSecond/>
      <Dust ref={canvasRef}/>
      <Grain/>
    </Layer>
  );
}

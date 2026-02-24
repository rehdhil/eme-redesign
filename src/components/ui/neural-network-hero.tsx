'use client';

import { useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

// ===================== ANIMATED GRADIENT BACKGROUND =====================
function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number>(0);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const t = Date.now() * 0.001;

    // Create deep obsidian/cyan gradient background
    const grd = ctx.createLinearGradient(
      w * 0.5 + Math.sin(t * 0.3) * w * 0.3,
      0,
      w * 0.5 + Math.cos(t * 0.2) * w * 0.3,
      h
    );
    grd.addColorStop(0, '#000000');
    grd.addColorStop(0.3, '#020617');
    grd.addColorStop(0.5, '#082f49');
    grd.addColorStop(0.7, '#042f2e');
    grd.addColorStop(1, '#000000');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, w, h);

    // Draw animated neural-net-like nodes and connections
    const nodeCount = 50;
    const nodes: { x: number; y: number; r: number }[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const phase = i * 0.618;
      const x = w * (0.1 + 0.8 * ((Math.sin(t * 0.15 + phase * 3.7) * 0.5 + 0.5)));
      const y = h * (0.1 + 0.8 * ((Math.cos(t * 0.12 + phase * 2.3) * 0.5 + 0.5)));
      const r = 1.5 + Math.sin(t * 0.5 + phase) * 1;
      nodes.push({ x, y, r });
    }

    // Draw connections
    ctx.lineWidth = 0.5;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          const alpha = (1 - dist / 180) * 0.2;
          ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw glowing nodes
    for (const node of nodes) {
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(45, 212, 191, 0.8)';
      ctx.fill();

      // Glow effect
      const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.r * 8);
      glow.addColorStop(0, 'rgba(45, 212, 191, 0.2)');
      glow.addColorStop(1, 'rgba(45, 212, 191, 0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.r * 8, 0, Math.PI * 2);
      ctx.fill();
    }

    // Flowing wave overlay for tech depth
    ctx.globalCompositeOperation = 'lighter';
    for (let wave = 0; wave < 3; wave++) {
      ctx.beginPath();
      ctx.moveTo(0, h);
      for (let x = 0; x <= w; x += 4) {
        const y = h * 0.7 +
          Math.sin(x * 0.002 + t * 0.3 + wave * 1.5) * 50 +
          Math.cos(x * 0.005 + t * 0.5 + wave * 0.9) * 20 +
          wave * 50;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h);
      ctx.closePath();
      ctx.fillStyle = `rgba(34, 211, 238, ${0.015 - wave * 0.004})`;
      ctx.fill();
    }
    ctx.globalCompositeOperation = 'source-over';

    animFrameRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [animate]);

  return (
    <div className="absolute inset-0 -z-10 w-full h-full overflow-hidden bg-black">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
    </div>
  );
}

// ===================== HERO =====================
interface HeroProps {
  title: string;
  description: string;
  badgeText?: string;
  badgeLabel?: string;
  ctaButtons?: { text: string; href: string; primary?: boolean }[];
  microDetails?: string[];
}

export default function Hero({
  title,
  description,
  badgeText = "Next-Gen Tech",
  badgeLabel = "New",
  ctaButtons = [
    { text: "View Courses", href: "#courses", primary: true },
    { text: "Career Webinar", href: "#webinar" }
  ],
  microDetails = ["Expert Mentors", "Real-time Projects", "Job Oriented"]
}: HeroProps) {
  const containerVariants: any = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 15 } }
  };

  return (
    <section className="relative h-screen w-screen overflow-hidden flex items-center">
      <AnimatedBackground />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative mx-auto flex w-full max-w-7xl flex-col items-start gap-6 px-6 sm:gap-8 md:px-10 lg:px-16"
      >
        <motion.div variants={itemVariants} className="inline-flex items-center gap-3 rounded-full border border-teal-500/20 bg-teal-500/10 px-4 py-2 backdrop-blur-md">
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-cyan-400">{badgeLabel}</span>
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
          <span className="text-xs font-medium tracking-wide text-teal-50">{badgeText}</span>
        </motion.div>

        <motion.h1 variants={itemVariants} className="max-w-4xl text-left text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
          {title.split('SAP Training').map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">
                  SAP Training
                </span>
              )}
            </span>
          ))}
        </motion.h1>

        <motion.p variants={itemVariants} className="max-w-2xl text-left text-base font-light leading-relaxed tracking-wide text-slate-300 sm:text-lg md:text-xl">
          {description}
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 pt-4">
          {ctaButtons.map((button, index) => (
            <a
              key={index}
              href={button.href}
              className={`rounded-full px-8 py-4 text-sm font-semibold tracking-wide transition-all duration-300 ${button.primary
                ? "bg-cyan-500 text-black shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:scale-105"
                : "border border-slate-600 bg-black/50 text-white backdrop-blur-md hover:border-slate-400 hover:bg-white/10"
                }`}
            >
              {button.text}
            </a>
          ))}
        </motion.div>

        <motion.ul variants={itemVariants} className="mt-12 flex flex-wrap gap-8 text-sm font-medium tracking-wide text-slate-400">
          {microDetails.map((detail, index) => (
            <li key={index} className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-500" /> {detail}
            </li>
          ))}
        </motion.ul>
      </motion.div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
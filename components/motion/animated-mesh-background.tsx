"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface AnimatedMeshBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  dotColor?: string;
  lineColor?: string;
  dotRadius?: number;
  lineWidth?: number;
  connectionDistance?: number;
  dotCount?: number;
  speed?: number;
}

interface Dot {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export function AnimatedMeshBackground({
  children,
  className = "",
  dotColor = "rgba(255, 255, 255, 0.4)",
  lineColor = "rgba(255, 255, 255, 0.15)",
  dotRadius = 1.5,
  lineWidth = 0.5,
  connectionDistance = 120,
  dotCount = 80,
  speed = 0.15,
}: AnimatedMeshBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number>();
  const dotsRef = useRef<Dot[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;
    let isAnimating = false;

    const getSize = () => {
      const rect = container.getBoundingClientRect();
      return { width: rect.width, height: rect.height };
    };

    const resize = () => {
      const size = getSize();
      if (size.width === 0 || size.height === 0) return;

      width = size.width;
      height = size.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    const initDots = () => {
      const size = getSize();
      if (size.width === 0 || size.height === 0) return;

      dotsRef.current = Array.from({ length: dotCount }, () => {
        const angle = Math.random() * Math.PI * 2;
        const vel = (Math.random() * 0.5 + 0.5) * speed;
        return {
          x: Math.random() * size.width,
          y: Math.random() * size.height,
          vx: Math.cos(angle) * vel,
          vy: Math.sin(angle) * vel,
        };
      });
    };

    const animate = () => {
      if (!isAnimating) return;

      if (width === 0 || height === 0) {
        animationIdRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, width, height);
      const dots = dotsRef.current;

      // Update and draw dots
      for (const dot of dots) {
        dot.x += dot.vx;
        dot.y += dot.vy;

        // Wrap around edges
        if (dot.x < 0) dot.x = width;
        if (dot.x > width) dot.x = 0;
        if (dot.y < 0) dot.y = height;
        if (dot.y > height) dot.y = 0;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dotRadius, 0, Math.PI * 2);
        ctx.fillStyle = dotColor;
        ctx.fill();
      }

      // Draw connections
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const opacity = Math.pow(1 - dist / connectionDistance, 2);
            const rgba = lineColor.match(/rgba?\(([^)]+)\)/);
            if (rgba) {
              const values = rgba[1].split(",").map((v) => v.trim());
              const baseOpacity = parseFloat(values[3] || "1");
              ctx.strokeStyle = `rgba(${values[0]}, ${values[1]}, ${
                values[2]
              }, ${baseOpacity * opacity})`;
            } else {
              ctx.strokeStyle = lineColor;
            }
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.lineWidth = lineWidth;
            ctx.stroke();
          }
        }
      }

      animationIdRef.current = requestAnimationFrame(animate);
    };

    const start = () => {
      resize();
      if (width > 0 && height > 0) {
        initDots();
        isAnimating = true;
        animate();
      }
    };

    // Initialize after container is rendered
    const timeoutId = setTimeout(() => {
      start();
    }, 0);

    // Handle resize
    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(container);

    return () => {
      clearTimeout(timeoutId);
      resizeObserver.disconnect();
      isAnimating = false;
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [
    prefersReducedMotion,
    dotColor,
    lineColor,
    dotRadius,
    lineWidth,
    connectionDistance,
    dotCount,
    speed,
  ]);

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <motion.canvas
        ref={canvasRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: "none", zIndex: 0 }}
        aria-hidden="true"
      />
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}

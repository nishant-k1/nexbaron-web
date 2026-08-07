"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

export interface ProcessTimelineStep {
  number: string;
  title: string;
  description: string;
  href?: string;
}

interface ProcessTimelineProps {
  steps: ProcessTimelineStep[];
}

export function ProcessTimeline({ steps }: ProcessTimelineProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [dotY, setDotY] = useState(0);

  const updateDotPosition = useCallback((index: number) => {
    const el = stepRefs.current[index];
    if (el && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const stepRect = el.getBoundingClientRect();
      // Position at the circle's center (circle is h-11 = 44px)
      const circleCenter = stepRect.top - containerRect.top + 22;
      setDotY(circleCenter);
    }
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry closest to center of viewport (highest ratio)
        let bestIdx = -1;
        let bestRatio = 0;

        entries.forEach((entry) => {
          const idx = stepRefs.current.findIndex((el) => el === entry.target);
          if (idx === -1) return;

          if (entry.isIntersecting && entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio;
            bestIdx = idx;
          }
        });

        if (bestIdx !== activeIndex && bestIdx >= 0) {
          setActiveIndex(bestIdx);
          updateDotPosition(bestIdx);
        }
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: "-20% 0px -20% 0px",
      },
    );

    stepRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [prefersReducedMotion, updateDotPosition, activeIndex]);

  return (
    <div ref={containerRef} className="relative max-w-4xl mx-auto">
      {/* Rail */}
      <div
        aria-hidden
        className="absolute top-2 bottom-2 left-[22px] md:left-1/2 md:-translate-x-1/2 w-px"
      >
        {/* Background line */}
        <div className="absolute inset-0 bg-white/10" />
        {/* Travel dot */}
        {!prefersReducedMotion && activeIndex >= 0 && (
          <motion.span
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-teal-400 shadow-[0_0_16px_rgba(45,212,191,0.8)] z-10"
            animate={{ top: dotY }}
            transition={{ type: "spring", stiffness: 70, damping: 14 }}
          />
        )}
      </div>

      <ol className="relative space-y-10">
        {steps.map((step, index) => {
          const isEven = index % 2 === 0;
          const isActive = index === activeIndex;
          const isPast = index < activeIndex;
          return (
            <li
              key={step.number}
              ref={(el) => {
                stepRefs.current[index] = el;
              }}
              className="relative pl-14 md:pl-0 md:grid md:grid-cols-2 md:gap-20"
            >
              {/* Node circle */}
              <div
                aria-hidden
                className="absolute left-[22px] top-0 md:left-1/2 md:-translate-x-1/2 h-11 -translate-x-1/2 z-20"
              >
                <div
                  className={`h-full min-w-[2.75rem] px-2 rounded-full flex items-center justify-center font-mono font-bold text-xs whitespace-nowrap transition-all duration-500 border ${
                    isActive
                      ? "bg-teal-500/20 border-teal-400 text-teal-300 shadow-[0_0_20px_rgba(45,212,191,0.4)] scale-110"
                      : isPast
                        ? "bg-teal-500/10 border-teal-500/40 text-teal-400"
                        : "bg-slate-950 border-white/10 text-slate-500"
                  }`}
                >
                  {step.number}
                </div>
              </div>

              {/* Card */}
              <motion.div
                className={
                  isEven ? "md:col-start-1 md:pr-0 md:text-right" : "md:col-start-2 md:pl-0"
                }
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              >
                {step.href ? (
                  <Link
                    href={step.href}
                    className="block p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-teal-500/40 hover:bg-white/[0.06] transition-all duration-300 backdrop-blur-md h-full group"
                  >
                    <h3 className="text-lg font-heading font-semibold text-white mb-2 flex items-center gap-2 justify-start md:justify-end">
                      {step.title}
                      <span
                        aria-hidden
                        className="text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                      >
                        →
                      </span>
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">{step.description}</p>
                  </Link>
                ) : (
                  <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-teal-500/40 transition-all duration-300 backdrop-blur-md h-full">
                    <h3 className="text-lg font-heading font-semibold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">{step.description}</p>
                  </div>
                )}
              </motion.div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

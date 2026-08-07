"use client";

import { motion, useScroll } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  useEffect(() => {
    if (prefersReducedMotion) return;
    const unsubscribe = scrollYProgress.on("change", (progress) => {
      const stepCount = steps.length;
      const rawIndex = Math.floor(progress * stepCount);
      const clamped = Math.min(rawIndex, stepCount - 1);
      setActiveIndex(clamped);

      // Calculate dot Y position relative to active step
      const activeEl = stepRefs.current[clamped];
      if (activeEl && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const stepRect = activeEl.getBoundingClientRect();
        const relativeY = stepRect.top - containerRect.top + stepRect.height / 2;
        setDotY(relativeY);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, steps.length, prefersReducedMotion]);

  return (
    <div ref={containerRef} className="relative max-w-4xl mx-auto">
      {/* Rail */}
      <div
        aria-hidden
        className="absolute top-2 bottom-2 left-[22px] md:left-1/2 md:-translate-x-1/2 w-px"
      >
        {/* Background line */}
        <div className="absolute inset-0 bg-white/10" />
        {/* Active progress line */}
        {!prefersReducedMotion && (
          <motion.div
            className="absolute top-0 left-0 right-0 bg-gradient-to-b from-teal-400 to-amber-400"
            style={{
              height: `${((activeIndex + 1) / steps.length) * 100}%`,
              transition: "height 0.5s ease-out",
            }}
          />
        )}
        {/* Travel dot */}
        {!prefersReducedMotion && activeIndex >= 0 && (
          <motion.span
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-teal-400 shadow-[0_0_16px_rgba(45,212,191,0.8)] z-10"
            animate={{ top: dotY }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
          />
        )}
      </div>

      <ol className="relative space-y-10">
        {steps.map((step, index) => {
          const isEven = index % 2 === 0;
          const isActive = index === activeIndex;
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
                  className={`h-full min-w-[2.75rem] px-2 rounded-full flex items-center justify-center font-mono font-bold text-xs whitespace-nowrap transition-all duration-500 ${
                    isActive
                      ? "bg-teal-500/20 border-teal-400 text-teal-300 border shadow-[0_0_20px_rgba(45,212,191,0.4)]"
                      : "bg-slate-950 border border-teal-500/40 text-teal-400 shadow-lg shadow-teal-500/20"
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
                viewport={{ once: true, margin: "-100px" }}
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

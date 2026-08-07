import Link from "next/link";

import { SectionReveal } from "@/components/motion/section-reveal";

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
  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Rail with animated flow line */}
      <div
        aria-hidden
        className="absolute top-2 bottom-2 left-[22px] md:left-1/2 md:-translate-x-1/2 w-px"
      >
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1 100">
          <line
            x1="0.5"
            y1="0"
            x2="0.5"
            y2="100"
            className="process-flow-line"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <span className="process-travel-dot absolute left-1/2 -translate-x-1/2 -mt-[3px] w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_12px_rgba(45,212,191,0.9)]" />
      </div>

      <ol className="relative space-y-10">
        {steps.map((step, index) => {
          const isEven = index % 2 === 0;
          return (
            <SectionReveal key={step.number}>
              <li className="relative pl-14 md:pl-0 md:grid md:grid-cols-2 md:gap-20">
                {/* Node dot */}
                <div
                  aria-hidden
                  className="absolute left-[22px] top-0 md:left-1/2 md:-translate-x-1/2 h-11 -translate-x-1/2"
                >
                  <div className="h-full min-w-[2.75rem] px-2 rounded-full bg-slate-950 border border-teal-500/40 flex items-center justify-center text-teal-400 font-mono font-bold text-xs shadow-lg shadow-teal-500/20 whitespace-nowrap">
                    {step.number}
                  </div>
                </div>

                {/* Card */}
                <div
                  className={
                    isEven ? "md:col-start-1 md:pr-0 md:text-right" : "md:col-start-2 md:pl-0"
                  }
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
                </div>
              </li>
            </SectionReveal>
          );
        })}
      </ol>
    </div>
  );
}

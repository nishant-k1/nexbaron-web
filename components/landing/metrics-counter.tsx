"use client";

import { motion, useInView } from "framer-motion";
import { Building2, ShieldCheck, Award, Globe2 } from "lucide-react";
import { useRef, useEffect, useState } from "react";

interface MetricItem {
  id: string;
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
  description: string;
  icon: React.ElementType;
}

const metrics: MetricItem[] = [
  {
    id: "projects",
    label: "Projects Delivered",
    value: 250,
    suffix: "+",
    description: "High-impact infrastructure deployments across industries",
    icon: Building2,
  },
  {
    id: "compliance",
    label: "Compliance Rating",
    value: 99,
    suffix: ".9%",
    description: "ISO & regulatory standard adherence benchmark",
    icon: ShieldCheck,
  },
  {
    id: "portfolio",
    label: "Portfolio Value",
    prefix: "$",
    value: 1,
    suffix: ".2B+",
    description: "Managed assets and structural engineering contracts",
    icon: Award,
  },
  {
    id: "partners",
    label: "Global Reach",
    value: 18,
    suffix: "+ Regions",
    description: "Multi-national enterprise client partnerships",
    icon: Globe2,
  },
];

function CounterNumber({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000; // ms
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-bold tracking-tight">
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

export function MetricsCounterSection() {
  return (
    <section className="py-20 relative overflow-hidden border-y border-white/10 bg-black/20 backdrop-blur-md">
      <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 via-blue-500/5 to-purple-500/5 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs uppercase tracking-widest text-teal-400 font-semibold px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 inline-block mb-3">
              Proven Track Record
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-semibold text-white">
              Engineering Trust at Scale
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative p-8 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-teal-500/40 transition-all duration-300 shadow-lg hover:shadow-teal-500/10"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 group-hover:scale-110 group-hover:bg-teal-500/20 transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="h-2 w-2 rounded-full bg-teal-400 animate-ping opacity-75" />
                </div>

                <div className="text-4xl md:text-5xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-teal-200 mb-2">
                  <CounterNumber
                    value={metric.value}
                    prefix={metric.prefix}
                    suffix={metric.suffix}
                  />
                </div>

                <h3 className="text-lg font-medium text-white mb-2">{metric.label}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{metric.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

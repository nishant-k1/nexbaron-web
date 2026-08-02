"use client";

import { motion } from "framer-motion";
import { Zap, Cpu, HardHat, Radio, ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { useRevealInView } from "@/hooks/use-reveal-in-view";

interface Sector {
  id: string;
  title: string;
  category: string;
  description: string;
  highlights: string[];
  icon: React.ElementType;
  gradient: string;
  accentColor: string;
  stats: string;
}

const sectors: Sector[] = [
  {
    id: "energy",
    title: "Renewable Energy & Smart Grids",
    category: "Clean Tech & Power",
    description:
      "Next-generation solar farms, grid synchronization, high-voltage distribution networks, and smart energy storage integration.",
    highlights: ["Substation Automation", "Solar & Wind Grid Tie", "HV Energy Storage"],
    icon: Zap,
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    accentColor: "border-amber-500/40 text-amber-400 bg-amber-500/10",
    stats: "450MW+ Capacity",
  },
  {
    id: "automation",
    title: "Industrial Smart Automation",
    category: "Industry 4.0",
    description:
      "SCADA systems, IoT telemetry, real-time automated process monitoring, and custom hardware-software integration.",
    highlights: ["PLC & SCADA Architecture", "Predictive Maintenance", "IoT Sensor Webs"],
    icon: Cpu,
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
    accentColor: "border-cyan-500/40 text-cyan-400 bg-cyan-500/10",
    stats: "99.99% Uptime",
  },
  {
    id: "civil",
    title: "Urban Civil & Infrastructure",
    category: "Heavy Civil Works",
    description:
      "Turnkey structural engineering, bridge & highway engineering compliance, environmental impact assessments, and city works.",
    highlights: ["Structural Audits", "Environmental Compliance", "Mega Project PM"],
    icon: HardHat,
    gradient: "from-teal-500/20 via-emerald-500/10 to-transparent",
    accentColor: "border-teal-500/40 text-teal-400 bg-teal-500/10",
    stats: "120+ Structures",
  },
  {
    id: "telecom",
    title: "Telecom & Mission-Critical Data",
    category: "Digital Connectivity",
    description:
      "Fiber-optic backbone networks, high-density data center power management, fiber rollout, and 5G infrastructure site builds.",
    highlights: ["Fiber Network Deployment", "Data Center Tier III Power", "5G Cell Tower Rigging"],
    icon: Radio,
    gradient: "from-purple-500/20 via-indigo-500/10 to-transparent",
    accentColor: "border-purple-500/40 text-purple-400 bg-purple-500/10",
    stats: "15,000+ Km Optic",
  },
];

export function IndustryShowcaseSection() {
  const [activeSector, setActiveSector] = useState<string>(sectors[0]!.id);
  const heading = useRevealInView<HTMLDivElement>();

  return (
    <section className="py-24 relative overflow-hidden bg-neutral-bg">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.div
              ref={heading.ref}
              initial={{ opacity: 0, x: -20 }}
              animate={heading.inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            >
              <span className="text-xs uppercase tracking-widest text-teal-400 font-semibold px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 inline-flex items-center gap-1.5 mb-3">
                <Sparkles className="w-3.5 h-3.5" /> Sector Expertise
              </span>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-white">
                Multidisciplinary Engineering
              </h2>
            </motion.div>
          </div>
          <p className="text-slate-400 max-w-md text-base leading-relaxed">
            Delivering robust end-to-end infrastructure solutions tailored for complex industrial
            domains and rigorous regulatory environments.
          </p>
        </div>

        {/* Sector Grid / Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {sectors.map((sector) => {
            const Icon = sector.icon;
            const isSelected = activeSector === sector.id;

            return (
              <motion.div
                key={sector.id}
                onMouseEnter={() => setActiveSector(sector.id)}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
                className={`relative cursor-pointer rounded-2xl p-8 transition-all duration-300 border backdrop-blur-md overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? "bg-white/[0.08] border-teal-500/50 shadow-2xl shadow-teal-500/10"
                    : "bg-white/[0.03] border-white/10 hover:border-white/20"
                }`}
              >
                {/* Ambient Card Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-b ${sector.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-3 rounded-xl border ${sector.accentColor}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono text-slate-400 px-2.5 py-1 rounded-md bg-white/5 border border-white/10">
                      {sector.stats}
                    </span>
                  </div>

                  <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider mb-2 block">
                    {sector.category}
                  </span>
                  <h3 className="text-xl font-heading font-semibold text-white mb-3">
                    {sector.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {sector.description}
                  </p>
                </div>

                <div>
                  <div className="space-y-2 mb-6 pt-4 border-t border-white/10">
                    {sector.highlights.map((item, i) => (
                      <div key={i} className="flex items-center text-xs text-slate-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-2" />
                        {item}
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`/industries#${sector.id}`}
                    className="inline-flex items-center text-xs font-medium text-teal-300 hover:text-teal-200 group/link"
                  >
                    Explore Sector
                    <ArrowUpRight className="ml-1 w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

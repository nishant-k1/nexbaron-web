"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ShieldCheck, Wrench, Layers, LineChart, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";

interface ServiceTab {
  id: string;
  tabLabel: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  deliverables: string[];
  ctaLink: string;
}

const servicesData: ServiceTab[] = [
  {
    id: "compliance",
    tabLabel: "Compliance & Safety",
    icon: ShieldCheck,
    title: "Regulatory Compliance & Safety Certification",
    subtitle: "ISO Standard Compliance, Environmental Impact Audits & Safety Clearance",
    description:
      "We ensure every infrastructure asset meets stringent local, national, and international standards. Our compliance framework minimizes legal risk, protects workforce safety, and guarantees audit readiness.",
    features: [
      "ISO 9001, 14001, & 45001 Certification Management",
      "Environmental Impact Assessment (EIA) Reports",
      "Structural Safety & Load-Bearing Clearance",
      "Hazardous Substance & OSHA Compliance Audits",
    ],
    deliverables: [
      "Full Audit Documentation",
      "Regulatory Clearance Certificates",
      "Risk Mitigation Blueprint",
    ],
    ctaLink: "/compliance",
  },
  {
    id: "engineering",
    tabLabel: "Engineering Design",
    icon: Wrench,
    title: "Advanced Structural & Electrical Engineering",
    subtitle: "Precision CAD/BIM Modeling, High-Voltage Systems & Civil Schematics",
    description:
      "Our engineering design team uses state-of-the-art 3D modeling and stress simulation to craft resilient infrastructure blueprints that optimize material cost while exceeding technical specifications.",
    features: [
      "Building Information Modeling (BIM Level 2/3)",
      "High-Voltage Substation Schematics & Grid Integration",
      "Seismic & Thermal Load Stress Simulation",
      "MEP (Mechanical, Electrical, Plumbing) System Architecture",
    ],
    deliverables: [
      "3D BIM CAD Models",
      "Load Simulation Reports",
      "Stamped Engineering Blueprints",
    ],
    ctaLink: "/services#engineering",
  },
  {
    id: "management",
    tabLabel: "Turnkey PMO",
    icon: Layers,
    title: "End-to-End Turnkey Project Execution",
    subtitle: "Milestone-Based Project Management, Procurement & On-Site Rigging",
    description:
      "From site survey to commissioning, Nexbaron acts as your single point of accountability. We combine agile PMO practices with rigorous quality control to deliver projects on time and within budget.",
    features: [
      "Real-time PMO Dashboard & Milestone Tracking",
      "Supply Chain & Heavy Equipment Procurement",
      "On-site Quality Assurance & Contractor Supervision",
      "Budget Oversight & Value Engineering",
    ],
    deliverables: ["Turnkey Site Handover", "As-Built Documentation", "Commissioning Sign-off"],
    ctaLink: "/services#project-management",
  },
  {
    id: "consulting",
    tabLabel: "Strategic Advisory",
    icon: LineChart,
    title: "Technical Advisory & Asset Lifecycle Optimization",
    subtitle: "Feasibility Studies, Cost-Benefit Audits & Infrastructure Upgrades",
    description:
      "Navigate complex technology transitions and legacy asset modernization with data-driven strategic advice from industry veterans.",
    features: [
      "Infrastructure Feasibility & Financial Modeling",
      "Legacy Asset Condition & Lifespan Evaluation",
      "Green Energy Transition & Decarbonization Strategy",
      "Disaster Recovery & Redundancy Planning",
    ],
    deliverables: [
      "Feasibility Study Dossier",
      "CAPEX/OPEX Optimization Roadmap",
      "Executive Briefing",
    ],
    ctaLink: "/services#consulting",
  },
];

export function ServicesMatrixSection() {
  const [activeTab, setActiveTab] = useState<string>(servicesData[0]!.id);

  const currentService = servicesData.find((s) => s.id === activeTab) || servicesData[0]!;

  return (
    <section className="py-24 relative overflow-hidden bg-black/30 backdrop-blur-md border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-teal-400 font-semibold px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 inline-block mb-3">
            Core Capabilities
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
            End-to-End Infrastructure Services
          </h2>
          <p className="text-slate-400 text-base">
            Seamlessly integrating compliance, precision engineering, turnkey execution, and
            strategic advisory.
          </p>
        </div>

        {/* Tab Selector Pill Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {servicesData.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 border ${
                  isActive
                    ? "bg-teal-500 text-slate-950 font-semibold border-teal-400 shadow-lg shadow-teal-500/20 scale-105"
                    : "bg-white/[0.04] text-slate-300 border-white/10 hover:bg-white/[0.08] hover:text-white"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-slate-950" : "text-teal-400"}`} />
                {tab.tabLabel}
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentService.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl bg-white/[0.03] border border-white/10 p-8 lg:p-12 backdrop-blur-xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-10 items-center shadow-2xl"
          >
            {/* Ambient Background Gradient */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-wider text-teal-400 font-mono font-semibold">
                {currentService.subtitle}
              </span>
              <h3 className="text-2xl md:text-4xl font-heading font-bold text-white leading-tight">
                {currentService.title}
              </h3>
              <p className="text-slate-300 text-base leading-relaxed">
                {currentService.description}
              </p>

              <div className="pt-4 space-y-3">
                <h4 className="text-xs uppercase font-semibold text-slate-400 tracking-widest">
                  Key Capabilities
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentService.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-200">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 flex flex-col sm:flex-row items-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold px-8"
                >
                  <Link href={currentService.ctaLink}>
                    Explore Service Details
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <Link href="/contact">Schedule Consultation</Link>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5 rounded-2xl bg-white/[0.04] border border-white/10 p-8 space-y-6">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-400" /> Key Deliverables
              </h4>
              <ul className="space-y-4">
                {currentService.deliverables.map((item, idx) => (
                  <li
                    key={idx}
                    className="p-4 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between"
                  >
                    <span className="text-sm font-medium text-slate-200">{item}</span>
                    <span className="text-xs font-mono text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
                      Verified
                    </span>
                  </li>
                ))}
              </ul>
              <div className="pt-2 text-xs text-slate-400 text-center">
                All deliverables backed by Nexbaron ISO-certified Quality Control Protocol.
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

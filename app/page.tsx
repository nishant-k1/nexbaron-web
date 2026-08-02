import { Metadata } from "next";
import { SectionReveal } from "@/components/motion/section-reveal";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Zap, Activity, CheckCircle2, Award } from "lucide-react";
import { MetricsCounterSection } from "@/components/landing/metrics-counter";
import { IndustryShowcaseSection } from "@/components/landing/industry-showcase";
import { ServicesMatrixSection } from "@/components/landing/services-matrix";
import { PartnerTestimonialsSection } from "@/components/landing/partner-testimonials";

export const metadata: Metadata = {
  title: "Nexbaron Services | Leading Infrastructure Solutions & Engineering",
  description:
    "Nexbaron Services Private Limited delivers world-class infrastructure solutions, compliance certification, smart energy grids, and turnkey project management.",
  openGraph: {
    title: "Nexbaron Services Private Limited | Leading Infrastructure Solutions",
    description:
      "World-class infrastructure solutions, smart automation, and compliance certification.",
  },
};

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-36 overflow-hidden">
        {/* Glowing Background Radial Accents */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-teal-500/15 via-blue-600/10 to-purple-600/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionReveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Hero Text Column */}
              <div className="lg:col-span-7 space-y-8 text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-teal-500/30 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                  <span className="text-xs uppercase font-mono tracking-widest text-teal-300 font-semibold">
                    ISO Certified Infrastructure Partner
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white leading-[1.1] tracking-tight">
                  Engineering Next-Gen{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-300 to-blue-400">
                    Infrastructure Solutions
                  </span>
                </h1>

                <p className="text-lg md:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed">
                  Nexbaron Services Private Limited delivers end-to-end engineering excellence, ISO safety compliance, smart grid automation, and mission-critical project execution across industries.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Button
                    asChild
                    size="lg"
                    className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-8 py-6 rounded-xl shadow-lg shadow-teal-500/20 hover:scale-[1.02] transition-all"
                  >
                    <Link href="/services">
                      Explore Capabilities
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 px-8 py-6 rounded-xl backdrop-blur-md"
                  >
                    <Link href="/compliance">Compliance Standards</Link>
                  </Button>
                </div>

                {/* Hero Quick Badges */}
                <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-slate-400 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-400" />
                    <span>ISO 9001 Compliant</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-teal-400" />
                    <span>100% Audit Guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-teal-400" />
                    <span>24/7 PMO Support</span>
                  </div>
                </div>
              </div>

              {/* Right Visual Cyber Card */}
              <div className="lg:col-span-5">
                <div className="relative p-1 rounded-3xl bg-gradient-to-b from-teal-500/30 via-white/10 to-transparent shadow-2xl">
                  <div className="rounded-[22px] bg-slate-950/80 backdrop-blur-2xl p-6 sm:p-8 space-y-6 border border-white/10">
                    
                    <div className="flex items-center justify-between pb-4 border-b border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-teal-500/20 text-teal-400">
                          <Zap className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-white">Live System Operations</h3>
                          <p className="text-xs text-slate-400">Nexbaron PMO Command Center</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                        Active Sync
                      </span>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-300 font-medium">Grid Substation Automation</span>
                          <span className="text-teal-400 font-mono">99.98% Efficiency</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-teal-400 to-cyan-400 w-[96%]" />
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-300 font-medium">Safety Clearance Clearance</span>
                          <span className="text-teal-400 font-mono">Verified (Zero Non-Conformity)</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 w-[100%]" />
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-300 font-medium">Turnkey Asset Handover</span>
                          <span className="text-teal-400 font-mono">On Schedule</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 w-[92%]" />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-teal-400" />
                        <span className="text-slate-200">ISO 14001 & 45001 Framework</span>
                      </div>
                      <span className="text-teal-300 font-mono">100% Compliant</span>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Metrics Section */}
      <MetricsCounterSection />

      {/* Industry Showcase */}
      <IndustryShowcaseSection />

      {/* Services Matrix */}
      <ServicesMatrixSection />

      {/* Partner & Testimonials */}
      <PartnerTestimonialsSection />

      {/* Call to Action Section */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-b from-neutral-bg via-slate-900 to-neutral-bg border-t border-white/10">
        <div className="absolute inset-0 bg-teal-500/5 blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <SectionReveal>
            <div className="max-w-3xl mx-auto space-y-8">
              <span className="text-xs uppercase tracking-widest text-teal-400 font-semibold px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 inline-block">
                Start Your Project
              </span>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-white leading-tight">
                Ready to Build Industry-Leading Infrastructure?
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed">
                Connect with our expert engineering and compliance team today for a tailored technical consultation and project execution blueprint.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-8 py-6 rounded-xl shadow-lg shadow-teal-500/20"
                >
                  <Link href="/contact">
                    Request Technical Proposal
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 px-8 py-6 rounded-xl"
                >
                  <Link href="/projects">Explore Past Projects</Link>
                </Button>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}

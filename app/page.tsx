import {
  Monitor,
  Printer,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Building2,
  Receipt,
  Tag,
} from "lucide-react";
import { type Metadata } from "next";
import Link from "next/link";

import { SectionReveal } from "@/components/motion/section-reveal";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Nexbaron Private Limited | Corporate Portal",
  description:
    "Nexbaron Private Limited operates two independent divisions: Nexbaron Digital (Web, Local SEO, AI Automation) and Nexbaron Print (Visiting Cards, Banners, Office Branding).",
  openGraph: {
    title: "Nexbaron Private Limited | Digital & Print Infrastructure",
    description: "Official corporate gateway for Nexbaron Digital and Nexbaron Print.",
  },
};

export default function CorporateGatewayPage() {
  return (
    <div className="relative pt-32 pb-24 md:pt-40 md:pb-36 overflow-hidden">
      {/* Background Ambient Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-teal-500/10 via-slate-800/20 to-amber-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md">
            <Building2 className="w-4 h-4 text-teal-400" />
            <span className="text-xs uppercase font-mono tracking-widest text-slate-300 font-semibold">
              Nexbaron Private Limited
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white leading-tight">
            One Enterprise. Two Autonomous{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-300 to-amber-400">
              Divisions.
            </span>
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            Select your destination below to access dedicated commercial services, pricing, and
            project consultation tailored to your exact business needs.
          </p>
        </div>

        {/* Dual Division Split Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {/* Nexbaron Digital Card */}
          <SectionReveal>
            <div className="group relative rounded-3xl p-8 sm:p-12 bg-slate-950/80 border border-teal-500/30 hover:border-teal-400/60 transition-all duration-300 backdrop-blur-2xl shadow-2xl hover:shadow-teal-500/10 flex flex-col justify-between h-full overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-teal-500/20 transition-all" />

              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-400">
                    <Monitor className="w-8 h-8" />
                  </div>
                  <span className="text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20">
                    Division 01
                  </span>
                </div>

                <span className="text-xs font-mono font-semibold text-teal-400 uppercase tracking-widest mb-2 block">
                  Web • Local SEO • AI & CRM
                </span>
                <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-4">
                  Nexbaron Digital
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed mb-8">
                  The complete digital growth partner for small businesses, clinics, restaurants,
                  law firms, CA practices, gyms, and local services. We build high-converting
                  websites, get you found on Google, and answer every customer enquiry on WhatsApp.
                </p>

                <div className="space-y-3 mb-8 border-t border-white/10 pt-6">
                  <div className="flex items-center gap-3 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>Business Websites & Enquiry-Capturing Pages</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>Google Business Profile & Local Visibility</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>WhatsApp Automation That Answers 24/7</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>Hosting, Speed & Security Handled for You</span>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold py-6 rounded-xl shadow-lg shadow-teal-500/20 group-hover:scale-[1.01] transition-transform"
                >
                  <Link href="/digital">
                    Enter Digital Division Portal
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </SectionReveal>

          {/* Nexbaron Print Card */}
          <SectionReveal>
            <div className="group relative rounded-3xl p-8 sm:p-12 bg-slate-950/80 border border-amber-500/30 hover:border-amber-400/60 transition-all duration-300 backdrop-blur-2xl shadow-2xl hover:shadow-amber-500/10 flex flex-col justify-between h-full overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-amber-500/20 transition-all" />

              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                    <Printer className="w-8 h-8" />
                  </div>
                  <span className="text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    Division 02
                  </span>
                </div>

                <span className="text-xs font-mono font-semibold text-amber-400 uppercase tracking-widest mb-2 block">
                  Cards • Stationery • Commercial Print
                </span>
                <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-4">
                  Nexbaron Print
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed mb-8">
                  Premium commercial print specialist. We produce visiting cards, card holders,
                  letterheads & envelopes, pamphlets & posters, bill books, tags, files, stickers &
                  labels, and branded promotional merchandise.
                </p>

                <div className="space-y-3 mb-8 border-t border-white/10 pt-6">
                  <div className="flex items-center gap-3 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Premium Visiting Cards & Card Holders</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Letterheads, Envelopes & Bill Books</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Pamphlets, Posters, Tags & Labels</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Branded Pens, ATM Pouches & More</span>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-6 rounded-xl shadow-lg shadow-amber-500/20 group-hover:scale-[1.01] transition-transform"
                >
                  <Link href="/print">
                    Enter Print Division Portal
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </SectionReveal>
        </div>

        {/* Corporate Legitimacy Strip */}
        <div className="border-t border-white/10 pt-12 text-center">
          <p className="text-xs uppercase font-mono tracking-widest text-slate-400 mb-6">
            Nexbaron Private Limited — Registered & GST-Compliant
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-3">
              <Building2 className="w-5 h-5 text-teal-400 shrink-0" />
              <div>
                <div className="text-xs font-semibold text-white">GSTIN-Registered</div>
                <div className="text-[10px] text-slate-400">Nexbaron Private Limited</div>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-3">
              <Receipt className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <div className="text-xs font-semibold text-white">GST Invoice</div>
                <div className="text-[10px] text-slate-400">On every payment</div>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-3">
              <Tag className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <div className="text-xs font-semibold text-white">Fixed Pricing</div>
                <div className="text-[10px] text-slate-400">Published, no hidden costs</div>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <div className="text-xs font-semibold text-white">You Own It</div>
                <div className="text-[10px] text-slate-400">
                  Website, domain & content — always yours
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

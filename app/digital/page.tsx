import {
  Monitor,
  Search,
  MessageSquare,
  Zap,
  ArrowRight,
  Building,
  Utensils,
  Stethoscope,
  Scale,
  Dumbbell,
  Briefcase,
} from "lucide-react";
import { type Metadata } from "next";
import Link from "next/link";

import { SectionReveal } from "@/components/motion/section-reveal";
import { Button } from "@/components/ui/button";
import { buildWhatsAppLink } from "@/lib/divisions";
import { divisionOpenGraph, divisionTwitter } from "@/lib/og";

export const metadata: Metadata = {
  title: "Nexbaron Digital | Business Websites, Local SEO & AI WhatsApp Automation",
  description:
    "Grow your business with Nexbaron Digital. High-converting websites, #1 Google Business Profile local SEO, WhatsApp CRM, AI Chatbots, and speed optimization for clinics, restaurants, law firms, and SMEs.",
  openGraph: {
    type: "website",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://nexbaron.com"}/digital`,
    title: "Nexbaron Digital | Web, Local SEO & AI Automation",
    description: "Digital growth engine for SMEs and local service businesses.",
    ...divisionOpenGraph("digital"),
  },
  twitter: {
    title: "Nexbaron Digital | Web, Local SEO & AI Automation",
    description: "Digital growth engine for SMEs and local service businesses.",
    ...divisionTwitter("digital"),
  },
};

const digitalServices = [
  {
    icon: Monitor,
    title: "Business Websites & Landing Pages",
    desc: "Custom ultra-fast Next.js websites engineered for maximum conversions and mobile responsiveness.",
    tags: ["Next.js 14", "Mobile Optimized", "High Speed"],
  },
  {
    icon: Search,
    title: "Google Business Profile & Local SEO",
    desc: "Rank in the Google 3-Pack for local searches in your city. Drive inbound phone calls and map visits.",
    tags: ["Google Maps #1", "Review Automation", "Keyword Strategy"],
  },
  {
    icon: MessageSquare,
    title: "WhatsApp CRM & AI Chatbots",
    desc: "Automatically capture leads 24/7, answer customer FAQs, and schedule appointments directly on WhatsApp.",
    tags: ["24/7 Auto-Reply", "Lead Notification", "CRM Sync"],
  },
  {
    icon: Zap,
    title: "Managed Hosting & Speed Optimization",
    desc: "99.9% uptime guaranteed, SSL security, automated daily backups, and sub-second page loading speed.",
    tags: ["Sub-Second Load", "SSL & Daily Backups", "Managed Maintenance"],
  },
];

const targetIndustries = [
  { icon: Stethoscope, name: "Clinics & Doctors", detail: "Online appointments & local map rank" },
  {
    icon: Utensils,
    name: "Restaurants & Cafes",
    detail: "Digital menu, table booking & Google reviews",
  },
  {
    icon: Scale,
    name: "Law & CA Firms",
    detail: "High-trust professional website & client portal",
  },
  {
    icon: Dumbbell,
    name: "Salons, Spas & Gyms",
    detail: "Membership booking & WhatsApp reminders",
  },
  { icon: Building, name: "Real Estate & Builders", detail: "Property landing pages & lead CRM" },
  {
    icon: Briefcase,
    name: "Startups & SMEs",
    detail: "Turnkey digital footprint & launch package",
  },
];

export default function DigitalLandingPage() {
  return (
    <div className="relative pt-32 pb-24 md:pt-40 md:pb-36 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-teal-500/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Digital Hero */}
        <SectionReveal>
          <div className="max-w-4xl mx-auto text-center space-y-8 mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/30 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
              <span className="text-xs uppercase font-mono tracking-widest text-teal-300 font-semibold">
                Nexbaron Digital Engine
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white leading-tight">
              We Build High-Converting{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-300 to-blue-400">
                Websites & Local SEO
              </span>{" "}
              for Growing Businesses
            </h1>

            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Transform your local business into a 24/7 lead machine. From high-speed custom
              websites and Google Business Profile optimization to instant WhatsApp AI chatbots.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Button
                asChild
                size="lg"
                className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-8 py-6 rounded-xl shadow-lg shadow-teal-500/20"
              >
                <a
                  href={buildWhatsAppLink(
                    "digital",
                    "Hi Nexbaron Digital, I want a free growth audit",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <MessageSquare className="w-5 h-5" />
                  Instant WhatsApp Growth Audit
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 px-8 py-6 rounded-xl backdrop-blur-md"
              >
                <Link href="#services">Explore Digital Services</Link>
              </Button>
            </div>

            {/* Quick Metrics */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 text-center max-w-3xl mx-auto">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-2xl font-bold text-teal-400 font-mono">150+</div>
                <div className="text-xs text-slate-400">Websites Launched</div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-2xl font-bold text-cyan-400 font-mono">#1</div>
                <div className="text-xs text-slate-400">Google Map Rankings</div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-2xl font-bold text-teal-300 font-mono">24/7</div>
                <div className="text-xs text-slate-400">WhatsApp AI Support</div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-2xl font-bold text-emerald-400 font-mono">99.9%</div>
                <div className="text-xs text-slate-400">Uptime SLA</div>
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* Services Grid */}
        <section id="services" className="py-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-mono tracking-widest text-teal-400 font-semibold px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 inline-block mb-3">
              Core Capabilities
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
              End-to-End Digital Solutions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {digitalServices.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-teal-500/40 transition-all duration-300 backdrop-blur-md hover:bg-white/[0.06] group"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex gap-2">
                      {service.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-white/5 border border-white/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <h3 className="text-xl font-heading font-semibold text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed mb-6">{service.desc}</p>

                  <a
                    href={buildWhatsAppLink(
                      "digital",
                      "Hi Nexbaron Digital, I want to inquire about this service",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs font-semibold text-teal-400 hover:text-teal-300"
                  >
                    Inquire About Service <ArrowRight className="ml-1 w-4 h-4" />
                  </a>
                </div>
              );
            })}
          </div>
        </section>

        {/* Tailored Industries */}
        <section className="py-16 border-t border-white/10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-mono tracking-widest text-teal-400 font-semibold px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 inline-block mb-3">
              Industry Tailored
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
              Built for Your Specific Industry
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {targetIndustries.map((ind, idx) => {
              const Icon = ind.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-white/[0.02] border border-white/10 hover:border-teal-500/30 transition-all flex items-start gap-4"
                >
                  <div className="p-3 rounded-lg bg-teal-500/10 text-teal-400 shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white mb-1">{ind.name}</h3>
                    <p className="text-xs text-slate-400">{ind.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="mt-16 p-10 rounded-3xl bg-gradient-to-r from-teal-500/20 via-cyan-500/10 to-slate-950 border border-teal-500/30 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-heading font-bold text-white">
              Ready to Outrank Competitors Online?
            </h2>
            <p className="text-sm text-slate-300">
              Get a free video audit of your current Google ranking and website conversion speed
              within 2 hours.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-8"
            >
              <a
                href={buildWhatsAppLink("digital", "Hi Nexbaron Digital, send me a free audit")}
                target="_blank"
                rel="noopener noreferrer"
              >
                Claim Free Audit via WhatsApp
              </a>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}

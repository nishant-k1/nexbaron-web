import { Globe, Search, MessageSquare, Zap, Users, TrendingUp, Heart, MapPin } from "lucide-react";
import { type Metadata } from "next";

import { SectionReveal } from "@/components/motion/section-reveal";
import { CTABanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { divisionOpenGraph, divisionTwitter } from "@/lib/og";

export const metadata: Metadata = {
  title: "About Us | Nexbaron Digital",
  description:
    "Nexbaron Digital helps local businesses get found on Google, answered on WhatsApp, and grow with a website that works. Fixed-price plans, no lock-in.",
  openGraph: {
    title: "About Nexbaron Digital",
    description: "Websites, SEO, and WhatsApp growth for local businesses.",
    ...divisionOpenGraph("digital"),
  },
  twitter: divisionTwitter("digital"),
};

const values = [
  {
    icon: Globe,
    title: "Get Found Online",
    description:
      "We build websites and SEO strategies that put your business on the map — literally. Google Business Profile, local search, and everything between.",
  },
  {
    icon: MessageSquare,
    title: "Answer Every Customer",
    description:
      "WhatsApp Business integration that lets you respond instantly, send catalogues, and never miss a lead — even when you're busy.",
  },
  {
    icon: Zap,
    title: "Launch on a Confirmed Date",
    description:
      "We tell you your exact go-live date before you pay. No vague timelines, no endless waiting — just a website live when we said it would be.",
  },
  {
    icon: Users,
    title: "Built for Indian Businesses",
    description:
      "Clinics, restaurants, CA firms, salons, builders — we understand how local businesses work and what they actually need to grow.",
  },
  {
    icon: TrendingUp,
    title: "Fixed Price, No Surprises",
    description:
      "Three clear plans. One upfront price. Monthly maintenance that keeps everything running. No hidden fees, no lock-in contracts.",
  },
  {
    icon: Search,
    title: "Real Results, Not Vanity Metrics",
    description:
      "We track what matters — calls, WhatsApp messages, form submissions, and walk-ins. Not just traffic numbers that look good on a report.",
  },
];

export default function DigitalAboutPage() {
  return (
    <div className="relative overflow-hidden">
      <PageHero
        accent="digital"
        eyebrow="About Us"
        title="About Nexbaron"
        highlight="Digital"
        description="We help local businesses grow online with websites that rank on Google, WhatsApp that answers every customer, and fixed-price plans with zero surprises."
      />

      {/* Mission */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
                Why We Started Nexbaron Digital
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed mb-4">
                Most small businesses in India know they need to be online. But between confusing
                agencies, hidden costs, and websites that take months to launch — it feels
                impossible to get started.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                We built Nexbaron Digital to change that. Fixed-price plans. A confirmed launch date
                before you pay. And a team that actually answers when you call. Because growing your
                business online shouldn&apos;t be complicated.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Meet the Humans */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4 text-center">
              The People Behind the Pixels
            </h2>
            <p className="text-slate-400 text-center max-w-xl mx-auto mb-12">
              We&apos;re a small, hands-on team. When you work with Nexbaron, you work directly with
              the people building your digital presence — no account managers, no handoffs.
            </p>

            {/* Team & Workspace Vibe */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {[
                {
                  initials: "ST",
                  name: "Small Team, Big Impact",
                  desc: "Every project is built by 2–3 people who know your business by name. No assembly line. No faceless agency.",
                  icon: Users,
                },
                {
                  initials: "BL",
                  name: "Based in Bengaluru",
                  desc: `Flat No. 402, Vasavi Residency - 1, Green House Layout, Doddathoguru, Electronic City Phase - 1, Bengaluru - 560100\n+91 90027 85683`,
                  icon: MapPin,
                },
                {
                  initials: "MV",
                  name: "Our Mission",
                  desc: "Make getting online as simple as ordering chai. Fixed price, confirmed date, real results — every single time.",
                  icon: Heart,
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.name}
                    className="p-6 rounded-xl bg-white/[0.03] border border-white/10 hover:border-teal-500/30 transition-all text-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-teal-500/10 border border-teal-500/30 mx-auto mb-3 flex items-center justify-center">
                      <span className="text-sm font-bold text-teal-400">{item.initials}</span>
                    </div>
                    <div className="flex items-center justify-center gap-1.5 mb-2">
                      <Icon className="w-4 h-4 text-teal-400" />
                      <h3 className="text-sm font-semibold text-white">{item.name}</h3>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed whitespace-pre-line">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* What we believe */}
      <section className="py-16 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-12 text-center">
              What We Believe
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <div
                    key={value.title}
                    className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-teal-500/30 transition-colors"
                  >
                    <div className="p-2.5 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400 w-fit mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-heading font-bold text-white mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </SectionReveal>
        </div>
      </section>

      <CTABanner
        accent="digital"
        title="Ready to grow your business online?"
        description="Tell us about your business and we'll recommend the right plan — same day."
        ctaLabel="Get in Touch"
        href="/digital/contact"
      />
    </div>
  );
}

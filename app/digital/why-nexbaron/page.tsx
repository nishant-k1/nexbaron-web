import { Clock, Rocket, ShieldCheck, Sparkles, Users, Zap, MessageSquare } from "lucide-react";
import { type Metadata } from "next";

import { SectionReveal } from "@/components/motion/section-reveal";
import { CTABanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { divisionOpenGraph, divisionTwitter } from "@/lib/og";

export const metadata: Metadata = {
  title: "Why Nexbaron | Nexbaron Digital",
  description:
    "Fixed pricing, no hidden charges, no lock-in, fast delivery, and one partner for everything — digital presence, SEO, GBP, social, and automation.",
  alternates: { canonical: "/digital/why-nexbaron" },
  openGraph: {
    title: "Why Nexbaron | Nexbaron Digital",
    description: "Fixed pricing, no hidden charges, no lock-in, fast delivery.",
    ...divisionOpenGraph("digital"),
  },
  twitter: divisionTwitter("digital"),
};

const reasons = [
  {
    icon: Clock,
    title: "Fixed Pricing",
    description:
      "Every plan has a published price. What you see is what you pay. No hourly billing, no surprise invoices.",
  },
  {
    icon: ShieldCheck,
    title: "No Hidden Charges",
    description:
      "Hosting, SSL, updates, and backups are included. There are no surprise fees — ever.",
  },
  {
    icon: Zap,
    title: "No Lock-in",
    description:
      "Cancel anytime with 30 days' notice. You keep your digital presence, your domain, and your content. Always.",
  },
  {
    icon: Rocket,
    title: "Fast Delivery",
    description:
      "A launch date that's actually confirmed. We work to get you live in about a week because we know your time is your business.",
  },
  {
    icon: Users,
    title: "One Partner for Everything",
    description:
      "Digital presence, SEO, Google Business Profile, social media, and automation — all from one team. No juggling five vendors.",
  },
  {
    icon: Sparkles,
    title: "AI-assisted Workflow",
    description:
      "We use AI to speed up content creation, design, and analysis — so you get more value, faster.",
  },
  {
    icon: MessageSquare,
    title: "Transparent Communication",
    description:
      "One dedicated contact. One WhatsApp thread. Plain English, always. No jargon, no bouncing around.",
  },
];

export default function WhyNexbaronPage() {
  return (
    <div className="relative">
      <PageHero
        accent="digital"
        eyebrow="Why Nexbaron"
        title="We Do Things Differently."
        highlight="No Surprises."
        description="Fixed pricing, no lock-in, and one partner for everything your business needs online. That's it."
        primaryCta={{ label: "See Pricing", href: "/digital/pricing" }}
        secondaryCta={{ label: "Talk to Us", href: "/digital/contact" }}
      />

      <section className="min-h-screen flex items-center justify-center py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reasons.map((reason) => {
              const Icon = reason.icon;
              return (
                <SectionReveal key={reason.title}>
                  <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-teal-500/40 transition-all duration-300 backdrop-blur-md hover:bg-white/[0.06]">
                    <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400 w-fit mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-heading font-semibold text-white mb-3">
                      {reason.title}
                    </h3>
                    <p className="text-sm text-slate-200 leading-relaxed">{reason.description}</p>
                  </div>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>

      <CTABanner
        accent="digital"
        title="Ready to see the difference?"
        description="Pick a plan and experience what fixed-price, no-lock-in digital growth feels like."
        ctaLabel="See Pricing"
        href="/digital/pricing"
      />
    </div>
  );
}

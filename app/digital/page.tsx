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
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { SectionHeading } from "@/components/sections/section-heading";
import { Button } from "@/components/ui/button";
import { buildWhatsAppLink } from "@/lib/divisions";
import { divisionOpenGraph, divisionTwitter } from "@/lib/og";

export const metadata: Metadata = {
  title: "Launch, Growth & Scale Plans | Nexbaron Digital",
  description:
    "Fixed-price growth plans for local businesses: a website that brings customers in, Google visibility, and 24/7 WhatsApp booking. No jargon, no lock-in.",
  openGraph: {
    type: "website",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://nexbaron.com"}/digital`,
    title: "Launch, Growth & Scale Plans",
    description: "Fixed-price plans that turn your business into a 24/7 customer machine.",
    ...divisionOpenGraph("digital"),
  },
  twitter: {
    title: "Launch, Growth & Scale Plans",
    description: "Fixed-price plans that turn your business into a 24/7 customer machine.",
    ...divisionTwitter("digital"),
  },
};

const digitalServices = [
  {
    icon: Monitor,
    title: "A Website That Brings Customers In",
    desc: "A professional website built for your business — opens fast on any phone, explains what you do, and sends every enquiry straight to your WhatsApp.",
    tags: ["Built for You", "Opens Fast", "Mobile Perfect"],
  },
  {
    icon: Search,
    title: "Show Up When People Search Near You",
    desc: "We make your business appear on Google when people search for what you offer — and automatically collect reviews that make you look trusted.",
    tags: ["Google Visibility", "Review System", "Your City"],
  },
  {
    icon: MessageSquare,
    title: "Never Miss Another Customer Message",
    desc: "Customers message you on WhatsApp and get an instant reply, day or night. Appointments get booked and enquiries never slip through.",
    tags: ["24/7 Replies", "Booking", "Every Enquiry Captured"],
  },
  {
    icon: Zap,
    title: "We Keep It Online, Fast & Secure",
    desc: "Hosting, security, backups, and updates — handled for you. Your website stays online and opens fast, always, while you run your business.",
    tags: ["Always Online", "Backups", "No Tech Worries"],
  },
];

const targetIndustries = [
  {
    icon: Stethoscope,
    name: "Clinics & Doctors",
    detail: "More booked appointments, fewer no-shows",
  },
  {
    icon: Utensils,
    name: "Restaurants & Cafes",
    detail: 'Found first by people searching "near me"',
  },
  {
    icon: Scale,
    name: "Law & CA Firms",
    detail: "A credible presence that wins high-trust clients",
  },
  {
    icon: Dumbbell,
    name: "Salons, Spas & Gyms",
    detail: "Fill more slots with self-booking",
  },
  {
    icon: Building,
    name: "Real Estate & Builders",
    detail: "Capture serious buyers and follow up properly",
  },
  {
    icon: Briefcase,
    name: "Startups & SMEs",
    detail: "A professional footprint, launched fast",
  },
];

const steps = [
  {
    number: "1",
    title: "Choose your package",
    description: "Pick Launch, Growth, or Scale. No sales call, no pressure.",
    href: "/digital/pricing",
  },
  {
    number: "2",
    title: "Complete a 10-minute onboarding form",
    description: "Tell us your services, hours, address, and what you want visitors to do.",
    href: "/digital/onboarding",
  },
  {
    number: "3",
    title: "Upload your photos & business details",
    description:
      "Photos, services, and anything you want on your site. No logo yet? We design one for you.",
    href: "/digital/onboarding",
  },
  {
    number: "4",
    title: "Complete payment",
    description:
      "Pay securely with UPI or card. Your GST receipt arrives instantly and your build slot is booked.",
    href: "/digital/onboarding",
  },
  {
    number: "5",
    title: "We start building",
    description:
      "Your digital presence takes shape — designed around how your customers actually search.",
    href: "/digital/why-nexbaron",
  },
  {
    number: "6",
    title: "Review your digital presence",
    description: "See it live, request tweaks, and approve the final version.",
    href: "/digital/solutions",
  },
  {
    number: "7",
    title: "Go live",
    description: "Your digital presence is published — approved by you, on time.",
    href: "/digital/solutions",
  },
  {
    number: "8",
    title: "Monthly growth begins",
    description: "Google visibility, WhatsApp answers, and monthly care keep it working.",
    href: "/digital/results",
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
                Fixed-Price Growth Plans
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white leading-tight">
              Your Business, Found on Google.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-300 to-blue-400">
                Booked on WhatsApp.
              </span>{" "}
              Every Day.
            </h1>

            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              We help restaurants, clinics, salons, law firms, and local shops get more customers —
              a website, Google visibility, and 24/7 WhatsApp booking in one simple plan. Fixed
              price. No jargon. No lock-in.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Button
                asChild
                size="lg"
                className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-8 py-6 rounded-xl shadow-lg shadow-teal-500/20"
              >
                <Link href="/digital/pricing" className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Choose Your Plan
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 px-8 py-6 rounded-xl backdrop-blur-md"
              >
                <Link href="/digital/who-we-help">Who We Help</Link>
              </Button>
            </div>

            {/* Honest commitments */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center max-w-3xl mx-auto">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-2xl font-bold text-teal-400 font-mono">Confirmed date</div>
                <div className="text-xs text-slate-400">Launch by a real calendar date</div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-2xl font-bold text-cyan-400 font-mono">Fixed price</div>
                <div className="text-xs text-slate-400">No hidden costs, no lock-in</div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-2xl font-bold text-teal-300 font-mono">24/7</div>
                <div className="text-xs text-slate-400">Answers customers on WhatsApp</div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-2xl font-bold text-emerald-400 font-mono">GST invoice</div>
                <div className="text-xs text-slate-400">Every payment, proper invoice</div>
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* Services Grid */}
        <section id="services" className="py-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-mono tracking-widest text-teal-400 font-semibold px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 inline-block mb-3">
              What You Get
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
              Everything a Local Business Needs to Grow
            </h2>
            <p className="text-sm text-slate-300 mt-4">
              One plan. One team. All the pieces a local business needs to get found, get contacted,
              and get booked — working together.
            </p>
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
                      "Hi Nexbaron Digital, I want to know how you can help my business grow",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs font-semibold text-teal-400 hover:text-teal-300"
                  >
                    Ask how this works <ArrowRight className="ml-1 w-4 h-4" />
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
              Who We Help
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
              Built for Businesses Like Yours
            </h2>
            <p className="text-sm text-slate-300 mt-4">
              We&apos;ve seen how your customers actually search, call, and book. Every plan is
              built around that.
            </p>
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

        {/* Process Timeline */}
        <section className="py-16 border-t border-white/10">
          <SectionHeading
            accent="digital"
            eyebrow="How It Works"
            title="Eight Steps. No Surprises."
            description="The same journey for every customer, from choosing a package to monthly growth."
          />
          <ProcessTimeline steps={steps} />
          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-8 rounded-xl shadow-lg shadow-teal-500/20"
            >
              <Link
                href="/digital/pricing#plans"
                className="inline-flex items-center justify-center gap-2"
              >
                Choose Your Plan <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="mt-16 p-10 rounded-3xl bg-gradient-to-r from-teal-500/20 via-cyan-500/10 to-slate-950 border border-teal-500/30 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-heading font-bold text-white">
              Pick a Plan & Get a Confirmed Launch Date
            </h2>
            <p className="text-sm text-slate-300">
              See published prices, what&apos;s included, and the exact date you&apos;ll launch. No
              sales call required to get started.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-8"
            >
              <Link href="/digital/pricing">Choose Your Plan</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}

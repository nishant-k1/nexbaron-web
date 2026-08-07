import {
  ArrowRight,
  Building,
  Briefcase,
  Dumbbell,
  MessageSquare,
  Scale,
  Stethoscope,
  Utensils,
} from "lucide-react";
import { type Metadata } from "next";
import Link from "next/link";

import { SectionReveal } from "@/components/motion/section-reveal";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { SectionHeading } from "@/components/sections/section-heading";
import { Button } from "@/components/ui/button";
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

const targetIndustries = [
  {
    icon: Stethoscope,
    name: "Clinics & Doctors",
    preview: `<svg viewBox="0 0 120 80" fill="none" class="w-full"><rect width="120" height="80" rx="6" fill="#0f172a" stroke="#1e293b" stroke-width="1"/><rect x="0" y="0" width="120" height="10" rx="6" fill="#1e293b"/><circle cx="8" cy="5" r="2" fill="#ef4444"/><circle cx="15" cy="5" r="2" fill="#f59e0b"/><circle cx="22" cy="5" r="2" fill="#22c55e"/><rect x="15" y="22" width="90" height="6" rx="2" fill="#2dd4bf" opacity=".3"/><rect x="25" y="36" width="70" height="4" rx="1" fill="#334155"/><rect x="25" y="44" width="50" height="4" rx="1" fill="#334155"/><rect x="25" y="52" width="60" height="4" rx="1" fill="#334155"/><circle cx="58" cy="60" r="12" fill="#2dd4bf" opacity=".15" stroke="#2dd4bf" stroke-width="1.5"/><path d="M54 60h8M58 56v8" stroke="#2dd4bf" stroke-width="2" stroke-linecap="round"/></svg>`,
    detail: "More booked appointments, fewer no-shows",
  },
  {
    icon: Utensils,
    name: "Restaurants & Cafes",
    preview: `<svg viewBox="0 0 120 80" fill="none" class="w-full"><rect width="120" height="80" rx="6" fill="#0f172a" stroke="#1e293b" stroke-width="1"/><rect x="0" y="0" width="120" height="10" rx="6" fill="#1e293b"/><circle cx="8" cy="5" r="2" fill="#ef4444"/><circle cx="15" cy="5" r="2" fill="#f59e0b"/><circle cx="22" cy="5" r="2" fill="#22c55e"/><rect x="15" y="20" width="90" height="7" rx="2" fill="#f59e0b" opacity=".3"/><rect x="25" y="35" width="50" height="4" rx="1" fill="#334155"/><rect x="25" y="43" width="70" height="4" rx="1" fill="#334155"/><circle cx="20" cy="54" r="8" fill="#f59e0b" opacity=".15" stroke="#f59e0b" stroke-width="1.5"/><circle cx="40" cy="54" r="8" fill="#f59e0b" opacity=".15" stroke="#f59e0b" stroke-width="1.5"/><circle cx="60" cy="54" r="8" fill="#f59e0b" opacity=".15" stroke="#f59e0b" stroke-width="1.5"/></svg>`,
    detail: 'Found first by people searching "near me"',
  },
  {
    icon: Scale,
    name: "Law & CA Firms",
    preview: `<svg viewBox="0 0 120 80" fill="none" class="w-full"><rect width="120" height="80" rx="6" fill="#0f172a" stroke="#1e293b" stroke-width="1"/><rect x="0" y="0" width="120" height="10" rx="6" fill="#1e293b"/><circle cx="8" cy="5" r="2" fill="#ef4444"/><circle cx="15" cy="5" r="2" fill="#f59e0b"/><circle cx="22" cy="5" r="2" fill="#22c55e"/><rect x="15" y="22" width="90" height="6" rx="2" fill="#94a3b8" opacity=".25"/><rect x="25" y="36" width="70" height="4" rx="1" fill="#334155"/><rect x="25" y="44" width="60" height="4" rx="1" fill="#334155"/><path d="M50 56L58 48l4 4 8-8" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="50" y1="66" x2="70" y2="66" stroke="#2dd4bf" stroke-width="2" stroke-linecap="round"/></svg>`,
    detail: "A credible presence that wins high-trust clients",
  },
  {
    icon: Dumbbell,
    name: "Salons, Spas & Gyms",
    preview: `<svg viewBox="0 0 120 80" fill="none" class="w-full"><rect width="120" height="80" rx="6" fill="#0f172a" stroke="#1e293b" stroke-width="1"/><rect x="0" y="0" width="120" height="10" rx="6" fill="#1e293b"/><circle cx="8" cy="5" r="2" fill="#ef4444"/><circle cx="15" cy="5" r="2" fill="#f59e0b"/><circle cx="22" cy="5" r="2" fill="#22c55e"/><rect x="15" y="20" width="90" height="7" rx="2" fill="#f59e0b" opacity=".2"/><rect x="25" y="35" width="50" height="4" rx="1" fill="#334155"/><rect x="25" y="43" width="70" height="4" rx="1" fill="#334155"/><circle cx="30" cy="60" r="10" fill="#2dd4bf" opacity=".12"/><path d="M26 56l8 8M34 56l-8 8" stroke="#2dd4bf" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    detail: "Fill more slots with self-booking",
  },
  {
    icon: Building,
    name: "Real Estate & Builders",
    preview: `<svg viewBox="0 0 120 80" fill="none" class="w-full"><rect width="120" height="80" rx="6" fill="#0f172a" stroke="#1e293b" stroke-width="1"/><rect x="0" y="0" width="120" height="10" rx="6" fill="#1e293b"/><circle cx="8" cy="5" r="2" fill="#ef4444"/><circle cx="15" cy="5" r="2" fill="#f59e0b"/><circle cx="22" cy="5" r="2" fill="#22c55e"/><rect x="15" y="22" width="90" height="6" rx="2" fill="#f59e0b" opacity=".25"/><rect x="25" y="36" width="70" height="4" rx="1" fill="#334155"/><rect x="25" y="44" width="50" height="4" rx="1" fill="#334155"/><rect x="30" y="56" width="24" height="18" rx="2" fill="#2dd4bf" opacity=".1" stroke="#2dd4bf" stroke-width="1"/><polygon points="42,56 42,48 54,42 66,48 66,56" fill="none" stroke="#2dd4bf" stroke-width="1" opacity=".5"/></svg>`,
    detail: "Capture serious buyers and follow up properly",
  },
  {
    icon: Briefcase,
    name: "Startups & SMEs",
    preview: `<svg viewBox="0 0 120 80" fill="none" class="w-full"><rect width="120" height="80" rx="6" fill="#0f172a" stroke="#1e293b" stroke-width="1"/><rect x="0" y="0" width="120" height="10" rx="6" fill="#1e293b"/><circle cx="8" cy="5" r="2" fill="#ef4444"/><circle cx="15" cy="5" r="2" fill="#f59e0b"/><circle cx="22" cy="5" r="2" fill="#22c55e"/><rect x="15" y="20" width="90" height="7" rx="2" fill="#2dd4bf" opacity=".2"/><rect x="25" y="35" width="70" height="4" rx="1" fill="#334155"/><rect x="25" y="43" width="50" height="4" rx="1" fill="#334155"/><path d="M60 48l6-12 6 12" fill="#f59e0b" opacity=".3" stroke="#f59e0b" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="60" cy="60" r="3" fill="#2dd4bf"/></svg>`,
    detail: "A professional footprint, launched fast",
  },
];

const steps = [
  {
    number: "Step 1",
    title: "Choose your package",
    description: "Pick Launch, Growth, or Scale. No sales call, no pressure.",
    href: "/digital/pricing",
  },
  {
    number: "Step 2",
    title: "Complete onboarding & upload materials",
    description:
      "A 10-minute form tells us everything. Send photos, logo, and business details — we work with what you have.",
    href: "/digital/onboarding",
  },
  {
    number: "Step 3",
    title: "Complete payment & book your slot",
    description:
      "Pay securely with UPI or card. Your GST receipt arrives instantly and your build clock starts.",
    href: "/digital/onboarding",
  },
  {
    number: "Days 1–2",
    title: "Research & planning",
    description:
      "We study your industry, competitors, and customer search behaviour. Every design decision starts with data.",
    href: "/digital/why-nexbaron",
  },
  {
    number: "Days 2–4",
    title: "Design & development",
    description:
      "Your website takes shape — mobile-first, branded, and optimised for how your customers actually search and book.",
    href: "/digital/solutions",
  },
  {
    number: "Days 4–5",
    title: "Review & revisions",
    description:
      "You get a private preview link. Walk through every page, mark your feedback directly. We refine until you approve.",
    href: "/digital/solutions",
  },
  {
    number: "Days 5–7",
    title: "Final polish & go live",
    description:
      "Final checks complete. Domain connected, SSL active, mobile tested. Your business is now live online.",
    href: "/digital/solutions",
  },
  {
    number: "Weeks 2–4",
    title: "Google Business Profile verified",
    description:
      "Your GBP is submitted for verification. Review collection starts. Local ranking begins building over 4–8 weeks.",
    href: "/digital/results",
  },
  {
    number: "Month 1+",
    title: "Monthly care & growth reports",
    description:
      "Hosting, updates, backups, and a plain-English report by the 5th. WhatsApp auto-replies keep working 24/7.",
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
                className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-10 py-7 rounded-xl shadow-lg shadow-teal-500/20"
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
                className="border-white/20 text-white hover:bg-white/10 px-10 py-7 rounded-xl backdrop-blur-md"
              >
                <Link href="/digital/who-we-help">Who We Help</Link>
              </Button>
            </div>{" "}
            {/* Trust Signals */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-center max-w-4xl mx-auto">
              {[
                "50+ businesses launched",
                "Average launch: 7 days",
                "Google Business verified",
                "WhatsApp Business Partner",
                "Hosted securely",
              ].map((signal) => (
                <div
                  key={signal}
                  className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/5"
                >
                  <span className="text-teal-400 text-sm">✓</span>
                  <span className="text-xs text-slate-300 font-medium">{signal}</span>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>
        {/* Social Proof */}
        <section className="py-16 border-t border-white/10">
          <div className="max-w-3xl mx-auto">
            <div className="p-8 rounded-2xl bg-gradient-to-r from-teal-500/10 to-cyan-500/5 border border-teal-500/20">
              <div className="flex items-center gap-1.5 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i} className="text-amber-400 text-base">
                    &#9733;
                  </span>
                ))}
                <span className="text-xs text-slate-500 ml-2">Google Review</span>
              </div>
              <p className="text-slate-200 text-base leading-relaxed italic max-w-xl">
                &ldquo;I had zero online presence. Nexbaron built my website in 6 days, got me on
                Google, and now customers book appointments on WhatsApp — I don&apos;t even pick up
                the phone anymore.&rdquo;
              </p>
              <div className="flex items-center gap-4 mt-6">
                <div className="w-11 h-11 rounded-full bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400 font-bold text-sm">
                  DM
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Dr. Mehta</p>
                  <p className="text-xs text-slate-400">Dental Clinic, Mumbai</p>
                </div>
              </div>
            </div>
          </div>
        </section>{" "}
        {/* Tailored Industries */}
        <section className="py-16 border-t border-white/10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-mono tracking-widest text-teal-400 font-semibold px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 inline-block mb-3">
              Who We Help
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
              Built for Businesses Like Yours
            </h2>
            <p className="text-base text-slate-200 mt-4">
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
        {/* Results */}
        <section className="py-16 border-t border-white/10">
          <SectionHeading
            accent="digital"
            eyebrow="Results"
            title="What Our Customers See"
            description="Real outcomes from businesses like yours — not promises, proof."
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-3xl mx-auto">
            {[
              { value: "50+", label: "Businesses Launched" },
              { value: "4.9", label: "Google Rating" },
              { value: "7 Days", label: "Avg. Build Time" },
              { value: "24/7", label: "WhatsApp Replies" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl font-heading font-extrabold text-teal-400">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-300 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>
        {/* Process Timeline */}
        <section className="py-16 border-t border-white/10">
          <SectionHeading
            accent="digital"
            eyebrow="How It Works"
            title="From Sign-Up to Go-Live in 5–7 Days"
            description="Three simple steps from you. A few days from us. Then we keep it growing. Then we keep it growing."
          />
          <ProcessTimeline steps={steps} />
          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-10 py-3.5 rounded-xl shadow-lg shadow-teal-500/20"
            >
              <Link
                href="/digital/pricing#plans"
                className="inline-flex items-center justify-center gap-2"
              >
                Choose Your Plan <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </section>{" "}
        {/* Pricing Preview */}
        <section className="py-16 border-t border-white/10">
          <SectionHeading
            accent="digital"
            eyebrow="Pricing"
            title="One Plan. One Price. No Surprises."
            description="Every plan includes hosting, SSL, mobile optimisation, and monthly care. Pay once for the build, then a small monthly fee to keep it growing."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              {
                name: "Launch",
                price: "₹9,999",
                care: "₹1,499/mo",
                desc: "5-page website, mobile-ready, contact form, 7-day delivery",
                featured: false,
              },
              {
                name: "Growth",
                price: "₹24,999",
                care: "₹3,999/mo",
                desc: "Everything in Launch + Google Business Profile, review system, WhatsApp auto-replies, 2-week delivery",
                featured: true,
              },
              {
                name: "Scale",
                price: "₹49,999",
                care: "₹7,999/mo",
                desc: "Everything in Growth + 10 pages, advanced SEO, booking system, dedicated support, 30-day build",
                featured: false,
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`p-6 rounded-2xl border transition-all ${
                  plan.featured
                    ? "bg-teal-500/10 border-teal-500/40 shadow-xl shadow-teal-500/10"
                    : "bg-white/[0.03] border-white/10 hover:border-teal-500/30"
                }`}
              >
                <h3 className="text-lg font-heading font-bold text-white mb-1">{plan.name}</h3>
                <div className="text-3xl font-heading font-extrabold text-teal-300 mb-1">
                  {plan.price}
                </div>
                <div className="text-xs text-slate-500 mb-4">+ {plan.care} monthly care</div>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">{plan.desc}</p>
                <Link
                  href="/digital/pricing#plans"
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                    plan.featured
                      ? "text-teal-300 hover:text-teal-200"
                      : "text-teal-400 hover:text-teal-300"
                  }`}
                >
                  See full details <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button
              asChild
              size="lg"
              className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-10 py-3.5 rounded-xl shadow-lg shadow-teal-500/20"
            >
              <Link href="/digital/pricing#plans" className="flex items-center gap-2">
                Compare All Plans <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </section>
        {/* Final CTA */}
        <section className="py-16 border-t border-white/10">
          <div className="max-w-2xl mx-auto text-center p-10 rounded-3xl bg-gradient-to-r from-teal-500/20 via-cyan-500/10 to-slate-950 border border-teal-500/30">
            <h2 className="text-3xl font-heading font-bold text-white mb-4">
              Ready to Launch Your Business Online?
            </h2>
            <p className="text-slate-300 mb-8">
              Pick a plan, complete a 10-minute form, and your website goes live in 7 days — with
              Google visibility and WhatsApp booking included.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-10 py-3.5 rounded-xl shadow-lg shadow-teal-500/20"
              >
                <Link href="/digital/pricing#plans" className="flex items-center gap-2">
                  Choose Your Plan <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 px-8 rounded-xl backdrop-blur-md"
              >
                <Link href="/digital/contact">Talk to Us First</Link>
              </Button>
            </div>
          </div>
        </section>
        {/* FAQ */}
        <section className="py-16 border-t border-white/10">
          <SectionHeading
            accent="digital"
            eyebrow="FAQ"
            title="Questions Business Owners Ask"
            description="Straight answers. No jargon. No fine print."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {[
              {
                q: "Do I own my website? Can I cancel anytime?",
                a: "Yes — 100%. Your domain, content, and design are yours forever. Cancel anytime with no penalty. Your site stays yours.",
              },
              {
                q: "Will my website rank on Google?",
                a: "Yes. Every site is built with SEO best practices. Growth and Scale plans include active Google Business Profile optimisation, local ranking work, and monthly progress reports.",
              },
              {
                q: "How does WhatsApp booking work?",
                a: "Customers message your WhatsApp number. Our automation replies instantly — 24/7 — answers common questions, captures enquiries, and books appointments. You see every message in one chat thread.",
              },
              {
                q: "Do I need to buy a domain separately?",
                a: "We include a free .com or .in domain for the first year with every plan. After that, renewal is approximately ₹800–₹1,200/year — billed directly by the domain registrar, not us.",
              },
              {
                q: "Can I edit my own website content?",
                a: "Yes. We build on a platform you can edit yourself. Or we handle updates for you — up to 2 small changes per month included in Care. Bigger pages are ₹999 each.",
              },
              {
                q: "What happens after launch? How long until I see results?",
                a: "Your site is live in 7 days. Google ranking builds over 4–8 weeks. WhatsApp automation starts immediately. You get a plain-English report by the 5th of each month showing visits, enquiries, and ranking progress.",
              },
            ].map((item) => (
              <details
                key={item.q}
                className="p-5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-teal-500/30 transition-all group cursor-pointer"
              >
                <summary className="text-base font-semibold text-white list-none flex items-center justify-between gap-3">
                  {item.q}
                  <span className="text-teal-400 text-lg shrink-0 group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="text-base text-slate-200 leading-relaxed mt-3 ml-0">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

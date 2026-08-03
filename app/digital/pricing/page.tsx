import { ArrowRight, CheckCircle2, Rocket, MapPin, TrendingUp } from "lucide-react";
import { type Metadata } from "next";
import Link from "next/link";

import { SectionReveal } from "@/components/motion/section-reveal";
import { CTABanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { Button } from "@/components/ui/button";
import { buildWhatsAppLink } from "@/lib/divisions";
import { divisionOpenGraph, divisionTwitter } from "@/lib/og";

export const metadata: Metadata = {
  title: "Pricing | Fixed-Price Growth Plans | Nexbaron Digital",
  description:
    "Three fixed-price plans for local businesses: Launch, Growth, and Scale. One-time build fee plus a simple monthly care plan. No hidden costs, no lock-in.",
  openGraph: {
    title: "Pricing | Nexbaron Digital",
    description: "One-time build. Simple monthly care. No hidden costs, no lock-in.",
    ...divisionOpenGraph("digital"),
  },
  twitter: divisionTwitter("digital"),
};

interface Plan {
  id: string;
  name: string;
  oneTime: string;
  monthly: string;
  monthlyName: string;
  tagline: string;
  forWho: string[];
  timeline: string;
  featured?: boolean;
  features: string[];
  addOns: string[];
  icon: React.ElementType;
  ctaLabel: string;
}

const plans: Plan[] = [
  {
    id: "launch",
    name: "Launch",
    oneTime: "₹24,999",
    monthly: "₹1,499",
    monthlyName: "Care",
    tagline: "Get your business online, professionally.",
    forWho: [
      "New salons & cafes",
      "Freelancers",
      "Home-service businesses",
      "Shops getting online for the first time",
    ],
    timeline: "Live in 7 days",
    icon: Rocket,
    features: [
      "Professional business website (up to 4 pages)",
      "Mobile-perfect design",
      "Your logo, colors & business photos",
      "\u201cWhatsApp us\u201d button on every page",
      "Google Business Profile created & verified",
      "Every enquiry emailed straight to you",
    ],
    addOns: ["Extra pages (₹999/page)", "Additional photos (₹499)", "Domain setup (₹999 one-time)"],
    ctaLabel: "Start With Launch",
  },
  {
    id: "growth",
    name: "Growth",
    oneTime: "₹39,999",
    monthly: "₹3,999",
    monthlyName: "Growth Care",
    tagline: "Generate more calls, WhatsApp enquiries, and Google leads every month.",
    forWho: [
      "Restaurants & cafes",
      "Clinics & doctors",
      "Salons, spas & gyms",
      "Law & CA firms",
      "Local businesses relying on Google searches",
    ],
    timeline: "Live in 7–10 days · ranking builds over 60–90 days",
    featured: true,
    icon: MapPin,
    features: [
      "Everything in Launch",
      "Google Business Profile optimization",
      "Review system — we ask after every sale",
      "Rank for \u201cnear me\u201d searches in your city",
      "WhatsApp booking & no-show reminders",
      "24/7 automatic answers (hours, address, prices)",
      "Plain-English monthly ranking report",
    ],
    addOns: ["Google Ads setup (separate)", "Extra city coverage", "Payment link in chat"],
    ctaLabel: "Start With Growth",
  },
  {
    id: "scale",
    name: "Scale",
    oneTime: "₹59,999",
    monthly: "₹7,999",
    monthlyName: "Business Partner",
    tagline: "Your outsourced digital growth team.",
    forWho: [
      "Multi-location businesses",
      "Growing practices that have outgrown DIY",
      "Owners who want it handled, not managed",
    ],
    timeline: "First 30 days: foundation + audit + plan",
    icon: TrendingUp,
    features: [
      "Everything in Growth",
      "Dedicated growth manager",
      "Monthly strategy session & growth plan",
      "Unlimited content & page updates",
      "Quarterly competitor review",
      "Campaign & offer pages (seasonal, launches)",
    ],
    addOns: ["Same-day priority support", "Multi-location campaigns", "Advanced reporting"],
    ctaLabel: "Start With Scale",
  },
];

const addOns = [
  {
    name: "Extra Page",
    price: "₹999",
    note: "per page",
    description: "Add a service page, gallery, or price list to your website.",
  },
  {
    name: "Payment Gateway",
    price: "₹4,999",
    note: "one-time",
    description: "Accept UPI, cards, and payments on your website or in WhatsApp chat.",
  },
  {
    name: "Logo Design",
    price: "₹2,999",
    note: "one-time",
    description: "A professional logo and brand colors you'll be proud to show.",
  },
  {
    name: "Google Ads Setup",
    price: "₹9,999",
    note: "one-time + ad budget",
    description: "Ad campaigns that put you in front of people searching for your service.",
  },
];

const comparisonRows = [
  { feature: "Professional website", launch: true, growth: true, scale: true },
  {
    feature: "Google Business Profile created & verified",
    launch: true,
    growth: true,
    scale: true,
  },
  { feature: "Get found on Google (ranking & reviews)", launch: false, growth: true, scale: true },
  { feature: "WhatsApp booking & no-show reminders", launch: false, growth: true, scale: true },
  { feature: "24/7 automatic replies", launch: false, growth: true, scale: true },
  { feature: "Dedicated growth manager", launch: false, growth: false, scale: true },
  { feature: "Unlimited content & page updates", launch: false, growth: false, scale: true },
  { feature: "Monthly strategy session", launch: false, growth: false, scale: true },
  { feature: "Cancel anytime, no lock-in", launch: true, growth: true, scale: true },
  { feature: "Keep your website forever", launch: true, growth: true, scale: true },
];

const carePlans = [
  {
    name: "Care",
    price: "₹1,499",
    note: "per month",
    description: "Already have a site? We keep it online, updated, and backed up.",
    items: [
      "Up to 2 updates/month",
      "SSL, backups & uptime monitoring",
      "Monthly \u201chere's what changed\u201d note",
    ],
  },
  {
    name: "Growth Care",
    price: "₹3,999",
    note: "per month",
    description: "Website care plus Google visibility and review management.",
    items: [
      "Everything in Care",
      "Google Business Profile management",
      "Review management",
      "Plain-English monthly ranking report",
      "One campaign page per quarter",
    ],
  },
  {
    name: "Business Partner",
    price: "₹7,999",
    note: "per month",
    description: "Full support: enquiries handled, bookings automated, dedicated contact.",
    items: [
      "Everything in Growth Care",
      "WhatsApp enquiry handling & booking",
      "Dedicated contact + priority support",
      "Quarterly growth plan",
    ],
  },
];

const faqs = [
  {
    question: "How long does it take to launch?",
    answer:
      "Launch goes live in 7 days. Growth takes 7\u201310 days, and Scale starts with a 30-day foundation phase. We'll confirm a date before you pay anything.",
  },
  {
    question: "Who writes the content?",
    answer:
      "We do. We write simple, plain-language content for your services based on a short form you fill in. You approve every page before it goes live.",
  },
  {
    question: "Is hosting included?",
    answer:
      "Yes. Hosting, your domain's SSL certificate, backups, and uptime monitoring are all included in your monthly care plan.",
  },
  {
    question: "Can I use my own domain?",
    answer:
      "Yes. You can use a domain you already own, or we'll register one for you (₹999 one-time). You own it either way.",
  },
  {
    question: "Can I cancel?",
    answer:
      "Anytime, with 30 days' notice. There's no lock-in and no cancellation fee. You keep the website we built — your content, your domain, your brand.",
  },
  {
    question: "What if I already have a website?",
    answer:
      "No problem. Our Care plans are built for you: we keep your existing site online, updated, and backed up — no rebuild required.",
  },
  {
    question: "Do you work outside Bangalore?",
    answer:
      "Yes. We work with businesses all over India. Everything happens online and on WhatsApp, and your monthly care keeps it that way.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "UPI, bank transfer, and cards. You'll get a proper invoice with GST for every payment.",
  },
  {
    question: "Who owns the website?",
    answer:
      "You do. The website, your domain, and your content are 100% yours. Even if you cancel, you keep everything.",
  },
];

const steps = [
  {
    number: "1",
    title: "Choose your package",
    description: "Pick Launch, Growth, or Scale. No sales call, no pressure.",
  },
  {
    number: "2",
    title: "Complete a 10-minute onboarding form",
    description: "Tell us your services, hours, address, and what you want visitors to do.",
  },
  {
    number: "3",
    title: "Upload logo & photos",
    description: "Drop in your logo, business photos, and any content you want included.",
  },
  {
    number: "4",
    title: "Kickoff call (optional)",
    description: "15 minutes to align on goals. Skip it if you're happy to move fast.",
  },
  {
    number: "5",
    title: "Website delivered",
    description: "Your website goes live — approved by you, on time.",
  },
  {
    number: "6",
    title: "Monthly growth begins",
    description: "Google visibility, WhatsApp answers, and monthly care keep it working.",
  },
];

export default function DigitalServicesPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <div className="relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PageHero
        accent="digital"
        eyebrow="Pricing"
        title="Pick a Plan. Start in"
        highlight="7 Days."
        description="Published prices. No hidden costs. No sales call required to get started — choose a plan, fill in a short form, and we take it from there."
        primaryCta={{ label: "Compare Plans Below", href: "#plans" }}
        secondaryCta={{ label: "I Already Have a Website", href: "#care-plans" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* How It Works */}
        <section className="py-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-mono tracking-widest text-teal-400 font-semibold px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 inline-block mb-3">
              How It Works
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
              What Happens After You Choose
            </h2>
            <p className="text-sm text-slate-300 mt-4">
              Six steps between picking a plan and your business growing online. No surprises in
              between.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step) => (
              <div
                key={step.number}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-teal-500/40 transition-all duration-300 backdrop-blur-md"
              >
                <div className="text-3xl font-heading font-extrabold text-teal-400/40 mb-3 font-mono">
                  {step.number}
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Growth Plans */}
        <section id="plans" className="py-16 scroll-mt-28">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-mono tracking-widest text-teal-400 font-semibold px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 inline-block mb-3">
              Growth Plans
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
              One Plan. Everything Your Business Needs.
            </h2>
            <p className="text-sm text-slate-300 mt-4">
              Each plan includes a website, hosting, and support. Pick the stage your business is at
              — you can always move up.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
            {plans.map((plan) => {
              const Icon = plan.icon;
              return (
                <SectionReveal key={plan.id}>
                  <div
                    id={plan.id}
                    className={`h-full flex flex-col p-8 rounded-2xl backdrop-blur-md border transition-all duration-300 scroll-mt-28 ${
                      plan.featured
                        ? "bg-teal-500/10 border-teal-500/40 shadow-2xl shadow-teal-500/10"
                        : "bg-white/[0.03] border-white/10 hover:border-teal-500/40 hover:bg-white/[0.06]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400">
                        <Icon className="w-6 h-6" />
                      </div>
                      {plan.featured && (
                        <span className="text-[10px] font-mono text-slate-950 px-2.5 py-1 rounded bg-teal-400 font-semibold">
                          Most Popular
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-heading font-semibold text-white mb-1">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed mb-4">{plan.tagline}</p>

                    <div className="mb-4">
                      <span className="text-3xl font-heading font-extrabold text-white">
                        {plan.oneTime}
                      </span>
                      <span className="text-xs text-slate-400 ml-1">one-time</span>
                      <div className="text-sm text-slate-300 mt-1">
                        + {plan.monthly}
                        <span className="text-xs text-slate-400">/month · {plan.monthlyName}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="text-[10px] font-mono text-teal-400 px-2.5 py-1 rounded bg-teal-500/10 border border-teal-500/20 inline-block">
                        {plan.timeline}
                      </span>
                    </div>

                    <div className="mb-6">
                      <span className="text-[10px] uppercase tracking-wider font-mono font-semibold text-slate-500">
                        Best for
                      </span>
                      <ul className="mt-2 space-y-1.5">
                        {plan.forWho.map((item) => (
                          <li key={item} className="text-xs text-slate-400 leading-relaxed">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <ul className="space-y-2.5 mb-6 pt-4 border-t border-white/10">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                          <span className="text-xs text-slate-300">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mb-6">
                      <span className="text-[10px] uppercase tracking-wider font-mono font-semibold text-slate-500">
                        Add-ons
                      </span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {plan.addOns.map((addOn) => (
                          <span
                            key={addOn}
                            className="text-[10px] font-mono text-slate-400 px-2.5 py-1 rounded bg-white/5 border border-white/10"
                          >
                            {addOn}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-auto pt-4">
                      <Button
                        asChild
                        size="lg"
                        className={`w-full font-bold px-8 rounded-xl shadow-lg ${
                          plan.featured
                            ? "bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-teal-500/20"
                            : "bg-teal-500/10 border border-teal-500/30 text-teal-300 hover:bg-teal-500/20"
                        }`}
                      >
                        <Link
                          href={`/digital/contact?plan=${plan.id}`}
                          className="inline-flex items-center justify-center gap-2"
                        >
                          {plan.ctaLabel}
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </SectionReveal>
              );
            })}
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16 border-t border-white/10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-mono tracking-widest text-teal-400 font-semibold px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 inline-block mb-3">
              Compare Plans
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
              Everything, Side by Side
            </h2>
            <p className="text-sm text-slate-300 mt-4">
              Same inclusions, three levels of growth. Pick the one that matches where your business
              is today.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/[0.03] border-b border-white/10">
                  <th className="text-left px-6 py-4 font-mono text-xs uppercase tracking-wider text-slate-400">
                    Feature
                  </th>
                  {plans.map((plan) => (
                    <th
                      key={plan.id}
                      className={`px-6 py-4 text-center font-heading font-semibold ${
                        plan.featured ? "text-teal-300" : "text-white"
                      }`}
                    >
                      {plan.name}
                      {plan.featured && (
                        <span className="block text-[10px] font-mono text-teal-400 mt-1">
                          Most Popular
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, index) => (
                  <tr
                    key={row.feature}
                    className={`border-b border-white/5 last:border-0 ${
                      index % 2 === 0 ? "bg-transparent" : "bg-white/[0.02]"
                    }`}
                  >
                    <td className="px-6 py-3.5 text-slate-300">{row.feature}</td>
                    {[row.launch, row.growth, row.scale].map((included, colIndex) => (
                      <td key={colIndex} className="px-6 py-3.5 text-center">
                        {included ? (
                          <CheckCircle2 className="w-4 h-4 text-teal-400 mx-auto" />
                        ) : (
                          <span className="text-slate-600 text-xs font-mono">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Add-ons */}
        <section className="py-16 border-t border-white/10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-mono tracking-widest text-teal-400 font-semibold px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 inline-block mb-3">
              Add-Ons
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
              Add What You Need, Priced Upfront
            </h2>
            <p className="text-sm text-slate-300 mt-4">
              Add these to any plan. Transparent prices — no surprises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addOn) => (
              <div
                key={addOn.name}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-teal-500/40 transition-all duration-300 backdrop-blur-md"
              >
                <h3 className="text-lg font-heading font-semibold text-white mb-1">{addOn.name}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{addOn.description}</p>
                <div>
                  <span className="text-2xl font-heading font-extrabold text-teal-300">
                    {addOn.price}
                  </span>
                  <span className="text-xs text-slate-400 ml-1">{addOn.note}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Care Plans */}
        <section id="care-plans" className="py-16 border-t border-white/10 scroll-mt-28">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-mono tracking-widest text-teal-400 font-semibold px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 inline-block mb-3">
              The Monthly Side
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
              Simple Monthly Care Plans
            </h2>
            <p className="text-sm text-slate-300 mt-4">
              Already have a website? Start here. These also work as maintenance on top of any plan.
            </p>
            <div className="flex flex-wrap justify-center gap-2.5 mt-6">
              {["Cancel anytime", "No lock-in", "Keep your website forever"].map((pill) => (
                <span
                  key={pill}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-teal-300 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {pill}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {carePlans.map((plan) => (
              <SectionReveal key={plan.name}>
                <div className="h-full flex flex-col p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-teal-500/40 transition-all duration-300 backdrop-blur-md hover:bg-white/[0.06]">
                  <h3 className="text-xl font-heading font-semibold text-white mb-1">
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-3xl font-heading font-extrabold text-white">
                      {plan.price}
                    </span>
                    <span className="text-xs text-slate-400 ml-1">{plan.note}</span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed mb-6">{plan.description}</p>

                  <ul className="space-y-2.5 mb-6 pt-4 border-t border-white/10">
                    {plan.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                        <span className="text-xs text-slate-300">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-4">
                    <Button
                      asChild
                      size="lg"
                      className="w-full bg-teal-500/10 border border-teal-500/30 text-teal-300 hover:bg-teal-500/20 font-bold px-8 rounded-xl"
                    >
                      <a
                        href={buildWhatsAppLink(
                          "digital",
                          `Hi Nexbaron Digital, I'm interested in the ${plan.name} plan`,
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2"
                      >
                        Ask About {plan.name}
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </section>

        {/* Assurance strip */}
        <section className="pt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {[
              { title: "No hidden costs", body: "The price you see is the price you pay." },
              { title: "No lock-in", body: "Cancel any month. You keep everything we built." },
              { title: "No jargon", body: "Plain language, plain promises." },
            ].map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-xl bg-white/[0.02] border border-white/10"
              >
                <h3 className="text-sm font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-xs text-slate-400">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-16 border-t border-white/10 scroll-mt-28">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-mono tracking-widest text-teal-400 font-semibold px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 inline-block mb-3">
              Questions & Answers
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
              Everything You&apos;re Wondering
            </h2>
            <p className="text-sm text-slate-300 mt-4">
              No fine print. No surprises. If you don&apos;t see your question, ask us on WhatsApp.
            </p>
          </div>

          <div className="max-w-3xl mx-auto divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.02]">
            {faqs.map((faq) => (
              <details key={faq.question} className="group px-6 py-5">
                <summary className="flex items-center justify-between cursor-pointer list-none text-sm font-semibold text-white hover:text-teal-300 transition-colors">
                  {faq.question}
                  <span className="text-teal-400 text-xl font-light leading-none group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="text-sm text-slate-400 leading-relaxed pt-3">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <CTABanner
          accent="digital"
          title="Not sure which plan fits?"
          description="Take 30 seconds to tell us about your business — we'll reply within 2 hours with a clear recommendation. No pressure, no obligation."
          ctaLabel="Get a Free Recommendation"
          href="/digital/contact"
        />
      </div>
    </div>
  );
}

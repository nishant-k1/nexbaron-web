import { MessageSquare, Clock, ShieldCheck, CalendarClock, PhoneCall } from "lucide-react";
import { type Metadata } from "next";

import { PageHero } from "@/components/sections/page-hero";
import { LeadForm } from "@/features/contact/components/lead-form";
import { buildWhatsAppLink } from "@/lib/divisions";
import { divisionOpenGraph, divisionTwitter } from "@/lib/og";

export const metadata: Metadata = {
  title: "Get Started | Nexbaron Digital",
  description:
    "Tell us about your business and get a clear plan recommendation. Fixed-price plans that get you found on Google, answered on WhatsApp, with your website live on a date we confirm before you pay.",
  openGraph: {
    title: "Get Started | Nexbaron Digital",
    description: "Tell us about your business — we reply the same day.",
    ...divisionOpenGraph("digital"),
  },
  twitter: divisionTwitter("digital"),
};

const nextSteps = [
  {
    icon: Clock,
    title: "Reply the same day",
    description: "We reply with a clear next step the same day, every time.",
  },
  {
    icon: MessageSquare,
    title: "A quick chat about your business",
    description:
      "A short call to understand where you are and what you want — no jargon, no pressure.",
  },
  {
    icon: ShieldCheck,
    title: "You pick a fixed-price plan",
    description: "A clear published price, honest advice, and zero lock-in. You stay in control.",
  },
  {
    icon: CalendarClock,
    title: "Your website, live by a confirmed date",
    description:
      "We confirm your exact launch date before you pay — then we build, you approve, and we go live.",
  },
];

export default function DigitalContactPage({ searchParams }: { searchParams: { plan?: string } }) {
  const initialPlan = searchParams.plan;

  return (
    <div className="relative overflow-hidden">
      <PageHero
        accent="digital"
        eyebrow="Get Started"
        title="Get Started"
        highlight="Fixed-Price Plans"
        description="Tell us about your business and we'll recommend the right plan. Prefer WhatsApp? Message us and we'll take it from there."
        primaryCta={{
          label: "Chat on WhatsApp",
          href: buildWhatsAppLink(
            "digital",
            "Hi Nexbaron Digital, I want to grow my business online",
          ),
          external: true,
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
              <h2 className="text-xl font-heading font-bold text-white mb-6">What Happens Next</h2>
              <div className="space-y-6">
                {nextSteps.map((step) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.title} className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400 shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-white mb-1">{step.title}</h3>
                        <p className="text-xs text-slate-400 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
              <h2 className="text-xl font-heading font-bold text-white mb-4">
                Prefer to Talk Directly?
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                Our team is available Monday to Saturday to discuss your growth plan.
              </p>
              <a
                href={buildWhatsAppLink(
                  "digital",
                  "Hi Nexbaron Digital, I'd like to talk about growing my business",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-teal-400 hover:text-teal-300"
              >
                <PhoneCall className="w-4 h-4" />
                Start a WhatsApp conversation
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <LeadForm
              division="digital"
              initialPlan={initialPlan}
              heading="Tell us about your business"
              subheading="We'll reply the same day with a clear recommendation."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

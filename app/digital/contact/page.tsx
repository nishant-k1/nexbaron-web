import { MessageSquare, Clock, ShieldCheck, PhoneCall } from "lucide-react";
import { type Metadata } from "next";

import { PageHero } from "@/components/sections/page-hero";
import { LeadForm } from "@/features/contact/components/lead-form";
import { buildWhatsAppLink } from "@/lib/divisions";

export const metadata: Metadata = {
  title: "Contact Digital Team | Nexbaron Digital",
  description:
    "Book a free growth audit or get a quote for websites, local SEO, WhatsApp automation, and CRM from Nexbaron Digital.",
  openGraph: {
    title: "Contact Digital Team | Nexbaron Digital",
    description: "Get a free growth audit and consultation from the Nexbaron Digital team.",
  },
};

const nextSteps = [
  {
    icon: Clock,
    title: "Response in 2 hours",
    description: "On business days we respond within 2 hours with a clear next step.",
  },
  {
    icon: MessageSquare,
    title: "Free growth audit",
    description: "We review your website and Google ranking and tell you exactly what to fix.",
  },
  {
    icon: ShieldCheck,
    title: "No pressure, no lock-in",
    description: "A clear proposal, honest advice, and zero obligation to continue.",
  },
];

export default function DigitalContactPage() {
  return (
    <div className="relative overflow-hidden">
      <PageHero
        accent="digital"
        eyebrow="Contact Digital Team"
        title="Let's Grow Your Business"
        highlight="Online"
        description="Tell us about your business and get a free growth audit. Prefer WhatsApp? Message us and we'll take it from there."
        primaryCta={{
          label: "Chat on WhatsApp",
          href: buildWhatsAppLink("digital", "Hi Nexbaron Digital, I want a free growth audit"),
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
              heading="Request Your Free Growth Audit"
              subheading="Takes less than a minute. We'll reply on WhatsApp with your custom plan."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

import { MessageSquare, Clock, PhoneCall } from "lucide-react";
import { type Metadata } from "next";

import { ContactForm } from "@/components/contact/contact-form";
import { PageHero } from "@/components/sections/page-hero";
import { buildWhatsAppLink } from "@/lib/divisions";
import { divisionOpenGraph, divisionTwitter } from "@/lib/og";

export const metadata: Metadata = {
  title: "Contact Us | Nexbaron Print",
  description:
    "Have a question about visiting cards, brochures, signage, or any printing requirement? Get in touch and we'll get back with a clear answer.",
  openGraph: {
    title: "Contact Us | Nexbaron Print",
    description: "Have a printing question? We'll get back to you.",
    ...divisionOpenGraph("print"),
  },
  twitter: divisionTwitter("print"),
};

const nextSteps = [
  {
    icon: Clock,
    title: "Reply the same day",
    description: "We reply to every enquiry the same day, every time.",
  },
  {
    icon: MessageSquare,
    title: "Clear specifications and pricing",
    description:
      "We'll confirm sizes, stocks, finishes, and pricing — no ambiguity, no hidden costs.",
  },
  {
    icon: PhoneCall,
    title: "Talk when you're ready",
    description:
      "Prefer a call or WhatsApp? We're available Monday to Saturday at a time that suits you.",
  },
];

export default function PrintContactPage() {
  return (
    <div className="relative overflow-hidden">
      <PageHero
        accent="print"
        eyebrow="Contact Us"
        title="Get in Touch"
        highlight="We're Here to Help"
        description="Have a question about printing, materials, or delivery? Drop us a message and we'll get back to you the same day."
        primaryCta={{
          label: "Chat on WhatsApp",
          href: buildWhatsAppLink(
            "print",
            "Hi Nexbaron Print, I have a question about your printing services",
          ),
          external: true,
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
              <h2 className="text-xl font-heading font-bold text-white mb-6">What to Expect</h2>
              <div className="space-y-6">
                {nextSteps.map((step) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.title} className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0">
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
                Prefer to Message Directly?
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                You can also reach us on WhatsApp — we&apos;re available Monday to Saturday.
              </p>
              <a
                href={buildWhatsAppLink(
                  "print",
                  "Hi Nexbaron Print, I'd like to know more about your printing services",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300"
              >
                <PhoneCall className="w-4 h-4" />
                Start a WhatsApp conversation
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ContactForm
              division="print"
              heading="Send us a message"
              subheading="Fill in the form below and we'll get back to you the same day."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

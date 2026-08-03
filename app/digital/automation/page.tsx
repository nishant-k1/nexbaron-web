import { MessageSquare, Zap, BellRing, Users, Bot, CalendarClock } from "lucide-react";
import { type Metadata } from "next";

import { CTABanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { divisionOpenGraph, divisionTwitter } from "@/lib/og";

export const metadata: Metadata = {
  title: "WhatsApp That Answers Your Customers 24/7 | Nexbaron Digital",
  description:
    "Your business answers customers on WhatsApp at any hour — instant replies, self-booking, and reminders that stop no-shows. Included in Growth and Scale plans.",
  openGraph: {
    title: "WhatsApp That Answers Your Customers 24/7 | Nexbaron Digital",
    description: "Answers your customers, books appointments, and stops no-shows — 24/7.",
    ...divisionOpenGraph("digital"),
  },
  twitter: divisionTwitter("digital"),
};

const steps = [
  {
    number: "01",
    title: "We Handle the Setup",
    description:
      "We set up your WhatsApp Business profile and connect it to your website and forms, so every enquiry lands in one inbox.",
  },
  {
    number: "02",
    title: "It Answers For You",
    description:
      "Your customers get instant replies to common questions at any hour — even at 3am on a Sunday.",
  },
  {
    number: "03",
    title: "Every Enquiry Becomes a Customer",
    description:
      "Customers book themselves and reminders stop no-shows. Nothing is forgotten, no one is missed.",
  },
];

const capabilities = [
  {
    icon: Bot,
    title: "Answers your customers at 3am",
    description:
      "Instant replies to common questions at any hour — you never miss a customer again.",
  },
  {
    icon: BellRing,
    title: "You get notified the second someone enquires",
    description:
      "Every enquiry pings your phone on WhatsApp right away, ready to act while the customer is still interested.",
  },
  {
    icon: CalendarClock,
    title: "Customers book themselves, reminders stop no-shows",
    description: "Clients pick their own slot; automatic reminders cut no-shows.",
  },
  {
    icon: Users,
    title: "Real staff take over when needed",
    description:
      "Complex questions hand off to your team with the full conversation, so nobody starts over.",
  },
  {
    icon: Zap,
    title: "Send an offer to every customer in one tap",
    description: "Announce a sale or new service to your whole customer list in seconds.",
  },
  {
    icon: MessageSquare,
    title: "Every conversation, saved in one place",
    description:
      "All chats and enquiries recorded neatly, so your team can act and nothing slips through.",
  },
];

export default function DigitalAutomationPage() {
  return (
    <div className="relative overflow-hidden">
      <PageHero
        accent="digital"
        eyebrow="WhatsApp, Working For You 24/7"
        title="Your Business, Answering"
        highlight="24/7 on WhatsApp"
        description="The most under-used channel in local business. We turn WhatsApp into a service that answers your customers, books their appointments, and reminds them to show up — automatically."
        primaryCta={{
          label: "See the Growth Plan",
          href: "/digital/pricing#plans",
        }}
        secondaryCta={{ label: "Talk to Us", href: "/digital/contact" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <section className="py-16">
          <SectionHeading
            accent="digital"
            eyebrow="How It Works"
            title="From First Message to Booked Customer"
            description="Three steps to a business that answers at any hour, never misses an enquiry, and never forgets a follow-up."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div
                key={step.number}
                className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-teal-500/40 transition-all duration-300 backdrop-blur-md hover:bg-white/[0.06]"
              >
                <div className="text-xs font-mono text-teal-400 mb-4">Step {step.number}</div>
                <h3 className="text-xl font-heading font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 border-t border-white/10">
          <SectionHeading
            accent="digital"
            eyebrow="What's Included"
            title="What It Does For Your Business"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((capability) => {
              const Icon = capability.icon;
              return (
                <div
                  key={capability.title}
                  className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-teal-500/40 transition-all backdrop-blur-md group"
                >
                  <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400 w-fit mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-white mb-2">
                    {capability.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{capability.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <CTABanner
          accent="digital"
          title="Ready to Answer Customers at Any Hour?"
          description="This is included in the Growth plan — no separate setup, no extra fees."
          ctaLabel="See the Growth Plan"
          href="/digital/pricing#plans"
        />
      </div>
    </div>
  );
}

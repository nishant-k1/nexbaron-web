import { MessageSquare, Zap, BellRing, Users, Bot, CalendarClock } from "lucide-react";
import { type Metadata } from "next";

import { CTABanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { buildWhatsAppLink } from "@/lib/divisions";

export const metadata: Metadata = {
  title: "AI & WhatsApp CRM | Nexbaron Digital",
  description:
    "24/7 WhatsApp AI chatbots, lead capture, appointment booking, and CRM automation that grow your local business while you sleep.",
  openGraph: {
    title: "AI & WhatsApp CRM | Nexbaron Digital",
    description: "Automate customer conversations and capture leads 24/7 on WhatsApp.",
  },
};

const steps = [
  {
    number: "01",
    title: "Connect",
    description:
      "We set up your WhatsApp Business profile and connect it to your website, forms, and team inbox in one place.",
  },
  {
    number: "02",
    title: "Automate",
    description:
      "AI chatbots answer FAQs, capture lead details, and book appointments instantly — in your brand's voice, 24/7.",
  },
  {
    number: "03",
    title: "Convert",
    description:
      "Every conversation flows into your CRM with automatic follow-ups, so no enquiry ever slips through the cracks.",
  },
];

const capabilities = [
  {
    icon: Bot,
    title: "24/7 AI Chatbot",
    description:
      "Instant, human-sounding replies to common questions at any hour — never miss a customer again.",
  },
  {
    icon: BellRing,
    title: "Instant Lead Alerts",
    description:
      "Every enquiry notifies your team on WhatsApp in real time, ready to act while the customer is hot.",
  },
  {
    icon: CalendarClock,
    title: "Appointment Booking",
    description: "Customers book slots in-chat; reminders cut no-shows automatically.",
  },
  {
    icon: Users,
    title: "Human Handoff",
    description:
      "Complex questions seamlessly transfer to your team with full conversation context.",
  },
  {
    icon: Zap,
    title: "Broadcast Campaigns",
    description: "Send offers and updates to your customer list in seconds, right from WhatsApp.",
  },
  {
    icon: MessageSquare,
    title: "CRM Sync",
    description:
      "All conversations and leads recorded in one simple pipeline your team can act on.",
  },
];

export default function DigitalAutomationPage() {
  return (
    <div className="relative overflow-hidden">
      <PageHero
        accent="digital"
        eyebrow="AI & WhatsApp Automation"
        title="Your Business, Answering"
        highlight="24/7 on WhatsApp"
        description="The most under-used sales channel in local business. We turn WhatsApp into a lead machine that books appointments, answers questions, and follows up — automatically."
        primaryCta={{
          label: "See It In Action",
          href: buildWhatsAppLink(
            "digital",
            "Hi Nexbaron Digital, show me how the WhatsApp chatbot works",
          ),
          external: true,
        }}
        secondaryCta={{ label: "Talk to an Expert", href: "/digital/contact" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <section className="py-16">
          <SectionHeading
            accent="digital"
            eyebrow="How It Works"
            title="From First Message to Closed Lead"
            description="Three steps to an always-on sales team that never sleeps, never misses a call, and never forgets a follow-up."
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
            eyebrow="Capabilities"
            title="What Your WhatsApp Sales Machine Does"
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
          title="Ready to Never Miss a Lead Again?"
          description="Get a free WhatsApp automation demo for your business, delivered in under 2 hours."
          ctaLabel="Get Free Demo"
          href={buildWhatsAppLink(
            "digital",
            "Hi Nexbaron Digital, I want a free WhatsApp automation demo",
          )}
          external
        />
      </div>
    </div>
  );
}

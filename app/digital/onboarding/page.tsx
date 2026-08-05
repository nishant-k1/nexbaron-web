import { CreditCard, MessageSquare, Upload } from "lucide-react";
import { type Metadata } from "next";
import { redirect } from "next/navigation";

import { PageHero } from "@/components/sections/page-hero";
import { OnboardingWizard } from "@/features/digital/onboarding/components/onboarding-wizard";
import { buildWhatsAppLink } from "@/lib/divisions";
import { divisionOpenGraph, divisionTwitter } from "@/lib/og";

export const metadata: Metadata = {
  title: "Start Your Plan | Onboarding | Nexbaron Digital",
  description:
    "You've chosen your plan. Now complete the short onboarding: your business details, photos, and payment — settle everything in a few minutes and your launch date is confirmed when you pay.",
  openGraph: {
    title: "Start Your Plan | Nexbaron Digital",
    description: "Three short steps: business details, photos, and payment.",
    ...divisionOpenGraph("digital"),
  },
  twitter: divisionTwitter("digital"),
};

const steps = [
  {
    icon: MessageSquare,
    title: "Business details",
    description: "A 10-minute form. Services, hours, address, what you want visitors to do.",
  },
  {
    icon: Upload,
    title: "Photos & upload",
    description: "Your photos and details. No logo yet? We design one for you.",
  },
  {
    icon: CreditCard,
    title: "Payment",
    description: "Pay with UPI or card. GST invoice on every payment.",
  },
];

export default function DigitalOnboardingPage({
  searchParams,
}: {
  searchParams: { plan?: string };
}) {
  const initialPlan = searchParams.plan;

  if (!initialPlan || !["launch", "growth", "scale"].includes(initialPlan)) {
    redirect("/digital/pricing");
  }

  return (
    <div className="relative overflow-hidden">
      <PageHero
        accent="digital"
        eyebrow="Start Your Plan"
        title="Three Steps. Then We"
        highlight="Build."
        description="Your plan is chosen. Now the short onboarding — business details, photos, and payment. After that, your build clock starts on a confirmed date."
        primaryCta={{ label: "Start Onboarding Below", href: "#onboarding" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 space-y-6">
            <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
              <h2 className="text-xl font-heading font-bold text-white mb-6">What This Covers</h2>
              <div className="space-y-6">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.title} className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400 shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-white mb-1">
                          <span className="font-mono text-teal-400 mr-1.5">0{index + 1}</span>
                          {step.title}
                        </h3>
                        <p className="text-xs text-slate-400 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
              <h2 className="text-xl font-heading font-bold text-white mb-4">
                Prefer to Talk First?
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                We&apos;ll guide you through these steps on WhatsApp — and it often goes faster with
                our help.
              </p>
              <a
                href={buildWhatsAppLink(
                  "digital",
                  "Hi Nexbaron Digital, I've chosen a plan and want help completing the onboarding.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-teal-400 hover:text-teal-300"
              >
                <MessageSquare className="w-4 h-4" />
                Get help on WhatsApp
              </a>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div id="onboarding" className="scroll-mt-28">
              <OnboardingWizard initialPlan={initialPlan} />
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

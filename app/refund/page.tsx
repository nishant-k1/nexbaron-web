import { type Metadata } from "next";

import { SectionReveal } from "@/components/motion/section-reveal";
import { getBusinessProfile } from "@/lib/business-profile";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description: "Refund and cancellation policy for Nexbaron Digital and Nexbaron Print orders.",
};

function buildSections(digitalEmail: string, printEmail: string) {
  return [
    {
      title: "Digital Services",
      body: "Nexbaron Digital plans begin with a one-time build fee and a monthly care subscription. You may cancel your monthly subscription anytime after the minimum term; cancellation takes effect from the next billing cycle. The one-time build fee is refundable in full if you cancel within 24 hours of payment and before any build work has begun.",
    },
    {
      title: "Print Orders",
      body: "Nexbaron Print orders are manufactured to your specifications and generally cannot be resold. Custom print orders may be cancelled for a full refund before production begins. Once printing has started, orders are non-refundable except in cases of a manufacturing defect on our side.",
    },
    {
      title: "Defective or Damaged Goods",
      body: "If your print order arrives damaged or with a production defect, contact us within 7 days of delivery with photos. We will reprint the affected quantity at no cost or issue a proportionate refund.",
    },
    {
      title: "How to Request a Refund",
      body: `Email the relevant division — ${digitalEmail} for digital services or ${printEmail} for print orders — with your order or invoice number. Approved refunds are returned to the original payment method within 7–10 business days.`,
    },
  ];
}

export default async function RefundPage() {
  const [digital, print] = await Promise.all([
    getBusinessProfile("digital"),
    getBusinessProfile("print"),
  ]);
  const sections = buildSections(digital.email, print.email);

  return (
    <div className="relative pt-32 pb-24 md:pt-40 md:pb-36 overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-teal-500/10 via-slate-800/20 to-amber-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionReveal>
          <div className="max-w-3xl mx-auto">
            <span className="text-xs uppercase font-mono tracking-widest text-slate-300 font-semibold px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 inline-block mb-4">
              Nexbaron Private Limited
            </span>
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-6">
              Refund & Cancellation Policy
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed mb-12">
              Last updated: 2026. This policy applies to orders placed with Nexbaron Digital and
              Nexbaron Print.
            </p>

            <div className="space-y-8">
              {sections.map((section) => (
                <div
                  key={section.title}
                  className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md"
                >
                  <h2 className="text-lg font-heading font-semibold text-white mb-3">
                    {section.title}
                  </h2>
                  <p className="text-sm text-slate-300 leading-relaxed">{section.body}</p>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>
      </div>
    </div>
  );
}

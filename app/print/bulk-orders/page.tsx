import { Package, Truck, BadgePercent, ShieldCheck } from "lucide-react";
import { type Metadata } from "next";

import { PageHero } from "@/components/sections/page-hero";
import { LeadForm } from "@/features/contact/components/lead-form";
import { buildWhatsAppLink } from "@/lib/divisions";
import { divisionOpenGraph, divisionTwitter } from "@/lib/og";

export const metadata: Metadata = {
  title: "Bulk Orders & Commercial Pricing | Nexbaron Print",
  description:
    "Bulk printing and commercial pricing for offices, events, real estate, and brands. Get dedicated pricing, faster turnaround, and delivery at scale from Nexbaron Print.",
  openGraph: {
    title: "Bulk Orders | Nexbaron Print",
    description: "Commercial bulk printing with dedicated pricing and delivery at scale.",
    ...divisionOpenGraph("print"),
  },
  twitter: divisionTwitter("print"),
};

const benefits = [
  {
    icon: BadgePercent,
    title: "Slab pricing",
    description: "Better per-unit pricing as quantities scale — from 500 to 50,000+ units.",
  },
  {
    icon: Truck,
    title: "Delivery at scale",
    description: "Multi-location delivery and scheduled dispatches for branches and events.",
  },
  {
    icon: Package,
    title: "Dedicated manager",
    description: "A single point of contact for specs, proofs, and delivery coordination.",
  },
  {
    icon: ShieldCheck,
    title: "Quality guarantee",
    description: "Every batch passes the same quality-control gates as our single orders.",
  },
];

export default function PrintBulkOrdersPage() {
  return (
    <div className="relative overflow-hidden">
      <PageHero
        accent="print"
        eyebrow="Bulk & Commercial"
        title="Commercial Pricing for"
        highlight="Orders at Scale"
        description="Offices, real estate, events, and brands print in volume. Get dedicated slab pricing, faster turnaround, and managed delivery — with one accountable partner."
        primaryCta={{
          label: "Chat About Bulk Pricing",
          href: buildWhatsAppLink(
            "print",
            "Hi Nexbaron Print, I need bulk printing and want commercial pricing",
          ),
          external: true,
        }}
        secondaryCta={{ label: "View Specifications", href: "/print/specifications" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <section className="py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-amber-500/40 transition-all backdrop-blur-md"
                >
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 w-fit mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-heading font-semibold text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-16 border-t border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5">
              <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
                <h2 className="text-xl font-heading font-bold text-white mb-4">
                  What We Print in Bulk
                </h2>
                <ul className="space-y-3">
                  {[
                    "Visiting cards & letterheads for whole teams",
                    "Pamphlets & posters for launches and sales",
                    "Bill books & business forms for retail chains",
                    "Tags, files & labels for product lines",
                    "Branded pens & ATM pouches for giveaways",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Average bulk turnaround is 24–72 hours depending on volume. Ask about scheduled
                    repeat dispatches.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <LeadForm
                division="print"
                heading="Request Bulk Pricing"
                subheading="Tell us the volume and deadline — we'll come back with commercial pricing within hours."
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

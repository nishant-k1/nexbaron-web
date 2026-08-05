import { Printer, Clock, Shield, Truck, Palette, Ruler } from "lucide-react";
import { type Metadata } from "next";

import { SectionReveal } from "@/components/motion/section-reveal";
import { CTABanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { divisionOpenGraph, divisionTwitter } from "@/lib/og";

export const metadata: Metadata = {
  title: "About Us | Nexbaron Print",
  description:
    "Nexbaron Print manufactures premium visiting cards, brochures, flex banners, signage, and more. Quality checked, delivered on time, at honest prices.",
  openGraph: {
    title: "About Nexbaron Print",
    description: "Premium commercial printing — quality checked, delivered on time.",
    ...divisionOpenGraph("print"),
  },
  twitter: divisionTwitter("print"),
};

const values = [
  {
    icon: Printer,
    title: "Premium Quality",
    description:
      "From paper stock to finish, every print order is quality checked before it leaves. No compromises, no shortcuts.",
  },
  {
    icon: Palette,
    title: "Any Spec, Any Finish",
    description:
      "Matte, gloss, spot UV, foil stamping, die-cut — you name it. We manufacture exactly what your brand needs.",
  },
  {
    icon: Ruler,
    title: "Precision Manufacturing",
    description:
      "Every cut, fold, and bleed is measured to spec. Your artwork comes out exactly as designed — crisp, aligned, and professional.",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description:
      "We commit to a delivery date and stick to it. Whether it's 500 cards or 5,000 brochures, your order arrives when promised.",
  },
  {
    icon: Truck,
    title: "Pan-India Shipping",
    description:
      "We ship to every pincode in India. No matter where your business is, your print materials reach you — securely packed.",
  },
  {
    icon: Shield,
    title: "Honest Pricing",
    description:
      "Transparent quotes with no hidden costs. You know exactly what you're paying before we start printing.",
  },
];

export default function PrintAboutPage() {
  return (
    <div className="relative overflow-hidden">
      <PageHero
        accent="print"
        eyebrow="About Us"
        title="About Nexbaron"
        highlight="Print"
        description="We manufacture premium print collateral for businesses across India — visiting cards, brochures, signage, and everything your brand needs to stand out."
      />

      {/* Mission */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
                Why We Started Nexbaron Print
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed mb-4">
                Getting business cards or brochures printed shouldn&apos;t mean chasing vendors,
                negotiating prices, and hoping the quality turns out okay. We&apos;ve all been
                there.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                Nexbaron Print exists to make commercial printing simple, reliable, and
                high-quality. You tell us what you need — we quote honestly, manufacture to spec,
                and deliver on time. Every single order.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* What we believe */}
      <section className="py-16 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-12 text-center">
              What We Believe
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <div
                    key={value.title}
                    className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-amber-500/30 transition-colors"
                  >
                    <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 w-fit mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-heading font-bold text-white mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </SectionReveal>
        </div>
      </section>

      <CTABanner
        accent="print"
        title="Need something printed?"
        description="Tell us what you need and we'll get back with a clear quote — same day."
        ctaLabel="Get a Quote"
        href="/print/contact"
      />
    </div>
  );
}

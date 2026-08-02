import { CheckCircle2, FileText, Layers, Sparkles, Truck } from "lucide-react";
import { type Metadata } from "next";

import { CTABanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { divisionOpenGraph, divisionTwitter } from "@/lib/og";

export const metadata: Metadata = {
  title: "Paper Stocks & Finish Options | Nexbaron Print",
  description:
    "Understand our paper stocks, finishing options, and production turnaround before you order — premium commercial printing from Nexbaron Print.",
  openGraph: {
    title: "Specifications | Nexbaron Print",
    description: "Paper stocks, finishes, and production standards from Nexbaron Print.",
    ...divisionOpenGraph("print"),
  },
  twitter: divisionTwitter("print"),
};

const stocks = [
  {
    name: "350 GSM Matte Premium",
    use: "Visiting cards, business stationery",
    note: "Signature premium card stock",
  },
  { name: "350 GSM Gloss", use: "Cards & catalogs needing shine", note: "High-shine, vivid color" },
  { name: "Textured Metallic", use: "Luxury cards & invitations", note: "Foil-friendly surface" },
  { name: "Art Paper 90–170 GSM", use: "Brochures, flyers, posters", note: "Crisp reproduction" },
  {
    name: "Star Flex (Weatherproof)",
    use: "Outdoor banners & hoardings",
    note: "UV + rain resistant",
  },
  { name: "Vinyl & PVC", use: "Signage, wraps, cut-outs", note: "Durable & flexible" },
];

const finishes = [
  { name: "Spot UV", detail: "Glossy highlight on matte surfaces" },
  { name: "Gold / Silver Foil", detail: "Metallic prestige detailing" },
  { name: "Matte / Gloss Lamination", detail: "Protection + premium feel" },
  { name: "Embossing / Debossing", detail: "Raised or recessed texture" },
  { name: "Edge Painting", detail: "Colored card edges for luxury" },
  { name: "Die-Cutting", detail: "Custom shapes & foldouts" },
];

const process = [
  {
    icon: FileText,
    step: "01",
    title: "Specify Your Order",
    description: "Choose product, stock, size, and quantity in the quote builder.",
  },
  {
    icon: Layers,
    step: "02",
    title: "Design Check",
    description: "Our team reviews your artwork and suggests improvements — free.",
  },
  {
    icon: CheckCircle2,
    step: "03",
    title: "Proof Approval",
    description: "You approve a digital proof before anything goes to press.",
  },
  {
    icon: Sparkles,
    step: "04",
    title: "Print & QC",
    description: "Production on calibrated presses with strict quality checks.",
  },
  {
    icon: Truck,
    step: "05",
    title: "Express Delivery",
    description: "24-hour express on stock items, or doorstep delivery nationwide.",
  },
];

export default function PrintSpecificationsPage() {
  return (
    <div className="relative overflow-hidden">
      <PageHero
        accent="print"
        eyebrow="Specifications"
        title="Stocks, Finishes &"
        highlight="Production Standards"
        description="Know exactly what you're getting. Every material and finish below is quality-checked before it reaches your hands."
        primaryCta={{ label: "Build My Quote", href: "/print/quote" }}
        secondaryCta={{ label: "Browse Products", href: "/print/products" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <section className="py-16">
          <SectionHeading
            accent="print"
            eyebrow="Paper & Materials"
            title="Premium Paper Stocks"
            description="From 350 GSM business cards to weatherproof outdoor flex."
          />
          <div className="space-y-4">
            {stocks.map((stock) => (
              <div
                key={stock.name}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-amber-500/40 transition-all backdrop-blur-md grid grid-cols-1 md:grid-cols-3 gap-4 items-center"
              >
                <div>
                  <h3 className="text-base font-heading font-semibold text-white">{stock.name}</h3>
                  <span className="text-[10px] font-mono text-amber-300 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 inline-block mt-1">
                    {stock.note}
                  </span>
                </div>
                <p className="text-sm text-slate-300 md:col-span-2">{stock.use}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 border-t border-white/10">
          <SectionHeading
            accent="print"
            eyebrow="Finishing"
            title="Finishing Options"
            description="Finishes that turn a good print into a premium brand experience."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {finishes.map((finish) => (
              <div
                key={finish.name}
                className="p-6 rounded-xl bg-white/[0.02] border border-white/10 hover:border-amber-500/30 transition-all"
              >
                <h3 className="text-base font-semibold text-white mb-1">{finish.name}</h3>
                <p className="text-xs text-slate-400">{finish.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 border-t border-white/10">
          <SectionHeading
            accent="print"
            eyebrow="Production Flow"
            title="From Order to Doorstep"
            description="Five steps, fully quality-controlled, with express turnaround available."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {process.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-slate-500">{item.step}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <CTABanner
          accent="print"
          title="Ready to Order?"
          description="Express 24-hour turnaround available on stock items. Build your quote now."
          ctaLabel="Build Instant Quote"
          href="/print/quote"
        />
      </div>
    </div>
  );
}

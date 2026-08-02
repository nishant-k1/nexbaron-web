import { Printer, Calculator, ArrowRight } from "lucide-react";
import { type Metadata } from "next";
import Link from "next/link";

import { SectionReveal } from "@/components/motion/section-reveal";
import { Button } from "@/components/ui/button";
import { printProducts } from "@/lib/data/print-products";

export const metadata: Metadata = {
  title: "Nexbaron Print | Visiting Cards, Letterheads, Bill Books & More",
  description:
    "Nexbaron Print delivers premium commercial printing: visiting cards, card holders, pamphlets & posters, letterheads, envelopes, bill books, stickers & labels, pens, and specialty print.",
  openGraph: {
    title: "Nexbaron Print | Premium Commercial Printing",
    description:
      "14 print services from visiting cards to bill books, stickers, and specialty products.",
  },
};

const featuredSlugs = [
  "visiting-cards",
  "card-holders",
  "pamphlets-posters",
  "stickers-labels",
  "bill-books",
  "pens",
];

export default function PrintLandingPage() {
  const featured = featuredSlugs
    .map((slug) => printProducts.find((p) => p.slug === slug))
    .filter((p): p is (typeof printProducts)[number] => Boolean(p));

  return (
    <div className="relative pt-32 pb-24 md:pt-40 md:pb-36 overflow-hidden">
      {/* Background Ambient Warm Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-500/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Print Hero */}
        <SectionReveal>
          <div className="max-w-4xl mx-auto text-center space-y-8 mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 backdrop-blur-md">
              <Printer className="w-4 h-4 text-amber-400" />
              <span className="text-xs uppercase font-mono tracking-widest text-amber-300 font-semibold">
                Nexbaron Print Services
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white leading-tight">
              Premium Printing for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-amber-500">
                Every Business Need
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              From visiting cards and letterheads to bill books, stickers, and specialty print — 14
              print services under one roof, finished to a premium standard.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Button
                asChild
                size="lg"
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-8 py-6 rounded-xl shadow-lg shadow-amber-500/20"
              >
                <Link href="/print/quote" className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Instant Custom Quote Builder
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 px-8 py-6 rounded-xl backdrop-blur-md"
              >
                <Link href="/print/products">View Full Catalog</Link>
              </Button>
            </div>

            {/* Quick Metrics */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 text-center max-w-3xl mx-auto">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-2xl font-bold text-amber-400 font-mono">500,000+</div>
                <div className="text-xs text-slate-400">Cards Printed</div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-2xl font-bold text-orange-400 font-mono">14</div>
                <div className="text-xs text-slate-400">Print Services</div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-2xl font-bold text-amber-300 font-mono">24 Hours</div>
                <div className="text-xs text-slate-400">Express Delivery</div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-2xl font-bold text-yellow-400 font-mono">100%</div>
                <div className="text-xs text-slate-400">Quality Match</div>
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* Product Catalog Grid */}
        <section id="products" className="py-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-mono tracking-widest text-amber-400 font-semibold px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 inline-block mb-3">
              Catalog Highlights
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
              Commercial Print Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featured.map((prod) => {
              const Icon = prod.icon;
              return (
                <Link
                  key={prod.slug}
                  href={`/print/products/${prod.slug}`}
                  className="group p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-amber-500/40 transition-all duration-300 backdrop-blur-md hover:bg-white/[0.06]"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono text-amber-300 px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/20">
                      {prod.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-heading font-semibold text-white mb-3">
                    {prod.name}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed mb-6">{prod.description}</p>

                  <span className="inline-flex items-center text-xs font-semibold text-amber-400 group-hover:text-amber-300">
                    View Details & Get a Quote
                    <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/print/products"
              className="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300"
            >
              Browse all 14 print services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Instant Quote CTA */}
        <section className="mt-16 p-10 rounded-3xl bg-gradient-to-r from-amber-500/20 via-orange-500/10 to-slate-950 border border-amber-500/30 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-heading font-bold text-white">
              Need Bulk Printing or a Custom Quote?
            </h2>
            <p className="text-sm text-slate-300">
              Use our instant quote builder to select product, quantity, stock, and finishing
              options for an instant estimate.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-8"
            >
              <Link href="/print/quote">Launch Interactive Print Calculator</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}

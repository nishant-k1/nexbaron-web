import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionReveal } from "@/components/motion/section-reveal";
import {
  Printer,
  Calculator,
  CheckCircle2,
  ArrowRight,
  Package,
  Layers,
  Sparkles,
  ShieldCheck,
  FileText,
  Building2,
  Award,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Nexbaron Print | Visiting Cards, Flex Banners, Vinyl & Office Branding",
  description:
    "Nexbaron Print Division delivers high-quality commercial printing solutions: visiting cards, brochures, flyers, flex banners, vinyl prints, acrylic signboards, and office exhibition branding.",
  openGraph: {
    title: "Nexbaron Print | Physical Collaterals & Signage",
    description:
      "Premium physical marketing collateral and commercial printing powerhouse.",
  },
};

const printProducts = [
  {
    icon: FileText,
    title: "Visiting Cards & Stationeries",
    desc: "350 GSM matte/gloss cards, spot UV, gold foil, metallic finishes, and executive letterheads.",
    badge: "Most Popular",
  },
  {
    icon: Package,
    title: "Brochures, Flyers & Pamphlets",
    desc: "Tri-fold, bi-fold, and multi-page corporate catalogs printed on high-density paper stock.",
    badge: "Bulk Pricing Available",
  },
  {
    icon: Layers,
    title: "Flex Banners & Vinyl Graphics",
    desc: "Heavy-duty outdoor flex banners, star flex, frosted glass vinyls, and vehicle wraps.",
    badge: "Weatherproof Ink",
  },
  {
    icon: Building2,
    title: "Acrylic Boards & Office Branding",
    desc: "LED backlit acrylic signages, 3D metal letters, office wall wraps, and reception displays.",
    badge: "Turnkey Installation",
  },
];

export default function PrintLandingPage() {
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
                Nexbaron Print Infrastructure
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white leading-tight">
              Premium Commercial{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-amber-500">
                Print & Office Branding
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Elevate your physical brand presence. From high-grade visiting cards and marketing brochures to massive outdoor flex banners and 3D acrylic office signboards.
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
                <Link href="#products">View Print Catalog</Link>
              </Button>
            </div>

            {/* Quick Metrics */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 text-center max-w-3xl mx-auto">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-2xl font-bold text-amber-400 font-mono">500,000+</div>
                <div className="text-xs text-slate-400">Cards Printed</div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-2xl font-bold text-orange-400 font-mono">24 Hours</div>
                <div className="text-xs text-slate-400">Express Delivery</div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-2xl font-bold text-amber-300 font-mono">350 GSM</div>
                <div className="text-xs text-slate-400">Premium Stock</div>
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
              Commercial Print Products
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {printProducts.map((prod, idx) => {
              const Icon = prod.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-amber-500/40 transition-all duration-300 backdrop-blur-md hover:bg-white/[0.06] group"
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
                    {prod.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {prod.desc}
                  </p>

                  <Link
                    href="/print/quote"
                    className="inline-flex items-center text-xs font-semibold text-amber-400 hover:text-amber-300"
                  >
                    Configure Dimensions & Quantity <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        {/* Instant Quote CTA */}
        <section className="mt-16 p-10 rounded-3xl bg-gradient-to-r from-amber-500/20 via-orange-500/10 to-slate-950 border border-amber-500/30 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-heading font-bold text-white">
              Need Bulk Printing or Custom Dimensions?
            </h2>
            <p className="text-sm text-slate-300">
              Use our instant quote builder to select paper stock, square footage, lamination, and finishing options.
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

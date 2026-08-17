import { ArrowRight, Calculator } from "lucide-react";
import { type Metadata } from "next";
import Link from "next/link";

import { CTABanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { getPrintCatalog, getProductIcon } from "@/features/print/catalog";
import { divisionOpenGraph, divisionTwitter } from "@/lib/og";

export const metadata: Metadata = {
  title: "Printing Services | Nexbaron Print",
  description:
    "The Nexbaron Print catalog: visiting cards, card holders, pamphlets & posters, tags, files, letterheads, envelopes, stickers & labels, bill books, pens, and more.",
  alternates: { canonical: "/print/products" },
  openGraph: {
    title: "Printing Services | Nexbaron Print",
    description: "Complete commercial printing services from Nexbaron Print.",
    ...divisionOpenGraph("print"),
  },
  twitter: divisionTwitter("print"),
};

export default async function PrintProductsPage() {
  const catalog = await getPrintCatalog();

  return (
    <div className="relative">
      <PageHero
        accent="print"
        eyebrow="Print Catalog"
        title="Every Print Service Under"
        highlight="One Roof"
        description="From premium visiting cards to bill books, stickers, and specialty products — 14 print services, one quality standard."
        primaryCta={{
          label: "Launch Instant Quote Builder",
          href: "/print/quote",
        }}
        secondaryCta={{ label: "View Specifications", href: "/print/specifications" }}
      />

      {catalog.categories.map((category, catIdx) => (
        <section
          key={category}
          className={`min-h-screen flex items-center justify-center py-16 ${catIdx > 0 ? "" : ""}`}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-xs font-mono text-amber-400">
                {String(catIdx + 1).padStart(2, "0")}
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">{category}</h2>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {catalog.products
                .filter((product) => product.category === category)
                .map((product) => {
                  const Icon = getProductIcon(product.icon);
                  return (
                    <Link
                      key={product.slug}
                      href={`/print/products/${product.slug}`}
                      className="group relative rounded-2xl p-6 bg-white/[0.03] border border-white/10 hover:border-amber-500/40 transition-all duration-300 backdrop-blur-md hover:bg-white/[0.06] overflow-hidden flex flex-col"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-[70px] pointer-events-none group-hover:bg-amber-500/20 transition-all" />
                      <div className="flex items-center justify-between mb-5">
                        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 group-hover:scale-110 transition-transform">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-mono text-amber-300 px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/20">
                          {product.badge}
                        </span>
                      </div>
                      <h3 className="text-lg font-heading font-semibold text-white mb-2">
                        {product.label}
                      </h3>
                      <p className="text-sm text-slate-300 leading-relaxed mb-5">
                        {product.tagline}
                      </p>
                      <div className="mt-auto flex items-center justify-between">
                        <span className="inline-flex items-center text-xs font-semibold text-amber-400 group-hover:text-amber-300">
                          View Details
                          <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                        <span className="inline-flex items-center text-[11px] font-mono text-slate-400">
                          <Calculator className="w-3.5 h-3.5 mr-1.5" />
                          Quote in seconds
                        </span>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        </section>
      ))}

      <CTABanner
        accent="print"
        title="Know What You Need?"
        description="Configure product, quantity, and finishing directly in the instant quote builder."
        ctaLabel="Open Quote Builder"
        href="/print/quote"
      />
    </div>
  );
}

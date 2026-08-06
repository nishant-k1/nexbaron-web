import { CheckCircle2, Package } from "lucide-react";
import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { CTABanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { getPrintCatalog, getProductIcon, type PrintProduct } from "@/features/print/catalog";
import { divisionOpenGraph, divisionTwitter } from "@/lib/og";

interface ProductPageProps {
  params: { slug: string };
}

// Minimal static slug list for build-time generation — fetched from API at runtime
const STATIC_SLUGS = [
  "visiting-cards",
  "card-holders",
  "pamphlets-posters",
  "stickers-labels",
  "pens",
  "sample-files",
  "letter-heads",
  "envelopes",
  "files",
  "tags",
  "bill-books",
  "digital-paper-printing",
  "atm-pouches",
  "shooting-targets",
];

export function generateStaticParams() {
  return STATIC_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  try {
    const catalog = await getPrintCatalog();
    const product = catalog.products.find((p) => p.slug === params.slug);
    if (product) {
      return {
        title: `${product.label} | Nexbaron Print`,
        description: product.description,
        openGraph: {
          title: `${product.label} | Nexbaron Print`,
          description: product.description,
          ...divisionOpenGraph("print"),
        },
        twitter: divisionTwitter("print"),
      };
    }
  } catch {
    /* fall through to default */
  }
  return { title: "Print Product | Nexbaron Print" };
}

export default async function PrintProductPage({ params }: ProductPageProps) {
  let product: PrintProduct | undefined;
  try {
    const catalog = await getPrintCatalog();
    product = catalog.products.find((p) => p.slug === params.slug);
  } catch {
    // will hit notFound below
  }

  if (!product) notFound();

  const Icon = getProductIcon(product.icon);

  const detailSections = [
    { title: "Materials & Stocks", items: product.materials },
    { title: "Finishing Options", items: product.displayFinishes },
    { title: "Available Sizes", items: product.sizes },
  ];

  return (
    <div className="relative overflow-hidden">
      <PageHero
        accent="print"
        eyebrow={`Print Collaterals • ${product.badge}`}
        title={product.label}
        highlight={product.tagline}
        description={product.description}
        primaryCta={{
          label: "Get an Instant Quote",
          href: `/print/quote?product=${product.id}`,
        }}
        secondaryCta={{ label: "View Full Catalog", href: "/print/products" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <section className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {detailSections.map((section) => (
              <div
                key={section.title}
                className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-amber-500/40 transition-all duration-300 backdrop-blur-md"
              >
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 w-fit mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-heading font-semibold text-white mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 border-t border-white/10">
          <SectionHeading
            accent="print"
            eyebrow="Why Nexbaron Print"
            title="Order with Total Confidence"
            description="Every order goes through a quality-checked production flow with a design review before it reaches the press."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {product.features.map((feature) => (
              <div
                key={feature}
                className="p-6 rounded-xl bg-white/[0.02] border border-white/10 hover:border-amber-500/30 transition-all flex items-start gap-4"
              >
                <div className="p-3 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
                  <Package className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-slate-200">{feature}</span>
              </div>
            ))}
          </div>
        </section>

        <CTABanner
          accent="print"
          title={`Need ${product.label}?`}
          description="Configure dimensions, quantity, and finishing in the instant quote builder — get an estimated price in seconds."
          ctaLabel="Launch Quote Builder"
          href={`/print/quote?product=${product.id}`}
        />
      </div>
    </div>
  );
}

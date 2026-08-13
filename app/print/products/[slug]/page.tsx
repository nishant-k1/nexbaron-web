import { CheckCircle2, Package } from "lucide-react";
import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { CTABanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { getPrintCatalog, getProductIcon, type PrintProduct } from "@/features/print/catalog";
import { divisionOpenGraph, divisionTwitter } from "@/lib/og";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const catalog = await getPrintCatalog();
    const product = catalog.products.find((p) => p.slug === slug);
    if (product) {
      return {
        title: `${product.label} | Nexbaron Print`,
        description: product.description,
        alternates: { canonical: `/print/products/${slug}` },
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
  const { slug } = await params;
  let product: PrintProduct | undefined;
  try {
    const catalog = await getPrintCatalog();
    product = catalog.products.find((p) => p.slug === slug);
  } catch {
    // will hit notFound below
  }

  if (!product) notFound();

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.label,
    description: product.description,
    category: product.category,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://nexbaron.com"}/print/products/${product.slug}`,
    },
  };

  const Icon = getProductIcon(product.icon);

  const detailSections = [
    { title: "Materials & Stocks", items: product.materials },
    { title: "Finishing Options", items: product.displayFinishes },
    { title: "Available Sizes", items: product.sizes },
  ];

  return (
    <div className="relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Nexbaron Print",
                item: `${process.env.NEXT_PUBLIC_SITE_URL || "https://nexbaron.com"}/print`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Products",
                item: `${process.env.NEXT_PUBLIC_SITE_URL || "https://nexbaron.com"}/print/products`,
              },
              { "@type": "ListItem", position: 3, name: product.label },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: product.faqs.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          }),
        }}
      />
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
        {product.overview.length > 0 && (
          <section className="py-16 max-w-3xl">
            <div className="space-y-4">
              {product.overview.map((paragraph) => (
                <p key={paragraph} className="text-base md:text-lg text-slate-300 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        )}

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

        {product.howItWorks.length > 0 && (
          <section className="py-16 border-t border-white/10">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-10">
              How It Works
            </h2>
            <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {product.howItWorks.map((step, index) => (
                <li
                  key={step}
                  className="relative p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md"
                >
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-bold mb-3">
                    {index + 1}
                  </span>
                  <p className="text-sm text-slate-200 leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          </section>
        )}

        {product.faqs.length > 0 && (
          <section className="py-16 border-t border-white/10 max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-10">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {product.faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden"
                >
                  <summary className="flex items-center justify-between gap-4 cursor-pointer px-5 py-4 text-sm font-semibold text-white hover:text-amber-300 transition-colors">
                    {faq.question}
                    <span
                      className="text-amber-400 shrink-0 group-open:rotate-45 transition-transform"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>
                  <p className="px-5 pb-4 text-sm text-slate-300 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        )}

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

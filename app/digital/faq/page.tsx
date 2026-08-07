import { MessageSquare } from "lucide-react";
import { type Metadata } from "next";
import Link from "next/link";

import { CTABanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { Button } from "@/components/ui/button";
import { divisionOpenGraph, divisionTwitter } from "@/lib/og";

export const metadata: Metadata = {
  title: "Questions & Answers | Nexbaron Digital",
  description:
    "Published prices, clear timelines, and no lock-in. Answers to the questions we get most — hosting, domains, cancellation, ownership, payments, and more.",
  openGraph: {
    title: "Questions & Answers | Nexbaron Digital",
    description: "Everything you're wondering about Nexbaron Digital, answered plainly.",
    ...divisionOpenGraph("digital"),
  },
  twitter: divisionTwitter("digital"),
};

const faqs = [
  {
    question: "How long does it take to launch?",
    answer:
      "Your launch date is confirmed the moment you pay. Launch typically ships in about a week, Growth in one to two weeks, and Scale starts with a 30-day foundation phase. You'll see your exact date before you pay anything.",
  },
  {
    question: "Who writes the content?",
    answer:
      "We do. We write simple, plain-language content for your services based on a short form you fill in. You approve every page before it goes live.",
  },
  {
    question: "Is hosting included?",
    answer:
      "Yes. Hosting, your domain's SSL certificate, backups, and uptime monitoring are all included in your monthly care plan.",
  },
  {
    question: "Can I use my own domain?",
    answer:
      "Yes. You can use a domain you already own, or we'll register one for you (₹999 one-time). You own it either way.",
  },
  {
    question: "Can I cancel?",
    answer:
      "Anytime, with 30 days' notice. There's no lock-in and no cancellation fee. You keep the website we built — your content, your domain, your brand.",
  },
  {
    question: "What if I already have a website?",
    answer:
      "No problem. Our Care plans are built for you: we keep your existing site online, updated, and backed up — no rebuild required.",
  },
  {
    question: "Do you work outside Bangalore?",
    answer:
      "Yes. We work with businesses all over India. Everything happens online and on WhatsApp, and your monthly care keeps it that way.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "UPI, bank transfer, and cards. You'll get a proper invoice with GST for every payment.",
  },
  {
    question: "Who owns the website?",
    answer:
      "You do. The website, your domain, and your content are 100% yours. Even if you cancel, you keep everything.",
  },
];

export default function FAQPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PageHero
        accent="digital"
        eyebrow="Questions & Answers"
        title="Everything You're"
        highlight="Wondering."
        description="No fine print. No surprises. If you don't see your question, ask us on WhatsApp."
        secondaryCta={{ label: "Talk to Us", href: "/digital/contact" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <section>
          <div className="max-w-3xl mx-auto divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.02]">
            {faqs.map((faq) => (
              <details key={faq.question} className="group px-6 py-5">
                <summary className="flex items-center justify-between cursor-pointer list-none text-sm font-semibold text-white hover:text-teal-300 transition-colors">
                  {faq.question}
                  <span className="text-teal-400 text-xl font-light leading-none group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="text-sm text-slate-400 leading-relaxed pt-3">{faq.answer}</p>
              </details>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="cursor-pointer border-white/20 text-white hover:bg-white/10 px-8 rounded-xl backdrop-blur-md"
            >
              <Link
                href="/digital/contact"
                className="inline-flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Ask Us on WhatsApp
              </Link>
            </Button>
          </div>
        </section>

        <CTABanner
          accent="digital"
          title="Ready to start?"
          description="Published prices, clear timelines, and no lock-in. Pick a plan and everything on these pages is exactly what you get."
          ctaLabel="See Pricing"
          href="/digital/pricing"
        />
      </div>
    </div>
  );
}

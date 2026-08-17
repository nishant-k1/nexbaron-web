import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { accent, type Accent } from "@/lib/accents";

interface CTABannerProps {
  accent: Accent;
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
  external?: boolean;
}

export function CTABanner({
  accent: a,
  title,
  description,
  ctaLabel,
  href,
  external,
}: CTABannerProps) {
  const classes = accent[a];

  return (
    <section
      className={`min-h-screen flex items-center justify-center p-10 rounded-3xl bg-gradient-to-r ${classes.bannerGradient} text-center relative overflow-hidden`}
    >
      <div className="max-w-2xl mx-auto space-y-6">
        <h2 className="text-3xl font-heading font-bold text-white">{title}</h2>
        <p className="text-sm text-slate-300">{description}</p>
        <Button
          asChild
          size="lg"
          className={`${classes.button} font-bold px-8 rounded-xl shadow-lg`}
        >
          {external ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              {ctaLabel}
              <ArrowRight className="w-5 h-5" />
            </a>
          ) : (
            <Link href={href} className="inline-flex items-center gap-2">
              {ctaLabel}
              <ArrowRight className="w-5 h-5" />
            </Link>
          )}
        </Button>
      </div>
    </section>
  );
}

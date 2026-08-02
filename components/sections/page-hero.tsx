import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { SectionReveal } from "@/components/motion/section-reveal";
import { Button } from "@/components/ui/button";
import { accent, type Accent } from "@/lib/accents";

interface PageHeroProps {
  accent: Accent;
  eyebrow: string;
  title: string;
  highlight?: string;
  description: string;
  primaryCta?: { label: string; href: string; external?: boolean };
  secondaryCta?: { label: string; href: string };
}

export function PageHero({
  accent: a,
  eyebrow,
  title,
  highlight,
  description,
  primaryCta,
  secondaryCta,
}: PageHeroProps) {
  const classes = accent[a];

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
      <div
        className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] ${classes.glow} rounded-full blur-[150px] pointer-events-none`}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionReveal>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-md ${classes.pill}`}
            >
              <span className="text-xs uppercase font-mono tracking-widest font-semibold">
                {eyebrow}
              </span>
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white leading-tight">
              {title}{" "}
              {highlight && (
                <span
                  className={`text-transparent bg-clip-text bg-gradient-to-r ${classes.gradientText}`}
                >
                  {highlight}
                </span>
              )}
            </h1>
            <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
            {(primaryCta || secondaryCta) && (
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
                {primaryCta && (
                  <Button
                    asChild
                    size="lg"
                    className={`${classes.button} font-bold px-8 py-6 rounded-xl shadow-lg`}
                  >
                    {primaryCta.external ? (
                      <a
                        href={primaryCta.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        {primaryCta.label}
                        <ArrowRight className="w-5 h-5" />
                      </a>
                    ) : (
                      <Link href={primaryCta.href} className="flex items-center gap-2">
                        {primaryCta.label}
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    )}
                  </Button>
                )}
                {secondaryCta && (
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 px-8 py-6 rounded-xl backdrop-blur-md"
                  >
                    <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
                  </Button>
                )}
              </div>
            )}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

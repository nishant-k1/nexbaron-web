import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

import { SectionReveal } from "@/components/motion/section-reveal";
import { Button } from "@/components/ui/button";
import { accent, type Accent } from "@/lib/accents";

interface FeatureSectionProps {
  accent: Accent;
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  description: string;
  features: string[];
  deliverables?: string[];
  cta: { label: string; href: string; external?: boolean };
  icon?: React.ElementType;
}

export function FeatureSection({
  accent: a,
  id,
  index,
  eyebrow,
  title,
  description,
  features,
  deliverables,
  cta,
  icon: Icon,
}: FeatureSectionProps) {
  const classes = accent[a];

  return (
    <section id={id} className="py-16 border-t border-white/10 scroll-mt-28">
      <SectionReveal>
        <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-8 lg:p-12 backdrop-blur-xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-10 items-start shadow-2xl">
          <div
            className={`absolute top-0 right-0 w-96 h-96 ${classes.glow} rounded-full blur-[120px] pointer-events-none`}
          />

          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              {Icon && (
                <div className={`p-3 rounded-xl border ${classes.cardIcon}`}>
                  <Icon className="w-6 h-6" />
                </div>
              )}
              <span className="text-xs font-mono text-slate-500">{index}</span>
            </div>
            <span
              className={`text-xs uppercase tracking-wider font-mono font-semibold ${classes.text}`}
            >
              {eyebrow}
            </span>
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-white leading-tight">
              {title}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">{description}</p>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((feature) => (
                <div key={feature} className="flex items-start gap-2.5">
                  <CheckCircle2 className={`w-5 h-5 ${classes.text} shrink-0 mt-0.5`} />
                  <span className="text-sm text-slate-200">{feature}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Button
                asChild
                size="lg"
                className={`${classes.button} font-bold px-8 rounded-xl shadow-lg`}
              >
                {cta.external ? (
                  <a
                    href={cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    {cta.label}
                    <ArrowRight className="w-5 h-5" />
                  </a>
                ) : (
                  <Link href={cta.href} className="inline-flex items-center gap-2">
                    {cta.label}
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                )}
              </Button>
            </div>
          </div>

          {deliverables && deliverables.length > 0 && (
            <div className="lg:col-span-5 rounded-2xl bg-white/[0.04] border border-white/10 p-8 space-y-6">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${classes.stat}`} />
                Key Deliverables
              </h4>
              <ul className="space-y-4">
                {deliverables.map((item) => (
                  <li
                    key={item}
                    className="p-4 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between"
                  >
                    <span className="text-sm font-medium text-slate-200">{item}</span>
                    <span
                      className={`text-xs font-mono ${classes.text} px-2 py-0.5 rounded border ${classes.chip}`}
                    >
                      Verified
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </SectionReveal>
    </section>
  );
}

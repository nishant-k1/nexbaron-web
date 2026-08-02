import { accent, type Accent } from "@/lib/accents";

interface SectionHeadingProps {
  accent: Accent;
  eyebrow: string;
  title: string;
  description?: string;
}

export function SectionHeading({ accent: a, eyebrow, title, description }: SectionHeadingProps) {
  const classes = accent[a];

  return (
    <div className="text-center max-w-2xl mx-auto mb-12">
      <span
        className={`text-xs uppercase font-mono tracking-widest font-semibold px-3 py-1 rounded-full border inline-block mb-3 ${classes.chip}`}
      >
        {eyebrow}
      </span>
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">{title}</h2>
      {description && <p className="text-sm text-slate-300 leading-relaxed mt-3">{description}</p>}
    </div>
  );
}

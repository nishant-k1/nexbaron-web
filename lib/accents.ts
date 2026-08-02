export type Accent = "digital" | "print";

export const accent = {
  digital: {
    text: "text-teal-400",
    textStrong: "text-teal-300",
    gradientText: "from-teal-300 via-cyan-300 to-blue-400",
    pill: "bg-teal-500/10 border-teal-500/30 text-teal-300",
    chip: "bg-teal-500/10 border-teal-500/20 text-teal-300",
    cardIcon: "bg-teal-500/10 border-teal-500/30 text-teal-400",
    button: "bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-teal-500/20",
    link: "text-teal-400 hover:text-teal-300",
    glow: "bg-teal-500/15",
    border: "border-teal-500/30",
    hoverBorder: "hover:border-teal-500/40",
    bannerGradient: "from-teal-500/20 via-cyan-500/10 to-slate-950",
    stat: "text-teal-400",
  },
  print: {
    text: "text-amber-400",
    textStrong: "text-amber-300",
    gradientText: "from-amber-300 via-orange-400 to-amber-500",
    pill: "bg-amber-500/10 border-amber-500/30 text-amber-300",
    chip: "bg-amber-500/10 border-amber-500/20 text-amber-300",
    cardIcon: "bg-amber-500/10 border-amber-500/30 text-amber-400",
    button: "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20",
    link: "text-amber-400 hover:text-amber-300",
    glow: "bg-amber-500/15",
    border: "border-amber-500/30",
    hoverBorder: "hover:border-amber-500/40",
    bannerGradient: "from-amber-500/20 via-orange-500/10 to-slate-950",
    stat: "text-amber-400",
  },
} as const;

export type AccentClasses = (typeof accent)[Accent];

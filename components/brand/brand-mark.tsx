interface BrandMarkProps {
  variant?: "corporate" | "digital" | "print";
  className?: string;
}

const variants = {
  corporate: {
    tile: "bg-gradient-to-tr from-teal-500 to-amber-500",
    stroke: "#94a3b8",
  },
  digital: {
    tile: "bg-gradient-to-tr from-teal-500 to-cyan-400",
    stroke: "#ffffff",
  },
  print: {
    tile: "bg-gradient-to-tr from-amber-500 to-orange-500",
    stroke: "#ffffff",
  },
};

export function BrandMark({ variant = "corporate", className = "" }: BrandMarkProps) {
  const v = variants[variant];

  return (
    <div
      className={`w-10 h-10 rounded-xl ${v.tile} p-0.5 shadow-lg transition-transform group-hover:scale-105 ${className}`}
    >
      <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
          <g
            fill="none"
            stroke={v.stroke}
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5.5 4 V20" />
            <path d="M18.5 4 V20" />
            <path d="M5.5 4 L18.5 20" />
          </g>
        </svg>
      </div>
    </div>
  );
}

import { useId } from "react";

interface BrandMarkProps {
  variant?: "corporate" | "digital" | "print";
  className?: string;
}

const variants = {
  corporate: {
    tile: "bg-gradient-to-tr from-slate-700 via-teal-500 to-amber-500",
    glyph: {
      from: "#2dd4bf",
      to: "#f59e0b",
    },
  },
  digital: {
    tile: "bg-gradient-to-tr from-teal-500 to-cyan-400",
    glyph: null,
  },
  print: {
    tile: "bg-gradient-to-tr from-amber-500 to-orange-500",
    glyph: null,
  },
};

export function BrandMark({ variant = "corporate", className = "" }: BrandMarkProps) {
  const id = useId();
  const v = variants[variant];

  return (
    <div
      className={`w-10 h-10 rounded-xl ${v.tile} p-0.5 shadow-lg transition-transform group-hover:scale-105 ${className}`}
    >
      <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
          {v.glyph && (
            <defs>
              <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor={v.glyph.from} />
                <stop offset="1" stopColor={v.glyph.to} />
              </linearGradient>
            </defs>
          )}
          <g
            fill="none"
            stroke={v.glyph ? `url(#${id})` : "#ffffff"}
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

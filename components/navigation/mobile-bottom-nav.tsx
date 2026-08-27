"use client";

import { Calculator, FileText, Home, Layers, Monitor, Printer } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type BottomNavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  active?: boolean;
  primary?: boolean;
};

export function MobileBottomNav() {
  const pathname = usePathname();
  const isDigital = pathname.startsWith("/digital");
  const isPrint = pathname.startsWith("/print");

  const items: BottomNavItem[] = isDigital
    ? [
        { href: "/digital", label: "Home", icon: Home, active: pathname === "/digital" },
        {
          href: "/digital/solutions",
          label: "Services",
          icon: Layers,
          active: pathname.startsWith("/digital/solutions"),
        },
        {
          href: "/digital/pricing",
          label: "Pricing",
          icon: FileText,
          active: pathname.startsWith("/digital/pricing"),
          primary: true,
        },
        { href: "/print", label: "Print", icon: Printer, active: false },
      ]
    : isPrint
      ? [
          { href: "/print", label: "Home", icon: Home, active: pathname === "/print" },
          {
            href: "/print/products",
            label: "Catalog",
            icon: Layers,
            active: pathname.startsWith("/print/products"),
          },
          {
            href: "/print/quote",
            label: "Quote",
            icon: Calculator,
            active: pathname.startsWith("/print/quote"),
            primary: true,
          },
          { href: "/digital", label: "Digital", icon: Monitor, active: false },
        ]
      : [
          { href: "/", label: "Home", icon: Home, active: pathname === "/" },
          { href: "/digital", label: "Digital", icon: Monitor, active: false },
          { href: "/print", label: "Print", icon: Printer, active: false },
          { href: "/about", label: "About", icon: FileText, active: pathname === "/about" },
        ];

  return (
    <nav
      aria-label="Mobile navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-xl border-t border-white/10 pb-[env(safe-area-inset-bottom)]"
    >
      <div className="flex items-center justify-around px-2 py-2">
        {items.map(({ href, label, icon: Icon, active, primary }) => (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`flex flex-col items-center justify-center gap-1 px-3 py-1.5 rounded-xl min-w-[56px] transition-colors ${
              primary
                ? isPrint
                  ? "bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20"
                  : "bg-teal-500 text-slate-950 font-bold shadow-lg shadow-teal-500/20"
                : active
                  ? isPrint
                    ? "text-amber-400 bg-amber-500/10"
                    : "text-teal-400 bg-teal-500/10"
                  : "text-slate-400 hover:text-white"
            }`}
          >
            <Icon
              className={`w-5 h-5 ${active || primary ? "scale-110" : ""} transition-transform`}
            />
            <span className="text-[10px] font-medium tracking-wide">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

export function StickyBottomCTA() {
  return null;
}

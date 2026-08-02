"use client";

import Link from "next/link";
import { Printer, Calculator, PhoneCall, Package } from "lucide-react";

const printLinks = {
  products: [
    { href: "/print/products/visiting-cards", label: "Visiting Cards & Stationeries" },
    { href: "/print/products/collaterals", label: "Brochures, Flyers & Posters" },
    { href: "/print/products/signage", label: "Flex Banners & Vinyl Prints" },
    { href: "/print/products/office-branding", label: "Acrylic Boards & Office Branding" },
    { href: "/print/products/exhibitions", label: "Exhibition Standees & Backdrops" },
  ],
  services: [
    { href: "/print/quote", label: "Instant Custom Print Calculator" },
    { href: "/print/specifications", label: "Paper Stocks & Finish Options" },
    { href: "/print/bulk-orders", label: "Bulk Commercial Pricing" },
  ],
};

export function PrintFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative text-slate-300 mt-auto border-t border-amber-500/20 bg-slate-950/90 backdrop-blur-xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/print" className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <Printer className="w-5 h-5" />
              </div>
              <span className="text-xl font-heading font-bold text-white tracking-tight">
                Nexbaron <span className="text-amber-400 font-mono text-sm">PRINT</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Premium physical marketing collaterals, visiting cards, flex banners, vinyl prints, acrylic signages, and corporate office branding for commercial enterprises.
            </p>
            <div className="pt-2">
              <Link
                href="/print/quote"
                className="text-xs font-mono font-medium px-3.5 py-2 rounded-lg bg-amber-500 text-slate-950 hover:bg-amber-400 font-bold transition-all inline-flex items-center gap-1.5"
              >
                <Calculator className="w-4 h-4" />
                Launch Instant Print Quote
              </Link>
            </div>
          </div>

          {/* Print Products */}
          <div>
            <h4 className="text-xs uppercase font-mono font-semibold text-amber-400 tracking-wider mb-4">
              Print Catalog
            </h4>
            <ul className="space-y-2.5">
              {printLinks.products.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-xs text-slate-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Specifications & Tools */}
          <div>
            <h4 className="text-xs uppercase font-mono font-semibold text-amber-400 tracking-wider mb-4">
              Quote & Specifications
            </h4>
            <ul className="space-y-2.5">
              {printLinks.services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-xs text-slate-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Division Switch */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-mono font-semibold text-slate-400 tracking-wider">
              Looking for Websites?
            </h4>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
              <span className="text-xs font-medium text-white block">Need Digital Marketing & Web Apps?</span>
              <p className="text-[11px] text-slate-400">Websites, Google Business Profile, WhatsApp CRM, and SEO.</p>
              <Link
                href="/digital"
                className="inline-block text-xs font-mono text-teal-400 hover:underline pt-1"
              >
                Go to Nexbaron Digital Division ↗
              </Link>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {currentYear} Nexbaron Print Division (Nexbaron Private Limited). All rights reserved.</p>
          <div className="flex items-center gap-4 font-mono text-[11px]">
            <Link href="/privacy" className="hover:text-slate-300">Privacy Policy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-slate-300">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

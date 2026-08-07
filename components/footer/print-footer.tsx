"use client";

import { Printer, Calculator } from "lucide-react";
import Link from "next/link";

import { SocialLinks } from "./social-links";

const printLinks = {
  products: [
    { href: "/print/products/visiting-cards", label: "Visiting Cards" },
    { href: "/print/products/card-holders", label: "Card Holders" },
    { href: "/print/products/pamphlets-posters", label: "Pamphlets & Posters" },
    { href: "/print/products/letter-heads", label: "Letterheads & Envelopes" },
    { href: "/print/products/stickers-labels", label: "Stickers & Labels" },
    { href: "/print/products/bill-books", label: "Bill Books" },
  ],
  services: [
    { href: "/print/quote", label: "Instant Custom Print Calculator" },
    { href: "/print/specifications", label: "Paper Stocks & Finish Options" },
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
              Premium physical marketing collaterals: visiting cards, card holders, pamphlets &
              posters, tags, files, letterheads, envelopes, bill books, stickers & labels, branded
              pens and more.
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
            <div className="pt-3 space-y-1.5">
              <address className="text-xs text-slate-400 not-italic">
                Begusarai, Bihar - 851101
              </address>
              <a href="tel:+919899752254" className="text-xs text-amber-400 hover:text-amber-300">
                +91 98997 52254
              </a>
            </div>
            <div className="pt-2">
              <SocialLinks division="print" />
            </div>
          </div>

          {/* Print Products */}
          <nav aria-label="Print products">
            <h3 className="text-xs uppercase font-mono font-semibold text-amber-400 tracking-wider mb-4">
              Print Catalog
            </h3>
            <ul className="space-y-2.5">
              {printLinks.products.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Specifications & Tools */}
          <nav aria-label="Quote and specifications">
            <h3 className="text-xs uppercase font-mono font-semibold text-amber-400 tracking-wider mb-4">
              Quote & Specifications
            </h3>
            <ul className="space-y-2.5">
              {printLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Division Switch */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase font-mono font-semibold text-slate-400 tracking-wider">
              Looking for Websites?
            </h3>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
              <span className="text-xs font-medium text-white block">
                Need Digital Marketing & Web Apps?
              </span>
              <p className="text-[11px] text-slate-400">
                Websites, Google Business Profile, WhatsApp CRM, and SEO.
              </p>
              <Link
                href="/digital"
                className="inline-block text-xs font-mono text-teal-400 hover:underline pt-1"
              >
                Go to Nexbaron Digital Division ↗
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs text-slate-500">
            <div className="space-y-1">
              <p>
                © {currentYear} Nexbaron Print Division (Nexbaron Private Limited). All rights
                reserved.
              </p>
              <p className="text-[11px] text-slate-600">GSTIN: 10AAKCN1234E1Z6</p>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px]">
              <a href="mailto:print@nexbaron.com" className="text-amber-400 hover:text-amber-300">
                print@nexbaron.com
              </a>
              <span className="text-slate-700">•</span>
              <a href="tel:+919899752254" className="text-amber-400 hover:text-amber-300">
                +91 98997 52254
              </a>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] text-slate-500">
            <Link href="/privacy" className="hover:text-slate-300">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-slate-300">
              Terms of Service
            </Link>
            <span>•</span>
            <Link href="/refund" className="hover:text-slate-300">
              Refund & Cancellation
            </Link>
            <span>•</span>
            <Link href="/sitemap.xml" className="hover:text-slate-300">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

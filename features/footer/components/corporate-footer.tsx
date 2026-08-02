"use client";

import { Building2, Monitor, Printer } from "lucide-react";
import Link from "next/link";

export function CorporateFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative text-slate-300 mt-auto border-t border-white/10 bg-slate-950/95 backdrop-blur-xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-slate-800 border border-white/10 text-white">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-xl font-heading font-bold text-white tracking-tight">
                Nexbaron <span className="text-xs text-slate-400 font-mono">PRIVATE LIMITED</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Nexbaron Private Limited is a multi-disciplinary technology & commercial
              infrastructure company delivering end-to-end digital solutions and physical print
              collateral.
            </p>
          </div>

          {/* Nexbaron Digital Division */}
          <div>
            <h3 className="text-xs uppercase font-mono font-semibold text-teal-400 tracking-wider mb-4 flex items-center gap-1.5">
              <Monitor className="w-4 h-4" />
              Nexbaron Digital
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/digital/services" className="hover:text-white">
                  Websites & Landing Pages
                </Link>
              </li>
              <li>
                <Link href="/digital/services#local-seo" className="hover:text-white">
                  Google Business Profile & SEO
                </Link>
              </li>
              <li>
                <Link href="/digital/services#automation" className="hover:text-white">
                  WhatsApp & AI Automation
                </Link>
              </li>
              <li>
                <Link href="/digital/contact" className="hover:text-white">
                  Book Growth Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Nexbaron Print Division */}
          <div>
            <h3 className="text-xs uppercase font-mono font-semibold text-amber-400 tracking-wider mb-4 flex items-center gap-1.5">
              <Printer className="w-4 h-4" />
              Nexbaron Print
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/print/products/visiting-cards" className="hover:text-white">
                  Visiting Cards & Stationery
                </Link>
              </li>
              <li>
                <Link href="/print/products/pamphlets-posters" className="hover:text-white">
                  Pamphlets & Posters
                </Link>
              </li>
              <li>
                <Link href="/print/products/stickers-labels" className="hover:text-white">
                  Stickers & Labels
                </Link>
              </li>
              <li>
                <Link href="/print/products/bill-books" className="hover:text-white">
                  Bill Books & Business Forms
                </Link>
              </li>
              <li>
                <Link href="/print/quote" className="hover:text-white">
                  Instant Custom Print Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Group Corporate */}
          <div>
            <h3 className="text-xs uppercase font-mono font-semibold text-slate-300 tracking-wider mb-4">
              Corporate & Support
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/about" className="hover:text-white">
                  About Nexbaron Group
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white">
                  Careers & Hiring
                </Link>
              </li>
              <li>
                <Link href="/compliance" className="hover:text-white">
                  Legal & Compliance
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Corporate Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {currentYear} Nexbaron Private Limited. All rights reserved.</p>
          <div className="flex items-center gap-4 font-mono text-[11px]">
            <Link href="/privacy" className="hover:text-slate-300">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-slate-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { Monitor, MessageSquare } from "lucide-react";
import Link from "next/link";

import { buildWhatsAppLink } from "@/lib/divisions";

const digitalLinks = {
  services: [
    { href: "/digital/services#websites", label: "Business Websites & Landing Pages" },
    { href: "/digital/services#local-seo", label: "Google Business Profile & Local SEO" },
    { href: "/digital/automation", label: "AI Chatbots & WhatsApp CRM" },
    { href: "/digital/services#crm", label: "CRM & Lead Automation" },
    { href: "/digital/services#maintenance", label: "Hosting, Speed & Maintenance" },
  ],
  industries: [
    { href: "/digital/industries#clinics", label: "Clinics & Healthcare" },
    { href: "/digital/industries#restaurants", label: "Restaurants & Cafes" },
    { href: "/digital/industries#real-estate", label: "Real Estate & Construction" },
    { href: "/digital/industries#law-ca", label: "Law & CA Firms" },
    { href: "/digital/industries#salons-gyms", label: "Salons, Spas & Gyms" },
  ],
};

export function DigitalFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative text-slate-300 mt-auto border-t border-teal-500/20 bg-slate-950/90 backdrop-blur-xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/digital" className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-400">
                <Monitor className="w-5 h-5" />
              </div>
              <span className="text-xl font-heading font-bold text-white tracking-tight">
                Nexbaron <span className="text-teal-400 font-mono text-sm">DIGITAL</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              The complete digital growth engine for small businesses, clinics, restaurants, law
              firms, and growth startups. High-converting websites, WhatsApp CRM, and #1 local SEO
              ranking.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={buildWhatsAppLink(
                  "digital",
                  "Hi Nexbaron Digital, I need help with my business",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono font-medium px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                Live WhatsApp Support
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs uppercase font-mono font-semibold text-teal-400 tracking-wider mb-4">
              Digital Solutions
            </h3>
            <ul className="space-y-2.5">
              {digitalLinks.services.map((link) => (
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
          </div>

          {/* Industries */}
          <div>
            <h3 className="text-xs uppercase font-mono font-semibold text-teal-400 tracking-wider mb-4">
              Tailored Industries
            </h3>
            <ul className="space-y-2.5">
              {digitalLinks.industries.map((link) => (
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
          </div>

          {/* Division Switch & Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase font-mono font-semibold text-slate-400 tracking-wider">
              Other Services
            </h3>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
              <span className="text-xs font-medium text-white block">
                Need Physical Marketing Materials?
              </span>
              <p className="text-[11px] text-slate-400">
                Visiting cards, letterheads, bill books, labels, and commercial print.
              </p>
              <Link
                href="/print"
                className="inline-block text-xs font-mono text-amber-400 hover:underline pt-1"
              >
                Go to Nexbaron Print Division ↗
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>
            © {currentYear} Nexbaron Digital Division (Nexbaron Private Limited). All rights
            reserved.
          </p>
          <div className="flex items-center gap-4 font-mono text-[11px]">
            <Link href="/privacy" className="hover:text-slate-300">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-slate-300">
              Terms of Service
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

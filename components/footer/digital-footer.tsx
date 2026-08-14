"use client";

import { Monitor, MessageSquare } from "lucide-react";
import Link from "next/link";

import { formatPhone, type BusinessProfile } from "@/lib/business-profile";
import { buildWhatsAppLink } from "@/lib/divisions";

import { SocialLinks } from "./social-links";

const digitalLinks = {
  plans: [
    { href: "/digital/pricing#plans", label: "Launch" },
    { href: "/digital/pricing#plans", label: "Growth" },
    { href: "/digital/pricing#plans", label: "Scale" },
  ],
  industries: [
    { href: "/digital/who-we-help/clinics", label: "Clinics & Healthcare" },
    { href: "/digital/who-we-help/restaurants", label: "Restaurants & Cafes" },
    { href: "/digital/who-we-help/real-estate", label: "Real Estate & Construction" },
    { href: "/digital/who-we-help/law-ca", label: "Law & CA Firms" },
    { href: "/digital/who-we-help/salons", label: "Salons, Spas & Gyms" },
  ],
};

export function DigitalFooter({ profile }: { profile: BusinessProfile }) {
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
              Fixed-price growth plans for local businesses. No jargon, no lock-in, no vanishing
              after launch.
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
                Message Us on WhatsApp
              </a>
            </div>
            <div className="pt-3 space-y-1.5">
              <address className="text-xs text-slate-400 leading-relaxed not-italic whitespace-pre-line">
                {profile.address.display}
              </address>
              <a
                href={`tel:${profile.phone}`}
                className="text-xs text-teal-400 hover:text-teal-300"
              >
                {formatPhone(profile.phone)}
              </a>
            </div>
            <div className="pt-2">
              <SocialLinks division="digital" />
            </div>
          </div>

          {/* Popular Plans */}
          <nav aria-label="Popular plans">
            <h3 className="text-xs uppercase font-mono font-semibold text-teal-400 tracking-wider mb-4">
              Popular Plans
            </h3>
            <ul className="space-y-2.5">
              {digitalLinks.plans.map((link) => (
                <li key={link.label}>
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

          {/* Explore */}
          <nav aria-label="Explore">
            <h3 className="text-xs uppercase font-mono font-semibold text-teal-400 tracking-wider mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/digital/pricing"
                  className="text-xs text-slate-400 hover:text-white transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/digital/process"
                  className="text-xs text-slate-400 hover:text-white transition-colors"
                >
                  Our Process
                </Link>
              </li>
              <li>
                <Link
                  href="/digital/why-nexbaron"
                  className="text-xs text-slate-400 hover:text-white transition-colors"
                >
                  Why Nexbaron
                </Link>
              </li>
              <li>
                <Link
                  href="/digital/results"
                  className="text-xs text-slate-400 hover:text-white transition-colors"
                >
                  Results
                </Link>
              </li>
              <li>
                <Link
                  href="/digital/faq"
                  className="text-xs text-slate-400 hover:text-white transition-colors"
                >
                  Questions & Answers
                </Link>
              </li>
              <li>
                <Link
                  href="/digital/contact"
                  className="text-xs text-slate-400 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          {/* Who We Help */}
          <nav aria-label="Who we help">
            <h3 className="text-xs uppercase font-mono font-semibold text-teal-400 tracking-wider mb-4">
              Who We Help
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
          </nav>

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

        <div className="mt-12 pt-8 border-t border-white/10 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs text-slate-500">
            <div className="space-y-1">
              <p>
                © {currentYear} Nexbaron Digital Division (Nexbaron Private Limited). All rights
                reserved.
              </p>
              <p className="text-[11px] text-slate-600">GSTIN: {profile.gstin}</p>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px]">
              <a href={`mailto:${profile.email}`} className="text-teal-400 hover:text-teal-300">
                {profile.email}
              </a>
              <span className="text-slate-700">•</span>
              <a href={`tel:${profile.phone}`} className="text-teal-400 hover:text-teal-300">
                {formatPhone(profile.phone)}
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

"use client";

import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

import { UserMenu } from "@/components/auth/user-menu";
import { BrandMark } from "@/components/brand/brand-mark";
import { divisions } from "@/lib/divisions";

const navItems = divisions.print.nav;

export function PrintNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-950/90 backdrop-blur-xl border-b border-amber-500/20 py-3 shadow-xl shadow-amber-500/5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Division Switcher */}
          <div className="flex items-center gap-4">
            <Link href="/print" className="flex items-center gap-2.5 group">
              <BrandMark variant="print" />
              <div>
                <span className="text-lg font-heading font-extrabold text-white tracking-tight flex items-center gap-1.5">
                  Nexbaron <span className="text-amber-400 font-mono text-sm">PRINT</span>
                </span>
              </div>
            </Link>

            <Link
              href={divisions.print.otherDivision.href}
              className="hidden lg:inline-flex text-[11px] font-mono text-slate-500 hover:text-teal-400 transition-colors ml-3"
            >
              {divisions.print.otherDivision.label}
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-amber-300 ${
                    isActive ? "text-amber-400 font-semibold" : "text-slate-300"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/print/quote"
              className="group relative inline-flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/25 hover:bg-amber-500/20 hover:border-amber-500/50 hover:shadow-[0_0_24px_rgba(245,158,11,0.12)] transition-all duration-300"
            >
              Get Free Quote
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
            <UserMenu />
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer lg:hidden p-2 text-slate-300 hover:text-white"
            aria-label="Toggle Navigation"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="lg:hidden mt-4 rounded-2xl bg-slate-950/95 border border-amber-500/30 p-6 space-y-4 backdrop-blur-2xl shadow-2xl">
            <div className="pb-3 border-b border-white/10 flex justify-between items-center">
              <span className="text-xs font-mono text-amber-400 uppercase">Nexbaron Print</span>
              <Link
                href={divisions.print.otherDivision.href}
                className="text-xs font-mono text-slate-500 hover:text-teal-400 transition-colors"
              >
                {divisions.print.otherDivision.label}
              </Link>
            </div>
            <div className="space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-base font-medium text-slate-200 hover:text-amber-400 py-1"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="pt-4 border-t border-white/10 space-y-3">
              <Link
                href="/print/quote"
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/25"
              >
                Get Free Quote
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <UserMenu />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Printer, Calculator, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/print", label: "Overview" },
  { href: "/print/products", label: "Print Collaterals" },
  { href: "/print/products/visiting-cards", label: "Visiting Cards" },
  { href: "/print/products/signage", label: "Flex & Signage" },
  { href: "/print/products/office-branding", label: "Office Branding" },
  { href: "/print/quote", label: "Instant Quote Builder" },
];

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
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Printer className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <div>
                <span className="text-lg font-heading font-extrabold text-white tracking-tight flex items-center gap-1.5">
                  Nexbaron <span className="text-amber-400 font-mono text-sm">PRINT</span>
                </span>
                <span className="text-[10px] text-slate-400 block -mt-1 font-mono">
                  Collaterals • Signage • Flex & Vinyl
                </span>
              </div>
            </Link>

            <Link
              href="/digital"
              className="hidden lg:inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-400 hover:text-teal-400 px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:border-teal-500/40 transition-all ml-3"
            >
              Switch to Digital Division ↗
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
          <div className="hidden md:flex items-center gap-3">
            <Button
              asChild
              size="sm"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 rounded-lg shadow-md shadow-amber-500/20"
            >
              <Link href="/print/quote" className="flex items-center gap-1.5">
                <Calculator className="w-4 h-4" />
                Instant Print Quote
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white"
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
                href="/digital"
                className="text-xs font-mono text-teal-400 underline"
              >
                Switch to Digital Division ↗
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
            <div className="pt-4 border-t border-white/10">
              <Button
                asChild
                className="w-full bg-amber-500 text-slate-950 font-bold"
              >
                <Link href="/print/quote">Calculate Print Order</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

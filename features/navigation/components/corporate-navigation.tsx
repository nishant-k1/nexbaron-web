"use client";

import { Menu, X, Building2, Monitor, Printer } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/about", label: "About Group" },
  { href: "/contact", label: "Contact Us" },
];

export function CorporateNavigation() {
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
          ? "bg-slate-950/90 backdrop-blur-xl border-b border-white/10 py-3 shadow-xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Corporate Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-700 via-teal-500 to-amber-500 p-0.5 shadow-lg group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
            </div>
            <div>
              <span className="text-lg font-heading font-extrabold text-white tracking-tight">
                Nexbaron <span className="text-xs text-slate-400 font-mono">PRIVATE LIMITED</span>
              </span>
              <span className="text-[10px] text-slate-400 block -mt-1 font-mono">
                Digital Services & Print Infrastructure
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-white ${
                    isActive
                      ? "text-white font-semibold underline decoration-teal-400 underline-offset-8"
                      : "text-slate-300"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Direct Division Switch Pill Group (primary CTAs) */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/digital"
              className="flex items-center gap-1.5 text-xs font-mono font-medium px-3.5 py-1.5 rounded-lg bg-teal-500/10 text-teal-300 border border-teal-500/30 hover:bg-teal-500/20 transition-all"
            >
              <Monitor className="w-3.5 h-3.5" />
              Digital Portal
            </Link>
            <Link
              href="/print"
              className="flex items-center gap-1.5 text-xs font-mono font-medium px-3.5 py-1.5 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20 transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              Print Portal
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white"
            aria-label="Toggle Navigation"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden mt-4 rounded-2xl bg-slate-950/95 border border-white/10 p-6 space-y-4 backdrop-blur-2xl shadow-2xl">
            <div className="space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-base font-medium text-slate-200 hover:text-white py-1"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-3">
              <Button asChild size="sm" className="bg-teal-500 text-slate-950 font-bold">
                <Link href="/digital">Digital Division</Link>
              </Button>
              <Button asChild size="sm" className="bg-amber-500 text-slate-950 font-bold">
                <Link href="/print">Print Division</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

"use client";

import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

import { UserMenu } from "@/components/auth/user-menu";
import { BrandMark } from "@/components/brand/brand-mark";
import { divisions } from "@/lib/divisions";

const navItems = divisions.digital.nav;

export function DigitalNavigation() {
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
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-950/90 backdrop-blur-xl border-b border-teal-500/20 py-3 shadow-xl shadow-teal-500/5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Division Switcher */}
          <div className="flex items-center gap-4">
            <Link href="/digital" className="flex items-center gap-2.5 group">
              <BrandMark variant="digital" />
              <div>
                <span className="text-lg font-heading font-extrabold text-white tracking-tight flex items-center gap-1.5">
                  Nexbaron <span className="text-teal-400 font-mono text-sm">DIGITAL</span>
                </span>
              </div>
            </Link>

            <Link
              href={divisions.digital.otherDivision.href}
              className="hidden lg:inline-flex text-[11px] font-mono text-slate-500 hover:text-amber-400 transition-colors ml-3"
            >
              {divisions.digital.otherDivision.label}
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`text-sm font-medium transition-colors hover:text-teal-300 ${
                    isActive ? "text-teal-400 font-semibold" : "text-slate-300"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/digital/pricing"
              className="group relative inline-flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold text-teal-400 bg-teal-500/10 border border-teal-500/25 hover:bg-teal-500/20 hover:border-teal-500/50 hover:shadow-[0_0_24px_rgba(20,184,166,0.12)] transition-all duration-300"
            >
              View Pricing
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
            <UserMenu />
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer md:hidden p-2 text-slate-300 hover:text-white"
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Fullscreen */}
        {isOpen && (
          <div
            id="mobile-menu"
            className="md:hidden fixed inset-0 top-0 left-0 z-50 bg-slate-950 flex flex-col"
          >
            <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
              <Link
                href="/digital"
                className="flex items-center gap-2.5"
                onClick={() => setIsOpen(false)}
              >
                <BrandMark variant="digital" />
                <span className="text-lg font-heading font-extrabold text-white tracking-tight flex items-center gap-1.5">
                  Nexbaron <span className="text-teal-400 font-mono text-sm">DIGITAL</span>
                </span>
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="cursor-pointer p-2 text-slate-300 hover:text-white"
                aria-label="Close navigation"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex-1 overflow-auto px-6 py-6 space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`block text-lg font-medium py-3 border-b border-white/5 ${isActive ? "text-teal-400 font-semibold" : "text-slate-200 hover:text-teal-400"}`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="px-6 pb-8 pt-4 border-t border-white/10 space-y-3">
              <Link
                href="/digital/pricing"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-semibold text-teal-400 bg-teal-500/10 border border-teal-500/25"
              >
                View Pricing
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <UserMenu fullWidth />
              <Link
                href={divisions.digital.otherDivision.href}
                className="block text-center text-xs font-mono text-slate-500 hover:text-amber-400 transition-colors pt-2"
              >
                {divisions.digital.otherDivision.label}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

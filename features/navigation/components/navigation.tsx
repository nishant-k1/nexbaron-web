"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/projects", label: "Projects" },
  {
    href: "/downloads",
    label: "Resources",
    children: [
      { href: "/downloads", label: "Downloads" },
      { href: "/compliance", label: "Compliance" },
    ],
  },
  {
    href: "/about",
    label: "Company",
    children: [
      { href: "/about", label: "About" },
      { href: "/careers", label: "Careers" },
    ],
  },
];

export function Navigation() {
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

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const handleBreakpointChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsOpen(false);
      }
    };

    mediaQuery.addEventListener("change", handleBreakpointChange);
    return () =>
      mediaQuery.removeEventListener("change", handleBreakpointChange);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full border-b border-muted bg-neutral-surface dark:bg-neutral-bg backdrop-blur transition-colors text-body shadow-surface",
        isScrolled && "shadow-surface"
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-2 text-xl font-heading font-bold text-heading"
            aria-label="Nexbaron Services Home"
          >
            <span>Nexbaron</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-6">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                item.children?.some((child) => child.href === pathname);
              const hasChildren = !!item.children?.length;

              return (
                <div key={item.href} className="relative group">
                  <Link
                    href={item.href}
                    className={cn(
                      "inline-flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary dark:hover:text-heading focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-base px-2 py-1",
                      isActive
                        ? "text-primary dark:text-heading font-semibold"
                        : "text-body"
                    )}
                    aria-current={pathname === item.href ? "page" : undefined}
                  >
                    {item.label}
                    {hasChildren && (
                      <ChevronDown className="h-4 w-4" aria-hidden="true" />
                    )}
                  </Link>

                  {hasChildren && (
                    <div className="absolute left-0 mt-2 min-w-[200px] rounded-base border border-muted bg-neutral-surface dark:bg-neutral-bg shadow-elevated opacity-0 translate-y-1 pointer-events-none transition duration-motion ease-motion group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:pointer-events-auto">
                      <div className="py-2">
                        {item.children?.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              "block px-4 py-2 text-sm rounded-base transition-colors hover:bg-neutral-surface/80 dark:hover:bg-neutral-bg/60",
                              pathname === child.href
                                ? "text-primary dark:text-heading font-semibold"
                                : "text-body"
                            )}
                            aria-current={
                              pathname === child.href ? "page" : undefined
                            }
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            <ThemeToggle />
            <Button asChild variant="default" className="ml-2">
              <Link href="/contact" aria-label="Contact Nexbaron">
                Contact
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-2 text-body">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              className="text-body"
            >
              {isOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden fixed inset-x-0 top-16 z-40 border-t border-muted bg-neutral-surface dark:bg-neutral-bg backdrop-blur shadow-surface text-body">
            <div className="px-4 pt-3 pb-4 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
              {navItems.map((item) => (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block px-3 py-2 rounded-base text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                      pathname === item.href
                        ? "bg-primary text-white"
                        : "text-body hover:bg-neutral-surface/80 dark:hover:bg-neutral-bg/60"
                    )}
                    aria-current={pathname === item.href ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                  {item.children?.length ? (
                    <div className="pl-3 pt-1 space-y-1">
                      {item.children?.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            "block px-3 py-2 rounded-base text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                            pathname === child.href
                              ? "bg-primary/90 text-white"
                              : "text-body hover:bg-neutral-surface/80 dark:hover:bg-neutral-bg/60"
                          )}
                          aria-current={
                            pathname === child.href ? "page" : undefined
                          }
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
              <div className="pt-2">
                <Button asChild className="w-full">
                  <Link href="/contact" aria-label="Contact Nexbaron">
                    Contact
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

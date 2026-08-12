"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

function homeHref(pathname: string): { href: string; label: string } {
  if (pathname.startsWith("/digital")) {
    return { href: "/digital", label: "Go to Nexbaron Digital" };
  }
  if (pathname.startsWith("/print")) {
    return { href: "/print", label: "Go to Nexbaron Print" };
  }
  return { href: "/", label: "Go Home" };
}

export default function NotFound() {
  const pathname = usePathname() ?? "";
  const home = homeHref(pathname);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-heading font-normal text-heading mb-4">404</h1>
        <h2 className="text-2xl font-heading font-normal text-heading mb-4">Page Not Found</h2>
        <p className="text-body mb-8">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Button asChild>
          <Link href={home.href}>{home.label}</Link>
        </Button>
      </div>
    </div>
  );
}

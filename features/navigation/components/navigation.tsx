"use client";

import { usePathname } from "next/navigation";
import { DigitalNavigation } from "./digital-navigation";
import { PrintNavigation } from "./print-navigation";
import { CorporateNavigation } from "./corporate-navigation";

export function Navigation() {
  const pathname = usePathname();

  if (pathname.startsWith("/digital")) {
    return <DigitalNavigation />;
  }

  if (pathname.startsWith("/print")) {
    return <PrintNavigation />;
  }

  return <CorporateNavigation />;
}

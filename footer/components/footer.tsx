"use client";

import { usePathname } from "next/navigation";

import { CorporateFooter } from "./corporate-footer";
import { DigitalFooter } from "./digital-footer";
import { PrintFooter } from "./print-footer";

export function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/digital")) {
    return <DigitalFooter />;
  }

  if (pathname.startsWith("/print")) {
    return <PrintFooter />;
  }

  return <CorporateFooter />;
}

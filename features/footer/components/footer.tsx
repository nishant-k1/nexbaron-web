"use client";

import { usePathname } from "next/navigation";
import { DigitalFooter } from "./digital-footer";
import { PrintFooter } from "./print-footer";
import { CorporateFooter } from "./corporate-footer";

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

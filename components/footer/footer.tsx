"use client";

import { usePathname } from "next/navigation";

import type { BusinessProfile } from "@/lib/business-profile";

import { CorporateFooter } from "./corporate-footer";
import { DigitalFooter } from "./digital-footer";
import { PrintFooter } from "./print-footer";

export function Footer({ digital, print }: { digital: BusinessProfile; print: BusinessProfile }) {
  const pathname = usePathname();

  if (pathname.startsWith("/digital")) {
    return <DigitalFooter profile={digital} />;
  }

  if (pathname.startsWith("/print")) {
    return <PrintFooter profile={print} />;
  }

  return <CorporateFooter />;
}

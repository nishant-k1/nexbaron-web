"use client";

import { usePathname } from "next/navigation";

import type { BusinessProfile } from "@/lib/business-profile";

import { CorporateFooter } from "./corporate-footer";
import { DigitalFooter } from "./digital-footer";
import { PrintFooter } from "./print-footer";

export function Footer({
  digital,
  print,
}: {
  digital: BusinessProfile | null;
  print: BusinessProfile | null;
}) {
  const pathname = usePathname();

  if (pathname.startsWith("/digital")) {
    return digital ? <DigitalFooter profile={digital} /> : <CorporateFooter />;
  }

  if (pathname.startsWith("/print")) {
    return print ? <PrintFooter profile={print} /> : <CorporateFooter />;
  }

  return <CorporateFooter />;
}

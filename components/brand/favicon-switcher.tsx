"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Switches the browser tab favicon per division — mirrors nexbaron-hub/crm.
// /print → amber tile, everything else → teal tile (digital / corporate).
export function FaviconSwitcher() {
  const pathname = usePathname();

  useEffect(() => {
    const isPrint = pathname?.startsWith("/print");
    const link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (link) {
      link.href = isPrint ? "/favicon-print.svg" : "/favicon-digital.svg";
    }
  }, [pathname]);

  return null;
}

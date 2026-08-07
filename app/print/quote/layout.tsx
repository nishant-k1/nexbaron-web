import { type Metadata } from "next";

import { divisionOpenGraph, divisionTwitter } from "@/lib/og";

export const metadata: Metadata = {
  title: "Get a Custom Print Quote | Nexbaron Print",
  description:
    "Build your custom print quote — visiting cards, brochures, signage, and more. Clear pricing, confirmed delivery date.",
  openGraph: {
    title: "Get a Custom Print Quote | Nexbaron Print",
    description: "Build your custom print quote with transparent pricing.",
    ...divisionOpenGraph("print"),
  },
  twitter: divisionTwitter("print"),
};

export default function QuoteLayout({ children }: { children: React.ReactNode }) {
  return children;
}

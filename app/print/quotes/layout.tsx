import { type Metadata } from "next";

import { divisionOpenGraph, divisionTwitter } from "@/lib/og";

export const metadata: Metadata = {
  title: "My Print Quotes | Nexbaron Print",
  description: "Track your print quotes, view pricing, and manage your print orders.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "My Print Quotes | Nexbaron Print",
    description: "Track your print quotes and orders.",
    ...divisionOpenGraph("print"),
  },
  twitter: divisionTwitter("print"),
};

export default function QuotesLayout({ children }: { children: React.ReactNode }) {
  return children;
}

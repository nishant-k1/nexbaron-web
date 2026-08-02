import type { Metadata } from "next";

import { divisionOpenGraph, divisionTwitter } from "@/lib/og";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nexbaron.com";

export const metadata: Metadata = {
  title: {
    default: "Nexbaron Print | Premium Commercial Printing",
    template: "%s | Nexbaron Print",
  },
  description:
    "Nexbaron Print delivers premium commercial printing: visiting cards, card holders, letterheads, envelopes, bill books, stickers & labels, pens, and specialty print.",
  openGraph: {
    type: "website",
    url: `${siteUrl}/print`,
    title: "Nexbaron Print | Premium Commercial Printing",
    description:
      "14 print services from visiting cards to bill books, stickers, and specialty products.",
    ...divisionOpenGraph("print"),
  },
  twitter: {
    title: "Nexbaron Print | Premium Commercial Printing",
    description:
      "14 print services from visiting cards to bill books, stickers, and specialty products.",
    ...divisionTwitter("print"),
  },
};

export default function PrintLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

import { divisionOpenGraph, divisionTwitter } from "@/lib/og";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nexbaron.com";

export const metadata: Metadata = {
  title: {
    default: "Nexbaron Digital | Fixed-Price Growth Plans for Local Businesses",
    template: "%s | Nexbaron Digital",
  },
  description:
    "Fixed-price growth plans that get your business found on Google and answering customers on WhatsApp 24/7. Published prices, no jargon, no lock-in. Live in as little as 7 days.",
  icons: {
    icon: "/favicon-digital.svg",
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/digital`,
    title: "Nexbaron Digital | Fixed-Price Growth Plans",
    description: "Found on Google. Booked on WhatsApp. Live in 7 days.",
    ...divisionOpenGraph("digital"),
  },
  twitter: {
    title: "Nexbaron Digital | Fixed-Price Growth Plans",
    description: "Found on Google. Booked on WhatsApp. Live in 7 days.",
    ...divisionTwitter("digital"),
  },
};

export default function DigitalLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

import { PlansProvider } from "@/features/digital/catalog";
import { divisionOpenGraph, divisionTwitter } from "@/lib/og";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nexbaron.com";

export const metadata: Metadata = {
  title: {
    default: "Nexbaron Digital | Fixed-Price Growth Plans for Local Businesses",
    template: "%s | Nexbaron Digital",
  },
  description:
    "Fixed-price growth plans that get your business found on Google and answering customers on WhatsApp 24/7. Published prices, no jargon, no lock-in. Your launch date is confirmed when you pay.",
  icons: {
    icon: "/favicon-digital.svg",
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/digital`,
    title: "Nexbaron Digital | Fixed-Price Growth Plans",
    description: "Found on Google. Booked on WhatsApp. A launch date you can count on.",
    ...divisionOpenGraph("digital"),
  },
  twitter: {
    title: "Nexbaron Digital | Fixed-Price Growth Plans",
    description: "Found on Google. Booked on WhatsApp. A launch date you can count on.",
    ...divisionTwitter("digital"),
  },
};

export default function DigitalLayout({ children }: { children: React.ReactNode }) {
  return <PlansProvider>{children}</PlansProvider>;
}

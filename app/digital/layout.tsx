import type { Metadata } from "next";

import { divisionOpenGraph, divisionTwitter } from "@/lib/og";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nexbaron.com";

export const metadata: Metadata = {
  title: {
    default: "Nexbaron Digital | Web, Local SEO & AI Automation",
    template: "%s | Nexbaron Digital",
  },
  description:
    "Grow your business with Nexbaron Digital. High-converting websites, #1 Google Business Profile local SEO, WhatsApp CRM, AI chatbots, and speed optimization for clinics, restaurants, law firms, and SMEs.",
  openGraph: {
    type: "website",
    url: `${siteUrl}/digital`,
    title: "Nexbaron Digital | Web, Local SEO & AI Automation",
    description: "Digital growth engine for SMEs and local service businesses.",
    ...divisionOpenGraph("digital"),
  },
  twitter: {
    title: "Nexbaron Digital | Web, Local SEO & AI Automation",
    description: "Digital growth engine for SMEs and local service businesses.",
    ...divisionTwitter("digital"),
  },
};

export default function DigitalLayout({ children }: { children: React.ReactNode }) {
  return children;
}

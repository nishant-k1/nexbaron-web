import { type Metadata } from "next";

import { SolutionDetail } from "@/components/digital/solution-detail";
import { solutionSections } from "@/features/digital/solutions-data";
import { divisionOpenGraph, divisionTwitter } from "@/lib/og";

const section = solutionSections.find((s) => s.slug === "online-ads")!;

export const metadata: Metadata = {
  title: "Google Ads & Lead Generation for Local Business | Nexbaron Digital",
  description:
    "Google Ads campaigns, landing pages, and conversion tracking that turn clicks into calls and bookings — know exactly what your ad spend returns.",
  openGraph: {
    title: "Google Ads & Lead Generation | Nexbaron Digital",
    description:
      "Google Ads, landing pages, lead tracking, and conversion tracking — generate leads and measure real results.",
    ...divisionOpenGraph("digital"),
  },
  twitter: divisionTwitter("digital"),
};

export default function OnlineAdsPage() {
  return (
    <SolutionDetail
      section={section}
      eyebrow="Grow"
      highlight="Turn Searches Into Customers"
      description="Ads put you in front of people already searching for your service. We build the campaigns, landing pages, and tracking so you know exactly what every rupee returns."
    />
  );
}

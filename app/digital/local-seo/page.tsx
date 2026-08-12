import { type Metadata } from "next";

import { SolutionDetail } from "@/components/digital/solution-detail";
import { solutionSections } from "@/features/digital/solutions-data";
import { divisionOpenGraph, divisionTwitter } from "@/lib/og";

const section = solutionSections.find((s) => s.slug === "local-seo")!;

export const metadata: Metadata = {
  title: "Local SEO & Google Maps Ranking for Your City | Nexbaron Digital",
  description:
    "Rank for local searches, show up on Google Maps, and collect reviews with our local SEO service — Google Business optimization, citations, and monthly SEO.",
  openGraph: {
    title: "Local SEO & Google Maps Ranking | Nexbaron Digital",
    description:
      "Local SEO, Google Business optimization, Google Maps ranking, review management, and citation building.",
    ...divisionOpenGraph("digital"),
  },
  twitter: divisionTwitter("digital"),
};

export default function LocalSeoPage() {
  return (
    <SolutionDetail
      section={section}
      eyebrow="Get Found"
      highlight="Show Up When Customers Search"
      description="When someone searches for a business like yours in your city, they should find you first. We optimize your Google presence so you rank for the searches that bring customers."
    />
  );
}

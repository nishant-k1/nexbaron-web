import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { SolutionDetail } from "@/components/digital/solution-detail";
import { getSectionServices, getServiceCatalog } from "@/features/digital/services";
import { divisionOpenGraph, divisionTwitter } from "@/lib/og";

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

export default async function LocalSeoPage() {
  const catalog = await getServiceCatalog();
  const { section, services } = getSectionServices("local-seo", catalog);
  if (!section) notFound();

  return (
    <SolutionDetail
      section={section}
      services={services}
      eyebrow="Get Found"
      highlight="Show Up When Customers Search"
      description="When someone searches for a business like yours in your city, they should find you first. We optimize your Google presence so you rank for the searches that bring customers."
    />
  );
}

import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { SolutionDetail } from "@/components/digital/solution-detail";
import { getSectionServices, getServiceCatalog } from "@/features/digital/services";
import { divisionOpenGraph, divisionTwitter } from "@/lib/og";

export const metadata: Metadata = {
  title: "Website Design & Business Presence for Local Businesses | Nexbaron Digital",
  description:
    "Professional website design, logo & branding, domain, hosting, business email, Google Business Profile, and analytics setup — everything to establish your business online.",
  alternates: { canonical: "/digital/web-design" },
  openGraph: {
    title: "Website Design & Business Presence | Nexbaron Digital",
    description:
      "Logo, website, domain, hosting, business email, Google Business Profile, and analytics — all in one fixed-price plan.",
    ...divisionOpenGraph("digital"),
  },
  twitter: divisionTwitter("digital"),
};

export default async function WebDesignPage() {
  const catalog = await getServiceCatalog();
  const { section, services } = getSectionServices("web-design", catalog);
  if (!section) notFound();

  return (
    <SolutionDetail
      section={section}
      services={services}
      eyebrow="Build Your Presence"
      highlight="Establish Your Business Online"
      description="From a logo you're proud of to a website that turns visitors into customers — we build everything your business needs to look established and get found, for one fixed price."
    />
  );
}

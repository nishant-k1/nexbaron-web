import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { SolutionDetail } from "@/components/digital/solution-detail";
import { getSectionServices, getServiceCatalog } from "@/features/digital/services";
import { divisionOpenGraph, divisionTwitter } from "@/lib/og";

export const metadata: Metadata = {
  title: "Website Care & Maintenance | Nexbaron Digital",
  description:
    "Hosting, security, updates, daily backups, uptime monitoring, and up to 2 small changes per month — your website stays fast, secure, and current.",
  alternates: { canonical: "/digital/website-care" },
  openGraph: {
    title: "Website Care & Maintenance | Nexbaron Digital",
    description:
      "Hosting, security, updates, backups, monitoring, and small monthly changes — included in every plan.",
    ...divisionOpenGraph("digital"),
  },
  twitter: divisionTwitter("digital"),
};

export default async function WebsiteCarePage() {
  const catalog = await getServiceCatalog();
  const { section, services } = getSectionServices("website-care", catalog);
  if (!section) notFound();

  return (
    <SolutionDetail
      section={section}
      services={services}
      eyebrow="Care"
      highlight="It Keeps Running. We Keep It Safe."
      description="Your website is an asset that needs care to stay fast, secure, and current. We handle hosting, security, updates, backups, and monitoring — so it never lets you down."
    />
  );
}

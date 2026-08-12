import { type Metadata } from "next";

import { SolutionDetail } from "@/components/digital/solution-detail";
import { solutionSections } from "@/features/digital/solutions-data";
import { divisionOpenGraph, divisionTwitter } from "@/lib/og";

const section = solutionSections.find((s) => s.slug === "website-care")!;

export const metadata: Metadata = {
  title: "Website Care & Maintenance | Nexbaron Digital",
  description:
    "Hosting, security, updates, daily backups, uptime monitoring, and up to 2 small changes per month — your website stays fast, secure, and current.",
  openGraph: {
    title: "Website Care & Maintenance | Nexbaron Digital",
    description:
      "Hosting, security, updates, backups, monitoring, and small monthly changes — included in every plan.",
    ...divisionOpenGraph("digital"),
  },
  twitter: divisionTwitter("digital"),
};

export default function WebsiteCarePage() {
  return (
    <SolutionDetail
      section={section}
      eyebrow="Care"
      highlight="It Keeps Running. We Keep It Safe."
      description="Your website is an asset that needs care to stay fast, secure, and current. We handle hosting, security, updates, backups, and monitoring — so it never lets you down."
    />
  );
}

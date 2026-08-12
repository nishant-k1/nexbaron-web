import { type Metadata } from "next";

import { SolutionDetail } from "@/components/digital/solution-detail";
import { solutionSections } from "@/features/digital/solutions-data";
import { divisionOpenGraph, divisionTwitter } from "@/lib/og";

const section = solutionSections.find((s) => s.slug === "web-design")!;

export const metadata: Metadata = {
  title: "Website Design & Business Presence for Local Businesses | Nexbaron Digital",
  description:
    "Professional website design, logo & branding, domain, hosting, business email, Google Business Profile, and analytics setup — everything to establish your business online.",
  openGraph: {
    title: "Website Design & Business Presence | Nexbaron Digital",
    description:
      "Logo, website, domain, hosting, business email, Google Business Profile, and analytics — all in one fixed-price plan.",
    ...divisionOpenGraph("digital"),
  },
  twitter: divisionTwitter("digital"),
};

export default function WebDesignPage() {
  return (
    <SolutionDetail
      section={section}
      eyebrow="Build Your Presence"
      highlight="Establish Your Business Online"
      description="From a logo you're proud of to a website that turns visitors into customers — we build everything your business needs to look established and get found, for one fixed price."
    />
  );
}

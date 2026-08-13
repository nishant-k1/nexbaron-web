import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { SolutionDetail } from "@/components/digital/solution-detail";
import { getSectionServices, getServiceCatalog } from "@/features/digital/services";
import { divisionOpenGraph, divisionTwitter } from "@/lib/og";

export const metadata: Metadata = {
  title: "Social Media Management for Small Business | Nexbaron Digital",
  description:
    "We post, design, and schedule your social media content every month — custom graphics, engaging captions, and plain-English reports.",
  alternates: { canonical: "/digital/social-media" },
  openGraph: {
    title: "Social Media Management | Nexbaron Digital",
    description:
      "Monthly content, graphic design, captions, scheduling, and reports — your social media runs itself.",
    ...divisionOpenGraph("digital"),
  },
  twitter: divisionTwitter("digital"),
};

export default async function SocialMediaPage() {
  const catalog = await getServiceCatalog();
  const { section, services } = getSectionServices("social-media", catalog);
  if (!section) notFound();

  return (
    <SolutionDetail
      section={section}
      services={services}
      eyebrow="Stay Active"
      highlight="Stay Top-of-Mind Every Month"
      description="Your customers scroll social media daily. We create and schedule fresh, on-brand content every month so your business stays visible and remembered."
    />
  );
}

import { type Metadata } from "next";

import { SolutionDetail } from "@/components/digital/solution-detail";
import { solutionSections } from "@/features/digital/solutions-data";
import { divisionOpenGraph, divisionTwitter } from "@/lib/og";

const section = solutionSections.find((s) => s.slug === "social-media")!;

export const metadata: Metadata = {
  title: "Social Media Management for Small Business | Nexbaron Digital",
  description:
    "We post, design, and schedule your social media content every month — custom graphics, engaging captions, and plain-English reports.",
  openGraph: {
    title: "Social Media Management | Nexbaron Digital",
    description:
      "Monthly content, graphic design, captions, scheduling, and reports — your social media runs itself.",
    ...divisionOpenGraph("digital"),
  },
  twitter: divisionTwitter("digital"),
};

export default function SocialMediaPage() {
  return (
    <SolutionDetail
      section={section}
      eyebrow="Stay Active"
      highlight="Stay Top-of-Mind Every Month"
      description="Your customers scroll social media daily. We create and schedule fresh, on-brand content every month so your business stays visible and remembered."
    />
  );
}

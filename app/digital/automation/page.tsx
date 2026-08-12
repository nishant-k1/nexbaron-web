import { type Metadata } from "next";

import { SolutionDetail } from "@/components/digital/solution-detail";
import { solutionSections } from "@/features/digital/solutions-data";
import { divisionOpenGraph, divisionTwitter } from "@/lib/og";

const section = solutionSections.find((s) => s.slug === "automation")!;

export const metadata: Metadata = {
  title: "WhatsApp That Answers Your Customers 24/7 | Nexbaron Digital",
  description:
    "Your business answers customers on WhatsApp at any hour — instant replies, self-booking, and reminders that stop no-shows. Included in Growth and Scale plans.",
  openGraph: {
    title: "WhatsApp That Answers Your Customers 24/7 | Nexbaron Digital",
    description: "Answers your customers, books appointments, and stops no-shows — 24/7.",
    ...divisionOpenGraph("digital"),
  },
  twitter: divisionTwitter("digital"),
};

export default function DigitalAutomationPage() {
  return (
    <SolutionDetail
      section={section}
      eyebrow="Automate"
      highlight="Answer 24/7 on WhatsApp"
      description="The most under-used channel in local business. We turn WhatsApp into a service that answers your customers, books their appointments, and follows up — automatically, around the clock."
    />
  );
}

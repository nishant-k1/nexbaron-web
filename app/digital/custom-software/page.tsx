import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { SolutionDetail } from "@/components/digital/solution-detail";
import { getSectionServices, getServiceCatalog } from "@/features/digital/services";
import { divisionOpenGraph, divisionTwitter } from "@/lib/og";

export const metadata: Metadata = {
  title: "Custom Software, Dashboards & Internal Tools | Nexbaron Digital",
  description:
    "Bespoke dashboards, CRMs, billing & GST invoicing, inventory, staff attendance, loyalty, delivery tracking, and membership tools — built around your workflow.",
  alternates: { canonical: "/digital/custom-software" },
  openGraph: {
    title: "Custom Software & Internal Tools | Nexbaron Digital",
    description:
      "Dashboards, CRMs, billing, inventory, attendance, loyalty, and delivery tools — built to your workflow.",
    ...divisionOpenGraph("digital"),
  },
  twitter: divisionTwitter("digital"),
};

export default async function CustomSoftwarePage() {
  const catalog = await getServiceCatalog();
  const { section, services } = getSectionServices("custom-software", catalog);
  if (!section) notFound();

  return (
    <SolutionDetail
      section={section}
      services={services}
      eyebrow="Custom Software"
      highlight="Software Built Around Your Workflow"
      description="When off-the-shelf tools don't fit, we build them. Dashboards, CRMs, billing, and internal tools designed around how your business actually runs — then handed over with training and support."
    />
  );
}

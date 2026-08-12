import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { ServiceDetail } from "@/components/digital/service-detail";
import {
  getServiceById,
  getServiceCatalog,
  getServiceSection,
  getServicesBySection,
} from "@/features/digital/services";
import { divisionOpenGraph, divisionTwitter } from "@/lib/og";

interface ServicePageProps {
  params: Promise<{ slug: string; serviceId: string }>;
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug, serviceId } = await params;
  const catalog = await getServiceCatalog();
  const service = getServiceById(serviceId, catalog);
  const section = service ? getServiceSection(service, catalog) : undefined;

  if (!service || !section || section.slug !== slug) {
    return { title: "Solution not found" };
  }

  return {
    title: service.label,
    description: service.description,
    openGraph: {
      title: service.label,
      description: service.description,
      ...divisionOpenGraph("digital"),
    },
    twitter: divisionTwitter("digital"),
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug, serviceId } = await params;
  const catalog = await getServiceCatalog();
  const service = getServiceById(serviceId, catalog);
  const section = service ? getServiceSection(service, catalog) : undefined;

  if (!service || !section || section.slug !== slug) notFound();

  const related = getServicesBySection(service.section, catalog)
    .filter((s) => s.id !== service.id)
    .slice(0, 4);

  return <ServiceDetail service={service} section={section} related={related} />;
}

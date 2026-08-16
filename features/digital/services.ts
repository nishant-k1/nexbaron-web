import { getApiUrl } from "@/lib/api";

export interface ServiceSection {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  icon: string;
}

export interface PublicService {
  id: string;
  label: string;
  description: string;
  icon: string;
  section: string;
  details: string;
  benefits: string[];
  overview: string[];
  howItWorks: string[];
  faqs: { question: string; answer: string }[];
}

export interface ServiceCatalog {
  version: string;
  sections: ServiceSection[];
  services: PublicService[];
}

// Server-side services fetch — powers the public solutions/service pages.
// The API is the source of truth and groups services by customer need.
export async function getServiceCatalog(): Promise<ServiceCatalog> {
  const apiUrl = getApiUrl("digital");
  const response = await fetch(`${apiUrl}/digital/services`, {
    headers: { Accept: "application/json" },
    next: { revalidate: 3600 },
  });

  if (!response.ok) throw new Error(`Services request failed: ${response.status}`);

  const data = (await response.json()) as ServiceCatalog;
  if (!Array.isArray(data.sections) || !Array.isArray(data.services)) {
    throw new Error("Empty services catalog");
  }

  return data;
}

export function getServicesBySection(sectionId: string, catalog: ServiceCatalog): PublicService[] {
  return catalog.services.filter((service) => service.section === sectionId);
}

export function getSectionServices(
  slug: string,
  catalog: ServiceCatalog,
): { section?: ServiceSection; services: PublicService[] } {
  const section = catalog.sections.find((item) => item.slug === slug);
  return { section, services: section ? getServicesBySection(section.id, catalog) : [] };
}

export function getServiceById(id: string, catalog: ServiceCatalog): PublicService | undefined {
  return catalog.services.find((service) => service.id === id);
}

export function getServiceSection(
  service: PublicService,
  catalog: ServiceCatalog,
): ServiceSection | undefined {
  return catalog.sections.find((section) => section.id === service.section);
}

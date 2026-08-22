import { getApiUrl } from "@/lib/api";
import logger from "@/lib/logger";

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
// This is resilient: when the API is unreachable (e.g. during a build with no
// running API), it returns an empty catalog instead of crashing the build.
// At runtime with the API available, the ISR cache serves the real data.
export async function getServiceCatalog(): Promise<ServiceCatalog> {
  const apiUrl = getApiUrl("digital");
  try {
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
  } catch (err) {
    logger.warn("getServiceCatalog: API unavailable, using empty fallback", {
      error: err instanceof Error ? err.message : String(err),
    });
    return { version: "", sections: [], services: [] };
  }
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

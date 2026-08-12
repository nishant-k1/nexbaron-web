import { getApiUrl } from "@/lib/api";

export interface ServiceSection {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  icon: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface PublicService {
  id: string;
  label: string;
  description: string;
  icon: string;
  section: string;
  stage?: "design" | "build" | "setup";
  details: string;
  benefits: string[];
  overview: string[];
  howItWorks: string[];
  faqs: ServiceFaq[];
}

export interface ServiceCatalog {
  version: string;
  sections: ServiceSection[];
  services: PublicService[];
}

const fallbackSections: ServiceSection[] = [
  {
    id: "build",
    slug: "web-design",
    title: "Build",
    subtitle: "Everything needed to establish your business online.",
    icon: "Globe",
  },
  {
    id: "get-found",
    slug: "local-seo",
    title: "Get Found",
    subtitle: "Everything needed for customers to discover your business.",
    icon: "Search",
  },
  {
    id: "stay-active",
    slug: "social-media",
    title: "Stay Active",
    subtitle: "Everything needed to keep your business visible.",
    icon: "Share2",
  },
  {
    id: "grow",
    slug: "online-ads",
    title: "Grow",
    subtitle: "Everything needed to generate leads.",
    icon: "TrendingUp",
  },
  {
    id: "automate",
    slug: "automation",
    title: "Automate",
    subtitle: "Everything that saves time.",
    icon: "Wand2",
  },
  {
    id: "care",
    slug: "website-care",
    title: "Care",
    subtitle: "Everything that keeps things running.",
    icon: "Shield",
  },
  {
    id: "custom-software",
    slug: "custom-software",
    title: "Custom Software",
    subtitle: "Bespoke dashboards, CRMs, and internal tools built around your workflow.",
    icon: "Code",
  },
];

// Server-side services fetch — powers the "services/solutions" page. Prices are
// omitted by the API; only marketing fields are returned.
export async function getServiceCatalog(): Promise<ServiceCatalog> {
  try {
    const response = await fetch(`${getApiUrl("digital")}/digital/services`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 },
    });
    if (!response.ok) throw new Error(`Services request failed: ${response.status}`);
    const data = (await response.json()) as ServiceCatalog;
    if (!Array.isArray(data.services)) throw new Error("Empty services catalog");
    return {
      version: data.version ?? "1.0.0",
      sections: Array.isArray(data.sections) ? data.sections : fallbackSections,
      services: data.services.map((s) => ({
        ...s,
        details: s.details ?? "",
        benefits: Array.isArray(s.benefits) ? s.benefits : [],
        overview: Array.isArray(s.overview) ? s.overview : [],
        howItWorks: Array.isArray(s.howItWorks) ? s.howItWorks : [],
        faqs: Array.isArray(s.faqs) ? s.faqs : [],
      })),
    };
  } catch {
    return { version: "1.0.0", sections: fallbackSections, services: [] };
  }
}

export function getServicesBySection(sectionId: string, catalog: ServiceCatalog): PublicService[] {
  return catalog.services.filter((s) => s.section === sectionId);
}

export function getSectionServices(
  slug: string,
  catalog: ServiceCatalog,
): { section?: ServiceSection; services: PublicService[] } {
  const section = catalog.sections.find((s) => s.slug === slug);
  return { section, services: section ? getServicesBySection(section.id, catalog) : [] };
}

export function getServiceById(id: string, catalog: ServiceCatalog): PublicService | undefined {
  return catalog.services.find((s) => s.id === id);
}

export function getServiceSection(
  service: PublicService,
  catalog: ServiceCatalog,
): ServiceSection | undefined {
  return catalog.sections.find((s) => s.id === service.section);
}

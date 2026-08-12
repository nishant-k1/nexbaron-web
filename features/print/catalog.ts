import { getApiUrl } from "@/lib/api";
import { getIcon } from "@/lib/icon-map";

export interface PrintProduct {
  id: string;
  label: string;
  slug: string;
  tagline: string;
  description: string;
  icon: string;
  category: string;
  materials: string[];
  displayFinishes: string[];
  sizes: string[];
  features: string[];
  badge: string;
  overview: string[];
  howItWorks: string[];
  faqs: { question: string; answer: string }[];
}

export interface PrintCatalog {
  version: string;
  currency: string;
  categories: string[];
  products: PrintProduct[];
}

const fallbackCategories = [
  "Stationery & Cards",
  "Marketing & Labels",
  "Business & Billing",
  "Specialty Print",
];

function normalizeProducts(products: PrintProduct[]): PrintProduct[] {
  return products.map((p) => ({
    ...p,
    overview: Array.isArray(p.overview) ? p.overview : [],
    howItWorks: Array.isArray(p.howItWorks) ? p.howItWorks : [],
    faqs: Array.isArray(p.faqs) ? p.faqs : [],
  }));
}

// Server-side catalog fetch — single source of truth lives in the API. Prices
// and display data are never duplicated here; this degrades to an empty list
// when the print runtime is unreachable.
export async function getPrintCatalog(): Promise<PrintCatalog> {
  try {
    const response = await fetch(`${getApiUrl("print")}/print/catalog`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 },
    });
    if (!response.ok) throw new Error(`Catalog request failed: ${response.status}`);
    const data = (await response.json()) as PrintCatalog;
    return {
      version: data.version ?? "1.0.0",
      currency: data.currency ?? "INR",
      categories: Array.isArray(data.categories) ? data.categories : [...fallbackCategories],
      products: Array.isArray(data.products) ? normalizeProducts(data.products) : [],
    };
  } catch {
    return {
      version: "1.0.0",
      currency: "INR",
      categories: [...fallbackCategories],
      products: [],
    };
  }
}

// Re-export for convenience — maps icon string to Lucide component
export function getProductIcon(iconName: string) {
  return getIcon(iconName);
}

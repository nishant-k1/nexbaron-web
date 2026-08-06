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
}

export interface PrintCatalog {
  version: string;
  currency: string;
  categories: string[];
  products: PrintProduct[];
}

// Cache in memory for the session
let cachedCatalog: PrintCatalog | null = null;

export async function getPrintCatalog(): Promise<PrintCatalog> {
  if (cachedCatalog) return cachedCatalog;
  const response = await fetch(`${getApiUrl("print")}/print/catalog`, {
    headers: { Accept: "application/json" },
  });
  if (!response.ok) throw new Error(`Catalog request failed: ${response.status}`);
  cachedCatalog = (await response.json()) as PrintCatalog;
  return cachedCatalog;
}

// Re-export for convenience — maps icon string to Lucide component
export function getProductIcon(iconName: string) {
  return getIcon(iconName);
}

// Static exports for server components at build time (SSG pages).
// The API's /print/catalog endpoint is the runtime source of truth.
export const printCategories = [
  "Stationery & Cards",
  "Marketing & Labels",
  "Business & Billing",
  "Specialty Print",
] as const;

export function getProductsByCategory(category: string): PrintProduct[] {
  return printProducts.filter((p) => p.category === category);
}

// Minimal build-time data — full display fields come from the API at runtime
export const printProducts: PrintProduct[] = [
  {
    id: "visiting-cards",
    label: "Visiting Cards",
    slug: "visiting-cards",
    category: "Stationery & Cards",
    tagline: "Your first impression",
    description: "",
    icon: "CreditCard",
    materials: [],
    displayFinishes: [],
    sizes: [],
    features: [],
    badge: "Popular",
  },
  {
    id: "card-holders",
    label: "Card Holders",
    slug: "card-holders",
    category: "Stationery & Cards",
    tagline: "Carry with class",
    description: "",
    icon: "Wallet",
    materials: [],
    displayFinishes: [],
    sizes: [],
    features: [],
    badge: "Favourite",
  },
  {
    id: "pamphlets-posters",
    label: "Pamphlets & Posters",
    slug: "pamphlets-posters",
    category: "Marketing & Labels",
    tagline: "Get noticed",
    description: "",
    icon: "FileText",
    materials: [],
    displayFinishes: [],
    sizes: [],
    features: [],
    badge: "Volume",
  },
  {
    id: "stickers-labels",
    label: "Stickers & Labels",
    slug: "stickers-labels",
    category: "Marketing & Labels",
    tagline: "Brand every surface",
    description: "",
    icon: "Sparkles",
    materials: [],
    displayFinishes: [],
    sizes: [],
    features: [],
    badge: "Cut",
  },
  {
    id: "pens",
    label: "Pens",
    slug: "pens",
    category: "Marketing & Labels",
    tagline: "Keep your name in hand",
    description: "",
    icon: "PenTool",
    materials: [],
    displayFinishes: [],
    sizes: [],
    features: [],
    badge: "Classic",
  },
  {
    id: "sample-files",
    label: "Sample Files",
    slug: "sample-files",
    category: "Marketing & Labels",
    tagline: "Show your range",
    description: "",
    icon: "Copy",
    materials: [],
    displayFinishes: [],
    sizes: [],
    features: [],
    badge: "Tool",
  },
  {
    id: "letter-heads",
    label: "Letter Heads",
    slug: "letter-heads",
    category: "Business & Billing",
    tagline: "Professional correspondence",
    description: "",
    icon: "Mail",
    materials: [],
    displayFinishes: [],
    sizes: [],
    features: [],
    badge: "Essential",
  },
  {
    id: "envelopes",
    label: "Envelopes",
    slug: "envelopes",
    category: "Business & Billing",
    tagline: "First touch",
    description: "",
    icon: "MailOpen",
    materials: [],
    displayFinishes: [],
    sizes: [],
    features: [],
    badge: "Essential",
  },
  {
    id: "files",
    label: "Files",
    slug: "files",
    category: "Business & Billing",
    tagline: "Organized & branded",
    description: "",
    icon: "FolderOpen",
    materials: [],
    displayFinishes: [],
    sizes: [],
    features: [],
    badge: "Ready",
  },
  {
    id: "tags",
    label: "Tags",
    slug: "tags",
    category: "Business & Billing",
    tagline: "Labels & more",
    description: "",
    icon: "Tag",
    materials: [],
    displayFinishes: [],
    sizes: [],
    features: [],
    badge: "Custom",
  },
  {
    id: "bill-books",
    label: "Bill Books",
    slug: "bill-books",
    category: "Business & Billing",
    tagline: "Billing professional",
    description: "",
    icon: "Receipt",
    materials: [],
    displayFinishes: [],
    sizes: [],
    features: [],
    badge: "Essential",
  },
  {
    id: "digital-paper-printing",
    label: "Digital Printing",
    slug: "digital-paper-printing",
    category: "Business & Billing",
    tagline: "On demand",
    description: "",
    icon: "Printer",
    materials: [],
    displayFinishes: [],
    sizes: [],
    features: [],
    badge: "Demand",
  },
  {
    id: "atm-pouches",
    label: "ATM Pouches",
    slug: "atm-pouches",
    category: "Specialty Print",
    tagline: "Trusted cash",
    description: "",
    icon: "Briefcase",
    materials: [],
    displayFinishes: [],
    sizes: [],
    features: [],
    badge: "Institutional",
  },
  {
    id: "shooting-targets",
    label: "Shooting Targets",
    slug: "shooting-targets",
    category: "Specialty Print",
    tagline: "Precise targets",
    description: "",
    icon: "Target",
    materials: [],
    displayFinishes: [],
    sizes: [],
    features: [],
    badge: "Ready",
  },
];

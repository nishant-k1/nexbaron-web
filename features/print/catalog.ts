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
  try {
    const response = await fetch(`${getApiUrl("print")}/print/catalog`, {
      headers: { Accept: "application/json" },
    });
    if (!response.ok) throw new Error(`Catalog request failed: ${response.status}`);
    cachedCatalog = (await response.json()) as PrintCatalog;
  } catch {
    // Degrade gracefully to the static mirror when the print runtime is
    // unreachable, so SSG product pages never 404.
    cachedCatalog = {
      version: "1.0.0",
      currency: "INR",
      categories: [...printCategories],
      products: printProducts,
    };
  }
  return cachedCatalog;
}

// Re-export for convenience — maps icon string to Lucide component
export function getProductIcon(iconName: string) {
  return getIcon(iconName);
}

// Build-time mirror of the API catalog for SSG pages.
// Keep in sync with API's src/features/print/catalog.ts.
export const printCategories = [
  "Stationery & Cards",
  "Marketing & Labels",
  "Business & Billing",
  "Specialty Print",
] as const;

export function getProductsByCategory(category: string): PrintProduct[] {
  return printProducts.filter((p) => p.category === category);
}

export const printProducts: PrintProduct[] = [
  {
    id: "visiting-cards",
    label: "Visiting Cards",
    slug: "visiting-cards",
    category: "Stationery & Cards",
    tagline: "Your first impression, in print",
    description: "Premium visiting cards crafted on quality stocks.",
    icon: "CreditCard",
    materials: ["Premium stock"],
    displayFinishes: ["Spot UV", "Foil"],
    sizes: ["Standard"],
    features: ["Free design check"],
    badge: "Most Popular",
  },
  {
    id: "card-holders",
    label: "Card Holders",
    slug: "card-holders",
    category: "Stationery & Cards",
    tagline: "Carry with class",
    description: "Branded card holders.",
    icon: "Wallet",
    materials: ["Rigid board"],
    displayFinishes: ["Brand imprint"],
    sizes: ["Standard"],
    features: ["Bulk pricing"],
    badge: "Favourite",
  },
  {
    id: "pamphlets-posters",
    label: "Pamphlets & Posters",
    slug: "pamphlets-posters",
    category: "Marketing & Labels",
    tagline: "Get noticed",
    description: "Vibrant pamphlets and posters.",
    icon: "FileText",
    materials: ["Coated paper"],
    displayFinishes: ["Full-color"],
    sizes: ["A5-A3"],
    features: ["Bulk pricing"],
    badge: "Volume",
  },
  {
    id: "stickers-labels",
    label: "Stickers & Labels",
    slug: "stickers-labels",
    category: "Marketing & Labels",
    tagline: "Brand every surface",
    description: "Custom die-cut stickers.",
    icon: "Sparkles",
    materials: ["Vinyl"],
    displayFinishes: ["Die-cut"],
    sizes: ["Any"],
    features: ["Custom shapes"],
    badge: "Cut",
  },
  {
    id: "pens",
    label: "Pens",
    slug: "pens",
    category: "Marketing & Labels",
    tagline: "Keep your name in hand",
    description: "Branded promotional pens.",
    icon: "PenTool",
    materials: ["Plastic/metal"],
    displayFinishes: ["Logo print"],
    sizes: ["Standard"],
    features: ["Bulk pricing"],
    badge: "Classic",
  },
  {
    id: "sample-files",
    label: "Sample Files",
    slug: "sample-files",
    category: "Marketing & Labels",
    tagline: "Show your range",
    description: "Printed sample files.",
    icon: "Copy",
    materials: ["Premium covers"],
    displayFinishes: ["Custom covers"],
    sizes: ["A4"],
    features: ["Custom swatch"],
    badge: "Tool",
  },
  {
    id: "letter-heads",
    label: "Letter Heads",
    slug: "letter-heads",
    category: "Business & Billing",
    tagline: "Professional correspondence",
    description: "Branded letterheads.",
    icon: "Mail",
    materials: ["Premium paper"],
    displayFinishes: ["Full-color"],
    sizes: ["A4"],
    features: ["Brand kit match"],
    badge: "Essential",
  },
  {
    id: "envelopes",
    label: "Envelopes",
    slug: "envelopes",
    category: "Business & Billing",
    tagline: "First touch",
    description: "Branded envelopes.",
    icon: "MailOpen",
    materials: ["Kraft/white"],
    displayFinishes: ["Logo print"],
    sizes: ["DL-A5"],
    features: ["Matches letterheads"],
    badge: "Essential",
  },
  {
    id: "files",
    label: "Files",
    slug: "files",
    category: "Business & Billing",
    tagline: "Organized & branded",
    description: "Printed office files.",
    icon: "FolderOpen",
    materials: ["Rigid board"],
    displayFinishes: ["Full brand"],
    sizes: ["A4/legal"],
    features: ["Bulk pricing"],
    badge: "Ready",
  },
  {
    id: "tags",
    label: "Tags",
    slug: "tags",
    category: "Business & Billing",
    tagline: "Labels & more",
    description: "Printed tags.",
    icon: "Tag",
    materials: ["Card stock"],
    displayFinishes: ["Die-cut"],
    sizes: ["Any shape"],
    features: ["Custom"],
    badge: "Custom",
  },
  {
    id: "bill-books",
    label: "Bill Books",
    slug: "bill-books",
    category: "Business & Billing",
    tagline: "Billing professional",
    description: "Numbered bill books.",
    icon: "Receipt",
    materials: ["NCR paper"],
    displayFinishes: ["Numbered"],
    sizes: ["A5"],
    features: ["Sequential numbering"],
    badge: "Essential",
  },
  {
    id: "digital-paper-printing",
    label: "Digital Printing",
    slug: "digital-paper-printing",
    category: "Business & Billing",
    tagline: "On demand",
    description: "Quick digital prints.",
    icon: "Printer",
    materials: ["Premium papers"],
    displayFinishes: ["Full-color"],
    sizes: ["A4-A5"],
    features: ["Same-day"],
    badge: "Demand",
  },
  {
    id: "atm-pouches",
    label: "ATM Pouches",
    slug: "atm-pouches",
    category: "Specialty Print",
    tagline: "Trusted cash",
    description: "ATM pouches.",
    icon: "Briefcase",
    materials: ["Secure stock"],
    displayFinishes: ["Brand print"],
    sizes: ["Standard"],
    features: ["Institutional"],
    badge: "Institutional",
  },
  {
    id: "shooting-targets",
    label: "Shooting Targets",
    slug: "shooting-targets",
    category: "Specialty Print",
    tagline: "Precise targets",
    description: "Shooting targets.",
    icon: "Target",
    materials: ["Target paper"],
    displayFinishes: ["Ring print"],
    sizes: ["Standard"],
    features: ["Club pricing"],
    badge: "Ready",
  },
];

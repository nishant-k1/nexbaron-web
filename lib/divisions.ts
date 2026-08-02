export type DivisionSlug = "digital" | "print";

interface NavItem {
  href: string;
  label: string;
}

interface DivisionConfig {
  slug: DivisionSlug;
  name: string;
  label: string;
  tagline: string;
  whatsappNumber: string;
  nav: NavItem[];
  otherDivision: {
    href: string;
    label: string;
  };
}

const DIGITAL_WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_DIGITAL ?? "";
const PRINT_WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_PRINT ?? "";

export const divisions: Record<DivisionSlug, DivisionConfig> = {
  digital: {
    slug: "digital",
    name: "Nexbaron Digital",
    label: "DIGITAL",
    tagline: "Web • SEO • AI Automation",
    whatsappNumber: DIGITAL_WHATSAPP,
    nav: [
      { href: "/digital/services", label: "Services" },
      { href: "/digital/industries", label: "Industries" },
      { href: "/digital/contact", label: "Contact" },
    ],
    otherDivision: { href: "/print", label: "print ↗" },
  },
  print: {
    slug: "print",
    name: "Nexbaron Print",
    label: "PRINT",
    tagline: "Collaterals • Signage • Flex & Vinyl",
    whatsappNumber: PRINT_WHATSAPP,
    nav: [
      { href: "/print/products", label: "Services" },
      { href: "/print/specifications", label: "Specifications" },
      { href: "/print/bulk-orders", label: "Bulk Orders" },
    ],
    otherDivision: { href: "/digital", label: "digital ↗" },
  },
};

export function buildWhatsAppLink(division: DivisionSlug, message: string): string {
  const number = divisions[division].whatsappNumber;
  const base = number ? `https://wa.me/${number}` : "https://wa.me";
  return `${base}?text=${encodeURIComponent(message)}`;
}

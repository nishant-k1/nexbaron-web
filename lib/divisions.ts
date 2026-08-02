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
      { href: "/digital", label: "Overview" },
      { href: "/digital/services", label: "Digital Services" },
      { href: "/digital/industries", label: "Industry Solutions" },
      { href: "/digital/automation", label: "AI & WhatsApp CRM" },
      { href: "/digital/contact", label: "Contact Digital Team" },
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
      { href: "/print", label: "Overview" },
      { href: "/print/products", label: "Print Services" },
      { href: "/print/products/visiting-cards", label: "Visiting Cards" },
      { href: "/print/products/letter-heads", label: "Letterheads" },
      { href: "/print/products/bill-books", label: "Bill Books" },
      { href: "/print/quote", label: "Instant Quote Builder" },
    ],
    otherDivision: { href: "/digital", label: "digital ↗" },
  },
};

export function buildWhatsAppLink(division: DivisionSlug, message: string): string {
  const number = divisions[division].whatsappNumber;
  const base = number ? `https://wa.me/${number}` : "https://wa.me";
  return `${base}?text=${encodeURIComponent(message)}`;
}

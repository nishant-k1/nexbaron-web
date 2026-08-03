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
  social: {
    instagram: string;
    facebook: string;
    linkedin: string;
    x: string;
    pinterest: string;
    youtube: string;
    whatsapp: string;
    threads: string;
    tiktok: string;
  };
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
    tagline: "Plans • Websites • WhatsApp Growth",
    whatsappNumber: DIGITAL_WHATSAPP,
    nav: [
      { href: "/digital/solutions", label: "Solutions" },
      { href: "/digital/process", label: "Our Process" },
      { href: "/digital/pricing", label: "Pricing" },
    ],
    otherDivision: { href: "/print", label: "print ↗" },
    social: {
      instagram: "https://instagram.com/nexbarondigital",
      facebook: "https://facebook.com/nexbarondigital",
      linkedin: "https://linkedin.com/company/nexbarondigital",
      x: "https://x.com/nexbarondigital",
      pinterest: "https://pinterest.com/nexbarondigital",
      youtube: "https://youtube.com/@nexbarondigital",
      whatsapp: DIGITAL_WHATSAPP ? `https://wa.me/${DIGITAL_WHATSAPP}` : "https://wa.me",
      threads: "https://threads.net/@nexbarondigital",
      tiktok: "https://tiktok.com/@nexbarondigital",
    },
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
    social: {
      instagram: "https://instagram.com/nexbaronprint",
      facebook: "https://facebook.com/nexbaronprint",
      linkedin: "https://linkedin.com/company/nexbaronprint",
      x: "https://x.com/nexbaronprint",
      pinterest: "https://pinterest.com/nexbaronprint",
      youtube: "https://youtube.com/@nexbaronprint",
      whatsapp: PRINT_WHATSAPP ? `https://wa.me/${PRINT_WHATSAPP}` : "https://wa.me",
      threads: "https://threads.net/@nexbaronprint",
      tiktok: "https://tiktok.com/@nexbaronprint",
    },
  },
};

export function buildWhatsAppLink(division: DivisionSlug, message: string): string {
  const number = divisions[division].whatsappNumber;
  const base = number ? `https://wa.me/${number}` : "https://wa.me";
  return `${base}?text=${encodeURIComponent(message)}`;
}

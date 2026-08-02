import type { LucideIcon } from "lucide-react";
import {
  CreditCard,
  Wallet,
  FileText,
  Tag,
  FolderOpen,
  Mail,
  MailOpen,
  Printer,
  Briefcase,
  Receipt,
  Sparkles,
  PenTool,
  Target,
  Copy,
} from "lucide-react";

export interface PrintProduct {
  slug: string;
  quoteId: string;
  category: string;
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  materials: string[];
  finishes: string[];
  sizes: string[];
  features: string[];
  badge: string;
}

export const printCategories = [
  "Stationery & Cards",
  "Marketing & Labels",
  "Business & Billing",
  "Specialty Print",
] as const;

export const printProducts: PrintProduct[] = [
  {
    slug: "visiting-cards",
    quoteId: "visiting-cards",
    category: "Stationery & Cards",
    name: "Visiting Cards",
    tagline: "Your first impression, in print",
    description:
      "Premium visiting cards crafted on quality stocks with premium finishes — from spot UV to gold foil — so your business feels established the moment your card is handed over.",
    icon: CreditCard,
    materials: [
      "Premium card stocks (350 GSM class)",
      "Matte, gloss & textured surfaces",
      "Metallic & linen-look finishes",
      "PVC & specialty material options",
    ],
    finishes: [
      "Spot UV highlighting",
      "Gold & silver foil stamping",
      "Matte / gloss lamination",
      "Embossing & debossing",
    ],
    sizes: ["Standard card size", "Slim & square formats", "Custom sizes on request"],
    features: [
      "Free design check before print",
      "24-hour express on standard orders",
      "Bulk pricing available",
    ],
    badge: "Most Popular",
  },
  {
    slug: "card-holders",
    quoteId: "card-holders",
    category: "Stationery & Cards",
    name: "Card Holders",
    tagline: "Carry and present cards with class",
    description:
      "Printed and branded card holders that keep visiting cards crisp, organized, and ready to present — ideal for sales teams, executives, and corporate gifting.",
    icon: Wallet,
    materials: [
      "Rigid board & premium papers",
      "Leatherette & fabric options",
      "PVC windowed and slip-on styles",
    ],
    finishes: ["Brand imprint on cover", "Foil & emboss detailing", "Lamination for durability"],
    sizes: ["Single & double card capacity", "Wallet and desk styles", "Custom branding sizes"],
    features: ["Bulk business gifting pricing", "Custom logo printing", "Quick turnaround"],
    badge: "Corporate Favourite",
  },
  {
    slug: "pamphlets-posters",
    quoteId: "pamphlets-posters",
    category: "Marketing & Labels",
    name: "Pamphlets / Posters",
    tagline: "Marketing that gets noticed",
    description:
      "Vibrant pamphlets, leaflets, and posters printed on quality paper stocks — built to be distributed, posted, and remembered.",
    icon: FileText,
    materials: [
      "Coated art paper & card",
      "Matte / silk / gloss stocks",
      "Recycled eco-friendly options",
    ],
    finishes: [
      "Full-color digital & offset print",
      "Matte / gloss lamination",
      "Folding & creasing",
    ],
    sizes: ["A5, A4, A3 & custom", "Tri-fold & bi-fold formats", "Poster sizes on request"],
    features: ["Bulk distribution pricing", "Print-ready file review included", "Fast delivery"],
    badge: "High Volume",
  },
  {
    slug: "stickers-labels",
    quoteId: "stickers-labels",
    category: "Marketing & Labels",
    name: "Stickers & Labels",
    tagline: "Brand every surface",
    description:
      "Custom stickers and labels for products, packaging, promotions, and events — die-cut to any shape and finished to withstand daily handling.",
    icon: Sparkles,
    materials: [
      "Vinyl & adhesive label stock",
      "Glossy, matte & transparent films",
      "Paper & waterproof options",
    ],
    finishes: [
      "Die-cut custom shapes",
      "Lamination (matte / gloss)",
      "Weatherproof & removable adhesives",
    ],
    sizes: ["Any shape or size", "Roll & sheet formats", "Product, pouch & label sizes"],
    features: ["Custom die-cutting", "Bulk label pricing", "Indoor & outdoor options"],
    badge: "Custom Cut",
  },
  {
    slug: "pens",
    quoteId: "pens",
    category: "Marketing & Labels",
    name: "Pens",
    tagline: "Giveaways that keep your name in hand",
    description:
      "Branded promotional pens with your logo and message printed or engraved — the classic corporate giveaway that keeps working long after the meeting.",
    icon: PenTool,
    materials: [
      "Plastic & metal pen bodies",
      "Gel, ballpoint & fountain options",
      "Eco-friendly material choices",
    ],
    finishes: ["Logo printing (1-4 colors)", "Engraving on metal", "Custom color bodies"],
    sizes: ["Standard & slim profiles", "Gift-boxed options", "Bulk event quantities"],
    features: ["Bulk giveaway pricing", "Corporate & event branding", "Fast production"],
    badge: "Promo Classic",
  },
  {
    slug: "sample-files",
    quoteId: "sample-files",
    category: "Marketing & Labels",
    name: "Sample Files",
    tagline: "Show your range in one place",
    description:
      "Printed sample files that showcase your product range, materials, and finishes — the essential sales tool for dealers, distributors, and export teams.",
    icon: Copy,
    materials: [
      "Premium cover stocks",
      "Assorted material swatches",
      "Ring-bound & stitched options",
    ],
    finishes: ["Custom covers & branding", "Laminated & foil detailing", "Pocket & tab layouts"],
    sizes: ["A4 & custom formats", "Multi-swatch inserts", "Bound & loose-leaf styles"],
    features: ["Custom swatch selection", "Business gifting ready", "Short runs available"],
    badge: "Sales Tool",
  },
  {
    slug: "letter-heads",
    quoteId: "letter-heads",
    category: "Business & Billing",
    name: "Letter Heads",
    tagline: "Professional correspondence, branded to match your company image",
    description:
      "Branded letterheads on premium writing paper that make every official correspondence look considered and professional.",
    icon: Mail,
    materials: [
      "Premium writing paper",
      "Watermarked & security stocks",
      "Cotton & textured options",
    ],
    finishes: ["Full-color brand printing", "Embossed & foil branding", "Standard A4 cut sizes"],
    sizes: ["A4 standard", "Custom dimensions"],
    features: ["Matches your full brand kit", "Bulk business pricing", "Fast reordering"],
    badge: "Business Essential",
  },
  {
    slug: "envelopes",
    quoteId: "envelopes",
    category: "Business & Billing",
    name: "Envelopes",
    tagline: "Brand the first thing they touch",
    description:
      "Branded envelopes in every size — from daily correspondence to premium invitations — printed with your logo and finished for a premium first touch.",
    icon: MailOpen,
    materials: ["Kraft & white stocks", "Premium & security papers", "Windowed & padded options"],
    finishes: [
      "Logo & return-address printing",
      "Foil & laminated detailing",
      "Custom flap styles",
    ],
    sizes: ["DL, A4 & A5 envelopes", "Document & courier sizes", "Invitation & gifting formats"],
    features: ["Matches letterheads", "Bulk office pricing", "Quick turnaround"],
    badge: "Business Essential",
  },
  {
    slug: "files",
    quoteId: "files",
    category: "Business & Billing",
    name: "Files",
    tagline: "Organized offices, branded files",
    description:
      "Printed office files and folders with your branding — built to organize documents and reinforce your identity in every office and client meeting.",
    icon: FolderOpen,
    materials: [
      "Rigid board & laminated covers",
      "Premium paper & pouch folders",
      "Expanding & clip styles",
    ],
    finishes: ["Full brand printing", "Foil & emboss detailing", "Pocket & gusset options"],
    sizes: ["A4 & legal sizes", "Standard & expanding files", "Custom corporate formats"],
    features: ["Bulk office supply pricing", "Custom branding", "Corporate kit options"],
    badge: "Office Ready",
  },
  {
    slug: "tags",
    quoteId: "tags",
    category: "Business & Billing",
    name: "Tags",
    tagline: "Labels, price tags & more",
    description:
      "Printed tags for products, pricing, luggage, and events — die-cut, punched, and finished exactly to your specification.",
    icon: Tag,
    materials: [
      "Card & specialty tag stock",
      "Rigid & laminated options",
      "Plastic & tear-resistant types",
    ],
    finishes: ["Die-cut & punched holes", "String & attachments", "Foil & spot-UV detailing"],
    sizes: ["Any custom shape", "Standard & mini tags", "Bulk run quantities"],
    features: ["Custom die-cutting", "Bulk pricing", "Quick production"],
    badge: "Custom",
  },
  {
    slug: "bill-books",
    quoteId: "bill-books",
    category: "Business & Billing",
    name: "Bill Books",
    tagline: "Billing made professional",
    description:
      "Numbered bill books and invoice pads with carbon or NCR copies — the dependable daily billing tool for shops, clinics, and service businesses.",
    icon: Receipt,
    materials: ["NCR / carbonless paper sets", "Quality cover stocks", "Security number printing"],
    finishes: ["Numbered & perforated", "Brand covers", "2-3 part sets"],
    sizes: ["A5 & half-size bill books", "Standard invoice pads", "Custom formats"],
    features: ["Sequential numbering", "Bulk stationery pricing", "Quick turnaround"],
    badge: "Daily Essential",
  },
  {
    slug: "digital-paper-printing",
    quoteId: "digital-paper-printing",
    category: "Business & Billing",
    name: "Digital Paper Printing",
    tagline: "High-quality digital prints on demand",
    description:
      "Quick, high-quality digital paper printing for documents, reports, presentations, and small marketing runs — from a few copies to larger batches.",
    icon: Printer,
    materials: [
      "Premium office & presentation papers",
      "Coated & specialty stocks",
      "Single & double-sided options",
    ],
    finishes: ["Full-color digital print", "Binding & lamination available", "Duplex printing"],
    sizes: ["A4, A3 & A5", "Custom document formats"],
    features: [
      "Same-day turnaround on small runs",
      "Binding & finishing services",
      "Document quality guaranteed",
    ],
    badge: "On Demand",
  },
  {
    slug: "atm-pouches",
    quoteId: "atm-pouches",
    category: "Specialty Print",
    name: "ATM Pouches",
    tagline: "Trusted cash handling",
    description:
      "Printed ATM pouches and cash-handling bags for banks and businesses — produced with secure, tamper-evident options on reliable materials.",
    icon: Briefcase,
    materials: [
      "Secure pouch-grade materials",
      "Tear-resistant & sealed options",
      "Bank-compliant stocks",
    ],
    finishes: ["Brand & bank printing", "Tamper-evident sealing", "Sequential numbering"],
    sizes: ["Standard ATM pouch sizes", "Cash & document pouches", "Custom bank formats"],
    features: ["Institutional pricing", "Secure material options", "Reliable bulk supply"],
    badge: "Institutional",
  },
  {
    slug: "shooting-targets",
    quoteId: "shooting-targets",
    category: "Specialty Print",
    name: "Shooting Targets",
    tagline: "Precise targets, consistent quality",
    description:
      "Printed shooting targets for ranges, clubs, and training — produced on consistent stock with precise ring reproduction for dependable practice.",
    icon: Target,
    materials: [
      "Consistent target-grade paper",
      "Card & rigid board options",
      "Weather-resistant outdoor types",
    ],
    finishes: [
      "Precise ring & grid printing",
      "Single & multi-target layouts",
      "Custom club branding",
    ],
    sizes: ["Standard target sheet sizes", "A3, A4 & custom", "Range & competition formats"],
    features: ["Consistent quality runs", "Club & range bulk pricing", "Custom layouts"],
    badge: "Range Ready",
  },
];

export function getProductsByCategory(category: string): PrintProduct[] {
  return printProducts.filter((p) => p.category === category);
}

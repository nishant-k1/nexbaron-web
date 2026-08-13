import type { Metadata } from "next";

import { divisionOpenGraph, divisionTwitter } from "@/lib/og";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nexbaron.com";

export const metadata: Metadata = {
  title: {
    default: "Nexbaron Print | Premium Commercial Printing",
    template: "%s | Nexbaron Print",
  },
  description:
    "Nexbaron Print delivers premium commercial printing: visiting cards, card holders, letterheads, envelopes, bill books, stickers & labels, pens, and specialty print.",
  icons: {
    icon: "/favicon-print.svg",
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/print`,
    title: "Nexbaron Print | Premium Commercial Printing",
    description:
      "14 print services from visiting cards to bill books, stickers, and specialty products.",
    ...divisionOpenGraph("print"),
  },
  twitter: {
    title: "Nexbaron Print | Premium Commercial Printing",
    description:
      "14 print services from visiting cards to bill books, stickers, and specialty products.",
    ...divisionTwitter("print"),
  },
};

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: "Nexbaron Print",
  url: `${siteUrl}/print`,
  telephone: "+919899752254",
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Begusarai",
    addressRegion: "Bihar",
    postalCode: "851101",
    addressCountry: "IN",
  },
};

export default function PrintLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      {children}
    </>
  );
}

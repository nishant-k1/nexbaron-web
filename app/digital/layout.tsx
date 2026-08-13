import type { Metadata } from "next";

import { PlansProvider } from "@/features/digital/catalog";
import { divisionOpenGraph, divisionTwitter } from "@/lib/og";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nexbaron.com";

export const metadata: Metadata = {
  title: {
    default: "Nexbaron Digital | Fixed-Price Growth Plans for Local Businesses",
    template: "%s | Nexbaron Digital",
  },
  description:
    "Fixed-price growth plans that get your business found on Google and answering customers on WhatsApp 24/7. Published prices, no jargon, no lock-in. Your launch date is confirmed when you pay.",
  icons: {
    icon: "/favicon-digital.svg",
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/digital`,
    title: "Nexbaron Digital | Fixed-Price Growth Plans",
    description: "Found on Google. Booked on WhatsApp. A launch date you can count on.",
    ...divisionOpenGraph("digital"),
  },
  twitter: {
    title: "Nexbaron Digital | Fixed-Price Growth Plans",
    description: "Found on Google. Booked on WhatsApp. A launch date you can count on.",
    ...divisionTwitter("digital"),
  },
};

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Nexbaron Digital",
  url: `${siteUrl}/digital`,
  telephone: "+919002785683",
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Flat No. 402, Vasavi Residency - 1, Green House Layout, Doddathoguru",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    postalCode: "560100",
    addressCountry: "IN",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "10:00",
    closes: "19:00",
  },
};

export default function DigitalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <PlansProvider>{children}</PlansProvider>
    </>
  );
}

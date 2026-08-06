import type { Metadata } from "next";

import type { Division } from "@/lib/api";

const divisionConfig: Record<Division, { image: string; siteName: string; alt: string }> = {
  print: {
    image: "/og-print.png",
    siteName: "Nexbaron Print",
    alt: "Nexbaron Print — premium commercial printing for businesses",
  },
  digital: {
    image: "/og-digital.png",
    siteName: "Nexbaron Digital",
    alt: "Nexbaron Digital — websites, local SEO, WhatsApp CRM and AI automation",
  },
};

export function divisionOpenGraph(division: Division) {
  const { image, siteName, alt } = divisionConfig[division];
  return {
    siteName,
    images: [{ url: image, width: 1200, height: 630, alt }],
  } satisfies Metadata["openGraph"];
}

export function divisionTwitter(division: Division) {
  const { image } = divisionConfig[division];
  return {
    card: "summary_large_image",
    images: [image],
  } satisfies Metadata["twitter"];
}

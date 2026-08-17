import { getApiUrl, type Division } from "@/lib/api";

// Mirrors nexbaron-api's BusinessProfile (src/features/shared/business-profile.ts).
// The API is authoritative; the `fallback` below only prevents a blank page.
export interface BusinessProfile {
  slug: Division;
  name: string;
  address: {
    street: string;
    locality: string;
    region: string;
    postalCode: string;
    country: string;
    display: string;
  };
  geo: { lat: number; lng: number };
  phone: string;
  whatsappNumber: string;
  email: string;
  gstin: string;
  openingHours: { days: string[]; opens: string; closes: string };
  areaServed: string[];
  priceRange: string;
  sameAs: string[];
  logo: string;
  mapsQuery: string;
}

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nexbaron.com";

export function getEntityId(division: Division): string {
  return `${SITE_URL}/#${division}`;
}

export function getOrganizationId(): string {
  return `${SITE_URL}/#organization`;
}

// "+919002785683" -> "+91 90027 85683"
export function formatPhone(e164: string): string {
  if (!e164.startsWith("+91")) return e164;
  const digits = e164.slice(3);
  if (digits.length !== 10) return e164;
  return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
}

// "Monday – Saturday, 10 AM – 7 PM"
export function formatOpeningHours(profile: BusinessProfile): string {
  const { days, opens, closes } = profile.openingHours;
  const formatTime = (time: string) => {
    const [rawH = "0", rawM = "0"] = time.split(":");
    const h = Number(rawH);
    const m = Number(rawM);
    const period = h >= 12 ? "PM" : "AM";
    const hour = h % 12 === 0 ? 12 : h % 12;
    return m === 0 ? `${hour} ${period}` : `${hour}:${String(m).padStart(2, "0")} ${period}`;
  };
  const range = days.length > 1 ? `${days[0]} – ${days[days.length - 1]}` : (days[0] ?? "");
  return `${range}, ${formatTime(opens)} – ${formatTime(closes)}`;
}

// Static mirror of the API business profiles (degraded fallback only).
const fallback: Record<Division, BusinessProfile> = {
  digital: {
    slug: "digital",
    name: "Nexbaron Digital",
    address: {
      street:
        "402, Vasavi Residency - 1, Green House Layout, Doddathoguru, Electronic City Phase - 1",
      locality: "Bengaluru",
      region: "Karnataka",
      postalCode: "560100",
      country: "IN",
      display:
        "402, Vasavi Residency - 1, Green House Layout,\nDoddathoguru, Electronic City Phase - 1, Bengaluru - 560100",
    },
    geo: { lat: 12.850875, lng: 77.649625 },
    phone: "+919002785683",
    whatsappNumber: "919002785683",
    email: "nexbaron.digital@gmail.com",
    gstin: "10AAKCN1234E1Z6",
    openingHours: {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "10:00",
      closes: "19:00",
    },
    areaServed: ["Bengaluru"],
    priceRange: "₹₹",
    sameAs: [],
    logo: "/icon.svg",
    mapsQuery: "12.850875,77.649625",
  },
  print: {
    slug: "print",
    name: "Nexbaron Print",
    address: {
      street: "",
      locality: "Begusarai",
      region: "Bihar",
      postalCode: "851101",
      country: "IN",
      display: "Begusarai, Bihar - 851101",
    },
    geo: { lat: 25.555, lng: 86.16725 },
    phone: "+919899752254",
    whatsappNumber: "919899752254",
    email: "nexbaron.print@gmail.com",
    gstin: "10AAKCN1234E1Z6",
    openingHours: {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "10:00",
      closes: "19:00",
    },
    areaServed: [
      "Begusarai",
      "Patna",
      "Samastipur",
      "Khagaria",
      "Lakhisarai",
      "Munger",
      "Bhagalpur",
      "Hyderabad",
      "Chennai",
      "Mumbai",
      "Pune",
      "Delhi NCR",
    ],
    priceRange: "₹₹",
    sameAs: [],
    logo: "/icon.svg",
    mapsQuery: "25.555,86.16725",
  },
};

export async function getBusinessProfile(division: Division): Promise<BusinessProfile> {
  try {
    const response = await fetch(`${getApiUrl(division)}/${division}/business`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 },
    });
    if (!response.ok) throw new Error(`Business profile request failed: ${response.status}`);
    const data = (await response.json()) as { profile?: BusinessProfile };
    if (!data.profile) throw new Error("Empty business profile");
    return data.profile;
  } catch {
    return fallback[division];
  }
}

// Builds the schema.org LocalBusiness / ProfessionalService / Store JSON-LD.
export function buildLocalBusinessSchema(
  profile: BusinessProfile,
  schemaType: "ProfessionalService" | "Store",
): Record<string, unknown> {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@id": getEntityId(profile.slug),
    "@type": schemaType,
    name: profile.name,
    url: `${SITE_URL}/${profile.slug}`,
    telephone: profile.phone,
    email: profile.email,
    priceRange: profile.priceRange,
    image: `${SITE_URL}${profile.logo}`,
    logo: `${SITE_URL}${profile.logo}`,
    address: {
      "@type": "PostalAddress",
      ...(profile.address.street ? { streetAddress: profile.address.street } : {}),
      addressLocality: profile.address.locality,
      addressRegion: profile.address.region,
      postalCode: profile.address.postalCode,
      addressCountry: profile.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: profile.geo.lat,
      longitude: profile.geo.lng,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: profile.openingHours.days,
      opens: profile.openingHours.opens,
      closes: profile.openingHours.closes,
    },
    areaServed: profile.areaServed.map((name) => ({ "@type": "City", name })),
    parentOrganization: { "@id": getOrganizationId() },
  };
  if (profile.sameAs.length > 0) {
    schema.sameAs = profile.sameAs;
  }
  return schema;
}

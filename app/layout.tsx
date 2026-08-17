import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";

import "./globals.css";
import { AuthProvider } from "@/components/auth/auth-context";
import { ErrorBoundary } from "@/components/error-boundary";
import { Footer } from "@/components/footer/footer";
import GlobalMeshBackgroundDynamic from "@/components/motion/global-mesh-background-dynamic";
import { PageTransition } from "@/components/motion/page-transition";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { Navigation } from "@/components/navigation/navigation";
import { FloatingActions } from "@/components/ui/floating-actions";
import {
  getBusinessProfile,
  getEntityId,
  getOrganizationId,
  SITE_URL,
  type BusinessProfile,
} from "@/lib/business-profile";
import { divisions } from "@/lib/divisions";
import { ThemeProvider } from "@/theme/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  preload: false,
  fallback: [
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "sans-serif",
  ],
  adjustFontFallback: true,
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  preload: false,
  fallback: [
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "sans-serif",
  ],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: {
    default: "Nexbaron Private Limited | Digital & Print Solutions",
    template: "%s | Nexbaron",
  },
  description:
    "Nexbaron Private Limited operates two independent divisions: Nexbaron Digital (business websites, local SEO, WhatsApp Business & AI automation) and Nexbaron Print (visiting cards, letterheads, bill books, stickers & labels, and commercial print).",
  authors: [{ name: "Nexbaron Private Limited" }],
  creator: "Nexbaron Private Limited",
  publisher: "Nexbaron Private Limited",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "Nexbaron",
    title: "Nexbaron Private Limited | Digital & Print Solutions",
    description:
      "Nexbaron Digital grows your business online. Nexbaron Print manufactures premium physical marketing collateral. One enterprise, two autonomous divisions.",
    images: [{ url: "/icon.svg", width: 512, height: 512, alt: "Nexbaron" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexbaron Private Limited",
    description: "Digital & Print Solutions",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

function organizationJsonLd(digital: BusinessProfile, print: BusinessProfile) {
  return {
    "@context": "https://schema.org",
    "@id": getOrganizationId(),
    "@type": "Organization",
    name: "Nexbaron Private Limited",
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    description:
      "Nexbaron Private Limited operates two independent divisions: Nexbaron Digital and Nexbaron Print.",
    address: {
      "@type": "PostalAddress",
      streetAddress: digital.address.street,
      addressLocality: digital.address.locality,
      addressRegion: digital.address.region,
      postalCode: digital.address.postalCode,
      addressCountry: digital.address.country,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: digital.phone,
      contactType: "customer service",
      availableLanguage: ["English", "Hindi"],
    },
    subOrganization: [
      {
        "@type": "Organization",
        "@id": getEntityId("digital"),
        name: digital.name,
        url: `${SITE_URL}/digital`,
      },
      {
        "@type": "Organization",
        "@id": getEntityId("print"),
        name: print.name,
        url: `${SITE_URL}/print`,
      },
    ],
    sameAs: [
      divisions.digital.social.instagram,
      divisions.digital.social.facebook,
      divisions.digital.social.linkedin,
      divisions.print.social.instagram,
      divisions.print.social.facebook,
      divisions.print.social.linkedin,
    ],
  };
}

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@id": `${SITE_URL}/#website`,
  "@type": "WebSite",
  url: SITE_URL,
  name: "Nexbaron",
  publisher: { "@id": getOrganizationId() },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [digital, print] = await Promise.all([
    getBusinessProfile("digital"),
    getBusinessProfile("print"),
  ]);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href="https://cdn.pixabay.com" />
        <link rel="preconnect" href="https://cdn.pixabay.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd(digital, print)) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${montserrat.variable} font-body`}>
        <ScrollProgress />
        <ErrorBoundary>
          <ThemeProvider>
            <AuthProvider>
              <GlobalMeshBackgroundDynamic />
              <a href="#main-content" className="skip-to-content">
                Skip to main content
              </a>
              <Navigation />
              <main id="main-content" className="flex-1">
                <PageTransition>{children}</PageTransition>
              </main>
              <Footer digital={digital} print={print} />
              <FloatingActions />
            </AuthProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}

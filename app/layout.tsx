import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Inter, Montserrat } from "next/font/google";

import "./globals.css";
import { AuthProvider } from "@/components/auth/auth-context";
import { Footer } from "@/components/footer/footer";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { Navigation } from "@/components/navigation/navigation";
import { FloatingActions } from "@/components/ui/floating-actions";
import { LiveChat } from "@/components/ui/live-chat";
import { ThemeProvider } from "@/theme/theme-provider";

const GlobalMeshBackground = dynamic(
  () =>
    import("@/components/motion/global-mesh-background").then((mod) => ({
      default: mod.GlobalMeshBackground,
    })),
  { ssr: false },
);

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
  keywords: [
    "Nexbaron",
    "Nexbaron Digital",
    "Nexbaron Print",
    "website design",
    "local SEO",
    "WhatsApp Business",
    "visiting cards printing",
    "letterhead printing",
    "bill book printing",
    "stickers & labels printing",
  ],
  authors: [{ name: "Nexbaron Private Limited" }],
  creator: "Nexbaron Private Limited",
  publisher: "Nexbaron Private Limited",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://nexbaron.com"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "Nexbaron",
    title: "Nexbaron Private Limited | Digital & Print Solutions",
    description:
      "Nexbaron Digital grows your business online. Nexbaron Print manufactures premium physical marketing collateral. One enterprise, two autonomous divisions.",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Nexbaron Private Limited",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://nexbaron.com",
  logo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://nexbaron.com"}/icon.svg`,
  description:
    "Nexbaron Private Limited operates two independent divisions: Nexbaron Digital and Nexbaron Print.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Flat No. 402, Vasavi Residency - 1, Green House Layout, Doddathoguru",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    postalCode: "560100",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-90027-85683",
    contactType: "customer service",
    availableLanguage: ["English", "Hindi"],
  },
  subOrganization: [
    {
      "@type": "Organization",
      name: "Nexbaron Digital",
      url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://nexbaron.com"}/digital`,
    },
    {
      "@type": "Organization",
      name: "Nexbaron Print",
      url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://nexbaron.com"}/print`,
    },
  ],
  sameAs: [
    "https://instagram.com/nexbarondigital",
    "https://facebook.com/nexbarondigital",
    "https://linkedin.com/company/nexbarondigital",
    "https://instagram.com/nexbaronprint",
    "https://facebook.com/nexbaronprint",
    "https://linkedin.com/company/nexbaronprint",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href="https://cdn.pixabay.com" />
        <link rel="preconnect" href="https://cdn.pixabay.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${montserrat.variable} font-body`}>
        <ScrollProgress />
        <ThemeProvider>
          <AuthProvider>
            <GlobalMeshBackground />
            <a href="#main-content" className="skip-to-content">
              Skip to main content
            </a>
            <Navigation />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
            <FloatingActions />
            <LiveChat />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

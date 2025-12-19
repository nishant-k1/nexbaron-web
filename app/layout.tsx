import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/theme/theme-provider";
import { Navigation } from "@/features/navigation/components/navigation";
import { Footer } from "@/features/footer/components/footer";
import { GlobalMeshBackground } from "@/components/motion/global-mesh-background";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  preload: true,
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default:
      "Nexbaron Services Private Limited | Leading Infrastructure Solutions",
    template: "%s | Nexbaron Services",
  },
  description:
    "Nexbaron Services Private Limited delivers world-class infrastructure solutions across multiple industries. Trusted partner for engineering excellence and compliance.",
  keywords: [
    "infrastructure",
    "engineering",
    "compliance",
    "construction",
    "Nexbaron",
  ],
  authors: [{ name: "Nexbaron Services Private Limited" }],
  creator: "Nexbaron Services Private Limited",
  publisher: "Nexbaron Services Private Limited",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://nexbaron.com"
  ),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "Nexbaron Services",
    title:
      "Nexbaron Services Private Limited | Leading Infrastructure Solutions",
    description:
      "World-class infrastructure solutions across multiple industries.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexbaron Services Private Limited",
    description: "Leading Infrastructure Solutions",
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
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Nexbaron Services Private Limited",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://nexbaron.com",
  logo: `${
    process.env.NEXT_PUBLIC_SITE_URL || "https://nexbaron.com"
  }/logo.png`,
  description: "Leading infrastructure solutions provider",
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
  },
  sameAs: [],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${montserrat.variable} font-body`}>
        <ThemeProvider>
          <GlobalMeshBackground />
          <a href="#main-content" className="skip-to-content">
            Skip to main content
          </a>
          <Navigation />
          <main id="main-content">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

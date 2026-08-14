import { type MetadataRoute } from "next";

import { getBusinesses } from "@/features/digital/businesses";
import { getServiceCatalog } from "@/features/digital/services";
import { getPrintCatalog } from "@/features/print/catalog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nexbaron.com";

  const routes: Array<{
    path: string;
    priority: number;
    changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  }> = [
    { path: "", priority: 1, changeFrequency: "monthly" },
    { path: "/digital", priority: 0.9, changeFrequency: "weekly" },
    { path: "/print", priority: 0.9, changeFrequency: "weekly" },
    { path: "/print/quote", priority: 0.9, changeFrequency: "weekly" },
    { path: "/digital/pricing", priority: 0.8, changeFrequency: "monthly" },
    { path: "/digital/who-we-help", priority: 0.8, changeFrequency: "monthly" },
    { path: "/digital/automation", priority: 0.8, changeFrequency: "monthly" },
    { path: "/digital/solutions", priority: 0.8, changeFrequency: "monthly" },
    { path: "/digital/web-design", priority: 0.8, changeFrequency: "monthly" },
    { path: "/digital/local-seo", priority: 0.8, changeFrequency: "monthly" },
    { path: "/digital/social-media", priority: 0.8, changeFrequency: "monthly" },
    { path: "/digital/online-ads", priority: 0.8, changeFrequency: "monthly" },
    { path: "/digital/website-care", priority: 0.8, changeFrequency: "monthly" },
    { path: "/digital/custom-software", priority: 0.8, changeFrequency: "monthly" },
    { path: "/digital/results", priority: 0.8, changeFrequency: "monthly" },
    { path: "/digital/process", priority: 0.8, changeFrequency: "monthly" },
    { path: "/digital/why-nexbaron", priority: 0.8, changeFrequency: "monthly" },
    { path: "/digital/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/digital/faq", priority: 0.7, changeFrequency: "monthly" },
    { path: "/digital/contact", priority: 0.7, changeFrequency: "monthly" },
    { path: "/print/products", priority: 0.8, changeFrequency: "monthly" },
    { path: "/print/specifications", priority: 0.6, changeFrequency: "monthly" },
    { path: "/print/about", priority: 0.6, changeFrequency: "monthly" },
    { path: "/print/contact", priority: 0.6, changeFrequency: "monthly" },
    { path: "/about", priority: 0.6, changeFrequency: "monthly" },
    { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
    { path: "/refund", priority: 0.2, changeFrequency: "yearly" },
  ];

  const catalog = await getServiceCatalog();
  const sectionBySlug = new Map(catalog.sections.map((s) => [s.id, s.slug]));
  const serviceRoutes = catalog.services.map((s) => ({
    path: `/digital/${sectionBySlug.get(s.section) ?? s.section}/${s.id}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  const businesses = await getBusinesses();
  const businessRoutes = businesses.map((b) => ({
    path: `/digital/who-we-help/${b.slug}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  const printCatalog = await getPrintCatalog();
  const printProductRoutes = printCatalog.products.map((p) => ({
    path: `/print/products/${p.slug}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  return [...routes, ...serviceRoutes, ...businessRoutes, ...printProductRoutes].map((route) => ({
    url: `${baseUrl}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}

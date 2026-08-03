import { type MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
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
    { path: "/digital/contact", priority: 0.7, changeFrequency: "monthly" },
    { path: "/print/products", priority: 0.8, changeFrequency: "monthly" },
    { path: "/print/products/visiting-cards", priority: 0.7, changeFrequency: "monthly" },
    { path: "/print/products/card-holders", priority: 0.7, changeFrequency: "monthly" },
    { path: "/print/products/pamphlets-posters", priority: 0.7, changeFrequency: "monthly" },
    { path: "/print/products/tags", priority: 0.7, changeFrequency: "monthly" },
    { path: "/print/products/files", priority: 0.7, changeFrequency: "monthly" },
    { path: "/print/products/letter-heads", priority: 0.7, changeFrequency: "monthly" },
    { path: "/print/products/envelopes", priority: 0.7, changeFrequency: "monthly" },
    { path: "/print/products/digital-paper-printing", priority: 0.7, changeFrequency: "monthly" },
    { path: "/print/products/atm-pouches", priority: 0.7, changeFrequency: "monthly" },
    { path: "/print/products/bill-books", priority: 0.7, changeFrequency: "monthly" },
    { path: "/print/products/stickers-labels", priority: 0.7, changeFrequency: "monthly" },
    { path: "/print/products/pens", priority: 0.7, changeFrequency: "monthly" },
    { path: "/print/products/shooting-targets", priority: 0.7, changeFrequency: "monthly" },
    { path: "/print/products/sample-files", priority: 0.7, changeFrequency: "monthly" },
    { path: "/print/specifications", priority: 0.6, changeFrequency: "monthly" },
    { path: "/print/bulk-orders", priority: 0.6, changeFrequency: "monthly" },
    { path: "/about", priority: 0.6, changeFrequency: "monthly" },
    { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}

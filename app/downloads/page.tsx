import { Metadata } from "next";
import { SectionReveal } from "@/components/motion/section-reveal";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Downloads",
  description:
    "Download company brochures, compliance documents, and tender-related materials from Nexbaron Services.",
  openGraph: {
    title: "Downloads | Nexbaron Services",
    description: "Company documents, brochures, and tender materials.",
  },
};

const downloadCategories = [
  {
    title: "Company Brochures",
    description: "Download our company profile and service brochures.",
    items: [
      { name: "Company Profile", size: "2.5 MB", format: "PDF" },
      { name: "Services Overview", size: "1.8 MB", format: "PDF" },
    ],
  },
  {
    title: "Compliance Documents",
    description: "Access our compliance certificates and regulatory documents.",
    items: [
      { name: "ISO 9001 Certificate", size: "1.2 MB", format: "PDF" },
      { name: "Compliance Statement", size: "0.9 MB", format: "PDF" },
    ],
  },
  {
    title: "Tender Documents",
    description: "Download tender-related documents and submission guidelines.",
    items: [
      { name: "Tender Submission Guidelines", size: "1.5 MB", format: "PDF" },
      {
        name: "Technical Specifications Template",
        size: "2.1 MB",
        format: "PDF",
      },
    ],
  },
];

export default function DownloadsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <h1 className="text-4xl md:text-5xl font-heading font-normal mb-4">
              Downloads
            </h1>
            <p className="text-xl text-white/90 max-w-3xl">
              Access company documents, brochures, and tender-related materials.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Downloads Content */}
      <section className="py-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="max-w-4xl mx-auto space-y-12">
              {downloadCategories.map((category) => (
                <div
                  key={category.title}
                  className="bg-white/5 backdrop-blur-sm p-6 shadow-surface border-0"
                >
                  <h2 className="text-2xl font-heading font-normal text-white mb-2">
                    {category.title}
                  </h2>
                  <p className="text-white/90 mb-6">{category.description}</p>
                  <ul className="space-y-4">
                    {category.items.map((item) => (
                      <li
                        key={item.name}
                        className="flex items-center justify-between p-4 border-0 hover:bg-white/5 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <Download className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-normal text-white">
                              {item.name}
                            </p>
                            <p className="text-sm text-white/80">
                              {item.size} • {item.format}
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Download
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}

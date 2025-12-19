import { Metadata } from "next";
import { SectionReveal } from "@/components/motion/section-reveal";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Nexbaron Services serves diverse industries including construction, manufacturing, energy, and infrastructure development.",
  openGraph: {
    title: "Industries | Nexbaron Services",
    description:
      "Serving diverse industries with specialized infrastructure solutions.",
  },
};

const industries = [
  {
    title: "Construction",
    description:
      "Comprehensive infrastructure solutions for construction projects, ensuring compliance, quality, and timely delivery.",
  },
  {
    title: "Manufacturing",
    description:
      "Specialized services for manufacturing facilities, including process optimization, compliance, and quality assurance.",
  },
  {
    title: "Energy & Utilities",
    description:
      "Infrastructure solutions for energy and utility sectors, focusing on reliability, efficiency, and regulatory compliance.",
  },
  {
    title: "Transportation",
    description:
      "Engineering and project management services for transportation infrastructure projects, ensuring safety and compliance.",
  },
  {
    title: "Healthcare",
    description:
      "Specialized infrastructure solutions for healthcare facilities, meeting stringent regulatory and quality requirements.",
  },
  {
    title: "Commercial & Residential",
    description:
      "Comprehensive services for commercial and residential developments, ensuring quality, compliance, and sustainability.",
  },
];

export default function IndustriesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <h1 className="text-4xl md:text-5xl font-heading font-normal mb-4">
              Industries We Serve
            </h1>
            <p className="text-xl text-white/90 max-w-3xl">
              Specialized infrastructure solutions across diverse industries.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {industries.map((industry) => (
                <div
                  key={industry.title}
                  className="bg-white/5 backdrop-blur-sm p-6 shadow-surface hover:shadow-elevated transition-shadow border-0"
                >
                  <h3 className="text-xl font-heading font-normal text-white mb-3">
                    {industry.title}
                  </h3>
                  <p className="text-white/90">{industry.description}</p>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}

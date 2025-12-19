import { Metadata } from "next";
import { SectionReveal } from "@/components/motion/section-reveal";
import { AnimatedMeshBackground } from "@/components/motion/animated-mesh-background";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Comprehensive infrastructure solutions including engineering, compliance, project management, and quality assurance services.",
  openGraph: {
    title: "Services | Nexbaron Services",
    description:
      "Comprehensive infrastructure solutions for your business needs.",
  },
};

const services = [
  {
    title: "Engineering & Design",
    description:
      "Advanced engineering solutions with cutting-edge design methodologies. Our team delivers innovative designs that optimize performance, efficiency, and sustainability.",
  },
  {
    title: "Compliance & Certification",
    description:
      "Comprehensive compliance services ensuring all projects meet regulatory requirements and industry standards. We handle certifications, audits, and regulatory submissions.",
  },
  {
    title: "Project Management",
    description:
      "End-to-end project management with meticulous attention to detail. From planning to execution, we ensure timely delivery within budget and scope.",
  },
  {
    title: "Quality Assurance",
    description:
      "Rigorous quality assurance processes to maintain the highest standards. Our QA protocols ensure reliability, safety, and compliance throughout the project lifecycle.",
  },
  {
    title: "Consulting Services",
    description:
      "Expert consulting services to guide your infrastructure decisions. We provide strategic insights and technical expertise to optimize your projects.",
  },
  {
    title: "Technical Support",
    description:
      "Ongoing technical support and maintenance services. We provide continuous assistance to ensure optimal performance and compliance of your infrastructure.",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <AnimatedMeshBackground className="bg-primary">
        <section className="relative text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionReveal>
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                Our Services
              </h1>
              <p className="text-xl text-white/90 max-w-3xl">
                Comprehensive infrastructure solutions tailored to meet your
                business needs.
              </p>
            </SectionReveal>
          </div>
        </section>
      </AnimatedMeshBackground>

      {/* Services Grid */}
      <section className="py-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div
                  key={service.title}
                  className="bg-neutral-surface p-6 rounded-lg shadow-surface hover:shadow-elevated transition-shadow"
                >
                  <h3 className="text-xl font-heading font-semibold text-heading mb-3">
                    {service.title}
                  </h3>
                  <p className="text-body">{service.description}</p>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}

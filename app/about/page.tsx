import { Metadata } from "next";
import { SectionReveal } from "@/components/motion/section-reveal";
import { generateBreadcrumbJsonLd } from "@/lib/breadcrumbs";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Nexbaron Services Private Limited, our mission, values, and commitment to excellence in infrastructure solutions.",
  openGraph: {
    title: "About Us | Nexbaron Services",
    description:
      "Our mission, values, and commitment to excellence in infrastructure solutions.",
  },
};

const breadcrumbs = generateBreadcrumbJsonLd([
  { name: "Home", url: "/" },
  { name: "About", url: "/about" },
]);

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      {/* Hero */}
      <section className="relative text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <h1 className="text-4xl md:text-5xl font-heading font-normal mb-4">
              About Nexbaron Services
            </h1>
            <p className="text-xl text-white/90 max-w-3xl">
              Delivering excellence in infrastructure solutions with unwavering
              commitment to quality and compliance.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Mission */}
      <section className="py-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-heading font-normal text-heading mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-body mb-6">
                Nexbaron Services Private Limited is dedicated to providing
                world-class infrastructure solutions that drive progress and
                innovation. We combine engineering excellence with rigorous
                compliance standards to deliver projects that exceed
                expectations.
              </p>
              <p className="text-lg text-body">
                Our mission is to be the trusted partner of choice for
                organizations seeking reliable, compliant, and innovative
                infrastructure solutions across diverse industries.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Values */}
      <section className="py-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-heading font-normal text-heading mb-8 text-center">
                Our Values
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/5 backdrop-blur-sm p-6 shadow-surface border-0">
                  <h3 className="text-xl font-heading font-normal text-white mb-3">
                    Excellence
                  </h3>
                  <p className="text-white/90">
                    We strive for excellence in every project, ensuring the
                    highest standards of quality and performance.
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-6 shadow-surface border-0">
                  <h3 className="text-xl font-heading font-normal text-white mb-3">
                    Integrity
                  </h3>
                  <p className="text-white/90">
                    Honesty, transparency, and ethical practices guide all our
                    business operations and client relationships.
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-6 shadow-surface border-0">
                  <h3 className="text-xl font-heading font-normal text-white mb-3">
                    Innovation
                  </h3>
                  <p className="text-white/90">
                    We embrace innovative solutions and cutting-edge
                    technologies to deliver superior results.
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-6 shadow-surface border-0">
                  <h3 className="text-xl font-heading font-normal text-white mb-3">
                    Compliance
                  </h3>
                  <p className="text-white/90">
                    Rigorous adherence to regulatory requirements and industry
                    standards is fundamental to our operations.
                  </p>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Team */}
      <section className="py-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-heading font-normal text-heading mb-6 text-center">
                Our Team
              </h2>
              <p className="text-lg text-body text-center mb-8">
                Our team of experienced professionals brings decades of combined
                expertise in engineering, project management, compliance, and
                quality assurance. We are committed to continuous learning and
                staying at the forefront of industry best practices.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}

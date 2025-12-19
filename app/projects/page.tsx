import { Metadata } from "next";
import { SectionReveal } from "@/components/motion/section-reveal";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore our portfolio of successful infrastructure projects across various industries.",
  openGraph: {
    title: "Projects | Nexbaron Services",
    description: "Our portfolio of successful infrastructure projects.",
  },
};

export default function ProjectsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <h1 className="text-4xl md:text-5xl font-heading font-normal mb-4">
              Our Projects
            </h1>
            <p className="text-xl text-white/90 max-w-3xl">
              Showcasing our successful infrastructure projects and
              achievements.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Projects Content */}
      <section className="py-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-body mb-8">
                Nexbaron Services Private Limited has successfully delivered
                numerous infrastructure projects across various industries. Our
                portfolio reflects our commitment to excellence, compliance, and
                client satisfaction.
              </p>
              <p className="text-lg text-body">
                Each project is executed with meticulous attention to detail,
                rigorous quality assurance, and unwavering adherence to
                regulatory requirements. We take pride in our track record of
                delivering projects on time, within budget, and exceeding
                expectations.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}

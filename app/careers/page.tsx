import { Metadata } from "next";
import { SectionReveal } from "@/components/motion/section-reveal";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Nexbaron Services Private Limited. Explore career opportunities in engineering, project management, and compliance.",
  openGraph: {
    title: "Careers | Nexbaron Services",
    description: "Join our team and build your career with us.",
  },
};

const benefits = [
  "Competitive compensation packages",
  "Professional development opportunities",
  "Collaborative work environment",
  "Health and wellness programs",
  "Flexible work arrangements",
  "Career growth opportunities",
];

export default function CareersPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <h1 className="text-4xl md:text-5xl font-heading font-normal mb-4">
              Careers
            </h1>
            <p className="text-xl text-white/90 max-w-3xl">
              Join our team and be part of delivering excellence in
              infrastructure solutions.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Careers Content */}
      <section className="py-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-heading font-normal text-heading mb-6">
                Why Join Nexbaron Services?
              </h2>
              <p className="text-lg text-body mb-8">
                At Nexbaron Services Private Limited, we believe in fostering a
                culture of excellence, innovation, and continuous learning. We
                offer exciting career opportunities for professionals passionate
                about infrastructure solutions, engineering, and compliance.
              </p>

              <h3 className="text-2xl font-heading font-normal text-heading mb-4">
                Benefits & Perks
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-body">{benefit}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-2xl font-heading font-normal text-heading mb-4">
                Open Positions
              </h3>
              <p className="text-body mb-6">
                We are always looking for talented individuals to join our team.
                If you don't see a position that matches your skills, we
                encourage you to reach out to us.
              </p>

              <div className="bg-white/5 backdrop-blur-sm p-6 mb-8 border-0">
                <p className="text-white/90 mb-4">
                  Currently, we don't have any open positions listed. However,
                  we welcome inquiries from qualified candidates.
                </p>
                <Button asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}

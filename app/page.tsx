import { Metadata } from "next";
import { SectionReveal } from "@/components/motion/section-reveal";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { AnimatedMeshBackground } from "@/components/motion/animated-mesh-background";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Nexbaron Services Private Limited delivers world-class infrastructure solutions across multiple industries.",
  openGraph: {
    title:
      "Nexbaron Services Private Limited | Leading Infrastructure Solutions",
    description:
      "World-class infrastructure solutions across multiple industries.",
  },
};

const features = [
  "Engineering Excellence",
  "Compliance & Certification",
  "Multi-Industry Expertise",
  "Trusted Partnerships",
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <AnimatedMeshBackground className="bg-primary">
        <section className="relative text-white py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionReveal>
              <div className="max-w-3xl">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
                  Leading Infrastructure Solutions for Tomorrow
                </h1>
                <p className="text-xl md:text-2xl text-white/90 mb-8">
                  Nexbaron Services Private Limited delivers world-class
                  infrastructure solutions across multiple industries, combining
                  engineering excellence with unwavering commitment to
                  compliance and quality.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90"
                  >
                    <Link href="/contact">
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10"
                  >
                    <Link href="/services">Our Services</Link>
                  </Button>
                </div>
              </div>
            </SectionReveal>
          </div>
        </section>
      </AnimatedMeshBackground>
      {/* Features Section */}
      <section className="py-section bg-surface">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div
                  key={feature}
                  className="bg-neutral-surface p-6 rounded-lg shadow-surface"
                >
                  <CheckCircle className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-lg font-heading font-semibold text-heading mb-2">
                    {feature}
                  </h3>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-heading mb-6">
                About Nexbaron Services
              </h2>
              <p className="text-lg text-body mb-8">
                With a commitment to excellence and innovation, Nexbaron
                Services Private Limited has established itself as a trusted
                partner in delivering comprehensive infrastructure solutions.
                Our team of experienced professionals brings decades of combined
                expertise to every project.
              </p>
              <Button asChild>
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-section bg-surface">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-heading mb-4">
                Our Services
              </h2>
              <p className="text-lg text-body max-w-2xl mx-auto">
                Comprehensive solutions tailored to meet your infrastructure
                needs
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-neutral-surface p-6 rounded-lg shadow-surface">
                <h3 className="text-xl font-heading font-semibold text-heading mb-3">
                  Engineering & Design
                </h3>
                <p className="text-body">
                  Advanced engineering solutions with cutting-edge design
                  methodologies.
                </p>
              </div>
              <div className="bg-neutral-surface p-6 rounded-lg shadow-surface">
                <h3 className="text-xl font-heading font-semibold text-heading mb-3">
                  Compliance & Certification
                </h3>
                <p className="text-body">
                  Ensuring all projects meet the highest standards of compliance
                  and certification.
                </p>
              </div>
              <div className="bg-neutral-surface p-6 rounded-lg shadow-surface">
                <h3 className="text-xl font-heading font-semibold text-heading mb-3">
                  Project Management
                </h3>
                <p className="text-body">
                  End-to-end project management with meticulous attention to
                  detail.
                </p>
              </div>
            </div>
            <div className="text-center mt-12">
              <Button asChild>
                <Link href="/services">View All Services</Link>
              </Button>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}

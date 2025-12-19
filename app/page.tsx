import { Metadata } from "next";
import { SectionReveal } from "@/components/motion/section-reveal";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import Image from "next/image";

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
      <section className="relative text-white py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-normal mb-6">
                Leading Infrastructure Solutions for Tomorrow
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8">
                Nexbaron Services Private Limited delivers world-class
                infrastructure solutions across multiple industries, combining
                engineering excellence with unwavering commitment to compliance
                and quality.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-white/5 backdrop-blur-sm text-white border-0 hover:bg-white/8"
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
                  className="border-white text-white hover:bg-white/8"
                >
                  <Link href="/services">Our Services</Link>
                </Button>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div
                  key={feature}
                  className="bg-white/5 backdrop-blur-sm p-6 shadow-surface border-0"
                >
                  <CheckCircle className="h-8 w-8 text-white mb-4" />
                  <h3 className="text-lg font-heading font-normal text-white mb-2">
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
              <h2 className="text-3xl md:text-4xl font-heading font-normal text-heading mb-6">
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
      <section className="py-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-0">
                <h3 className="text-3xl md:text-4xl font-heading font-normal text-heading mb-4">
                  Our Services
                </h3>
                <p className="text-lg text-body max-w-2xl">
                  Comprehensive solutions tailored to meet your infrastructure
                  needs
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-6 shadow-surface border-0">
                <h3 className="text-xl font-heading font-normal text-white mb-3">
                  Compliance & Certification
                </h3>
                <p className="text-white/90">
                  Ensuring all projects meet the highest standards of compliance
                  and certification.
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-6 shadow-surface border-0">
                <h3 className="text-xl font-heading font-normal text-white mb-3">
                  Project Management
                </h3>
                <p className="text-white/90">
                  End-to-end project management with meticulous attention to
                  detail.
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-0 shadow-surface border-0 overflow-hidden">
                <Image
                  src="https://cdn.pixabay.com/photo/2024/03/22/12/21/ai-generated-8649580_1280.jpg"
                  alt="Quality Assurance"
                  width={800}
                  height={600}
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-6 shadow-surface border-0">
                <h3 className="text-xl font-heading font-normal text-white mb-3">
                  Consulting Services
                </h3>
                <p className="text-white/90">
                  Expert consulting services to guide your infrastructure
                  decisions with strategic insights.
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-6 shadow-surface border-0">
                <h3 className="text-xl font-heading font-normal text-white mb-3">
                  Technical Support
                </h3>
                <p className="text-white/90">
                  Ongoing technical support and maintenance services for optimal
                  performance and compliance.
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

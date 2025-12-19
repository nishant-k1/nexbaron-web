import { Metadata } from "next";
import { SectionReveal } from "@/components/motion/section-reveal";
import { ContactForm } from "@/features/contact/components/contact-form";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Nexbaron Services Private Limited. Contact us for inquiries, project discussions, or tender submissions.",
  openGraph: {
    title: "Contact Us | Nexbaron Services",
    description:
      "Get in touch with our team for inquiries and project discussions.",
  },
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <h1 className="text-4xl md:text-5xl font-heading font-normal mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-white/90 max-w-3xl">
              Get in touch with our team for inquiries, project discussions, or
              tender submissions.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="hidden lg:block">
                <Image
                  src="/undraw_agreement_ftet.svg"
                  alt="Contact us"
                  width={300}
                  height={300}
                  className="w-full h-auto max-w-xs"
                />
              </div>
              <div>
                <ContactForm />
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}

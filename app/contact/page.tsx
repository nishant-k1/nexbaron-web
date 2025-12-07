import { Metadata } from 'next'
import { SectionReveal } from '@/components/motion/section-reveal'
import { ContactForm } from '@/features/contact/components/contact-form'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Nexbaron Services Private Limited. Contact us for inquiries, project discussions, or tender submissions.',
  openGraph: {
    title: 'Contact Us | Nexbaron Services',
    description: 'Get in touch with our team for inquiries and project discussions.',
  },
}

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-white/90 max-w-3xl">
              Get in touch with our team for inquiries, project discussions, or tender submissions.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="max-w-2xl mx-auto">
              <ContactForm />
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  )
}


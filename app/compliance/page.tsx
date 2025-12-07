import { Metadata } from 'next'
import { SectionReveal } from '@/components/motion/section-reveal'
import { CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Compliance',
  description: 'Nexbaron Services maintains rigorous compliance standards and certifications. Learn about our commitment to regulatory adherence and quality assurance.',
  openGraph: {
    title: 'Compliance | Nexbaron Services',
    description: 'Our commitment to compliance, certifications, and regulatory adherence.',
  },
}

const complianceItems = [
  'ISO 9001:2015 Quality Management System',
  'ISO 14001:2015 Environmental Management',
  'OHSAS 18001 / ISO 45001 Occupational Health & Safety',
  'Industry-specific regulatory compliance',
  'Regular audits and certifications',
  'Continuous improvement processes',
]

export default function CompliancePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Compliance & Certifications
            </h1>
            <p className="text-xl text-white/90 max-w-3xl">
              Rigorous adherence to regulatory requirements and industry standards.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Compliance Content */}
      <section className="py-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-heading mb-6">
                Our Compliance Commitment
              </h2>
              <p className="text-lg text-body mb-8">
                Nexbaron Services Private Limited is committed to maintaining the highest standards of compliance and certification. We understand that regulatory adherence is not just a requirement but a fundamental aspect of delivering trustworthy, reliable infrastructure solutions.
              </p>
              <p className="text-lg text-body mb-8">
                Our compliance framework ensures that all projects meet or exceed applicable regulatory requirements, industry standards, and best practices. We maintain comprehensive documentation, undergo regular audits, and continuously improve our processes.
              </p>

              <h3 className="text-2xl font-heading font-semibold text-heading mb-4">
                Certifications & Standards
              </h3>
              <ul className="space-y-3 mb-8">
                {complianceItems.map((item) => (
                  <li key={item} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-body">{item}</span>
                  </li>
                ))}
              </ul>

              <p className="text-lg text-body">
                We work closely with regulatory bodies and certification agencies to ensure ongoing compliance. Our team stays updated with the latest regulatory changes and industry standards to provide our clients with the most current and compliant solutions.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  )
}


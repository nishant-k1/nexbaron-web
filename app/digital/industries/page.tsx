import { Stethoscope, Utensils, Scale, Dumbbell, Building, Briefcase } from "lucide-react";
import { type Metadata } from "next";

import { CTABanner } from "@/components/sections/cta-banner";
import { FeatureSection } from "@/components/sections/feature-section";
import { PageHero } from "@/components/sections/page-hero";
import { buildWhatsAppLink } from "@/lib/divisions";
import { divisionOpenGraph, divisionTwitter } from "@/lib/og";

export const metadata: Metadata = {
  title: "Industry Solutions | Nexbaron Digital",
  description:
    "Websites, Google Business Profile, and WhatsApp automation tailored for clinics, restaurants, law & CA firms, salons, gyms, real estate, and startups.",
  openGraph: {
    title: "Industry Solutions | Nexbaron Digital",
    description: "Industry-specific digital growth solutions for local businesses.",
    ...divisionOpenGraph("digital"),
  },
  twitter: divisionTwitter("digital"),
};

const industries = [
  {
    id: "clinics",
    index: "01",
    icon: Stethoscope,
    eyebrow: "Clinics & Healthcare",
    title: "For Clinics, Hospitals & Doctors",
    description:
      "Help patients find you, book appointments online, and arrive prepared. We rank clinics on Google Maps and handle appointment scheduling automatically on WhatsApp.",
    features: [
      "Online appointment booking via WhatsApp",
      "#1 Google Map ranking for your specialty",
      "Patient review automation",
      "Procedure & doctor landing pages",
      "Reminder & no-show reduction flows",
    ],
    deliverables: ["Doctor/clinic website", "Appointment chatbot", "Google Maps ranking strategy"],
    ctaMessage: "Hi Nexbaron Digital, I run a clinic and want more patients online",
  },
  {
    id: "restaurants",
    index: "02",
    icon: Utensils,
    eyebrow: "Food & Hospitality",
    title: "For Restaurants & Cafes",
    description:
      "Turn hungry searchers into table bookings and orders. A mouth-watering website, digital menu, and WhatsApp ordering that works while you cook.",
    features: [
      "Digital menu with photos & pricing",
      "Table booking & order on WhatsApp",
      "Google review growth system",
      "Mobile-first site for 'near me' searches",
      "Social proof & photo galleries",
    ],
    deliverables: [
      "Restaurant website & digital menu",
      "WhatsApp ordering flow",
      "Review generation system",
    ],
    ctaMessage: "Hi Nexbaron Digital, I run a restaurant and want more orders",
  },
  {
    id: "law-ca",
    index: "03",
    icon: Scale,
    eyebrow: "Professional Services",
    title: "For Law & CA Firms",
    description:
      "Project credibility and win high-trust clients. A refined professional website and local SEO that positions your firm as the authority in your practice area.",
    features: [
      "High-trust professional website",
      "Practice area & case study pages",
      "Consultation booking on WhatsApp",
      "Local SEO for your practice areas",
      "Client testimonials & credentials",
    ],
    deliverables: [
      "Professional firm website",
      "Practice-area landing pages",
      "Local authority SEO",
    ],
    ctaMessage: "Hi Nexbaron Digital, I want a website for my law/CA firm",
  },
  {
    id: "salons-gyms",
    index: "04",
    icon: Dumbbell,
    eyebrow: "Fitness & Beauty",
    title: "For Salons, Spas & Gyms",
    description:
      "Fill your slots and memberships. We build booking-driven sites with WhatsApp reminders that cut no-shows and keep clients coming back.",
    features: [
      "Membership & class booking pages",
      "WhatsApp appointment reminders",
      "Google Maps ranking for 'near me'",
      "Offer & package promotions",
      "Client review automation",
    ],
    deliverables: ["Booking-ready website", "WhatsApp reminder flows", "Local ranking strategy"],
    ctaMessage: "Hi Nexbaron Digital, I want to fill more bookings",
  },
  {
    id: "real-estate",
    index: "05",
    icon: Building,
    eyebrow: "Real Estate & Construction",
    title: "For Real Estate & Builders",
    description:
      "Showcase projects and capture serious buyers. Property landing pages, lead CRMs, and WhatsApp follow-up that convert site visits into sales meetings.",
    features: [
      "Project & property landing pages",
      "Enquiry forms with instant WhatsApp alerts",
      "Lead CRM for follow-ups",
      "Brochure & floor-plan presentation",
      "Local visibility for developments",
    ],
    deliverables: ["Property landing pages", "Lead CRM configured", "WhatsApp enquiry alerts"],
    ctaMessage: "Hi Nexbaron Digital, I want property landing pages & lead capture",
  },
  {
    id: "startups",
    index: "06",
    icon: Briefcase,
    eyebrow: "Startups & SMEs",
    title: "For Startups & SMEs",
    description:
      "Launch a complete, credible digital footprint fast. Turnkey websites, investor-ready branding, and automation that lets a small team feel like a big one.",
    features: [
      "Turnkey launch package",
      "Brand-aligned website in days",
      "Lead capture & automation from day one",
      "Growth audit included",
      "Scale-friendly architecture",
    ],
    deliverables: ["Complete digital footprint", "Launch automation stack", "Growth roadmap"],
    ctaMessage: "Hi Nexbaron Digital, I'm launching my business and need a digital footprint",
  },
];

export default function DigitalIndustriesPage() {
  return (
    <div className="relative overflow-hidden">
      <PageHero
        accent="digital"
        eyebrow="Industry Solutions"
        title="Built for Your Exact"
        highlight="Industry & Customers"
        description="We have seen the playbooks of hundreds of local businesses. Every solution below is tailored to how your customers actually search and buy."
        primaryCta={{
          label: "Find My Solution",
          href: "#clinics",
        }}
        secondaryCta={{ label: "Book Free Consultation", href: "/digital/contact" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {industries.map((industry) => (
          <FeatureSection
            key={industry.id}
            accent="digital"
            id={industry.id}
            index={industry.index}
            icon={industry.icon}
            eyebrow={industry.eyebrow}
            title={industry.title}
            description={industry.description}
            features={industry.features}
            deliverables={industry.deliverables}
            cta={{
              label: "Get a Custom Plan",
              href: buildWhatsAppLink("digital", industry.ctaMessage),
              external: true,
            }}
          />
        ))}

        <CTABanner
          accent="digital"
          title="Don't see your industry?"
          description="We build custom solutions for every local business. Tell us what you do and get a free growth audit."
          ctaLabel="Get My Free Audit"
          href={buildWhatsAppLink(
            "digital",
            "Hi Nexbaron Digital, my industry isn't listed — can you help?",
          )}
          external
        />
      </div>
    </div>
  );
}

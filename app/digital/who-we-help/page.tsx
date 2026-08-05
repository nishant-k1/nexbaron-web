import {
  ArrowRight,
  Briefcase,
  Building,
  CheckCircle2,
  Dumbbell,
  Scale,
  Stethoscope,
  Utensils,
} from "lucide-react";
import { type Metadata } from "next";

import { SectionReveal } from "@/components/motion/section-reveal";
import { CTABanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { Button } from "@/components/ui/button";
import { divisionOpenGraph, divisionTwitter } from "@/lib/og";

export const metadata: Metadata = {
  title: "Who We Help | Growth Plans for Local Businesses | Nexbaron Digital",
  description:
    "How we help clinics, restaurants, law & CA firms, salons, gyms, real estate, and startups get more customers — with a clear recommended plan for each.",
  openGraph: {
    title: "Who We Help | Nexbaron Digital",
    description: "A clear recommended plan for every type of local business.",
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
    title: "For Clinics & Doctors",
    problems: [
      "Too many phone calls to check timings?",
      "Patients asking for directions?",
      "Appointments getting missed?",
    ],
    fix: "We automate all of it.",
    recommendedPlan: "Recommended plan: Growth",
    planId: "growth",
    ctaLabel: "See Clinic Package",
    features: [
      "Patients book appointments themselves on WhatsApp",
      "Reminders that cut no-shows dramatically",
      "New patients find you first on Google",
      "Every enquiry captured, even after hours",
      "Reviews collected automatically",
    ],
    deliverables: ["Clinic website", "WhatsApp booking", "Google visibility & reviews"],
  },
  {
    id: "restaurants",
    index: "02",
    icon: Utensils,
    eyebrow: "Food & Hospitality",
    title: "For Restaurants & Cafes",
    problems: [
      "Customers searching 'near me' pick your competitor?",
      "Your menu and offers invisible on phones?",
      "Good reviews going unwritten?",
    ],
    fix: "We fix all of it.",
    recommendedPlan: "Recommended plan: Growth",
    planId: "growth",
    ctaLabel: "See Restaurant Package",
    features: [
      "Show up first for 'near me' searches",
      "Menu & offers visible on every phone",
      "Customers order and book on WhatsApp",
      "A review system that builds trust",
      "Photos that make people hungry",
    ],
    deliverables: ["Restaurant website & digital menu", "WhatsApp ordering", "Google visibility"],
  },
  {
    id: "law-ca",
    index: "03",
    icon: Scale,
    eyebrow: "Professional Services",
    title: "For Law & CA Firms",
    problems: [
      "Clients Google your practice area first?",
      "Your firm doesn't look established online?",
      "Consultations going to the firm that does?",
    ],
    fix: "We fix all of it.",
    recommendedPlan: "Recommended plan: Growth",
    planId: "growth",
    ctaLabel: "See Law Firm Package",
    features: [
      "A credible website that wins trust before the first call",
      "Consultation booking on WhatsApp",
      "Practice areas visible to the right clients",
      "Credentials and testimonials front and center",
      "Found first for 'lawyer near me' searches",
    ],
    deliverables: ["Professional firm website", "Consultation booking", "Local visibility"],
  },
  {
    id: "salons-gyms",
    index: "04",
    icon: Dumbbell,
    eyebrow: "Fitness & Beauty",
    title: "For Salons, Spas & Gyms",
    problems: [
      "Chairs and trainers sitting empty?",
      "Clients forgetting to rebook?",
      "No-shows on your busy days?",
    ],
    fix: "We fix all of it.",
    recommendedPlan: "Recommended plan: Growth",
    planId: "growth",
    ctaLabel: "See Salon & Gym Package",
    features: [
      "Clients book their own appointments 24/7",
      "Reminders that fill the chairs and cut no-shows",
      "Memberships and offers promoted automatically",
      "New clients find you on Google",
      "Reviews that make you the obvious choice",
    ],
    deliverables: ["Booking-ready website", "WhatsApp reminders", "Google visibility"],
  },
  {
    id: "real-estate",
    index: "05",
    icon: Building,
    eyebrow: "Real Estate & Construction",
    title: "For Real Estate & Builders",
    problems: [
      "Serious buyers going cold after they enquire?",
      "Follow-ups slipping through the cracks?",
      "Projects invisible to local buyers?",
    ],
    fix: "We fix all of it.",
    recommendedPlan: "Recommended plan: Growth + add-ons",
    planId: "growth",
    ctaLabel: "See Builder Package",
    features: [
      "Projects showcased beautifully online",
      "Every enquiry lands in your WhatsApp instantly",
      "Follow-ups that never slip through",
      "Serious buyers guided through your listings",
      "Local visibility for your developments",
    ],
    deliverables: ["Project pages", "Instant enquiry alerts", "Follow-up system"],
  },
  {
    id: "startups",
    index: "06",
    icon: Briefcase,
    eyebrow: "Startups & SMEs",
    title: "For Startups & SMEs",
    problems: [
      "Looking unprofessional to new customers?",
      "No time to figure out a website?",
      "Lost enquiries after you close for the day?",
    ],
    fix: "We fix all of it.",
    recommendedPlan: "Recommended plan: Launch",
    planId: "launch",
    ctaLabel: "See Startup Package",
    features: [
      "A credible footprint live on a confirmed date",
      "Your logo, brand, and message done right",
      "Customers can reach you instantly on WhatsApp",
      "Looks professional on every device",
      "Room to grow into higher plans",
    ],
    deliverables: ["Professional website", "WhatsApp setup", "Google profile verified"],
  },
];

export default function DigitalIndustriesPage() {
  return (
    <div className="relative overflow-hidden">
      <PageHero
        accent="digital"
        eyebrow="Who We Help"
        title="Your Business."
        highlight="Your Growth Plan."
        description="Every industry grows differently. Pick yours below, and we'll show you the problems we solve and the plan built for it."
        primaryCta={{
          label: "Find My Industry",
          href: "#clinics",
        }}
        secondaryCta={{ label: "See Pricing", href: "/digital/pricing" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry) => {
            const Icon = industry.icon;
            return (
              <SectionReveal key={industry.id}>
                <div
                  id={industry.id}
                  className="h-full group p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-teal-500/40 transition-all duration-300 backdrop-blur-md hover:bg-white/[0.06] flex flex-col scroll-mt-28"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono text-slate-500">{industry.index}</span>
                  </div>

                  <span className="text-xs uppercase tracking-wider font-mono font-semibold text-teal-400 mb-2">
                    {industry.eyebrow}
                  </span>
                  <h3 className="text-xl font-heading font-semibold text-white mb-4">
                    {industry.title}
                  </h3>

                  <div className="space-y-2.5 mb-3">
                    {industry.problems.map((problem) => (
                      <p key={problem} className="text-sm text-slate-300 leading-relaxed">
                        {problem}
                      </p>
                    ))}
                  </div>
                  <p className="text-sm font-semibold text-teal-300 leading-relaxed mb-4">
                    {industry.fix}
                  </p>

                  <a
                    href="/digital/pricing#plans"
                    className="text-xs font-mono font-semibold text-teal-400 hover:text-teal-300 mb-6 inline-flex items-center gap-1.5"
                  >
                    {industry.recommendedPlan}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>

                  <div className="space-y-2.5 mb-6 pt-4 border-t border-white/10">
                    {industry.features.slice(0, 3).map((feature) => (
                      <div key={feature} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                        <span className="text-xs text-slate-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {industry.deliverables.map((item) => (
                      <span
                        key={item}
                        className="text-[10px] font-mono text-slate-400 px-2.5 py-1 rounded bg-white/5 border border-white/10"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto pt-4">
                    <Button
                      asChild
                      size="lg"
                      className="w-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-8 rounded-xl shadow-lg shadow-teal-500/20"
                    >
                      <a
                        href={`/digital/contact?plan=${industry.planId}`}
                        className="inline-flex items-center justify-center gap-2"
                      >
                        {industry.ctaLabel}
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </SectionReveal>
            );
          })}
        </div>

        <CTABanner
          accent="digital"
          title="Don't see your industry?"
          description="Every local business gets more customers with the same three things: found on Google, easy to contact, and looking professional. Tell us what you do and we'll recommend a plan."
          ctaLabel="Get a Plan Recommendation"
          href="/digital/pricing"
        />
      </div>
    </div>
  );
}

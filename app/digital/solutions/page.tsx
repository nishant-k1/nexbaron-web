import {
  Palette,
  Globe,
  Mail,
  MapPin,
  Share2,
  BarChart3,
  Search,
  Star,
  Image,
  Calendar,
  Wand2,
  MessageSquare,
  Briefcase,
  Shield,
  Server,
  AlertTriangle,
  RefreshCw,
  Eye,
} from "lucide-react";
import { type Metadata } from "next";

import { SectionReveal } from "@/components/motion/section-reveal";
import { CTABanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { divisionOpenGraph, divisionTwitter } from "@/lib/og";

export const metadata: Metadata = {
  title: "Solutions | Nexbaron Digital",
  description:
    "Everything your business needs to grow online — from building your digital presence to generating leads and keeping it all running. Six solutions, one partner.",
  openGraph: {
    title: "Solutions | Nexbaron Digital",
    description: "Build. Get Found. Stay Active. Grow. Automate. Care.",
    ...divisionOpenGraph("digital"),
  },
  twitter: divisionTwitter("digital"),
};

const buildItems = [
  {
    icon: Palette,
    title: "Logo & Brand Identity",
    description: "A professional logo and brand colors you'll be proud to show.",
  },
  {
    icon: Globe,
    title: "Business Digital Presence",
    description: "A mobile-perfect digital presence designed around how your customers search.",
  },
  {
    icon: Globe,
    title: "Domain & Hosting",
    description: "Your domain registered, hosted, and secured with SSL — included.",
  },
  {
    icon: Mail,
    title: "Business Email",
    description: "A professional email that matches your domain. No more Gmail for business.",
  },
  {
    icon: MapPin,
    title: "Google Business Profile Setup",
    description: "Your GBP created, verified, and optimized for local discovery.",
  },
  {
    icon: Share2,
    title: "Social Media Account Setup",
    description: "Professional profiles on the platforms your customers use.",
  },
  {
    icon: BarChart3,
    title: "Analytics Setup",
    description: "Tracking installed so you can see exactly what's working.",
  },
];

const getFoundItems = [
  {
    icon: Search,
    title: "Local SEO",
    description: "Rank for searches like 'plumber near me' in your city.",
  },
  {
    icon: MapPin,
    title: "Google Business Optimization",
    description: "Your profile polished with photos, categories, and services.",
  },
  {
    icon: MapPin,
    title: "Google Maps Optimization",
    description: "Show up when people search for businesses on Maps.",
  },
  {
    icon: Star,
    title: "Review Management",
    description: "We ask happy customers for reviews after every sale.",
  },
  {
    icon: Share2,
    title: "Citation Building",
    description: "Consistent business listings across the web for trust and ranking.",
  },
  {
    icon: RefreshCw,
    title: "Monthly SEO",
    description: "Ongoing optimization that compounds over time.",
  },
];

const stayActiveItems = [
  {
    icon: Share2,
    title: "Social Media Management",
    description: "We post, engage, and grow your social presence.",
  },
  {
    icon: Image,
    title: "Monthly Content",
    description: "Posts, stories, and updates created for your brand every month.",
  },
  {
    icon: Palette,
    title: "Graphic Design",
    description: "Custom graphics, banners, and visual content.",
  },
  {
    icon: MessageSquare,
    title: "Captions",
    description: "Engaging captions that drive comments, shares, and saves.",
  },
  {
    icon: Calendar,
    title: "Scheduling",
    description: "Content scheduled in advance so your profiles stay active.",
  },
  {
    icon: BarChart3,
    title: "Monthly Reports",
    description: "Plain-English reports on what's working and what needs attention.",
  },
];

const growItems = [
  {
    icon: Search,
    title: "Google Ads",
    description: "Ad campaigns that put you in front of people searching for your service.",
  },
  {
    icon: Globe,
    title: "Landing Pages",
    description: "Dedicated pages designed to convert visitors into leads.",
  },
  {
    icon: BarChart3,
    title: "Lead Tracking",
    description: "Know exactly where every lead comes from.",
  },
  {
    icon: Star,
    title: "Conversion Tracking",
    description: "Measure what actually matters — calls, bookings, and sales.",
  },
];

const automateItems = [
  {
    icon: MessageSquare,
    title: "WhatsApp Automation",
    description: "24/7 automatic answers for hours, address, prices, and booking.",
  },
  {
    icon: Calendar,
    title: "Appointment Booking",
    description: "Customers book appointments directly in WhatsApp — no phone tag.",
  },
  {
    icon: Briefcase,
    title: "CRM",
    description: "Every enquiry tracked, followed up, and never lost.",
  },
  {
    icon: Mail,
    title: "Email Automation",
    description: "Welcome sequences, reminders, and follow-ups that run on autopilot.",
  },
];

const careItems = [
  {
    icon: Server,
    title: "Hosting",
    description: "Your digital presence stays online, fast, and secure — included in every plan.",
  },
  {
    icon: Shield,
    title: "Security",
    description: "SSL certificates, malware scanning, and firewall protection.",
  },
  {
    icon: RefreshCw,
    title: "Updates",
    description: "Your platform, code, and features kept up to date automatically.",
  },
  {
    icon: Eye,
    title: "Backups",
    description: "Daily backups so you never lose a single page or customer.",
  },
  {
    icon: AlertTriangle,
    title: "Monitoring",
    description: "Uptime monitoring with instant alerts if anything goes down.",
  },
  {
    icon: Wrench,
    title: "Digital Care",
    description: "Up to 2 small updates per month included in every plan.",
  },
];

const sections = [
  {
    id: "build",
    title: "Build",
    subtitle: "Everything needed to establish your business online.",
    icon: Globe,
    items: buildItems,
  },
  {
    id: "get-found",
    title: "Get Found",
    subtitle: "Everything needed for customers to discover your business.",
    icon: Search,
    items: getFoundItems,
  },
  {
    id: "stay-active",
    title: "Stay Active",
    subtitle: "Everything needed to keep your business visible.",
    icon: Share2,
    items: stayActiveItems,
  },
  {
    id: "grow",
    title: "Grow",
    subtitle: "Everything needed to generate leads.",
    icon: TrendingUpIcon,
    items: growItems,
  },
  {
    id: "automate",
    title: "Automate",
    subtitle: "Everything that saves time.",
    icon: Wand2,
    items: automateItems,
  },
  {
    id: "care",
    title: "Care",
    subtitle: "Everything that keeps things running.",
    icon: Shield,
    items: careItems,
  },
];

function TrendingUpIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

function Wrench(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

export default function SolutionsPage() {
  return (
    <div className="relative overflow-hidden">
      <PageHero
        accent="digital"
        eyebrow="Solutions"
        title="Not a list of services."
        highlight="A story of growth."
        description="Six solutions that take your business from invisible to unstoppable. Everything you need, organized by what it does."
        primaryCta={{ label: "See Pricing", href: "/digital/pricing" }}
        secondaryCta={{ label: "Talk to Us", href: "/digital/contact" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {sections.map((section) => (
          <section key={section.id} id={section.id} className="py-16 scroll-mt-28">
            <SectionHeading accent="digital" eyebrow={section.title} title={section.subtitle} />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.items.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <SectionReveal key={item.title}>
                    <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-teal-500/40 transition-all duration-300 backdrop-blur-md hover:bg-white/[0.06]">
                      <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400 w-fit mb-4">
                        <ItemIcon className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-heading font-semibold text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-300 leading-relaxed">{item.description}</p>
                    </div>
                  </SectionReveal>
                );
              })}
            </div>
          </section>
        ))}

        <CTABanner
          accent="digital"
          title="Ready to grow?"
          description="Pick a plan and we'll handle everything — from building your digital presence to keeping it growing every month."
          ctaLabel="See Pricing"
          href="/digital/pricing"
        />
      </div>
    </div>
  );
}

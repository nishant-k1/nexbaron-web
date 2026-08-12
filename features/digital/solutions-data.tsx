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

export interface SolutionItem {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  href?: string;
}

export interface SolutionSection {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  items: SolutionItem[];
}

export function Wrench(props: React.ComponentPropsWithoutRef<"svg">) {
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

export function TrendingUpIcon(props: React.ComponentPropsWithoutRef<"svg">) {
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

export const solutionSections: SolutionSection[] = [
  {
    id: "build",
    slug: "web-design",
    title: "Build",
    subtitle: "Everything needed to establish your business online.",
    icon: Globe,
    items: [
      {
        id: "logo-brand-identity",
        icon: Palette,
        title: "Logo & Brand Identity",
        description:
          "A professional logo and brand colors you'll be proud to show. We design three concepts and refine the one you love until it's perfect.",
        href: "/digital/web-design#logo-brand-identity",
      },
      {
        id: "digital-presence",
        icon: Globe,
        title: "Business Digital Presence",
        description:
          "A mobile-perfect website designed around how your customers search — fast, secure, and built to convert visitors into enquiries.",
        href: "/digital/web-design#digital-presence",
      },
      {
        id: "domain-hosting",
        icon: Globe,
        title: "Domain & Hosting",
        description:
          "Your domain registered, hosted, and secured with SSL — included. We handle the technical setup so you never think about it.",
        href: "/digital/web-design#domain-hosting",
      },
      {
        id: "business-email",
        icon: Mail,
        title: "Business Email",
        description:
          "A professional email that matches your domain. No more Gmail for business — present a polished image with every message.",
        href: "/digital/web-design#business-email",
      },
      {
        id: "google-profile-setup",
        icon: MapPin,
        title: "Google Business Profile Setup",
        description:
          "Your Google Business Profile created, verified, and optimized so you appear when local customers search for what you sell.",
        href: "/digital/web-design#google-profile-setup",
      },
      {
        id: "social-setup",
        icon: Share2,
        title: "Social Media Account Setup",
        description:
          "Professional profiles on the platforms your customers use, with consistent branding across Facebook, Instagram, and WhatsApp.",
        href: "/digital/web-design#social-setup",
      },
      {
        id: "analytics-setup",
        icon: BarChart3,
        title: "Analytics Setup",
        description:
          "Tracking installed so you can see exactly what's working — visits, enquiries, and calls — in one plain-English report.",
        href: "/digital/web-design#analytics-setup",
      },
    ],
  },
  {
    id: "get-found",
    slug: "local-seo",
    title: "Get Found",
    subtitle: "Everything needed for customers to discover your business.",
    icon: Search,
    items: [
      {
        id: "local-seo",
        icon: Search,
        title: "Local SEO",
        description:
          "Rank for searches like 'plumber near me' in your city. We optimize your presence so the people already looking for you find you first.",
        href: "/digital/local-seo#local-seo",
      },
      {
        id: "google-business-optimization",
        icon: MapPin,
        title: "Google Business Optimization",
        description:
          "Your profile polished with photos, categories, and services so it stands out against every competitor in your area.",
        href: "/digital/local-seo#google-business-optimization",
      },
      {
        id: "google-maps-optimization",
        icon: MapPin,
        title: "Google Maps Optimization",
        description:
          "Show up when people search for businesses on Maps. We tune your listing, categories, and location signals for maximum visibility.",
        href: "/digital/local-seo#google-maps-optimization",
      },
      {
        id: "review-management",
        icon: Star,
        title: "Review Management",
        description:
          "We ask happy customers for reviews after every sale, building the social proof that turns searchers into customers.",
        href: "/digital/local-seo#review-management",
      },
      {
        id: "citation-building",
        icon: Share2,
        title: "Citation Building",
        description:
          "Consistent business listings across the web for trust and ranking. We fix and build your name, address, and phone everywhere.",
        href: "/digital/local-seo#citation-building",
      },
      {
        id: "monthly-seo",
        icon: RefreshCw,
        title: "Monthly SEO",
        description:
          "Ongoing optimization that compounds over time — fresh content, new keywords, and steady ranking improvement month after month.",
        href: "/digital/local-seo#monthly-seo",
      },
    ],
  },
  {
    id: "stay-active",
    slug: "social-media",
    title: "Stay Active",
    subtitle: "Everything needed to keep your business visible.",
    icon: Share2,
    items: [
      {
        id: "social-media-management",
        icon: Share2,
        title: "Social Media Management",
        description:
          "We post, engage, and grow your social presence so your business stays top-of-mind with the people who matter.",
        href: "/digital/social-media#social-media-management",
      },
      {
        id: "monthly-content",
        icon: Image,
        title: "Monthly Content",
        description:
          "Posts, stories, and updates created for your brand every month — fresh, on-brand, and scheduled to reach your audience.",
        href: "/digital/social-media#monthly-content",
      },
      {
        id: "graphic-design",
        icon: Palette,
        title: "Graphic Design",
        description:
          "Custom graphics, banners, and visual content designed to match your brand and stop the scroll.",
        href: "/digital/social-media#graphic-design",
      },
      {
        id: "captions",
        icon: MessageSquare,
        title: "Captions",
        description:
          "Engaging captions that drive comments, shares, and saves — written in your brand's voice, optimized for reach.",
        href: "/digital/social-media#captions",
      },
      {
        id: "scheduling",
        icon: Calendar,
        title: "Scheduling",
        description:
          "Content scheduled in advance so your profiles stay active and consistent, even when you're busy running the business.",
        href: "/digital/social-media#scheduling",
      },
      {
        id: "monthly-reports",
        icon: BarChart3,
        title: "Monthly Reports",
        description:
          "Plain-English reports on what's working and what needs attention, so you always know your social ROI.",
        href: "/digital/social-media#monthly-reports",
      },
    ],
  },
  {
    id: "grow",
    slug: "online-ads",
    title: "Grow",
    subtitle: "Everything needed to generate leads.",
    icon: TrendingUpIcon,
    items: [
      {
        id: "google-ads",
        icon: Search,
        title: "Google Ads",
        description:
          "Ad campaigns that put you in front of people searching for your service right now — and pay only for results.",
        href: "/digital/online-ads#google-ads",
      },
      {
        id: "landing-pages",
        icon: Globe,
        title: "Landing Pages",
        description:
          "Dedicated pages designed to convert visitors into leads — fast, focused, and built around a single clear action.",
        href: "/digital/online-ads#landing-pages",
      },
      {
        id: "lead-tracking",
        icon: BarChart3,
        title: "Lead Tracking",
        description:
          "Know exactly where every lead comes from, so you can double down on what works and stop wasting money on what doesn't.",
        href: "/digital/online-ads#lead-tracking",
      },
      {
        id: "conversion-tracking",
        icon: Star,
        title: "Conversion Tracking",
        description:
          "Measure what actually matters — calls, bookings, and sales — not just clicks. Real numbers for real decisions.",
        href: "/digital/online-ads#conversion-tracking",
      },
    ],
  },
  {
    id: "automate",
    slug: "automation",
    title: "Automate",
    subtitle: "Everything that saves time.",
    icon: Wand2,
    items: [
      {
        id: "whatsapp-automation",
        icon: MessageSquare,
        title: "WhatsApp Automation",
        description:
          "24/7 automatic answers for hours, address, prices, and booking — your business responds instantly, even at 3am.",
        href: "/digital/automation",
      },
      {
        id: "appointment-booking",
        icon: Calendar,
        title: "Appointment Booking",
        description:
          "Customers book appointments directly in WhatsApp — no phone tag. Automatic reminders cut no-shows.",
        href: "/digital/automation",
      },
      {
        id: "crm",
        icon: Briefcase,
        title: "CRM",
        description:
          "Every enquiry tracked, followed up, and never lost. A clean pipeline from first message to paying customer.",
        href: "/digital/automation",
      },
      {
        id: "email-automation",
        icon: Mail,
        title: "Email Automation",
        description:
          "Welcome sequences, reminders, and follow-ups that run on autopilot, nurturing leads while you focus on the work.",
        href: "/digital/automation",
      },
    ],
  },
  {
    id: "care",
    slug: "website-care",
    title: "Care",
    subtitle: "Everything that keeps things running.",
    icon: Shield,
    items: [
      {
        id: "hosting",
        icon: Server,
        title: "Hosting",
        description:
          "Your website stays online, fast, and secure — included in every plan, with no surprise bills.",
        href: "/digital/website-care#hosting",
      },
      {
        id: "security",
        icon: Shield,
        title: "Security",
        description:
          "SSL certificates, malware scanning, and firewall protection keep your site and your customers' data safe.",
        href: "/digital/website-care#security",
      },
      {
        id: "updates",
        icon: RefreshCw,
        title: "Updates",
        description:
          "Your platform, code, and features kept up to date automatically, so your site never falls behind.",
        href: "/digital/website-care#updates",
      },
      {
        id: "backups",
        icon: Eye,
        title: "Backups",
        description:
          "Daily backups so you never lose a single page or customer — restore anything, anytime.",
        href: "/digital/website-care#backups",
      },
      {
        id: "monitoring",
        icon: AlertTriangle,
        title: "Monitoring",
        description:
          "Uptime monitoring with instant alerts if anything goes down, so we fix issues before you even notice.",
        href: "/digital/website-care#monitoring",
      },
      {
        id: "digital-care",
        icon: Wrench,
        title: "Digital Care",
        description:
          "Up to 2 small updates per month included in every plan — change a phone number, add a photo, update your menu.",
        href: "/digital/website-care#digital-care",
      },
    ],
  },
];

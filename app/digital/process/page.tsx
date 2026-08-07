import {
  ArrowRight,
  BarChart3,
  CalendarClock,
  CheckCircle2,
  FileText,
  Globe,
  Key,
  Languages,
  Mail,
  MessageSquare,
  RefreshCw,
  Rocket,
  Search,
  Shield,
  Smartphone,
  Timer,
  TrendingUp,
  Users,
} from "lucide-react";
import { type Metadata } from "next";
import Link from "next/link";

import { CTABanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { SectionHeading } from "@/components/sections/section-heading";
import { Button } from "@/components/ui/button";
import { CustomerProjectTracker } from "@/features/digital/onboarding/components/customer-project-tracker";
import { divisionOpenGraph, divisionTwitter } from "@/lib/og";

export const metadata: Metadata = {
  title: "Our Process | What Happens After You Choose a Plan | Nexbaron Digital",
  description:
    "From choosing a plan to your digital presence growing every month: the day-by-day timeline, what's included, revisions, communication, launch, and monthly care — in plain English.",
  openGraph: {
    title: "Our Process | Nexbaron Digital",
    description: "Eight steps, a clear week-by-week timeline, and no surprises in between.",
    ...divisionOpenGraph("digital"),
  },
  twitter: divisionTwitter("digital"),
};

const steps = [
  {
    number: "Step 1",
    title: "Choose your package",
    description: "Pick Launch, Growth, or Scale. No sales call, no pressure.",
    href: "/digital/pricing",
  },
  {
    number: "Step 2",
    title: "Complete onboarding & upload materials",
    description:
      "A 10-minute form tells us everything. Send photos, logo, and business details — we work with what you have.",
    href: "/digital/onboarding",
  },
  {
    number: "Step 3",
    title: "Complete payment & book your slot",
    description:
      "Pay securely with UPI or card. Your GST receipt arrives instantly and your 5-day build clock starts.",
    href: "/digital/onboarding",
  },
  {
    number: "Day 1",
    title: "Research & planning",
    description:
      "We study your industry, competitors, and customer search behaviour. Every design decision starts with data.",
    href: "/digital/why-nexbaron",
  },
  {
    number: "Day 2–3",
    title: "Design & development",
    description:
      "Your website takes shape — mobile-first, branded, and optimised for how your customers actually search and book.",
    href: "/digital/solutions",
  },
  {
    number: "Day 4",
    title: "Review & revisions",
    description:
      "You get a private preview link. Walk through every page, mark your feedback directly. We refine until you approve.",
    href: "/digital/solutions",
  },
  {
    number: "Day 5",
    title: "Go live — your website is published",
    description:
      "Final checks complete. Domain connected, SSL active, mobile tested. Your business is now live online.",
    href: "/digital/solutions",
  },
  {
    number: "Week 2",
    title: "Google Business Profile verified",
    description:
      "Your GBP is submitted for verification. Review collection starts. Local ranking begins building over 4–8 weeks.",
    href: "/digital/results",
  },
  {
    number: "Month 1+",
    title: "Monthly care & growth reports",
    description:
      "Hosting, updates, backups, and a plain-English report by the 5th. WhatsApp auto-replies keep working 24/7.",
    href: "/digital/results",
  },
];
const firstWeek = [
  {
    day: "Day 0",
    title: "Choose your package",
    description:
      "You get an instant confirmation on WhatsApp and email — your plan and the link to the onboarding form.",
  },
  {
    day: "Day 1",
    title: "Complete the onboarding form",
    description: "Tell us your services, hours, address, and what you want visitors to do.",
  },
  {
    day: "Day 2",
    title: "Pay securely",
    description:
      "Pay with UPI or card. Your GST receipt arrives instantly and your build slot is booked.",
  },
  {
    day: "Day 3–4",
    title: "We build your website & prepare your Google Business Profile",
    description:
      "Your website takes shape around how customers search, and we prepare your Google Business Profile with photos, categories, and services.",
  },
  {
    day: "Day 5",
    title: "First draft for your review",
    description: "See your website live, request tweaks, and approve.",
  },
  {
    day: "Day 6",
    title: "Your feedback, our revisions",
    description: "Mark your tweaks on the preview. We refine until you're happy.",
  },
  {
    day: "Day 7",
    title: "Go live",
    description:
      "Your website is published. Your Google Business Profile is submitted for verification — Google usually verifies within 3–10 business days.",
  },
];

const afterLaunch = [
  {
    icon: Globe,
    month: "Month 1",
    title: "Live, verified & set up",
    description:
      "Your Google Business Profile is verified and optimized — photos, categories, service areas. Analytics is running, and the review system switches on: we ask happy customers after every sale.",
  },
  {
    icon: TrendingUp,
    month: "Month 2",
    title: "Rankings start moving",
    description:
      "\u201cNear me\u201d searches begin improving in your city. WhatsApp booking and no-show reminders go live, and 24/7 automatic answers field common questions. Reviews start piling up.",
  },
  {
    icon: CalendarClock,
    month: "Month 3+",
    title: "Growth compounds",
    description:
      "Ranking builds over 60–90 days. Your plain-English report lands by the 5th each month. New pages and offers go up as needed, with strategy sessions and competitor reviews on Scale.",
  },
];

const included = [
  {
    icon: Globe,
    title: "Hosting",
    description:
      "Your digital presence is hosted and stays online — included in your monthly care.",
  },
  {
    icon: Shield,
    title: "SSL security",
    description: "The padlock your customers see. Secure, automatic, and included.",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description: "See how many people visit and what they do — explained in plain English.",
  },
  {
    icon: Search,
    title: "Google Search Console",
    description: "We connect you to Google and track how your pages are performing.",
  },
  {
    icon: Key,
    title: "Full ownership",
    description: "Your digital presence, domain, and content are 100% yours. Even if you cancel.",
  },
  {
    icon: Smartphone,
    title: "Mobile responsive",
    description: "Looks perfect on every phone, tablet, and computer.",
  },
];

const yourPart = [
  {
    title: "Photos & business details",
    description:
      "Send what you have. No logo? We design a simple one for you — or use your existing one.",
  },
  {
    title: "About 10 minutes on the onboarding form",
    description: "The one form that tells us everything we need to build your digital presence.",
  },
  {
    title: "24–48 hours to review each draft",
    description:
      "The faster your feedback, the faster you go live. We'll nudge you if it's waiting.",
  },
  {
    title: "Honest answers",
    description: "The more accurate your details, the better we can get you found on Google.",
  },
  {
    title: "Reviews (Growth & Scale plans)",
    description:
      "We send the reminder — you simply ask happy customers to leave a review. It's the fastest trust-builder there is.",
  },
];

const timelines = [
  {
    icon: Rocket,
    title: "Launch digital presence",
    value: "~1 week",
    note: "The exact date is confirmed the moment you pay.",
  },
  {
    icon: TrendingUp,
    title: "Growth digital presence",
    value: "~1–2 weeks",
    note: "The digital presence, plus ranking that builds over 4–8 weeks.",
  },
  {
    icon: CalendarClock,
    title: "Scale foundation",
    value: "First 30 days",
    note: "Audit, foundation, and your growth plan for the year.",
  },
  {
    icon: FileText,
    title: "Monthly report",
    value: "By the 5th",
    note: "Your plain-English report lands every month, on time.",
  },
  {
    icon: Timer,
    title: "Replies to you",
    value: "Same day",
    note: "Every message you send is answered personally, the same day.",
  },
];

const revisions = [
  {
    title: "During the build",
    description:
      "Revisions are included. You review each draft and we refine until you approve — nothing goes live without your sign-off.",
  },
  {
    title: "After launch",
    description:
      "Care includes up to 2 small updates a month. Growth Care adds Google profile management and a campaign page each quarter.",
  },
  {
    title: "Bigger changes",
    description:
      "New pages are ₹999 each. Larger redesigns are quoted clearly before we start — you approve the price first.",
  },
];

const communication = [
  {
    icon: MessageSquare,
    title: "WhatsApp is our main channel",
    description:
      "The same chat from your first enquiry to launch and beyond. One thread, nothing lost.",
  },
  {
    icon: Mail,
    title: "Email for invoices",
    description: "Receipts and GST invoices land in your inbox. Clear, on time, every time.",
  },
  {
    icon: Users,
    title: "One dedicated contact",
    description: "A single person owns your project end to end. You're never bounced around.",
  },
  {
    icon: Languages,
    title: "Plain English only",
    description:
      "No jargon, no technical-speak. If it doesn't make sense to a customer, we reword it.",
  },
];

const carePlans = [
  {
    name: "Digital Care",
    price: "₹1,499",
    note: "per month",
    description: "Keep your digital presence online, updated, and backed up.",
    href: "/digital/pricing",
  },
  {
    name: "Growth Care",
    price: "₹3,999",
    note: "per month",
    description: "Digital presence care plus Google visibility and review management.",
    href: "/digital/pricing",
    featured: true,
  },
  {
    name: "Business Partner",
    price: "₹7,999",
    note: "per month",
    description: "Enquiries handled, bookings automated, a dedicated contact.",
    href: "/digital/pricing",
  },
];

export default function DigitalProcessPage() {
  return (
    <div className="relative overflow-hidden">
      <PageHero
        accent="digital"
        eyebrow="Our Process"
        title="What Happens After"
        highlight="You Choose."
        description="Every plan comes with one clear, documented process. Here's exactly what happens from the moment you pick a plan to your business growing every month — no surprises, no fine print."
        primaryCta={{ label: "Choose a Plan", href: "/digital/pricing#plans" }}
        secondaryCta={{ label: "Talk to Us", href: "/digital/contact" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <section className="py-16">
          <SectionHeading
            accent="digital"
            eyebrow="How It Works"
            title="From Sign-Up to Go-Live in 5 Days"
            description="Three simple steps from you. Five days from us. Then we keep it growing."
          />
          <ProcessTimeline steps={steps} />
          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-8 rounded-xl shadow-lg shadow-teal-500/20"
            >
              <Link
                href="/digital/pricing#plans"
                className="inline-flex items-center justify-center gap-2"
              >
                Choose Your Plan <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </section>

        <section className="py-16 border-t border-white/10">
          <SectionHeading
            accent="digital"
            eyebrow="Right After Purchase"
            title="Your First Week, Day by Day"
            description="This is the part nobody shows you. Here's exactly what happens between choosing a plan and going live — day by day, on your confirmed date."
          />
          <CustomerProjectTracker
            fallback={
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {firstWeek.map((item) => (
                  <div
                    key={item.day}
                    className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-teal-500/40 transition-all backdrop-blur-md group"
                  >
                    <div className="text-[10px] font-mono font-semibold text-teal-400 mb-3">
                      {item.day}
                    </div>
                    <h3 className="text-lg font-heading font-semibold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            }
          />
        </section>

        <section className="py-16 border-t border-white/10">
          <SectionHeading
            accent="digital"
            eyebrow="After Launch"
            title="Then the Growth Work Begins"
            description="Your digital presence is just the front door. Google profile optimization, ranking, reviews, and WhatsApp automation kick in month by month — not all at once, but compounding."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {afterLaunch.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.month}
                  className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-teal-500/40 transition-all backdrop-blur-md"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono font-semibold text-teal-400">
                      {item.month}
                    </span>
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-16 border-t border-white/10">
          <SectionHeading
            accent="digital"
            eyebrow="What's Included"
            title="These Are Already In Your Plan"
            description="We assume you know these. Most customers don't. So we're putting it in writing."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {included.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-teal-500/40 transition-all backdrop-blur-md group"
                >
                  <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400 w-fit mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-16 border-t border-white/10">
          <SectionHeading
            accent="digital"
            eyebrow="Your Part"
            title="What We Need From You"
            description="Five small things from you. We handle everything else."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {yourPart.map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-teal-500/40 transition-all backdrop-blur-md flex gap-4"
              >
                <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-base font-semibold text-white mb-1.5">{item.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 border-t border-white/10">
          <SectionHeading
            accent="digital"
            eyebrow="Timelines"
            title="How Long Everything Takes"
            description="Real numbers, set before you pay anything."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {timelines.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-teal-500/40 transition-all backdrop-blur-md"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-semibold text-white">{item.title}</h3>
                  </div>
                  <div className="text-xl font-heading font-bold text-teal-300 mb-1">
                    {item.value}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.note}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-16 border-t border-white/10">
          <SectionHeading
            accent="digital"
            eyebrow="Revisions"
            title="Revisions & Changes"
            description="How changes work — during the build, after launch, and for bigger projects."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {revisions.map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-teal-500/40 transition-all backdrop-blur-md"
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <RefreshCw className="w-4 h-4 text-teal-400" />
                  <h3 className="text-base font-semibold text-white">{item.title}</h3>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 border-t border-white/10">
          <SectionHeading
            accent="digital"
            eyebrow="Communication"
            title="How We Stay In Touch"
            description="One thread, one person, plain English — from first enquiry to long after launch."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {communication.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-teal-500/40 transition-all backdrop-blur-md"
                >
                  <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400 w-fit mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-heading font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-16 border-t border-white/10">
          <SectionHeading
            accent="digital"
            eyebrow="Monthly Care"
            title="The Care That Keeps It Working"
            description="Your digital presence is never 'done and dropped.' Every plan comes with monthly care, or add it standalone if you already have a digital presence."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {carePlans.map((plan) => (
              <div
                key={plan.name}
                className={`p-6 rounded-2xl border transition-all duration-300 backdrop-blur-md ${
                  plan.featured
                    ? "bg-teal-500/10 border-teal-500/40 shadow-xl shadow-teal-500/10"
                    : "bg-white/[0.03] border-white/10 hover:border-teal-500/40"
                }`}
              >
                <h3 className="text-base font-semibold text-white mb-1">{plan.name}</h3>
                <div className="text-2xl font-heading font-bold text-teal-300 mb-1">
                  {plan.price}
                  <span className="text-xs text-slate-400 font-normal ml-1">{plan.note}</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">{plan.description}</p>
                <a
                  href={plan.href}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-teal-400 hover:text-teal-300"
                >
                  See what&apos;s included
                </a>
              </div>
            ))}
          </div>
        </section>

        <CTABanner
          accent="digital"
          title="Ready to Start?"
          description="Pick a plan, and everything on this page is exactly what you get. No surprises between here and your digital presence going live."
          ctaLabel="See Pricing"
          href="/digital/pricing#plans"
        />
      </div>
    </div>
  );
}

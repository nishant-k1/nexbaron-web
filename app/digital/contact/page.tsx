import { MapPin, MessageSquare, Clock, PhoneCall } from "lucide-react";
import { type Metadata } from "next";

import { ContactForm } from "@/components/contact/contact-form";
import { PageHero } from "@/components/sections/page-hero";
import { formatOpeningHours, formatPhone, getBusinessProfile } from "@/lib/business-profile";
import { buildWhatsAppLink } from "@/lib/divisions";
import { divisionOpenGraph, divisionTwitter } from "@/lib/og";

export const metadata: Metadata = {
  title: "Contact Us | Nexbaron Digital",
  description:
    "Have a question about our websites, SEO, or WhatsApp growth plans? Get in touch and we'll reply the same day.",
  alternates: { canonical: "/digital/contact" },
  openGraph: {
    title: "Contact Us | Nexbaron Digital",
    description: "Have a question? We reply the same day.",
    ...divisionOpenGraph("digital"),
  },
  twitter: divisionTwitter("digital"),
};

export default async function DigitalContactPage() {
  const profile = await getBusinessProfile("digital");

  return (
    <div className="relative overflow-hidden">
      <PageHero
        accent="digital"
        eyebrow="Contact Us"
        title="Get in Touch"
        highlight="We're Here to Help"
        description="Have a question about websites, SEO, or growing your business online? Drop us a message and we'll get back to you the same day."
        primaryCta={{
          label: "Chat on WhatsApp",
          href: buildWhatsAppLink(
            "digital",
            "Hi Nexbaron Digital, I have a question about your services",
          ),
          external: true,
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-6">
            {/* Contact Information */}
            <div className="p-8 rounded-3xl bg-white/[0.03] border border-teal-500/20 backdrop-blur-xl space-y-6">
              <h2 className="text-xl font-heading font-bold text-white">Contact Information</h2>

              {/* Response Time */}
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Response Time</h3>
                  <p className="text-xs text-slate-400">
                    We reply to every enquiry the same day — usually within 2–3 hours during
                    business hours.
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-400 shrink-0">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Phone</h3>
                  <a
                    href={`tel:${profile.phone}`}
                    className="text-sm text-teal-400 hover:text-teal-300"
                  >
                    {formatPhone(profile.phone)}
                  </a>
                  <p className="text-xs text-slate-500 mt-0.5">{formatOpeningHours(profile)}</p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-400 shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">WhatsApp</h3>
                  <a
                    href={buildWhatsAppLink(
                      "digital",
                      "Hi Nexbaron Digital, I have a question about your services",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-teal-400 hover:text-teal-300"
                  >
                    Start a conversation
                  </a>
                  <div className="mt-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://wa.me/919002785683"
                      alt="Scan to chat on WhatsApp"
                      width={100}
                      height={100}
                      className="rounded-lg border border-white/10"
                    />
                  </div>
                </div>
              </div>

              {/* Office Location */}
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <address className="not-italic">
                  <h3 className="text-sm font-semibold text-white">Office</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mt-1 whitespace-pre-line">
                    {profile.address.display}
                  </p>
                </address>
              </div>
            </div>

            {/* Google Maps */}
            <div className="rounded-3xl overflow-hidden border border-white/10">
              <iframe
                title="Nexbaron Digital Office Location"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(profile.mapsQuery)}&z=16&output=embed`}
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(profile.mapsQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-teal-400 hover:text-teal-300"
            >
              <MapPin className="w-3.5 h-3.5" /> Get Directions
            </a>
          </div>

          <div className="lg:col-span-7">
            <ContactForm
              division="digital"
              heading="Send us a message"
              subheading="Fill in the form below and we'll get back to you the same day."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

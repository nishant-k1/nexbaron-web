import { MapPin, MessageSquare, Clock, PhoneCall } from "lucide-react";
import { type Metadata } from "next";

import { ContactForm } from "@/components/contact/contact-form";
import { PageHero } from "@/components/sections/page-hero";
import { buildWhatsAppLink } from "@/lib/divisions";
import { divisionOpenGraph, divisionTwitter } from "@/lib/og";

export const metadata: Metadata = {
  title: "Contact Us | Nexbaron Digital",
  description:
    "Have a question about our websites, SEO, or WhatsApp growth plans? Get in touch and we'll reply the same day.",
  openGraph: {
    title: "Contact Us | Nexbaron Digital",
    description: "Have a question? We reply the same day.",
    ...divisionOpenGraph("digital"),
  },
  twitter: divisionTwitter("digital"),
};

export default function DigitalContactPage() {
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
                  <a href="tel:+919002785683" className="text-sm text-teal-400 hover:text-teal-300">
                    +91 90027 85683
                  </a>
                  <p className="text-xs text-slate-500 mt-0.5">Monday – Saturday, 10 AM – 7 PM</p>
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
                  <p className="text-xs text-slate-400 leading-relaxed mt-1">
                    Flat No. 402, Vasavi Residency - 1, Green House Layout,
                    <br />
                    Doddathoguru, Electronic City Phase - 1, Bengaluru - 560100
                  </p>
                </address>
              </div>
            </div>

            {/* Google Maps */}
            <div className="rounded-3xl overflow-hidden border border-white/10">
              <iframe
                title="Nexbaron Digital Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.5!2d77.67!3d12.84!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDUwJzI0LjAiTiA3N8KwNDAnMTIuMCJF!5e0!3m2!1sen!2sin!4v1600000000000"
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
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

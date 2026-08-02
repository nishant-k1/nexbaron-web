"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star, ShieldCheck, Building, CheckCircle } from "lucide-react";

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  sector: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "Nexbaron's structural compliance team transformed our mega solar grid rollout. Their precision in safety clearing and regulatory audits saved us 4 months in commissioning.",
    author: "Vikram Malhotra",
    role: "VP of Energy Operations",
    company: "Apex Green Power Corp",
    sector: "Renewables",
    rating: 5,
  },
  {
    id: "2",
    quote:
      "The engineering PMO provided by Nexbaron was flawless. Real-time telemetry integration and SCADA deployment were executed without a single hour of unplanned downtime.",
    author: "Elena Rostova",
    role: "Chief Technology Officer",
    company: "Nordic Industrial Tech",
    sector: "Automation",
    rating: 5,
  },
  {
    id: "3",
    quote:
      "Uncompromising quality standards and clear advisory. Nexbaron is our go-to partner for high-voltage grid substations and environmental clearances.",
    author: "Rajesh K. Singhania",
    role: "Head of Infrastructure",
    company: "Baron Infra Grid Ltd",
    sector: "Civil & Power",
    rating: 5,
  },
];

const partners = [
  { name: "ISO 9001:2015", label: "Quality Certified" },
  { name: "ISO 45001:2018", label: "Safety Standard" },
  { name: "IEEE Compliant", label: "Electrical Systems" },
  { name: "Bureau of Indian Standards", label: "Certified Partner" },
];

export function PartnerTestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-24 relative overflow-hidden bg-neutral-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Compliance / Certification Badges Bar */}
        <div className="mb-20">
          <p className="text-center text-xs uppercase tracking-widest text-slate-400 mb-8 font-mono">
            Certified Standards & Institutional Accreditation
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {partners.map((p, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-teal-500/30 transition-all flex items-center gap-3 text-left"
              >
                <div className="p-2.5 rounded-lg bg-teal-500/10 text-teal-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{p.name}</div>
                  <div className="text-xs text-slate-400">{p.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Slider */}
        <div className="max-w-4xl mx-auto">
          <div className="relative p-8 md:p-14 rounded-3xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 backdrop-blur-xl shadow-2xl">
            <Quote className="w-12 h-12 text-teal-400/20 mb-6" />

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex gap-1 text-amber-400">
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-lg md:text-2xl text-slate-100 font-normal leading-relaxed italic">
                  &ldquo;{current.quote}&rdquo;
                </p>

                <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-lg font-heading font-semibold text-white">
                      {current.author}
                    </h4>
                    <p className="text-sm text-teal-400 font-medium">
                      {current.role} • <span className="text-slate-300">{current.company}</span>
                    </p>
                  </div>
                  <span className="text-xs uppercase font-mono tracking-wider px-3 py-1 rounded-full bg-white/5 text-slate-400 border border-white/10 self-start sm:self-auto">
                    {current.sector}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider Controls */}
            <div className="flex items-center justify-end gap-3 mt-8">
              <button
                onClick={prevTestimonial}
                aria-label="Previous testimonial"
                className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-teal-500 hover:text-slate-950 text-white transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextTestimonial}
                aria-label="Next testimonial"
                className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-teal-500 hover:text-slate-950 text-white transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

"use client";

import { MessageCircle, Phone } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { buildWhatsAppLink } from "@/lib/divisions";

const CONTACTS: Record<string, { phone: string; whatsappMsg: string }> = {
  digital: {
    phone: "+919002785683",
    whatsappMsg: "Hi Nexbaron Digital, I need help with my business",
  },
  print: {
    phone: "+919899752254",
    whatsappMsg: "Hi Nexbaron Print, I have a question about your printing services",
  },
};

export function FloatingActions() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  const division = pathname.startsWith("/digital")
    ? "digital"
    : pathname.startsWith("/print")
      ? "print"
      : null;

  const contact = division ? CONTACTS[division] : null;

  useEffect(() => {
    // Show after first scroll so it doesn't appear immediately on hero
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!contact) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex flex-col gap-3 transition-all duration-500 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      {/* Call button */}
      <a
        href={`tel:${contact.phone}`}
        aria-label="Call us"
        className="flex items-center justify-center w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white shadow-lg hover:bg-white/20 hover:scale-110 transition-all duration-300"
      >
        <Phone className="w-6 h-6" />
      </a>

      {/* WhatsApp button */}
      <a
        href={buildWhatsAppLink(division!, contact.whatsappMsg)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-400 hover:scale-110 transition-all duration-300"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </div>
  );
}

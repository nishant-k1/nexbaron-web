import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

import { divisions, type DivisionSlug } from "@/lib/divisions";

import { PinterestIcon, ThreadsIcon, TikTokIcon, WhatsAppIcon, XIcon } from "./brand-icons";

const socialPlatforms = [
  { key: "instagram", label: "Instagram", Icon: Instagram },
  { key: "facebook", label: "Facebook", Icon: Facebook },
  { key: "x", label: "X", Icon: XIcon },
  { key: "linkedin", label: "LinkedIn", Icon: Linkedin },
  { key: "pinterest", label: "Pinterest", Icon: PinterestIcon },
  { key: "youtube", label: "YouTube", Icon: Youtube },
  { key: "whatsapp", label: "WhatsApp", Icon: WhatsAppIcon },
  { key: "threads", label: "Threads", Icon: ThreadsIcon },
  { key: "tiktok", label: "TikTok", Icon: TikTokIcon },
] as const;

interface SocialLinksProps {
  division: DivisionSlug;
}

export function SocialLinks({ division }: SocialLinksProps) {
  const { name, social } = divisions[division];

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {socialPlatforms.map(({ key, label, Icon }) => (
        <a
          key={key}
          href={social[key]}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} on ${label}`}
          className="p-2 rounded-lg bg-white/[0.04] border border-white/10 text-slate-400 hover:text-white hover:border-white/25 transition-all"
        >
          <Icon className="w-4 h-4" />
        </a>
      ))}
    </div>
  );
}

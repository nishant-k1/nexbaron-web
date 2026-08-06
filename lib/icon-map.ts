import {
  CreditCard,
  Wallet,
  FileText,
  Tag,
  FolderOpen,
  Mail,
  MailOpen,
  Printer,
  Briefcase,
  Receipt,
  Sparkles,
  PenTool,
  Target,
  Copy,
  Rocket,
  MapPin,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  CreditCard,
  Wallet,
  FileText,
  Tag,
  FolderOpen,
  Mail,
  MailOpen,
  Printer,
  Briefcase,
  Receipt,
  Sparkles,
  PenTool,
  Target,
  Copy,
  Rocket,
  MapPin,
  TrendingUp,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? FileText;
}

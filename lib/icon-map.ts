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
  Building2,
  MessageSquare,
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
  Building2,
  MessageSquare,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? FileText;
}

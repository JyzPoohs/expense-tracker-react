import type { LucideIcon } from "lucide-react";

export interface SummaryCardConfigProps {
  key?: string;
  title: string;
  icon: LucideIcon;
}

export interface SummaryCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  description?: string;
}
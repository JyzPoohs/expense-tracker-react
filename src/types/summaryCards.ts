import type { LucideIcon } from "lucide-react";

export interface SummaryCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  description?: string;
}
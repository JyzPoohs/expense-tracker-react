import type { SummaryCardProps } from "@/types/summaryCards";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  ArrowLeftRight,
} from "lucide-react";

export const summaryCards: SummaryCardProps[] = [
  {
    title: "Total Balance",
    value: "RM 12,450.00",
    icon: Wallet,
    description: "+12% from last month",
  },
  {
    title: "Income",
    value: "RM 15,000.00",
    icon: TrendingUp,
  },
  {
    title: "Expense",
    value: "RM 2,500.00",
    icon: TrendingDown,
  },
  {
    title: "Transactions",
    value: "120",
    icon: ArrowLeftRight,
  },
];
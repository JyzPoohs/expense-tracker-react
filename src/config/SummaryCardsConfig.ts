import type { SummaryCardConfigProps } from "@/types/summaryCards";
import { Wallet, TrendingUp, TrendingDown, ArrowLeftRight } from "lucide-react";

export const summaryCardConfig: SummaryCardConfigProps[] = [
  {
    key: "totalBalance",
    title: "Total Balance",
    icon: Wallet,
  },
  {
    key: "totalIncome",
    title: "Income",
    icon: TrendingUp,
  },
  {
    key: "totalExpense",
    title: "Expense",
    icon: TrendingDown,
  },
  {
    key: "numTransactions",
    title: "Transactions",
    icon: ArrowLeftRight,
  },
];

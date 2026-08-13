import { getDashboardSummary } from "@/services/summaryService";
import { getAllTransactions } from "@/services/transactionService";
import type { DashboardSummary } from "@/types/dashboardSummary";
import type { TransactionType } from "@/types/transaction";
import { useEffect, useState } from "react";

export const useDashboard = (initialized: boolean) => {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [transactions, setTransactions] = useState<TransactionType[]>([]);

  const fetchDashboardSummary = async () => {
    try {
      const data = await getDashboardSummary();

      setSummary(data);
    } catch (error) {
      console.error("Fetch dashboard summary error: ", error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const data = await getAllTransactions();

      setTransactions(data);
    } catch (error) {
      console.error("Fetch dashboard transactions error: ", error);
    }
  };

  useEffect(() => {
    if(!initialized) {
      return;
    }

    fetchDashboardSummary();
    fetchTransactions();
  }, [initialized]);

  return { summary, transactions, fetchDashboardSummary, fetchTransactions };
};

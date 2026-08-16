import { getDashboardBarChartData } from "@/services/chartService";
import { getDashboardSummary } from "@/services/summaryService";
import { getAllTransactions } from "@/services/transactionService";
import type { DashboardSummary } from "@/types/dashboardSummary";
import type { TransactionType } from "@/types/transaction";
import { useEffect, useState } from "react";
import type { ChartData } from "recharts/types/state/chartDataSlice";

export const useDashboard = () => {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [barChartData, setBarChartData] = useState<ChartData[]>([]);

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

  const refreshDashboard = async () => {
    await fetchDashboardSummary();
    await fetchTransactions();
  }

  const fetchDashboardBarChartData = async () => {
    try {
      const data = await getDashboardBarChartData();
      setBarChartData(data);
    } catch (error) {
      console.error("Error fetching chart data: ", error);
    }
  }

  useEffect(() => {
    fetchDashboardSummary();
    fetchTransactions();
    fetchDashboardBarChartData();
  }, []);

  return { barChartData, summary, transactions, fetchDashboardSummary, fetchTransactions, refreshDashboard };
};

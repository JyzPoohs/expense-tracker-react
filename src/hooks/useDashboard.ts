import { getDashboardBarChartData, getDashboardPieChartData } from "@/services/chartService";
import { getDashboardSummary } from "@/services/summaryService";
import { getAllTransactions } from "@/services/transactionService";
import type { DashboardSummary } from "@/types/dashboardSummary";
import type { TransactionType } from "@/types/transaction";
import { useEffect, useState } from "react";
import type { DashboardBarChartData } from "@/types/chart";

export const useDashboard = () => {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [barChartData, setBarChartData] = useState<DashboardBarChartData[]>([]);
  const [pieChartData, setPieChartData] = useState<DashboardBarChartData[]>([]);

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

  const fetchDashboardBarChartData = async () => {
    try {
      const data = await getDashboardBarChartData();
      setBarChartData(data);
    } catch (error) {
      console.error("Error fetching dashboard bar chart data: ", error);
    }
  }

  const fetchDashboardPieChartData = async () => {
    try {
      const data = await getDashboardPieChartData();
      setPieChartData(data);
    } catch (error) {
      console.error("Error fetching dashboard pie chart data: ", error);
    }
  }

  const refreshDashboard = async () => {
    await fetchDashboardSummary();
    await fetchTransactions();
    await fetchDashboardBarChartData();
    await fetchDashboardPieChartData();
  }

  useEffect(() => {
    fetchDashboardSummary();
    fetchTransactions();
    fetchDashboardBarChartData();
    fetchDashboardPieChartData();
  }, []);

  return { barChartData, pieChartData, summary, transactions, fetchDashboardSummary, fetchTransactions, refreshDashboard };
};

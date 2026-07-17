import { getDashboardSummary } from "@/services/summaryService";
import type { DashboardSummary } from "@/types/dashboardSummary";
import { useEffect, useState } from "react";

export const useDashboard = () => {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);

  const fetchDashboardSummary = async () => {
    try {
      const data = await getDashboardSummary();

      setSummary(data);
    } catch (error) {
      console.error("Fetch dashboard summary error: ", error);
    }
  };

  useEffect(() => {
    fetchDashboardSummary();
  }, []);

  return { summary, fetchDashboardSummary };
};

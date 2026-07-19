import type { ChartConfig } from "@/components/ui/chart";

export const dashboardBarChartConfig: ChartConfig = {
  expense: {
    label: "Expense",
    color: "var(--chart-1)",
  },
  income: {
    label: "Income",
    color: "var(--chart-2)",
  },
};

export const dashboardPieChartConfig: ChartConfig = {
  food: {
    label: "Food",
    color: "var(--chart-1)",
  },
  shopping: {
    label: "Shopping",
    color: "var(--chart-2)",
  },
  bills: {
    label: "Bills",
    color: "var(--chart-3)",
  },
  rental: {
    label: "Rental",
    color: "var(--chart-4)",
  },
  transport: {
    label: "Transport",
    color: "var(--chart-5)",
  },
};

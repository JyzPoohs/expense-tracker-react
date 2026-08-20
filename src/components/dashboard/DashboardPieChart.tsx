import { Pie, PieChart } from "recharts";

import { Card, CardContent, CardHeader, CardDescription, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { dashboardPieChartConfig as chartConfig } from "@/config/ChartConfig";
import { useState } from "react";
import { formatChartDate } from "@/utils/date";
import { useDashboard } from "@/hooks/useDashboard";

const chartColors = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--chart-6)",
  "var(--chart-7)",
  "var(--chart-8)",
  "var(--chart-9)",
  "var(--chart-10)",
];

export default function DashboardPieChart() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { pieChartData } = useDashboard();

  const chartDataWithColors = pieChartData.map((item, index) => ({
    ...item,
    fill: chartColors[index % chartColors.length],
  }));

  return (
    <Card >
      <CardHeader className="text-center">
        <CardTitle>Monthly Expense Distribution (RM)</CardTitle>
        <CardDescription>{formatChartDate(currentMonth)}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartDataWithColors}
              dataKey="total"
              nameKey="expense"
            />
            <ChartLegend
              content={<ChartLegendContent nameKey="expense" />}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

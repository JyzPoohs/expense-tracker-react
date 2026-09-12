import { Pie, PieChart } from "recharts";

import { Card, CardContent, CardHeader, CardDescription, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { useState } from "react";
import { formatChartDate } from "@/utils/date";
import type { DashboardPieChartData } from "@/types/chart";
import { chartColors } from "@/types/chart";

interface DashboardPieChartProps {
  pieChartData: DashboardPieChartData[];
}

export default function DashboardPieChart({ pieChartData }: DashboardPieChartProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const chartDataWithColors = pieChartData.map((item, index) => ({
    ...item,
    fill: chartColors[index % chartColors.length],
  }));

  const chartConfig = pieChartData.reduce((config, item, index) => {
  config[item.expense] = {
    label: item.expense,
    color: chartColors[index % chartColors.length],
  };

  return config;
}, {} as Record<string, { label: string; color: string }>);

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

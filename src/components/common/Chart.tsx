import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { dashboardBarChartConfig } from "@/config/ChartConfig";

const chartData = [
  { month: "January", expense: 186, income: 80 },
  { month: "February", expense: 305, income: 200 },
  { month: "March", expense: 237, income: 120 },
  { month: "April", expense: 73, income: 190 },
  { month: "May", expense: 209, income: 130 },
  { month: "June", expense: 214, income: 140 },
];

export function DashboardBarChart() {
  return (
    <ChartContainer config={dashboardBarChartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)} 
        />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="expense" fill="var(--color-expense)" radius={4} />
        <Bar dataKey="income" fill="var(--color-income)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}

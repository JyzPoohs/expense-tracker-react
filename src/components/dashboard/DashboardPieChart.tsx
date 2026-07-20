import { Pie, PieChart } from "recharts";

import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { dashboardPieChartConfig as chartConfig } from "@/config/ChartConfig";

const chartData = [
  {
    expense: "food",
    total: 275,
    fill: "var(--color-food)",
  },
  {
    expense: "shopping",
    total: 200,
    fill: "var(--color-shopping)",
  },
  {
    expense: "bills",
    total: 187,
    fill: "var(--color-bills)",
  },
  {
    expense: "rental",
    total: 173,
    fill: "var(--color-rental)",
  },
  {
    expense: "transport",
    total: 90,
    fill: "var(--color-transport)",
  },
];

export default function DashboardPieChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="text-center">
        <CardDescription>Expense Distribution (RM)</CardDescription>
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
              data={chartData}
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

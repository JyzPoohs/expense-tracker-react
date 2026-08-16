import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { dashboardBarChartConfig as chartConfig } from "@/config/ChartConfig";
import { useState } from "react";
import { formatChartDate } from "@/utils/date";
import { useDashboard } from "@/hooks/useDashboard";

// const chartData = [
//   { month: "January", expense: 186, income: 80 },
//   { month: "February", expense: 305, income: 200 },
//   { month: "March", expense: 237, income: 120 },
//   { month: "April", expense: 73, income: 190 },
//   { month: "May", expense: 209, income: 130 },
//   { month: "June", expense: 214, income: 140 },
// ];

export default function DashboardBarChart() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [previousMonth, setPreviousMonth] = useState(() => {
    const date = new Date();
    date.setMonth(date.getMonth() - 5);
    return date;
  });
  const { barChartData } = useDashboard();

  return (
    <Card >
      <CardHeader className="text-center">
        <CardTitle>Monthly Income & Expenses (RM)</CardTitle>
        <CardDescription>
          {formatChartDate(new Date(previousMonth))} – {formatChartDate(new Date(currentMonth))}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-square w-full max-h-[250px]">
          <BarChart accessibilityLayer data={barChartData}>
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
      </CardContent>
    </Card>
  );
}

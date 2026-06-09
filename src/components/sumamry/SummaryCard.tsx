import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { SummaryCardProps } from "@/types/summaryCards";

export const SummaryCard = ({
  title,
  value,
  icon: Icon,
  description,
}: SummaryCardProps) => {
  return (
    <Card className="border border-amber-300">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        <Icon className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {value}
        </div>
        {description && (
          <p className="text-muted-foreground text-xs mt-1">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
};
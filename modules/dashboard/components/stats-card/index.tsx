import { Info, TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/shadcn/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/tooltip";

interface StatsCardProps {
  amount: number;
  percentageChange: number;
  period?: string;
  className?: string;
}

export default function StatsCard({
  amount,
  percentageChange,
  period = "last week",
  className,
}: StatsCardProps) {
  const isPositive = percentageChange > 0;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-medium text-text-secondary">
            Revenue goal for this month
          </h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-text-secondary" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Revenue goal for this month</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-3">{formatCurrency(amount)}</div>

        <div className="flex items-center gap-2">
          <div
            className={cn(
              "flex items-center font-semibold gap-1",
              isPositive ? "text-text-success-primary" : "text-red-500"
            )}
          >
            {isPositive && <TrendingUp className="h-[18px] w-[18px]" />}
            {!isPositive && <TrendingDown />}
            {Math.abs(percentageChange).toFixed(2)}%
          </div>
          <span className="text-muted-foreground">{period}</span>
        </div>
      </CardContent>
    </Card>
  );
}

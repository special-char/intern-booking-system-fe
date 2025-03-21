"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/shadcn/card";

import { animate, useMotionValue, useMotionValueEvent } from "motion/react";
import { useState, useEffect } from "react";
import { Tooltip } from "@/components/common/tooltip";

interface StatsCardProps {
  amount?: number;
  dollarAmount?: number;
  percentageChange: number;
  period?: string;
  className?: string;
  title: string;
  description: string;
}

export default function StatsCard({
  amount,
  dollarAmount,
  percentageChange,
  period = "last week",
  className,
  title,
  description,
}: StatsCardProps) {
  const isPositive = percentageChange > 0;
  const currencyFormatter = (val: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(val);

  const percentFormatter = (val: number) => `${val.toFixed(2)}%`;

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-medium text-text-secondary">{title}</h2>
          <Tooltip>
            <p>{description}</p>
          </Tooltip>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-3">
          <AnimatedNumber
            value={amount ?? dollarAmount ?? 0}
            formatFn={dollarAmount ? currencyFormatter : undefined}
          />
        </div>

        <div className="flex items-center gap-2">
          <div
            className={cn(
              "flex items-center font-semibold gap-1",
              isPositive ? "text-text-success-primary" : "text-red-500"
            )}
          >
            {isPositive && <TrendingUp className="h-[18px] w-[18px]" />}
            {!isPositive && <TrendingDown />}
            <AnimatedNumber
              value={Math.abs(percentageChange)}
              formatFn={percentFormatter}
            />
          </div>
          <span className="text-muted-foreground">{period}</span>
        </div>
      </CardContent>
    </Card>
  );
}

interface AnimatedNumberProps {
  value: number;
  isCurrency?: boolean;
  formatFn?: (val: number) => string;
  duration?: number;
}

export function AnimatedNumber({
  value,
  formatFn,
  duration = 1,
}: AnimatedNumberProps) {
  const motionValue = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(0);

  useMotionValueEvent(motionValue, "change", (latest) => {
    setDisplayValue(latest);
  });

  useEffect(() => {
    const controls = animate(motionValue, value, { duration });
    return () => {
      controls.stop();
    };
  }, [value, duration, motionValue]);

  const formatted = formatFn ? formatFn(displayValue) : displayValue.toString();

  return <span>{formatted}</span>;
}

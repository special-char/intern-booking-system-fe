"use client";

import { Card, CardContent } from "@/components/shadcn/card";
import { TrendingUp } from "lucide-react";

interface SummaryCardProps {
  title: string;
  value: string | number;
  change: string;
  icon: React.ReactNode;
  iconBgColor: string;
  iconColor: string;
}

export function SummaryCard({
  title,
  value,
  change,
  icon,
  iconBgColor,
  iconColor,
}: SummaryCardProps) {
  return (
    <Card className="relative border border-gray-200 rounded-xl shadow-lg bg-white overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col">
          <div className="text-sm font-medium text-gray-500">{title}</div>
          <div className="mt-3 flex items-baseline">
            <span className="text-3xl font-bold text-gray-900">{value}</span>
          </div>
          <div className="mt-3 flex items-center text-sm text-green-600 font-medium">
            <TrendingUp className="w-4 h-4 mr-2" />
            {change}
          </div>
          <div className="absolute top-6 right-6">
            <div className={`rounded-full ${iconBgColor} p-1 shadow-inner`}>
              <div className={iconColor}>{icon}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

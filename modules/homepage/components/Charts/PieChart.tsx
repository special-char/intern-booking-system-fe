"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface PieChartProps {
  title: string;
  data: any[];
}

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
];

export function PieChart({ title, data }: PieChartProps) {
  return (
    <Card className="border border-gray-200 rounded-xl shadow-lg bg-white overflow-hidden">
      <CardHeader className="pb-0">
        <CardTitle className="text-md font-semibold text-gray-800">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  boxShadow:
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  border: "1px solid #e5e7eb",
                }}
              />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 justify-center">
          {data.map((entry, index) => (
            <div
              key={entry.name}
              className="flex items-center min-w-[100px] max-w-full"
            >
              <span
                className="inline-block w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-sm text-gray-700 whitespace-pre-line break-words">
                {entry.name}: {entry.value}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

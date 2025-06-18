"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface TimeSlotPopularityChartProps {
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

export function TimeSlotPopularityChart({
  data,
}: TimeSlotPopularityChartProps) {
  return (
    <Card className="border border-gray-200 rounded-xl shadow-lg bg-white overflow-hidden">
      <CardHeader className="pb-0">
        <CardTitle className="text-lg font-semibold text-gray-800">
          Time Slot Popularity
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-80">
          <ResponsiveContainer width="90%" height="90%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 10, left: 20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />

              <XAxis dataKey="name" tick={{ fill: "#6b7280" }} />

              <YAxis tick={{ fill: "#6b7280" }} />

              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  boxShadow:
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  border: "1px solid #e5e7eb",
                }}
              />

              <Legend />

              <Bar
                dataKey="value"
                fill="#8884d8"
                name="Bookings"
                radius={[4, 4, 0, 0]}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

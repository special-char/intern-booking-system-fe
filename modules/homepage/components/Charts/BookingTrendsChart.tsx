"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface BookingTrendsChartProps {
  data: any[];
  timeRange: string;
}

export function BookingTrendsChart({
  data,
  timeRange,
}: BookingTrendsChartProps) {
  return (
    <Card className="border border-gray-200 rounded-xl shadow-lg bg-white overflow-hidden">
      <CardHeader className="pb-0">
        <CardTitle className="text-lg font-semibold text-gray-800">
          Booking & Revenue Trends
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-80">
          <ResponsiveContainer width="90%" height="90%">
            <LineChart
              data={data}
              margin={{ top: 20, right: 10, left: 20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />

              <XAxis
                dataKey={timeRange === "daily" ? "day" : "month"}
                tick={{ fill: "#6b7280" }}
              />

              <YAxis yAxisId="left" tick={{ fill: "#6b7280" }} />

              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fill: "#6b7280" }}
              />

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

              <Line
                yAxisId="left"
                type="monotone"
                dataKey="bookings"
                stroke="#4f46e5"
                strokeWidth={2}
                activeDot={{ r: 8 }}
                name="Bookings"
              />

              <Line
                yAxisId="right"
                type="monotone"
                dataKey="revenue"
                stroke="#10b981"
                strokeWidth={2}
                name="Revenue (₹)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

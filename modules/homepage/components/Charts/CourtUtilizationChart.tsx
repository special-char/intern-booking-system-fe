"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

interface CourtUtilizationChartProps {
  data: any[];
}

export function CourtUtilizationChart({ data }: CourtUtilizationChartProps) {
  return (
    <Card className="border border-gray-200 rounded-xl shadow-lg bg-white overflow-hidden">
      <CardHeader className="pb-0">
        <CardTitle className="text-md font-semibold text-gray-800">
          Court Utilization
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="80%">
            <RadarChart cx="50%" cy="55%" outerRadius="90%" data={data}>
              <PolarGrid stroke="#e5e7eb" />

              <PolarAngleAxis
                dataKey="court"
                tick={{ fill: "#6b7280", fontSize: 12 }}
              />

              <PolarRadiusAxis
                angle={30}
                domain={[0, 100]}
                tick={{ fill: "#6b7280" }}
              />

              <Radar
                name="Utilization"
                dataKey="utilization"
                stroke="#4f46e5"
                fill="#4f46e5"
                fillOpacity={0.6}
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
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/shadcn/card";
import { Tooltip } from "@/components/common/tooltip";

// Define types for the chart data
interface BarData {
  title: string;
  value: number;
  percentage: number;
  sections: {
    value: number;
    color: string;
    label: string;
  }[];
}

interface UserData {
  name: string;
  time: string;
  amount: number;
  initials: string;
}

interface ServiceChartProps {
  title?: string;
  description?: string;
  data?: BarData[];
  userData?: UserData[];
  className?: string;
}

const ServiceChart: React.FC<ServiceChartProps> = ({
  title = "Minimum Trip Charge",
  description = "Breakdown of service charges by type",
  data = defaultData,
  userData = defaultUserData,
  className,
}) => {
  const [animatedBars, setAnimatedBars] = useState(false);
  const maxValue = Math.max(...data.map((item) => item.value));

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedBars(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className={cn("col-span-4", className)}>
      <CardHeader>
        <div className="flex items-center gap-1">
          <h2 className="text-xl font-medium">{title}</h2>
          <Tooltip>
            <p>{description}</p>
          </Tooltip>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative h-[400px] mt-4 bg-gray-50 rounded-lg p-4">
          {/* Y-axis values */}
          <div className="absolute left-0 top-0 bottom-0 w-10 flex flex-col justify-between text-sm text-gray-500 p-4">
            <span>60</span>
            <span>40</span>
            <span>20</span>
            <span>0</span>
          </div>

          {/* Chart area */}
          <div className="flex h-full pl-10">
            {data.map((item, index) => {
              // Calculate proportional height based on max value
              const barHeight = (item.value / maxValue) * 300;

              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  {/* Value and percentage label */}
                  <div className="text-sm font-medium mb-1 text-center">
                    ${item.value} | {item.percentage}%
                  </div>

                  {/* Bar container */}
                  <div className="w-full flex justify-center mb-8 h-[300px] flex items-end">
                    <div
                      className="w-[75%] transition-all duration-700 rounded-t-md overflow-hidden border border-blue-300"
                      style={{
                        height: animatedBars ? `${barHeight}px` : "0px",
                      }}
                    >
                      {item.sections.map((section, sectionIndex) => {
                        const sectionHeight = `${(section.value / item.value) * 100}%`;

                        return (
                          <div
                            key={sectionIndex}
                            className="w-full transition-opacity"
                            style={{
                              backgroundColor: section.color,
                              height: sectionHeight,
                              opacity: animatedBars ? 1 : 0,
                              transitionDelay: `${300 + sectionIndex * 200}ms`,
                              transitionDuration: "0.5s",
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* Title below bar */}
                  <div className="text-sm text-center">{item.title}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-4">
          {["Content", "Content", "Content"].map((label, index) => (
            <div key={index} className="flex items-center gap-1">
              <div
                className={`w-3 h-3 rounded-full ${
                  index === 0
                    ? "bg-blue-200"
                    : index === 1
                      ? "bg-blue-300"
                      : "bg-green-200"
                }`}
              />
              <span className="text-sm">{label}</span>
            </div>
          ))}
        </div>

        {/* User details section */}
        <div className="mt-8 space-y-4">
          {userData.map((user, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-800">
                  {user.initials}
                </div>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.time}</p>
                </div>
              </div>
              <div className="text-green-600 font-medium">
                ${user.amount.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Default sample data based on the image
const defaultData: BarData[] = [
  {
    title: "4 Tires + Install",
    value: 234,
    percentage: 35,
    sections: [
      { value: 120, color: "#DBEAFE", label: "Content" },
      { value: 70, color: "#93C5FD", label: "Content" },
      { value: 44, color: "#DCFCE7", label: "Content" },
    ],
  },
  {
    title: "2 Tires + Install",
    value: 210,
    percentage: 25,
    sections: [
      { value: 130, color: "#DBEAFE", label: "Content" },
      { value: 60, color: "#93C5FD", label: "Content" },
      { value: 20, color: "#DCFCE7", label: "Content" },
    ],
  },
  {
    title: "Patch Repair",
    value: 124,
    percentage: 60,
    sections: [
      { value: 65, color: "#DBEAFE", label: "Content" },
      { value: 29, color: "#93C5FD", label: "Content" },
      { value: 30, color: "#DCFCE7", label: "Content" },
    ],
  },
  {
    title: "Patch Repair fail",
    value: 49,
    percentage: 70,
    sections: [
      { value: 24, color: "#DBEAFE", label: "Content" },
      { value: 15, color: "#93C5FD", label: "Content" },
      { value: 10, color: "#DCFCE7", label: "Content" },
    ],
  },
  {
    title: "Install Only (4)",
    value: 29,
    percentage: 65,
    sections: [
      { value: 12, color: "#DBEAFE", label: "Content" },
      { value: 7, color: "#93C5FD", label: "Content" },
      { value: 10, color: "#DCFCE7", label: "Content" },
    ],
  },
];

// User data shown below the chart
const defaultUserData: UserData[] = [
  {
    name: "Rob Silvia",
    time: "5 minutes ago",
    amount: 1159.34,
    initials: "RS",
  },
  {
    name: "Rob Silvia",
    time: "5 minutes ago",
    amount: 1159.34,
    initials: "RS",
  },
];

export default ServiceChart;

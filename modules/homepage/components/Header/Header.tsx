"use client";

import { Button } from "@/components/shadcn/button";
import { BookOpen } from "lucide-react";

interface HeaderProps {
  timeRange: string;
  onTimeRangeChange: (value: string) => void;
  onViewBookings: () => void;
  onExportReport: () => void;
}

export function Header({
  timeRange,
  onTimeRangeChange,
  onViewBookings,
  onExportReport,
}: HeaderProps) {
  return (
    <>
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Box Cricket Dashboard
        </h1>
        <p className="text-gray-500 mt-2 text-lg">
          Comprehensive analytics for your box cricket business
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* View Bookings Button */}
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => onTimeRangeChange(e.target.value)}
            className="w-36 border border-gray-300 rounded-lg text-gray-700 hover:border-gray-400 transition-colors px-3 py-2 bg-white"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <Button onClick={onViewBookings}>
            <BookOpen className="w-4 h-4 mr-2" />
            View Bookings
          </Button>
        </div>

        {/* Export Report Button */}
        <div className="flex items-center gap-3">
          <Button
            className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
            onClick={onExportReport}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span className="font-medium">Export Report</span>
          </Button>
        </div>
      </div>
    </>
  );
}

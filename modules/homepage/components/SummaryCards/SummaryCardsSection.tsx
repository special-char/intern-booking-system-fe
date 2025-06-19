"use client";

import { BarChart3, Calendar, Users, Activity } from "lucide-react";
import { SummaryCard } from "./SummaryCard";

interface SummaryCardsSectionProps {
  totalRevenue: number;
  totalBookings: number;
  averageBookingValue: number;
  peakCourt: string;
}

export function SummaryCardsSection({
  totalRevenue,
  totalBookings,
  averageBookingValue,
  peakCourt,
}: SummaryCardsSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Revenue Card */}
      <SummaryCard
        title="Total Revenue"
        value={`₹${totalRevenue.toLocaleString("en-IN", {
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        })}`}
        change="+15.2% from last period"
        icon={<BarChart3 className="w-4 h-4" />}
        iconBgColor="bg-blue-100"
        iconColor="text-blue-600"
      />

      {/* Total Bookings Card */}
      <SummaryCard
        title="Total Bookings"
        value={totalBookings}
        change="+8.7% from last period"
        icon={<Calendar className="w-4 h-4" />}
        iconBgColor="bg-green-100"
        iconColor="text-green-600"
      />

      {/* Average Booking Value Card */}
      <SummaryCard
        title="Avg. Booking Value"
        value={`₹${averageBookingValue.toFixed(2)}`}
        change="+5.3% from last period"
        icon={<Users className="w-4 h-4" />}
        iconBgColor="bg-yellow-100"
        iconColor="text-yellow-600"
      />

      {/* Peak Utilization Card */}
      <SummaryCard
        title="Peak Utilization"
        value={peakCourt}
        change="+3.1% from last period"
        icon={<Activity className="w-4 h-4" />}
        iconBgColor="bg-purple-100"
        iconColor="text-purple-600"
      />
    </div>
  );
}

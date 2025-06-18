"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

import { Header } from "./components/Header";
import { SummaryCardsSection } from "./components/SummaryCards";
import {
  BookingTrendsChart,
  TimeSlotPopularityChart,
  CourtUtilizationChart,
  PieChart,
} from "./components/Charts";
import { BookingModal } from "./components/BookingModal";
import {
  dailyBookings,
  monthlyBookings,
  timeSlotPopularity,
  courtUtilization,
  customerSegmentation,
  packagePopularity,
} from "./data/mockData";
import { useDashboardData } from "./hooks/useDashboardData";
import type { EventColor } from "@/components/event-calendar";

export function CricketDashboard() {
  const [timeRange, setTimeRange] = useState("daily");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Calendar events (static for now)
  const [events] = useState([
    {
      id: "1",
      title: "Morning Cricket Session",
      description: "Regular morning practice session",
      start: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        8,
        0
      ),
      end: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        10,
        0
      ),
      color: "sky" as EventColor,
      location: "Court 1",
    },
    {
      id: "2",
      title: "Afternoon Match",
      description: "Friendly match with local team",
      start: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        14,
        0
      ),
      end: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        16,
        0
      ),
      color: "emerald" as EventColor,
      location: "Court 2",
    },
    {
      id: "3",
      title: "Evening Training",
      description: "Advanced skills training",
      start: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        22,
        0
      ),
      end: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        23,
        59
      ),
      color: "amber" as EventColor,
      location: "Court 3",
    },
    {
      id: "4",
      title: "Weekend Tournament",
      description: "Local cricket tournament",
      start: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() + 3,
        9,
        0
      ),
      end: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() + 3,
        17,
        0
      ),
      color: "rose" as EventColor,
      location: "All Courts",
    },
  ]);

  // Dashboard data from API
  const {
    medusaOrders,
    medusaTotalRevenue,
    medusaTotalBookings,
    medusaAverageBookingValue,
  } = useDashboardData();

  // Peak Court Utilization
  const peakCourt = courtUtilization.reduce((maxCourt, currentCourt) =>
    currentCourt.utilization > maxCourt.utilization ? currentCourt : maxCourt
  );

  // PDF Export Handler
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Box Cricket Analytics Report", 14, 16);
    doc.setFontSize(10);

    // Add booking data
    doc.text("Booking Statistics", 14, 30);
    const bookingHeaders = ["Month", "Bookings", "Revenue (₹)"];
    const bookingData = monthlyBookings.map((month) => [
      month.month,
      month.bookings,
      month.revenue.toLocaleString(),
    ]);

    autoTable(doc, {
      head: [bookingHeaders],
      body: bookingData,
      startY: 35,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: {
        fillColor: [49, 46, 129],
        textColor: 255,
        fontStyle: "bold",
      },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      margin: { left: 14, right: 14 },
    });

    // Add court utilization
    doc.text("Court Utilization", 14, 110);
    const courtHeaders = ["Court", "Utilization (%)"];
    const courtData = courtUtilization.map((court) => [
      court.court,
      court.utilization,
    ]);

    autoTable(doc, {
      head: [courtHeaders],
      body: courtData,
      startY: 115,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: {
        fillColor: [49, 46, 129],
        textColor: 255,
        fontStyle: "bold",
      },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      margin: { left: 14, right: 14 },
    });

    doc.save("cricket_analytics_report.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-2 pb-8 px-4 md:px-8 lg:px-12 font-sans antialiased ">
      <div className="max-w-7xl mx-auto space-y-8">
        <Header
          timeRange={timeRange}
          onTimeRangeChange={setTimeRange}
          onViewBookings={openModal}
          onExportReport={handleExportPDF}
        />

        <BookingModal
          isOpen={isModalOpen}
          onClose={closeModal}
          events={events}
          timeRange={timeRange}
        />

        <SummaryCardsSection
          totalRevenue={medusaTotalRevenue}
          totalBookings={medusaTotalBookings}
          averageBookingValue={medusaAverageBookingValue}
          peakCourt={peakCourt.court}
        />

        {/* Charts Section - First Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <BookingTrendsChart
            data={timeRange === "daily" ? dailyBookings : monthlyBookings}
            timeRange={timeRange}
          />
          <TimeSlotPopularityChart data={timeSlotPopularity} />
        </div>

        {/* Charts Section - Second Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CourtUtilizationChart data={courtUtilization} />
          <PieChart title="Customer Segmentation" data={customerSegmentation} />
          <PieChart title="Package Popularity" data={packagePopularity} />
        </div>
      </div>
      {/* Add CSS for custom scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

// Enhanced TypeScript interfaces
export interface Booking {
  id: string; // Unique identifier
  customerName: string;
  customerContact?: string; // Phone or email
  timePeriod: {
    start: string; // ISO time format (HH:mm)
    end: string;
  };
  court: string;
  price: number;
  status: "confirmed" | "pending" | "cancelled" | "completed";
  paymentStatus: "paid" | "pending" | "failed" | "refunded";
  bookingDate: string; // When booking was made
  notes?: string;
  packageType?: "1-hour" | "2-hour" | "3-hour" | "tournament";
}

export interface DayData {
  date: string; // ISO date format (YYYY-MM-DD)
  day: string;
  bookings: Booking[];
  revenue: number;
  totalBookings: number; // Derived field for quick access
}

export interface WeekData {
  week: number;
  startDate: string; // Week start date
  endDate: string; // Week end date
  days: DayData[];
  total: {
    bookings: number;
    revenue: number;
    averageDailyRevenue: number;
  };
}

export interface MonthAnalytics {
  timeSlotPopularity: Array<{
    timeSlot: string;
    bookings: number;
    percentage: number;
  }>;
  courtUtilization: Array<{
    court: string;
    totalHours: number;
    bookedHours: number;
    utilizationRate: number; // percentage
  }>;
  customerSegmentation: Array<{
    segment: "regular" | "occasional" | "new";
    count: number;
    percentage: number;
    revenue: number;
  }>;
  packagePopularity: Array<{
    packageType: string;
    bookings: number;
    percentage: number;
    revenue: number;
  }>;
  peakHours: Array<{
    hour: string;
    bookingCount: number;
  }>;
  revenueByDay: Array<{
    day: string;
    revenue: number;
  }>;
}

export interface MonthData {
  weeks: WeekData[];
  total: {
    bookings: number;
    revenue: number;
    averageBookingValue: number;
    totalOperatingDays: number;
  };
  analytics: MonthAnalytics;
}

export interface AllBookingData {
  [monthName: string]: MonthData;
}

// Utility functions for data processing
export class BookingDataProcessor {
  static calculateDayRevenue(bookings: Booking[]): number {
    return bookings
      .filter((b) => b.status !== "cancelled")
      .reduce((sum, booking) => sum + booking.price, 0);
  }

  static calculateWeekTotals(days: DayData[]): WeekData["total"] {
    const totalBookings = days.reduce((sum, day) => sum + day.totalBookings, 0);
    const totalRevenue = days.reduce((sum, day) => sum + day.revenue, 0);

    return {
      bookings: totalBookings,
      revenue: totalRevenue,
      averageDailyRevenue: totalRevenue / days.length,
    };
  }

  static generateTimeSlotAnalytics(
    bookings: Booking[]
  ): MonthAnalytics["timeSlotPopularity"] {
    const timeSlots = new Map<string, number>();

    bookings.forEach((booking) => {
      const hour = parseInt(booking.timePeriod.start.split(":")[0]);
      let slot: string;

      if (hour >= 6 && hour < 9) slot = "6AM-9AM";
      else if (hour >= 9 && hour < 12) slot = "9AM-12PM";
      else if (hour >= 12 && hour < 15) slot = "12PM-3PM";
      else if (hour >= 15 && hour < 18) slot = "3PM-6PM";
      else if (hour >= 18 && hour < 21) slot = "6PM-9PM";
      else slot = "9PM-12AM";

      timeSlots.set(slot, (timeSlots.get(slot) || 0) + 1);
    });

    const totalBookings = bookings.length;
    return Array.from(timeSlots.entries()).map(([timeSlot, bookings]) => ({
      timeSlot,
      bookings,
      percentage: Math.round((bookings / totalBookings) * 100),
    }));
  }

  static generateCourtUtilization(
    days: DayData[],
    courts: string[],
    operatingHours: number = 18 // 6AM to 12AM
  ): MonthAnalytics["courtUtilization"] {
    return courts.map((court) => {
      const totalAvailableHours = days.length * operatingHours;
      const bookedHours = days.reduce((sum, day) => {
        return (
          sum +
          day.bookings
            .filter((b) => b.court === court && b.status !== "cancelled")
            .reduce((hours, booking) => {
              const start = parseInt(booking.timePeriod.start.split(":")[0]);
              const end = parseInt(booking.timePeriod.end.split(":")[0]);
              return hours + (end - start);
            }, 0)
        );
      }, 0);

      return {
        court,
        totalHours: totalAvailableHours,
        bookedHours,
        utilizationRate: Math.round((bookedHours / totalAvailableHours) * 100),
      };
    });
  }
}

// Example of improved data with proper calculations
export const improvedBookingData: AllBookingData = {
  June: {
    weeks: [
      {
        week: 1,
        startDate: "2025-06-01",
        endDate: "2025-06-07",
        days: [
          // day 1
          {
            date: "2025-06-01",
            day: "Sun",
            bookings: [
              {
                id: "book_001",
                customerName: "A",
                customerContact: "+91-9876543210",
                timePeriod: { start: "01:00", end: "02:00" },
                court: "Court 1",
                price: 1000,
                status: "confirmed",
                paymentStatus: "paid",
                bookingDate: "2025-05-28",
                packageType: "1-hour",
              },
              {
                id: "book_002",
                customerName: "B",
                customerContact: "+91-9876543210",
                timePeriod: { start: "02:00", end: "04:00" },
                court: "Court 1",
                price: 2000,
                status: "confirmed",
                paymentStatus: "paid",
                bookingDate: "2025-05-28",
                packageType: "2-hour",
              },
              // ... other bookings
            ],
            revenue: 3000,
            totalBookings: 2,
          },
          // day 2
          {
            date: "2025-06-02",
            day: "Mon",
            bookings: [
              {
                id: "book_003",
                customerName: "C",
                customerContact: "+91-9876543210",
                timePeriod: { start: "01:00", end: "02:00" },
                court: "Court 1",
                price: 1000,
                status: "confirmed",
                paymentStatus: "paid",
                bookingDate: "2025-05-28",
                packageType: "1-hour",
              },
              {
                id: "book_004",
                customerName: "D",
                customerContact: "+91-9876543210",
                timePeriod: { start: "02:00", end: "04:00" },
                court: "Court 1",
                price: 2000,
                status: "confirmed",
                paymentStatus: "paid",
                bookingDate: "2025-05-28",
                packageType: "2-hour",
              },
              // ... other bookings
            ],
            revenue: 3000,
            totalBookings: 2,
          },
          // day 3
          {
            date: "2025-06-03",
            day: "Tue",
            bookings: [
              {
                id: "book_005",
                customerName: "E",
                customerContact: "+91-9876543210",
                timePeriod: { start: "01:00", end: "02:00" },
                court: "Court 1",
                price: 1000,
                status: "confirmed",
                paymentStatus: "paid",
                bookingDate: "2025-05-28",
                packageType: "1-hour",
              },
              {
                id: "book_006",
                customerName: "F",
                customerContact: "+91-9876543210",
                timePeriod: { start: "02:00", end: "04:00" },
                court: "Court 1",
                price: 2000,
                status: "confirmed",
                paymentStatus: "paid",
                bookingDate: "2025-05-28",
                packageType: "2-hour",
              },
              // ... other bookings
            ],
            revenue: 3000,
            totalBookings: 2,
          },
          // ... other days
        ],
        total: {
          bookings: 16,
          revenue: 48500,
          averageDailyRevenue: 6928.57,
        },
      },
      // ... other weeks
      {
        week: 3,
        startDate: "2025-06-15",
        endDate: "2025-06-16",
        days: [
          // day 1
          {
            date: "2025-06-15",
            day: "Sun",
            bookings: [
              {
                id: "book_015",
                customerName: "X",
                customerContact: "+91-9876543210",
                timePeriod: { start: "01:00", end: "02:00" },
                court: "Court 1",
                price: 1000,
                status: "confirmed",
                paymentStatus: "paid",
                bookingDate: "2025-05-28",
                packageType: "1-hour",
              },
              {
                id: "book_016",
                customerName: "Y",
                customerContact: "+91-9876543210",
                timePeriod: { start: "02:00", end: "04:00" },
                court: "Court 1",
                price: 2000,
                status: "confirmed",
                paymentStatus: "paid",
                bookingDate: "2025-05-28",
                packageType: "2-hour",
              },
              // ... other bookings
            ],
            revenue: 3000,
            totalBookings: 2,
          },
          // day 2
          {
            date: "2025-06-16",
            day: "Mon",
            bookings: [
              {
                id: "book_017",
                customerName: "W",
                customerContact: "+91-9876543210",
                timePeriod: { start: "01:00", end: "02:00" },
                court: "Court 1",
                price: 1000,
                status: "confirmed",
                paymentStatus: "paid",
                bookingDate: "2025-05-28",
                packageType: "1-hour",
              },
              {
                id: "book_018",
                customerName: "Z",
                customerContact: "+91-9876543210",
                timePeriod: { start: "02:00", end: "04:00" },
                court: "Court 1",
                price: 2000,
                status: "confirmed",
                paymentStatus: "paid",
                bookingDate: "2025-05-28",
                packageType: "2-hour",
              },
              // ... other bookings
            ],
            revenue: 3000,
            totalBookings: 2,
          }
          // ... other days
        ],
        total: {
          bookings: 4,
          revenue: 6000,
          averageDailyRevenue: 6928.57,
        },
      },
      // ... other weeks
    ],
    total: {
      bookings: 32,
      revenue: 101500,
      averageBookingValue: 3171.88,
      totalOperatingDays: 16,
    },
    analytics: {
      timeSlotPopularity: [
        { timeSlot: "6AM-9AM", bookings: 8, percentage: 25 },
        { timeSlot: "9AM-12PM", bookings: 6, percentage: 19 },
        // ... other slots
      ],
      courtUtilization: [
        {
          court: "Court 1",
          totalHours: 288,
          bookedHours: 12,
          utilizationRate: 4,
        },
        // ... other courts
      ],
      customerSegmentation: [
        { segment: "regular", count: 19, percentage: 60, revenue: 60900 },
        { segment: "occasional", count: 8, percentage: 25, revenue: 25375 },
        { segment: "new", count: 5, percentage: 15, revenue: 15225 },
      ],
      packagePopularity: [
        { packageType: "1-hour", bookings: 20, percentage: 63, revenue: 40000 },
        { packageType: "2-hour", bookings: 8, percentage: 25, revenue: 35000 },
        { packageType: "3-hour", bookings: 4, percentage: 12, revenue: 26500 },
      ],
      peakHours: [
        { hour: "18:00", bookingCount: 5 },
        { hour: "19:00", bookingCount: 4 },
        // ... other hours
      ],
      revenueByDay: [
        { day: "Sunday", revenue: 9000 },
        { day: "Monday", revenue: 11000 },
        // ... other days
      ],
    },
  },
};

// bookingData.ts

export type TimePeriod =
  | "6AM-9AM"
  | "9AM-12PM"
  | "12PM-3PM"
  | "3PM-6PM"
  | "6PM-9PM"
  | "9PM-12AM";

export interface CustomerBooking {
  customerName: string;
  timePeriod: TimePeriod;
  court: string;
  price: number;
}

export interface DayBooking {
  date: string;
  day: string;
  bookings: CustomerBooking[];
  revenue: number;
}

export interface WeekBooking {
  week: number;
  days: DayBooking[];
}

export interface BookingMonthData {
  weeks: WeekBooking[];
  total: {
    bookings: number;
    revenue: number;
  };
  timeSlotPopularity: { name: TimePeriod; value: number }[];
  courtUtilization: { court: string; utilization: number }[];
  customerSegmentation: { name: string; value: number }[];
  packagePopularity: { name: string; value: number }[];
}

export interface AllBookingData {
  [month: string]: BookingMonthData;
}

// Now export the actual data:
export const bookingData: AllBookingData = {
  June: {
    weeks: [
      {
        week: 1,
        days: [
          {
            date: "2025-06-01",
            day: "Sun",
            bookings: [
              { customerName: "Arjun", timePeriod: "6AM-9AM", court: "Court 1", price: 1000 },
              { customerName: "Neha", timePeriod: "6PM-9PM", court: "Court 2", price: 2000 },
              { customerName: "Ravi", timePeriod: "9PM-12AM", court: "Court 3", price: 2000 }
            ],
            revenue: 5000
          },
          {
            date: "2025-06-02",
            day: "Mon",
            bookings: [
              { customerName: "Priya", timePeriod: "6AM-9AM", court: "Court 1", price: 3000 },
              { customerName: "Karan", timePeriod: "9AM-12PM", court: "Court 2", price: 3000 }
            ],
            revenue: 6000
          },
          {
            date: "2025-06-03",
            day: "Tue",
            bookings: [
              { customerName: "Ritu", timePeriod: "6PM-9PM", court: "Court 1", price: 4000 }
            ],
            revenue: 4000
          }
          // Add more days similarly...
        ]
      }
    ],
    total: {
      bookings: 250,
      revenue: 125000
    },
    timeSlotPopularity: [
      { name: "6AM-9AM", value: 15 },
      { name: "9AM-12PM", value: 10 },
      { name: "12PM-3PM", value: 8 },
      { name: "3PM-6PM", value: 12 },
      { name: "6PM-9PM", value: 30 },
      { name: "9PM-12AM", value: 25 }
    ],
    courtUtilization: [
      { court: "Court 1", utilization: 85 },
      { court: "Court 2", utilization: 75 },
      { court: "Court 3", utilization: 90 },
      { court: "Court 4", utilization: 65 },
      { court: "Court 5", utilization: 80 }
    ],
    customerSegmentation: [
      { name: "Regular", value: 55 },
      { name: "Occasional", value: 30 },
      { name: "New", value: 15 }
    ],
    packagePopularity: [
      { name: "1 Hour", value: 25 },
      { name: "2 Hours", value: 45 },
      { name: "3+ Hours", value: 15 },
      { name: "Tournament", value: 15 }
    ]
  }
};


// bookingData.ts

export type TimePeriod = {
  start: string; // format: "HH:mm", e.g., "18:00"
  end: string; // format: "HH:mm", e.g., "21:00"
};

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
  total: {
    bookings: number;
    revenue: number;
  };
}

export interface BookingMonthData {
  weeks: WeekBooking[];
  total: {
    bookings: number;
    revenue: number;
  };
  //   timeSlotPopularity: { name: TimePeriod; value: number }[];
  //   courtUtilization: { court: string; utilization: number }[];
  customerSegmentation: { name: string; value: number }[];
  packagePopularity: { name: string; value: number }[];
}

export interface AllBookingData {
  [month: string]: BookingMonthData;
}

//  Calculate the Time Slot Popularity
export const calculateTimeSlotPopularity = (monthData: BookingMonthData) => {
  const timeSlotCount: Record<string, number> = {};

  monthData.weeks.forEach((week) => {
    week.days.forEach((day) => {
      day.bookings.forEach((booking) => {
        const { start, end } = booking.timePeriod;
        const timeKey = `${start}-${end}`;

        timeSlotCount[timeKey] = (timeSlotCount[timeKey] || 0) + 1;
      });
    });
  });

  // Convert to required format
  const popularityArray = Object.entries(timeSlotCount).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  return popularityArray;
};

// Calculate the Court Utilization
export const calculateCourtUtilization = (monthData: BookingMonthData) => {
  const courtCount: Record<string, number> = {};

  // Count bookings per court
  monthData.weeks.forEach((week) => {
    week.days.forEach((day) => {
      day.bookings.forEach((booking) => {
        const court = booking.court;
        courtCount[court] = (courtCount[court] || 0) + 1;
      });
    });
  });

  const maxBookings = Math.max(...Object.values(courtCount));

  // Normalize to utilization percentage
  const utilizationArray = Object.entries(courtCount).map(([court, count]) => ({
    court,
    utilization: Math.round((count / maxBookings) * 100),
  }));

  return utilizationArray;
};

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
              {
                customerName: "Arjun",
                timePeriod: {
                  start: "01:00",
                  end: "02:00",
                },
                court: "Court 1",
                price: 1000,
              },
              {
                customerName: "Neha",
                timePeriod: {
                  start: "2:00",
                  end: "3:00",
                },
                court: "Court 2",
                price: 2000,
              },
              {
                customerName: "Ravi",
                timePeriod: {
                  start: "3:00",
                  end: "4:00",
                },
                court: "Court 3",
                price: 2000,
              },
            ],
            revenue: 5000,
          },
          {
            date: "2025-06-02",
            day: "Mon",
            bookings: [
              {
                customerName: "Priya",
                timePeriod: {
                  start: "04:00",
                  end: "05:00",
                },
                court: "Court 1",
                price: 3000,
              },
              {
                customerName: "Karan",
                timePeriod: {
                  start: "05:00",
                  end: "06:00",
                },
                court: "Court 2",
                price: 3000,
              },
            ],
            revenue: 6000,
          },
          {
            date: "2025-06-03",
            day: "Tue",
            bookings: [
              {
                customerName: "Ritu",
                timePeriod: {
                  start: "06:00",
                  end: "07:00",
                },
                court: "Court 1",
                price: 4000,
              },
            ],
            revenue: 4000,
          },
          {
            date: "2025-06-04",
            day: "Wed",
            bookings: [
              {
                customerName: "Deepak",
                timePeriod: {
                  start: "07:00",
                  end: "08:00",
                },
                court: "Court 3",
                price: 2500,
              },
              {
                customerName: "Anita",
                timePeriod: {
                  start: "08:00",
                  end: "09:00",
                },
                court: "Court 1",
                price: 3000,
              },
              {
                customerName: "Raghav",
                timePeriod: {
                  start: "09:00",
                  end: "10:00",
                },
                court: "Court 2",
                price: 2000,
              },
            ],
            revenue: 7500,
          },
          {
            date: "2025-06-05",
            day: "Thu",
            bookings: [
              {
                customerName: "Simran",
                timePeriod: {
                  start: "10:00",
                  end: "11:00",
                },
                court: "Court 1",
                price: 2000,
              },
              {
                customerName: "Yash",
                timePeriod: {
                  start: "11:00",
                  end: "12:00",
                },
                court: "Court 2",
                price: 3000,
              },
            ],
            revenue: 5000,
          },
          {
            date: "2025-06-06",
            day: "Fri",
            bookings: [
              {
                customerName: "Meena",
                timePeriod: {
                  start: "12:00",
                  end: "13:00",
                },
                court: "Court 4",
                price: 4500,
              },
              {
                customerName: "Vikram",
                timePeriod: {
                  start: "13:00",
                  end: "14:00",
                },
                court: "Court 3",
                price: 4500,
              },
            ],
            revenue: 9000,
          },
          {
            date: "2025-06-07",
            day: "Sat",
            bookings: [
              {
                customerName: "Amit",
                timePeriod: {
                  start: "14:00",
                  end: "15:00",
                },
                court: "Court 1",
                price: 3000,
              },
              {
                customerName: "Sita",
                timePeriod: {
                  start: "15:00",
                  end: "16:00",
                },
                court: "Court 2",
                price: 4000,
              },
              {
                customerName: "Kunal",
                timePeriod: {
                  start: "16:00",
                  end: "17:00",
                },
                court: "Court 5",
                price: 5000,
              },
            ],
            revenue: 12000,
          },
        ],
        total: {
          bookings: 16,
          revenue: 48500,
        },
      },
      {
        week: 2,
        days: [
          {
            date: "2025-06-08",
            day: "Sun",
            bookings: [
              {
                customerName: "Tarun",
                timePeriod: {
                  start: "17:00",
                  end: "18:00",
                },
                court: "Court 2",
                price: 2000,
              },
              {
                customerName: "Jaya",
                timePeriod: {
                  start: "06:00",
                  end: "09:00",
                },
                court: "Court 1",
                price: 2500,
              },
            ],
            revenue: 4500,
          },
          {
            date: "2025-06-09",
            day: "Mon",
            bookings: [
              {
                customerName: "Mohit",
                timePeriod: {
                  start: "18:00",
                  end: "19:00",
                },
                court: "Court 3",
                price: 3500,
              },
              {
                customerName: "Sneha",
                timePeriod: {
                  start: "19:00",
                  end: "20:00",
                },
                court: "Court 4",
                price: 1500,
              },
            ],
            revenue: 5000,
          },
          {
            date: "2025-06-10",
            day: "Tue",
            bookings: [
              {
                customerName: "Rohit",
                timePeriod: {
                  start: "20:00",
                  end: "21:00",
                },
                court: "Court 1",
                price: 3500,
              },
            ],
            revenue: 3500,
          },
          {
            date: "2025-06-11",
            day: "Wed",
            bookings: [
              {
                customerName: "Ayesha",
                timePeriod: {
                  start: "21:00",
                  end: "22:00",
                },
                court: "Court 2",
                price: 4000,
              },
              {
                customerName: "Nikhil",
                timePeriod: {
                  start: "22:00",
                  end: "23:00",
                },
                court: "Court 5",
                price: 3500,
              },
            ],
            revenue: 7500,
          },
          {
            date: "2025-06-12",
            day: "Thu",
            bookings: [
              {
                customerName: "Gaurav",
                timePeriod: {
                  start: "23:00",
                  end: "24:00",
                },
                court: "Court 2",
                price: 2500,
              },
              {
                customerName: "Megha",
                timePeriod: {
                  start: "06:00",
                  end: "09:00",
                },
                court: "Court 3",
                price: 2500,
              },
            ],
            revenue: 5000,
          },
          {
            date: "2025-06-13",
            day: "Fri",
            bookings: [
              {
                customerName: "Tanvi",
                timePeriod: {
                  start: "06:00",
                  end: "09:00",
                },
                court: "Court 1",
                price: 4500,
              },
              {
                customerName: "Harsh",
                timePeriod: {
                  start: "06:00",
                  end: "09:00",
                },
                court: "Court 2",
                price: 4500,
              },
            ],
            revenue: 9000,
          },
          {
            date: "2025-06-14",
            day: "Sat",
            bookings: [
              {
                customerName: "Rhea",
                timePeriod: {
                  start: "06:00",
                  end: "09:00",
                },
                court: "Court 1",
                price: 3000,
              },
              {
                customerName: "Aryan",
                timePeriod: {
                  start: "06:00",
                  end: "09:00",
                },
                court: "Court 3",
                price: 4000,
              },
              {
                customerName: "Pooja",
                timePeriod: {
                  start: "06:00",
                  end: "09:00",
                },
                court: "Court 4",
                price: 5000,
              },
            ],
            revenue: 14000,
          },
        ],
        total: {
          bookings: 14,
          revenue: 48500,
        },
      },
      {
        week: 3,
        days: [
          {
            date: "2025-06-15",
            day: "Sun",
            bookings: [
              {
                customerName: "Tarun",
                timePeriod: {
                  start: "06:00",
                  end: "09:00",
                },
                court: "Court 2",
                price: 2000,
              },
              {
                customerName: "Jaya",
                timePeriod: {
                  start: "06:00",
                  end: "09:00",
                },
                court: "Court 1",
                price: 2500,
              },
            ],
            revenue: 4500,
          },
          {
            date: "2025-06-16",
            day: "Sun",
            bookings: [
              {
                customerName: "Tarun",
                timePeriod: {
                  start: "06:00",
                  end: "09:00",
                },
                court: "Court 2",
                price: 2000,
              },
              {
                customerName: "Jaya",
                timePeriod: {
                  start: "06:00",
                  end: "09:00",
                },
                court: "Court 1",
                price: 2500,
              },
            ],
            revenue: 4500,
          },
        ], 
        total: {
          bookings: 4,
          revenue: 1000,
        },
      },
    ],
    total: {
      bookings: 32,
      revenue: 101500,
    },
    // timeSlotPopularity: [
    //   { name: "6AM-9AM", value: 6 },
    //   { name: "9AM-12PM", value: 3 },
    //   { name: "12PM-3PM", value: 2 },
    //   { name: "3PM-6PM", value: 3 },
    //   { name: "6PM-9PM", value: 9 },
    //   { name: "9PM-12AM", value: 7 },
    // ],
    // courtUtilization: [
    //   { court: "Court 1", utilization: 90 },
    //   { court: "Court 2", utilization: 80 },
    //   { court: "Court 3", utilization: 85 },
    //   { court: "Court 4", utilization: 70 },
    //   { court: "Court 5", utilization: 60 },
    // ],
    customerSegmentation: [
      { name: "Regular", value: 60 },
      { name: "Occasional", value: 25 },
      { name: "New", value: 15 },
    ],
    packagePopularity: [
      { name: "1 Hour", value: 20 },
      { name: "2 Hours", value: 35 },
      { name: "3+ Hours", value: 25 },
      { name: "Tournament", value: 20 },
    ],
  },
};

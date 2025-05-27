import { OrdersCalendar } from "@/types/orders/orders-calendar";
import moment from "moment";

// unused for now, time range is set in the calendar component (7am - 7pm)
export function getDailyTimeRange(ordersCalendar: OrdersCalendar) {
  let earliestHour: number = 23;
  let earliestMinute: number = 59;
  let latestHour: number = 0;
  let latestMinute: number = 0;

  ordersCalendar.data.forEach(({ events }) => {
    events.forEach((event) => {
      const startTime: Date = moment(event.start).toDate();
      const endTime: Date = moment(event.end).toDate();

      const startTimeHour: number = startTime.getHours();
      const startTimeMinutes: number = startTime.getMinutes();

      const endTimeHour: number = endTime.getHours();
      const endTimeMinutes: number = endTime.getMinutes();

      if (
        startTimeHour < earliestHour ||
        (startTimeHour === earliestHour && startTimeMinutes < earliestMinute)
      ) {
        earliestHour = startTimeHour;
        earliestMinute = startTimeMinutes;
      }

      if (
        endTimeHour > latestHour ||
        (endTimeHour === latestHour && endTimeMinutes > latestMinute)
      ) {
        latestHour = endTimeHour;
        latestMinute = endTimeMinutes;
      }
    });
  });

  const minTime: Date = moment().toDate();
  minTime.setHours(earliestHour, 0, 0, 0);

  // add 1 hour to the latest time found - for ui purposes
  const maxTime: Date = moment().toDate();
  maxTime.setHours(latestHour + 1, 0, 0, 0);

  return {
    minTime,
    maxTime,
  };
}

export function getJobsNum({
  ordersCalendar,
  type,
  beforeHour,
  afterHour,
}: {
  ordersCalendar: OrdersCalendar;
  type: "installation" | "inspection";
  beforeHour?: number;
  afterHour?: number;
}) {
  return ordersCalendar.data.reduce((acc, curr) => {
    return (
      acc +
      curr.events.filter((e) => {
        if (beforeHour) {
          return e.type === type && moment(e.start).hour() < beforeHour;
        }
        if (afterHour) {
          return e.type === type && moment(e.start).hour() > afterHour;
        }
        return e.type === type;
      }).length
    );
  }, 0);
}

export function getFormattedDate(date: string, includeYear?: boolean): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: includeYear ? "numeric" : undefined,
  }).format(moment(date).toDate());
}

export function getFormattedHour(date: string): string {
  if (!date) {
    return '';
  }

  // Add leading zero to single-digit hours if missing
  const formattedDate = date.replace(/T(\d):/, 'T0$1:');
  const momentDate = moment(formattedDate);
  if (!momentDate.isValid()) {
    return `${date}`;
  }

  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(momentDate.toDate());
}

export function getPreInspectionTitle(checkType: string): string {
  return (
    {
      damage: "DAMAGE CHECK",
      tireSizing: "TIRE SIZING CHECK",
      wheelLocks: "WHEEL LOCKS",
      odometer: "ODOMETER",
      treadDepths: "TREAD DEPTHS",
    }[checkType] ?? ""
  );
}

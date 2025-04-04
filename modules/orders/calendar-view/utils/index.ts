import { OrdersCalendar } from "@/types/orders/orders-calendar"

// unused for now, time range is set in the calendar component (7am - 7pm)
export function getDailyTimeRange(ordersCalendar: OrdersCalendar) {
  let earliestHour: number = 23
  let earliestMinute: number = 59
  let latestHour: number = 0
  let latestMinute: number = 0

  ordersCalendar.data.forEach(({ events }) => {
    events.forEach((event) => {
      const startTime: Date = new Date(event.start)
      const endTime: Date = new Date(event.end)

      const startTimeHour: number = startTime.getHours()
      const startTimeMinutes: number = startTime.getMinutes()

      const endTimeHour: number = endTime.getHours()
      const endTimeMinutes: number = endTime.getMinutes()

      if (
        startTimeHour < earliestHour ||
        (startTimeHour === earliestHour && startTimeMinutes < earliestMinute)
      ) {
        earliestHour = startTimeHour
        earliestMinute = startTimeMinutes
      }

      if (
        endTimeHour > latestHour ||
        (endTimeHour === latestHour && endTimeMinutes > latestMinute)
      ) {
        latestHour = endTimeHour
        latestMinute = endTimeMinutes
      }
    })
  })

  const minTime: Date = new Date()
  minTime.setHours(earliestHour, 0, 0, 0)

  // add 1 hour to the latest time found - for ui purposes
  const maxTime: Date = new Date()
  maxTime.setHours(latestHour + 1, 0, 0, 0)

  return {
    minTime,
    maxTime,
  }
}

export function getJobsNum({ ordersCalendar, type, beforeHour, afterHour }: { ordersCalendar: OrdersCalendar, type: "installation" | "inspection", beforeHour?: number, afterHour?: number }) {
  return ordersCalendar.data.reduce((acc, curr) => {
    return acc + curr.events.filter((e) => {
      if (beforeHour) {
        return e.type === type && new Date(e.start).getHours() < beforeHour
      }
      if (afterHour) {
        return e.type === type && new Date(e.start).getHours() > afterHour
      }
      return e.type === type
    }).length
  }, 0)
}

export function getFormattedDate(date: string, includeYear?: boolean): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: includeYear ? "numeric" : undefined,
  }).format(new Date(date))
}

export function getFormattedHour(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true
  }).format(new Date(date))
}

export function getPreInspectionTitle(checkType: string): string {
  return {
    damage: "DAMAGE CHECK",
    tireSizing: "TIRE SIZING CHECK",
    wheelLocks: "WHEEL LOCKS",
    odometer: "ODOMETER",
    treadDepths: "TREAD DEPTHS"
  }[checkType] ?? ""
}
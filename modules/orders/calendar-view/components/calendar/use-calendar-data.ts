import { OrdersCalendar } from "@/types/orders/orders-calendar";
import { useMemo } from "react";

interface UseCalendarDataInterface {
  ordersCalendar: OrdersCalendar
}

export function useCalendarData({ ordersCalendar }: UseCalendarDataInterface) {
  const events = useMemo(() => {
    return ordersCalendar.data.flatMap(({ events, technician }) =>
      events.map((event) => ({
        id: event.id,
        title: event.title,
        start: new Date(event.start),
        end: new Date(event.end),
        type: event.type,
        resourceId: technician.id,
        originalEvent: event,
        technician,
      })),
    )
  }, [ordersCalendar])

  const resources = useMemo(() => {
    return ordersCalendar.data.map(({ technician, events }) => ({
      id: technician.id ?? "",
      title: technician.name ?? "",
      stats: {
        installations: events.filter((e) => e.type === "installation").length,
        inspections: events.filter((e) => e.type === "inspection").length,
      },
    }))
  }, [ordersCalendar])

  return {
    events,
    resources,
  }
}
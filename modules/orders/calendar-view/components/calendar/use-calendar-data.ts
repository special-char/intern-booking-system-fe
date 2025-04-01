import { OrdersCalendar } from "@/types/orders/orders-calendar";
import { useMemo } from "react";

interface UseCalendarDataInterface {
  ordersCalendar: OrdersCalendar
}

export function useCalendarData({ ordersCalendar }: UseCalendarDataInterface) {
  const events = useMemo(() => {
    return ordersCalendar.data.flatMap(({ events, technician }) =>
      events.map((event) => ({
        createdAt: event.createdAt,
        customer: event.customer,
        end: new Date(event.end),
        id: event.id,
        invoice: event.invoice,
        location: event.location,
        notes: event.notes,
        originalEvent: event,
        resourceId: technician.id,
        start: new Date(event.start),
        technician,
        title: event.title,
        type: event.type,
        vehicleDetail: event.vehicleDetail,
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
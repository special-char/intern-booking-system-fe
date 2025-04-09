import { OrdersCalendar } from "@/types/orders/orders-calendar";
import moment from "moment";
import { useMemo } from "react";

interface UseCalendarDataInterface {
  ordersCalendar: OrdersCalendar;
}

export function useAppointmentsData({
  ordersCalendar,
}: UseCalendarDataInterface) {
  const events = useMemo(() => {
    return ordersCalendar.data.flatMap(({ events, technician }) =>
      events.map((event) => ({
        createdAt: event.createdAt,
        customer: event.customer,
        end: moment(event.end).toDate(),
        id: event.id,
        invoice: event.invoice,
        location: event.location,
        notes: event.notes,
        originalEvent: event,
        preInspection: event.preInspection,
        resourceId: technician.id,
        start: moment(event.start).toDate(),
        status: event.status,
        subTitle: event.subTitle,
        technician,
        title: event.title,
        type: event.type,
        vehicleDetail: event.vehicleDetail,
        position: event.position,
      }))
    );
  }, [ordersCalendar]);

  const resources = useMemo(() => {
    return ordersCalendar.data.map(({ technician, events }) => ({
      id: technician.id ?? "",
      title: technician.name ?? "",
      stats: {
        installations: events.filter((e) => e.type === "installation").length,
        inspections: events.filter((e) => e.type === "inspection").length,
      },
    }));
  }, [ordersCalendar]);

  return {
    events,
    resources,
  };
}

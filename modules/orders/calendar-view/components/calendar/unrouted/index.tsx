import { Views } from "react-big-calendar";
import type { OrdersCalendar } from "@/types/orders/orders-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar } from "@/components/common/calendar";
import { MaxHeightWrapper } from "@/components/common/max-height-wrapper";
import { Event } from "../components/event";
import { TechnicianHeader } from "../components/technician-header";
import { HourSlot } from "../components/hour-slot";
import { UnroutedOverlay } from "../components/unrouted-overlay";
import "./style.css";
import { useAppointmentsData } from "@/modules/orders/common/hooks/use-appointments-data";
import moment from "moment";

interface OrdersUnroutedCalendarProps {
  ordersCalendar: OrdersCalendar;
}

export function OrdersUnroutedCalendar({
  ordersCalendar,
}: OrdersUnroutedCalendarProps) {
  const { events, resources } = useAppointmentsData({ ordersCalendar });

  const minDate: Date = moment(`${ordersCalendar.date}T07:00:00`).toDate();
  const maxDate: Date = moment(`${ordersCalendar.date}T20:00:00`).toDate();

  return (
    <MaxHeightWrapper className="unrouted overflow-y-scroll relative">
      <Calendar
        events={events}
        resources={resources}
        resourceIdAccessor="id"
        resourceTitleAccessor="title"
        defaultView={Views.DAY}
        views={[Views.DAY]}
        step={60}
        timeslots={1}
        min={minDate}
        max={maxDate}
        components={{
          event: Event,
          resourceHeader: TechnicianHeader,
          //eslint-disable-next-line
          timeSlotWrapper: (props: any) => (
            <HourSlot {...props} isCurrentHour={false} />
          ),
        }}
        formats={{
          timeGutterFormat: (date, culture, localizer) =>
            localizer!.format(date, "h A", culture),
        }}
      />
      <UnroutedOverlay ordersCalendar={ordersCalendar} />
    </MaxHeightWrapper>
  );
}

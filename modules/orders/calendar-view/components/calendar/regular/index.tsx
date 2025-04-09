import { Views } from "react-big-calendar";
import type { OrdersCalendar } from "@/types/orders/orders-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar } from "@/components/common/calendar";
import { MaxHeightWrapper } from "@/components/common/max-height-wrapper";
import { TechnicianHeader } from "../components/technician-header";
import { HourSlot } from "../components/hour-slot";
import { Event } from "../components/event";
import { AppointmentDetails } from "@/modules/orders/common/components/appointment-details";
import { useAppointmentsData } from "@/modules/orders/common/hooks/use-appointments-data";
import { useAppointmentDetails } from "@/modules/orders/common/hooks/use-appointment-details";
import moment from "moment";

interface OrdersCalendarProps {
  ordersCalendar: OrdersCalendar;
}

//TODO: when api is ready: get rid of mocks, ordersCalendarDataState and its handlers; add skeletons for appointment details if needed (details from dedicated endpoint instead of ordersCalendar)
export function OrdersRegularCalendar({ ordersCalendar }: OrdersCalendarProps) {
  const {
    ordersCalendarData,
    appointmentDetails,
    selectedEventId,
    setSelectedEventId,
    onClose,
    onUpdate,
    updateEvent,
  } = useAppointmentDetails(ordersCalendar);

  const { events, resources } = useAppointmentsData({
    ordersCalendar: ordersCalendarData,
  });

  const minDate: Date = moment(`${ordersCalendarData.date}T07:00:00`).toDate()
  const maxDate: Date = moment(`${ordersCalendarData.date}T20:00:00`).toDate()

  return (
    <>
      <MaxHeightWrapper className="overflow-y-scroll relative">
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
          onSelectEvent={(e) => {
            if (
              ["lunch", "idle"].some((type) => type === e.originalEvent.type)
            ) {
              return;
            }
            setSelectedEventId(e.originalEvent.id);
          }}
          components={{
            event: Event,
            resourceHeader: TechnicianHeader,
            //eslint-disable-next-line
            timeSlotWrapper: (props: any) => <HourSlot {...props} />,
          }}
          formats={{
            timeGutterFormat: (date, culture, localizer) =>
              localizer!.format(date, "h A", culture),
          }}
          eventPropGetter={(event) => {
            if (event.type === "lunch") {
              return {
                className: "event-lunch",
              };
            }
            if (event.type === "idle") {
              return {
                className: "event-idle",
              };
            }
            return {};
          }}
          timeIndicatorInterval={60 * 1000}
        />
      </MaxHeightWrapper>
      {appointmentDetails && (
        <AppointmentDetails
          isOpen={!!selectedEventId}
          onClose={onClose}
          data={appointmentDetails}
          onAppointmentChange={onUpdate}
          onEventChange={updateEvent}
        />
      )}
    </>
  );
}

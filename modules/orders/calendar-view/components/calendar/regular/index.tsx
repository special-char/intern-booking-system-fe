import { Views } from "react-big-calendar"
import type { OrdersCalendar } from "@/types/orders/orders-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Calendar } from "@/components/common/calendar"
import { MaxHeightWrapper } from "@/components/common/max-height-wrapper"
import { TechnicianHeader } from "../components/technician-header"
import { HourSlot } from "../components/hour-slot"
import { useCalendarData } from "../use-calendar-data"
import { useEffect, useState } from "react"
import { Event } from "../components/event"
import { Technician } from "@/types/technicians"
import { Event as EventType } from "@/types/orders/event"
import { AppointmentDetails, AppointmentDetailsData } from "@/modules/orders/common/components/appointment-details"


interface OrdersCalendarProps {
  ordersCalendar: OrdersCalendar
}

//TODO: when api is ready: get rid of mocks, ordersCalendarDataState and its handlers; add skeletons for appointment details if needed (details from dedicated endpoint instead of ordersCalendar)
export function OrdersRegularCalendar({ ordersCalendar }: OrdersCalendarProps) {
  const [ordersCalendarData, setOrdersCalendarData] = useState<OrdersCalendar>(ordersCalendar)

  const [selectedEventId, setSelectedEventId] = useState<string>("")
  const [appointmentDetails, setAppointmentDetails] = useState<AppointmentDetailsData | null>(null)

  const { events, resources } = useCalendarData({ ordersCalendar: ordersCalendarData })


  useEffect(() => {
    handleAppointmentDetailsChange()
  }, [selectedEventId, ordersCalendarData])

  function handleAppointmentChange(appointmentDetails: AppointmentDetailsData): void {
    setOrdersCalendarData((prevData) => {
      const newData = { ...prevData };

      const newDataItem = newData.data.find(
        (d) => d.events.some(({ id }) => id === appointmentDetails.event.id)
      );

      if (newDataItem) {
        newDataItem.events = newDataItem.events.filter(
          ({ id }) => id !== appointmentDetails.event.id
        );
      }

      //only update events for the current date (mocking purposes)
      if (appointmentDetails.date === newData.date) {
        const targetTechnician = newData.data.find(
          ({ technician }) => technician.id === appointmentDetails.technician.id
        );

        if (targetTechnician) {
          targetTechnician.events.push(appointmentDetails.event);
        }
      }
      return newData;
    });
  }

  function handleEventChange(event: EventType): void {
    setOrdersCalendarData((prevData) => {
      return {
        ...prevData,
        data: prevData.data.map((d) => {
          return {
            ...d,
            events: d.events.map((e) => e.id === event.id ? event : e)
          }
        })
      }
    })
  }

  function handleAppointmentDetailsChange(): void {
    if (!selectedEventId) {
      return
    }
    const appointmentDetails: AppointmentDetailsData | null = getAppointmentDetailsByEventId(selectedEventId)
    if (!appointmentDetails) {
      return handleCloseDrawer()
    }
    setAppointmentDetails(appointmentDetails)
  }

  function getAppointmentDetailsByEventId(id: string): AppointmentDetailsData | null {
    const date: string = ordersCalendarData.date
    const technicianWithEvents = ordersCalendarData.data.find(
      (d) => d.events.some((d) => d.id === id)
    )
    const technician: Partial<Technician> | undefined = technicianWithEvents?.technician
    const event: EventType | undefined = technicianWithEvents?.events.find((e) => e.id === id)

    if (technician && event) {
      return {
        date,
        technician,
        event
      }
    }
    return null
  }

  function handleCloseDrawer(): void {
    setSelectedEventId("")
    setTimeout(() => {
      setAppointmentDetails(null)
    }, 300);
  }

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
          min={new Date(`${ordersCalendarData.date}T07:00:00`)}
          max={new Date(`${ordersCalendarData.date}T20:00:00`)}
          onSelectEvent={(e) => {
            if (["lunch", "idle"].some(type => type === e.originalEvent.type)) {
              return
            }
            setSelectedEventId(e.originalEvent.id)
          }}
          components={{
            event: Event,
            resourceHeader: TechnicianHeader,
            //eslint-disable-next-line
            timeSlotWrapper: (props: any) => <HourSlot {...props} />,
          }}
          formats={{
            timeGutterFormat: (date, culture, localizer) => localizer!.format(date, "h A", culture),
          }}
          eventPropGetter={(event) => {
            if (event.type === "lunch") {
              return {
                className: "event-lunch",
              }
            }
            if (event.type === "idle") {
              return {
                className: "event-idle",
              }
            }
            return {}
          }}
          timeIndicatorInterval={60 * 1000}
        />
      </MaxHeightWrapper>
      {appointmentDetails && (
        <AppointmentDetails
          isOpen={!!selectedEventId}
          onClose={handleCloseDrawer}
          data={appointmentDetails}
          onAppointmentChange={handleAppointmentChange}
          onEventChange={handleEventChange}
        />
      )}
    </>
  )
}


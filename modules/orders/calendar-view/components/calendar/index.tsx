"use client"

import { useMemo } from "react"
import { Views } from "react-big-calendar"
import type { OrdersCalendar as OrdersCalendarType } from "@/types/orders/orders-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Event } from "./event"
import { TechnicianHeader } from "./technician-header"
import { HourSlot } from "./hour-slot"
import { Calendar } from "@/components/common/calendar"
import { MaxHeightWrapper } from "@/components/common/max-height-wrapper"

interface OrdersCalendarProps {
  ordersCalendar: OrdersCalendarType
}

export function OrdersCalendar({ ordersCalendar }: OrdersCalendarProps) {
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

  return (
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
        min={new Date(`${ordersCalendar.date}T07:00:00`)}
        max={new Date(`${ordersCalendar.date}T20:00:00`)}
        onSelectEvent={(e) => console.log(e)}
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
  )
}


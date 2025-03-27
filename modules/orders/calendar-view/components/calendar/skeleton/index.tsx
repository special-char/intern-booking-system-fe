"use client"

import { Views } from "react-big-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Event } from "../event"
import { TechnicianHeader } from "../technician-header"
import { HourSlot } from "../hour-slot"
import { Calendar } from "@/components/common/calendar"
import { OrdersCalendar } from "@/types/orders/orders-calendar"
import { useMemo } from "react"
import "./style.css"

const LOADING_ORDERS_CALENDAR: OrdersCalendar = {
  date: new Date().toISOString().split('T')[0],
  data: [
    {
      technician: {
        id: "1",
        name: "",
      },
      events: [
        {
          id: "1",
          start: `${new Date().toISOString().split('T')[0]}T08:00:00`,
          end: `${new Date().toISOString().split('T')[0]}T09:00:00`,
          title: "",
          type: "load",
        },
      ],
    },
    {
      technician: {
        id: "2",
        name: "",
      },
      events: [
        {
          id: "2",
          start: `${new Date().toISOString().split('T')[0]}T08:00:00`,
          end: `${new Date().toISOString().split('T')[0]}T09:00:00`,
          title: "",
          type: "load",
        },
      ],
    },
    {
      technician: {
        id: "3",
        name: "",
      },
      events: [
        {
          id: "3",
          start: `${new Date().toISOString().split('T')[0]}T08:00:00`,
          end: `${new Date().toISOString().split('T')[0]}T09:00:00`,
          title: "",
          type: "load",
        },
      ],
    },
    {
      technician: {
        id: "4",
        name: "",
      },
      events: [
        {
          id: "4",
          start: `${new Date().toISOString().split('T')[0]}T08:00:00`,
          end: `${new Date().toISOString().split('T')[0]}T09:00:00`,
          title: "",
          type: "load",
        },
      ],
    },
  ]
}

export function OrdersCalendarSkeleton() {
  const events = useMemo(() => {
    return LOADING_ORDERS_CALENDAR.data.flatMap(({ events, technician }) =>
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
  }, [LOADING_ORDERS_CALENDAR])

  const resources = useMemo(() => {
    return LOADING_ORDERS_CALENDAR.data.map(({ technician, events }) => ({
      id: technician.id ?? "",
      title: technician.name ?? "",
      stats: {
        installations: events.filter((e) => e.type === "installation").length,
        inspections: events.filter((e) => e.type === "inspection").length,
      },
    }))
  }, [LOADING_ORDERS_CALENDAR])

  return (
    <div className="skeleton max-h-[50vh] overflow-y-scroll">
      <Calendar
        events={events}
        resources={resources}
        defaultView={Views.DAY}
        views={[Views.DAY]}
        step={60}
        timeslots={1}
        min={new Date(`${new Date().toISOString().split('T')[0]}T07:00:00`)}
        max={new Date(`${new Date().toISOString().split('T')[0]}T12:00:00`)}
        components={{
          event: (props) => <Event {...props} isLoading />,
          resourceHeader: (props) => <TechnicianHeader {...props} isLoading />,
          //eslint-disable-next-line
          timeSlotWrapper: (props: any) => <HourSlot {...props} isLoading />,
        }}
        formats={{
          timeGutterFormat: (date, culture, localizer) => localizer!.format(date, "h A", culture),
        }}
      />
    </div>
  )
}


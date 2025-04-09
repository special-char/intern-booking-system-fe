"use client";

import { Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Event, EventProps } from "../components/event";
import { TechnicianHeader } from "../components/technician-header";
import { HourSlot } from "../components/hour-slot";
import { Calendar } from "@/components/common/calendar";
import { OrdersCalendar } from "@/types/orders/orders-calendar";
import { useMemo } from "react";
import "./style.css";
import { getLocalDateString } from "@/utils/date";
import moment from "moment";

const LOADING_ORDERS_CALENDAR: OrdersCalendar = {
  date: getLocalDateString(),
  isRouted: true,
  data: [
    {
      technician: {
        id: "1",
        name: "",
      },
      events: [
        {
          id: "1",
          start: `${getLocalDateString()}T08:00:00`,
          end: `${getLocalDateString()}T09:00:00`,
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
          start: `${getLocalDateString()}T08:00:00`,
          end: `${getLocalDateString()}T09:00:00`,
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
          start: `${getLocalDateString()}T08:00:00`,
          end: `${getLocalDateString()}T09:00:00`,
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
          start: `${getLocalDateString()}T08:00:00`,
          end: `${getLocalDateString()}T09:00:00`,
          title: "",
          type: "load",
        },
      ],
    },
  ],
} as OrdersCalendar;

export function OrdersCalendarSkeleton() {
  const events = useMemo(() => {
    return LOADING_ORDERS_CALENDAR.data.flatMap(({ events, technician }) =>
      events.map((event) => ({
        id: event.id,
        title: event.title,
        start: moment(event.start).toDate(),
        end: moment(event.end).toDate(),
        type: event.type,
        resourceId: technician.id,
        originalEvent: event,
        technician,
      }))
    )
  }, [LOADING_ORDERS_CALENDAR]);

  const resources = useMemo(() => {
    return LOADING_ORDERS_CALENDAR.data.map(({ technician, events }) => ({
      id: technician.id ?? "",
      title: technician.name ?? "",
      stats: {
        installations: events.filter((e) => e.type === "installation").length,
        inspections: events.filter((e) => e.type === "inspection").length,
      },
    }));
  }, [LOADING_ORDERS_CALENDAR]);

  const minDate: Date = moment(`${getLocalDateString()}T07:00:00`).toDate();
  const maxDate: Date = moment(`${getLocalDateString()}T12:00:00`).toDate();

  return (
    <div className="skeleton max-h-[50vh] overflow-y-scroll">
      <Calendar
        events={events}
        resources={resources}
        defaultView={Views.DAY}
        views={[Views.DAY]}
        step={60}
        timeslots={1}
        min={minDate}
        max={maxDate}
        components={{
          event: (props) => (
            <Event {...(props as unknown as EventProps)} isLoading />
          ),
          resourceHeader: (props) => <TechnicianHeader {...props} isLoading />,
          //eslint-disable-next-line
          timeSlotWrapper: (props: any) => <HourSlot {...props} isLoading />,
        }}
        formats={{
          timeGutterFormat: (date, culture, localizer) =>
            localizer!.format(date, "h A", culture),
        }}
      />
    </div>
  );
}

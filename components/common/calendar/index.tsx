"use client";

import { useState, useEffect, ComponentType } from "react";
import {
  Calendar as RBCalendar,
  CalendarProps as RBCalendarProps,
  momentLocalizer,
} from "react-big-calendar";
import moment from "moment";
import "./style.css";

const localizer = momentLocalizer(moment);

interface CalendarProps<TEvent extends object, TResource extends object>
  extends Omit<RBCalendarProps<TEvent, TResource>, "localizer"> {
  timeIndicatorInterval?: number;
}

export function Calendar<TEvent extends object, TResource extends object>({
  timeIndicatorInterval,
  ...props
}: CalendarProps<TEvent, TResource>) {
  const todayDate: Date = moment().toDate();
  const [currentTime, setCurrentTime] = useState(todayDate);

  useEffect(() => {
    if (!timeIndicatorInterval && timeIndicatorInterval !== 0) {
      return;
    }
    const interval: NodeJS.Timeout = setInterval(() => {
      setCurrentTime(todayDate);
    }, timeIndicatorInterval);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid">
      <RBCalendar
        {...props}
        localizer={localizer}
        getNow={() => currentTime}
        components={{
          ...props.components,
          timeSlotWrapper: (wrapperProps: any) => {
            const Component: ComponentType | undefined =
              props.components?.timeSlotWrapper;
            if (!Component) {
              return null;
            }
            const isCurrentHour: boolean = moment(currentTime).isSame(
              wrapperProps.value,
              "hour"
            );
            return (
              <Component {...wrapperProps} isCurrentHour={isCurrentHour} />
            );
          },
        }}
      />
    </div>
  );
}

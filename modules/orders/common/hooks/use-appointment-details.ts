import { useState, useEffect } from "react";
import { AppointmentDetailsData } from "@/modules/orders/common/components/appointment-details";
import { OrdersCalendar } from "@/types/orders/orders-calendar";
import { Event as EventType } from "@/types/orders/event";
import { Technician } from "@/modules/vans-techs/technicians/components/technicians-table/columns";

export function useAppointmentDetails(initialCalendarData: OrdersCalendar) {
  const [ordersCalendarData, setOrdersCalendarData] =
    useState<OrdersCalendar>(initialCalendarData);
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [appointmentDetails, setAppointmentDetails] =
    useState<AppointmentDetailsData | null>(null);

  useEffect(() => {
    refreshAppointmentDetails();
  }, [selectedEventId, ordersCalendarData]);

  function refreshAppointmentDetails(): void {
    if (!selectedEventId) return;
    const details = getAppointmentDetails(selectedEventId);
    if (!details) return onClose();
    setAppointmentDetails(details);
  }

  function getAppointmentDetails(id: string): AppointmentDetailsData | null {
    const date = ordersCalendarData.date;
    const technicianWithEvents = ordersCalendarData.data.find((d) =>
      d.events.some((event) => event.id === id)
    );
    const technician: Partial<Technician> | undefined =
      technicianWithEvents?.technician;
    const event: EventType | undefined = technicianWithEvents?.events.find(
      (e) => e.id === id
    );

    if (technician && event) {
      return {
        date,
        technician,
        event,
      };
    }
    return null;
  }

  function onClose(): void {
    setSelectedEventId("");
    setTimeout(() => {
      setAppointmentDetails(null);
    }, 300);
  }

  function onUpdate(updatedDetails: AppointmentDetailsData): void {
    setOrdersCalendarData((prevData) => {
      const newData = { ...prevData };
      const technicianData = newData.data.find((d) =>
        d.events.some(({ id }) => id === updatedDetails.event.id)
      );

      if (technicianData) {
        technicianData.events = technicianData.events.filter(
          ({ id }) => id !== updatedDetails.event.id
        );
      }

      if (updatedDetails.date === newData.date) {
        const targetTechnician = newData.data.find(
          ({ technician }) => technician.id === updatedDetails.technician.id
        );
        if (targetTechnician) {
          targetTechnician.events.push(updatedDetails.event);
        }
      }
      return newData;
    });
  }

  function updateEvent(updatedEvent: EventType): void {
    setOrdersCalendarData((prevData) => ({
      ...prevData,
      data: prevData.data.map((d) => ({
        ...d,
        events: d.events.map((e) =>
          e.id === updatedEvent.id ? updatedEvent : e
        ),
      })),
    }));
  }

  return {
    ordersCalendarData,
    appointmentDetails,
    selectedEventId,
    setSelectedEventId,
    refreshAppointmentDetails,
    getAppointmentDetails,
    onClose,
    onUpdate,
    updateEvent,
  };
}

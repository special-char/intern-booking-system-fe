import { Event } from "@/types/orders/event";
import { ActionCard } from "./common/action-card";

interface AppointmentDetailsNotesProps {
  notes: Event['notes']
}

export function AppointmentDetailsNotes({ notes }: AppointmentDetailsNotesProps) {
  return (
    <ActionCard
      title="NOTES"
      description={<p>{notes}</p>}
    />
  );
}
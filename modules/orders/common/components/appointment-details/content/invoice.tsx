import { Event } from "@/types/orders/event";
import { ActionCard } from "./common/action-card";

interface AppointmentDetailsInvoiceProps {
  invoice: Event['invoice']
}

export function AppointmentDetailsInvoice({ invoice }: AppointmentDetailsInvoiceProps) {
  return (
    <ActionCard
      title="INVOICE"
      description={<p>{`$${invoice.sum}`}</p>}
    />
  );
}
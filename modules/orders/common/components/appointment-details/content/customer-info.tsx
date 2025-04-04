import { Button } from "@/components/shadcn/button";
import { Event } from "@/types/orders/event";
import { MessageCircleMore, Phone } from "lucide-react";
import { AppointmentDetailsInfoWrapper } from "./common/info-wrapper";

interface AppointmentCustomerInfoProps {
  customer: Event['customer']
}

export function AppointmentCustomerInfo({ customer }: AppointmentCustomerInfoProps) {
  return (
    <AppointmentDetailsInfoWrapper>
      <div className="w-full">
        <p className="text-sm text-secondary">CUSTOMER</p>
        <p>{customer.name}</p>
      </div>
      <div className="w-full">
        <p className="text-sm text-secondary invisible">PLACEHOLDER</p>
        <div className="flex justify-between gap-2">
          <p>{customer.phone}</p>
          <div className="flex gap-1 -mr-2 -mt-1.5">
            <Button variant="ghost" size="icon">
              <MessageCircleMore />
            </Button>
            <Button variant="ghost" size="icon">
              <Phone />
            </Button>
          </div>
        </div>
      </div>
    </AppointmentDetailsInfoWrapper>
  );
}
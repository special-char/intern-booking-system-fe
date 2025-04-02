import { Button } from "@/components/shadcn/button";
import { Event } from "@/types/orders/event";
import { Navigation } from "lucide-react";
import { AppointmentDetailsInfoWrapper } from "./common/info-wrapper";

interface AppointmentDetailsLocationProps {
  location: Event['location']
}

export function AppointmentDetailsLocation({ location }: AppointmentDetailsLocationProps) {
  return (
    <AppointmentDetailsInfoWrapper>
      <div>
        <p className="text-sm text-secondary">LOCATION</p>
        <p>{`${location.street}, ${location.city} ${location.state} ${location.zipCode}`}</p>
      </div>
      <div className="flex mt-3 -mr-2">
        <Button variant="ghost" size="icon">
          <Navigation />
        </Button>
      </div>
    </AppointmentDetailsInfoWrapper>
  );
}
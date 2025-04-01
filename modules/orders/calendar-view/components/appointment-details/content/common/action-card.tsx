
import { ChevronRight, CircleSmall } from "lucide-react";
import { Button } from "@/components/shadcn/button";
import { AppointmentDetailsInfoWrapper } from "./info-wrapper";
import { ReactElement } from "react";

interface ActionCardProps {
  title: string;
  description: string | ReactElement;
  onClick?: () => void;
}

export function ActionCard({ title, description, onClick }: ActionCardProps) {
  return (
    <AppointmentDetailsInfoWrapper>
      <div className="flex flex-col w-full">
        <div className="flex justify-between">
          <div className="flex gap-1">
            <CircleSmall className="fill-gray-300 stroke-none min-w-5 min-h-5 -mt-[2px] -ml-1.5" />
            <p className="text-sm text-secondary">{title}</p>
          </div>
          <Button variant="ghost" size="icon" className="-mt-1" onClick={onClick}>
            <ChevronRight />
          </Button>
        </div>

        <div className="line-clamp-2 pl-5.5 pr-4">
          {description}
        </div>
      </div>
    </AppointmentDetailsInfoWrapper>
  );
}

import { ChevronRight } from "lucide-react";
import { Button } from "@/components/shadcn/button";
import { AppointmentDetailsInfoWrapper } from "./info-wrapper";
import { ReactElement } from "react";
import { cn } from "@/lib/utils";

interface ActionCardProps {
  title: string;
  description?: string | ReactElement;
  onClick?: () => void;
}

export function ActionCard({ title, description, onClick }: ActionCardProps) {
  return (
    <AppointmentDetailsInfoWrapper className={cn(!description && "min-h-0")}>
      <div className="flex flex-col w-full">
        <div className="flex justify-between relative">
          <div className="flex gap-3 max-w-[calc(100%-2.25rem)]">
            <div className="mt-1 rounded-full min-w-3 min-h-3 max-w-3 max-h-3 bg-gray-300"></div>
            <p className="text-sm text-secondary">{title}</p>
          </div>
          <Button variant="ghost" size="icon" className="absolute -right-2 -top-2" onClick={onClick}>
            <ChevronRight />
          </Button>
        </div>

        {description && (
          <div className="line-clamp-2 pl-6 pr-4">
            {description}
          </div>
        )}
      </div>
    </AppointmentDetailsInfoWrapper>
  );
}
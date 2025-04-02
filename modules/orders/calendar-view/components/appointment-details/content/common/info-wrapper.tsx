import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

interface AppointmentDetailsInfoWrapperProps {
  className?: string
}

export function AppointmentDetailsInfoWrapper({ children, className }: PropsWithChildren<AppointmentDetailsInfoWrapperProps>) {
  return (
    <div className={cn("flex gap-3 flex-row p-4 border-b justify-between min-h-21", className)}>
      {children}
    </div>
  );
}

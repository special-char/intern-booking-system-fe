import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

interface AppointmentDetailsSheetContentWrapperProps {
  className?: string
}

export function AppointmentDetailsSheetContentWrapper({ children, className }: PropsWithChildren<AppointmentDetailsSheetContentWrapperProps>) {
  return (
    <div className={cn("flex flex-col bg-white pl-4", className)}>
      {children}
    </div>
  );
}
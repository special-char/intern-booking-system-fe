import { PropsWithChildren } from "react";

export function AppointmentDetailsInfoWrapper({ children }: PropsWithChildren) {
  return (
    <div className="flex gap-3 flex-row py-4 border-b pl-4 pr-2 justify-between min-h-21">
      {children}
    </div>
  );
}

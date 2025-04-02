import { PropsWithChildren } from "react";

export function AppointmentDetailsSheetContentWrapper({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col bg-white pl-4">
      {children}
    </div>
  );
}
import {
  SheetHeader,
  SheetTitle,
} from "@/components/shadcn/sheet"
import { AppointmentDetailsHeader } from "../header"
import { AppointmentDetailsProps } from ".."
import { AppointmentDetailsContent } from "../content"

export function AppointmentDetailsSheet({ data, onAppointmentChange }: Pick<AppointmentDetailsProps, "data" | "onAppointmentChange">) {
  return (
    <div className="bg-purple-50">
      <SheetHeader className="ml-4 border-none">
        <SheetTitle className="flex justify-center items-center text-sm font-medium">
          APPOINTMENT DETAILS
        </SheetTitle>
        <AppointmentDetailsHeader
          data={data}
          onChange={onAppointmentChange}
        />
      </SheetHeader>

      <AppointmentDetailsContent data={data} />
    </div>
  )
}

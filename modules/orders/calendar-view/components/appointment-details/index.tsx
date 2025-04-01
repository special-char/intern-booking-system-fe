
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/shadcn/sheet"
import { Event } from "@/types/orders/event"
import { Technician } from "@/types/technicians"
import "./style.css"
import { AppointmentDetailsHeader } from "./header"
import { AppointmentDetailsContent } from "./content"

export interface AppointmentDetailsData {
  date: string
  technician: Partial<Technician>
  event: Event
}

interface AppointmentDetailsProps {
  data: AppointmentDetailsData
  onChange: (data: AppointmentDetailsData) => void
  isOpen: boolean
  onClose: () => void
}

export function AppointmentDetails({ isOpen, onClose, data, onChange }: AppointmentDetailsProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="bg-white sm:min-w-125 overflow-y-scroll gap-0">
        <SheetHeader className="border-none bg-purple-50">
          <SheetTitle className="flex justify-center items-center text-sm font-medium">
            APPOINTMENT DETAILS
          </SheetTitle>
          <AppointmentDetailsHeader
            data={data}
            onChange={onChange}
          />
        </SheetHeader>

        <AppointmentDetailsContent data={data} />
      </SheetContent>
    </Sheet>
  )
}

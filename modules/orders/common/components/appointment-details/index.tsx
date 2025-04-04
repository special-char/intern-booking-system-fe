
import {
  Sheet,
  SheetContent,
} from "@/components/shadcn/sheet"
import { Event } from "@/types/orders/event"
import { Technician } from "@/types/technicians"
import "./style.css"
import { AppointmentDetailsSheet } from "./sheets/appointment-details"
import { ScreenCarousel, ScreenCarouselScreen } from "@/components/common/screen-carousel"
import { VehicleDetailsSheet } from "./sheets/vehicle-details"
import { PreInspectionSheet } from "./sheets/pre-inspection"

export interface AppointmentDetailsData {
  date: string
  technician: Partial<Technician>
  event: Event
}

export interface AppointmentDetailsProps {
  data: AppointmentDetailsData
  onAppointmentChange: (data: AppointmentDetailsData) => void
  onEventChange: (event: Event) => void
  isOpen: boolean
  onClose: () => void
}

export function AppointmentDetails({ isOpen, onClose, data, onAppointmentChange, onEventChange }: AppointmentDetailsProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="bg-white sm:min-w-125 overflow-y-scroll gap-0">
        <ScreenCarousel>
          <ScreenCarouselScreen>
            <AppointmentDetailsSheet data={data} onAppointmentChange={onAppointmentChange} />
          </ScreenCarouselScreen>

          <ScreenCarouselScreen>
            <VehicleDetailsSheet data={data.event} />
          </ScreenCarouselScreen>

          <ScreenCarouselScreen>
            <PreInspectionSheet data={data.event} onEventChange={onEventChange} />
          </ScreenCarouselScreen>
        </ScreenCarousel>
      </SheetContent>
    </Sheet>
  )
}

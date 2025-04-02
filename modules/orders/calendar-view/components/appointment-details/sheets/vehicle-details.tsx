import {
  SheetHeader,
  SheetTitle,
} from "@/components/shadcn/sheet"
import { Event } from "@/types/orders/event"
import { Button } from "@/components/shadcn/button"
import { ChevronLeft } from "lucide-react"
import { ScreenCarouselTrigger } from "@/components/common/screen-carousel/trigger"
import { VehicleDetailsHeader } from "../vehicle-details/header"
import { VehicleDetailsContent } from "../vehicle-details/content"

export interface VehicleDetailsData {
  data: Event
}

export function VehicleDetailsSheet({ data }: VehicleDetailsData) {
  return (
    <div className="bg-purple-50">
      <SheetHeader className="ml-4 border-none">
        <div className="flex justify-center items-center relative">
          <SheetTitle className="text-sm font-medium">
            VEHICLE DETAILS
          </SheetTitle>
          <ScreenCarouselTrigger goToScreen={0} className="absolute -left-1">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="min-h-6 min-w-6 text-secondary" />
            </Button>
          </ScreenCarouselTrigger>
        </div>
        <VehicleDetailsHeader data={data} />
      </SheetHeader>

      <VehicleDetailsContent data={data} />
    </div>
  )
}

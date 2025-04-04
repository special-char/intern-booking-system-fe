import {
  SheetHeader,
  SheetTitle,
} from "@/components/shadcn/sheet"
import { Event } from "@/types/orders/event"
import { VehicleDetailsHeader } from "../vehicle-details/header"
import { VehicleDetailsContent } from "../vehicle-details/content"
import { BackButton } from "./common/back-button"

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
          <BackButton goToScreen={0} />
        </div>
        <VehicleDetailsHeader data={data} />
      </SheetHeader>

      <VehicleDetailsContent data={data} />
    </div>
  )
}

import { cn } from "@/lib/utils";
import { VehicleDetail } from "@/types/orders/vehicle-detail";
import Image from "next/image";
import { ReactElement } from "react";


interface CarDiagramProps {
  wheels: VehicleDetail['wheels']
}

export function CarDiagram({ wheels }: CarDiagramProps) {
  function renderWheels(): ReactElement[] {
    const wheelsImgs = [
      {
        location: "frontLeft",
        position: "top-7 left-4"
      },
      {
        location: "frontRight",
        position: "top-7 right-4"
      },
      {
        location: "rearLeft",
        position: "top-21 left-4"
      },
      {
        location: "rearRight",
        position: "top-21 right-4"
      }
    ]

    return wheelsImgs.map(({ location, position }) => (
      <Image
        key={location}
        className={cn("absolute", position)}
        src={`/images/tire-details/${!!wheels[location as keyof typeof wheels] ? "wheel-filled" : "wheel"}.svg`}
        alt={location}
        width={9}
        height={22}
      />
    ))
  }

  return (
    <div className="min-w-33 py-1 flex justify-center relative">
      <Image
        src="/images/tire-details/car-diagram.svg"
        alt="car-diagram"
        width={60}
        height={120}
      />
      {renderWheels()}
    </div>
  );
}
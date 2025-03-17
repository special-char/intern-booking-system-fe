import { GetTireVansResponse } from "@/types/tire-vans";
import { TireVanDTO } from "@/types/tire-vans";

export const mapTireVansToDTO = (
  response: GetTireVansResponse
): TireVanDTO[] => {
  return response.tire_vans.map((tire_van) => ({
    id: tire_van.id,
    vehicleId: tire_van.display_id,
    year: "2021",
    make: "Ram ProMaster City",
    model: "M",
    trim: "Standard",
    capacity: tire_van.capacity,
  }));
};

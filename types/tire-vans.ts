import { Technician } from "./technicians";

export interface TireVan {
  id: string;
  name: string;
  capacity: number;
  display_id: string;
  technician: Omit<Technician, "van">;
}

export interface GetTireVansResponse {
  tire_vans: TireVan[];
}

export interface PostTireVanResponse {
  isSuccess: boolean;
  tire_van: TireVan;
}

export interface TireVanDTO {
  id: string;
  vehicleId: string;
  year: string;
  make: string;
  model: string;
  trim: string;
  capacity: number;
}

import { Technician } from "./technicians";

export interface TireVan {
  id: string;
  name: string;
  capacity: number;
  display_id: string;
  technician: Omit<Technician, "van">;
}

export interface GetTireVansResponse {
  page: number;
  limit: number;
  totalDocs: number;
  docs: TireVanDTO[];
  tire_vans: TireVan[];
}

export interface PostTireVanResponse {
  isSuccess: boolean;
  tire_van: TireVan;
}

export interface TireVanDTO {
  id: string;
  vehicleId: string;
  yearAndMake: string;
  modelTrim: string;
  tireCapacity: number;
}
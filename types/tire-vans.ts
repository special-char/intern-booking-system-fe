import { Van } from "@/payload-types";
import { Technician } from "./technicians";

export interface TireVan {
  id: string;
  name: string;
  capacity: number;
  display_id: string;
  technician: Omit<Technician, "van">;
}

export interface GetTireVansResponse {
  docs: TireVanDTO[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage: number | null;
  page: number;
  pagingCounter: number;
  prevPage: number | null;
  totalDocs: number;
  totalPages: number;
}

export interface PostTireVanResponse {
  isSuccess: boolean;
  tire_van: Van;
}

export interface TireVanDTO {
  id: string;
  vehicleId: string;
  yearAndMake: string;
  modelTrim: string;
  tireCapacity: number;
}
// Types for Hours of Operation Panel
import type { Technician, Territory } from "@/payload-types";
import type { DateRange } from "@/types/date";
import type { TechnicianHoursOfOperationTerritory } from "@/types/territories/technician-hours-of-operation";

export type OpenHours = {
  id: string;
  days: number;
  start: number;
  end: number;
  territory: string;
};

export type TerritoryDragData = {
  type: "territory";
  territory: string;
};

export interface HoursOfOperationFormProps {
  isLoading?: boolean;
  technician: Technician;
  dateRange: DateRange;
  technicianAllWeekTerritories?: TechnicianHoursOfOperationTerritory[];
  territories: Territory[];
  onClose?: () => void;
}

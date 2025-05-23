export interface Van {
  id: string;
  display_id: string;
  name: string;
  capacity: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  technician_id: string;
}

export interface Technician {
  id: number;
  name: string;
  start_time: string;
  end_time: string;
  lunch_time_start: string;
  lunch_time_end: string;
  nylas_grant_id: string;
  van: Van | null;
}

export interface GetTechniciansResponse {
  technicians: Technician[];
}

export interface PostTechnicianResponse {
  isSuccess: boolean;
  // technician: Technician;
}

export interface TechnicianDTO {
  id: number;
  name: string;
  email: string;
  mobilePhone: string;
  twilioPhone: string;
  calendarId: string;
  mobileTireVan: string;
}

export interface TechnicianPaginationDTO {
  technicians: TechnicianDTO[];
  count: number;
  offset: number;
  limit: number;
}

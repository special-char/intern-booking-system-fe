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

export interface Manager {
  id: number;
  name: string;
  start_time: string;
  end_time: string;
  lunch_time_start: string;
  lunch_time_end: string;
  nylas_grant_id: string;
  van: Van | null;
}

export interface GetManagersResponse {
  technicians: Manager[];
}

export interface PostManagerResponse {
  isSuccess: boolean;
  // manager: Manager;
}

export interface ManagerDTO {
  id: number;
  name: string;
  email: string;
  mobilePhone: string;
  twilioPhone: string;
  calendarId: string;
  mobileTireVan: string;
}

export interface ManagerPaginationDTO {
  technicians: ManagerDTO[];
  count: number;
  offset: number;
  limit: number;
}

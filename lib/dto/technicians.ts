import {
  GetTechniciansResponse,
  TechnicianPaginationDTO,
} from "@/types/technicians";

export const mapTechniciansToDTO = (
  response: GetTechniciansResponse
): TechnicianPaginationDTO => {
  const technicians = response.technicians.map((technician) => ({
    id: technician.id,
    name: technician.name,
    email: "john.doe@example.com",
    mobilePhone: "+1234567890",
    twilioPhone: "+1234567890",
    calendarId: "3344556677",
    mobileTireVan: technician.van?.name || "None",
  }));

  return {
    technicians,
    count: response.technicians.length,
    offset: 0,
    limit: 10,
  };
};

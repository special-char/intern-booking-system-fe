"use server";

import { revalidateTag } from "next/cache";
import { mapTechniciansToDTO } from "../dto/technicians";
import { getAuthHeaders } from "./cookies";
import {
  GetTechniciansResponse,
  PostTechnicianResponse,
  TechnicianPaginationDTO,
} from "@/types/technicians";

export async function getTechnicians({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}): Promise<GetTechniciansResponse> {
  const authHeaders = await getAuthHeaders();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const offset = (page - 1) * limit;

  try {
    const endpointUrl = new URL(
      `${process.env.MEDUSA_BACKEND_URL}/admin/technicians`
    );

    //TODO: Add offset and limit to the endpoint
    // endpointUrl.searchParams.append("offset", offset.toString());
    // endpointUrl.searchParams.append("limit", limit.toString());

    const response = await fetch(endpointUrl.toString(), {
      method: "GET",
      headers: {
        ...authHeaders,
      },
      next: {
        tags: ["technicians"],
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching technicians: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.log("Error in getTechnicians: ", error);
    return { technicians: [] };
  }
}

export async function getTechniciansDTO({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}): Promise<TechnicianPaginationDTO> {
  const technicians = await getTechnicians({ page, limit });
  return mapTechniciansToDTO(technicians);
}

export interface CreateTechnicianInput {
  name: string;
  start_time: string;
  end_time: string;
  lunch_time_start: string;
  lunch_time_end: string;
}

export async function createTechnician(
  inputData: CreateTechnicianInput
): Promise<PostTechnicianResponse> {
  const authHeaders = await getAuthHeaders();

  const url = new URL(`${process.env.MEDUSA_BACKEND_URL}/admin/technicians`);

  try {
    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders,
      },
      body: JSON.stringify({
        ...inputData,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `Error creating technician: ${data.message || response.statusText}`
      );
    }

    if (!data || !data.technician) {
      throw new Error("Failed to find created technician.");
    }

    revalidateTag("technicians");

    return {
      isSuccess: true,
      technician: data.technician,
    };
  } catch (error) {
    console.error("Error in createTechnician:", error);
    throw error;
  }
}

export async function updateTechnician(
  inputData: CreateTechnicianInput,
  id: string
): Promise<PostTechnicianResponse> {
  const authHeaders = await getAuthHeaders();

  const url = new URL(
    `${process.env.MEDUSA_BACKEND_URL}/admin/technicians/${id}`
  );

  try {
    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders,
      },
      body: JSON.stringify(inputData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `Error updating technician: ${data.message || response.statusText}`
      );
    }

    if (!data || !data.technician) {
      throw new Error("Failed to find updated technician.");
    }

    revalidateTag("technicians");

    return {
      isSuccess: true,
      technician: data.technician,
    };
  } catch (error) {
    console.error("Error in updateTechnician:", error);
    throw error;
  }
}

export type DeleteTechnicianResponse = {
  isSuccess: boolean;
};

export async function deleteTechnician(
  id: string
): Promise<DeleteTechnicianResponse> {
  const authHeaders = await getAuthHeaders();

  const url = new URL(
    `${process.env.MEDUSA_BACKEND_URL}/admin/technicians/${id}`
  );

  try {
    const response = await fetch(url.toString(), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders,
      },
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(
        `Error deleting technician: ${data.message || response.statusText}`
      );
    }

    revalidateTag("technicians");

    return {
      isSuccess: true,
    };
  } catch (error) {
    console.error("Error in deleteTechnician:", error);
    throw error;
  }
}

"use server";

import {
  GetTireVansResponse,
  PostTireVanResponse,
  TireVanDTO,
} from "@/types/tire-vans";
import { getAuthHeaders } from "./cookies";
import { revalidateTag } from "next/cache";
import { mapTireVansToDTO } from "../dto/tire-vans";

export async function getTireVans({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}): Promise<GetTireVansResponse> {
  try {
    const authHeaders = await getAuthHeaders();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const offset = (page - 1) * limit;

    const endpointUrl = new URL(
      `${process.env.MEDUSA_BACKEND_URL}/admin/tire-vans`
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
        tags: ["tire-vans"],
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching tire vans: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.log("Error in getTireVans: ", error);
    return { tire_vans: [] };
  }
}

export async function getTireVansDTO({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}): Promise<TireVanDTO[]> {
  const tireVans = await getTireVans({ page, limit });
  return mapTireVansToDTO(tireVans);
}

export interface CreateTireVanInput {
  display_id: string;
  capacity: number;
  name: string;
}

export async function createTireVan(
  inputData: CreateTireVanInput
): Promise<PostTireVanResponse> {
  try {
    const authHeaders = await getAuthHeaders();

    const url = new URL(`${process.env.MEDUSA_BACKEND_URL}/admin/tire-vans`);

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
        `Error creating tire van: ${data.message || response.statusText}`
      );
    }

    if (!data || !data.tire_van) {
      throw new Error("Failed to find created tire van.");
    }

    revalidateTag("tire-vans");

    return {
      isSuccess: true,
      tire_van: data.tire_van,
    };
  } catch (error) {
    console.error("Error in createTireVan:", error);
    throw error;
  }
}

export async function updateTireVan(
  inputData: CreateTireVanInput,
  vanId: string
): Promise<PostTireVanResponse> {
  try {
    const authHeaders = await getAuthHeaders();

    const url = new URL(
      `${process.env.MEDUSA_BACKEND_URL}/admin/tire-vans/${vanId}`
    );

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
        `Error creating tire van: ${data.message || response.statusText}`
      );
    }

    if (!data || !data.tire_van) {
      throw new Error("Failed to find created tire van.");
    }

    revalidateTag("tire-vans");

    return {
      isSuccess: true,
      tire_van: data.tire_van,
    };
  } catch (error) {
    console.error("Error in createTireVan:", error);
    throw error;
  }
}

export type DeleteTireVanResponse = {
  isSuccess: boolean;
};

export async function deleteTireVan(
  id: string
): Promise<DeleteTireVanResponse> {
  try {
    const authHeaders = await getAuthHeaders();

    const url = new URL(
      `${process.env.MEDUSA_BACKEND_URL}/admin/tire-vans/${id}`
    );

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
        `Error deleting tire van: ${data.message || response.statusText}`
      );
    }

    revalidateTag("tire-vans");

    return {
      isSuccess: true,
    };
  } catch (error) {
    console.error("Error in deleteTireVan:", error);
    throw error;
  }
}

"use server";
import {
  GetTireVansResponse,
  PostTireVanResponse,
} from "@/types/tire-vans";
import { revalidateTag } from "next/cache";
import { getUser } from "./admin";
import { Tenant } from "@/payload-types";
import { getPayloadAuthHeaders } from "./cookies";

export async function getTireVans(): Promise<any> { //TODO: fix type any
  try {
    const authHeaders = await getPayloadAuthHeaders();
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/vans`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders,
      },
      next: {
        tags: ["tire-vans"],
      },
      credentials: 'include',
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

export async function getTireVansDTO(): Promise<GetTireVansResponse> {
  const tireVans = await getTireVans();
  return tireVans
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
    const { user } = await getUser()
    const tenantId = (user?.tenants?.[0]?.tenant as Tenant).id
    const authHeaders = await getPayloadAuthHeaders();

    const url = new URL(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/vans`);

    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders,
      },
      body: JSON.stringify({
        tenant: tenantId,
        ...inputData,
      }),
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `Error creating tire van: ${data.message || response.statusText}`
      );
    }

    if (!data || !data.doc) {
      throw new Error("Failed to find created tire van.");
    }

    revalidateTag("tire-vans");

    return {
      isSuccess: true,
      tire_van: data.doc,
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
    const { user } = await getUser()
    const tenantId = (user?.tenants?.[0]?.tenant as Tenant).id
    const authHeaders = await getPayloadAuthHeaders();


    const url = new URL(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/vans/${vanId}`
    );

    const response = await fetch(url.toString(), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json", 
        ...authHeaders,
      },
      body: JSON.stringify({
        ...inputData,
        tenant: tenantId,
      }),
      credentials: 'include',
    });

    const data = await response.json();

    console.log(data, "updateTireVan data");

    if (!response.ok) {
      throw new Error(
        `Error creating tire van: ${data.message || response.statusText}`
      );
    }

    if (!data || !data.doc) {
      throw new Error("Failed to find created tire van.");
    }

    revalidateTag("tire-vans");

    return {
      isSuccess: true,
      tire_van: data.doc,
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
    const { user } = await getUser()
    const tenantId = (user?.tenants?.[0]?.tenant as Tenant).id
    const authHeaders = await getPayloadAuthHeaders();


    const url = new URL(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/vans/${id}`
    );

    const response = await fetch(url.toString(), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders,
      },
      body: JSON.stringify({
        tenant: tenantId,
      }),
      credentials: 'include',
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
